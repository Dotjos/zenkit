"use client";
import { useState, useRef, useEffect } from "react";
import Button from "../components/Button";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 4;

  const nextVideoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = useRef<HTMLVideoElement>(null);

  const upcomingVideoIndex = (currentIndex % totalVideos) + 1;

  useEffect(() => {
    const videoIndices = [1, 2, 3, 4];
    let loadedCount = 0;

    const preloadVideo = async (index: number) => {
      try {
        const response = await fetch(getVideoSrc(index));
        if (!response.ok) throw new Error("Failed to fetch");

        const blob = await response.blob();

        loadedCount++;
        setLoadedVideos(loadedCount);
      } catch (error) {
        console.error(`Error loading video ${index}:`, error);
        loadedCount++;
        setLoadedVideos(loadedCount);
      }
    };

    videoIndices.forEach((index) => preloadVideo(index));
  }, []);

  useEffect(() => {
    if (loadedVideos === totalVideos) {
      setIsLoading(false);
    }
  }, [loadedVideos, totalVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#current-video", { visibility: "visible" });

        gsap.to("#current-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => {
            nextVideoRef.current?.play();
          },
        });

        gsap.from(`#next-video`, {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    { dependencies: [currentIndex], revertOnUpdate: true }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
    });

    gsap.to("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 90% 100%, 0% 100%)",
      borderRadius: "0 0 40% 10%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  }, []);

  const handleMiniVidClick = () => {
    setHasClicked(true);
    setCurrentIndex(upcomingVideoIndex);
  };

  const getVideoSrc = (index: number) => `/videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden">
      {isLoading && (
        <div className="flex-center absolute z-100 h-dvh w-screen overflow-hidden bg-violet-50">
          <div className="three-body">
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
            <div className="three-body__dot"></div>
          </div>
        </div>
      )}

      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
            <div
              onClick={handleMiniVidClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:opacity-100 hover:scale-100"
            >
              <video
                ref={nextVideoRef}
                src={getVideoSrc(upcomingVideoIndex)}
                loop
                muted
                preload="auto"
                playsInline
                id="next-video"
                className="size-64 origin-center scale-150 object-cover object-center"
              />
            </div>
          </div>
          <video
            ref={currentVideoRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            preload="auto"
            playsInline
            id="current-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
          />
          <video
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            preload="auto"
            playsInline
            className="absolute left-0 top-0 size-full object-cover object-center"
          />
        </div>

        <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>a</b>ming
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>
            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>
            <Button
              id="watch-trailer"
              title="Watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>
      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>a</b>ming
      </h1>
    </div>
  );
};

export default Hero;
