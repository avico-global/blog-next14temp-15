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
  about_me,
}) {
  console.log("Logo", logo);
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}`} />
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
      <Navbar
        logo={logo}
        text={"text-white"}
        categories={categories}
        blog_list={blog_list}
        imagePath={imagePath}
      />
      <Banner
        data={banner?.value}
        image={`${imagePath}/${banner?.file_name}`}
      />
      <Latest blog_list={blog_list} imagePath={imagePath} />
      <Mostview blog_list={blog_list} imagePath={imagePath} />
      <Popular blog_list={blog_list} imagePath={imagePath} />
      <Travel blog_list={blog_list} imagePath={imagePath} />
      <Footer
        about_me={about_me}
        logo={logo}
        categories={categories}
        blog_list={blog_list}
        imagePath={imagePath}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  try {
    const domain = getDomain(req?.headers?.host);
    if (!domain) {
      return {
        notFound: true,
      };
    }

    // Fetch all required data
    const [layoutPages, meta, logo, favicon, blog_list, categories, about_me, banner] = await Promise.all([
      callBackendApi({ domain, type: "layout" }),
      callBackendApi({ domain, type: "meta_home" }),
      callBackendApi({ domain, type: "logo" }),
      callBackendApi({ domain, type: "favicon" }),
      callBackendApi({ domain, type: "blog_list" }),
      callBackendApi({ domain, type: "categories" }),
      callBackendApi({ domain, type: "about_me" }),
      callBackendApi({ domain, type: "banner" })
    ]).catch(error => {
      console.error('Error fetching data:', error);
      return [null, null, null, null, null, null, null, null];
    });

    // Validate required data
    if (!layoutPages?.data || !meta?.data || !logo?.data) {
      console.error('Missing required data');
      return {
        notFound: true,
      };
    }

    const project_id = logo?.data[0]?.project_id || null;
    const imagePath = await getImagePath(project_id, domain).catch(error => {
      console.error('Error getting image path:', error);
      return null;
    });

    if (!imagePath) {
      return {
        notFound: true,
      };
    }

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
        about_me: about_me?.data[0] || null,
        banner: banner?.data[0] || null,
        page,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      notFound: true,
    };
  }
}
