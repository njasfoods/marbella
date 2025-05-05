"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, MessageCircle, Loader2 } from "lucide-react";
import {
  ref,
  push,
  onValue,
  query,
  orderByChild,
  limitToLast,
} from "firebase/database";
import { rtdb, auth } from "../lib/firebase";
import { signInAnonymously } from "firebase/auth";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("intro"); // intro, chat
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const chatRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Initialize chat and listen for messages
  useEffect(() => {
    if (step === "chat") {
      setLoading(true);

      // Sign in anonymously
      signInAnonymously(auth)
        .then((userCredential) => {
          const userId = userCredential.user.uid;

          // Create a reference to this user's chat
          const chatRef = ref(rtdb, `chats/${userId}`);

          // Listen for new messages
          const messagesQuery = query(
            ref(rtdb, `chats/${userId}/messages`),
            orderByChild("timestamp"),
            limitToLast(50)
          );

          const unsubscribe = onValue(messagesQuery, (snapshot) => {
            const messagesData = snapshot.val();
            if (messagesData) {
              const messagesList = Object.entries(messagesData).map(
                ([key, value]) => ({
                  id: key,
                  ...value,
                })
              );
              setMessages(messagesList);
            }
            setLoading(false);
          });

          // Add welcome message if no messages exist
          push(ref(rtdb, `chats/${userId}/messages`), {
            text: `Hello ${name}! How may we assist you with Marbella Apartments today?`,
            sender: "admin",
            timestamp: Date.now(),
          });

          // Add user info
          push(ref(rtdb, `chats/${userId}/info`), {
            name,
            email,
            joinedAt: Date.now(),
          });

          return () => unsubscribe();
        })
        .catch((error) => {
          console.error("Error signing in anonymously:", error);
          setError("Unable to connect to chat. Please try again later.");
          setLoading(false);
        });
    }
  }, [step, name, email]);

  const handleSendMessage = () => {
    console.log("fired");
    if (!message.trim()) return;

    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError("Chat connection lost. Please refresh the page.");
      return;
    }

    // Add message to Firebase
    push(ref(rtdb, `chats/${userId}/messages`), {
      text: message,
      sender: "user",
      timestamp: Date.now(),
    });

    setMessage("");
  };

  const handleStartChat = () => {
    if (!name.trim()) {
      setError("Please enter your name to continue");
      return;
    }

    setError("");
    setStep("chat");
  };

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
                <button
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-dark-blue-light rounded-full p-1 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              <p className="text-sm mt-1 text-gold/80">
                Our team is here to assist you
              </p>
            </div>

            {step === "intro" && (
              <div className="p-4 bg-gray-50">
                <h4 className="font-serif text-lg mb-3">Welcome to Marbella</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Please provide your details to start chatting with our
                  concierge team.
                </p>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="chat-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
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
                    <label
                      htmlFor="chat-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
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

            {step === "chat" && (
              <>
                <div
                  ref={chatRef}
                  className="p-4 bg-gray-50 h-60 overflow-y-auto"
                >
                  {loading ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 size={24} className="animate-spin text-gold" />
                    </div>
                  ) : (
                    <>
                      {messages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`mb-3 flex ${
                            msg.sender === "user"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-[80%] ${
                              msg.sender === "user"
                                ? "bg-gold/90 text-white ml-auto"
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
  );
}
