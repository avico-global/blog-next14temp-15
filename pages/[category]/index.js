import React from "react";
import Footer from "@/components/container/footer/Footer";
import Navbar from "@/components/container/navbar/Navbar";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import CategoryBanner from "@/components/container/banner/CategoryBanner";
import Container from "@/components/common/Container";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Categories({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  contact_details,
  favicon,
  layout,
  nav_type,
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
      <Navbar
        categories={categories}
        imagePath={imagePath}
        logo={logo}
        blog_list={blog_list}
      />

      <CategoryBanner imagePath={imagePath} categories={categories} />

      <Container className="px-5 lg:px-20 py-32">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((data, index) => (
              <div key={index} className="">
                <Link
                  title={data?.title || "Article Link"}
                  href={`/${sanitizeUrl(data.article_category)}/${sanitizeUrl(
                    data?.title
                  )}`}
                >
                  <Image
                    height={1000}
                    width={1000}
                    src={`${imagePath}/${data.image}`}
                    title={data.title || "Article Image"}
                    alt={data.title}
                    className="aspect-[4/5] object-cover  "
                  />
                </Link>

                <div className="  py-8 flex flex-col gap-2 ">
                  <h4 className="font-ivyMedium text-primary/75 capitalize ">
                    {data.article_category}
                  </h4>
                  <Link
                    title={data?.title || "Article Link"}
                    href={`/${sanitizeUrl(data.article_category)}/${sanitizeUrl(
                      data?.title
                    )}`}
                  >
                    <h2 className="font-ivyMedium text-3xl leading-8">
                      {data.title}
                    </h2>
                    <h4 className="font-hanken  text-primary/75 capitalize ">
                      {data.published_at}
                    </h4>
                    <h3 className="font-hanken text-black/85">
                      {data.tagline}
                    </h3>
                  </Link>
                  <Link
                    href={`/${sanitizeUrl(data.article_category)}/${sanitizeUrl(
                      data.title
                    )}`}
                    className="font-ivy  text-2xl border-b-2 w-fit hover:text-text text-primary/75 capitalize "
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              No articles found in {category?.replaceAll("-", " ")}
            </div>
          )}
        </div>
      </Container>
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
