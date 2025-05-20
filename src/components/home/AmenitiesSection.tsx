'use client'

import React, { useEffect, useRef } from 'react'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Amenities data
const amenitiesData = [
  {
    id: 1,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Wellness Spa",
    subtitle: "5-Star Rated",
    description: "Indulge in rejuvenating treatments and therapies in our award-winning spa sanctuary.",
    color: "teal"
  },
  {
    id: 2,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M2 12h20" />
        <path d="M12 2v20" />
        <path d="M20 16h2" />
        <path d="M20 8h2" />
        <path d="M2 16h2" />
        <path d="M2 8h2" />
        <path d="M16 20v2" />
        <path d="M8 20v2" />
        <path d="M16 2v2" />
        <path d="M8 2v2" />
      </svg>
    ),
    title: "Infinity Pool",
    subtitle: "Panoramic Views",
    description: "Swim in our stunning infinity pool overlooking breathtaking natural landscapes.",
    color: "sand"
  },
  {
    id: 3,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "24/7 Room Service",
    subtitle: "Always Available",
    description: "Enjoy gourmet dining any time of day with our premium in-room dining service.",
    color: "terracotta"
  },
  {
    id: 4,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M5 3v16h14V3H5z" />
        <path d="M5 19a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1H5v1z" />
        <path d="M9 7h6" />
        <path d="M9 11h6" />
        <path d="M9 15h6" />
      </svg>
    ),
    title: "Business Center",
    subtitle: "Fully Equipped",
    description: "Stay productive with our state-of-the-art business facilities and high-speed internet.",
    color: "teal"
  },
  {
    id: 5,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
        <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
        <line x1="6" y1="1" x2="6" y2="4" />
        <line x1="10" y1="1" x2="10" y2="4" />
        <line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
    title: "Gourmet Restaurant",
    subtitle: "Farm to Table",
    description: "Savor exquisite cuisine prepared by our renowned chefs using locally-sourced ingredients.",
    color: "sand"
  },
  {
    id: 6,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
        <line x1="17.5" y1="15" x2="9" y2="15" />
      </svg>
    ),
    title: "Fitness Center",
    subtitle: "Open 24/7",
    description: "Maintain your fitness routine with our modern gym equipment and personal trainers.",
    color: "terracotta"
  },
  {
    id: 7,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </svg>
    ),
    title: "Concierge Service",
    subtitle: "Personalized",
    description: "Let our attentive concierge team assist with all your needs and special requests.",
    color: "teal"
  },
  {
    id: 8,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
      </svg>
    ),
    title: "Nature Trails",
    subtitle: "Guided Tours",
    description: "Explore the surrounding natural beauty with our expert guides on scenic hiking trails.",
    color: "sand"
  },
]

// Amenity Card Component
const AmenityCard = ({ amenity, index }: { amenity: typeof amenitiesData[0], index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, amount: 0.3 })
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 100,
        delay: index * 0.1,
        duration: 0.6,
      },
    },
  }
  
  // Icon animation variants
  const iconVariants = {
    hidden: { opacity: 0, rotate: -10, scale: 0.8 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        delay: index * 0.1 + 0.3,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
    hover: {
      scale: 1.1,
      rotate: [0, -5, 5, -5, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
        rotate: {
          duration: 0.5,
          ease: 'easeInOut',
          repeat: 0,
        },
      },
    },
  }
  
  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1 + 0.4,
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }
  
  // Get color classes based on amenity color
  const getColorClasses = (color: string) => {
    switch (color) {
      case 'teal':
        return {
          iconColor: 'text-teal',
          bgColor: 'bg-white/90',
          hoverBgColor: 'group-hover:bg-teal/10',
          borderColor: 'border-teal/30',
          glowColor: 'group-hover:shadow-teal/30',
          titleColor: 'text-teal group-hover:text-teal-light',
          subtitleColor: 'text-slate',
          descriptionColor: 'text-slate',
        }
      case 'sand':
        return {
          iconColor: 'text-sand-dark',
          bgColor: 'bg-white/90',
          hoverBgColor: 'group-hover:bg-sand/10',
          borderColor: 'border-sand/30',
          glowColor: 'group-hover:shadow-sand/30',
          titleColor: 'text-sand-dark group-hover:text-sand',
          subtitleColor: 'text-slate',
          descriptionColor: 'text-slate',
        }
      case 'terracotta':
        return {
          iconColor: 'text-terracotta',
          bgColor: 'bg-white/90',
          hoverBgColor: 'group-hover:bg-terracotta/10',
          borderColor: 'border-terracotta/30',
          glowColor: 'group-hover:shadow-terracotta/30',
          titleColor: 'text-terracotta group-hover:text-terracotta-light',
          subtitleColor: 'text-slate',
          descriptionColor: 'text-slate',
        }
      default:
        return {
          iconColor: 'text-teal',
          bgColor: 'bg-white/90',
          hoverBgColor: 'group-hover:bg-teal/10',
          borderColor: 'border-teal/30',
          glowColor: 'group-hover:shadow-teal/30',
          titleColor: 'text-teal group-hover:text-teal-light',
          subtitleColor: 'text-slate',
          descriptionColor: 'text-slate',
        }
    }
  }
  
  const colors = getColorClasses(amenity.color)
  
  return (
    <motion.div
      ref={cardRef}
      className={`group relative overflow-hidden rounded-xl backdrop-blur-md border ${colors.borderColor} ${colors.bgColor} transition-all duration-500 h-full shadow-md`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -10,
        transition: { duration: 0.3, ease: 'easeOut' },
      }}
      style={{ 
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Glassmorphism effect */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colors.hoverBgColor}`} />
      
      {/* Glow effect on hover */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_30px_rgba(0,0,0,0.2)] ${colors.glowColor}`} />
      
      <div className="relative z-10 p-6 flex flex-col items-center text-center h-full">
        {/* Icon */}
        <motion.div
          className={`mb-4 ${colors.iconColor} transition-colors duration-300`}
          variants={iconVariants}
          initial="hidden"
          animate={controls}
          whileHover="hover"
        >
          {amenity.icon}
        </motion.div>
        
        {/* Content */}
        <motion.div
          className="space-y-2"
          variants={textVariants}
          initial="hidden"
          animate={controls}
        >
          <h3 className={`font-serif text-xl transition-colors duration-300 ${colors.titleColor}`}>
            {amenity.title}
          </h3>
          
          {amenity.subtitle && (
            <p className={`text-sm font-medium ${colors.subtitleColor}`}>{amenity.subtitle}</p>
          )}
          
          <p className={`${colors.descriptionColor} mt-2 text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-500`}>
            {amenity.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Component
const AmenitiesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)
  
  // GSAP animations on scroll
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !orbitRef.current) return
    
    // Heading animation
    gsap.from(headingRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })
    
    // Orbit animation
    gsap.to(orbitRef.current, {
      rotation: 360,
      duration: 40,
      repeat: -1,
      ease: 'none',
    })
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-ivory overflow-hidden relative"
      id="amenities"
    >
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-terracotta/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sand/5 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Header */}
        <div className="text-center mb-3">
          <h4 className="text-terracotta font-medium tracking-wider uppercase text-sm">Hotel Features</h4>
        </div>
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="heading-lg text-teal mb-4">
            Exceptional <span className="text-sand-dark">Amenities</span>
          </h2>
          <p className="text-slate">
            Indulge in our world-class facilities designed to elevate your stay and create unforgettable moments.
            Each amenity is thoughtfully crafted to provide the ultimate luxury experience.
          </p>
        </div>
        
        {/* Central Orbit Element */}
        <div className="relative mb-16 flex justify-center">
          <div className="relative w-24 h-24 rounded-full bg-gradient-primary flex items-center justify-center shadow-lg z-20">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-12 h-12 text-white">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          
          {/* Orbit Ring */}
          <div ref={orbitRef} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-teal/20 z-10" />
        </div>
        
        {/* Amenities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenitiesData.map((amenity, index) => (
            <AmenityCard key={amenity.id} amenity={amenity} index={index} />
          ))}
        </div>
      </div>
      
      {/* Mobile Swipe Instructions */}
      <div className="lg:hidden text-center text-sm text-slate/70 mt-8">
        <span>Swipe to explore more amenities</span>
      </div>
      
      {/* Mobile Horizontal Scroll Version */}
      <div className="mt-8 lg:hidden overflow-x-auto hide-scrollbar pb-8">
        <div className="flex space-x-4 px-4 w-max">
          {amenitiesData.map((amenity, index) => (
            <div key={amenity.id} className="w-64 flex-shrink-0">
              <AmenityCard amenity={amenity} index={index} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Custom CSS for hiding scrollbar */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default AmenitiesSection