import React from "react";
import Banner from "@/components/container/banner/Banner2";
import Card from "@/components/container/Card";
import Footer from "@/components/container/footer/Footer";
import Navbar from "@/components/container/navbar/Navbar";
import FixNavbar from "@/components/container/navbar/FixNavbar";
export default function index() {
  return (
    <div>
      <FixNavbar />
      <Navbar />

      <Banner />
      
      <Card />
      <Footer />
    </div>
  );
}
