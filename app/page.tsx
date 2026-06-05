"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Navbar from "./navbar";
import Link from "next/link";
import Image from 'next/image';
import HomeOutline from '../images/home01.png';

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

// --- 3D CAROUSEL COMPONENT (Home Page Specific) ---
function HomeCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Construction-focused images (active sites, frameworks, blueprints, machinery)
    const slides = [
        { 
            id: 1, 
            title: "Premium Residential", 
            category: "Residential Construction", 
            bg: "from-slate-700 to-slate-900",
            // UPDATED IMAGE: Architects/Engineers discussing blueprints on site
            image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            id: 2, 
            title: "Corporate Hubs", 
            category: "Commercial Construction", 
            bg: "from-amber-700 to-amber-900",
            image: "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            id: 3, 
            title: "Structural Restoration", 
            category: "Renovation", 
            bg: "from-emerald-700 to-emerald-900",
            image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            id: 4, 
            title: "Luxury Interiors", 
            category: "Interior Design", 
            bg: "from-blue-700 to-blue-900",
            image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
        { 
            id: 5, 
            title: "Move-In Ready Estates", 
            category: "Turnkey Solutions", 
            bg: "from-purple-700 to-purple-900",
            image: "https://images.unsplash.com/photo-1508450859948-4e04fabaa4ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
        },
    ];

    const nextSlide = () => setActiveIndex((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

    // --- AUTO ROTATION EFFECT ---
    useEffect(() => {
        const timer = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % slides.length);
        }, 4000); 

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
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
            <Navbar />

            {/* --- CUSTOM CSS FOR BACKGROUND ANIMATION --- */}
            <style>{`
                /* Geometric Animations */
                @keyframes geo-spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
                @keyframes geo-float {
                    0% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(10deg); }
                    100% { transform: translateY(0px) rotate(0deg); }
                }
                .animate-geo-spin {
                    animation: geo-spin 40s linear infinite;
                }
                .animate-geo-spin-slow {
                    animation: geo-spin 60s linear infinite reverse;
                }
                .animate-geo-float {
                    animation: geo-float 15s ease-in-out infinite;
                }
                
                /* Marquee Scroll */
                @keyframes scroll-left {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                .animate-scroll {
                    display: flex;
                    width: 200%;
                    animation: scroll-left 20s linear infinite;
                }
                .animate-scroll:hover {
                    animation-play-state: paused;
                }
            `}</style>

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-amber-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-blue-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-amber-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                {/* =========================================
                    SECTION 1: 3D CONSTRUCTION CAROUSEL
                    ========================================= */}
                <section className="w-full py-10 px-4">
                    <AnimateOnScroll direction="up">
                        <HomeCarousel />
                    </AnimateOnScroll>
                </section>

                {/* =========================================
                    SECTION 1.5: HERO
                    ========================================= */}
                <section className="w-full min-h-[80vh] flex justify-center items-center p-6 md:p-20 relative overflow-hidden mt-10">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 max-w-7xl w-full bg-white/40 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white">
                        
                        {/* Text Block - Slides in from the Right */}
                        <AnimateOnScroll direction="right" delay={0} className="flex-1 space-y-8 text-center md:text-left">
                            <div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mb-6">
                                    Rudhco
                                </h1>
                                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                                    We build modern homes & commercial spaces with quality, trust, and timely delivery.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                <Link href="/contact" className="group relative inline-flex justify-center items-center px-8 py-4 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                                    <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                        Get Free Consultation
                                    </span>
                                </Link>
                                <a href="tel:+918471888393" className="group relative inline-flex justify-center items-center px-8 py-4 bg-white overflow-hidden rounded-full border border-slate-300 hover:border-amber-500 transition-all duration-300 shadow-sm">
                                    <span className="relative z-10 text-slate-800 group-hover:text-amber-600 font-bold tracking-widest text-sm uppercase transition-colors">
                                        Call Now
                                    </span>
                                </a>
                            </div>
                        </AnimateOnScroll>

                        {/* Image Block - Slides in from the Left */}
                        <AnimateOnScroll direction="left" delay={200} className="flex-1 w-full max-w-[600px] relative group perspective-1000">
                            <div className="absolute -inset-2 bg-gradient-to-r from-blue-100 to-amber-100 rounded-2xl blur-lg opacity-60 group-hover:opacity-100 transition duration-1000"></div>
                            <Image
                                src={HomeOutline}
                                alt="Rudhco Construction"
                                className="relative rounded-2xl shadow-xl w-full h-auto object-cover transition duration-700 ease-in-out transform group-hover:scale-[1.02]"
                            />
                        </AnimateOnScroll>
                    </div>
                </section>

                {/* =========================================
                    SECTION 2: OUR SERVICES
                    ========================================= */}
                <section className="w-full max-w-7xl mx-auto px-6 py-24">
                    <AnimateOnScroll direction="up" className="text-center mb-16">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">What We Do</h2>
                        <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Our Services</h3>
                        <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                    </AnimateOnScroll>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Residential Construction", desc: "Bespoke homes built as a timeless testament to your legacy.", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
                            { title: "Commercial Construction", desc: "Robust, scalable infrastructure for thriving enterprises.", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
                            { title: "Renovation", desc: "Breathing refined life and modernity into existing structures.", icon: "M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" },
                            { title: "Interior Design", desc: "Curated, exquisite spaces designed for your immediate command.", icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" },
                            { title: "Ready to Use", desc: "End-to-end management from conceptualization to final execution.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                        ].map((srv, idx) => (
                            <AnimateOnScroll key={idx} direction="up" delay={idx * 100} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-8 rounded-2xl hover:border-amber-400 hover:shadow-2xl transition-all group">
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                    <svg className="w-8 h-8 text-amber-500 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={srv.icon} />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{srv.title}</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">{srv.desc}</p>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </section>

                {/* =========================================
                    SECTION 3: WHY CHOOSE US
                    ========================================= */}
                <section className="w-full bg-slate-100 border-y border-slate-200 py-24 relative overflow-hidden">
                    {/* Decorative geometry for this section */}
                    <div className="absolute -left-32 -top-32 w-96 h-96 border-[20px] border-slate-200 rounded-full animate-geo-spin-slow"></div>
                    <div className="absolute -right-32 -bottom-32 w-96 h-96 border-[20px] border-slate-200 rounded-3xl animate-geo-spin"></div>
                    
                    <div className="max-w-7xl mx-auto px-6 relative z-10">
                        <AnimateOnScroll direction="up" className="text-center mb-16">
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">The Rudhco Standard</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Why Choose Us</h3>
                            <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                        </AnimateOnScroll>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {["Experienced Team", "Quality Materials", "On-Time Delivery", "Transparent Pricing", "End-to-End Service"].map((item, idx) => (
                                <AnimateOnScroll key={idx} direction="up" delay={idx * 100} className="flex items-center gap-3 bg-white shadow-md border border-slate-100 px-8 py-4 rounded-full hover:shadow-lg hover:-translate-y-1 transition-all">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                    <span className="font-medium text-slate-700">{item}</span>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

            </main>

            {/* =========================================
                SECTION 8: FOOTER CONTACT & MAP
                ========================================= */}
            <footer className="w-full bg-white border-t border-slate-200 pt-16 pb-8 relative z-10">
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