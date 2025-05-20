'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const HeroSection = () => {
  // Add state to track image loading
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Refs for GSAP animations
  const heroRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  
  // GSAP animations on component mount
  useEffect(() => {
    // Only run animations when image is loaded or after a timeout
    const tl = gsap.timeline({
      delay: 0.1 // Small delay to ensure no conflict with navbar
    })
    
    // Hero section entrance animation
    tl.from(heroRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
    
    // Parallax effect for the hero image
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      })
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Handle image load
  useEffect(() => {
    // Set a timeout to ensure animations run even if image loading is delayed
    const timer = setTimeout(() => {
      if (!imageLoaded) {
        setImageLoaded(true)
      }
    }, 1000) // 1 second timeout
    
    return () => clearTimeout(timer)
  }, [imageLoaded])
  
  return (
    <section 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden bg-ivory pt-16" // Added pt-16 to account for navbar height
    >
      {/* Background Image with Parallax Effect */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-[120%] -z-10"
      >
        {/* Fallback background color/gradient in case image fails to load */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal to-teal-light opacity-80" />
        
        {/* Image with proper error handling */}
        <Image
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop"
          alt="Luxury Hotel"
          fill
          priority
          sizes="100vw"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)} // Still trigger animations even if image fails
          style={{ objectFit: 'cover', objectPosition: 'center' }} // Use style prop for object-fit
          className="z-0"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 to-transparent z-10" />
      </div>
      
      {/* Content Container */}
      <div 
        ref={contentRef}
        className="container mx-auto px-4 h-full flex flex-col justify-center relative z-20"
      >
        <div className="max-w-2xl text-white space-y-6">
          {/* Animated Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sand uppercase tracking-widest font-light"
          >
            Experience Luxury & Comfort
          </motion.p>
          
          {/* Animated Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium leading-tight"
          >
            Discover Exceptional <br />
            <span className="text-sand-dark">Luxury Experience</span>
          </motion.h1>
          
          {/* Animated Description */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-body text-white/90 max-w-lg"
          >
            Indulge in the perfect blend of elegance, comfort, and world-class service. 
            Our hotel offers an unforgettable stay with breathtaking views and exceptional amenities.
          </motion.p>
          
          {/* Animated Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Link href="/booking" className="btn-primary">
              Book Now
            </Link>
            <Link href="/rooms" className="btn-secondary">
              Explore Rooms
            </Link>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm mb-2">Scroll Down</span>
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path 
              d="M12 5V19M12 19L19 12M12 19L5 12" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
      
      {/* Floating Features */}
      <div className="absolute bottom-16 right-8 md:right-16 hidden md:block z-20">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 shadow-xl"
        >
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="flex items-center gap-2">
              <Image src="/window.svg" alt="View" width={24} height={24} />
              <span>Scenic Views</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/file.svg" alt="Luxury" width={24} height={24} />
              <span>Luxury Rooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/globe.svg" alt="Service" width={24} height={24} />
              <span>24/7 Service</span>
            </div>
            <div className="flex items-center gap-2">
              <Image src="/file.svg" alt="Dining" width={24} height={24} />
              <span>Fine Dining</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection