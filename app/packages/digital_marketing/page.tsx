"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../navbar";
import Link from "next/link";

// --- ANIMATION WRAPPER COMPONENT ---
interface AnimateOnScrollProps {
    readonly children: ReactNode;
    readonly direction?: "up" | "down" | "left" | "right" | "none";
    readonly delay?: number;
    readonly className?: string;
}

function AnimateOnScroll({ children, direction = "up", delay = 0, className = "" }: Readonly<AnimateOnScrollProps>) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
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
    basic: string | boolean;
    standard: string | boolean;
    premium: string | boolean;
    custom: string | boolean;
};

const socialMediaPackages: PackageRow[] = [
    { item: "Platforms", basic: "Facebook, Instagram", standard: "Facebook, Instagram, LinkedIn", premium: "Facebook, Instagram, Twitter, LinkedIn", custom: "Facebook, Instagram, Twitter, LinkedIn" },
    { item: "Postings", basic: "8 Posts including 3 Reels", standard: "12 Posts including 4 Reels", premium: "16 Posts including 6 Reels", custom: "20 Posts including 8 Reels" },
    { item: "Calendar organize", basic: false, standard: true, premium: true, custom: true },
    { item: "Trending hash tags", basic: true, standard: true, premium: true, custom: true },
    { item: "Audience engagement", basic: true, standard: true, premium: true, custom: true },
    { item: "Identify business goal", basic: true, standard: true, premium: true, custom: true },
    { item: "Profile optimization", basic: true, standard: true, premium: true, custom: true },
    { item: "Insight monitoring", basic: true, standard: true, premium: true, custom: true },
    { item: "Mail marketing", basic: false, standard: false, premium: true, custom: true },
    { item: "Social profile creation", basic: true, standard: true, premium: true, custom: true },
    { item: "Business page setup", basic: false, standard: true, premium: true, custom: true },
    { item: "Organic reach", basic: true, standard: true, premium: true, custom: true },
    { item: "Engagement plan", basic: false, standard: false, premium: true, custom: true },
    { item: "Post grid maintain", basic: false, standard: false, premium: true, custom: true },
    { item: "Keyword analysis", basic: false, standard: true, premium: true, custom: true },
    { item: "Target market research", basic: false, standard: true, premium: true, custom: true },
    { item: "Meta Ads Management", basic: false, standard: false, premium: true, custom: true },
    { item: "Monthly report", basic: true, standard: true, premium: true, custom: true },
    { item: "Minimum duration", basic: "6 Months", standard: "6 Months", premium: "4 Months", custom: "3 Months" },
];

type ServiceFeature = {
    label: string;
    basic: string;
    standard: string;
    premium: string;
};

const ppcFeatures: ServiceFeature[] = [
    { label: "Suggested Keywords", basic: "10", standard: "20", premium: "30" },
    { label: "Total Ad amount (Monthly)", basic: "₹20,000", standard: "₹30,000", premium: "₹50,000" },
    { label: "Campaign Management", basic: "Yes", standard: "Yes", premium: "Yes" },
    { label: "Conversion Tracking", basic: "Yes", standard: "Yes", premium: "Yes" },
    { label: "ROI Tracking", basic: "Yes", standard: "Yes", premium: "Yes" },
    { label: "A/B Testing", basic: "X", standard: "Yes", premium: "Yes" },
    { label: "Weekly Report", basic: "X", standard: "Yes", premium: "Yes" },
    { label: "Monthly Report", basic: "Yes", standard: "Yes", premium: "Yes" },
];

// --- PACKAGE TABLE CARD COMPONENT ---
function PackageTableCard({ title, prices, features, type }: { title: string; prices: { basic: string; standard: string; premium: string; custom?: string }; features: any[]; type: "social" | "ppc" }) {
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    const toggleRow = (idx: number) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(idx)) {
            newExpanded.delete(idx);
        } else {
            newExpanded.add(idx);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <div className="w-full">
            <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl overflow-hidden">
                {/* Enhanced Header */}
                <div className={`px-6 py-8 ${type === "social" ? 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500' : 'bg-gradient-to-r from-orange-600 via-orange-500 to-red-500'}`}>
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">{title}</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">
                        {type === "social" 
                            ? "Comprehensive social media management solutions tailored to your business needs. Choose your perfect plan below."
                            : "Professional PPC advertising management to maximize your ROI. Select the plan that fits your budget and goals."}
                    </p>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    {/* Price Row */}
                    <div className="grid grid-cols-5 gap-4 p-6 border-b border-slate-200 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-blue-500/10">
                        <div className="font-bold text-slate-900 text-sm">PACKAGE</div>
                        <div className="font-bold text-white text-center text-sm bg-gradient-to-r from-blue-600 to-blue-500 py-2 px-4 rounded-lg">
                            BASIC
                        </div>
                        <div className="font-bold text-white text-center text-sm bg-gradient-to-r from-slate-600 to-slate-500 py-2 px-4 rounded-lg">
                            STANDARD
                        </div>
                        <div className="font-bold text-white text-center text-sm bg-gradient-to-r from-amber-600 to-amber-500 py-2 px-4 rounded-lg">
                            PREMIUM
                        </div>
                        {type === "social" && (
                            <div className="font-bold text-white text-center text-sm bg-gradient-to-r from-purple-600 to-purple-500 py-2 px-4 rounded-lg">
                                CUSTOM
                            </div>
                        )}
                    </div>

                    {/* Price Values */}
                    <div className="grid grid-cols-5 gap-4 p-6 border-b border-slate-200 bg-slate-50">
                        <div className="font-bold text-slate-900 text-sm">Price</div>
                        <div className="font-bold text-center text-blue-600 text-lg">{prices.basic}</div>
                        <div className="font-bold text-center text-slate-600 text-lg">{prices.standard}</div>
                        <div className="font-bold text-center text-amber-600 text-lg">{prices.premium}</div>
                        {type === "social" && (
                            <div className="font-bold text-center text-purple-600 text-lg">{prices.custom}</div>
                        )}
                    </div>

                    {/* Features Section Header */}
                    <div className="px-6 pt-6 pb-2">
                        <h4 className="text-slate-700 font-bold text-sm uppercase tracking-wider">Package Features</h4>
                    </div>

                    {/* Features */}
                    <div className="px-6 pb-6 space-y-1">
                        {(type === "social" ? socialMediaPackages : ppcFeatures).map((feature, idx) => {
                            const item = feature as any;
                            return (
                                <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:bg-slate-50 transition-colors">
                                    <div className="w-full px-6 py-4 flex items-center text-left text-xs md:text-sm">
                                        <div className="grid grid-cols-5 gap-4 w-full items-center">
                                            <span className="font-semibold text-slate-900 text-sm">{item.item || item.label}</span>
                                            <div className="text-center text-sm text-slate-600 font-medium">{typeof item.basic === 'boolean' ? (item.basic ? 'Yes' : 'X') : item.basic}</div>
                                            <div className="text-center text-sm text-slate-600 font-medium">{typeof item.standard === 'boolean' ? (item.standard ? 'Yes' : 'X') : item.standard}</div>
                                            <div className="text-center text-sm text-slate-600 font-medium">{typeof item.premium === 'boolean' ? (item.premium ? 'Yes' : 'X') : item.premium}</div>
                                            {type === "social" && (
                                                <div className="text-center text-sm text-slate-600 font-medium">{typeof item.custom === 'boolean' ? (item.custom ? 'Yes' : 'X') : item.custom}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Card View - Better UX */}
                <div className="md:hidden p-4 space-y-6">
                    {/* Section Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider mb-4">Choose Your Plan</h4>
                    </div>

                    {/* Package Price Cards */}
                    <div className="grid grid-cols-2 gap-3">
                        {/* Basic Package */}
                        <div className="bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-xs font-bold tracking-widest uppercase mb-2">Basic</div>
                            <div className="text-lg font-bold">{prices.basic}</div>
                        </div>
                        
                        {/* Standard Package */}
                        <div className="bg-gradient-to-br from-slate-600 to-slate-500 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-xs font-bold tracking-widest uppercase mb-2">Standard</div>
                            <div className="text-lg font-bold">{prices.standard}</div>
                        </div>
                        
                        {/* Premium Package */}
                        <div className="bg-gradient-to-br from-amber-600 to-amber-500 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div className="text-xs font-bold tracking-widest uppercase mb-2">Premium</div>
                            <div className="text-lg font-bold">{prices.premium}</div>
                        </div>
                        
                        {/* Custom Package (Social only) */}
                        {type === "social" && (
                            <div className="bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl p-4 text-white text-center shadow-lg hover:shadow-xl transition-shadow">
                                <div className="text-xs font-bold tracking-widest uppercase mb-2">Custom</div>
                                <div className="text-lg font-bold">{prices.custom}</div>
                            </div>
                        )}
                    </div>

                    {/* Feature Divider */}
                    <div className="border-t-2 border-slate-200 py-2"></div>

                    {/* Features Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider">What's Included</h4>
                    </div>

                    {/* Features - Collapsible Cards */}
                    <div className="space-y-2">
                        {(type === "social" ? socialMediaPackages : ppcFeatures).map((feature, idx) => {
                            const item = feature as any;
                            const isExpanded = expandedRows.has(idx);
                            return (
                                <div key={idx} className="bg-white/60 backdrop-blur-sm rounded-lg border border-slate-200 overflow-hidden hover:border-slate-300 transition-all">
                                    {/* Clickable Header */}
                                    <div 
                                        onClick={() => toggleRow(idx)}
                                        className="px-4 py-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                                    >
                                        <span className="font-semibold text-slate-900 text-sm flex-1 pr-3">{item.item || item.label}</span>
                                        <span className={`text-slate-600 text-xl transition-transform duration-300 flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}>
                                            ▼
                                        </span>
                                    </div>

                                    {/* Expanded Details */}
                                    {isExpanded && (
                                        <div className="px-4 py-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
                                            <div className="space-y-3">
                                                <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                    <span className="font-semibold text-blue-600 min-w-fit">Basic:</span>
                                                    <span className="text-slate-700 text-sm">{typeof item.basic === 'boolean' ? (item.basic ? '✓ Included' : '✗ Not included') : item.basic}</span>
                                                </div>
                                                <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                    <span className="font-semibold text-slate-600 min-w-fit">Standard:</span>
                                                    <span className="text-slate-700 text-sm">{typeof item.standard === 'boolean' ? (item.standard ? '✓ Included' : '✗ Not included') : item.standard}</span>
                                                </div>
                                                <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                    <span className="font-semibold text-amber-600 min-w-fit">Premium:</span>
                                                    <span className="text-slate-700 text-sm">{typeof item.premium === 'boolean' ? (item.premium ? '✓ Included' : '✗ Not included') : item.premium}</span>
                                                </div>
                                                {type === "social" && (
                                                    <div className="flex items-start gap-3">
                                                        <span className="font-semibold text-purple-600 min-w-fit">Custom:</span>
                                                        <span className="text-slate-700 text-sm">{typeof item.custom === 'boolean' ? (item.custom ? '✓ Included' : '✗ Not included') : item.custom}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="px-6 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex gap-4">
                    <Link href="/contact" className="flex-1 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-center text-sm font-bold uppercase tracking-widest transition-colors shadow-md">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function DigitalMarketingPackagesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
            <Navbar />

            <style>{`
                @keyframes geo-spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes geo-float { 0% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-40px) rotate(10deg); } 100% { transform: translateY(0px) rotate(0deg); } }
                @keyframes gradient-xy { 0% { background-position: 0% 0%; } 50% { background-position: 100% 100%; } 100% { background-position: 0% 0%; } }
                .animate-geo-spin { animation: geo-spin 40s linear infinite; }
                .animate-geo-spin-slow { animation: geo-spin 60s linear infinite reverse; }
                .animate-geo-float { animation: geo-float 15s ease-in-out infinite; }
                .animate-gradient-xy { animation: gradient-xy 8s ease infinite; }
            `}</style>

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-blue-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-cyan-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-blue-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                <section className="w-full pt-32 pb-16 px-6">
                    <AnimateOnScroll direction="down" className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
                        <h2 className="text-blue-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4">
                            Transparent Pricing Tiers
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mb-6">
                            Digital Marketing Packages
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            Boost your brand visibility with our comprehensive digital marketing solutions. Tailored strategies for every business size.
                        </p>
                    </AnimateOnScroll>
                </section>

                <section className="w-full max-w-7xl mx-auto px-6 py-10 space-y-12">
                    <AnimateOnScroll direction="up" delay={0}>
                        <PackageTableCard 
                            title="Social Media Management"
                            prices={{
                                basic: "₹12999/-",
                                standard: "₹16999/-",
                                premium: "₹29999/-",
                                custom: "₹29999+/-"
                            }}
                            features={socialMediaPackages}
                            type="social"
                        />
                    </AnimateOnScroll>

                    <AnimateOnScroll direction="up" delay={150}>
                        <PackageTableCard 
                            title="PPC Package"
                            prices={{
                                basic: "₹6,999/-",
                                standard: "₹9,999/-",
                                premium: "₹12,999/-"
                            }}
                            features={ppcFeatures}
                            type="ppc"
                        />
                    </AnimateOnScroll>
                </section>

                {/* --- MEGA CTA SECTION --- */}
                <section className="w-full pt-24 px-6">
                    <AnimateOnScroll direction="none" className="max-w-5xl mx-auto text-center bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Grow Your Digital Presence?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Let our expert team help you reach your target audience and achieve your business goals through strategic digital marketing.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-blue-500 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                            <span className="text-white font-bold tracking-widest text-sm uppercase">Consult With Us</span>
                        </Link>
                    </AnimateOnScroll>
                </section>
            </main>

            {/* --- FOOTER --- */}
            <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8 relative z-10 mt-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-6">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                                <div className="mt-1"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p><a href="tel:+919864658393" className="text-slate-700 font-medium hover:text-blue-500">+91 98646 58393</a></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                                <div className="mt-1"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p><a href="mailto:business@rudhco.com" className="text-slate-700 font-medium hover:text-blue-500">business@rudhco.com</a></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-blue-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
                                <div className="mt-1"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Location</p><p className="text-slate-700 font-medium max-w-xs">House no. 28, Sugam Path Zoo Road (10h Bye Lane- West), R.G. Baruah Road, Guwahati</p></div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.7141744504574!2d91.77225167492242!3d26.173436591470374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59001b441573%3A0xd76a2a6023476d98!2ssugam%20path%20zoo%20road!5e0!3m2!1sen!2sin!4v1788258520248!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <div className="border-t border-slate-200 pt-8 text-center text-slate-500 text-xs tracking-widest uppercase">
                    © 2026 RUDHCO INFRA & TECH PVT. LTD. ALL RIGHTS RESERVED.
                </div>
            </footer>
        </div>
    );
}
