"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
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
    // Core form state for enquiry submission.
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phoneno: '',
        email: '',
        service: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [showEstimatePopup, setShowEstimatePopup] = useState(false);
    const [estimateData, setEstimateData] = useState<any>(null);

    // Update local state when a user edits any form field.
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear field-level error for a smoother correction flow.
        if (fieldErrors[name]) {
            setFieldErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    };

    // Submit the form to our API endpoint instead of using mailto.
    const handleSend = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');
        setFieldErrors({});

        try {
            // Check for pending estimate
            const storedEstimate = localStorage.getItem('pendingEstimate');
            const estimatePayload = storedEstimate ? JSON.parse(storedEstimate) : null;

            const response = await fetch('/api/enquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fullName: `${formData.firstName} ${formData.lastName}`.trim(),
                    email: formData.email,
                    phoneNumber: formData.phoneno,
                    service: formData.service,
                    subject: formData.subject,
                    message: formData.message,
                    estimate: estimatePayload
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (data?.errors && typeof data.errors === 'object') {
                    const nextErrors: Record<string, string> = {};
                    if (data.errors.fullName) {
                        nextErrors.firstName = data.errors.fullName;
                        nextErrors.lastName = data.errors.fullName;
                    }
                    if (data.errors.phoneNumber) {
                        nextErrors.phoneno = data.errors.phoneNumber;
                    }
                    if (data.errors.email) {
                        nextErrors.email = data.errors.email;
                    }
                    if (data.errors.service) {
                        nextErrors.service = data.errors.service;
                    }
                    if (data.errors.subject) {
                        nextErrors.subject = data.errors.subject;
                    }
                    if (data.errors.message) {
                        nextErrors.message = data.errors.message;
                    }
                    setFieldErrors(nextErrors);
                }

                setErrorMessage(data?.message || 'Unable to submit your enquiry right now.');
                return;
            }

            setSuccessMessage('Thank you. Your enquiry has been submitted successfully.');
            setShowSuccessPopup(true);
            
            // Check for pending estimate and show it after 1 second
            const pendingEstimate = localStorage.getItem('pendingEstimate');
            if (pendingEstimate) {
                const estimate = JSON.parse(pendingEstimate);
                setEstimateData(estimate);
                
                // Wait 1 second before showing estimate popup
                setTimeout(() => {
                    setShowSuccessPopup(false);
                    setShowEstimatePopup(true);
                    // Clear the pending estimate from localStorage
                    localStorage.removeItem('pendingEstimate');
                }, 1000);
            }
            
            setFormData({
                firstName: '',
                lastName: '',
                phoneno: '',
                email: '',
                service: '',
                subject: '',
                message: ''
            });
        } catch {
            setErrorMessage('Network error. Please try again in a moment.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-amber-500 selection:text-white overflow-hidden">
            <Navbar />

            {showSuccessPopup ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl">
                        <h3 className="text-xl font-bold text-slate-900">Enquiry Submitted</h3>
                        <p className="mt-3 text-sm leading-relaxed text-slate-600">
                            Thank you for contacting Rudhco. We have received your enquiry and sent a confirmation email to your inbox.
                        </p>
                        <div className="mt-6 flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowSuccessPopup(false)}
                                className="rounded-full bg-amber-500 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-amber-400"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

            {showEstimatePopup && estimateData ? (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
                    <style>{`
                        @keyframes bounce-scale {
                            0%, 100% { transform: scale(1); }
                            50% { transform: scale(1.05); }
                        }
                        .animate-bounce-scale {
                            animation: bounce-scale 0.6s ease-in-out infinite;
                        }
                        @keyframes confetti-fall {
                            0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                            100% { transform: translateY(100px) rotate(360deg); opacity: 0; }
                        }
                        .confetti {
                            animation: confetti-fall 2s ease-out forwards;
                        }
                    `}</style>
                    <div className="w-full max-w-md rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-white p-8 shadow-2xl animate-bounce-scale relative overflow-hidden">
                        {/* Confetti emojis */}
                        <div className="absolute top-4 left-4 text-3xl confetti">🎊</div>
                        <div className="absolute top-6 right-6 text-3xl confetti" style={{ animationDelay: '0.2s' }}>🎉</div>
                        <div className="absolute top-16 left-10 text-3xl confetti" style={{ animationDelay: '0.4s' }}>🎊</div>
                        <div className="absolute top-12 right-12 text-3xl confetti" style={{ animationDelay: '0.3s' }}>🎉</div>

                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-slate-900 mb-2">Your Estimate is Ready! 🎊</h3>
                            <p className="text-amber-600 text-sm font-semibold mb-6">{estimateData.packageName}</p>

                            <div className="bg-white border-2 border-amber-400 rounded-lg p-6 mb-6">
                                <p className="text-sm text-slate-600 mb-1">Project Details</p>
                                <div className="space-y-2 text-left mb-4">
                                    <p className="text-sm"><span className="font-semibold text-slate-900">Type:</span> <span className="text-slate-600">{estimateData.houseType}</span></p>
                                    <p className="text-sm"><span className="font-semibold text-slate-900">Area:</span> <span className="text-slate-600">{estimateData.sqftArea.toLocaleString()} Sq.ft</span></p>
                                    <p className="text-sm"><span className="font-semibold text-slate-900">Rate:</span> <span className="text-slate-600">Rs {estimateData.pricePerSqft.toLocaleString("en-IN")}/sq.ft</span></p>
                                    <p className="text-sm"><span className="font-semibold text-slate-900">Multiplier:</span> <span className="text-slate-600">{estimateData.multiplier}x</span></p>
                                </div>

                                <div className="border-t-2 border-amber-200 pt-4">
                                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Calculation</p>
                                    <p className="text-xs text-slate-600 mb-3">Rs {estimateData.pricePerSqft.toLocaleString("en-IN")} × {estimateData.multiplier} × {estimateData.sqftArea.toLocaleString()}</p>
                                    <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Estimated Total Cost</p>
                                    <p className="text-4xl font-bold text-amber-600">
                                        Rs {estimateData.estimatedCost.toLocaleString("en-IN")}
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-center gap-2 mb-4">
                                <span className="text-2xl">🎉</span>
                                <span className="text-2xl">🎊</span>
                                <span className="text-2xl">🎉</span>
                            </div>

                            <p className="text-sm text-slate-600 mb-6">
                                Our team will connect with you shortly to discuss your project details.
                            </p>

                            <button
                                type="button"
                                onClick={() => setShowEstimatePopup(false)}
                                className="rounded-full bg-amber-500 px-8 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-amber-600"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}

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
                .animate-geo-spin {
                    animation: geo-spin 40s linear infinite;
                }
                .animate-geo-spin-slow {
                    animation: geo-spin 60s linear infinite reverse;
                }
                .animate-geo-float {
                    animation: geo-float 15s ease-in-out infinite;
                }
            `}</style>

            {/* Ambient Background Effects (Geometric Light Theme) */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-amber-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-blue-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-amber-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex items-center justify-center relative z-10 w-full px-6 py-24 md:py-32">
                <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-x-24 md:gap-y-12 items-start">
                    
                    {/* BLOCK 1: Title Section */}
                    <AnimateOnScroll direction="left" delay={0} className="flex flex-col justify-center">
                        <h2 className="text-amber-500 tracking-[0.3em] text-xs font-bold uppercase mb-4">
                            Concierge Service
                        </h2>
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 leading-tight">
                            Get in <br /> Touch.
                        </h1>
                        <div className="w-16 h-1 bg-amber-500 mt-8 mb-8 opacity-80 transition-transform duration-1000 hover:scale-x-150 origin-left"></div>
                        <p className="text-slate-600 text-lg font-light leading-relaxed max-w-md">
                            Whether you are looking to build your legacy or find the perfect drive, our team is dedicated to provide exquisite service tailored to your needs.
                        </p>
                    </AnimateOnScroll>

                    {/* BLOCK 2: The Form */}
                    <AnimateOnScroll direction="up" delay={150} className="bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-8 md:p-12 rounded-3xl md:row-span-2">
                        <form className="space-y-8" onSubmit={handleSend}>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <InputGroup 
                                    label="First Name" 
                                    name="firstName"
                                    placeholder="Bhardwaj" 
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    error={fieldErrors.firstName}
                                    disabled={isSubmitting}
                                />
                                <InputGroup 
                                    label="Last Name" 
                                    name="lastName"
                                    placeholder="Thengal"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    error={fieldErrors.lastName}
                                    disabled={isSubmitting}
                                />
                            </div>

                            <InputGroup 
                                label="Phone Number" 
                                name="phoneno"
                                placeholder="Your contact number" 
                                type="tel" 
                                value={formData.phoneno}
                                onChange={handleChange}
                                error={fieldErrors.phoneno}
                                disabled={isSubmitting}
                            />

                            <InputGroup 
                                label="Email Address" 
                                name="email"
                                placeholder="thengal@example.com" 
                                type="email" 
                                value={formData.email}
                                onChange={handleChange}
                                error={fieldErrors.email}
                                disabled={isSubmitting}
                            />

                            <InputGroup 
                                label="Service" 
                                name="service"
                                placeholder="Construction / Renovation / Digital Marketing"
                                value={formData.service}
                                onChange={handleChange}
                                error={fieldErrors.service}
                                disabled={isSubmitting}
                            />
                            
                            <InputGroup 
                                label="Subject" 
                                name="subject"
                                placeholder="General Inquiry" 
                                value={formData.subject}
                                onChange={handleChange}
                                error={fieldErrors.subject}
                                disabled={isSubmitting}
                            />

                            <div className="group relative">
                                <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                                    Message
                                </label>
                                <textarea 
                                    name="message"
                                    rows={4}
                                    className="w-full bg-transparent border-b border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:outline-none transition-colors resize-none py-2"
                                    placeholder="Tell us about your requirements..."
                                    value={formData.message}
                                    onChange={handleChange}
                                    disabled={isSubmitting}
                                ></textarea>
                                {fieldErrors.message ? (
                                    <p className="text-xs text-red-500 mt-2">{fieldErrors.message}</p>
                                ) : null}
                            </div>

                            {successMessage ? (
                                <p className="text-sm text-emerald-600">{successMessage}</p>
                            ) : null}
                            {errorMessage ? (
                                <p className="text-sm text-red-500">{errorMessage}</p>
                            ) : null}

                            <div className="pt-4">
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="group relative w-full py-4 bg-amber-500 overflow-hidden rounded-full shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    <span className="relative z-10 text-white font-bold tracking-widest text-sm uppercase transition-colors">
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </span>
                                    <div className="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-amber-400"></div>
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
                            detail="+91 98646 58393"
                        />
                         <ContactItem 
                            icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                            title="Headquarter"
                            detail="House No-35, 3rd floor, Panjabari Road, Near Canara Bank, Panjabari Branch, Pin - 781037, Assam"
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
        <div className="flex items-center gap-5 group cursor-pointer p-4 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 border border-transparent hover:border-slate-100">
            <div className="p-3 bg-slate-100 rounded-full text-amber-500 group-hover:bg-amber-50 group-hover:text-amber-600 transition-all duration-300">
                {icon}
            </div>
            <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">{title}</h3>
                <p className="text-slate-700 text-lg font-medium group-hover:translate-x-1 group-hover:text-amber-600 transition-all duration-300">{detail}</p>
            </div>
        </div>
    );
}

// Helper: Form Input Group
function InputGroup({ label, placeholder, type = "text", name, value, onChange, error, disabled = false }: { label: string; placeholder: string; type?: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; error?: string; disabled?: boolean }) {
    return (
        <div className="group relative">
            <label className="block text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 group-focus-within:text-amber-600 transition-colors">
                {label}
            </label>
            <input 
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                disabled={disabled}
                className="w-full bg-transparent border-b border-slate-300 text-slate-900 placeholder-slate-400 py-2 focus:border-amber-500 focus:outline-none transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                placeholder={placeholder}
            />
            {error ? <p className="text-xs text-red-500 mt-2">{error}</p> : null}
        </div>
    );
}