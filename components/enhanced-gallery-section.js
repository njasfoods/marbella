"use client"

import { motion } from "framer-motion"
import ImageGallery from "./image-gallery"
import { galleryImages } from "../app/gallery-data"

export default function EnhancedGallerySection() {
  return (
    <section id="gallery" className="py-16 md:py-24 bg-stone-50 overflow-hidden">
      <div className="container-responsive mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="mb-2">
            <div className="w-16 h-[1px] bg-gold mx-auto mb-4"></div>
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Visual Journey</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Experience Marbella</h2>
          <p className="text-stone-700 max-w-2xl mx-auto font-light">
            Immerse yourself in the elegance and sophistication of our exclusive residences
          </p>
        </motion.div>

        <ImageGallery images={galleryImages} />
      </div>
    </section>
  )
}
