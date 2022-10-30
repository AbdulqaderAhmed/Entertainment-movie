import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { APIKEY, imageURL } from "../../api/apikey";
import { HTTP } from "../../api/http";
import Slider from "react-slick";
import Detail from "../../include/modal/Detail";

export default function TrendingTV() {
  const [data, setData] = useState([]);
  const [dayT, setDayT] = useState(false);

  const setting = {
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },

      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const fetchTrending = async () => {
    const res = await HTTP.get(`trending/tv/week?api_key=${APIKEY}`);
    setData(res.data.results);
    console.log(data);
  };

  useEffect(() => {
    fetchTrending();
  }, [dayT]);
  return (
    <div className="px-10 py-10">
      <div className=" flex flex-row gap-x-4">
        <h1 className="text-3xl text-white font-medium mb-8">
          Trending TV Shows
        </h1>
      </div>

      <Slider {...setting} className="">
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-52 bg-slate-900 rounded-lg border border-gray-200 shadow-md hover:scale-110 ease-linear duration-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <button data-modaltoggle="defaultModal">
                  <img
                    className="rounded-t-lg"
                    src={imageURL + item.poster_path}
                    alt={item.title}
                  />
                </button>
                <div className="top-2 pl-1 fixed">
                  <p
                    className={`bg-white p-1 ${
                      (item.vote_average / 1).toFixed(1) <= 6
                        ? "text-red-700"
                        : "text-green-700"
                    } text-md font-extrabold rounded-full w-8 h-8 `}
                  >
                    {(item.vote_average / 1).toFixed(1)}
                  </p>
                </div>

                {/* <!-- Main modal --> */}
                <Detail data={item} />
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
