import React from 'react'
import Navbar from '@/components/container/navbar/Navbar'
import Container from '@/components/common/Container'
import Footer from '@/components/container/footer/Footer'
import Form from '@/components/container/Form'
import {getDomain, callBackendApi, getImagePath} from '../lib/myFun'
export default function contact( {
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
    return (
        <div>
            <Navbar logo={logo} categories={categories} blog_list={blog_list} imagePath={imagePath} />
            <Container className='pt-40 pb-20 px-5 lg:max-w-[830px]'>
                <div className='flex flex-col items-center justify-center'>
                    <h2 className='text-hanken text-7xl font-ivyMedium'>
                        {logo?.logoText}
                    </h2>
                    <p className='pt-16 font-hanken text-lg'>Interested in working together? I can’t wait to hear from you. Use the form below or email directly via mgmt@lilletblanc.com You can provide more information here, like what will happen next or additional routes of communication or just delete this text.</p>
                </div>
            </Container>
            <Container className='pb-40 px-5 lg:max-w-[730px]'>
                <Form />
            </Container>
            <Footer categories={categories} logo={logo} blog_list={blog_list} imagePath={imagePath} />

        </div>
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
    const banner = await callBackendApi({ domain, tag: "banner" });
    const blog_list = await callBackendApi({ domain, tag: "blog_list" });
  
    return {
      props: {
        logo: logo?.data?.[0]?.value || null,
        meta: meta?.data[0]?.value || null,
        domain,
        imagePath,
        categories: categories?.data[0]?.value || [],
        favicon: favicon?.data?.[0]?.value || null,
        banner: banner?.data[0] || null,
        blog_list: blog_list?.data[0]?.value || [],
      },
    };
  }
  