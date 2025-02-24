import React from "react";
import Card2 from "./Card2";
import Container from "@/components/common/Container";
export default function Mostview() {
  const data = [
    {
      image: "/images/section4.1.webp",
      title: "Maximizing Success: The Role of Business Coaching",
      category: "Travel",
      description:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you,,,,, only to discover it's worth more",
    },
    {
      image: "/images/section4.2.webp",
      title: "5 Key Strategies from Top Business Consultants",
      category: "Inspiration",
      description:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you,,,,, only to discover it's worth more",
    },
    {
      image: "/images/section4.3.webp",
      title: "Transforming Challenges into Opportunities with Coaching",
      category: "Personal",
      description:
        "Ever scrolled through your feed, spotting a celebrity rocking an outfit that screams you,,,,, only to discover it's worth more",
    },
  ];
  return (
    <div className="bg-white font-hanken text-2xl py-[90px]">
        <h3 className="text-center pb-4 text-primary text-[18px] tracking-[3px] font-hanken leading-[24px]">THE LATEST</h3>
         <h2 className="text-center  text-primary text-[68px] leading-[62px] font-ivyMedium ">
         FROM <span className="font-ivy">the</span> JOURNAL
        </h2>
        <h3 className="text-center pt-9 text-primary text-[16px] tracking-[3px] font-hanken leading-[24px]">ALL EVENTS</h3>
      <Container className=" px-5  ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[58px] pt-[90px]  ">
          {data.map((item, index) => (
            <Card2 data={item} index={index + 1} />
          ))}
        </div>
      </Container>
    </div>
  );
}
