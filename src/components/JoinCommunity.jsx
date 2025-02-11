import React from "react";
import Lottie from "lottie-react";
import communityAnim from "../assets/community.json";

const JoinCommunity = () => {
  return (
    <div className="p-10 flex items-center justify-between">
      <div className="text-left space-y-5">
        <h1 className="text-[#00000080] uppercase text-lg">
          JOIN THE COMMUNITY COURSE AND UPGRADE YOUR SKILL
        </h1>
        <p className="uppercase text-[#181d38] text-3xl font-bold">
          Stay Connect with our latest
          <span className="text-[#06bbcc]"> community</span>
        </p>
        <button className="bg-[#06BBCC] text-white btn rounded-xl hover:bg-[#181D38] mt-2">
          Join Now
        </button>
      </div>
      <div className="flex justify-center items-center">
        <Lottie 
          animationData={communityAnim} 
          style={{ height: "300px", width: "400px" }} // Resize animation
        />
      </div>
    </div>
  );
};

export default JoinCommunity;
