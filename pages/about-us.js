import React from "react";
import Navbar from "@/components/container/navbar/Navbar";
import Footer from "@/components/container/footer/Footer";
import MarkdownIt from "markdown-it";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import Image from "next/image";
import Container from "@/components/common/Container";
import Fullcontainer from "@/components/common/Fullcontainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Head from "next/head";

export default function About({
  logo,
  blog_list,
  imagePath,
  about_me,
  categories,
  domain,
  meta,
}) {

  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me?.value || "");
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}/about-us`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
      </Head>
      <Navbar
        className="text-primary"
        categories={categories}
        imagePath={imagePath}
        blog_list={blog_list}
        logo={logo}
      />

      <Fullcontainer>
        <Container>
          <div className="py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Section */}
              <div className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-300 to-purple-200 rounded-lg blur opacity-20 group-hover:opacity-30 transition duration-300"></div>
                <Image
                  src={`${imagePath}/${about_me.file_name}`}
                  title={about_me.title || "About Us"}
                  height={1000}
                  width={1000}
                  alt={about_me.title || "About Us"}
                  className="relative rounded-lg shadow-xl object-cover w-full h-[500px] transform group-hover:scale-[1.01] transition duration-300"
                />
              </div>

              {/* Text Section */}
              <div className="text-left space-y-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
                  {about_me.title || "About Us"}
                </h1>
                <div className="w-20 h-1 bg-gradient-to-r from-blue-300 to-purple-200 rounded-full"></div>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  Discover our story and what makes us unique. We're passionate
                  about creating meaningful experiences and delivering
                  exceptional value to our clients.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Fullcontainer>

      <Fullcontainer>
        <Container className=" text-center justify-center items-center   ">
          <article className="prose lg:prose-xl text-gray-800 font-hanken">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </Container>
      </Fullcontainer>
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

  const meta = await callBackendApi({ domain, type: "meta_about" });
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
