"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ChevronRight } from "lucide-react"
import { floorPlanImages } from "../app/gallery-data"

export default function EnhancedFloorPlansSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
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
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Detailed Plans</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Residence Floor Plans</h2>
          <p className="text-gray-700 max-w-2xl mx-auto font-light">
            Explore the thoughtfully designed layouts of our studio and one-bedroom residences
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="bg-white p-6 border border-gold/20 hover:shadow-xl transition-shadow duration-300 luxury-card">
              <h3 className="text-xl md:text-2xl font-serif mb-4">Studio Residence</h3>
              <p className="text-gray-600 mb-6 font-light">
                Gross Floor Area (including balconies and half of parti walls): 856 sqft
                <br />
                Habitable Floor Area (including balconies): 768 sqft
              </p>
              <div className="relative aspect-w-4 aspect-h-3 mb-6 img-hover-zoom">
                <Image
                  src={
                    floorPlanImages.studio && floorPlanImages.studio.src && floorPlanImages.studio.src.trim() !== ""
                      ? floorPlanImages.studio.src
                      : "/placeholder.svg?height=600&width=800"
                  }
                  alt={
                    floorPlanImages.studio && floorPlanImages.studio.alt
                      ? floorPlanImages.studio.alt
                      : "Studio Floor Plan"
                  }
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-light">Units: 1, 4, 5, 8, 9, 12, 13, 16</span>
                <button className="text-gold hover:text-gold/80 font-light flex items-center btn-luxury">
                  <span>View Details</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="bg-white p-6 border border-gold/20 hover:shadow-xl transition-shadow duration-300 luxury-card">
              <h3 className="text-xl md:text-2xl font-serif mb-4">One Bedroom Residence</h3>
              <p className="text-gray-600 mb-6 font-light">
                Gross Floor Area (including balconies and half of parti walls): 912 sqft
                <br />
                Habitable Floor Area (including balconies): 840 sqft
              </p>
              <div className="relative aspect-w-4 aspect-h-3 mb-6 img-hover-zoom">
                <Image
                  src={
                    floorPlanImages.oneBedroom &&
                    floorPlanImages.oneBedroom.src &&
                    floorPlanImages.oneBedroom.src.trim() !== ""
                      ? floorPlanImages.oneBedroom.src
                      : "/placeholder.svg?height=600&width=800"
                  }
                  alt={
                    floorPlanImages.oneBedroom && floorPlanImages.oneBedroom.alt
                      ? floorPlanImages.oneBedroom.alt
                      : "One Bedroom Floor Plan"
                  }
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500 font-light">Units: 2, 6, 7, 10, 11, 14, 15, 17, 18</span>
                <button className="text-gold hover:text-gold/80 font-light flex items-center btn-luxury">
                  <span>View Details</span>
                  <ChevronRight size={16} className="ml-1" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
