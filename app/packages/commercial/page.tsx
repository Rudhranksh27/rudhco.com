"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../navbar";
import Link from "next/link";

// --- ANIMATION WRAPPER COMPONENT ---
interface AnimateOnScrollProps {
    children: ReactNode;
    direction?: "up" | "down" | "left" | "right" | "none";
    delay?: number;
    className?: string;
}

function AnimateOnScroll({ children, direction = "up", delay = 0, className = "" }: AnimateOnScrollProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Reveal once to avoid re-hiding/flicker when scrolling near viewport edges.
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.08, rootMargin: "0px 0px -10% 0px" }
        );

        observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    let hiddenClasses = "opacity-0 ";
    if (direction === "up") hiddenClasses += "translate-y-16";
    if (direction === "down") hiddenClasses += "-translate-y-16";
    if (direction === "left") hiddenClasses += "-translate-x-16";
    if (direction === "right") hiddenClasses += "translate-x-16";
    if (direction === "none") hiddenClasses += "scale-95";

    return (
        <div
            ref={ref}
            className={`transition-all duration-[1000ms] ${isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenClasses} ${className}`}
            style={{
                transitionDelay: `${delay}ms`,
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
        >
            {children}
        </div>
    );
}

// --- DATA ---
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

// --- ESTIMATE MODAL COMPONENT ---
interface EstimateModalProps {
    isOpen: boolean;
    onClose: () => void;
    packageName: string;
    pricePerSqft: number;
}

function EstimateModal({ isOpen, onClose, packageName, pricePerSqft }: EstimateModalProps) {
    const [sqftArea, setSqftArea] = useState<string>("");
    const [houseType, setHouseType] = useState<string>("");
    const router = useRouter();

    if (!isOpen) return null;

    const handleGenerateEstimate = () => {
        if (!sqftArea || !houseType) {
            alert("Please fill in all fields");
            return;
        }

        // Calculate multiplier based on house type
        const multipliers: Record<string, number> = {
            "Ground Floor": 1,
            "G+1": 2,
            "G+2": 3,
            "G+3": 4
        };

        const multiplier = multipliers[houseType] || 1;
        const estimatedCost = pricePerSqft * multiplier * parseFloat(sqftArea);
        
        const estimateData = {
            packageName,
            pricePerSqft,
            sqftArea: parseFloat(sqftArea),
            houseType,
            multiplier,
            estimatedCost,
            timestamp: Date.now()
        };

        // Store estimate in localStorage
        localStorage.setItem("pendingEstimate", JSON.stringify(estimateData));

        // Redirect to contact page
        router.push("/contact");
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative animate-in fade-in duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Get Estimate</h2>
                    <p className="text-slate-600 text-sm">{packageName}</p>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                            Rate per Sq.ft
                        </label>
                        <div className="px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                            <p className="text-lg font-bold text-amber-600">Rs {pricePerSqft.toLocaleString("en-IN")}</p>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="houseType" className="block text-sm font-semibold text-slate-700 mb-2">
                            Type of House *
                        </label>
                        <select
                            id="houseType"
                            value={houseType}
                            onChange={(e) => setHouseType(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none text-slate-900 bg-white"
                        >
                            <option value="">Select House Type</option>
                            <option value="Ground Floor">Ground Floor</option>
                            <option value="G+1">G+1</option>
                            <option value="G+2">G+2</option>
                            <option value="G+3">G+3</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sqft" className="block text-sm font-semibold text-slate-700 mb-2">
                            Enter Your Sqft Area *
                        </label>
                        <input
                            id="sqft"
                            type="number"
                            placeholder="e.g., 1000"
                            value={sqftArea}
                            onChange={(e) => setSqftArea(e.target.value)}
                            className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-amber-500 focus:outline-none text-slate-900 placeholder-slate-400"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 border-2 border-slate-200 rounded-lg text-slate-900 font-semibold hover:bg-slate-50 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            onClick={handleGenerateEstimate}
                            className="flex-1 px-4 py-3 bg-amber-500 rounded-lg text-white font-semibold hover:bg-amber-600 transition-colors"
                        >
                            Generate Estimate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- COMPACT PACKAGE CARD COMPONENT ---
function PackageCard({ pkg, index }: { pkg: PackageSpec; index: number }) {
    const [openIndices, setOpenIndices] = useState<Set<number>>(new Set());
    const [showEstimate, setShowEstimate] = useState(false);
    const pricePerSqft = parseInt(pkg.rate.split("/")[0]);

    const toggleRow = (rowIndex: number) => {
        setOpenIndices((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(rowIndex)) {
                newSet.delete(rowIndex);
            } else {
                newSet.add(rowIndex);
            }
            return newSet;
        });
    };

    // Assigning a unique faint animated gradient to each card
    const gradientClasses = [
        "from-blue-400/10 via-white/80 to-slate-400/40",     // Basic
        "from-emerald-400/10 via-white/80 to-teal-400/40",   // Standard
        "from-amber-400/10 via-white/80 to-rose-400/40",     // Premium
    ][index % 3];

    return (
        <>
            <EstimateModal
                isOpen={showEstimate}
                onClose={() => setShowEstimate(false)}
                packageName={pkg.name}
                pricePerSqft={pricePerSqft}
            />
            <div className={`flex flex-col bg-gradient-to-br ${gradientClasses} bg-[length:200%_200%] animate-gradient-xy backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500`}>
                {/* Header */}
                <h3 className="text-2xl font-bold text-slate-900 mb-1">{pkg.name}</h3>
                <div className="text-xl font-bold text-amber-600 mb-6 pb-4 border-b border-slate-900/10">
                    Rs {pkg.rate}
                </div>

                {/* Compact Accordion List */}
                <div className="flex-grow space-y-2 mb-8 relative z-10">
                    {pkg.rows.map((row, rowIndex) => {
                        const isOpen = openIndices.has(rowIndex);
                        return (
                            <div key={rowIndex} className="border border-slate-900/10 rounded-lg overflow-hidden bg-white/50 backdrop-blur-sm">
                                <button
                                    type="button"
                                    onClick={() => toggleRow(rowIndex)}
                                    className="w-full py-2.5 px-4 flex items-center justify-between text-left hover:bg-white/80 transition-colors"
                                >
                                    <span className="text-sm font-semibold text-slate-900">
                                        {row.item}
                                    </span>
                                    <svg
                                        className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isOpen ? "rotate-90" : ""}`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                                    <div className="overflow-hidden">
                                        <p className="px-4 pb-3 text-xs text-slate-700 font-medium uppercase tracking-wide">
                                            {row.value}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 flex gap-3 mt-auto">
                    <button
                        onClick={() => setShowEstimate(true)}
                        className="flex-1 py-4 rounded-full bg-amber-500 text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-amber-600 transition-colors shadow-md"
                    >
                        Get Estimate
                    </button>
                    <Link href="/contact" className="flex-1 py-4 rounded-full bg-slate-900 text-white text-center text-xs font-bold uppercase tracking-widest hover:bg-slate-700 transition-colors shadow-md">
                        Select Package
                    </Link>
                </div>
            </div>
        </>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function CommercialPackagesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
            <Navbar />

            {/* --- CUSTOM CSS FOR BACKGROUND ANIMATION --- */}
            <style>{`
                @keyframes geo-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes geo-float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                @keyframes gradient-xy {
                    0% { background-position: 0% 0%; }
                    50% { background-position: 100% 100%; }
                    100% { background-position: 0% 0%; }
                }
                .animate-geo-spin { animation: geo-spin 40s linear infinite; }
                .animate-geo-spin-slow { animation: geo-spin 60s linear infinite reverse; }
                .animate-geo-float { animation: geo-float 15s ease-in-out infinite; }
                .animate-gradient-xy { animation: gradient-xy 8s ease infinite; }
            `}</style>

            {/* Ambient Background Effects (Geometric Light Theme) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-amber-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-blue-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-amber-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                {/* =========================================
                    SECTION 1: PAGE HEADER
                    ========================================= */}
                <section className="w-full pt-32 pb-16 px-6">
                    <AnimateOnScroll direction="down" className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4">
                            Transparent Pricing Tiers
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mb-6">
                            Construction Packages
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            Explore our comprehensive package options with clearly defined material specifications. We ensure absolute quality at every investment level.
                        </p>
                    </AnimateOnScroll>
                </section>

                {/* =========================================
                    SECTION 2: COMPACT PACKAGE CARDS
                    ========================================= */}
                <section className="w-full max-w-7xl mx-auto px-6 py-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {packageData.map((pkg, idx) => (
                            <AnimateOnScroll key={pkg.name} direction="up" delay={idx * 150}>
                                <PackageCard pkg={pkg} index={idx} />
                            </AnimateOnScroll>
                        ))}
                    </div>
                </section>

                {/* =========================================
                    SECTION 3: MEGA CTA
                    ========================================= */}
                <section className="w-full pt-24 px-6">
                    <AnimateOnScroll direction="none" className="max-w-5xl mx-auto text-center bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-amber-500/5 blur-[100px] pointer-events-none"></div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 relative z-10">Ready to Start Your Project?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light relative z-10">
                            Select the package that fits your needs, or reach out to our team to request a fully custom quote tailored to your specific architectural requirements.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center relative z-10 px-12 py-5 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group">
                            <span className="text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                Book a Strategy Call
                            </span>
                        </Link>
                    </AnimateOnScroll>
                </section>

            </main>

            {/* =========================================
                SECTION 4: FOOTER (Matches other pages)
                ========================================= */}
            <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8 relative z-10 mt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Contact Details */}
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                </div>
                                <div className="mt-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p>
                                    <a href="tel:+919864658393" className="text-slate-700 font-medium hover:text-amber-500 transition-colors">+91 98646 58393</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                </div>
                                <div className="mt-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p>
                                    <a href="mailto:business@rudhco.com" className="text-slate-700 font-medium hover:text-amber-500 transition-colors">business@rudhco.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-amber-500">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                </div>
                                <div className="mt-1">
                                    <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p>
                                    <p className="text-slate-700 font-medium max-w-xs leading-relaxed">House No-35, 3rd floor, Panjabari Road, Near Canara Bank, Panjabari Branch, Pin - 781037, Assam</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 transition duration-700">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.423985141009!2d91.8159183!3d26.150346!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a593f6c8d4db3%3A0xc3f5c90b6a7a0b5c!2sPanjabari%20Rd%2C%20Guwahati%2C%20Assam!5e0!3m2!1sen!2sin!4v1689254321098!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>

                <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-xs tracking-widest uppercase">
                    © 2026 RUDHCO INFRA & TECH PVT. LTD. ALL RIGHTS RESERVED.
                </div>
            </footer>
        </div>
    );
}