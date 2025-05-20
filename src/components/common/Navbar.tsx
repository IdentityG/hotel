'use client'
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { gsap } from 'gsap';

// Define types for our navigation items
interface NavItem {
  name: string;
  href: string;
}

const Navbar = () => {
  // State for scroll and menu
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  // Refs for animations
  const navbarRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement[]>([]);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileLinksRef = useRef<HTMLDivElement[]>([]);
  
  // Reset refs array
  linksRef.current = [];
  mobileLinksRef.current = [];
  
  // Navigation items
  const navItems: NavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Rooms', href: '/rooms' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Amenities', href: '/amenities' },
    { name: 'Booking', href: '/booking' },
    { name: 'Contact', href: '/contact' },
  ];
  
  // Add to refs for animation
  const addToLinksRef = (el: HTMLDivElement | null) => {
    if (el && !linksRef.current.includes(el)) {
      linksRef.current.push(el);
    }
  };
  
  const addToMobileLinksRef = (el: HTMLDivElement | null) => {
    if (el && !mobileLinksRef.current.includes(el)) {
      mobileLinksRef.current.push(el);
    }
  };
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Mobile menu animation - kept this as it's triggered by user interaction
  useEffect(() => {
    if (!mobileMenuRef.current) return;
    
    if (isMobileMenuOpen) {
      // Show mobile menu
      gsap.to(mobileMenuRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
        pointerEvents: 'auto'
      });
      
      // Staggered animation for mobile links
      gsap.to(mobileLinksRef.current, {
        opacity: 1,
        y: 0,
        stagger: 0.05,
        duration: 0.3,
        delay: 0.1
      });
    } else {
      // Hide mobile menu
      gsap.to(mobileMenuRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: 'power2.in',
        pointerEvents: 'none'
      });
      
      // Hide mobile links
      gsap.to(mobileLinksRef.current, {
        opacity: 0,
        y: -10,
        stagger: 0.03,
        duration: 0.2
      });
    }
  }, [isMobileMenuOpen]);
  
  // Link hover animation function - kept this as it's triggered by user interaction
  const handleLinkHover = (e: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>, isEnter: boolean) => {
    const underline = e.currentTarget.querySelector('.link-underline') as HTMLElement;
    
    if (isEnter) {
      gsap.to(underline, {
        scaleX: 1,
        duration: 0.3,
        ease: 'power1.out'
      });
    } else {
      gsap.to(underline, {
        scaleX: 0,
        duration: 0.3,
        ease: 'power1.in'
      });
    }
  };
  
  return (
    <>
      <header 
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-charcoal/90 backdrop-blur-md py-3 shadow-lg' : 'bg-teal/90 backdrop-blur-sm py-5'}`}
      >
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div ref={logoRef} className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="font-serif text-2xl font-medium text-ivory">LUXURY</span>
              <span className="font-serif text-2xl ml-1 text-sand">LODGE</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <div 
                key={item.name}
                ref={addToLinksRef}
                className="relative"
                onMouseEnter={(e) => handleLinkHover(e, true)}
                onMouseLeave={(e) => handleLinkHover(e, false)}
                onFocus={(e) => handleLinkHover(e, true)}
                onBlur={(e) => handleLinkHover(e, false)}
              >
                <Link 
                  href={item.href}
                  className="font-sans text-sm tracking-wide text-ivory transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded px-2 py-1"
                >
                  {item.name}
                  <span className="link-underline absolute left-0 right-0 bottom-0 h-0.5 bg-sand transform scale-x-0 origin-left transition-transform duration-300"></span>
                </Link>
              </div>
            ))}
            
            {/* Book Now Button */}
            <div ref={(el) => addToLinksRef(el)} className="ml-4">
              <Link 
                href="/booking"
                className="btn-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded"
              >
                Book Now
              </Link>
            </div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-ivory focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </header>
      
      {/* Mobile Menu */}
      <div 
        ref={mobileMenuRef}
        className={`fixed inset-0 z-40 bg-teal flex flex-col justify-center items-center md:hidden opacity-0 pointer-events-none`}
      >
        <nav className="flex flex-col items-center space-y-6 py-8 px-4 w-full max-w-sm">
          {navItems.map((item, index) => (
            <div 
              key={item.name}
              ref={addToMobileLinksRef}
              className="w-full text-center"
            >
              <Link 
                href={item.href}
                className="font-sans text-xl text-ivory hover:text-sand transition-colors duration-300 block py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            </div>
          ))}
          
          {/* Mobile Book Now Button */}
          <div ref={(el) => addToMobileLinksRef(el)} className="w-full pt-4">
            <Link 
              href="/booking"
              className="btn-accent w-full text-center block focus:outline-none focus-visible:ring-2 focus-visible:ring-sand rounded"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;