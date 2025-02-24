import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "../components/container/banner/Banner";
import Footer from "@/components/container/footer/Footer";
import Latest from "@/components/container/home/Latest";
import Popular from "@/components/container/home/Popular";
import Mostview from "@/components/container/home/Mostview";
import Travel from "@/components/container/home/Travel";
import FixNavbar from "@/components/container/navbar/FixNavbar";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div>
      <FixNavbar />
      <Navbar/>
      <Banner />
      <Latest />
      <Mostview />
      <Popular />
      <Travel/>
      <Footer />
    </div>
  );
}
