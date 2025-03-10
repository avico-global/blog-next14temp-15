import React from "react";
import Navbar from "@/components/container/navbar/Navbar";
import Container from "@/components/common/Container";
import Footer from "@/components/container/footer/Footer";
import Form from "@/components/container/Form";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

export default function Contact({

  logo,
  blog_list,
  imagePath,
  about_me,
  categories,
  domain,
  meta,
  contact_details,
  banner,
  favicon,
  nav_type,
  footer_type
}
) {

  console.log("Categories", categories )

  return (
    <div>
      <Navbar
        className="text-primary"
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        logo={logo}
      />
      <Container className="pt-40 pb-20 px-5 lg:max-w-[830px]">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-hanken text-7xl font-ivyMedium">INQUIRE</h1>
          <p className="pt-16 font-hanken text-lg">
            Interested in working together? I can’t wait to hear from you. Use
            the form below or email directly. You can provide more information
            here, like what will happen next or additional routes of
            communication or just delete this text.
          </p>
        </div>
      </Container>
      <Container className="pb-40 px-5 lg:max-w-[730px]">
        <Form />
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

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });


  const meta = await callBackendApi({ domain, type: "meta_home" });
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
