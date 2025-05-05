"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Mail } from "lucide-react"
import ContactForm from "../components/contact-form"
import WhatsAppDirectButton from "../components/whatsapp-direct-button"

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 bg-dark-blue text-white overflow-hidden">
      <div className="container-responsive mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="mb-2">
              <div className="w-16 h-[1px] bg-gold mb-4"></div>
              <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Private Consultation</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 md:mb-8">Begin Your Journey</h2>
            <p className="mb-8 md:mb-10 text-gray-300 max-w-lg font-light leading-relaxed">
              Our dedicated concierge team is available to provide personalized assistance and arrange a private viewing
              of Marbella&apos;s exclusive residences in Long Lane.
            </p>

            <div className="space-y-6 md:space-y-8">
              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="border border-gold p-3 mr-6">
                  <MapPin size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Location</h3>
                  <p className="text-gray-300 font-light">Long Lane, Kingston, Jamaica</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="border border-gold p-3 mr-6">
                  <Phone size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Private Consultation</h3>
                  <p className="text-gray-300 font-light">+1 (876) 123-4567</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="border border-gold p-3 mr-6">
                  <Mail size={20} className="text-gold" />
                </div>
                <div>
                  <h3 className="font-serif text-lg mb-2">Email</h3>
                  <p className="text-gray-300 font-light">concierge@marbellakingston.com</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8">
              <WhatsAppDirectButton className="w-full md:w-auto" buttonText="Chat with Us on WhatsApp" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
