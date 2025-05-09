"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ArrowRight, MessageCircle, Loader2, Send, UserCircle, LogOut } from "lucide-react"
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore"
import { db, auth } from "../lib/firebase"
import { signInAnonymously } from "firebase/auth"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [step, setStep] = useState("loading") // loading, intro, chat, fallback
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const chatRef = useRef(null)
  const messagesEndRef = useRef(null)
  const [fallbackMessages, setFallbackMessages] = useState([
    {
      id: 1,
      text: "Hello! How may we assist you with Marbella Apartments today?",
      sender: "admin",
      timestamp: Date.now(),
    },
  ])
  const unsubscribeRef = useRef(null)
  const pendingMessagesRef = useRef(new Set()) // Track pending message IDs

  // Load user data from localStorage on component mount
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== "undefined") {
      const savedUserData = localStorage.getItem("marbellaUserData")

      if (savedUserData) {
        const userData = JSON.parse(savedUserData)
        setName(userData.name || "")
        setEmail(userData.email || "")
        setPhone(userData.phone || "")

        // If we have user data, skip the intro step
        setStep(userData.chatMode || "chat")

        // If in fallback mode, load saved messages if any
        if (userData.chatMode === "fallback" && userData.fallbackMessages) {
          setFallbackMessages(userData.fallbackMessages)
        }
      } else {
        setStep("intro")
      }
    } else {
      setStep("intro")
    }
  }, [])

  // Save user data to localStorage whenever it changes
  useEffect(() => {
    if (step !== "loading" && step !== "intro" && typeof window !== "undefined") {
      localStorage.setItem(
        "marbellaUserData",
        JSON.stringify({
          name,
          email,
          phone,
          chatMode: step,
          fallbackMessages: step === "fallback" ? fallbackMessages : null,
        }),
      )
    }
  }, [name, email, phone, step, fallbackMessages])

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages, fallbackMessages])

  // Clean up listener on unmount
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current()
      }
    }
  }, [])

  // Initialize chat and listen for messages
  useEffect(() => {
    if (step === "chat") {
      setLoading(true)

      const initializeChat = async () => {
        try {
          // Sign in anonymously
          const userCredential = await signInAnonymously(auth)
          const userId = userCredential.user.uid

          console.log("Signed in with user ID:", userId)

          // Check if this is the first message for this user
          const userChatsQuery = query(collection(db, "chats"), where("userId", "==", userId))
          const userChatsSnapshot = await getDocs(userChatsQuery)
          const isFirstChat = userChatsSnapshot.empty

          console.log("Is first chat:", isFirstChat)

          // If this is the first chat, save user info
          if (isFirstChat) {
            // Create a chat document for this user
            await setDoc(doc(db, "chats", userId), {
              userId,
              name,
              email,
              phone,
              createdAt: serverTimestamp(),
              lastActive: serverTimestamp(),
            })

            // Add welcome message
            await addDoc(collection(db, "chats", userId, "messages"), {
              text: `Hello ${name}! How may we assist you with Marbella Apartments today?`,
              sender: "admin",
              createdAt: serverTimestamp(),
              timestamp: Date.now(), // For sorting and display
            })
          } else {
            // Update last active timestamp
            await setDoc(
              doc(db, "chats", userId),
              {
                lastActive: serverTimestamp(),
              },
              { merge: true },
            )

            // Check if we need to add a welcome back message
            if (messages.length === 0) {
              await addDoc(collection(db, "chats", userId, "messages"), {
                text: `Welcome back, ${name}! How can we help you today?`,
                sender: "admin",
                createdAt: serverTimestamp(),
                timestamp: Date.now(),
              })
            }
          }

          // Listen for new messages
          const messagesQuery = query(
            collection(db, "chats", userId, "messages"),
            orderBy("timestamp", "asc"),
            limit(50),
          )

          console.log("Setting up message listener")

          // Store the unsubscribe function in the ref
          unsubscribeRef.current = onSnapshot(
            messagesQuery,
            (snapshot) => {
              console.log("Message snapshot received, docs:", snapshot.docs.length)

              // Process messages and deduplicate
              const messagesList = snapshot.docs.map((doc) => {
                const data = doc.data()
                return {
                  id: doc.id,
                  ...data,
                  // Ensure timestamp is a number for consistent display
                  timestamp: data.timestamp || Date.now(),
                }
              })

              // Remove any pending message IDs that are now in Firestore
              messagesList.forEach((msg) => {
                pendingMessagesRef.current.delete(msg.id)
              })

              console.log("Processed messages:", messagesList)

              // Set messages from Firestore
              setMessages(messagesList)
              setLoading(false)
            },
            (error) => {
              console.error("Error in message listener:", error)
              setError("Error listening for messages. Please try again.")
              setLoading(false)
            },
          )
        } catch (error) {
          console.error("Error initializing chat:", error)
          setError("Unable to connect to chat. Using fallback chat mode.")
          setStep("fallback")
          setLoading(false)
        }
      }

      initializeChat()
    }
  }, [step, name, email, phone])

  const handleSendMessage = async () => {
    if (!message.trim()) return

    if (step === "chat") {
      const userId = auth.currentUser?.uid
      if (!userId) {
        setError("Chat connection lost. Using fallback chat mode.")
        setStep("fallback")
        return
      }

      try {
        console.log("Sending message:", message)

        // Create message object with all required fields
        const messageData = {
          text: message,
          sender: "user",
          createdAt: serverTimestamp(),
          timestamp: Date.now(), // For sorting and display
        }

        // Generate a temporary ID for optimistic update
        const tempId = `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

        // Optimistically add message to local state with temporary ID
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: tempId,
            ...messageData,
          },
        ])

        // Add message to Firestore
        const docRef = await addDoc(collection(db, "chats", userId, "messages"), messageData)
        console.log("Message sent with ID:", docRef.id)

        // Update last active timestamp
        await setDoc(
          doc(db, "chats", userId),
          {
            lastActive: serverTimestamp(),
          },
          { merge: true },
        )

        // The Firestore listener will automatically update the messages
        // with the correct ID from Firestore
      } catch (error) {
        console.error("Error sending message:", error)
        setError("Failed to send message. Please try again.")
      }
    } else if (step === "fallback") {
      // Add message to local fallback chat
      const newMessages = [
        ...fallbackMessages,
        { id: Date.now(), text: message, sender: "user", timestamp: Date.now() },
      ]
      setFallbackMessages(newMessages)

      // Simulate response after a short delay
      setTimeout(() => {
        setFallbackMessages((prev) => {
          const updatedMessages = [
            ...prev,
            {
              id: Date.now() + 1,
              text: "Thank you for your message. Our team will contact you shortly. Would you like to schedule a viewing?",
              sender: "admin",
              timestamp: Date.now() + 1000,
            },
          ]

          // Save to localStorage
          if (typeof window !== "undefined") {
            const savedUserData = JSON.parse(localStorage.getItem("marbellaUserData") || "{}")
            localStorage.setItem(
              "marbellaUserData",
              JSON.stringify({
                ...savedUserData,
                fallbackMessages: updatedMessages,
              }),
            )
          }

          return updatedMessages
        })
      }, 1000)
    }

    setMessage("")
  }

  const handleStartChat = () => {
    if (!name.trim()) {
      setError("Please enter your name to continue")
      return
    }

    setError("")
    setStep("chat")
  }

  const handleSendToWhatsApp = () => {
    if (!name.trim()) return

    // Format the message to include user information and their inquiry
    const userMessages = fallbackMessages
      .filter((msg) => msg.sender === "user")
      .map((msg) => msg.text)
      .join("\n- ")

    const formattedMessage = encodeURIComponent(
      `Hello, my name is ${name}.\n` +
        `Email: ${email}\n` +
        `Phone: ${phone}\n\n` +
        `My inquiry:\n- ${userMessages || "I'm interested in Marbella Apartments"}`,
    )

    // Create WhatsApp API URL - replace with your actual business number
    const businessPhone = "+18765551234" // Replace with your actual WhatsApp business number
    const whatsappURL = `https://wa.me/${businessPhone}?text=${formattedMessage}`

    // Open WhatsApp in a new tab
    window.open(whatsappURL, "_blank")
  }

  const handleResetUser = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("marbellaUserData")
    }
    setName("")
    setEmail("")
    setPhone("")
    setStep("intro")
    setMessages([])
    setFallbackMessages([
      {
        id: 1,
        text: "Hello! How may we assist you with Marbella Apartments today?",
        sender: "admin",
        timestamp: Date.now(),
      },
    ])
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
                  <h3 className="font-serif">Marbella Concierge</h3>
                </div>
                <div className="flex items-center">
                  {step !== "intro" && (
                    <button
                      onClick={handleResetUser}
                      className="hover:bg-dark-blue-light rounded-full p-1 transition-colors mr-2"
                      title="Reset user data"
                    >
                      <LogOut size={16} />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="hover:bg-dark-blue-light rounded-full p-1 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              {step !== "intro" && (
                <div className="flex items-center mt-2 text-xs text-gold/80">
                  <UserCircle size={14} className="mr-1" />
                  <span>Chatting as {name}</span>
                </div>
              )}
              {step === "intro" && <p className="text-sm mt-1 text-gold/80">Our team is here to assist you</p>}
            </div>

            {step === "loading" && (
              <div className="p-4 bg-gray-50 h-60 flex items-center justify-center">
                <Loader2 size={24} className="animate-spin text-gold" />
              </div>
            )}

            {step === "intro" && (
              <div className="p-4 bg-gray-50">
                <h4 className="font-serif text-lg mb-3">Welcome to Marbella</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Please provide your details to start chatting with our concierge team.
                </p>
                <div className="space-y-3">
                  <div>
                    <label htmlFor="chat-name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="chat-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="chat-email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (optional)
                    </label>
                    <input
                      type="email"
                      id="chat-email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                    />
                  </div>
                  <div>
                    <label htmlFor="chat-phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone (optional)
                    </label>
                    <input
                      type="tel"
                      id="chat-phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/50"
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs">{error}</p>}
                  <button
                    onClick={handleStartChat}
                    className="w-full bg-gold hover:bg-gold/90 text-dark-blue py-2 rounded flex items-center justify-center mt-2"
                  >
                    Start Chat
                  </button>
                </div>
              </div>
            )}

            {(step === "chat" || step === "fallback") && (
              <>
                <div ref={chatRef} className="p-4 bg-gray-50 h-60 overflow-y-auto">
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 size={24} className="animate-spin text-gold" />
                    </div>
                  ) : (
                    <>
                      {step === "chat" &&
                        messages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`p-3 rounded-lg max-w-[80%] ${
                                msg.sender === "user"
                                  ? "bg-gold/90 text-gray-700 ml-auto"
                                  : "bg-white shadow-sm border-l-2 border-gold"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}

                      {step === "fallback" &&
                        fallbackMessages.map((msg) => (
                          <div
                            key={msg.id}
                            className={`mb-3 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div
                              className={`p-3 rounded-lg max-w-[80%] ${
                                msg.sender === "user"
                                  ? "bg-gold/90 text-gray-700 ml-auto"
                                  : "bg-white shadow-sm border-l-2 border-gold"
                              }`}
                            >
                              <p className="text-sm">{msg.text}</p>
                              <p className="text-xs mt-1 opacity-70">
                                {new Date(msg.timestamp).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </div>
                          </div>
                        ))}
                      <div ref={messagesEndRef} />
                    </>
                  )}
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

                {step === "fallback" && (
                  <div className="p-3 bg-gray-50 border-t border-gray-200">
                    <button
                      onClick={handleSendToWhatsApp}
                      className="w-full bg-[#25D366] hover:bg-[#20BD5C] text-white py-2 rounded flex items-center justify-center"
                    >
                      <Send size={16} className="mr-2" />
                      Continue on WhatsApp
                    </button>
                  </div>
                )}
              </>
            )}
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
