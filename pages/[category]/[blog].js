import React from 'react'
import Image from 'next/image'
import image from "../../public/images/category3.webp"
import Container from '../../components/common/Container'
import Navbar from '../../components/container/navbar/Navbar'
import Slider from '../../components/container/banner/Slider'
import Footer from '../../components/container/footer/Footer'
import {
    callBackendApi,
    getDomain,
    getImagePath,
    robotsTxt,
    sanitizeUrl,
  } from "../../lib/myFun";

export default function Blog(
   { contact_details,
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
            <Navbar  logo={logo} categories={categories} />
            <Container className="mt-20 px-5 lg:max-w-[1130px]">
                <div className="flex flex-col gap-6 py-10">
                    <div className="flex flex-col gap-6 text-left  md:text-center py-10">
                        <h2 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                            Life Style
                        </h2>
                        <p className="font-ivyMedium  text-[40px] text-black leading-10 font-thin ">
                            Celebrity Style Steals: Get the Look for Less
                        </p>
                        <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                            February 14, 2025
                        </div>
                    </div>
                    <Image
                        src={image}
                        height={1300}
                        width={1300}
                        alt="#"
                        quality={100}
                        className="h-auto w-auto max-w-full max-h-full object-contain"
                    />

                </div>
                <div className="flex flex-col gap-6 py-10 lg:px-28">
                    <p>
                        Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams “you,” only to discover it’s worth more than your monthly rent? We’ve all been there, sighing at the dream of replicating those luxe looks without breaking the bank. Well, dream no more! Our latest guide, “Celebrity Style Steals: Get the Look for Less,” is here to turn that sigh into a stylish strut.
                    </p>
                </div>
                <div className="flex items-center gap-7">
                    <div className="flex-1 border-t border-gray-100"></div>
                    <span className="text-md font-ivyMedium font-thin capitalize">You might also like</span>
                    <div className="flex-1 border-t border-gray-100"></div>
                </div>
                <Slider className="" />
            </Container>
            <Footer categories={categories} />

        </>
    )
}

export async function getServerSideProps({ req, query }) {
    const domain = getDomain(req?.headers?.host);
    const { category, blog } = query;
  
    const categories = await callBackendApi({ domain, tag: "categories" });
    const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  
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
  
    const myblog = await callBackendApi({ domain, tag: isValidBlog?.key });
    const tag_list = await callBackendApi({ domain, tag: "tag_list" });
    const logo = await callBackendApi({ domain, tag: "logo" });
    const favicon = await callBackendApi({ domain, tag: "favicon" });
    const about_me = await callBackendApi({ domain, tag: "about_me" });
    const contact_details = await callBackendApi({
      domain,
      tag: "contact_details",
    });
    const layout = await callBackendApi({ domain, tag: "layout" });
    const nav_type = await callBackendApi({ domain, tag: "nav_type" });
    const blog_type = await callBackendApi({ domain, tag: "blog_type" });
    const footer_type = await callBackendApi({ domain, tag: "footer_type" });
  
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
        categories: categories?.data[0]?.value || [],
        about_me: about_me.data[0] || null,
        contact_details: contact_details.data[0]?.value || null,
        favicon: favicon?.data[0]?.file_name || null,
        nav_type: nav_type?.data[0]?.value || {},
        blog_type: blog_type?.data[0]?.value || {},
        footer_type: footer_type?.data[0]?.value || {},
        project_id,
      },
    };
  }
  