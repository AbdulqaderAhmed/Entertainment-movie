import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { APIKEY, imageURL } from "../../api/apikey";
import { HTTP } from "../../api/http";
import Slider from "react-slick";

export default function Trending() {
  const [data, setData] = useState([]);
  const [day, setDay] = useState(false);

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
    const res = await HTTP.get(
      `trending/movie/${day ? "day" : "week"}?api_key=${APIKEY}`
    );
    setData(res.data.results);
  };

  useEffect(() => {
    fetchTrending();
  }, [day]);
  return (
    <div>
      <div className=" flex flex-row gap-x-4">
        <h1 className="text-3xl text-white font-medium mb-8">Trending Movie</h1>

        <label
          htmlFor="default-toggle"
          className="relative items-center cursor-pointer"
        >
          <input
            type="checkbox"
            value={day}
            onChange={() => setDay(!day)}
            id="default-toggle"
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-white dark:text-gray-300">
            {day ? "of the Day" : "of the Week"}
          </span>
        </label>
      </div>

      <Slider {...setting} className="">
        {data &&
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="w-52 bg-slate-900 rounded-lg border border-gray-200 shadow-md hover:scale-110 ease-linear duration-500 dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <img
                    className="rounded-t-lg"
                    src={imageURL + item.poster_path}
                    alt={item.title}
                  />
                </a>
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
              </div>
            );
          })}
      </Slider>
    </div>
  );
}
