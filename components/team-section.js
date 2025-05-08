"use client"

import { motion } from "framer-motion"
import { Users, Building, HardHat, Construction } from "lucide-react"

export default function TeamSection() {
  const teamMembers = [
    {
      role: "The Developers",
      name: "KBI Developments",
      icon: <Building className="h-8 w-8 text-gold" />,
    },
    {
      role: "The Architects",
      name: "StudiOH Core Limited",
      icon: <Users className="h-8 w-8 text-gold" />,
    },
    {
      role: "The Engineers",
      name: "Aztecian Design Company Limited",
      icon: <HardHat className="h-8 w-8 text-gold" />,
    },
    {
      role: "The Contractors",
      name: "Three Knights Construction Limited",
      icon: <Construction className="h-8 w-8 text-gold" />,
    },
  ]

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
            <span className="text-gold tracking-[0.2em] uppercase text-sm font-light">Excellence in Development</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">The Team</h2>
          <p className="text-gray-700 max-w-2xl mx-auto font-light">
            Marbella is brought to life by a team of industry-leading professionals committed to excellence
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 border border-gold/20 hover:shadow-xl transition-shadow duration-300 luxury-card"
            >
              <div className="flex items-center mb-6">
                <div className="mr-6">{member.icon}</div>
                <div>
                  <h3 className="text-xl md:text-2xl font-serif mb-2" style={{ color: "#B87E5C" }}>
                    {member.role}
                  </h3>
                  <p className="text-blue-700 font-light">{member.name}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
