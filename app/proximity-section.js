"use client";

import { motion } from "framer-motion";
import { Clock } from "lucide-react";

export default function ProximitySection() {
  const locations = [
    { name: "Manor Park", time: "3 minutes", icon: "🏞️" }, // more suburban/green space vibe
    { name: "New Kingston", time: "13 minutes", icon: "🏢" }, // business center
    { name: "Andrews Hospital", time: "14 minutes", icon: "🏥" }, // hospital icon
    { name: "Half Way Tree", time: "14 minutes", icon: "🚌" }, // transportation hub
    { name: "Devon House", time: "15 minutes", icon: "🍦" }, // tourist attraction, ice cream spot
    { name: "Crossroads", time: "17 minutes", icon: "🛣️" }, // major intersection
    { name: "Liguanea", time: "16 minutes", icon: "🏬" }, // shopping/urban
    { name: "University of Technology Papine", time: "19 minutes", icon: "🎓" },
    { name: "UWI Mona", time: "21 minutes", icon: "🎓" },
    { name: "Downtown Kingston", time: "22 minutes", icon: "🏙️" },
    { name: "Portmore (Toll)", time: "30 minutes", icon: "🌉" },
    { name: "Norman Manley Int Airport", time: "39 minutes", icon: "✈️" },
  ];

  return (
    <section
      id="location"
      className="py-16 md:py-24 bg-gray-50 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-32 h-32 border border-gold/20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border border-gold/20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container-responsive mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="mb-2">
            <div className="w-16 h-[1px] bg-gold mx-auto mb-4"></div>
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">
              Location & Proximity
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Effortless Connectivity
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto font-light">
            Marbella offers convenient access to Kingston&apos;s most
            prestigious destinations
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-none p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 border border-gold/10 group luxury-card"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gray-50 rounded-none flex items-center justify-center text-2xl mr-4 border border-gold/20 group-hover:border-gold transition-colors duration-300">
                  {location.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg md:text-xl">
                    {location.name}
                  </h3>
                </div>
              </div>
              <div className="flex items-center text-gray-600 font-light">
                <Clock size={16} className="mr-2 text-gold" />
                <span>{location.time} drive</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
