"use server"

import nodemailer from "nodemailer"

export async function submitContactForm(data) {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  })

  // Format the message
  const unitTypeMap = {
    studio: "Studio Residence",
    oneBedroom: "One Bedroom Residence",
  }

  const formattedUnitType = unitTypeMap[data.unitType] || data.unitType

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "firmciti@gmail.com",
    subject: "New Contact Request from Marbella Apartments Website",
    html: `
      <h1>New Contact Request</h1>
      <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Residence of Interest:</strong> ${formattedUnitType}</p>
      <p><strong>Message:</strong> ${data.message || "No message provided"}</p>
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
    `,
  }

  try {
    // Send email
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    throw new Error("Failed to send email notification")
  }
}
