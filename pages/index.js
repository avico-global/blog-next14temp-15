import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "../components/container/banner/Banner";
import Footer from "@/components/container/footer/Footer";
import Latest from "@/components/container/home/Latest";
import Popular from "@/components/container/home/Popular";
import Mostview from "@/components/container/home/Mostview";
import Travel from "@/components/container/home/Travel";
import FixNavbar from "@/components/container/navbar/FixNavbar";
import { callBackendApi, getDomain } from "@/lib/myFun";

export default function Home({ logo }) {
  console.log(logo);
  return (
    <div>
      <FixNavbar />
      <Navbar logo={logo} />
      <Banner />
      <Latest />
      <Mostview />
      <Popular />
      <Travel />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });

  return {
    props: {
      logo: logo?.data?.[0]?.value || null,
    },
  };
}
