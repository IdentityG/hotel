'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Gallery image data
const galleryImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1974",
    alt: "Luxury Suite",
    caption: "Elegant Mountain View Suite",
    category: "rooms",
    width: "wide", // wide, medium, tall
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    alt: "Hotel Bathroom",
    caption: "Premium Marble Bathroom",
    category: "rooms",
    width: "medium",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070",
    alt: "Hotel Exterior",
    caption: "Architectural Excellence",
    category: "exterior",
    width: "medium",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070",
    alt: "Infinity Pool",
    caption: "Sunset at the Infinity Pool",
    category: "amenities",
    width: "wide",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
    alt: "Forest View",
    caption: "Surrounded by Nature",
    category: "nature",
    width: "tall",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?q=80&w=2070",
    alt: "Luxury Dining",
    caption: "Fine Dining Experience",
    category: "dining",
    width: "medium",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1974",
    alt: "Spa Treatment",
    caption: "Rejuvenating Spa Treatments",
    category: "spa",
    width: "medium",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=2070",
    alt: "Garden View",
    caption: "Tranquil Garden Pavilion",
    category: "nature",
    width: "wide",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070",
    alt: "Cozy Fireplace",
    caption: "Warm Evenings by the Fire",
    category: "amenities",
    width: "tall",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070",
    alt: "Penthouse Suite",
    caption: "Luxurious Penthouse Experience",
    category: "rooms",
    width: "medium",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2057",
    alt: "Breakfast Spread",
    caption: "Gourmet Breakfast Selection",
    category: "dining",
    width: "medium",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1584132915807-fd1f5fbc078f?q=80&w=2070",
    alt: "Outdoor Lounge",
    caption: "Relax in Our Outdoor Lounge",
    category: "amenities",
    width: "wide",
  },
]

// Gallery Image Component
const GalleryImage = ({ image, index, onClick }: { image: typeof galleryImages[0], index: number, onClick: () => void }) => {
  const imageRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(imageRef, { once: true, amount: 0.2 })
  const controls = useAnimation()
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible')
    }
  }, [isInView, controls])
  
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      },
    },
  }
  
  // Get width class based on image type
  const getWidthClass = (width: string) => {
    switch (width) {
      case 'wide':
        return 'md:col-span-2'
      case 'tall':
        return 'md:row-span-2'
      default:
        return ''
    }
  }
  
  return (
    <motion.div
      ref={imageRef}
      className={`relative overflow-hidden rounded-xl ${getWidthClass(image.width)} transform transition-transform duration-500 hover:z-10`}
      variants={imageVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.02, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
      onClick={onClick}
    >
      <div className="relative w-full h-full aspect-square overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-700 hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Caption overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent flex items-end p-4"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-white font-medium text-sm md:text-base">{image.caption}</p>
        </motion.div>
        
        {/* Category tag */}
        <div className="absolute top-3 right-3 bg-teal/80 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
          {image.category}
        </div>
      </div>
    </motion.div>
  )
}

// Lightbox Modal Component
const LightboxModal = ({ 
  isOpen, 
  onClose, 
  currentImage, 
  onPrev, 
  onNext 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  currentImage: typeof galleryImages[0] | null,
  onPrev: () => void,
  onNext: () => void
}) => {
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowLeft':
          onPrev()
          break
        case 'ArrowRight':
          onNext()
          break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose, onPrev, onNext])
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }
  
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      }
    },
  }
  
  // Swipe handlers for mobile
  const handleDragEnd = (e: any, { offset }: { offset: { x: number } }) => {
    if (offset.x < -100) {
      onNext()
    } else if (offset.x > 100) {
      onPrev()
    }
  }
  
  if (!currentImage) return null
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div
            className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={handleDragEnd}
          >
            <div className="relative w-full h-[80vh]">
              <Image
                src={currentImage.src}
                alt={currentImage.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Caption */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal/90 to-transparent p-6">
              <h3 className="text-white font-medium text-lg">{currentImage.caption}</h3>
              <p className="text-white/70 text-sm">{currentImage.category}</p>
            </div>
            
            {/* Close button */}
            <button
              className="absolute top-4 right-4 bg-charcoal/50 hover:bg-charcoal/80 text-white rounded-full p-2 backdrop-blur-sm transition-colors duration-300"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            {/* Navigation buttons */}
            <button
              className="absolute top-1/2 left-4 -translate-y-1/2 bg-charcoal/50 hover:bg-charcoal/80 text-white rounded-full p-3 backdrop-blur-sm transition-colors duration-300"
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6"></polyline>
              </svg>
            </button>
            
            <button
              className="absolute top-1/2 right-4 -translate-y-1/2 bg-charcoal/50 hover:bg-charcoal/80 text-white rounded-full p-3 backdrop-blur-sm transition-colors duration-300"
              onClick={(e) => { e.stopPropagation(); onNext(); }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Category Filter Button Component
const CategoryButton = ({ 
  category, 
  isActive, 
  onClick 
}: { 
  category: string, 
  isActive: boolean, 
  onClick: () => void 
}) => {
  // Get color class based on category
  const getColorClass = (category: string) => {
    switch (category.toLowerCase()) {
      case 'all':
        return 'bg-teal text-white hover:bg-teal-light'
      case 'rooms':
        return 'bg-sand-dark text-charcoal hover:bg-sand'
      case 'dining':
        return 'bg-terracotta text-white hover:bg-terracotta-light'
      case 'spa':
        return 'bg-teal-light text-white hover:bg-teal'
      case 'amenities':
        return 'bg-sand text-charcoal hover:bg-sand-dark'
      case 'nature':
        return 'bg-terracotta-light text-white hover:bg-terracotta'
      case 'exterior':
        return 'bg-slate text-white hover:opacity-90'
      default:
        return 'bg-teal text-white hover:bg-teal-light'
    }
  }

  return (
    <motion.button
      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${getColorClass(category)} ${isActive ? 'scale-105 shadow-md' : 'opacity-80'}`}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </motion.button>
  )
}

// Main Gallery Section Component
const GallerySection = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const sectionRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const filterRef = useRef<HTMLDivElement>(null)
  
  // Get unique categories
  const categories = ['all', ...Array.from(new Set(galleryImages.map(img => img.category)))]
  
  // Filter images by category
  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)
  
  // GSAP animations on scroll
  useEffect(() => {
    if (!sectionRef.current || !headingRef.current || !galleryRef.current || !filterRef.current) return
    
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
    
    // Filter buttons animation
    gsap.from(filterRef.current.children, {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: filterRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    })
    
    return () => {
      // Clean up ScrollTrigger instances
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])
  
  // Lightbox navigation handlers
  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }
  
  const closeLightbox = () => {
    setLightboxOpen(false)
  }
  
  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? filteredImages.length - 1 : prev - 1
    )
  }
  
  const goToNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === filteredImages.length - 1 ? 0 : prev + 1
    )
  }
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 bg-ivory overflow-hidden relative"
      id="gallery"
    >
      {/* Enhanced background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-teal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-terracotta/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-sand/5 rounded-full blur-3xl" />
        
        {/* Additional floating elements */}
        <motion.div 
          className="absolute top-[15%] right-[20%] w-16 h-16 bg-teal/10 rounded-full"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-[25%] left-[15%] w-24 h-24 bg-terracotta/10 rounded-full"
          animate={{
            y: [0, 20, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Decorative patterns */}
        <div className="absolute top-10 right-10 w-32 h-32 border border-teal/20 rounded-full" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-sand/20 rounded-full" />
        <div className="absolute top-1/3 left-1/4 w-16 h-16 border border-terracotta/20 rotate-45 transform" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Title Header */}
        <div className="text-center mb-3">
          <h4 className="text-terracotta font-medium tracking-wider uppercase text-sm">Visual Journey</h4>
        </div>
        
        {/* Section Heading */}
        <div ref={headingRef} className="text-center mb-10 max-w-2xl mx-auto">
          <h2 className="heading-lg text-teal mb-4">
            Explore Our <span className="text-sand-dark">Gallery</span>
          </h2>
          <p className="text-slate">
            Immerse yourself in the visual story of our luxury lodge. From breathtaking views to exquisite
            interiors, discover the essence of refined hospitality through our curated collection of images.
          </p>
        </div>
        
        {/* Category Filter */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((category) => (
            <CategoryButton
              key={category}
              category={category}
              isActive={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            />
          ))}
        </div>
        
        {/* Masonry Gallery Grid */}
        <div 
          ref={galleryRef}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {filteredImages.map((image, index) => (
            <GalleryImage 
              key={image.id} 
              image={image} 
              index={index} 
              onClick={() => openLightbox(index)} 
            />
          ))}
        </div>
        
        {/* View Full Gallery Button */}
        <div className="mt-12 text-center">
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
            whileTap={{ scale: 0.95 }}
          >
            View Full Gallery
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.a>
        </div>
      </div>
      
      {/* Lightbox Modal */}
      <LightboxModal 
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        currentImage={filteredImages[currentImageIndex]}
        onPrev={goToPrevImage}
        onNext={goToNextImage}
      />
    </section>
  )
}

export default GallerySection
