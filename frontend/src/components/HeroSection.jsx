import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import heroImg from "../assets/blog2.png";

function HeroSection() {
  return (
    <div className="px-4 md:px-0">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center h-150 my-10 md:my-0">
        {/* text section */}
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-6xl font-bold">
            Explore the latest Tech & Web Trends
          </h1>
          <p className="text-lg md:text-xl opacity-80 mb-6 ">
            Stay ahead with in-depth articles, tutorials, and insights on web
            development, digital marketing, and tech innovations.
          </p>
          <div className="flex space-x-4">
            <Link to={"/dashboard/create-blog"}>
              <Button className="cursor-pointer text-lg ">Get Started</Button>
            </Link>
            <Link to={"/about"}>
              <Button
                variant="outline"
                className="border-white  px-6 py-3 text-lg"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
        <div>
          {/* image section */}
          <div className="flex items-center justify-center">
            <img
              src={heroImg}
              alt="heroImg"
              className="md:h-137.5 md:w-137.5 "
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
