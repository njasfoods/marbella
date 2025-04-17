"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { aboutImage } from "../app/gallery-data"

export default function EnhancedAboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="container-responsive mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          <div className="w-full md:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -top-6 -left-6 w-24 h-24 md:w-32 md:h-32 border border-gold hidden md:block" />
              <div className="relative z-10 overflow-hidden img-hover-zoom">
                <Image
                  src={
                    aboutImage.src && aboutImage.src.trim() !== ""
                      ? aboutImage.src
                      : "/placeholder.svg?height=600&width=800"
                  }
                  alt={aboutImage.alt || "Marbella Apartments Building"}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 border border-gold/20"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 md:w-32 md:h-32 border border-gold hidden md:block" />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <div className="mb-2">
              <div className="w-16 h-[1px] bg-gold mb-4"></div>
              <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">The Development</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8 leading-tight">
              A Serene Retreat in <br className="hidden md:block" />
              Kingston&apos;s Upscale Long Lane
            </h2>
            <p className="text-gray-700 mb-6 text-base md:text-lg font-light leading-relaxed">
              Situated in the upscale region of Long Lane, Marbella Apartments offers a serene retreat just beyond the
              bustling heart of the city. Its peaceful ambiance is complemented by private vistas that provide an escape
              into nature without sacrificing convenience.
            </p>
            <p className="text-gray-700 mb-8 md:mb-10 text-base md:text-lg font-light leading-relaxed">
              Residents enjoy proximity to Manor Park, an upstanding neighborhood known for its charm and accessibility.
              The surrounding area boasts a variety of shopping destinations and fine restaurants, making it easy to
              experience local flavors and find everyday essentials just a short walk away.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-1 h-8 bg-gold mr-4"></div>
                <span className="font-light tracking-wide">Upscale Location</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-1 h-8 bg-gold mr-4"></div>
                <span className="font-light tracking-wide">Serene Environment</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="w-1 h-8 bg-gold mr-4"></div>
                <span className="font-light tracking-wide">Urban Convenience</span>
              </motion.div>
              <motion.div
                className="flex items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="w-1 h-8 bg-gold mr-4"></div>
                <span className="font-light tracking-wide">Private Vistas</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
