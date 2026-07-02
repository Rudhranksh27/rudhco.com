  import Navbar from "../navbar";

type PackageRow = {
  item: string;
  value: string;
};

type PackageSpec = {
  name: string;
  rate: string;
  rows: PackageRow[];
};

const packageData: PackageSpec[] = [
  {
    name: "Basic Package",
    rate: "1875/sq.ft",
    rows: [
      { item: "Cement", value: "DALMIA, STAR CEMENT, DURAGUARD" },
      { item: "TMT Steel", value: "DURGAPUR 500D" },
      { item: "Flooring", value: "2x2 NANO TILES" },
      { item: "Windows", value: "ALUMINIUM WINDOW" }, 
      { item: "Room Doors", value: "PLYWOOD DOORS" },
      { item: "Toilet Door", value: "PVC DOORS" },
      { item: "Door Frame", value: "MS STEEL FRAMES" },
      { item: "Railings", value: "M S IRON GRILLS" },
      { item: "Exterior Paint", value: "WEATHERCOAT, BERGER, BIRLA OPUS" },
      { item: "Interior Paint", value: "DISTEMPER" },
      { item: "Electrical Wires", value: "HAVELLS" },
      { item: "Switches", value: "MODULAR WHITE" },
      { item: "Sanitary", value: "HINDWARE" },
      { item: "Kitchen", value: "CONCRETE RCC SLAB" },
    ],
  },  
  {
    name: "Standard Package",
    rate: "1985/sq.ft",
    rows: [
      { item: "Cement", value: "DALMIA, STAR CEMENT, DURAGUARD" },
      { item: "TMT Steel", value: "SHYAM STEEL 550D, JSW NEOSTEEL 550D" },
      { item: "Flooring", value: "4x2 DIGITAL TILES" },
      { item: "Windows", value: "UPVC/ALUMINIUM WINDOWS" },
      { item: "Room Doors", value: "WPC STYLE DOORS" },
      { item: "Toilet Door", value: "PVC DOORS" },
      { item: "Door Frame", value: "TATA EASYFIT" },
      { item: "Railings", value: "STAINLESS STEEL" },
      { item: "Exterior Paint", value: "ASIAN PAINTS WEATHERCOAT" },
      { item: "Interior Paint", value: "BERGER, ASIAN PAINTS" },
      { item: "Electrical", value: "HAVELLS, ANCHOR" },
      { item: "Switches", value: "MODULAR WHITE" },
      { item: "Sanitary", value: "HINDWARE" },
      { item: "Kitchen", value: "GRANITE SLAB AND WALL TILES FINISHING" },
    ],
  },
  {
    name: "Premium Package",
    rate: "2100/sq.ft",
    rows: [
      { item: "Cement", value: "DALMIA, DURAGUARD, STAR" },
      { item: "TMT Steel", value: "TATA TISCON 550D, SAIL 550D" },
      { item: "Flooring", value: "4x2 DIGITAL TILES" },
      { item: "Windows", value: "UPVC/ALUMINIUM WINDOWS" },
      { item: "Room Doors", value: "HIGH-QUALITY WPC DESIGN DOORS" },
      { item: "Toilet Door", value: "WPC PREMIUM 30MM DOOR" },
      { item: "Door Frame", value: "TATA EASYFIT COLOUR FRAME" },
      { item: "Railings", value: "STAINLESS STEEL" },
      { item: "Exterior Paint", value: "BERGER, BIRLA OPUS EQUIVALENT WEATHERCOAT" },
      { item: "Interior Paint", value: "BERGER, BIRLA OPUS EQUIVALENT PLASTIC PAINT" },
      { item: "Electrical", value: "ISI GRADE COPPER WIRE OF BRANDS FINOLEX, HAVELLS, ANCHOR" },
      { item: "Switches", value: "ISI GRADE MODULAR PREMIUM WHITE" },
      { item: "Sanitary", value: "JAQUAR STANDARD COLLECTION" },
      { item: "Kitchen", value: "KITCHEN SLAB WITH GRANITE & CONCRETE SLAB FOR STORAGE" },
    ],
  },
];

function PackageTable({ pkg }: { pkg: PackageSpec }) {
  return (
    <section className="relative bg-white/90 backdrop-blur-sm border border-slate-200 rounded-3xl shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="absolute -top-20 -right-16 w-52 h-52 rounded-full bg-amber-200/20 blur-2xl pointer-events-none" />
      <div className="px-5 md:px-8 py-6 md:py-8 text-center border-b border-slate-200 bg-linear-to-b from-white to-slate-50 relative">
        <h2 className="text-2xl md:text-4xl font-bold tracking-wide text-slate-900 uppercase">
          {pkg.name}
        </h2>
        <p className="mt-2 text-slate-700 font-semibold tracking-wide">Rate: Rs {pkg.rate}</p>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <tbody>
            {pkg.rows.map((row) => (
              <tr key={row.item} className="border-b border-slate-300 last:border-b-0">
                <td className="w-[36%] px-5 py-4 text-sm md:text-base font-bold uppercase tracking-wide bg-slate-200/70 border-r border-slate-300">
                   {row.item}
                </td>
                <td className="w-[64%] px-5 py-4 text-sm md:text-base text-center uppercase tracking-wide bg-slate-100/70">
                  {row.value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="md:hidden p-4 space-y-3 bg-slate-50/70">
        {pkg.rows.map((row) => (
          <article
            key={row.item}
            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-[11px] font-bold tracking-[0.18em] text-amber-600 uppercase mb-2">
              {row.item}
            </p>
            <p className="text-sm font-medium text-slate-700 uppercase leading-relaxed">
              {row.value}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[12%] left-[4%] w-[320px] h-[320px] border-[28px] border-amber-500/10 rounded-3xl" />
        <div className="absolute bottom-[6%] right-[4%] w-[260px] h-[260px] border-[20px] border-blue-600/5 rounded-full" />
        <div className="absolute top-[36%] right-[18%] w-[120px] h-[120px] bg-amber-400/10 rotate-45" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-28 pb-16 space-y-10 md:space-y-12">
        <section className="text-center max-w-3xl mx-auto mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-wide uppercase">
            Construction Packages
          </h1>
          <p className="mt-4 text-slate-600 font-light leading-relaxed">
            Choose the package that fits your budget and material preferences. Every plan is structured for transparent quality and delivery.
          </p>
        </section>

        {packageData.map((pkg) => (
          <PackageTable key={pkg.name} pkg={pkg} />
        ))}
      </main>
    </div>
  );
}

