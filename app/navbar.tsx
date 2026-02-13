"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // 1. Import the hook

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname(); // 2. Get the current route

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
              {/* 3. Compare pathname with href to determine isActive */}
              <NavItem href="/" text="Home" isActive={pathname === '/'} />
              <NavItem href="/about" text="About" isActive={pathname === '/about'} />
              {/* <NavItem href="/search_cars" text="Search Cars" isActive={pathname === '/search_cars'} /> */}
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
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-950/95 backdrop-blur-xl border-b border-white/10 shadow-2xl">
          <ul className="flex flex-col items-center py-8 space-y-6">
            <MobileNavItem href="/" text="Home" onClick={() => setIsOpen(false)} isActive={pathname === '/'} />
            <MobileNavItem href="/about" text="About" onClick={() => setIsOpen(false)} isActive={pathname === '/about'} />
            {/* <MobileNavItem href="/search_cars" text="Search Cars" onClick={() => setIsOpen(false)} isActive={pathname === '/search_cars'} /> */}
            <MobileNavItem href="/contact" text="Contact" onClick={() => setIsOpen(false)} isActive={pathname === '/contact'} />
          </ul>
        </div>
      )}
    </nav>
  );
}

// Helper Component for Desktop Links
function NavItem({ href, text, isActive = false }: { href: string; text: string; isActive?: boolean }) {
  return (
    <Link href={href}>
      <li className="relative group cursor-pointer py-2">
        <span className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
          {text}
        </span>
        {/* Animated underline */}
        <span className={`absolute bottom-0 left-0 h-[1px] bg-amber-500 transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
      </li>
    </Link>
  );
}

// Helper Component for Mobile Links (Updated to support active state)
function MobileNavItem({ href, text, onClick, isActive }: { href: string; text: string; onClick: () => void; isActive: boolean }) {
  return (
    <Link href={href} onClick={onClick}>
      <li className={`text-sm font-medium tracking-widest uppercase cursor-pointer transition-colors ${isActive ? 'text-amber-500' : 'text-gray-300 hover:text-white'}`}>
        {text}
      </li>
    </Link>
  );
}