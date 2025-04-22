"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, Menu, X } from "lucide-react"

// Helper function to safely check if we're in the browser
function isBrowser() {
  return typeof window !== "undefined"
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      if (isBrowser()) {
        if (window.scrollY > 50) {
          setScrolled(true)
        } else {
          setScrolled(false)
        }

        // Update active section based on scroll position
        const sections = document.querySelectorAll("section[id]")
        const scrollPosition = window.scrollY + 100

        sections.forEach((section) => {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          const sectionId = section.getAttribute("id") || ""

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId)
          }
        })
      }
    }

    if (isBrowser()) {
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navItems = ["Home", "About", "Location", "Amenities", "Residences", "Gallery", "Contact"]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-white/90 backdrop-blur-md shadow-lg py-2" : "bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container-responsive mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className={`text-2xl md:text-3xl font-serif font-bold ${scrolled ? "text-gray-900" : "text-white"}`}>
            Marbella
            <span className="text-gold">.</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          {navItems.map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className={`font-light tracking-wide hover:text-gold transition-colors duration-300 relative py-2 ${
                scrolled ? "text-gray-800" : "text-white"
              } ${activeSection === item.toLowerCase() ? "text-gold" : ""}`}
            >
              {item}
              {activeSection === item.toLowerCase() && (
                <motion.span
                  layoutId="activeSection"
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-gold"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 ${scrolled ? "text-gray-900" : "text-white"}`}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white/95 backdrop-blur-md overflow-hidden"
          >
            <div className="container-responsive mx-auto py-4 flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-800 font-light tracking-wide py-4 hover:text-gold transition-colors border-b border-gray-100 mobile-menu-item flex justify-between items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span>{item}</span>
                  <ChevronRight size={16} className="text-gold" />
                </Link>
              ))}
              <div className="mt-6 pt-4">
                <Link href="#contact">
                  <button className="w-full bg-gold hover:bg-gold/90 text-dark-blue font-light py-3 uppercase tracking-wider text-sm transition-colors duration-300">
                    Schedule Viewing
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
