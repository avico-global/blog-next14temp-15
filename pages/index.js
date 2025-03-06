import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/container/navbar/Navbar";
import Banner from "../components/container/banner/Banner";
import Footer from "@/components/container/footer/Footer";
import Latest from "@/components/container/home/Latest";
import Popular from "@/components/container/home/Popular";
import Mostview from "@/components/container/home/Mostview";
import Travel from "@/components/container/home/Travel";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home({
  categories,
  imagePath,
  about_me,
  banner,
  domain,
  logo,
  meta,
  page,
  favicon,
  blog_list,
}) {

  return (
    <div>
      <Navbar
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        logo={logo}
      />
      <Banner data={banner.value} image={`${imagePath}/${banner?.file_name}`} />
      <Latest blog_list={blog_list} imagePath={imagePath} blogs={blog_list} />
      <Mostview imagePath={imagePath} blog_list={blog_list} />
      <Popular imagePath={imagePath} blog_list={blog_list} />
      <Travel blogs={blog_list} imagePath={imagePath} />
      <Footer
        logo={logo}
        imagePath={imagePath}
        about_me={about_me}
        categories={categories}
        blogs={blog_list}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });

  const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const all_data = await callBackendApi({ domain, type: "" });
  const imagePath = await getImagePath(project_id, domain);

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      all_data,
      page,
    },
  };
}
