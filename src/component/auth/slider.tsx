import { Box, Text } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import FrameTop from "@/assets/frame-top.svg?react";
import FrameLogo3 from "@/assets/frame-logo3.svg?react";
import Frame2 from "@/assets/best-img2.jpg";
import Frame3 from "@/assets/best-img5.jpg";

type ContentSlide = {
  type: "content";
  logo: React.ReactNode;
  title: string;
  subtext: string;
};

type ImageSlide = {
  type: "image";
  image: string;
};

type Slide = ContentSlide | ImageSlide;

const slides: Slide[] = [
  {
    type: "content",
    logo: <FrameLogo3 style={{ width: 40, height: 40 }} />,
    title: "One Platform to Plan Smarter, Cook Easier, Eat Better",
    subtext:
      "An all-in-one platform designed to simplify meal planning, streamline cooking, and support healthier living.",
  },
  { type: "image", image: Frame2 },
  { type: "image", image: Frame3 },
];

const Slider: React.FC = () => {
  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[index];

  const containerStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    borderRadius: 8,
    overflow: "hidden",
    background: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
    position: "relative",
  };

  const motionStyles: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  const contentWrapperStyles: React.CSSProperties = {
    textAlign: "center",
    marginBottom: 50,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 20,
  };

  const textWrapperStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  return (
    <Box style={containerStyles}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 1 }}
          style={motionStyles}
        >
          {slide.type === "content" ? (
            <>
              <Box
                style={{
                  flex: 1,
                  position: "relative",
                  overflow: "visible",
                  marginBottom: -40,
                }}
              >
                <FrameTop
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "-40%",
                    left: 0,
                  }}
                />
                <FrameTop
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: "-10%",
                    left: 0,
                  }}
                />
                <FrameTop
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    bottom: "-20%",
                    left: 0,
                  }}
                />
              </Box>

              <Box style={contentWrapperStyles}>
                <Box style={{ display: "flex", justifyContent: "center" }}>
                  {slide.logo}
                </Box>
                <Box style={textWrapperStyles}>
                  <Text 
                    style={{ 
                      fontSize: 14, 
                      fontWeight: 600, 
                      color: "var(--light-100)",
                      width: "60%",
                      margin: "0 auto",
                    }}
                  >
                    {slide.title}
                  </Text>
                  <Text 
                    style={{ 
                      fontSize: 8.5, 
                      fontWeight: 400, 
                      color: "var(--light-200)",
                      width: "60%",
                      margin: "0 auto",
                    }}
                  >
                    {slide.subtext}
                  </Text>
                </Box>
              </Box>
            </>
          ) : (
            <img
              src={slide.image}
              alt={`Slide ${index + 1}`}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <Box
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 5,
          zIndex: 2,
        }}
      >
        {slides.map((_, i) => (
          <Box
            key={i}
            style={{
              width: 4,
              height: 4,
              borderRadius: "50%",
              background: i === index ? "var(--light-300)" : "var(--dark-300)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Slider;
