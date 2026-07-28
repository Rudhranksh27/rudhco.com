/**
 * HTTPS client for the mongo-proxy service.
 *
 * This replaces the previous MongoClient-based implementation because the
 * hosting environment (GoDaddy Airo) blocks outbound TCP on port 27017 but
 * allows HTTPS (443). All database operations are sent as HTTPS requests to
 * a small proxy service (deployed separately, e.g. on Vercel) which talks
 * to MongoDB Atlas using the normal driver on our behalf.
 *
 * The shape of getDatabase()/collection() intentionally mirrors the native
 * MongoDB driver (insertOne, find, findOne, updateOne, deleteOne) so callers
 * do not need to change.
 */

type Filter = Record<string, unknown>;
type Document = Record<string, unknown>;

interface FindOptions {
	sort?: Record<string, 1 | -1>;
	limit?: number;
	skip?: number;
	projection?: Record<string, 0 | 1>;
}

interface FindOneOptions {
	projection?: Record<string, 0 | 1>;
}

interface UpdateOptions {
	upsert?: boolean;
}

function getProxyUrl(): string {
	const url = process.env.NEXT_PUBLIC_PROXY_API_URL;
	if (!url) {
		throw new Error("Missing NEXT_PUBLIC_PROXY_API_URL environment variable.");
	}
	return url.replace(/\/+$/, "");
}

function getProxyKey(): string {
	const key = process.env.NEXT_PUBLIC_PROXY_API_KEY;
	if (!key) {
		throw new Error("Missing NEXT_PUBLIC_PROXY_API_KEY environment variable.");
	}
	return key;
}

async function callProxy<T = unknown>(
	endpoint: string,
	body: Record<string, unknown>
): Promise<T> {
	const res = await fetch(`${getProxyUrl()}/api/${endpoint}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			"x-api-key": getProxyKey(),
		},
		body: JSON.stringify(body),
		// Never cache database calls.
		cache: "no-store",
	});

	const data = await res.json().catch(() => ({}));

	if (!res.ok) {
		const message =
			(data && typeof data === "object" && "error" in data && (data as { error?: string }).error) ||
			`Proxy request to '${endpoint}' failed with status ${res.status}`;
		throw new Error(message);
	}

	return data as T;
}

function collection(name: string) {
	return {
		async insertOne(document: Document) {
			return callProxy<{ acknowledged: boolean; insertedId: string }>(
				"insertOne",
				{ collection: name, document }
			);
		},

		async findOne(filter: Filter = {}, options: FindOneOptions = {}) {
			const result = await callProxy<{ document: Document | null }>(
				"findOne",
				{ collection: name, filter, projection: options.projection }
			);
			return result.document;
		},

		find(filter: Filter = {}, options: FindOptions = {}) {
			// Mirrors the native driver's cursor shape closely enough for our
			// usage: db.collection(x).find(filter).toArray()
			return {
				async toArray() {
					const result = await callProxy<{ documents: Document[] }>(
						"find",
						{
							collection: name,
							filter,
							sort: options.sort,
							limit: options.limit,
							skip: options.skip,
							projection: options.projection,
						}
					);
					return result.documents;
				},
			};
		},

		async updateOne(
			filter: Filter,
			update: Record<string, unknown>,
			options: UpdateOptions = {}
		) {
			return callProxy<{
				acknowledged: boolean;
				matchedCount: number;
				modifiedCount: number;
				upsertedId: string | null;
			}>("updateOne", { collection: name, filter, update, options });
		},

		async deleteOne(filter: Filter) {
			return callProxy<{ acknowledged: boolean; deletedCount: number }>(
				"deleteOne",
				{ collection: name, filter }
			);
		},
	};
}

export async function getDatabase() {
	return { collection };
}
