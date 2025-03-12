import React from "react";
import Navbar from "@/components/container/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/container/footer/Footer";
import Form from "@/components/container/Form";
import { getDomain, callBackendApi, getImagePath } from "../lib/myFun";
import Head from "next/head";
import GoogleTagManager from "@/lib/GoogleTagManager";
export default function contact({
  contact_details,
  categories,
  imagePath,
  about_me,
  domain,
  logo,
  meta,
  page,
  favicon,
  tag_list,
  nav_type,
  blog_list,
  footer_type,
}) {
  return (
    <>
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
          title={meta?.title}
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          title={meta?.title}
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          title={meta?.title}
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
      </Head>
      <Navbar
        logo={logo}
        categories={categories}
        blog_list={blog_list}
        imagePath={imagePath}
      />
      <Container className="pt-40 pb-20 px-5 lg:max-w-[830px]">
        <h1 className="text-center text-primary text-4xl font-ivyMedium">
          Contact Us
        </h1>
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-hanken text-7xl font-ivyMedium">
            {logo?.logoText}
          </h2>
          <p className="pt-16 font-hanken text-lg">
            Interested in working together? I can’t wait to hear from you. Use
            the form below or email directly via mgmt@lilletblanc.com You can
            provide more information here, like what will happen next or
            additional routes of communication or just delete this text.
          </p>
        </div>
      </Container>
      <Container className="pb-40 px-5 lg:max-w-[730px]">
        <Form />
      </Container>
      <Footer
      about_me={about_me}
        categories={categories}
        logo={logo}
        blog_list={blog_list}
        imagePath={imagePath}
      />
    </>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_contact" });
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
