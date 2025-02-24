import Image from "next/image";
import React from "react";
import image from "../../public/images/category1.webp";
import image2 from "../../public/images/category2.webp";
import image3 from "../../public/images/category3.webp";
import image4 from "../../public/images/category4.webp";
import image5 from "../../public/images/category5.webp";
import image6 from "../../public/images/category6.webp";
import Container from "../common/Container";
import Link from "next/link"

export default function Card() {

  const data = [
    {
      image: image,
      title: "The Essential Guide to Selecting a Business Coach",
      date:"02/21/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
    {
      image: image2,
      title: "The Power of Leadership Coaching in Business",
      date:"02/22/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
    {
      image: image3,
      title: "Innovative Solutions: Insights from Business Consulting",
      date:"02/23/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
    {
      image: image4,
      title: "Expert Advice: Essential Tips from Business Consultants",
      date: "02/24/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
    {
      image: image5,
      title: "Scaling Your Business: When to Seek Consulting Advice",
      date:"02/25/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
    {
      image: image6,
      title: "Creating a Culture of Success with Effective Coaching",
      date:"02/26/2024",
      discreption:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you, only to discover it's worth more than your monthly rent? We've all been there, sighing at ...",
    },
  ];
  return (
    <Container className="px-5 lg:px-20 py-32">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14">
        {data.map((data,index) => (
          <div key={index} className="">
            <Image
              height={1000}
              width={1000}
              src={data.image}
              className="aspect-[4/5] object-cover"
            />
            <div className=" lg:px-12 py-8 flex flex-col gap-2 ">
              <h4 className="font-ivyMedium text-primary/75 capitalize ">category</h4>
              <h2 className="font-ivyMedium text-3xl leading-8">{data.title}</h2>
              <h4 className="font-hanken  text-primary/75 capitalize ">{data.date}</h4>
              <h3 className="font-hanken text-black/85">{data.discreption}</h3>
              <Link href={`/${data.category}/${data.title}`}   className="font-ivy  text-2xl border-b-2 w-fit hover:text-text text-primary/75 capitalize ">
              Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
