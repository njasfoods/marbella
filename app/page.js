"use client";

// Import enhanced components with images
import EnhancedHeroSlider from "../components/enhanced-hero-slider";
import EnhancedAboutSection from "../components/enhanced-about-section";
import EnhancedAmenitiesSection from "../components/enhanced-amenities-section";
import EnhancedResidencesSection from "../components/enhanced-residences-section";
import EnhancedFloorPlansSection from "../components/enhanced-floor-plans-section";
import EnhancedGallerySection from "../components/enhanced-gallery-section";
import ContactSection from "./contact-section";
import ProximitySection from "./proximity-section";
import Navbar from "./navbar";
import Footer from "./footer";
import ChatWidget from "@/components/chat-widget";

// Main component export
function HomePage() {
  return (
    <main className="bg-white text-gray-900 font-sans">
      <Navbar />
      <EnhancedHeroSlider />
      <EnhancedAboutSection />
      <ProximitySection />
      <EnhancedAmenitiesSection />
      <EnhancedResidencesSection />
      <EnhancedFloorPlansSection />
      <EnhancedGallerySection />
      <ContactSection />
      <Footer />
      {/* <ChatWidget /> */}
    </main>
  );
}

export default HomePage;
