'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, useAnimation } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Image data for carousel
const propertyImages = [
  {
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
    alt: "Hotel Exterior",
    caption: "Our stunning eco-friendly architecture"
  },
  {
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070",
    alt: "Luxury Suite",
    caption: "Elegant and comfortable accommodations"
  },
  {
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=2070",
    alt: "Hotel Pool",
    caption: "Relax by our pristine infinity pool"
  },
  {
    src: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070",
    alt: "Mountain View",
    caption: "Breathtaking natural surroundings"
  },
]

// Custom component for split text animation
const SplitText = ({ children }: { children: string }) => {
  const text = children
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.5 })
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])
  
  // Split text into words
  const words = text.split(' ')
  
  // Animation variants for words
  const wordVariants = {
    hidden: {},
    visible: {},
  }
  
  // Animation variants for each word
  const wordAnimation = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    }),
  }
  
  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={wordVariants}
        className="flex flex-wrap"
      >
        {words.map((word, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordAnimation}
            className="mr-1 mb-1"
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}

const AboutSection = () => {
  const [activeImage, setActiveImage] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageContainerRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  
  // Handle image carousel auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % propertyImages.length)
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])
  
  // GSAP animations on scroll
  useEffect(() => {
    if (!sectionRef.current) return
    
    // Create a timeline for scroll-based animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      }
    })
    
    // Animate the heading
    tl.from(headingRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out"
    })
    
    // Parallax effect for images
    gsap.to(imageContainerRef.current, {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      }
    })
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-ivory overflow-hidden"
      id="about"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              {/* Title Header */}
              <div className="mb-3">
                <h4 className="text-terracotta font-medium tracking-wider uppercase text-sm">Our Story</h4>
              </div>
              
              <h2 ref={headingRef} className="heading-lg text-teal mb-6">
                About Our <span className="text-sand-dark">Luxury Lodge</span>
              </h2>
              
              <div ref={textRef} className="space-y-6 text-slate">
                <SplitText>
                  Founded in 2010, our luxury lodge is nestled in the heart of pristine nature, 
                  offering a perfect blend of modern luxury and environmental consciousness. 
                  Our award-winning architecture seamlessly integrates with the surrounding landscape, 
                  creating a harmonious retreat for discerning travelers.
                </SplitText>
                
                <SplitText>
                  We pride ourselves on our commitment to sustainable luxury, with eco-friendly 
                  practices integrated throughout the property. From our locally-sourced gourmet 
                  cuisine to our energy-efficient design, we strive to provide an exceptional 
                  experience while preserving the natural beauty that surrounds us.
                </SplitText>
              </div>
              
              <motion.div 
                className="mt-8 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-2 bg-teal/10 px-4 py-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-teal">
                    <path d="M2 22c1.25-1.25 2.5-2.5 3.5-2.5 1.5 0 2 1.5 3 1.5 1 0 1.5-1.5 3-1.5s2 1.5 3 1.5c1 0 1.5-1.5 3-1.5s2 1.5 3 1.5c1 0 2.25-1.25 3.5-2.5" />
                    <path d="M12 2v8" />
                    <path d="M8 6l4-4 4 4" />
                    <path d="M10 10a2 2 0 1 1 4 0c0 1.5-2 2-2 6" />
                    <path d="M12 18v2" />
                  </svg>
                  <span className="text-teal text-sm font-medium">Eco-friendly</span>
                </div>
                <div className="flex items-center gap-2 bg-sand/20 px-4 py-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-sand-dark">
                    <circle cx="12" cy="8" r="6" />
                    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
                    <path d="M8 8h.01" />
                    <path d="M16 8h.01" />
                    <path d="M12 10h.01" />
                    <path d="M11 6a1 1 0 0 1 2 0" />
                  </svg>
                  <span className="text-slate text-sm font-medium">Award-winning</span>
                </div>
                <div className="flex items-center gap-2 bg-terracotta/10 px-4 py-2 rounded-md">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-terracotta">
                    <path d="M12 2L2 7l10 5 10-5" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                    <path d="M12 22v-5" />
                    <path d="M7 4.5l10 5" />
                  </svg>
                  <span className="text-terracotta text-sm font-medium">Luxury</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Image Carousel */}
          <div 
            ref={imageContainerRef}
            className="w-full lg:w-1/2 relative h-[400px] md:h-[500px] overflow-hidden rounded-lg shadow-xl"
          >
            <div ref={carouselRef} className="relative w-full h-full">
              {propertyImages.map((image, index) => (
                <motion.div
                  key={index}
                  className="absolute inset-0 w-full h-full"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ 
                    opacity: activeImage === index ? 1 : 0,
                    scale: activeImage === index ? 1 : 1.1,
                    zIndex: activeImage === index ? 10 : 0
                  }}
                  transition={{ duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] }}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                  
                  {/* Caption overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/80 to-transparent p-6">
                    <p className="text-white text-sm md:text-base">{image.caption}</p>
                  </div>
                </motion.div>
              ))}
              
              {/* Carousel indicators */}
              <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                {propertyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${activeImage === index ? 'bg-white w-4' : 'bg-white/50'}`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
              
              {/* Mobile swipe controls */}
              <div className="absolute inset-0 z-10 md:hidden flex justify-between items-center px-4">
                <button 
                  onClick={() => setActiveImage((prev) => (prev - 1 + propertyImages.length) % propertyImages.length)}
                  className="bg-charcoal/30 backdrop-blur-sm rounded-full p-2 text-white"
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button 
                  onClick={() => setActiveImage((prev) => (prev + 1) % propertyImages.length)}
                  className="bg-charcoal/30 backdrop-blur-sm rounded-full p-2 text-white"
                  aria-label="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection