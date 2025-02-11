import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Slide = ({ image, text1, text2,button, isActive }) => {
  if (!isActive) return null; 

  return (
    <div
      className="bg-center bg-cover h-[38rem]"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="flex items-center  w-full h-full ">
        <div className="text-left relative space-y-10 px-16">
          
          <motion.h1
            key="text1"
            initial={{ y: -500, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="text-xl font-semibold text-[#06BBCC] lg:text-2xl "
          >
            {text1}
          </motion.h1>

          <motion.p
            key="text2"
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="text-3xl font-semibold text-white lg:text-5xl "
          >
            {text2}
          </motion.p>

          <motion.button
            key="button"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 1 }}
          >
            <Link
              to="/"
              className="w-full px-4 py-4  text-md font-medium text-white bg-[#06BBCC] rounded-full hover:bg-[#181D38]"
            >
              {button}
            </Link>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
