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

// --- TECHNOLOGY STACK DATA ---
type TechStack = {
    stack: string;
    bestFor: string;
    recommendation: string;
    type: "primary" | "good" | "conditional" | "warning" | "not-recommended";
};

const technologyStacks: TechStack[] = [
    {
        stack: "Next.js",
        bestFor: "Most business websites, portals, SaaS, CRM, ERP",
        recommendation: "Primary choice",
        type: "primary"
    },
    {
        stack: "Next.js + Node.js",
        bestFor: "Real-time apps, chat, WebSockets",
        recommendation: "For real-time requirements",
        type: "good"
    },
    {
        stack: "Next.js + Python",
        bestFor: "AI/ML, data science, advanced analytics",
        recommendation: "Use when required",
        type: "good"
    },
    {
        stack: "Next.js + Django",
        bestFor: "Large Python-based business systems",
        recommendation: "For Python-heavy backends",
        type: "conditional"
    },
    {
        stack: "MERN",
        bestFor: "Full JavaScript applications",
        recommendation: "Depends on project",
        type: "conditional"
    },
    {
        stack: "PHP/Laravel",
        bestFor: "Existing PHP systems, certain portals",
        recommendation: "Higher long-term cost",
        type: "warning"
    },
    {
        stack: "WordPress",
        bestFor: "Content-focused websites",
        recommendation: "Not for complex web apps",
        type: "not-recommended"
    }
];

// --- WEBSITE PACKAGES DATA ---
type WebsitePackage = {
    websiteType: string;
    pagesIncluded: string;
    pageType: string;
    whatsIncluded: string;
    startingPrice: string;
};

const websitePackages: WebsitePackage[] = [
    {
        websiteType: "Informational Website",
        pagesIncluded: "Up to 5 Pages",
        pageType: "Static",
        whatsIncluded: "Responsive design, contact form, basic SEO, social media links",
        startingPrice: "₹25,000"
    },
    {
        websiteType: "Business Website",
        pagesIncluded: "Up to 10 Pages",
        pageType: "Static + Dynamic",
        whatsIncluded: "Responsive UI, contact/enquiry forms, basic SEO, Google Maps, social media",
        startingPrice: "₹40,000"
    },
    {
        websiteType: "Business Website + CMS",
        pagesIncluded: "Up to 10 Pages",
        pageType: "Dynamic",
        whatsIncluded: "Admin panel, CMS, gallery, notices, blog/content management, enquiry management",
        startingPrice: "₹60,000"
    },
    {
        websiteType: "Corporate Website + CMS",
        pagesIncluded: "Up to 15 Pages",
        pageType: "Dynamic",
        whatsIncluded: "Advanced UI/UX, CMS, admin panel, forms, gallery, analytics, SEO, integrations",
        startingPrice: "₹80,000"
    },
    {
        websiteType: "Custom / Advanced Website",
        pagesIncluded: "As Required",
        pageType: "Dynamic / Custom",
        whatsIncluded: "Custom functionality, database-driven pages, CMS, APIs, advanced animations and integrations",
        startingPrice: "₹1,00,000+"
    }
];

// --- WEB APPLICATION PACKAGES DATA ---
type WebApplicationPackage = {
    application: string;
    typicalUsers: string;
    majorModules: string;
    adminPanel: boolean;
    database: boolean;
    testing: boolean;
    deployment: string;
    startingPrice: string;
};

const webApplicationPackages: WebApplicationPackage[] = [
    {
        application: "CRM – Customer Relationship Management",
        typicalUsers: "Admin, Sales Team, Managers",
        majorModules: "Leads, Customers, Follow-ups, Tasks, Enquiries, Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included",
        startingPrice: "₹1,00,000"
    },
    {
        application: "ERP / Business Management System",
        typicalUsers: "Admin, Employees, Managers",
        majorModules: "HR, Sales, Purchase, Inventory, Accounts, Reports, Operations",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹2,00,000"
    },
    {
        application: "E-Commerce Platform",
        typicalUsers: "Customers, Sellers, Admin",
        majorModules: "Products, Categories, Cart, Checkout, Orders, Payments, Customers",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,20,000"
    },
    {
        application: "LMS / EdTech Platform",
        typicalUsers: "Students, Teachers, Admin",
        majorModules: "Courses, Lessons, Videos, Assignments, Exams, Results, Progress",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,50,000"
    },
    {
        application: "Healthcare / Hospital",
        typicalUsers: "Patients, Doctors, Staff",
        majorModules: "Patients, Appointments, Records, Billing, Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,50,000"
    },
    {
        application: "Booking / Appointment System",
        typicalUsers: "Customers, Staff, Admin",
        majorModules: "Services, Availability, Booking, Calendar, Payments, Notifications",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included",
        startingPrice: "₹80,000"
    },
    {
        application: "Job / Recruitment Portal",
        typicalUsers: "Job Seekers, Employers, Admin",
        majorModules: "Jobs, Applications, Profiles, Search, Resume, Employer Management",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,50,000"
    },
    {
        application: "Real Estate Portal",
        typicalUsers: "Buyers, Sellers, Agents, Admin",
        majorModules: "Property Listings, Search, Filters, Enquiries, Agents, Leads",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,25,000"
    },
    {
        application: "Marketplace Platform",
        typicalUsers: "Buyers, Sellers, Admin",
        majorModules: "Seller Accounts, Products, Orders, Payments, Reviews, Commission",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹3,00,000"
    },
    {
        application: "SaaS Application",
        typicalUsers: "Users, Teams, Admin",
        majorModules: "User Accounts, Subscriptions, Dashboard, Roles, Billing, Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹2,00,000"
    },
    {
        application: "Logistics Management System",
        typicalUsers: "Admin, Managers, Drivers, Staff",
        majorModules: "Shipments, Deliveries, Drivers, Routes, Tracking Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included",
        startingPrice: "₹1,50,000"
    },
    {
        application: "Inventory / Warehouse System",
        typicalUsers: "Admin, Staff, Managers",
        majorModules: "Products, Stock, Warehouses, Purchases, Sales, Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included",
        startingPrice: "₹1,25,000"
    },
    {
        application: "Finance Management System",
        typicalUsers: "Admin, Employees, Managers",
        majorModules: "Transactions, Expenses, Income, Invoices, Reports, Accounts",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹2,00,000"
    },
    {
        application: "Project / Task Management System",
        typicalUsers: "Admin, Managers, Employees, Teams",
        majorModules: "Projects, Tasks, Teams, Deadlines, Progress, Reports",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included",
        startingPrice: "₹1,00,000"
    },
    {
        application: "Social / Community Platform",
        typicalUsers: "Users, Moderators, Admin",
        majorModules: "Profiles, Posts, Comments, Likes, Messaging, Notifications",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹2,00,000+"
    },
    {
        application: "Custom Web Application",
        typicalUsers: "Based on Requirement",
        majorModules: "Custom Modules & Business Workflows",
        adminPanel: true,
        database: true,
        testing: true,
        deployment: "Included*",
        startingPrice: "₹1,00,000+"
    }
];

// --- HIDDEN COSTS DATA ---
type HiddenCost = {
    hiddenCost: string;
    indiaCost2026: string;
    frequency: string;
    notes: string;
};

const hiddenCosts: HiddenCost[] = [
    {
        hiddenCost: "Domain name",
        indiaCost2026: "₹800–₹3,000/year",
        frequency: "Annual",
        notes: ".com domains on GoDaddy or Namecheap"
    },
    {
        hiddenCost: "SSL certificate",
        indiaCost2026: "₹0–₹8,000/year",
        frequency: "Annual",
        notes: "Free via Let's Encrypt or paid for OV/EV"
    },
    {
        hiddenCost: "Hosting – shared / VPS",
        indiaCost2026: "₹2,000–₹8,000/month",
        frequency: "Monthly",
        notes: "DigitalOcean, Hetzner, AWS EC2 small"
    },
    {
        hiddenCost: "Hosting – AWS / GCP (growing apps)",
        indiaCost2026: "₹5,000–₹25,000/month",
        frequency: "Monthly",
        notes: "Scales with traffic – budget conservatively"
    },
    {
        hiddenCost: "Razorpay transaction fee",
        indiaCost2026: "2% per transaction",
        frequency: "Per transaction",
        notes: "Standard India payment gateway rate"
    },
    {
        hiddenCost: "SMS API (OTP, notifications)",
        indiaCost2026: "₹0.15–₹0.50 per SMS",
        frequency: "Per use",
        notes: "MSG91, Twilio – budget ₹2,000–₹5,000/month"
    },
    {
        hiddenCost: "WhatsApp Business API",
        indiaCost2026: "₹0.40–₹0.80 per message",
        frequency: "Per use",
        notes: "Meta charges per conversation"
    },
    {
        hiddenCost: "OpenAI / AI API costs",
        indiaCost2026: "₹2,000–₹20,000/month",
        frequency: "Monthly",
        notes: "Depends on usage volume"
    },
    {
        hiddenCost: "Annual maintenance (AMC)",
        indiaCost2026: "15–20% of build cost/year",
        frequency: "Annual",
        notes: "Bug fixes, security patches, updates"
    },
    {
        hiddenCost: "Future feature additions",
        indiaCost2026: "₹50,000–₹5,00,000+",
        frequency: "As needed",
        notes: "Budget 20% of build cost for year 1 additions"
    }
];

// --- AMC DATA ---
type AMCService = {
    serviceType: string;
    annualAMC: string;
    includes: string;
};

const amcServices: AMCService[] = [
    {
        serviceType: "Basic Website Maintenance",
        annualAMC: "₹20,000/year",
        includes: "Bug fixing, technical support, minor corrections, basic maintenance"
    },
    {
        serviceType: "Website + CMS Maintenance",
        annualAMC: "₹25,000/year",
        includes: "Website maintenance, CMS support, bug fixing, technical updates, minor corrections"
    },
    {
        serviceType: "Business Web Application",
        annualAMC: "₹35,000/year",
        includes: "Application maintenance, bug fixing, technical support, minor updates"
    },
    {
        serviceType: "CRM / ERP / Management System",
        annualAMC: "₹45,000/year",
        includes: "System maintenance, bug fixing, database support, security/dependency updates"
    },
    {
        serviceType: "Advanced Web Application",
        annualAMC: "₹60,000+/year",
        includes: "Priority support, application maintenance, security updates, technical monitoring, minor improvements"
    }
];

// --- TECHNOLOGY STACK TABLE COMPONENT ---
function TechnologyStackTable() {
    const getRecommendationStyle = (type: TechStack["type"]) => {
        switch (type) {
            case "primary":
                return "text-green-600 font-bold";
            case "good":
                return "text-green-600 font-semibold";
            case "conditional":
                return "text-slate-600 font-medium";
            case "warning":
                return "text-amber-600 font-bold";
            case "not-recommended":
                return "text-red-600 font-bold";
            default:
                return "text-slate-600";
        }
    };

    const getRecommendationIcon = (type: TechStack["type"]) => {
        switch (type) {
            case "primary":
                return "✅";
            case "good":
                return "✅";
            case "warning":
                return "⚠️";
            case "not-recommended":
                return "❌";
            default:
                return "";
        }
    };

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-full bg-white/40 backdrop-blur-md rounded-3xl border border-white/80 shadow-xl overflow-hidden">
                {/* Enhanced Header */}
                <div className="bg-gradient-to-r from-emerald-600 via-green-500 to-cyan-500 px-6 py-8 shadow-lg">
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">Technology Stack Recommendations</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">
                        Industry-leading technologies selected for performance, scalability, and maintainability. Choose based on your project needs.
                    </p>
                </div>

                {/* Column Headers */}
                <div className="grid grid-cols-[1fr_1.5fr_1.5fr] gap-3 p-6 border-b border-slate-200 bg-gradient-to-r from-slate-900/5 to-slate-700/5">
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Stack</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Best For</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Recommendation</div>
                </div>

                {/* Technology Rows */}
                <div className="p-6 space-y-2">
                    {technologyStacks.map((tech, idx) => {
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
                                <div className="w-full px-6 py-5 flex items-center gap-4 text-left">
                                    <div className="flex-1 grid grid-cols-[1fr_1.5fr_1.5fr] gap-3 items-center">
                                        <div>
                                            <span className="font-bold text-slate-900 text-sm">{tech.stack}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 text-sm">{tech.bestFor}</span>
                                        </div>
                                        <div className={`flex items-center gap-2 ${getRecommendationStyle(tech.type)}`}>
                                            <span>{getRecommendationIcon(tech.type)}</span>
                                            <span className="text-sm">{tech.recommendation}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Buttons */}
                <div className="px-6 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex gap-4">
                    <Link href="/contact" className="flex-1 py-3 rounded-lg bg-green-500 text-white text-center text-sm font-bold uppercase tracking-widest hover:bg-green-600 transition-colors shadow-md">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

// --- WEBSITE PACKAGES TABLE COMPONENT ---
function WebsitePackagesTable() {
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
                <div className="bg-gradient-to-r from-green-600 via-emerald-500 to-cyan-500 px-6 py-8 shadow-lg">
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">Website Development Packages</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">
                        Professional website solutions tailored to your business size and requirements. From simple brochure sites to complex e-commerce platforms.
                    </p>
                </div>

                {/* Column Headers */}
                <div className="hidden md:grid md:grid-cols-5 gap-4 p-6 border-b border-slate-200 bg-slate-50">
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Website Type</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Pages Included</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Page Type</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">What's Included</div>
                    <div className="font-bold text-slate-900 text-sm uppercase tracking-wide">Starting Price</div>
                </div>

                {/* Mobile Collapsible View */}
                <div className="md:hidden p-4 space-y-4">
                    {/* Section Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider">Select Your Website Type</h4>
                    </div>

                    {websitePackages.map((pkg, idx) => {
                        const isExpanded = expandedRows.has(idx);
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:bg-slate-50 transition-colors">
                                {/* Clickable Header */}
                                <div 
                                    onClick={() => toggleRow(idx)}
                                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-1">
                                        <span className="font-bold text-slate-900 text-sm block">{pkg.websiteType}</span>
                                        <span className="text-green-600 text-xs font-semibold">{pkg.startingPrice}</span>
                                    </div>
                                    <span className={`text-slate-600 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 py-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Pages:</span>
                                                <span className="text-slate-700">{pkg.pagesIncluded}</span>
                                            </div>
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Page Type:</span>
                                                <span className="text-slate-700">{pkg.pageType}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="font-semibold text-slate-600 min-w-fit">Includes:</span>
                                                <span className="text-slate-700">{pkg.whatsIncluded}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                {/* Mobile Horizontal Scroll Wrapper - HIDDEN */}
                <div className="hidden md:hidden overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                    <div className="min-w-full">
                        {/* Mobile Column Headers */}
                        <div className="grid grid-cols-5 gap-4 p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Website Type</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Pages</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Page Type</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Includes</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Price</div>
                        </div>
                        {/* Mobile Grid View */}
                        {websitePackages.map((pkg, idx) => (
                            <div key={idx} className="grid grid-cols-5 gap-4 p-4 border-b border-slate-200 hover:bg-slate-50/50 transition-colors">
                                <div className="text-xs"><span className="font-bold text-slate-900">{pkg.websiteType}</span></div>
                                <div className="text-xs"><span className="text-slate-600">{pkg.pagesIncluded}</span></div>
                                <div className="text-xs"><span className="text-slate-600">{pkg.pageType}</span></div>
                                <div className="text-xs"><span className="text-slate-600">{pkg.whatsIncluded}</span></div>
                                <div className="text-xs"><span className="font-bold text-green-600">{pkg.startingPrice}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Package Rows - Desktop View */}
                <div className="hidden md:block p-6 space-y-2">
                    {websitePackages.map((pkg, idx) => {
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
                                <div className="w-full px-6 py-5 flex items-center gap-4 text-left">
                                    <div className="grid grid-cols-5 gap-4 w-full items-start">
                                        <div>
                                            <span className="font-bold text-slate-900 text-sm">{pkg.websiteType}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 text-sm">{pkg.pagesIncluded}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 text-sm">{pkg.pageType}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600 text-sm">{pkg.whatsIncluded}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-green-600 text-sm">{pkg.startingPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Buttons */}
                <div className="px-6 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex gap-4">
                    <Link href="/contact" className="flex-1 py-3 rounded-lg bg-green-500 text-white text-center text-sm font-bold uppercase tracking-widest hover:bg-green-600 transition-colors shadow-md">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

// --- WEB APPLICATION PACKAGES TABLE COMPONENT ---
function WebApplicationPackagesTable() {
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
                <div className="bg-gradient-to-r from-teal-600 via-emerald-500 to-cyan-500 px-6 py-8 shadow-lg">
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">Web Application Development Packages</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">
                        Enterprise-grade custom applications designed for your specific business processes. Scalable, secure, and feature-rich solutions.
                    </p>
                </div>

                {/* Column Headers */}
                <div className="hidden lg:grid lg:grid-cols-8 gap-3 p-6 border-b border-slate-200 bg-slate-50 text-xs md:text-sm">
                    <div className="font-bold text-slate-900 uppercase tracking-wide">Application</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide">Typical Users</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide">Major Modules</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide text-center">Admin Panel</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide text-center">Database</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide text-center">Testing</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide">Deployment</div>
                    <div className="font-bold text-slate-900 uppercase tracking-wide">Starting Price</div>
                </div>

                {/* Mobile Collapsible View */}
                <div className="lg:hidden p-4 space-y-4">
                    {/* Section Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider">Select Your Application Type</h4>
                    </div>

                    {webApplicationPackages.map((app, idx) => {
                        const isExpanded = expandedRows.has(idx);
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:bg-slate-50 transition-colors">
                                {/* Clickable Header */}
                                <div 
                                    onClick={() => toggleRow(idx)}
                                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-1">
                                        <span className="font-bold text-slate-900 text-sm block">{app.application}</span>
                                        <span className="text-green-600 text-xs font-semibold">{app.startingPrice}</span>
                                    </div>
                                    <span className={`text-slate-600 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 py-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Users:</span>
                                                <span className="text-slate-700">{app.typicalUsers}</span>
                                            </div>
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Modules:</span>
                                                <span className="text-slate-700">{app.majorModules}</span>
                                            </div>
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Admin Panel:</span>
                                                <span className="text-green-600 font-semibold">{app.adminPanel ? "✓ Yes" : "✗ No"}</span>
                                            </div>
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Database:</span>
                                                <span className="text-green-600 font-semibold">{app.database ? "✓ Yes" : "✗ No"}</span>
                                            </div>
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Testing:</span>
                                                <span className="text-green-600 font-semibold">{app.testing ? "✓ Yes" : "✗ No"}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="font-semibold text-slate-600 min-w-fit">Deployment:</span>
                                                <span className="text-slate-700">{app.deployment}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile Horizontal Scroll Wrapper - HIDDEN */}
                <div className="hidden lg:hidden overflow-x-auto scrollbar-thin scrollbar-thumb-teal-300 scrollbar-track-slate-100">
                    <div className="min-w-full">
                        {/* Mobile Column Headers */}
                        <div className="grid grid-cols-8 gap-2 p-4 border-b border-slate-200 bg-slate-50 sticky top-0 z-10">
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Application</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Users</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Modules</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide text-center whitespace-nowrap">Admin</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide text-center whitespace-nowrap">DB</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide text-center whitespace-nowrap">Test</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Deploy</div>
                            <div className="font-bold text-slate-900 text-xs uppercase tracking-wide whitespace-nowrap">Price</div>
                        </div>
                        {/* Mobile Grid View */}
                        {webApplicationPackages.map((app, idx) => (
                            <div key={idx} className="grid grid-cols-8 gap-2 p-4 border-b border-slate-200 hover:bg-slate-50/50 transition-colors text-xs">
                                <div><span className="font-bold text-slate-900">{app.application}</span></div>
                                <div><span className="text-slate-600">{app.typicalUsers}</span></div>
                                <div><span className="text-slate-600">{app.majorModules}</span></div>
                                <div className="text-center"><span className="text-green-600">{app.adminPanel ? "✓" : "✗"}</span></div>
                                <div className="text-center"><span className="text-green-600">{app.database ? "✓" : "✗"}</span></div>
                                <div className="text-center"><span className="text-green-600">{app.testing ? "✓" : "✗"}</span></div>
                                <div><span className="text-slate-600">{app.deployment}</span></div>
                                <div><span className="font-bold text-green-600">{app.startingPrice}</span></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Package Rows - Desktop View */}
                <div className="hidden lg:block p-6 space-y-2">
                    {webApplicationPackages.map((app, idx) => {
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
                                <div className="w-full px-6 py-5 flex items-center gap-3 text-left text-xs md:text-sm">
                                    <div className="grid grid-cols-8 gap-3 w-full items-center">
                                        <div>
                                            <span className="font-bold text-slate-900">{app.application}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600">{app.typicalUsers}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600">{app.majorModules}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl text-green-600">{app.adminPanel ? "✓" : "✗"}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl text-green-600">{app.database ? "✓" : "✗"}</span>
                                        </div>
                                        <div className="text-center">
                                            <span className="text-xl text-green-600">{app.testing ? "✓" : "✗"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-600">{app.deployment}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold text-green-600">{app.startingPrice}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* CTA Buttons */}
                <div className="px-6 py-6 border-t border-slate-200 bg-gradient-to-r from-slate-50 to-white flex gap-4">
                    <Link href="/contact" className="flex-1 py-3 rounded-lg bg-green-500 text-white text-center text-sm font-bold uppercase tracking-widest hover:bg-green-600 transition-colors shadow-md">
                        Get Started
                    </Link>
                </div>
            </div>
        </div>
    );
}

// --- AMC TABLE COMPONENT ---
function AMCTable() {
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
                <div className="bg-gradient-to-r from-slate-900 to-slate-700 px-6 py-8 shadow-lg">
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">Annual Maintenance Contract (AMC)</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">After the 3-month complimentary post-launch support period, clients can opt for an Annual Maintenance Contract for continued technical support and maintenance.</p>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    {/* Column Headers */}
                    <div className="grid grid-cols-3 gap-4 p-6 border-b border-slate-200 bg-slate-900 text-white">
                        <div className="font-bold text-sm uppercase tracking-wide">Service Type</div>
                        <div className="font-bold text-sm uppercase tracking-wide">Annual AMC</div>
                        <div className="font-bold text-sm uppercase tracking-wide">Includes</div>
                    </div>

                    {/* Service Rows */}
                    <div className="p-6 space-y-2">
                        {amcServices.map((service, idx) => {
                            return (
                                <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
                                    <div className="w-full px-6 py-5 flex items-center gap-4 text-left">
                                        <div className="grid grid-cols-3 gap-4 w-full items-start">
                                            <div>
                                                <span className="font-bold text-slate-900 text-sm">{service.serviceType}</span>
                                            </div>
                                            <div>
                                                <span className="text-blue-600 font-semibold text-sm">{service.annualAMC}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 text-sm">{service.includes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Collapsible View */}
                <div className="md:hidden p-4 space-y-4">
                    {/* Section Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider">Support Plans</h4>
                    </div>

                    {amcServices.map((service, idx) => {
                        const isExpanded = expandedRows.has(idx);
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:bg-slate-50 transition-colors">
                                {/* Clickable Header */}
                                <div 
                                    onClick={() => toggleRow(idx)}
                                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    <span className="font-bold text-slate-900 text-sm flex-1">{service.serviceType}</span>
                                    <span className={`text-slate-600 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 py-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Annual AMC:</span>
                                                <span className="text-blue-600 font-semibold">{service.annualAMC}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="font-semibold text-slate-600 min-w-fit">Includes:</span>
                                                <span className="text-slate-700">{service.includes}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// --- HIDDEN COSTS TABLE COMPONENT ---
function HiddenCostsTable() {
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
                <div className="bg-gradient-to-r from-red-600 via-orange-500 to-amber-500 px-6 py-8 shadow-lg">
                    <h3 className="text-white font-bold text-3xl md:text-4xl tracking-wide mb-2">Hidden Costs of Web Application Development (India 2026)</h3>
                    <p className="text-white/90 text-sm md:text-base font-light">Most web app development quotes cover only the build cost. These are the costs most businesses miss when budgeting — plan for all of them:</p>
                </div>

                {/* Desktop View */}
                <div className="hidden md:block">
                    {/* Column Headers */}
                    <div className="grid grid-cols-4 gap-4 p-6 border-b border-slate-200 bg-slate-900 text-white">
                        <div className="font-bold text-sm uppercase tracking-wide">Hidden Cost</div>
                        <div className="font-bold text-sm uppercase tracking-wide">India Cost 2026</div>
                        <div className="font-bold text-sm uppercase tracking-wide">Frequency</div>
                        <div className="font-bold text-sm uppercase tracking-wide">Notes</div>
                    </div>

                    {/* Cost Rows */}
                    <div className="p-6 space-y-2">
                        {hiddenCosts.map((cost, idx) => {
                            return (
                                <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:border-slate-300 transition-colors">
                                    <div className="w-full px-6 py-5 flex items-center gap-4 text-left">
                                        <div className="grid grid-cols-4 gap-4 w-full items-start">
                                            <div>
                                                <span className="font-bold text-slate-900 text-sm">{cost.hiddenCost}</span>
                                            </div>
                                            <div>
                                                <span className="text-red-600 font-semibold text-sm">{cost.indiaCost2026}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 text-sm">{cost.frequency}</span>
                                            </div>
                                            <div>
                                                <span className="text-slate-600 text-sm">{cost.notes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Mobile Collapsible View */}
                <div className="md:hidden p-4 space-y-4">
                    {/* Section Label */}
                    <div>
                        <h4 className="text-slate-700 font-bold text-xs uppercase tracking-wider">Cost Breakdown</h4>
                    </div>

                    {hiddenCosts.map((cost, idx) => {
                        const isExpanded = expandedRows.has(idx);
                        return (
                            <div key={idx} className="bg-white/50 backdrop-blur-sm rounded-lg overflow-hidden border border-slate-200 hover:bg-slate-50 transition-colors">
                                {/* Clickable Header */}
                                <div 
                                    onClick={() => toggleRow(idx)}
                                    className="px-4 py-3 flex items-center justify-between cursor-pointer hover:bg-slate-100 transition-colors"
                                >
                                    <div className="flex-1">
                                        <span className="font-bold text-slate-900 text-sm block">{cost.hiddenCost}</span>
                                        <span className="text-red-600 font-semibold text-xs">{cost.indiaCost2026}</span>
                                    </div>
                                    <span className={`text-slate-600 text-lg transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                                        ▼
                                    </span>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div className="px-4 py-4 border-t border-slate-200 bg-slate-50/50 space-y-3">
                                        <div className="space-y-3 text-sm">
                                            <div className="flex items-start gap-3 pb-3 border-b border-slate-200">
                                                <span className="font-semibold text-slate-600 min-w-fit">Frequency:</span>
                                                <span className="text-slate-700">{cost.frequency}</span>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="font-semibold text-slate-600 min-w-fit">Notes:</span>
                                                <span className="text-slate-700">{cost.notes}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default function WebDevelopmentPackagesPage() {
    return (
        <div className="flex flex-col min-h-screen font-sans bg-slate-50 text-slate-900 selection:bg-green-500 selection:text-white overflow-x-hidden">
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
                <div className="absolute top-[15%] left-[5%] w-[400px] h-[400px] border-[40px] border-green-500/10 rounded-3xl animate-geo-spin" />
                <div className="absolute bottom-[10%] right-[5%] w-[300px] h-[300px] border-[30px] border-emerald-600/5 rounded-full animate-geo-float" />
                <div className="absolute top-[40%] right-[20%] w-[150px] h-[150px] bg-green-400/10 rotate-45 animate-geo-spin-slow" />
            </div>

            <main className="flex-grow flex flex-col items-center w-full relative z-10 pb-20">

                <section className="w-full pt-32 pb-16 px-6">
                    <AnimateOnScroll direction="down" className="max-w-4xl mx-auto text-center bg-white/40 backdrop-blur-md p-10 md:p-16 rounded-3xl shadow-xl shadow-slate-200/50 border border-white">
                        <h2 className="text-green-500 tracking-[0.3em] text-xs md:text-sm font-bold uppercase mb-4">
                            Transparent Pricing Tiers
                        </h2>
                        <h1 className="text-4xl md:text-6xl lg:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 mb-6">
                            Web Development Packages
                        </h1>
                        <p className="text-slate-600 text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
                            Build your online presence with our professional web development solutions. Custom designs for every business need.
                        </p>
                    </AnimateOnScroll>
                </section>

                <section className="w-full max-w-7xl mx-auto px-6 py-10 space-y-12">
                    <AnimateOnScroll direction="up" delay={0}>
                        <TechnologyStackTable />
                    </AnimateOnScroll>

                    <AnimateOnScroll direction="up" delay={0.2}>
                        <WebsitePackagesTable />
                    </AnimateOnScroll>

                    <AnimateOnScroll direction="up" delay={0.4}>
                        <WebApplicationPackagesTable />
                    </AnimateOnScroll>
                </section>

                {/* --- NOTE SECTION --- */}
                <section className="w-full max-w-7xl mx-auto px-6 py-8">
                    <AnimateOnScroll direction="up" delay={0.5}>
                        <div className="bg-amber-50 rounded-2xl border-l-4 border-amber-500 shadow-md overflow-hidden">
                            <div className="px-6 md:px-8 py-5 space-y-2">
                                <h3 className="text-amber-600 font-bold text-sm uppercase tracking-widest">Important Note</h3>
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    Standard production deployment is included. Advanced cloud infrastructure, VPS configuration, complex server architecture, migration, DevOps setup, or specialized deployment may have additional charges.
                                </p>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </section>

                {/* --- THIRD-PARTY INTEGRATION SERVICES SECTION --- */}
                <section className="w-full max-w-7xl mx-auto px-6 py-8">
                    <AnimateOnScroll direction="up" delay={0.6}>
                        <div className="bg-blue-50 rounded-2xl border-l-4 border-blue-500 shadow-md overflow-hidden">
                            <div className="px-6 md:px-8 py-5 space-y-3">
                                <h3 className="text-blue-600 font-bold text-sm uppercase tracking-widest">Third-Party Integration Services</h3>
                                <div className="space-y-2">
                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        Third-party integrations are handled according to the requirements of each project.
                                    </p>

                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        An integration will be included in the project price <span className="font-bold text-slate-900">only when it is specifically mentioned in the approved project scope</span>
                                    </p>

                                    <p className="text-slate-700 text-sm leading-relaxed">
                                        If an integration is <span className="font-bold text-slate-900">not required</span> in the original project scope and the client requests it to add, the integration will be treated as <span className="font-bold text-slate-900\">additional development work</span> and charged separately.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </section>

                {/* --- HIDDEN COSTS SECTION --- */}
                <section className="w-full max-w-7xl mx-auto px-6 py-12">
                    <AnimateOnScroll direction="up" delay={0.7}>
                        <HiddenCostsTable />
                    </AnimateOnScroll>
                </section>

                {/* --- AMC SECTION --- */}
                <section className="w-full max-w-7xl mx-auto px-6 py-3">
                    <AnimateOnScroll direction="up" delay={0.8}>
                        <AMCTable />
                    </AnimateOnScroll>
                </section>

                {/* --- AMC NOTE SECTION --- */}
                <section className="w-full max-w-7xl mx-auto px-6 py-2">
                    <AnimateOnScroll direction="up" delay={0.9}>
                        <div className="bg-slate-50 rounded-2xl border-l-4 border-slate-500 shadow-md overflow-hidden">
                            <div className="px-6 md:px-8 py-5 space-y-2">
                                <p className="text-slate-700 text-sm leading-relaxed font-medium">
                                    <span className="font-bold text-slate-900">AMC = approximately 15–20% of the final development cost per year</span>
                                </p>
                            </div>
                        </div>
                    </AnimateOnScroll>
                </section>

                {/* --- MEGA CTA SECTION --- */}
                <section className="w-full pt-24 px-6">
                    <AnimateOnScroll direction="none" className="max-w-5xl mx-auto text-center bg-white shadow-2xl shadow-slate-200/50 border border-slate-100 p-12 md:p-20 rounded-3xl relative overflow-hidden">
                        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Ready to Build Your Website?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Let our expert web development team create a stunning, functional website that converts visitors into customers.
                        </p>
                        <Link href="/contact" className="inline-flex items-center justify-center px-12 py-5 bg-green-500 rounded-full hover:bg-green-600 transition-all duration-300 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
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
                                <div className="p-3 bg-slate-50 rounded-full text-green-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg></div>
                                <div className="mt-1"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Phone</p><a href="tel:+919864658393" className="text-slate-700 font-medium hover:text-green-500">+91 98646 58393</a></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-green-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg></div>
                                <div className="mt-1"><p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Email</p><a href="mailto:business@rudhco.com" className="text-slate-700 font-medium hover:text-green-500">business@rudhco.com</a></div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-slate-50 rounded-full text-green-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg></div>
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
