"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, MessageCircle } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [chatMessages, setChatMessages] = useState([
    { text: "How may we assist you with Marbella Apartments today?", isUser: false },
  ])
  const chatRef = useRef(null)

  useEffect(() => {
    if (chatRef.current && typeof window !== "undefined") {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleSendMessage = () => {
    if (message.trim() === "") return

    setChatMessages([...chatMessages, { text: message, isUser: true }])
    setMessage("")

    // Simulate response after a short delay
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          text: "Thank you for your message. Our concierge team will respond shortly. Would you like to schedule a private viewing?",
          isUser: false,
        },
      ])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white rounded-lg shadow-2xl mb-4 w-full max-w-sm overflow-hidden border border-gold/20"
          >
            <div className="bg-dark-blue p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-gold mr-2 animate-pulse"></div>
                  <h3 className="font-serif">Concierge Service</h3>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-dark-blue-light rounded-full p-1 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm mt-1 text-gold/80">Available 24/7 for your inquiries</p>
            </div>
            <div ref={chatRef} className="p-4 bg-gray-50 h-60 overflow-y-auto">
              {chatMessages.map((msg, index) => (
                <div key={index} className={`mb-3 flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`p-3 rounded-lg max-w-[80%] ${
                      msg.isUser ? "bg-gold/90 text-white ml-auto" : "bg-white shadow-sm border-l-2 border-gold"
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-3 flex items-center border-t border-gray-100">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your message..."
                className="flex-1 border border-gray-200 rounded-full py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 bg-gold text-white rounded-full p-2 hover:bg-gold/90 transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-dark-blue hover:bg-dark-blue/90 text-white rounded-full p-3 shadow-lg flex items-center justify-center border border-gold/20"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} className="text-gold" />
      </motion.button>
    </div>
  )
}
