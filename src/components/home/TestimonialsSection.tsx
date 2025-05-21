'use client'

import React, { useRef, useEffect, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: 'Alexandra Morgan',
    location: 'New York, USA',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5,
    stayType: 'Honeymoon Suite',
    quote: 'An unforgettable experience that exceeded all expectations. The attention to detail and personalized service made our honeymoon truly magical.',
    initials: 'AM'
  },
  {
    id: 2,
    name: 'James Wilson',
    location: 'London, UK',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5,
    stayType: 'Executive Retreat',
    quote: 'The perfect blend of luxury and natural beauty. My executive retreat was both productive and rejuvenating thanks to the exceptional facilities and serene environment.',
    initials: 'JW'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    location: 'Singapore',
    image: 'https://randomuser.me/api/portraits/women/23.jpg',
    rating: 5,
    stayType: 'Family Vacation',
    quote: 'Our family vacation was elevated to an extraordinary experience. The staff went above and beyond to ensure both adults and children felt pampered and entertained.',
    initials: 'SC'
  },
  {
    id: 4,
    name: 'Michael Rodriguez',
    location: 'Barcelona, Spain',
    image: 'https://randomuser.me/api/portraits/men/67.jpg',
    rating: 5,
    stayType: 'Wellness Retreat',
    quote: 'The spa treatments and mindfulness activities created the perfect wellness journey. I left feeling completely renewed and centered.',
    initials: 'MR'
  },
  {
    id: 5,
    name: 'Emily Johnson',
    location: 'Sydney, Australia',
    image: 'https://randomuser.me/api/portraits/women/85.jpg',
    rating: 5,
    stayType: 'Anniversary Celebration',
    quote: 'Celebrating our anniversary here was a dream come true. The sunset dinner arranged by the staff was one of the most romantic experiences of our lives.',
    initials: 'EJ'
  },
]

// Enhanced Star Rating Component with staggered animations
const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, i) => (
        <motion.svg 
          key={i} 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill={i < rating ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.5"
          className={`w-5 h-5 ${i < rating ? 'text-sand-dark' : 'text-slate/30'}`}
          initial={{ scale: 0, opacity: 0, rotate: -30 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{ 
            delay: 0.1 * i,
            duration: 0.5,
            type: 'spring',
            stiffness: 200,
            damping: 10
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </motion.svg>
      ))}
    </div>
  )
}

// Animated Quote Component
const AnimatedQuote = ({ text }: { text: string }) => {
  return (
    <div className="overflow-hidden">
      <motion.p 
        className="text-slate text-lg md:text-xl leading-relaxed pl-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: 0.3,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {text.split(' ').map((word, index) => (
          <motion.span
            key={index}
            className="inline-block mr-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.3 + (index * 0.01), // Staggered delay for each word
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        ))}
      </motion.p>
    </div>
  )
}

// Enhanced Testimonial Card Component
const TestimonialCard = ({ 
  testimonial, 
  isActive,
  direction
}: { 
  testimonial: typeof testimonials[0], 
  isActive: boolean,
  direction: number
}) => {
  const [imageError, setImageError] = useState(false)
  
  // Handle image loading error
  const handleImageError = () => {
    setImageError(true)
  }
  
  return (
    <motion.div 
      className={`relative flex flex-col md:flex-row gap-6 md:gap-10 p-6 md:p-8 rounded-xl bg-gradient-to-br from-white/95 to-white/85 backdrop-blur-md shadow-xl transition-all duration-500 ${isActive ? 'scale-100 opacity-100 z-10' : 'scale-95 opacity-0 -z-10 absolute top-0 left-0 right-0'}`}
      initial={{ opacity: 0, y: 50, x: direction * 100 }}
      animate={{ 
        opacity: isActive ? 1 : 0, 
        y: isActive ? 0 : 50,
        x: isActive ? 0 : direction * 100,
        scale: isActive ? 1 : 0.95,
      }}
      exit={{ opacity: 0, x: -direction * 100, scale: 0.9 }}
      transition={{ 
        duration: 0.7, 
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={isActive ? { 
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', 
        y: -5,
        transition: { duration: 0.3 }
      } : {}}
    >
      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-teal via-sand to-terracotta opacity-80"></div>
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-teal/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-terracotta/10 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '12s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-sand/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '5s' }}></div>
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        ></div>
      </div>
      
      {/* Left side - Guest profile with enhanced animations */}
      <div className="flex flex-col items-center md:items-start space-y-3 md:w-1/3">
        <motion.div 
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden border-2 border-sand shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ scale: 1.05, rotate: 3, transition: { duration: 0.3 } }}
        >
          {!imageError ? (
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 80px, 96px"
              onError={handleImageError}
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-teal to-teal-light text-white text-xl font-medium">
              {testimonial.initials}
            </div>
          )}
          
          {/* Decorative ring */}
          <motion.div 
            className="absolute -inset-1 rounded-full border-2 border-sand/30"
            initial={{ opacity: 0, scale: 1.2 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          ></motion.div>
        </motion.div>
        
        <motion.div 
          className="text-center md:text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="font-serif text-lg font-medium text-teal">{testimonial.name}</h3>
          <p className="text-sm text-slate">{testimonial.location}</p>
        </motion.div>
        
        <motion.div 
          className="flex flex-col space-y-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <StarRating rating={testimonial.rating} />
          <motion.span 
            className="inline-block px-3 py-1 bg-gradient-to-r from-sand/40 to-sand/20 text-slate text-xs rounded-full shadow-sm"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            {testimonial.stayType}
          </motion.span>
        </motion.div>
      </div>
      
      {/* Right side - Quote with enhanced animations */}
      <div className="md:w-2/3 flex items-center">
        <div className="relative">
          <motion.svg 
            className="absolute -top-4 -left-2 w-8 h-8 text-teal/30" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="currentColor" 
            viewBox="0 0 24 24"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2, type: 'spring' }}
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </motion.svg>
          <AnimatedQuote text={testimonial.quote} />
        </div>
      </div>
    </motion.div>
  )
}

// Enhanced Testimonials Section Component
const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // Track direction for animations
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const indicatorsRef = useRef<HTMLDivElement>(null)
  
  // Handle navigation with direction tracking
  const goToNext = () => {
    setDirection(1)
    setActiveIndex(prev => (prev + 1) % testimonials.length)
  }
  
  const goToPrev = () => {
    setDirection(-1)
    setActiveIndex(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }
  
  const goToIndex = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }
  
  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      goToNext()
    }, 6000) // Change every 6 seconds
    
    return () => clearInterval(interval)
  }, [activeIndex])
  
  // Enhanced GSAP animations
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current || !headingRef.current || !cardsRef.current) return
    
    // Create a timeline for the section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 20%',
        end: 'bottom bottom',
        pin: containerRef.current,
        pinSpacing: true,
        scrub: 0.5,
        toggleActions: "play none none reverse" // Add this line
      }
    })
    
    // Animate the heading with split text effect
    const headingElements = headingRef.current.querySelectorAll('h4, h2, p')
    tl.fromTo(headingElements, 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, duration: 0.5, ease: 'power3.out' }
    )
    
    // Animate the background elements with more dynamic movement
    const bgElements = document.querySelectorAll('.parallax-bg')
    bgElements.forEach((el, i) => {
      // Create more varied and interesting movements
      const direction = i % 2 === 0 ? -1 : 1
      const distance = 15 + (i * 5) // Varied distances
      const rotation = (i % 3) * 15 // Some elements rotate
      
      gsap.to(el, {
        y: `${direction * distance}%`,
        x: `${(i % 2) * direction * 10}%`,
        rotation: rotation,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        }
      })
    })
    
    // Animate the floating elements continuously
    const floatingElements = document.querySelectorAll('.floating')
    floatingElements.forEach((el, i) => {
      const delay = i * 0.5
      const duration = 3 + (i % 2) * 2
      
      gsap.to(el, {
        y: '-20px',
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay
      })
    })
    
    // Animate the indicators
    if (indicatorsRef.current) {
      gsap.from(indicatorsRef.current.children, {
        opacity: 0,
        scale: 0.5,
        stagger: 0.1,
        duration: 0.4,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: indicatorsRef.current,
          start: 'top 80%',
        }
      })
    }
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-gradient-to-b from-ivory to-ivory/95 overflow-hidden relative"
      id="testimonials"
    >
      {/* Enhanced background decorative elements with parallax */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="parallax-bg absolute top-10 left-10 w-64 h-64 bg-teal/5 rounded-full blur-3xl" />
        <div className="parallax-bg absolute bottom-20 right-10 w-80 h-80 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="parallax-bg absolute top-1/3 left-1/3 w-40 h-40 bg-sand/10 rounded-full blur-2xl" />
        
        {/* Enhanced decorative patterns */}
        <div className="parallax-bg absolute top-20 right-[10%] w-40 h-40 border border-teal/10 rounded-full" />
        <div className="parallax-bg absolute bottom-[15%] left-[5%] w-60 h-60 border border-sand/10 rounded-full" />
        <div className="parallax-bg absolute top-[40%] right-[20%] w-20 h-20 border border-terracotta/10 rotate-45 transform" />
        
        {/* New floating elements */}
        <div className="floating absolute top-[15%] right-[30%] w-3 h-3 bg-teal/40 rounded-full shadow-teal/20 shadow-lg" />
        <div className="floating absolute top-[60%] left-[20%] w-2 h-2 bg-terracotta/40 rounded-full shadow-terracotta/20 shadow-lg" />
        <div className="floating absolute bottom-[30%] right-[15%] w-4 h-4 bg-sand/40 rounded-full shadow-sand/20 shadow-lg" />
        
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" 
          style={{ 
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.05\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")'
          }}
        ></div>
      </div>
      
      <div ref={containerRef} className="container mx-auto px-4 min-h-[80vh] flex flex-col justify-center relative z-10">
        {/* Enhanced Section Heading */}
        <div ref={headingRef} className="text-center mb-16 max-w-2xl mx-auto">
          <h4 className="text-terracotta font-medium tracking-wider uppercase text-sm mb-2">
            Guest Experiences
          </h4>
          <h2 className="font-serif text-4xl md:text-5xl font-medium text-teal mb-4 relative">
            Memorable <span className="text-sand-dark relative">
              Moments
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-sand-dark/30"></span>
            </span>
          </h2>
          <p className="text-slate">
            Discover what our guests have to say about their extraordinary experiences at our luxury lodge.
            Every stay tells a unique story of comfort, elegance, and exceptional service.
          </p>
        </div>
        
        {/* Testimonials Cards with AnimatePresence for smooth transitions */}
        <div ref={cardsRef} className="relative max-w-4xl mx-auto w-full mb-12">
          <AnimatePresence mode="wait">
            {testimonials.map((testimonial, index) => (
              index === activeIndex && (
                <TestimonialCard 
                  key={testimonial.id}
                  testimonial={testimonial}
                  isActive={index === activeIndex}
                  direction={direction}
                />
              )
            ))}
          </AnimatePresence>
        </div>
        
        {/* Enhanced Indicators */}
        <div ref={indicatorsRef} className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`h-3 rounded-full transition-all duration-300 ${index === activeIndex ? 'bg-gradient-to-r from-teal to-teal-light w-8' : 'bg-slate/30 w-3'}`}
              onClick={() => goToIndex(index)}
              aria-label={`View testimonial ${index + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            />
          ))}
        </div>
        
        {/* Enhanced Navigation Buttons */}
        <div className="flex justify-center mt-4 space-x-6">
          <motion.button
            className="p-4 rounded-full bg-white shadow-lg text-teal hover:bg-teal hover:text-white transition-colors duration-300 relative overflow-hidden group"
            onClick={goToPrev}
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            {/* Button background animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-teal to-teal-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </motion.button>
          
          <motion.button
            className="p-4 rounded-full bg-white shadow-lg text-teal hover:bg-teal hover:text-white transition-colors duration-300 relative overflow-hidden group"
            onClick={goToNext}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            {/* Button background animation */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-teal to-teal-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="relative z-10">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </motion.button>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection