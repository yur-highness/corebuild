
import VaporizeTextCycle, { Tag } from "../components/vapour-text-effect";
import {MacbookScroll} from "../components/mac-book";
import "../index.css"

export const Hero = () => {
  return (
    <>
    <section className="relative md:py-20 px-2 md:px-4 md:min-h-[50vh] min-h-screen md:h-screen overflow-hidden bg-[#0b0b0f] bgImg">
  <MacbookScroll src={`apple.png`} showGradient={false} />
  <div className="absolute top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
   <p className="text-base sm:text-sm md:text-lg text-gray-300 max-w-xl mx-auto animate-fade-in">
  <span className="sm:block md:max-w-xl">
    Discover premium computer hardware from leading brands. CPUs, GPUs, motherboards, and more - everything you need for the ultimate PC build.
  </span>
</p>
    <VaporizeTextCycle
      texts={["Build Legacy", "Gaming Rig", "CoreBuild"]}
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
          @media (min-width: 1968px) {
          .vapour-text-effect {
            font-size: 80px !important;
            width: 100% !important;
          }
        } 
        @media (min-width: 388px) {
          .vapour-text-effect {
            font-size: 30px !important;
          }
        }
        .vapour-text-effect {
          font-size: 32px !important;
        }
      `}
    </style>
 
    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center animate-fade-in w-full">


    </div>
  </div>
</section>


</>
  );
};