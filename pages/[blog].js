import React from "react";
import Image from "next/image";
import Container from "../components/common/Container";
import Navbar from "../components/container/navbar/Navbar";
import Slider from "../components/container/banner/Slider";
import Footer from "../components/container/footer/Footer";
import MarkdownIt from "markdown-it";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Head from "next/head";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "../lib/myFun";

export default function Blog({
  categories,
  myblog,
  imagePath,
  project_id,
  about_me,
  domain,
  logo,
  meta,
  favicon,
  blog_list,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

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

      <Container className="mt-20 px-5 lg:max-w-3xl ">
        <div className="flex flex-col gap-6 py-10  justify-center items-center">
          <div className="flex flex-col gap-6  text-left  md:text-center py-10">
            <h1 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
              {myblog?.value?.title}
            </h1>
            <p className="font-ivyMedium  text-[40px] text-black leading-10 font-thin ">
              Celebrity Style Steals: Get the Look for Less
            </p>
            <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
              {myblog?.value?.date}
            </div>
          </div>
          <Image
            title={myblog?.value?.title}
            src={`${imagePath}/${myblog?.file_name}`}
            height={1300}
            width={1300}
            alt="#"
            quality={100}
            className="  max-w-3xl max-h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6 py-10 ">
            {" "}
            <div
              className="text-black prose"
              dangerouslySetInnerHTML={{ __html: content }}
            />
        </div>
        <div className="flex items-center gap-7">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="text-md font-ivyMedium font-thin capitalize">
            You might also like
          </span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>
        <Slider className="" blog_list={blog_list} imagePath={imagePath} />
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

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category, blog } = query;

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) => sanitizeUrl(item.title) === sanitizeUrl(blog)
  );

  if ( !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const meta = await callBackendApi({ domain, type: "meta_singleblog" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const blog_type = await callBackendApi({ domain, type: "blog_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
      blog_type: blog_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
      meta: meta?.data[0]?.value || {},
      project_id,
    },
  };
}
