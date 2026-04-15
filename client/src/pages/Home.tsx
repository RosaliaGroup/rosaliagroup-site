/*
 * ROSALIA GROUP — Home Page
 * Design: Urban Warmth / Warm Brutalism
 * Assembles all sections in order
 */

import Navbar from "@/components/Navbar";
import ChatBot from "@/components/ChatBot";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import ServicesSection from "@/components/sections/ServicesSection";
import RentalsSection from "@/components/sections/RentalsSection";
import BuySellSection from "@/components/sections/BuySellSection";
import ManagementSection from "@/components/sections/ManagementSection";
import CTABanner from "@/components/sections/CTABanner";
import AboutSection from "@/components/sections/AboutSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[oklch(0.97_0.015_80)]">
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <RentalsSection />
        <BuySellSection />
        <ManagementSection />
        <CTABanner />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}
