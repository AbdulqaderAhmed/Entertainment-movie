import React, { useState } from "react";
import { useEffect } from "react";
import { HTTP } from "../../api/http";
import { APIKEY } from "../../api/apikey";

export default function Carousel() {
  const [data, setData] = useState([]);
  const imageURL = "https://image.tmdb.org/t/p/original/";

  const fetchMovie = async () => {
    const res = await HTTP.get(`trending/movie/day?api_key=${APIKEY}`);
    setData(res.data.results);
    // console.log(res.data.results);
  };

  useEffect(() => {
    fetchMovie();
  }, []);

  return (
    <div
      id="animation-carousel"
      className="relative pt-1 md:pt-16"
      data-carousel="slide"
    >
      {/* <!-- Carousel wrapper --> */}
      <div className="relative h-96 overflow-hidden rounded-lg md:min-h-max">
        {/* <!-- Item 1 --> */}
        {data &&
          data.map((item, index) => {
            return (
              <div key={index}>
                <div
                  className="hidden duration-200 ease-linear absolute inset-0 transition-all transform"
                  data-carousel-item=""
                >
                  <img
                    src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                    className="absolute opacity-70 block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                    alt={item.title}
                  />
                  {/* card */}
                  <div className="absolute z-30 opacity-100 flex space-x-3 -translate-x-1/2 top-2/4 left-1/4 md:left-52 md:top-20 md:h-3/4 md:w-12/12 hover:scale-110 duration-200 ease-linear">
                    <div className="w-40 min-h-fit rounded-3xl border shadow-lg dark:bg-gray-800 dark:border-gray-700 md:w-52 ">
                      <img
                        src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}
                        className="absolute rounded-lg border shadow-lg block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 md:min-h-full md:w-12/12"
                        alt={item.title}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
