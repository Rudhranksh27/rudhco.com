"use client";

import Navbar from "../navbar";
import Link from "next/link"; // Assuming you use Next.js routing

export default function ServicesPage() {
    const services = [
        {
            id: "residential",
            title: "Residential Construction",
            subtitle: "Palaces of Residence",
            description: "We forge private estates with an unyielding commitment to grandeur. From foundation to final finish, we craft bespoke homes that stand as a timeless testament to your legacy.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
            ),
        },
        {
            id: "commercial",
            title: "Commercial Construction",
            subtitle: "Monuments of Commerce",
            description: "Building robust, scalable infrastructure for enterprises that demand excellence. We construct commanding commercial spaces designed to elevate your industry presence and withstand the test of time.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
        {
            id: "renovation",
            title: "Renovation & Remodelling",
            subtitle: "The Art of Renewal",
            description: "Breathing refined life into existing structures. We marry modern precision with established foundations, transforming outdated spaces into magnificent modern domains without compromising their original soul.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                </svg>
            ),
        },
        {
            id: "interior",
            title: "Interior Design & Turnkey",
            subtitle: "Curated Sanctuaries",
            description: "A sovereign experience from conceptualization to final execution. We preside over every detail—delivering fully realized, exquisitely designed spaces ready for your immediate command.",
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
            ),
        }
    ];

    return (
        <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
            <Navbar />

            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-blue-900/5 rounded-full blur-[150px]" />
            </div>

            <main className="flex-grow flex flex-col relative z-10 w-full px-6 py-24 md:py-32">
                <div className="max-w-7xl mx-auto w-full">
                    
                    {/* Page Header */}
                    <div className="text-center max-w-3xl mx-auto mb-20 md:mb-28">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">
                            The Dominion of Build
                        </h2>
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight mb-8">
                            Mastery in Every Discipline.
                        </h1>
                        <p className="text-gray-400 text-lg font-light leading-relaxed">
                            From the earth, we command structure. Explore our suite of sovereign services, dedicated to the pursuit of permanence, precision, and architectural excellence.
                        </p>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {services.map((service) => (
                            <ServiceCard key={service.id} {...service} />
                        ))}
                    </div>

                    {/* Call to Action Section */}
                    <div className="mt-32 text-center bg-white/5 backdrop-blur-sm border border-white/10 p-12 md:p-16 rounded-3xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative z-10">Ready to build your kingdom?</h2>
                        <p className="text-gray-400 max-w-xl mx-auto mb-10 relative z-10">
                            Consult with our chief architects and engineers to begin laying the foundation for your next grand endeavor.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center relative z-10 px-8 py-4 bg-transparent overflow-hidden rounded-full border border-amber-500 hover:bg-amber-500 transition-all duration-300 group/btn">
                            <span className="text-amber-500 group-hover/btn:text-black font-bold tracking-widest text-sm uppercase transition-colors">
                                Commission a Project
                            </span>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Sub-component for the individual service cards
function ServiceCard({ title, subtitle, description, icon }: { title: string, subtitle: string, description: string, icon: React.ReactNode }) {
    return (
        <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-10 rounded-2xl transition-all duration-500 hover:border-amber-500/50 hover:bg-white/[0.07] hover:-translate-y-1">
            
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-0 h-[2px] bg-amber-500 transition-all duration-500 group-hover:w-full rounded-t-2xl"></div>

            <div className="flex flex-col h-full">
                {/* Icon & Subtitle */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="p-4 bg-neutral-900 border border-white/10 rounded-xl text-amber-500 group-hover:scale-110 group-hover:bg-amber-500/10 transition-all duration-500">
                        {icon}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-amber-500 text-xs font-bold uppercase tracking-[0.2em] mb-1">
                            {subtitle}
                        </span>
                    </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    {title}
                </h3>
                <p className="text-gray-400 font-light leading-relaxed flex-grow">
                    {description}
                </p>

                {/* Optional 'Learn More' interaction element */}
                <div className="mt-8 pt-6 border-t border-white/10 flex items-center text-sm font-bold tracking-widest uppercase text-gray-500 group-hover:text-white transition-colors cursor-pointer w-max">
                    <span className="mr-4">Explore Discipline</span>
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-300 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    );
}