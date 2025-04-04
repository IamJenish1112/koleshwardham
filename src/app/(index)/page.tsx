"use client";
import EventCalendar from "@/components/common/calender";
import DonationSection from "@/components/index/home-page/donation-sec";
import EventSection from "@/components/index/home-page/event-slider";
import HomeCarousel from "@/components/index/home-page/home_caraousel";
import LiveDarshan from "@/components/index/home-page/live-darshan";
import SocialActivity from "@/components/index/home-page/social-activity-section";
import WhoWeAre from "@/components/index/home-page/who-we-are";
import React from "react";

function HomePage() {
  return (
    <div>
      <HomeCarousel />
      <WhoWeAre />
      <SocialActivity />
      <LiveDarshan />
      <DonationSection />
    </div>
  );
}

export default HomePage;
