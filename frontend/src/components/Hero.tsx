import { Button } from "../components/ui/button";
import VaporizeTextCycle, { Tag } from "../components/vapour-text-effect";
import {MacbookScroll} from "../components/mac-book";

export const Hero = () => {
  return (
    <section className="relative md:py-20 px-2 md:px-4  min-h-[90vh] md:h-screen overflow-hidden ">
     
      
      {/* Content Overlay */}
      <div className="relative z-10 bottom-72 container mx-auto text-center h-full flex items-center justify-center">
        <div className="max-w-4xl mx-auto w-full px-2">
          <div className="h-24 md:h-32 mb-4 md:mb-6 flex items-center justify-center">
            <VaporizeTextCycle
              texts={["Build Your Dream", "Gaming Rig", "CoreBuild"]}
              font={{
                fontFamily: "Inter, sans-serif",
                fontSize: "82px", // mobile
                fontWeight: 700
              }}
              color="rgb(255, 255, 255)"
              spread={4}
              density={6}
              animation={{
                vaporizeDuration: 3,
                fadeInDuration: 1.5,
                waitDuration: 1
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.H1}
            />
            <style>
              {`
                @media (min-width: 768px) {
                  .vapour-text-effect {
                    font-size: 60px !important;
                  }
                }
                .vapour-text-effect {
                  font-size: 32px !important;
                }
              `}
            </style>
          </div>
          <p className="text-base md:text-xl text-gray-300 mb-6 md:mb-8 max-w-2xl mx-auto animate-fade-in">
            Discover premium computer hardware from leading brands. CPUs, GPUs, motherboards, and more - everything you need for the ultimate PC build.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in w-full">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white px-6 md:px-8 py-3 text-base md:text-lg font-semibold border border-gray-600">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-500 text-white hover:bg-gray-800/20 px-6 md:px-8 py-3 text-base md:text-lg font-semibold">
              Build Guide
            </Button>
          </div>
        </div>
      </div>
       <div className="absolute inset-0 z-0">
     
        <div className="overflow-hidden dark:bg-[#0B0B0F] bg-white w-full">
      <MacbookScroll
       
        
        src={`https://www.asus.com/campaign/powered-by-asus/upload/scenario/20241115190637_pic0.jpg`}
        showGradient={false}
      />
    </div>
      </div>
    </section>
  );
};