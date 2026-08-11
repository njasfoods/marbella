"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Sparkles,
  Maximize,
  Shield,
  Home,
  MapPin,
  TreePalmIcon,
} from "lucide-react";
import { amenitiesImages } from "../app/gallery-data";

export default function EnhancedAmenitiesSection() {
  const amenities = [
    {
      name: "Swimming Pool",
      description: "Resort-style pool with lounging area",
      icon: <Sparkles className="h-5 w-5 text-gold" />,
      image: amenitiesImages.pool,
    },
    {
      name: "Rooftop Lounge & Terrace",
      description: "Panoramic views of Kingston",
      icon: <Maximize className="h-5 w-5 text-gold" />,
      image: amenitiesImages.rooftop,
    },
    {
      name: "24hr Security with CCTV",
      description: "Round-the-clock monitoring and security",
      icon: <Shield className="h-5 w-5 text-gold" />,
      image: amenitiesImages.security,
    },
    {
      name: "Airbnb Friendly",
      description:
        "Short-term rental friendly—perfect for Airbnb hosts and guests.",
      icon: <Home className="h-5 w-5 text-gold" />,
      image: amenitiesImages.airbnb,
    },
    {
      name: "Landscaped Areas",
      description: "Beautifully maintained gardens",
      icon: <TreePalmIcon className="h-5 w-5 text-gold" />,
      image: amenitiesImages.landscape,
    },
    {
      name: "Abundant Parking",
      description: "Designated parking for residents and guests",
      icon: <MapPin className="h-5 w-5 text-gold" />,
      image: amenitiesImages.parking,
    },
    {
      name: "Elevator Access",
      description: "Convenient access to all floors",
      icon: <Maximize className="h-5 w-5 text-gold" />,
      image: amenitiesImages.elevator,
    },
  ];

  return (
    <section
      id="amenities"
      className="py-16 md:py-24 bg-stone-50 relative overflow-hidden"
    >
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-24 h-64 bg-gold/5"></div>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-24 h-64 bg-gold/5"></div>

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
              Exclusive Offerings
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-4">
            Curated Amenities
          </h2>
          <p className="text-stone-700 max-w-2xl mx-auto font-light">
            Experience a lifestyle of unparalleled luxury with our thoughtfully
            selected amenities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {amenities.map((amenity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="relative overflow-hidden mb-6 img-hover-zoom border border-gold/10">
                <Image
                  src={
                    amenity.image &&
                    amenity.image.src &&
                    amenity.image.src.trim() !== ""
                      ? amenity.image.src
                      : "/placeholder.svg?height=400&width=600"
                  }
                  alt={
                    amenity.image && amenity.image.alt
                      ? amenity.image.alt
                      : amenity.name
                  }
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-blue/90 via-dark-blue/10 to-transparent group-hover:from-dark-blue/95 transition-all duration-500"></div>
                <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-dark-blue/70 backdrop-blur-sm border border-gold/40">
                  {amenity.icon}
                </div>
                <div className="absolute bottom-0 left-0 right-0 py-4 px-5">
                  <h3 className="text-xl font-serif text-white">{amenity.name}</h3>
                </div>
              </div>
              <div>
                <p className="text-stone-600 font-light">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
