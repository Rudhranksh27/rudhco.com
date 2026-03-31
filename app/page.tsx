"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Navbar from '../app/navbar';
import Image from 'next/image';
import HomeOutline from '../images/home01.png'; // Assuming this is the correct path
import Link from 'next/link';

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
            { 
                threshold: 0.15, 
                rootMargin: "0px 0px -50px 0px" 
            } 
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

// --- MAIN PAGE COMPONENT ---
export default function Home() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black overflow-x-hidden">
            <Navbar />

            {/* --- CUSTOM CSS FOR BACKGROUND ANIMATION --- */}
            <style>{`
                @keyframes float-blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-float-slow { animation: float-blob 20s ease-in-out infinite; }
                .animate-float-slower { animation: float-blob 25s ease-in-out infinite reverse; }
            `}</style>

            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px] animate-float-slow" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] animate-float-slower" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                {/* =========================================
                    SECTION 1: HERO
                    ========================================= */}
                <section className="w-full min-h-[80vh] flex justify-center items-center p-6 md:p-20 relative overflow-hidden mt-10">
                    <div className="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-24 max-w-7xl w-full">
                        
                        {/* Text Block - Slides in from the Right */}
                        <AnimateOnScroll direction="right" delay={0} className="flex-1 space-y-8 text-center md:text-left">
                            <div>
                                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 mb-6">
                                    Rudhco
                                </h1>
                                <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-lg mx-auto md:mx-0">
                                    We build modern homes & commercial spaces with quality, trust, and timely delivery.
                                </p>
                            </div>
                            
                            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                                <Link href="/contact" className="group relative inline-flex justify-center items-center px-8 py-4 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]">
                                    <span className="relative z-10 text-black font-bold tracking-widest text-sm uppercase transition-colors">
                                        Get Free Consultation
                                    </span>
                                </Link>
                                <a href="tel:+918471888393" className="group relative inline-flex justify-center items-center px-8 py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-amber-500 transition-all duration-300">
                                    <span className="relative z-10 text-white group-hover:text-amber-500 font-bold tracking-widest text-sm uppercase transition-colors">
                                        Call Now
                                    </span>
                                </a>
                            </div>
                        </AnimateOnScroll>

                        {/* Image Block - Slides in from the Left */}
                        <AnimateOnScroll direction="left" delay={200} className="flex-1 w-full max-w-[600px] relative group perspective-1000">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-amber-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <Image
                                src={HomeOutline}
                                alt="Rudhco Construction"
                                className="relative rounded-2xl shadow-2xl w-full h-auto object-cover grayscale group-hover:grayscale-0 transition duration-700 ease-in-out transform group-hover:scale-[1.02]"
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
                        <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Our Services</h3>
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
                            <AnimateOnScroll key={idx} direction="up" delay={idx * 100} className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                                <svg className="w-10 h-10 text-amber-500 mb-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={srv.icon} />
                                </svg>
                                <h4 className="text-xl font-bold mb-3">{srv.title}</h4>
                                <p className="text-gray-400 font-light text-sm">{srv.desc}</p>
                            </AnimateOnScroll>
                        ))}
                    </div>
                </section>

                {/* =========================================
                    SECTION 3: WHY CHOOSE US
                    ========================================= */}
                <section className="w-full bg-white/[0.02] border-y border-white/10 py-24">
                    <div className="max-w-7xl mx-auto px-6">
                        <AnimateOnScroll direction="up" className="text-center mb-16">
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">The Rudhco Standard</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Why Choose Us</h3>
                            <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                        </AnimateOnScroll>

                        <div className="flex flex-wrap justify-center gap-6 md:gap-10">
                            {["Experienced Team", "Quality Materials", "On-Time Delivery", "Transparent Pricing", "End-to-End Service"].map((item, idx) => (
                                <AnimateOnScroll key={idx} direction="up" delay={idx * 100} className="flex items-center gap-3 bg-neutral-900/50 border border-white/10 px-6 py-4 rounded-full">
                                    <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                    <span className="font-medium text-gray-200">{item}</span>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section>

                {/* =========================================
                    SECTION 4: FEATURED PROJECTS
                    ========================================= */}
                {/* <section className="w-full max-w-7xl mx-auto px-6 py-24">
                    <AnimateOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-end mb-16">
                        <div>
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">Our Portfolio</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white">Featured Projects</h3>
                        </div>
                        <Link href="/services" className="hidden md:inline-flex items-center text-sm font-bold tracking-widest uppercase text-amber-500 hover:text-white transition-colors mt-6 md:mt-0 group">
                            <span className="mr-2">View All Projects</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </AnimateOnScroll> */}

                    {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[1, 2, 3].map((item, idx) => (
                            <AnimateOnScroll key={idx} direction="up" delay={idx * 150} className="group cursor-pointer">
                                <div className="w-full h-64 bg-neutral-800 rounded-2xl mb-6 overflow-hidden relative border border-white/10"> */}
                                    {/* Placeholder for Project Image */}
                                    {/* <div className="absolute inset-0 bg-gradient-to-tr from-neutral-900 to-neutral-700 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                        <span className="text-neutral-500 font-bold tracking-widest uppercase">Project 0{item}</span>
                                    </div>
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                        <span className="px-6 py-2 border border-white text-white rounded-full text-xs uppercase tracking-widest">View Details</span>
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2">Luxury Villa Residency {item}</h4>
                                <p className="text-gray-400 text-sm font-light">Guwahati, Assam • Residential</p>
                            </AnimateOnScroll>
                        ))}
                    </div> */}
                    
                    {/* <div className="mt-10 text-center md:hidden">
                        <Link href="/services" className="inline-flex items-center text-sm font-bold tracking-widest uppercase text-amber-500 hover:text-white transition-colors group">
                            <span className="mr-2">View All Projects</span>
                            <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>
                </section> */}

                {/* =========================================
                    SECTION 5 & 6: STATS & TESTIMONIALS (Combined Flow)
                    ========================================= */}
                {/* <section className="w-full py-24 bg-gradient-to-b from-transparent to-neutral-900/30">
                    <div className="max-w-7xl mx-auto px-6"> */}
                        
                        {/* STATS */}
                        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32 border-y border-white/10 py-16">
                            {[
                                { num: "50+", label: "Projects Completed" },
                                { num: "15+", label: "Years of Experience" },
                                { num: "100%", label: "Happy Clients" },
                            ].map((stat, idx) => (
                                <AnimateOnScroll key={idx} direction="up" delay={idx * 100} className="text-center">
                                    <div className="text-5xl md:text-6xl font-bold text-amber-500 mb-2">{stat.num}</div>
                                    <div className="text-sm tracking-widest uppercase text-gray-400">{stat.label}</div>
                                </AnimateOnScroll>
                            ))}
                        </div> */}

                        {/* TESTIMONIALS */}
                        {/* <AnimateOnScroll direction="up" className="text-center mb-16">
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">Client Voices</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">Testimonials</h3>
                        </AnimateOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { text: "Rudhco turned our dream into reality. The quality of materials and the attention to detail were simply unmatched.", name: "Ananya S.", title: "Homeowner" },
                                { text: "Delivered our commercial space right on schedule. Their transparent pricing made the entire process stress-free.", name: "Rajiv B.", title: "Business Owner" },
                                { text: "The interior design team is phenomenal. They understood our vision perfectly and executed it flawlessly.", name: "Meera K.", title: "Homeowner" }
                            ].map((testimonial, idx) => (
                                <AnimateOnScroll key={idx} direction="up" delay={idx * 150} className="bg-white/5 border border-white/10 p-8 rounded-2xl relative">
                                    <svg className="w-8 h-8 text-amber-500/30 absolute top-6 left-6" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                    <p className="text-gray-300 font-light italic mb-8 relative z-10 pt-8">"{testimonial.text}"</p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-amber-500/50"></div>
                                        <div>
                                            <h5 className="font-bold text-sm text-white">{testimonial.name}</h5>
                                            <p className="text-xs text-gray-500 uppercase">{testimonial.title}</p>
                                        </div>
                                    </div>
                                </AnimateOnScroll>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* =========================================
                    SECTION 7: CTA
                    ========================================= */}
                {/* <section className="w-full max-w-5xl mx-auto px-6 py-24">
                    <AnimateOnScroll direction="none" className="text-center bg-gradient-to-b from-amber-500/10 to-transparent border border-amber-500/20 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-amber-500/5 blur-[50px] animate-float-slow pointer-events-none"></div>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 relative z-10">
                            Planning Your Dream Project? <br className="hidden md:block"/> Let’s Build It Together.
                        </h2>
                        <Link href="/contact" className="inline-flex items-center justify-center relative z-10 px-10 py-4 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 group shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                            <span className="text-black font-bold tracking-widest text-sm uppercase transition-colors">
                                Get Free Quote
                            </span>
                        </Link>
                    </AnimateOnScroll>
                </section> */}
            </main>

            {/* =========================================
                SECTION 8: FOOTER CONTACT & MAP
                ========================================= */}
            <footer className="w-full bg-neutral-900/50 border-t border-white/10 pt-16 pb-8 relative z-10">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Contact Details */}
                    <div>
                        <h3 className="text-2xl font-bold text-white mb-6">Contact Us</h3>
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Phone</p>
                                    <a href="tel:+918471888393" className="text-gray-300 hover:text-amber-500 transition-colors">+91 84718 88393</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Email</p>
                                    <a href="mailto:business@rudhco.com" className="text-gray-300 hover:text-amber-500 transition-colors">business@rudhco.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <svg className="w-6 h-6 text-amber-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">Location</p>
                                    <p className="text-gray-300 max-w-xs">House No-35, 3rd floor, Panjabari Road, Near Canara Bank, Panjabari Branch, Pin - 781022, Assam</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Google Map */}
                    <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition duration-700">
                      <iframe 
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3581.9567412637775!2d91.80948042400502!3d26.132953417947224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b288bd1435301fb%3A0x655c14cb620743d1!2sRudhco%20Infra%20%26%20Tech%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1774775589853!5m2!1sen!2sin" 
                          width="100%" 
                          height="100%" 
                          style={{ border: 0 }} 
                          allowFullScreen 
                          loading="lazy" 
                          referrerPolicy="no-referrer-when-downgrade">
                      </iframe>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 text-center text-gray-600 text-xs tracking-widest uppercase">
                    © 2026 RUDHCO INFRA & TECH PVT. LTD. ALL RIGHTS RESERVED.
                </div>
            </footer>
        </div>
    );
}