import React from "react";
import Image from "next/image";
import Container from "../../components/common/Container";
import Navbar from "../../components/container/navbar/Navbar";
import Slider from "../../components/container/banner/Slider";
import Footer from "../../components/container/footer/Footer";
import MarkdownIt from "markdown-it";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import { useRouter } from "next/router";

export default function Blog({
  logo,
  myblog,
  blog_list,
  imagePath,
  categories,
  domain,
  about_me,
  contact_details,
  favicon,
  tag_list,
  layout,
  nav_type,
  project_id,
  blog_type,
  footer_type,
}) {
  const router = useRouter();
  const { category, blog } = router.query;

  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(
    myblog?.value?.articleContent?.replaceAll(
      `https://api.sitebuilderz.com/images/project_images/${project_id}/`,
      imagePath
    ) || ""
  );

  return (
    <>
      <Navbar
        className="text-primary"
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        logo={logo}
      />
      <Container className="mt-20 px-5 lg:max-w-[1130px]">
        <div className="flex flex-col gap-6 py-10">
          <div className="flex flex-col gap-6 text-left  md:text-center py-10">
            <h2 className="text-[19px] text-gray-900 uppercase leading-[25px]  font-thin font-hanken ">
              {myblog?.value?.article_category}
            </h2>
            <p className="font-ivyMedium  text-[40px] text-black leading-10 font-thin ">
              {myblog?.value?.title}
            </p>
            <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
              {myblog?.value?.published_at}
            </div>
          </div>
          <Image
            src={`${imagePath}/${myblog?.file_name}`}
            title={myblog?.value?.title || "Blog Image"}
            height={1300}
            width={1300}
            alt="#"
            quality={100}
            className="h-auto w-auto max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex flex-col gap-6 py-10 lg:px-28">
          <article className="prose lg:prose-xl max-w-full">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </div>
        <div className="flex items-center gap-7">
          <div className="flex-1 border-t border-gray-100"></div>
          <span className="text-md font-ivyMedium font-thin capitalize">
            You might also like
          </span>
          <div className="flex-1 border-t border-gray-100"></div>
        </div>
        <Slider blogs={blog_list} imagePath={imagePath} />
      </Container>
      <Footer
        logo={logo}
        imagePath={imagePath}
        about_me={about_me}
        categories={categories}
        blogs={blog_list}
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

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) => sanitizeUrl(cat?.title) === sanitizeUrl(category)
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
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
      project_id,
    },
  };
}
