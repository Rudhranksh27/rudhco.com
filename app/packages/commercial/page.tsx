"use client";

import { useState } from "react";
import Navbar from "../../navbar";

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
    rate: "2375/sq.ft",
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
      { item: "Electrical Wire", value: "HAVELLS" },
      { item: "Switches", value: "MODULAR WHITE" },
      { item: "Sanitary", value: "HINDWARE" },
      { item: "Kitchen", value: "CONCRETE RCC SLAB" },
    ],
  },
  {
    name: "Standard Package",
    rate: "2485/sq.ft",
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
      { item: "Electrical Wire", value: "HAVELLS, ANCHOR" },
      { item: "Switches", value: "MODULAR WHITE" },
      { item: "Sanitary", value: "HINDWARE" },
      { item: "Kitchen", value: "GRANITE SLAB AND WALL TILES FINISHING" },
    ],
  },
  {
    name: "Premium Package",
    rate: "2600/sq.ft",
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
      { item: "Electrical Wire", value: "ISI GRADE COPPER WIRE OF BRANDS FINOLEX, HAVELLS, ANCHOR" },
      { item: "Switches", value: "ISI GRADE MODULAR PREMIUM WHITE" },
      { item: "Sanitary", value: "JAQUAR STANDARD COLLECTION" },
      { item: "Kitchen", value: "KITCHEN SLAB WITH GRANITE & CONCRETE SLAB FOR STORAGE" },
    ],
  },
];

function PackageTable({ pkg }: { pkg: PackageSpec }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleRow = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative bg-slate-100/90 border border-slate-300 rounded-3xl shadow-lg overflow-hidden">
      <div className="px-5 md:px-8 py-4 md:py-5 min-h-28 md:min-h-32 flex flex-col items-center justify-center text-center border-b border-slate-300 bg-slate-50 relative">
        <h2 className="min-h-16 md:min-h-19 flex items-center justify-center text-[2rem] md:text-[44px] leading-[0.95] font-bold tracking-wide text-slate-900 uppercase md:whitespace-nowrap">
          {pkg.name}
        </h2>
        <p className="mt-1 min-h-7 md:min-h-10 text-amber-600 text-base md:text-3xl font-semibold tracking-wide">Rate: Rs {pkg.rate}</p>
      </div>

      <div>
        {pkg.rows.map((row, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={`${row.item}-${index}`} className="border-b border-slate-300 last:border-b-0">
              <button
                type="button"
                onClick={() => toggleRow(index)}
                className="w-full px-5 py-4 md:px-6 md:py-4 flex items-center justify-between text-left bg-slate-100 hover:bg-slate-200/70 transition-colors"
              >
                <span className="text-xl md:text-[24px] font-semibold text-slate-800 leading-none">
                  {row.item}
                </span>
                <svg
                  className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                <div className="overflow-hidden">
                  <p className="px-5 pb-5 md:px-6 md:pb-6 text-sm md:text-base text-slate-700 font-semibold uppercase tracking-wide bg-white">
                    {row.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function CommercialPackagesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden">
      <Navbar />

      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[12%] left-[4%] w-80 h-80 border-28 border-amber-500/10 rounded-3xl" />
        <div className="absolute bottom-[6%] right-[4%] w-65 h-65 border-20 border-blue-600/5 rounded-full" />
        <div className="absolute top-[36%] right-[18%] w-30 h-30 bg-amber-400/10 rotate-45" />
      </div>

      <main className="relative z-10 max-w-420 mx-auto px-3 md:px-5 pt-28 pb-16">
        <section className="text-center max-w-3xl mx-auto mb-2">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-wide uppercase">
            Commercial Construction Packages
          </h1>
          <p className="mt-4 text-slate-600 font-light leading-relaxed">
            Explore commercial package options with clearly defined material specifications and transparent pricing tiers.
          </p>
        </section>

        <section className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {packageData.map((pkg) => (
            <PackageTable key={pkg.name} pkg={pkg} />
          ))}
        </section>
      </main>
    </div>
  );
}
