import { NextResponse } from "next/server";

function getProxyUrl() {
  const raw = process.env.PROXY_API_URL || process.env.NEXT_PUBLIC_PROXY_API_URL;
  if (!raw) {
    return null;
  }
  return raw.replace(/\/+$/, "");
}

function getProxyKey() {
  const raw = process.env.PROXY_API_KEY || process.env.NEXT_PUBLIC_PROXY_API_KEY;
  if (!raw) {
    return null;
  }
  return raw.trim();
}

function mask(value: string | null) {
  if (!value) return null;
  if (value.length <= 8) return "********";
  return `${value.slice(0, 4)}...${value.slice(-4)}`;
}

async function probe(
  url: string,
  endpoint: string,
  key: string,
  useBearerOnly = false
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (useBearerOnly) {
    headers.Authorization = `Bearer ${key}`;
  } else {
    headers["x-api-key"] = key;
  }

  const res = await fetch(`${url}/api/${endpoint}`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      collection: "enquiries",
      filter: {},
      projection: { _id: 1 },
    }),
    cache: "no-store",
  });

  const text = await res.text();
  return {
    status: res.status,
    ok: res.ok,
    bodyPreview: text.slice(0, 300),
  };
}

export async function GET() {
  try {
    const proxyUrl = getProxyUrl();
    const proxyKey = getProxyKey();

    if (!proxyUrl || !proxyKey) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing proxy URL or key.",
          env: {
            hasProxyUrl: Boolean(proxyUrl),
            hasProxyKey: Boolean(proxyKey),
          },
        },
        { status: 500 }
      );
    }

    const [xApiKeyResult, bearerResult] = await Promise.all([
      probe(proxyUrl, "findOne", proxyKey, false),
      probe(proxyUrl, "findOne", proxyKey, true),
    ]);

    return NextResponse.json({
      success: xApiKeyResult.ok || bearerResult.ok,
      configured: {
        proxyUrl,
        proxyKeyMasked: mask(proxyKey),
      },
      checks: {
        xApiKeyHeader: xApiKeyResult,
        authorizationBearer: bearerResult,
      },
      hint:
        "If both checks are 401/403, your key is wrong for this proxy URL. If one check is 200 and the other fails, align your proxy to one auth style.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
