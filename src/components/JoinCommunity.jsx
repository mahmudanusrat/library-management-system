import React from "react";
import Lottie from "lottie-react";
import communityAnim from "../assets/community.json";

const JoinCommunity = () => {
  const handleJoinNow = () => {
    window.open("https://your-group-link.com", "_blank"); // 🔗 Replace with your actual group link
  };

  return (
    <div className="p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-8">
      {/* Text Content */}
      <div className="text-center md:text-left space-y-5 w-full md:w-1/2">
        <h1 className="text-[#00000080] uppercase text-lg">
          JOIN THE COMMUNITY COURSE AND UPGRADE YOUR SKILL
        </h1>
        <p className="uppercase text-[#181d38] text-3xl font-bold">
          Stay Connected with our latest
          <span className="text-[#06bbcc]"> community</span>
        </p>
        <div className="flex justify-center md:justify-start">
          <button
            onClick={handleJoinNow}
            className="bg-[#06BBCC] text-white px-6 py-2 rounded-xl hover:bg-[#181D38] transition"
          >
            Join Now
          </button>
        </div>
      </div>

      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 flex justify-center">
        <Lottie 
          animationData={communityAnim} 
          className="w-80 h-80 md:w-96 md:h-96"
        />
      </div>
    </div>
  );
};

export default JoinCommunity;
