import React from "react";
import "./assets/css/app.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "./include/header/Header";
import Carousel from "./components/carousel/Carousel";
import Trending from "./components/Trending/Trending";
import Footer from "./include/footer/Footer";
import TrendingTV from "./components/Trending/TrendingTV";
import { flowbitToFun } from "./api/flowbiteToFun";
import Detail from "./include/modal/Detail";

export default function App() {
  return (
    <div className="bg-slate-800 min-h-screen">
      <header>
        <Header />
      </header>

      <main>
        <Carousel />
        <div className="px-10 py-10">
          <Trending />
        </div>

        <TrendingTV />
      </main>

      <footer>
        <Footer />
      </footer>
      {flowbitToFun("../node_modules/flowbite/dist/flowbite")}
    </div>
  );
}
