"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"
import { ChevronRight, ArrowDown } from "lucide-react"
import { heroImages } from "../app/gallery-data"

export default function EnhancedHeroSlider() {
  const [current, setCurrent] = useState(0)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 150])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {heroImages.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === current ? "opacity-100" : "opacity-0"}`}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <motion.div style={{ y }} className="absolute inset-0">
            <Image
              src={slide.src && slide.src.trim() !== "" ? slide.src : "/placeholder.svg?height=1080&width=1920"}
              alt={slide.title || "Marbella Luxury Apartments"}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center text-white px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 20 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-2"
            >
              <div className="w-16 h-[1px] bg-gold mx-auto mb-8"></div>
              <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Luxury Apartments</span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-serif mb-4 max-w-4xl leading-tight"
            >
              {slide.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 20 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 max-w-2xl font-light"
            >
              {slide.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: index === current ? 1 : 0, y: index === current ? 0 : 20 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="relative"
            >
              <Link href="#contact">
                <button className="bg-transparent hover:bg-gold/20 text-white border border-gold px-8 py-4 font-light tracking-wider uppercase text-sm transition-colors duration-300 flex items-center group">
                  Schedule a Private Viewing
                  <ChevronRight
                    size={16}
                    className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </button>
              </Link>
              <div className="absolute -bottom-1 -right-1 w-full h-full border border-gold/50 -z-10"></div>
            </motion.div>
          </div>
        </div>
      ))}

      <div className="absolute bottom-12 left-0 right-0 z-30 flex justify-center space-x-3">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === current ? "bg-gold w-8" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 hidden md:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <Link href="#about">
          <button className="text-white opacity-70 hover:opacity-100 transition-opacity">
            <ArrowDown size={24} />
            <span className="sr-only">Scroll down</span>
          </button>
        </Link>
      </motion.div>
    </section>
  )
}
