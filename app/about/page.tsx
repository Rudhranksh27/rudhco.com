import Navbar from '../navbar';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
            <Navbar />

            {/* Background Ambient Glow */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-amber-900/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
            </div>

            <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-6 py-20 md:py-32">
                
                {/* 1. HERO SECTION */}
                <div className="max-w-4xl w-full text-center mb-16 md:mb-24">
                    <h2 className="text-amber-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-6 animate-fade-in-up">
                        The Legacy
                    </h2>
                    <h1 className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-gray-500">
                        About Rudhco
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent mx-auto opacity-50"></div>
                </div>

                {/* 2. MAIN CONTENT CARD */}
                <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    
                    {/* Left: The Narrative */}
                    <div className="space-y-6 text-center md:text-left">
                        <h3 className="text-2xl md:text-3xl font-light text-white">
                            Powered by <span className="font-bold text-amber-500">Excellence.</span>
                        </h3>
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Welcome to an ecosystem of luxury and precision. We are dedicated to providing the best service possible, bridging the gap between dream and reality.
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed font-light">
                            Our team is passionate about delivering high-quality solutions that meet your distinct needs. While building your legacy, Rudhranksh stands as your partner in perfection.
                        </p>
                    </div>

                    {/* Right: The Pillars (Visual Interest) */}
                    <div className="relative">
                        {/* Decorative Border Box */}
                        <div className="absolute inset-0 border border-amber-500/20 rounded-xl transform translate-x-4 translate-y-4 hidden md:block"></div>
                        
                        <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-xl shadow-2xl">
                            <ul className="space-y-8">
                                <li className="flex items-start gap-4">
                                    <div className="p-3 bg-amber-500/10 rounded-full text-amber-500">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase text-sm">Estate & Construction</h4>
                                        <p className="text-gray-500 text-sm mt-1">Crafting bespoke living spaces.</p>
                                    </div>
                                </li>
                                {/* <div className="w-full h-px bg-white/5"></div>
                                <li className="flex items-start gap-4">
                                    <div className="p-3 bg-blue-500/10 rounded-full text-blue-400">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold tracking-wide uppercase text-sm">Automotive Solutions</h4>
                                        <p className="text-gray-500 text-sm mt-1">Connecting you to the perfect drive.</p>
                                    </div>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* 3. FOOTER SIGNATURE */}
                <div className="mt-24 text-center">
                    <p className="text-gray-600 uppercase tracking-[0.4em] text-xs">
                        Est. 2026
                    </p>
                </div>

            </main>
        </div>
    );
}