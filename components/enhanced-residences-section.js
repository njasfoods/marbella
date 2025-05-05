"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, ArrowRight, Check, Eye } from "lucide-react"
import { residenceImages } from "../app/gallery-data"

export default function EnhancedResidencesSection() {
  const units = [
    {
      type: "Studio Residence",
      size: "828 sqft (gross), 768 sqft (habitable)",
      features: ["Premium Finishes", "Private Balcony", "Smart Home Integration", "Designer Fixtures"],
      units: ["Unit 1, 4, 5, 8, 9", "Unit 12, 13, 16"],
      image: residenceImages.studio,
    },
    {
      type: "One Bedroom Residence",
      size: "912 sqft (gross), 840 sqft (habitable)",
      features: ["Gourmet Kitchen", "Spa-Inspired Bathroom", "Private Balcony", "Custom Cabinetry"],
      units: ["Unit 2, 6, 7", "Unit 10, 11, 14, 15, 17, 18"],
      image: residenceImages.oneBedroom,
    },
  ]

  const [activeUnit, setActiveUnit] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  return (
    <section id="residences" className="py-16 md:py-24 bg-dark-blue text-white overflow-hidden">
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
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Luxury Residences</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">Curated Living Spaces</h2>
          <p className="text-gray-300 max-w-2xl mx-auto font-light">
            Meticulously designed residences that elevate the art of living
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="w-full lg:w-1/2">
            <motion.div
              className="bg-dark-blue-light overflow-hidden relative group"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                className="relative h-80 md:h-96 lg:h-[500px] overflow-hidden img-hover-zoom"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <Image
                  src={
                    units[activeUnit].image && units[activeUnit].image.src && units[activeUnit].image.src.trim() !== ""
                      ? units[activeUnit].image.src
                      : "/placeholder.svg?height=800&width=600"
                  }
                  alt={
                    units[activeUnit].image && units[activeUnit].image.alt
                      ? units[activeUnit].image.alt
                      : units[activeUnit].type
                  }
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 border border-gold/20"></div>

                {isHovering && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-dark-blue/60 flex items-center justify-center"
                  >
                    <button className="bg-gold text-dark-blue px-6 py-3 flex items-center space-x-2 hover:bg-gold/90 transition-colors">
                      <Eye size={18} />
                      <span>View Virtual Tour</span>
                    </button>
                  </motion.div>
                )}
              </div>
              <div className="p-6 md:p-8 border-t border-gold/20">
                <h3 className="text-xl md:text-2xl font-serif mb-3">{units[activeUnit].type}</h3>
                <p className="text-gray-300 mb-6 font-light">{units[activeUnit].size}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {units[activeUnit].features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-gold mr-2 flex-shrink-0" />
                      <span className="font-light">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Link href="#contact">
                    <button className="bg-transparent hover:bg-gold/20 text-white border border-gold px-6 md:px-8 py-3 font-light tracking-wider uppercase text-sm transition-colors duration-300 flex items-center group">
                      Request Details
                      <ChevronRight
                        size={16}
                        className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                      />
                    </button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-1 gap-6">
              {units.map((unit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`cursor-pointer p-6 md:p-8 transition-all duration-300 border ${
                    activeUnit === index
                      ? "border-gold bg-dark-blue-light"
                      : "border-gold/10 hover:border-gold/30 bg-transparent"
                  }`}
                  onClick={() => setActiveUnit(index)}
                >
                  <h3 className="text-xl font-serif mb-3">{unit.type}</h3>
                  <p className="text-gray-300 font-light">{unit.size}</p>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-sm text-gray-400 font-light">
                      {unit.type === "Studio Residence" ? "8 units available" : "9 units available"}
                    </span>
                    <ArrowRight size={18} className="text-gold" />
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-gold/10 p-6 md:p-8 border border-gold/30"
              >
                <h3 className="text-xl font-serif mb-3">Available Units</h3>
                <p className="text-gray-300 mb-4 font-light">
                  {activeUnit === 0
                    ? "Studio Units: 1, 4, 5, 8, 9, 12, 13, 16"
                    : "One Bedroom Units: 2, 6, 7, 10, 11, 14, 15, 17, 18"}
                </p>
                <Link href="#contact">
                  <button className="bg-gold hover:bg-gold/90 text-dark-blue px-6 md:px-8 py-3 font-light tracking-wider uppercase text-sm transition-colors duration-300">
                    Inquire Now
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
