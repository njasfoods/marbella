"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { motion } from "framer-motion"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { submitContactForm } from "../app/actions"
import { Loader2 } from "lucide-react"

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Save to Firebase
      await addDoc(collection(db, "contactRequests"), {
        ...data,
        createdAt: new Date().toISOString(),
      })

      // Send email notification
    //   await submitContactForm(data)

      // Reset form and show success message
      reset()
      setSubmitSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("There was an error submitting your request. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-dark-blue-light p-6 md:p-10 border border-gold/20">
      <h3 className="text-xl md:text-2xl font-serif mb-6 md:mb-8">Request a Private Viewing</h3>

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 text-green-100 p-4 mb-6 rounded-sm"
        >
          Thank you for your inquiry! Our team will contact you shortly.
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 text-red-100 p-4 mb-6 rounded-sm"
        >
          {submitError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="firstName" className="block text-sm font-light text-stone-300 mb-2">
              First Name <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              id="firstName"
              className={`w-full px-4 py-3 bg-dark-blue border ${
                errors.firstName ? "border-red-500" : "border-gold/30"
              } focus:border-gold outline-none transition-colors duration-300 text-white`}
              {...register("firstName", { required: "First name is required" })}
            />
            {errors.firstName && <p className="text-red-400 text-xs mt-1">{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-light text-stone-300 mb-2">
              Last Name <span className="text-gold">*</span>
            </label>
            <input
              type="text"
              id="lastName"
              className={`w-full px-4 py-3 bg-dark-blue border ${
                errors.lastName ? "border-red-500" : "border-gold/30"
              } focus:border-gold outline-none transition-colors duration-300 text-white`}
              {...register("lastName", { required: "Last name is required" })}
            />
            {errors.lastName && <p className="text-red-400 text-xs mt-1">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-light text-stone-300 mb-2">
            Email <span className="text-gold">*</span>
          </label>
          <input
            type="email"
            id="email"
            className={`w-full px-4 py-3 bg-dark-blue border ${
              errors.email ? "border-red-500" : "border-gold/30"
            } focus:border-gold outline-none transition-colors duration-300 text-white`}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-light text-stone-300 mb-2">
            Phone <span className="text-gold">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            className={`w-full px-4 py-3 bg-dark-blue border ${
              errors.phone ? "border-red-500" : "border-gold/30"
            } focus:border-gold outline-none transition-colors duration-300 text-white`}
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9+\-\s()]{7,20}$/,
                message: "Please enter a valid phone number",
              },
            })}
          />
          {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
        </div>

        <div>
          <label htmlFor="unitType" className="block text-sm font-light text-stone-300 mb-2">
            Residence of Interest <span className="text-gold">*</span>
          </label>
          <select
            id="unitType"
            className={`w-full px-4 py-3 bg-dark-blue border ${
              errors.unitType ? "border-red-500" : "border-gold/30"
            } focus:border-gold outline-none transition-colors duration-300 text-white`}
            {...register("unitType", { required: "Please select a residence type" })}
          >
            <option value="">Select Residence Type</option>
            <option value="studio">Studio Residence</option>
            <option value="oneBedroom">One Bedroom Residence</option>
          </select>
          {errors.unitType && <p className="text-red-400 text-xs mt-1">{errors.unitType.message}</p>}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-light text-stone-300 mb-2">
            Message
          </label>
          <textarea
            id="message"
            rows={4}
            className="w-full px-4 py-3 bg-dark-blue border border-gold/30 focus:border-gold outline-none transition-colors duration-300 text-white"
            {...register("message")}
          ></textarea>
        </div>

        <div className="text-xs text-stone-400 mb-4">
          <p>
            Fields marked with <span className="text-gold">*</span> are required
          </p>
        </div>

        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold hover:bg-gold/90 text-dark-blue font-light py-4 uppercase tracking-wider text-sm transition-colors duration-300 flex justify-center items-center disabled:opacity-70 disabled:cursor-not-allowed"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Request"
          )}
        </motion.button>
      </form>
    </div>
  )
}
