"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { collection, addDoc } from "firebase/firestore"
import { db } from "../lib/firebase"
import { Loader2 } from "lucide-react"

export default function NewsletterForm({ className = "" }) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setSubmitError("Please enter a valid email address")
      return
    }

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // Save to Firebase
      await addDoc(collection(db, "newsletterSubscribers"), {
        email,
        subscribedAt: new Date().toISOString(),
      })

      // Reset form and show success message
      setEmail("")
      setSubmitSuccess(true)

      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    } catch (error) {
      console.error("Error submitting newsletter form:", error)
      setSubmitError("There was an error subscribing. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={className}>
      <h3 className="text-lg font-serif mb-6">Newsletter</h3>
      <p className="text-stone-400 mb-6 font-light">
        Subscribe to receive exclusive updates and offers from Marbella Apartments.
      </p>

      {submitSuccess && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/20 border border-green-500/30 text-green-100 p-3 mb-4 text-sm"
        >
          Thank you for subscribing to our newsletter!
        </motion.div>
      )}

      {submitError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-500/30 text-red-100 p-3 mb-4 text-sm"
        >
          {submitError}
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-dark-blue-light border border-gold/30 focus:border-gold outline-none transition-colors duration-300 text-white"
        />
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gold hover:bg-gold/90 text-dark-blue font-light py-3 uppercase tracking-wider text-sm transition-colors duration-300 flex justify-center items-center disabled:opacity-70"
          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
          whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin mr-2" />
              Subscribing...
            </>
          ) : (
            "Subscribe"
          )}
        </motion.button>
      </form>
    </div>
  )
}
