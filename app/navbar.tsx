"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false); // State for mobile services dropdown
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md border-b border-white/10 transition-all duration-300">
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="group">
            <div className="text-2xl font-bold text-white tracking-widest uppercase">
              Rudhco
              <span className="text-amber-500 group-hover:text-blue-500 transition-colors duration-500">.</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <ul className="flex items-center gap-10">
              <NavItem href="/" text="Home" isActive={pathname === '/'} />
              <NavItem href="/about" text="About" isActive={pathname === '/about'} />
              
              {/* Nested Desktop Dropdown for Services */}
              <DesktopServicesDropdown pathname={pathname} />

              <NavItem href="/contact" text="Contact" isActive={pathname === '/contact'} />
            </ul>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-amber-500 focus:outline-none transition-colors"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl max-h-[80vh] overflow-y-auto">
          <ul className="flex flex-col items-center py-8 space-y-6">
            <MobileNavItem href="/" text="Home" onClick={() => setIsOpen(false)} isActive={pathname === '/'} />
            <MobileNavItem href="/about" text="About" onClick={() => setIsOpen(false)} isActive={pathname === '/about'} />
            
            {/* Mobile Services Accordion */}
            <li className="w-full flex flex-col items-center">
              <div className="flex items-center justify-center gap-1">
                {/* 1. Tapping the Text redirects to /services */}
                <Link 
                  href="/services" 
                  onClick={() => setIsOpen(false)}
                  className={`text-sm font-medium tracking-widest uppercase transition-colors py-2 ${pathname.startsWith('/services') ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}
                >
                  Services
                </Link>
                
                {/* 2. Tapping the Arrow opens the dropdown */}
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMobileServicesOpen(!isMobileServicesOpen);
                  }}
                  className={`p-2 transition-colors ${pathname.startsWith('/services') ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}
                >
                  <svg className={`w-5 h-5 transition-transform duration-300 ${isMobileServicesOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>
              
              {/* Expanded Mobile Links */}
              <div className={`overflow-hidden transition-all duration-300 w-full px-6 flex flex-col items-center ${isMobileServicesOpen ? 'max-h-[500px] mt-2 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="w-full bg-white/5 rounded-xl py-4 flex flex-col items-center space-y-4">
                    <div className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Construction</div>
                    <MobileSubNavItem href="/services#residential" text="Residential Construction" onClick={() => setIsOpen(false)} />
                    <MobileSubNavItem href="/services#commercial" text="Commercial Construction" onClick={() => setIsOpen(false)} />
                    <MobileSubNavItem href="/services#renovation" text="Renovation & Remodelling" onClick={() => setIsOpen(false)} />
                    <MobileSubNavItem href="/services#interior" text="Interior Design & Turnkey" onClick={() => setIsOpen(false)} />
                    
                    <div className="w-12 h-[1px] bg-white/10 my-2"></div>
                    
                    <div className="text-[10px] text-gray-500 font-bold tracking-[0.3em] uppercase">Digital</div>
                    <MobileSubNavItem href="https://rudhco.com/digital.marketing/" text="Digital Services" onClick={() => setIsOpen(false)} />
                </div>
              </div>
            </li>

            <MobileNavItem href="/contact" text="Contact" onClick={() => setIsOpen(false)} isActive={pathname === '/contact'} />
          </ul>
        </div>
      )}
    </nav>
  );
}

// --- DESKTOP DROPDOWN COMPONENT ---
function DesktopServicesDropdown({ pathname }: { pathname: string }) {
  const isActive = pathname.startsWith('/services');

  return (
    <li className="relative group/main">
      
      {/* Main Navbar Link (Hit Area Extended via Padding) */}
      <Link href="/services" className="block py-6 -my-6">
        <div className="relative py-2 inline-block cursor-pointer">
            <span className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover/main:text-white'}`}>
              Services
            </span>
            <span className={`absolute bottom-0 left-0 h-[1px] bg-amber-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover/main:w-full'}`}></span>
        </div>
      </Link>

      {/* Level 1 Dropdown (Appears on Hover) - Centered under the text */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 opacity-0 invisible group-hover/main:opacity-100 group-hover/main:visible transition-all duration-300 z-50 w-64">
        <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2 relative">

          {/* Construction Services Item (Has Level 2 Dropdown) */}
          <div className="relative group/sub">
            <div className="px-5 py-3 hover:bg-white/5 cursor-pointer flex items-center justify-between transition-colors">
              <span className="text-sm font-medium text-gray-300 group-hover/sub:text-amber-500 tracking-wide">Construction Services</span>
              {/* Responsive Arrow Icon: Points Left on md, Points Right on lg */}
              <svg className="w-4 h-4 text-gray-500 group-hover/sub:text-amber-500 transform transition-transform duration-300 md:group-hover/sub:rotate-90 lg:group-hover/sub:-rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Level 2 Dropdown (Side Menu) - Responsive Positioning */}
            {/* Opens LEFT on md screens (to avoid overflow), opens RIGHT on lg screens */}
            <div className="absolute top-0 md:right-full md:left-auto md:pr-2 lg:right-full lg:right-auto lg:pl-2 lg:pr-0 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-300 w-[280px]">
              <div className="bg-neutral-900/95 backdrop-blur-xl border border-white/10 rounded-xl shadow-2xl py-2">
                <DropdownLink href="/services#residential" text="Residential Construction" />
                <DropdownLink href="/services#commercial" text="Commercial Construction" />
                <DropdownLink href="/services#renovation" text="Renovation & Remodelling" />
                <DropdownLink href="/services#interior" text="Interior Design & Turnkey" />
              </div>
            </div>
          </div>

          {/* Digital Services Item */}
          <Link href="https://rudhco.com/digital.marketing/" className="block px-5 py-3 hover:bg-white/5 transition-colors">
            <span className="text-sm font-medium text-gray-300 hover:text-amber-500 tracking-wide">Digital Services</span>
          </Link>

        </div>
      </div>
    </li>
  );
}

// Helper: Standard Desktop Nav Item
function NavItem({ href, text, isActive = false }: { href: string; text: string; isActive?: boolean }) {
  return (
    <li className="relative group cursor-pointer py-6 -my-6">
      <Link href={href} className="relative py-2 inline-block">
        <span className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
          {text}
        </span>
        <span className={`absolute bottom-0 left-0 h-[1px] bg-amber-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </Link>
    </li>
  );
}

// Helper: Desktop Dropdown Sub-Link
function DropdownLink({ href, text }: { href: string; text: string }) {
  return (
    <Link href={href} className="block px-5 py-3 hover:bg-white/5 transition-colors group/item">
      <span className="text-sm text-gray-400 group-hover/item:text-white transition-colors block">
        {text}
      </span>
    </Link>
  );
}

// Helper: Mobile Main Nav Item
function MobileNavItem({ href, text, onClick, isActive }: { href: string; text: string; onClick: () => void; isActive: boolean }) {
  return (
    <Link href={href} onClick={onClick}>
      <li className={`text-sm font-medium tracking-widest uppercase cursor-pointer transition-colors ${isActive ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}>
        {text}
      </li>
    </Link>
  );
}

// Helper: Mobile Sub Nav Item
function MobileSubNavItem({ href, text, onClick }: { href: string; text: string; onClick: () => void }) {
  return (
    <Link href={href} onClick={onClick} className="w-full text-center">
      <span className="text-sm text-gray-400 hover:text-amber-500 transition-colors block py-1">
        {text}
      </span>
    </Link>
  );
}