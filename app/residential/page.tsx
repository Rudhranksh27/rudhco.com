"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Navbar from "../navbar";
import Link from "next/link";
import Image from "next/image";

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
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); 
                }
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
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
            className={`transition-all duration-[1000ms] ease-out ${isVisible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenClasses} ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

// --- 3D CAROUSEL COMPONENT ---
function ConstructionCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Placeholder data for your construction images
    const slides = [
    { 
        id: 1, 
        title: "Modern Minimalist Villa", 
        category: "Exterior", 
        bg: "from-slate-700 to-slate-900",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
        id: 2, 
        title: "Luxury Living Room", 
        category: "Interior", 
        bg: "from-amber-700 to-amber-900",
        image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
        id: 3, 
        title: "Assam Heritage Bungalow", 
        category: "Architecture", 
        bg: "from-emerald-700 to-emerald-900",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
        id: 4, 
        title: "Smart Home Kitchen", 
        category: "Turnkey", 
        bg: "from-blue-700 to-blue-900",
        image: "https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
    { 
        id: 5, 
        title: "Scenic Balcony Elevation", 
        category: "Exterior", 
        bg: "from-purple-700 to-purple-900",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
    },
];

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

    // --- AUTO ROTATION EFFECT ---
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 4000); 

        // Cleanup interval on unmount
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full max-w-6xl mx-auto h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden" style={{ perspective: '1200px' }}>
            
            {/* Carousel Track */}
            <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
                {slides.map((slide, index) => {
                    let offset = index - activeIndex;
                    
                    if (offset < -2) offset += slides.length;
                    if (offset > 2) offset -= slides.length;

                    let transform = "";
                    let zIndex = 20;
                    let opacity = 1;

                    if (offset === 0) {
                        transform = "translateX(0) scale(1) translateZ(0px) rotateY(0deg)";
                        zIndex = 30;
                        opacity = 1;
                    } else if (offset === 1 || offset === -1) {
                        const direction = offset > 0 ? 1 : -1;
                        transform = `translateX(${direction * 35}%) scale(0.85) translateZ(-100px) rotateY(${direction * -25}deg)`;
                        zIndex = 20;
                        opacity = 0.7;
                    } else if (offset === 2 || offset === -2) {
                        const direction = offset > 0 ? 1 : -1;
                        transform = `translateX(${direction * 65}%) scale(0.65) translateZ(-250px) rotateY(${direction * -40}deg)`;
                        zIndex = 10;
                        opacity = 0.3;
                    } else {
                        transform = "translateX(0) scale(0) translateZ(-500px)";
                        opacity = 0;
                    }

                    return (
                        <div 
                            key={slide.id}
                            className={`absolute w-[80%] md:w-[60%] lg:w-[50%] h-[300px] md:h-[450px] transition-all duration-[1200ms] ease-in-out will-change-transform rounded-3xl shadow-2xl overflow-hidden cursor-pointer bg-slate-200 group`}
                            style={{ transform, zIndex, opacity }}
                            onClick={() => setActiveIndex(index)}
                        >
                            {/* --- THE ACTUAL IMAGE --- */}
                            <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* --- TEXT OVERLAY --- */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-[2px] group-hover:bg-black/20 transition-all duration-500">
                                <div className="absolute inset-0 border border-white/20 m-4 rounded-2xl"></div>
                                <span className="text-white/90 font-bold tracking-[0.2em] text-xs uppercase mb-2 drop-shadow-md">Project 0{slide.id}</span>
                                <h3 className="text-white text-2xl md:text-3xl font-bold drop-shadow-lg">{slide.title}</h3>
                                <span className="mt-4 px-6 py-2 rounded-full bg-white/20 text-white text-sm backdrop-blur-md opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-white/30">
                                    {slide.category}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 md:bottom-10 flex gap-6 z-40">
                <button onClick={prevSlide} className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-amber-500 hover:border-amber-500 hover:-translate-x-1 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-white shadow-lg border border-slate-200 flex items-center justify-center text-slate-600 hover:text-amber-500 hover:border-amber-500 hover:translate-x-1 transition-all">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
            </div>
        </div>
    );
}

// --- MAIN PAGE COMPONENT ---
export default function ResidentialConstructionPage() {
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
                .animate-geo-spin { animation: geo-spin 40s linear infinite; }
                .animate-geo-spin-slow { animation: geo-spin 60s linear infinite reverse; }
                .animate-geo-float { animation: geo-float 15s ease-in-out infinite; }
            `}</style>

            {/* Ambient Background Effects (Geometric Light Theme) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-amber-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-blue-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-amber-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                {/* =========================================
                    SECTION 1: 3D CONSTRUCTION CAROUSEL
                    ========================================= */}
                <section className="w-full pt-32 pb-10 px-4">
                    <AnimateOnScroll direction="up">
                        <ConstructionCarousel />
                    </AnimateOnScroll>
                </section>

                {/* =========================================
                    SECTION 2: PAGE HEADER
                    ========================================= */}
                <section className="w-full py-24 px-6">
                    <AnimateOnScroll direction="down" className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4">
                            Premium Living Spaces
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mb-6">
                            Residential Construction
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            We forge private estates with an unyielding commitment to grandeur. From foundation to final finish, we craft bespoke homes that stand as a timeless testament to your legacy.
                        </p>
                    </AnimateOnScroll>
                </section>

                {/* =========================================
                    SECTION 3: OUR RESIDENTIAL EXPERTISE
                    ========================================= */}
                <section className="w-full max-w-7xl mx-auto px-6 py-24">
                    <AnimateOnScroll direction="up" className="text-center mb-16">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">The Rudhco Standard</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Crafting Perfect Homes</h3>
                        <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Feature 1 */}
                        <AnimateOnScroll direction="up" delay={0} className="bg-white shadow-lg shadow-slate-200/50 border border-slate-100 p-8 md:p-10 rounded-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Bespoke Architectural Design</h4>
                            <p className="text-slate-600 font-light leading-relaxed">Every client has a unique story. We integrate site-specific climate considerations of the North-East with modern, minimalist, or traditional architectural trends tailored entirely to your vision.</p>
                        </AnimateOnScroll>

                        {/* Feature 2 */}
                        <AnimateOnScroll direction="up" delay={150} className="bg-white shadow-lg shadow-slate-200/50 border border-slate-100 p-8 md:p-10 rounded-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Premium Material Sourcing</h4>
                            <p className="text-slate-600 font-light leading-relaxed">From the deep foundation to the finest interior finishes, we refuse to compromise. We source only the highest-grade materials to ensure longevity, structural excellence, and absolute safety.</p>
                        </AnimateOnScroll>

                        {/* Feature 3 */}
                        <AnimateOnScroll direction="up" delay={300} className="bg-white shadow-lg shadow-slate-200/50 border border-slate-100 p-8 md:p-10 rounded-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Innovative Tech Integration</h4>
                            <p className="text-slate-600 font-light leading-relaxed">We utilize modern construction technologies to streamline project timelines. Enjoy transparent communication and updates throughout the entire lifecycle of your home build.</p>
                        </AnimateOnScroll>

                        {/* Feature 4 */}
                        <AnimateOnScroll direction="up" delay={450} className="bg-white shadow-lg shadow-slate-200/50 border border-slate-100 p-8 md:p-10 rounded-2xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 group">
                            <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                <svg className="w-8 h-8 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>
                            </div>
                            <h4 className="text-2xl font-bold text-slate-900 mb-4">Turnkey Interior Readiness</h4>
                            <p className="text-slate-600 font-light leading-relaxed">A sovereign experience from blueprint to handover. We preside over every aesthetic detail, delivering a fully realized, exquisitely designed home ready for you to move into immediately.</p>
                        </AnimateOnScroll>
                    </div>
                </section>

                {/* =========================================
                    SECTION 4: CALL TO ACTION
                    ========================================= */}
                <section className="w-full px-6">
                    <AnimateOnScroll direction="none" className="max-w-5xl mx-auto text-center bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-amber-500/5 blur-[100px] pointer-events-none"></div>
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 relative z-10">Start Your Residential Project</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light relative z-10">
                            Partner with our chief architects and structural engineers to bring your dream sanctuary to life. Experience luxury, transparency, and timely delivery.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center relative z-10 px-12 py-5 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] group">
                            <span className="text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                Consult With Us
                            </span>
                        </Link>
                    </AnimateOnScroll>
                </section>

            </main>

            {/* =========================================
                SECTION 5: FOOTER (Matches other pages)
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
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3580.7141744504574!2d91.77225167492242!3d26.173436591470374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59001b441573%3A0xd76a2a6023476d98!2ssugam%20path%20zoo%20road!5e0!3m2!1sen!2sin!4v1788258520248!5m2!1sen!2sin" 
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