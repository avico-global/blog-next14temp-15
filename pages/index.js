import Navbar from "@/components/container/navbar/Navbar";
import Banner from "../components/container/banner/Banner";
import Footer from "@/components/container/footer/Footer";
import Latest from "@/components/container/home/Latest";
import Popular from "@/components/container/home/Popular";
import Mostview from "@/components/container/home/Mostview";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import Travel from "@/components/container/home/Travel";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";



export default function Home({
  logo,
  meta,
  domain,
  imagePath,
  favicon,
  categories,
  banner,
  blog_list,
}) {

   console.log("blog_list in index", blog_list)
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>
      <Navbar logo={logo} categories={categories} blog_list={blog_list} imagePath={imagePath} />
      <Banner data={banner?.value} image={`${imagePath}/${banner?.file_name}`} />
      <Latest blog_list={blog_list} imagePath={imagePath} />
      <Mostview blog_list={blog_list} imagePath={imagePath} />
      <Popular blog_list={blog_list} imagePath={imagePath} />
      <Travel blog_list={blog_list} imagePath={imagePath} />  
      <Footer logo={logo} categories={categories} />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, tag: "logo" });
  const project_id = logo?.data[0]?.project_id || null;

  let layoutPages = await callBackendApi({
    domain,
    tag: "layout",
  });

  const meta = await callBackendApi({ domain, tag: "meta_home" });
  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const imagePath = await getImagePath(project_id, domain);
  const categories = await callBackendApi({ domain, tag: "categories" });
  const banner = await callBackendApi({ domain, tag: "banner" });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });

  return {
    props: {
      logo: logo?.data?.[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      domain,
      imagePath,
      categories: categories?.data[0]?.value || [],
      favicon: favicon?.data?.[0]?.value || null,
      banner: banner?.data[0] || null,
      blog_list: blog_list?.data[0]?.value || [],
    },
  };
}
