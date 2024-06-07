import React from "react";

import Footer from "../components/Footer/Footer";
import About from "../components/About";
import Capacity from "../components/Capacity";
import Experience from "../components/Experience";
import License from "../components/License";
import GoToTop from "../components/GoToTop/GoToTop";

export default function Home() {
  return (
    <div>
      <About />
      <Capacity />
      <Experience />
      <License />
      <Footer />
      <GoToTop />
    </div>
  );
}
