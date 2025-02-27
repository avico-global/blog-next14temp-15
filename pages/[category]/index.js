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
import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "../../lib/myFun";
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
    <div>
      <Navbar logo={logo} categories={categories} blog_list={blog_list} imagePath={imagePath} />
      <Banner imagePath={imagePath} categories={categories} />
      <Container className="px-5 lg:px-20 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
        {filteredBlogs.length>0?( 
          filteredBlogs.map((data, index) => (
            <div key={index} className="">
              <Image
                height={1000}
                width={1000}
                src={`${imagePath}/${data.image}`}
                className="aspect-[4/5] object-cover"
              />
              <div className=" lg:px-12 py-8 flex flex-col gap-2 ">
                <h4 className="font-ivyMedium text-primary/75 capitalize ">{category}</h4>
                <h2 className="font-ivyMedium text-3xl leading-8">{data.title}</h2>
                <h4 className="font-hanken  text-primary/75 capitalize ">{data.date}</h4>
                <h3 className="font-hanken text-black/85">{data.discreption}</h3>
                <Link href={`/${sanitizeUrl(data.article_category)}/${sanitizeUrl(data.title)}`} className="font-ivy  text-2xl border-b-2 w-fit hover:text-text text-primary/75 capitalize ">
                  Read More
                </Link>
              </div>
            </div>
          ))
        ):(
          <div className="text-center text-primary text-2xl font-hanken">
            No blogs found
          </div>
        )}
        </div>
      </Container>
      <Footer categories={categories} logo={logo} />
    </div>
  );
}



export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  let layoutPages = await callBackendApi({ domain, tag: "layout", });

  const logo = await callBackendApi({ domain, tag: "logo" });


  const favicon = await callBackendApi({ domain, tag: "favicon" });
  const banner = await callBackendApi({ domain, tag: "banner" });
  const footer_text = await callBackendApi({ domain, tag: "footer_text" });
  const contact_details = await callBackendApi({ domain, tag: "contact_details", });
  const copyright = await callBackendApi({ domain, tag: "copyright", });
  const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  const categories = await callBackendApi({ domain, tag: "categories" });
  const meta = await callBackendApi({ domain, tag: "meta_category" });
  const about_me = await callBackendApi({ domain, tag: "about_me" });
  const tag_list = await callBackendApi({ domain, tag: "tag_list" });
  const nav_type = await callBackendApi({ domain, tag: "nav_type" });
  const footer_type = await callBackendApi({ domain, tag: "footer_type" });


  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {

    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "category");
  }
  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  const imagePath = await getImagePath(project_id, domain);

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
      blog_list: blog_list?.data[0]?.value || [],
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data?.[0]?.value || null,
      banner: banner.data[0] || null,
      categories: categories?.data[0]?.value || [],
    },
  };
}
