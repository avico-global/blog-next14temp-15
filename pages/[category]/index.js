import React from "react";
import Banner from "@/components/container/banner/Banner2";
import Card from "@/components/container/Card";
import Footer from "@/components/container/footer/Footer";
import Navbar from "@/components/container/navbar/Navbar";
import { useRouter } from "next/router";
import { useEffect } from "react";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
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

  const breadcrumbs = useBreadcrumbs();



  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);
  return (
    <div>
      <Navbar logo={logo} categories={categories} />

      <Banner  />

      <Card />
      <Footer categories={categories} />
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
      logo: logo?.data?.[0]?.value || null,
      banner: banner.data[0] || null,
      categories: categories?.data[0]?.value || [],
    },
  };
}
