import React from 'react'
import Rightbar from '@/components/container/banner/blog/Rightbar'
import Image from 'next/image'
import image from "../public/images/category3.webp"
import image2 from "../public/images/codesupply3.3.webp"
import image3 from "../public/images/category1.webp"
import Container from '../components/common/Container'
import Navbar from '../components/container/navbar/Navbar'
import Footer from '../components/container/footer/Footer'

import Link from 'next/link'
import { callBackendApi, getDomain, getImagePath ,sanitizeUrl} from "@/lib/myFun";
export default function Blog({
    logo,
    meta,
    domain,
    imagePath,
    favicon,
    categories,
    banner,
    blog_list,
    about_me,
  }) {
    const blog = blog_list || [];

    return (
        <>
            <Navbar logo={logo} categories={categories} blog_list={blog_list} imagePath={imagePath}/>
            <Container className="mt-20 py-10 px-5 md:px-15 lg:px-24">
                <div className="relative w-full grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-20 ">
                    {/* Left Content */}
                    <div className="col-span-2">
                        {/* content */}
                        <div className="flex flex-col gap-6 py-10 text-left md:text-center">

                            <h2 className=" text-2xl font-ivyMedium font-medium w-full text-center capitalize">
                                THE BLOG
                            </h2>
                            <p className="font-ivyMedium  text-[40px] text-primary md:px-5 leading-10 font-thin ">
                                Welcome to my vibrant world of fashion, style, and sustainable living!
                            </p>
                            <div className="text-[19px] leading-[22px] md:px-20 font-thin font-hanken">
                                I'm Emily Bouquet, your guide and companion on this journey through the ever-evolving landscape of trends, timeless elegance, and eco-conscious choices.
                            </div>

                        </div>

                        {blog.map((item, index) => (
                            <Link href={`/${sanitizeUrl(item?.article_category)}/${sanitizeUrl(item?.title)}`} key={index} className="flex flex-col gap-6 py-10">
                                <Image
                                    src={`${imagePath}/${item.image}`}
                                    height={1300}
                                    width={1300}
                                    alt="#"
                                    quality={100}
                                    className="h-auto w-auto max-w-full max-h-full object-contain"
                                />
                                <div className="flex flex-col gap-6 py-10 border-b border-gray-200">
                                    <h2 className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                                        {item.article_category}
                                    </h2>
                                    <p className="font-ivyMedium text-[30px]  md:text-[40px] text-black leading-10 font-thin ">
                                        {item.title} 
                                    </p>
                                    <div className="text-[19px] text-gray-900 leading-[25px]  font-thin font-hanken ">
                                        {item.published_at}
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>

                    {/* Right Sidebar (Sticky) */}
                    <div className="col-span-1 h-full ">
                        <div className="sticky top-20 ">
                            <Rightbar aboutMe={about_me} imagePath={imagePath} categories={categories} />
                        </div>
                    </div>
                </div>
            </Container >
            <Footer categories={categories} />
        </>
    )
}

export async function getServerSideProps({ req }) {
    const domain = getDomain(req?.headers?.host);
    const logo = await callBackendApi({ domain, tag: "logo" });
    const project_id = logo?.data[0]?.project_id || null;
  
    let layoutPages = await callBackendApi({
      domain,
      tag: "layout",
    });
  
    const meta = await callBackendApi({ domain, tag: "meta_home" });
    const favicon = await callBackendApi({ domain, tag: "favicon" });
    const imagePath = await getImagePath(project_id, domain);
    const categories = await callBackendApi({ domain, tag: "categories" });
    const about_me = await callBackendApi({ domain, tag: "about_me" });
    const banner = await callBackendApi({ domain, tag: "banner" });
    const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  
    return {
      props: {
        logo: logo?.data?.[0]?.value || null,
        meta: meta?.data[0]?.value || null,
        domain,
        imagePath,
        about_me: about_me?.data[0]?.value || null,
        categories: categories?.data[0]?.value || [],
        favicon: favicon?.data?.[0]?.value || null,
        banner: banner?.data[0] || null,
        blog_list: blog_list?.data[0]?.value || [],
      },
    };
  }
