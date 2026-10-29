"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Head from "next/head";
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

export default function DigitalMarketingPage() {
    return (
        <>
            <Head>
                {/* SEO Integration Notes */}
                <title>Rudhco Tech | Expert Digital Marketing & Creative Branding Agency</title>
                <meta name="description" content="Partner with a leading digital marketing agency specializing in SEO, PPC, and brand design. We deliver data-driven results and custom web solutions." />
            </Head>

            <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white overflow-x-hidden">
                
                {/* Section 1: Header */}
                <Navbar />

                {/* --- CUSTOM CSS FOR ANIMATIONS --- */}
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

                {/* Ambient Background Effects (Geometric Light Theme) */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-amber-500/10 rounded-3xl animate-geo-spin" />
                    <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-blue-600/5 rounded-full animate-geo-float" />
                    <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-amber-400/10 rotate-45 animate-geo-spin-slow" />
                </div>

                <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                    {/* =========================================
                        SECTION 2: HERO SECTION
                        ========================================= */}
                    <section className="w-full min-h-[90vh] flex justify-center items-center px-6 pt-32 pb-20 relative overflow-hidden">
                        <div className="max-w-5xl w-full text-center space-y-8 z-10 bg-white/40 backdrop-blur-sm p-10 md:p-16 rounded-3xl shadow-2xl shadow-slate-200/50 border border-white">
                            <AnimateOnScroll direction="up" delay={0}>
                                <h2 className="text-amber-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4">Rudhco Tech Digital</h2>
                                {/* Removed font-serif to match other pages */}
                                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-slate-900">
                                    Driving Growth Through Innovative Digital Marketing and Creative Design.
                                </h1>
                            </AnimateOnScroll>
                            
                            <AnimateOnScroll direction="up" delay={150}>
                                <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto">
                                    We empower forward thinking brands with data driven strategies and high impact visual identities. From startups to established enterprises, we turn your digital vision into measurable ROI.
                                </p>
                            </AnimateOnScroll>

                            <AnimateOnScroll direction="up" delay={300} className="pt-8">
                                <Link href="/contact" className="group relative inline-flex justify-center items-center px-10 py-5 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                                    <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                        Start Your Project
                                    </span>
                                </Link>
                            </AnimateOnScroll>
                        </div>
                    </section>

                    {/* =========================================
                        SECTION 3: TRUST BAR
                        ========================================= */}
                    {/* <section className="w-full border-y border-slate-200 bg-white/60 backdrop-blur-md py-10 overflow-hidden">
                        <div className="max-w-7xl mx-auto px-6 text-center mb-8">
                            <p className="text-sm font-bold tracking-[0.2em] text-slate-400 uppercase">Trusted by industry leaders and growing brands globally.</p>
                        </div>
                        <div className="w-full overflow-hidden relative">
                            <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
                            <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div> */}
                            
                            {/* Auto-scrolling Marquee */}
                            {/* <div className="animate-scroll flex items-center gap-16 md:gap-32 px-8"> */}
                                {/* {[1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6].map((item, idx) => (
                                    <div key={idx} className="flex-shrink-0 text-xl md:text-2xl font-bold text-slate-300 grayscale hover:grayscale-0 hover:text-amber-500 transition-all duration-500 cursor-pointer">
                                        BRAND LOGO {item}
                                    </div>
                                ))} */}
                            {/* </div> */}
                        {/* </div> */}
                    {/* </section> */}

                    {/* =========================================
                        SECTION 4: KEY SERVICES
                        ========================================= */}
                    <section className="w-full max-w-7xl mx-auto px-6 py-32">
                        <AnimateOnScroll direction="up" className="text-center mb-20">
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">The Core</h2>
                            <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Comprehensive Solutions for the Digital Age</h3>
                            <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                        </AnimateOnScroll>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Service 1 */}
                            <AnimateOnScroll direction="up" delay={0} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-8 rounded-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                    <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900">Branding & Visual Identity</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">Crafting unique brand stories through expert logo design, UI/UX, and cohesive visual strategies that resonate with your audience.</p>
                            </AnimateOnScroll>

                            {/* Service 2 */}
                            <AnimateOnScroll direction="up" delay={100} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-8 rounded-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                    <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900">Performance Marketing</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">Scalable growth via Meta Ads and Google Ads, optimized for high conversion rates and lower acquisition costs.</p>
                            </AnimateOnScroll>

                            {/* Service 3 */}
                            <AnimateOnScroll direction="up" delay={200} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-8 rounded-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                    <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900">Search Engine Optimization</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">Dominate the SERPs with our specialized SEO services, including technical audits, keyword research, and high-quality backlink building.</p>
                            </AnimateOnScroll>

                            {/* Service 4 */}
                            <AnimateOnScroll direction="up" delay={300} className="bg-white shadow-xl shadow-slate-200/50 border border-slate-100 p-8 rounded-2xl hover:border-amber-400 hover:-translate-y-2 transition-all duration-500 group relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-amber-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
                                <div className="p-3 bg-slate-50 rounded-xl inline-block mb-6 group-hover:bg-amber-50 transition-colors">
                                    <svg className="w-8 h-8 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h4 className="text-xl font-bold mb-3 text-slate-900">Web Design & Development</h4>
                                <p className="text-slate-600 font-light text-sm leading-relaxed">High performance, custom coded websites designed for mobile first users and seamless user experiences.</p>
                            </AnimateOnScroll>
                        </div>
                    </section>

                    {/* =========================================
                        SECTION 5: FEATURED WORK
                        ========================================= */}
                    {/* <section id="portfolio" className="w-full bg-slate-100 border-y border-slate-200 py-32 relative overflow-hidden">
                        <div className="absolute -left-32 -top-32 w-96 h-96 border-[20px] border-slate-200 rounded-full animate-geo-spin-slow"></div>
                        <div className="max-w-7xl mx-auto px-6 relative z-10">
                            <AnimateOnScroll direction="up" className="flex flex-col md:flex-row justify-between items-end mb-16">
                                <div>
                                    <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">Portfolio</h2>
                                    <h3 className="text-4xl md:text-5xl font-bold text-slate-900">Our Work in Action</h3>
                                </div>
                            </AnimateOnScroll> */}

                            {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10"> */}
                                {/* Case Study 1 */}
                                {/* <AnimateOnScroll direction="up" delay={0} className="group cursor-pointer">
                                    <div className="w-full h-80 bg-slate-200 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-amber-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                            <span className="text-slate-400 text-2xl font-bold tracking-widest uppercase">Project Visual</span>
                                        </div>
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                                            <span className="px-8 py-3 border border-white text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-slate-900 transition-colors">View Case Study</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2 text-slate-900">[Client Name] - Reimagining Brand Identity</h4>
                                    <p className="text-slate-600 font-light">Global Impact through Strategic Branding</p>
                                </AnimateOnScroll> */}

                                {/* Case Study 2 */}
                                {/* <AnimateOnScroll direction="up" delay={200} className="group cursor-pointer">
                                    <div className="w-full h-80 bg-slate-200 rounded-2xl mb-6 overflow-hidden relative shadow-lg">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-50 to-blue-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-700">
                                            <span className="text-slate-400 text-2xl font-bold tracking-widest uppercase">Project Visual</span>
                                        </div>
                                        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-sm">
                                            <span className="px-8 py-3 border border-white text-white rounded-full text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-slate-900 transition-colors">View Case Study</span>
                                        </div>
                                    </div>
                                    <h4 className="text-2xl font-bold mb-2 text-slate-900">[Client Name] - Achieving 150% Lead Growth</h4>
                                    <p className="text-slate-600 font-light">Performance Marketing & ROI Optimization</p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </section> */}

                    {/* =========================================
                        SECTION 6: WHY CHOOSE US (The Process)
                        ========================================= */}
                    <section className="w-full py-32">
                        <div className="max-w-7xl mx-auto px-6">
                            <AnimateOnScroll direction="up" className="text-center mb-20">
                                <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">The Process</h2>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">A Strategy-First Approach</h3>
                                <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                            </AnimateOnScroll>

                            <div className="flex flex-col md:flex-row justify-between relative gap-8 md:gap-4">
                                {/* Connecting Line (Desktop only) */}
                                <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-[2px] border-t-2 border-dashed border-slate-300 z-0"></div>

                                {/* Step 1 */}
                                <AnimateOnScroll direction="up" delay={0} className="flex-1 relative z-10 flex flex-col items-center text-center px-4 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-amber-500 text-2xl font-bold mb-6 shadow-md">01</div>
                                    <h4 className="text-xl font-bold mb-3 text-slate-900">Discovery & Research</h4>
                                    <p className="text-slate-600 font-light text-sm leading-relaxed">We dive deep into your market data and competitor landscape.</p>
                                </AnimateOnScroll>

                                {/* Step 2 */}
                                <AnimateOnScroll direction="up" delay={200} className="flex-1 relative z-10 flex flex-col items-center text-center px-4 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <div className="w-24 h-24 rounded-full bg-white border-4 border-amber-500 flex items-center justify-center text-amber-500 text-2xl font-bold mb-6 shadow-md">02</div>
                                    <h4 className="text-xl font-bold mb-3 text-slate-900">Creative Execution</h4>
                                    <p className="text-slate-600 font-light text-sm leading-relaxed">Our designers and marketers build assets that command attention.</p>
                                </AnimateOnScroll>

                                {/* Step 3 */}
                                <AnimateOnScroll direction="up" delay={400} className="flex-1 relative z-10 flex flex-col items-center text-center px-4 bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                                    <div className="w-24 h-24 rounded-full bg-white border-4 border-slate-100 flex items-center justify-center text-amber-500 text-2xl font-bold mb-6 shadow-md">03</div>
                                    <h4 className="text-xl font-bold mb-3 text-slate-900">Optimization & Scaling</h4>
                                    <p className="text-slate-600 font-light text-sm leading-relaxed">Continuous A/B testing and data analysis to maximize your results.</p>
                                </AnimateOnScroll>
                            </div>
                        </div>
                    </section>

                    {/* =========================================
                        SECTION 7: TESTIMONIALS
                        ========================================= */}
                    <section className="w-full bg-amber-50 py-32 border-y border-amber-100">
                        <div className="max-w-4xl mx-auto px-6 text-center">
                            <AnimateOnScroll direction="up">
                                <h2 className="text-amber-600 tracking-[0.3em] text-xs font-bold uppercase mb-4">Testimonials</h2>
                                <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-16">Client Success Stories</h3>
                            </AnimateOnScroll>

                            <AnimateOnScroll direction="up" delay={150} className="relative">
                                <svg className="w-16 h-16 text-amber-200 absolute -top-8 left-1/2 -translate-x-1/2" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                                <p className="text-slate-700 text-2xl md:text-3xl italic leading-relaxed relative z-10">
                                    "Their team didn't just provide a service; they became a growth partner. Our online visibility has never been higher."
                                </p>
                                <div className="mt-8">
                                    <div className="w-16 h-1 h-[2px] bg-amber-500 mx-auto mb-4"></div>
                                    <p className="font-bold text-slate-900 tracking-wider">Executive Director</p>
                                    <p className="text-sm text-slate-500 uppercase tracking-widest">Global Partner</p>
                                </div>
                            </AnimateOnScroll>
                        </div>
                    </section>

                    {/* =========================================
                        SECTION 8: FINAL CTA & FOOTER
                        ========================================= */}
                    <section className="w-full">
                        {/* Mega CTA */}
                        <div className="w-full bg-white py-32 px-6 relative overflow-hidden">
                            <div className="max-w-4xl mx-auto text-center relative z-10">
                                <AnimateOnScroll direction="none">
                                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-8">
                                        Ready to Outperform Your Competition?
                                    </h2>
                                    <p className="text-slate-600 text-xl font-light mb-10 max-w-2xl mx-auto">
                                        Let's build something extraordinary together.
                                    </p>
                                    <Link href="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-amber-500 rounded-full hover:bg-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)] transition-all duration-300 group">
                                        <span className="text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                            Book a Strategy Call
                                        </span>
                                    </Link>
                                </AnimateOnScroll>
                            </div>
                        </div>

                        {/* Light Theme Footer matching the previous pages */}
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
                                                <p className="text-slate-700 font-medium max-w-xs leading-relaxed">House no. 6, Sadabor avenue, 2nd floor, bylane no. 7, Mother Teresa road, Guwahati -781021</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Google Map */}
                                <div className="w-full h-64 md:h-full min-h-[250px] rounded-2xl overflow-hidden shadow-lg border border-slate-200 transition duration-700">
                                  <iframe 
                                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7161.434728997843!2d91.7786602813255!3d26.173332733325708!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375a59a811ed3e65%3A0x79fa7ed6ed986926!2sGeeta%20Nagar%2C%20Guwahati%2C%20Assam%20781024!5e0!3m2!1sen!2sin!4v1790850570099!5m2!1sen!2sin" 
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
                    </section>
                </main>
            </div>
        </>
    );
}