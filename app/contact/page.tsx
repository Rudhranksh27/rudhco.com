"use client";

import { useState, useEffect, useRef, ReactNode } from 'react';
import Navbar from "../navbar";

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

export default function ContactPage() {
    // 1. State to store form data
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneno: '',
        email: '',
        subject: '',
        message: ''
    });

    // 2. Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // 3. Handle Form Submission
    const handleSend = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const { firstName, lastName, phoneno, email, subject, message } = formData;
        // Construct the email body        
        const emailBody = `
            Name: ${firstName} ${lastName}
            Phone: ${phoneno}
            Email: ${email}
            Message: ${message}
        `;

        const mailtoLink = `mailto:business@rudhco.com?subject=${encodeURIComponent(subject || 'New Contact Inquiry')}&body=${encodeURIComponent(emailBody)}`;
        // Trigger the email client
        window.location.href = mailtoLink;
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-neutral-950 text-white selection:bg-amber-500 selection:text-black overflow-hidden">
            <Navbar />

            {/* --- CUSTOM CSS FOR BACKGROUND ANIMATION --- */}
            <style>{`
                @keyframes float-blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-float-slow {
                    animation: float-blob 20s ease-in-out infinite;
                }
                .animate-float-slower {
                    animation: float-blob 25s ease-in-out infinite reverse;
                }
            `}</style>

            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-900/5 rounded-full blur-[120px] animate-float-slow" />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-900/5 rounded-full blur-[120px] animate-float-slower" />
            </div>

            <main className="flex-grow flex items-center justify-center relative z-10 w-full px-6 py-24 md:py-32">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-12 items-start">
                    
                    {/* BLOCK 1: Title Section */}
                    <AnimateOnScroll direction="left" delay={0} className="flex flex-col justify-center">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">
                            Concierge Service
                        </h2>
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 leading-tight">
                            Get in <br /> Touch.
                        </h1>
                        <div className="w-16 h-1 bg-amber-500 mt-8 mb-8 opacity-80 transition-transform duration-1000 hover:scale-x-150 origin-left"></div>
                        <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                            Whether you are looking to build your legacy or find the perfect drive, our team is dedicated to provide exquisite service tailored to your needs.
                        </p>
                    </AnimateOnScroll>

                    {/* BLOCK 2: The Form */}
                    <AnimateOnScroll direction="up" delay={150} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl md:row-span-2">
                        <form className="space-y-8" onSubmit={handleSend}>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup 
                                    label="First Name" 
                                    name="firstName"
                                    placeholder="Bhardwaj" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                />
                                <InputGroup 
                                    label="Last Name" 
                                    name="lastName"
                                    placeholder="Thengal"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                />
                            </div>

                            <InputGroup 
                                label="Phone Number" 
                                name="phoneno"
                                placeholder="Your contact number" 
                                type="tel" 
                                value={formData.phoneno}
                                onChange={handleChange}
                            />

                            <InputGroup 
                                label="Email Address" 
                                name="email"
                                placeholder="thengal@example.com" 
                                type="email" 
                                value={formData.email}
                                onChange={handleChange}
                            />
                            
                            <InputGroup 
                                label="Subject" 
                                name="subject"
                                placeholder="General Inquiry" 
                                value={formData.subject}
                                onChange={handleChange}
                            />

                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                                    Message
                                </label>
                                <textarea 
                                    name="message"
                                    rows={4}
                                    className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-600 focus:border-amber-500 focus:outline-none transition-colors resize-none py-2"
                                    placeholder="Tell us about your requirements..."
                                    value={formData.message}
                                    onChange={handleChange}
                                ></textarea>
                            </div>

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    className="group relative w-full py-4 bg-transparent overflow-hidden rounded-full border border-white/20 hover:border-amber-500 transition-all duration-300"
                                >
                                    <span className="relative z-10 text-white group-hover:text-amber-500 font-bold tracking-widest text-sm uppercase transition-colors">
                                        Send Message
                                    </span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-white/5"></div>
                                </button>
                            </div>

                        </form>
                    </AnimateOnScroll>

                    {/* BLOCK 3: Contact Info */}
                    <AnimateOnScroll direction="up" delay={300} className="space-y-6">
                        <ContactItem 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>}
                            title="Email Us"
                            detail="business@rudhco.com"
                        />
                        <ContactItem 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>}
                            title="Call Us"
                            detail="+91 84718 88393"
                        />
                         <ContactItem 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                            title="Headquarter"
                            detail="House No-35, 3rd floor, Panjabari Road, Near Canara Bank, Panjabari Branch, Pin - 781022, Assam"
                        />
                    </AnimateOnScroll>
                </div>
            </main>
        </div>
    );
}

// Helper: Contact Info Row
function ContactItem({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
    return (
        <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-white/5 rounded-full text-gray-400 group-hover:text-amber-500 group-hover:bg-amber-500/10 transition-all duration-300">
                {icon}
            </div>
            <div>
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest">{title}</h3>
                <p className="text-white text-lg font-light group-hover:translate-x-1 transition-transform duration-300">{detail}</p>
            </div>
        </div>
    );
}

// Helper: Form Input Group
function InputGroup({ label, placeholder, type = "text", name, value, onChange }: { label: string; placeholder: string; type?: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div className="group relative">
            <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 group-focus-within:text-amber-500 transition-colors">
                {label}
            </label>
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-transparent border-b border-gray-700 text-white placeholder-gray-600 py-2 focus:border-amber-500 focus:outline-none transition-colors"
                placeholder={placeholder}
            />
        </div>
    );
}