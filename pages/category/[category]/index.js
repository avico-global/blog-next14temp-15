import React from "react";
import Banner from "@/components/container/banner/Banner2";
import Card from "@/components/container/Card";
import Footer from "@/components/container/footer/Footer";
import Navbar from "@/components/container/navbar/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Head from "next/head";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "../../../lib/myFun";
export default function index({
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
  const router = useRouter();
  const { category } = router.query;

  const filteredBlogs =
    blog_list?.filter((item) => {
      const searchContent = sanitizeUrl(category);
      return sanitizeUrl(item.article_category) === searchContent;
    }) || [];

  return (
    <>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/category/${category}`} />
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
        text={"text-white"}
        logo={logo}
        categories={categories}
        blog_list={blog_list}
        imagePath={imagePath}
      />
      <Banner imagePath={imagePath} categories={categories} />
      <Container className="px-5 lg:px-20 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((data, index) => (
              <Link
                title={data.title}
                key={index}
                href={`/${sanitizeUrl(
                  data.title
                )}`}
                className=""
              >
                <Image
                title={data.title}
                alt={data.title}
                  height={1000}
                  width={1000}
                  src={`${imagePath}/${data.image}`}
                  className="aspect-[4/5] object-cover"
                />
                <div className=" lg:px-12 py-8 flex flex-col gap-2 ">
                  <h4 className="font-ivyMedium text-primary/75 capitalize ">
                    {category}
                  </h4>
                  <h2 className="font-ivyMedium text-3xl leading-8">
                    {data.title}
                  </h2>
                  <h4 className="font-hanken  text-primary/75 capitalize ">
                    {data.date}
                  </h4>
                  <h3 className="font-hanken text-black/85">
                    {data.discreption}
                  </h3>
                  <div
                    href={`/${sanitizeUrl(data.article_category)}/${sanitizeUrl(
                      data.title
                    )}`}
                    className="font-ivy  text-2xl border-b-2 w-fit hover:text-text text-primary/75 capitalize "
                  >
                    Read More
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center text-primary text-2xl font-hanken">
              No blogs found
            </div>
          )}
        </div>
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
  const { category } = query;

  const logo = await callBackendApi({
    domain,
    query,
    type: "logo",
  });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const banner = await callBackendApi({ domain, query, type: "banner" });
  const footer_text = await callBackendApi({
    domain,
    query,
    type: "footer_text",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const footer_type = await callBackendApi({ domain, type: "footer_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) =>
      cat?.title?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists) {
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
      logo: logo?.data[0],
      layout: layout?.data[0]?.value || null,
      banner: banner.data[0] || null,
      blog_list: blog_list.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      footer_text: footer_text?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      domain: domain === "hellospace.us" ? req?.headers?.host : domain,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      footer_type: footer_type?.data[0]?.value || {},
    },
  };
}
