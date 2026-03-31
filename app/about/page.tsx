"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import Head from "next/head";
import Navbar from "../navbar";
import Link from "next/link";
// import Image from "next/image";
// NOTE: When you upload a photo of Raktim Kalita or your office, set the Alt Text to: Raktim Kalita, Director of Rudhco Infra & Tech Guwahati.

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
                // Toggles true when entering screen, false when leaving (creates the slide in/out effect)
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    setIsVisible(false); 
                }
            },
            { 
                threshold: 0.15, // Triggers when 15% of the element is visible
                rootMargin: "0px 0px -50px 0px" // Slightly delays the animation until it's further up the screen
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
export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About Rudhco | Shaping Your Legacy</title>
                <meta name="description" content="Rudhco Infra & Tech is a premier luxury home builder in Guwahati, led by Raktim Kalita. We specialize in bespoke architectural design and premium construction in Assam." />
            </Head>

            <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black">
                <Navbar />

                {/* Ambient Background Effects */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                    <div className="absolute top-[10%] left-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[150px]" />
                    <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px]" />
                </div>

                <main className="flex-grow flex flex-col relative z-10 w-full px-6 py-24 md:py-32 overflow-hidden">
                    <div className="max-w-6xl mx-auto w-full space-y-32">
                        
                        {/* =========================================
                            SECTION 1: HERO / INTRODUCTION
                            ========================================= */}
                        <AnimateOnScroll direction="up" className="text-center max-w-4xl mx-auto">
                            <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">
                                Our Foundation
                            </h2>
                            <h1 className="mb-8 flex flex-col gap-2 md:gap-4">
                                <span className="text-5xl md:text-7xl font-bold uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
                                    Rudhco
                                </span>
                                <span className="text-2xl md:text-3xl font-light text-gray-400 leading-snug">
                                    Shaping Your Legacy through Architectural Vision
                                </span>
                            </h1>
                            <div className="w-24 h-1 bg-amber-500 mx-auto mt-8 mb-8 opacity-80 transition-transform duration-1000 hover:scale-x-150"></div>
                            <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed text-justify">
                                At Rudhco Infra & Tech Pvt. Ltd., we believe that a home is more than just a structure; it is a testament to your success and a sanctuary for your future generations. Based in the heart of Guwahati, we are a premier infrastructure and technology driven construction firm dedicated to turning ambitious architectural visions into tangible realities.
                            </p>
                        </AnimateOnScroll>

                        {/* =========================================
                            SECTION 2: WHO WE ARE & OUR VISION
                            ========================================= */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 text-justify">
                            <AnimateOnScroll direction="left" delay={100} className="space-y-6">
                                <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Who We Are
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    Rudhco was founded on the principles of integrity, innovation, and unparalleled craftsmanship. As a modern leader in the Northeast's construction industry, we bridge the gap between traditional reliability and futuristic design. We specialize in luxury residential projects, commercial infrastructure, and bespoke design build services that prioritize both aesthetics and structural excellence.
                                </p>
                            </AnimateOnScroll>

                            <AnimateOnScroll direction="right" delay={300} className="space-y-6">
                                <h2 className="text-3xl font-bold text-white mb-6 border-b border-white/10 pb-4">
                                    Vision: Constructing Perfect Homes
                                </h2>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    Our mission is simple: to be your ultimate destination for high end construction. We understand that every client has a unique story, and we aim to reflect that story through bespoke designs and premium materials. Whether it's a minimalist modern villa or a grand commercial landmark, we focus on creating spaces that inspire.
                                </p>
                            </AnimateOnScroll>
                        </div>

                        {/* =========================================
                            SECTION 3: OUR LEADERSHIP
                            ========================================= */}
                        <AnimateOnScroll direction="up" className="bg-white/5 backdrop-blur-sm border border-white/10 p-10 md:p-16 rounded-3xl relative overflow-hidden text-justify">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-[80px]"></div>
                            
                            <h2 className="text-3xl font-bold text-white mb-8 text-center md:text-left">
                                Our Leadership
                            </h2>
                            <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-4xl text-center md:text-left">
                                Rudhco Infra & Tech Pvt. Ltd. is led by a team of dedicated professionals committed to redefining the skyline of North-East.
                            </p>
                            
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 border-t border-white/10 pt-8">
                                <div className="w-32 h-32 rounded-full bg-neutral-800 border-2 border-amber-500/50 flex-shrink-0 flex items-center justify-center text-gray-600 text-sm overflow-hidden relative group">
                                    <span className="group-hover:scale-110 transition-transform duration-500">[Image]</span>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-amber-500 mb-2">Raktim Kalita</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Founder & Director</p>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        With a deep rooted passion for urban development, Raktim Kalita founded Rudhco to bring world class construction standards to North-East. Under his leadership, the company focuses on sustainable growth, ethical building practices, and delivering "legacy" homes that stand the test of time.
                                    </p>
                                </div>
                            </div>
                        </AnimateOnScroll>

                        {/* =========================================
                            SECTION 4: WHY CHOOSE RUDHCO?
                            ========================================= */}
                        <div className="space-y-12">
                            <AnimateOnScroll direction="up" className="text-center">
                                <h2 className="text-4xl font-bold text-white mb-4">Why Choose Rudhco?</h2>
                                <div className="w-16 h-1 bg-amber-500 mx-auto opacity-80"></div>
                            </AnimateOnScroll>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-justify">
                                <AnimateOnScroll direction="up" delay={0}>
                                    <FeatureCard 
                                        title="Architectural Excellence" 
                                        description="We don't just build; we design with purpose. Our team integrates site-specific climate considerations of the North-East with modern architectural trends." 
                                    />
                                </AnimateOnScroll>
                                <AnimateOnScroll direction="up" delay={150}>
                                    <FeatureCard 
                                        title="Quality Without Compromise" 
                                        description="From the foundation to the finishing touches, we source only the highest grade materials to ensure longevity and safety." 
                                    />
                                </AnimateOnScroll>
                                <AnimateOnScroll direction="up" delay={300}>
                                    <FeatureCard 
                                        title="Innovative Tech Integration" 
                                        description="We utilize modern construction technologies to streamline project timelines and maintain transparent communication with our clients." 
                                    />
                                </AnimateOnScroll>
                                <AnimateOnScroll direction="up" delay={450}>
                                    <FeatureCard 
                                        title="Rooted in Trust" 
                                        description="Based in Panjabari, Guwahati, we are deeply committed to elevating the urban landscape of North-East with sustainable and ethical building practices."
                                    />
                                </AnimateOnScroll>
                            </div>
                        </div>

                        {/* =========================================
                            SECTION 5: BUILDING YOUR LEGACY (CTA)
                            ========================================= */}
                        <AnimateOnScroll direction="none" className="text-center bg-gradient-to-b from-transparent to-white/[0.02] border border-white/10 p-12 md:p-20 rounded-3xl">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Building Your Legacy</h2>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                                Every brick we lay is a step toward your legacy. At Rudhco, we take pride in being more than just contractors, we are your partners in growth. From initial consultation to final handover, we ensure a seamless, stress free experience that brings your dream space to life.<br/><br/>
                                <span className="text-amber-500 font-medium">Explore the future of living with Rudhco Infra & Tech Pvt. Ltd. <br /> Your vision. Our expertise. A lifetime of excellence.</span>
                            </p>
                            <Link href="/contact" className="inline-flex items-center justify-center relative z-10 px-10 py-4 bg-amber-500 overflow-hidden rounded-full hover:bg-amber-400 transition-all duration-300 group shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]">
                                <span className="text-black font-bold tracking-widest text-sm uppercase transition-colors">
                                    Start Your Project
                                </span>
                            </Link>
                        </AnimateOnScroll>

                    </div>
                </main>
            </div>
        </>
    );
}

// Sub-component for the "Why Choose Rudhco" cards
function FeatureCard({ title, description }: { title: string, description: string }) {
    return (
        <div className="h-full group relative bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl transition-all duration-500 hover:border-amber-500/50 hover:bg-white/[0.08] hover:-translate-y-1">
            <div className="absolute top-0 left-0 w-1 h-0 bg-amber-500 transition-all duration-500 group-hover:h-full rounded-l-2xl"></div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.8)]"></span>
                {title}
            </h3>
            <p className="text-gray-400 font-light leading-relaxed pl-5">
                {description}
            </p>
        </div>
    );
}