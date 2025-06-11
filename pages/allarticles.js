import React from "react";
import Image from "next/image";
import Container from "../components/common/Container";
import Navbar from "../components/container/navbar/Navbar";
import Footer from "../components/container/footer/Footer";
import Rightbar from "@/components/container/banner/blog/Rightbar";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Head from "next/head";
import { callBackendApi, getImagePath ,sanitizeUrl,getDomain } from "@/lib/myFun";

import Link from "next/link";

export default function allarticles({
  logo,
  blog_list,
  imagePath,
  about_me,
  categories,
  domain,
  meta,
  favicon,
}) {
 
  return (
    <>
     <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/allarticles`} />
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
        className="text-primary"
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        logo={logo}
      />
      <Container className="mt-20 py-10 px-5 md:px-15 lg:px-24">
        <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20">
          {/* Left Content */}
          <div className="col-span-2">
            {/* content */}
            <div className="flex flex-col gap-6 py-10 text-left md:text-center">
              <h1 className=" text-2xl font-ivyMedium font-medium w-full text-center capitalize">
                THE BLOG
              </h1>
              <p className="font-ivyMedium  text-[40px] text-primary md:px-5 leading-10 font-thin ">
                Welcome to my vibrant world of fashion, style, and sustainable
                living!
              </p>
              <div className="text-[19px] leading-[22px] md:px-20 font-thin font-hanken">
                I'm Emily Bouquet, your guide and companion on this journey
                through the ever-evolving landscape of trends, timeless
                elegance, and eco-conscious choices.
              </div>
            </div>

            {blog_list?.map((item, index) => (
              <div key={index} className="flex flex-col gap-6 py-10">
                <Link
                className="w-full " 
                title={item.title}
                  key={index}
                  href={`/${sanitizeUrl(
                    item?.title
                  )}`}
                >
                  <Image
                    src={
                      item.image
                        ? `${imagePath}/${item.image}`
                        : "/no-image.png"
                    }
                    title={item.title}
                    height={1900}
                    priority
                    width={1900}
                    alt="#"
                    quality={100}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-col gap-6 py-10">
                  <Link
                    key={index}
                    href={`/${sanitizeUrl(
                      item?.title
                    )}`}
                    title={item.title}
                  >
                    <h2 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                      {item.category}
                    </h2>
                    <p className="font-ivyMedium  text-[30px] md:text-[40px] text-black leading-10 font-thin ">
                      {item.title}
                    </p>
                    <p className=" text-[15px] md:text-[20px]  leading-5 pt-3   ">
                      {item.tagline}
                    </p>
                  </Link>

                  <div className=" flex justify-between">
                    <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                      {item.published_at}
                    </div>

                    <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                      {item.author}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar (Sticky) */}
          <div className="col-span-1 h-full">
            <div className="sticky top-20">
              <Rightbar
                about_me={about_me}
                imagePath={imagePath}
                categories={categories}
                blog_list={blog_list}
              />
            </div>
          </div>
        </div>
      </Container>
      <Footer about_me={about_me} logo={logo} categories={categories} blog_list={blog_list} imagePath={imagePath}/>
    
    </>
  );
}

export async function getServerSideProps({ req }) {
    const domain = getDomain(req?.headers?.host);
  
    let layoutPages = await callBackendApi({
      domain,
      type: "layout",
    });
  
    const meta = await callBackendApi({ domain, type: "meta_blog" });
    const logo = await callBackendApi({ domain, type: "logo" });
    const favicon = await callBackendApi({ domain, type: "favicon" });
    const blog_list = await callBackendApi({ domain, type: "blog_list" });
    const categories = await callBackendApi({ domain, type: "categories" });
  
      const project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const all_data = await callBackendApi({ domain, type: "" });
  const imagePath = getImagePath(project_id, domain);
  
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
