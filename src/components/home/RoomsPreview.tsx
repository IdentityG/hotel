'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Sample room data
const roomsData = [
  {
    id: 1,
    name: 'Horizon Suite',
    price: 249,
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974',
    secondaryImage: 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070',
    features: ['Ocean view', 'King bed', 'Private balcony', 'Spa bath'],
    badge: 'Most Popular',
    badgeColor: 'bg-terracotta',
  },
  {
    id: 2,
    name: 'Mountain Retreat',
    price: 199,
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974',
    secondaryImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070',
    features: ['Mountain view', 'Queen bed', 'Fireplace', 'Kitchenette'],
    badge: 'New',
    badgeColor: 'bg-teal',
  },
  {
    id: 3,
    name: 'Garden Pavilion',
    price: 179,
    image: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070',
    secondaryImage: 'https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=2070',
    features: ['Garden view', 'King bed', 'Private terrace', 'Outdoor shower'],
    badge: null,
    badgeColor: '',
  },
  {
    id: 4,
    name: 'Luxury Penthouse',
    price: 399,
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=2070',
    secondaryImage: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057',
    features: ['Panoramic view', 'King bed', 'Private pool', 'Butler service'],
    badge: 'Limited Offer',
    badgeColor: 'bg-sand-dark',
  },
  {
    id: 5,
    name: 'Forest Cabin',
    price: 159,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070',
    secondaryImage: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070',
    features: ['Forest view', 'Queen bed', 'Wood fireplace', 'Hiking trails'],
    badge: null,
    badgeColor: '',
  },
]

// Room Card Component
const RoomCard = ({ room, index }: { room: typeof roomsData[0], index: number }) => {
  const [isHovered, setIsHovered] = useState(false)
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
    hidden: { opacity: 0, y: 50, rotateY: -5, rotateX: 5 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        damping: 20,
        stiffness: 100,
        delay: index * 0.1,
        duration: 0.8,
      },
    },
  }
  
  // Handle hover animations with GSAP
  useEffect(() => {
    if (!cardRef.current) return
    
    if (isHovered) {
      gsap.to(cardRef.current, {
        y: -10,
        scale: 1.03,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        duration: 0.3,
        ease: 'power2.out',
      })
    } else {
      gsap.to(cardRef.current, {
        y: 0,
        scale: 1,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.3,
        ease: 'power2.out',
      })
    }
    
    return () => {
      gsap.killTweensOf(cardRef.current)
    }
  }, [isHovered])
  
  return (
    <motion.div
      ref={cardRef}
      className={`relative bg-white rounded-xl overflow-hidden shadow-lg transform transition-all duration-300 ${index % 2 === 0 ? 'lg:-rotate-2' : 'lg:rotate-2'}`}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transformStyle: 'preserve-3d',
        transformOrigin: index % 2 === 0 ? 'left center' : 'right center',
        zIndex: isHovered ? 10 : 5 - index
      }}
    >
      {/* Main Image */}
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover object-center transition-transform duration-700"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Secondary Image (Peek on Hover) */}
        <div 
          className="absolute inset-0 transition-opacity duration-500 ease-in-out"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <Image
            src={room.secondaryImage}
            alt={`${room.name} - Secondary View`}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        
        {/* Badge */}
        {room.badge && (
          <div className={`absolute top-4 right-4 ${room.badgeColor} text-white px-3 py-1 rounded-full text-xs font-medium shadow-md`}>
            {room.badge}
          </div>
        )}
        
        {/* Hover Overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-transparent transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
        />
      </div>
      
      {/* Content */}
      <div className="p-5 bg-white">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-serif text-xl text-teal">{room.name}</h3>
          <p className="text-terracotta font-medium">
            From ${room.price}<span className="text-sm text-slate">/night</span>
          </p>
        </div>
        
        {/* Features */}
        <ul className="flex flex-wrap gap-2 mb-4">
          {room.features.map((feature, i) => (
            <li 
              key={i} 
              className="text-xs bg-ivory px-2 py-1 rounded text-slate"
            >
              {feature}
            </li>
          ))}
        </ul>
        
        {/* Book Now Button - Hidden by default, revealed on hover */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
        >
          <Link 
            href={`/booking?room=${room.id}`}
            className="block w-full bg-gradient-primary text-white text-center py-3 rounded-md transition-all duration-300 hover:bg-teal-light"
          >
            Book Now
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}

// Main Component
const RoomsPreview = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  
  // GSAP animations on scroll
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !cardsContainerRef.current) return
    
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
    
    // Parallax effect for cards container
    gsap.to(cardsContainerRef.current, {
      y: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Handle horizontal scroll for mobile
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setStartX(e.pageX - cardsContainerRef.current!.offsetLeft)
    setScrollLeft(cardsContainerRef.current!.scrollLeft)
  }
  
  const handleMouseUp = () => {
    setIsDragging(false)
  }
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - cardsContainerRef.current!.offsetLeft
    const walk = (x - startX) * 2 // Scroll speed multiplier
    cardsContainerRef.current!.scrollLeft = scrollLeft - walk
  }
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-ivory overflow-hidden"
      id="rooms"
    >
      <div className="container mx-auto px-4">
        {/* Title Header */}
        <div className="text-center mb-3">
          <h4 className="text-terracotta font-medium tracking-wider uppercase text-sm">Our Accommodations</h4>
        </div>
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-12">
          <h2 className="heading-lg text-teal mb-4">
            Discover Our <span className="text-sand-dark">Luxury Rooms</span>
          </h2>
          <p className="text-slate max-w-2xl mx-auto">
            Experience the perfect blend of comfort and elegance in our thoughtfully designed accommodations.
            Each room offers a unique atmosphere and premium amenities for an unforgettable stay.
          </p>
        </div>
        
        {/* Cards Container - Desktop: 3D Stack, Mobile: Horizontal Scroll */}
        <div 
          ref={cardsContainerRef}
          className="relative overflow-x-auto pb-8 hide-scrollbar md:overflow-visible"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {/* Mobile Instructions */}
          <div className="md:hidden text-center text-sm text-slate/70 mb-4">
            <span>← Swipe to explore rooms →</span>
          </div>
          
          {/* Room Cards */}
          <div className="flex space-x-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:space-x-0 w-max md:w-full">
            {roomsData.map((room, index) => (
              <RoomCard key={room.id} room={room} index={index} />
            ))}
          </div>
        </div>
        
        {/* View All Rooms Button */}
        <div className="text-center mt-12">
          <Link 
            href="/rooms"
            className="inline-flex items-center gap-2 text-teal hover:text-teal-light transition-colors duration-300 font-medium"
          >
            <span>View All Rooms</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
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

export default RoomsPreview