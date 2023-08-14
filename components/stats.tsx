import React from "react";

const Stats = () => {
  return (
    <div className="py-8 bg-gray-800 text-white">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div className="text-center md:border-r">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">10+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-300 uppercase lg:text-base">
              Products
            </p>
          </div>
          <div className="text-center md:border-r">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">5k +</h6>
            <p className="text-sm font-medium tracking-widest text-gray-300 uppercase lg:text-base">
              Products Sold
            </p>
          </div>
          <div className="text-center md:border-r">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">A+</h6>
            <p className="text-sm font-medium tracking-widest text-gray-300 uppercase lg:text-base">
              Product Quality
            </p>
          </div>
          <div className="text-center">
            <h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">4.5</h6>
            <p className="text-sm font-medium tracking-widest text-gray-300 uppercase lg:text-base">
              Avg. Rating
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
