import Hero from "@/components/layout/hero";
import Testimonials from "@/components/layout/testimonials";
import Features from "@/components/layout/features";
import {OpenSource} from "@/components/layout/open-source";
import React from "react";
const page = () => {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <OpenSource/>
    </div>
  );
};

export default page;
