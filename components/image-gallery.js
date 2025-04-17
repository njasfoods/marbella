"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function ImageGallery({ images }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)

  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsOpen(false)
      if (e.key === "ArrowRight") handleNext()
      if (e.key === "ArrowLeft") handlePrev()
    }

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown)
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen, currentImage])

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isOpen])

  const openLightbox = (index) => {
    setCurrentImage(index)
    setIsOpen(true)
  }

  const handleNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handlePrev = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden cursor-pointer"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-w-4 aspect-h-3 relative img-hover-zoom">
              <Image
                src={image.src && image.src.trim() !== "" ? image.src : "/placeholder.svg?height=600&width=800"}
                alt={image.alt || `Marbella Apartments - ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 border border-gold/20"></div>
              <div className="absolute inset-0 bg-dark-blue/0 group-hover:bg-dark-blue/40 transition-all duration-500 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <button className="bg-gold/90 text-white px-6 py-2 uppercase tracking-wider text-sm font-light hover:bg-gold transition-colors duration-300">
                    View Larger
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-dark-blue/80 text-white py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
              <p className="font-serif text-sm">{image.caption || "Luxury Living Space"}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-8"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={32} />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={40} />
            </button>

            <div className="relative w-full max-w-5xl max-h-[80vh] flex items-center justify-center">
              <motion.div
                key={currentImage}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative w-full h-full"
              >
                <div className="relative w-full h-[70vh]">
                  <Image
                    src={
                      images[currentImage].src && images[currentImage].src.trim() !== ""
                        ? images[currentImage].src
                        : "/placeholder.svg?height=1200&width=1600"
                    }
                    alt={images[currentImage].alt || `Marbella Apartments - ${currentImage + 1}`}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-dark-blue/80 text-white py-3 px-6">
                  <p className="font-serif text-lg">{images[currentImage].caption || "Luxury Living Space"}</p>
                </div>
              </motion.div>
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gold transition-colors z-10"
              aria-label="Next image"
            >
              <ChevronRight size={40} />
            </button>

            <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImage ? "bg-gold w-8" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
