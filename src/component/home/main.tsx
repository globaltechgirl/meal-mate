import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mantine/core";
import { motion, AnimatePresence } from "framer-motion";

import FrameTop from "@/assets/frame-top.svg?react";
import FrameBottom from "@/assets/frame-bottom.svg?react";
import FrameLogo1 from "@/assets/frame-logo1.svg?react";
import FrameLogo3 from "@/assets/frame-logo3.svg?react";
import FrameLogo4 from "@/assets/frame-logo4.svg?react";
import NotifyIcon from "@/assets/notify-svg.svg?react";

const FrameLogo6: React.FC = () => (
  <Box style={{ display: "flex", alignItems: "flex-end", gap: "10px" }}>
    <FrameLogo3 style={{ width: "50px", height: "auto" }} />
    <FrameLogo4 style={{ width: "140px", height: "auto" }} />
  </Box>
);

type LogoComponentType = React.FC<{ style?: React.CSSProperties }>;

const logos: (LogoComponentType | typeof FrameLogo6)[] = [
  FrameLogo1,
  FrameLogo3,
  FrameLogo6,
];

const logoStyles: { width: string; top: string; left: string }[] = [
  { width: "35px", top: "50%", left: "48%" }, 
  { width: "50px", top: "48%", left: "46%" },
  { width: "50px", top: "48%", left: "42%" },
];

const Main: React.FC = () => {
  const [loading, setLoading] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const interval = setInterval(() => {
      setLoading((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          navigate("/overview"); 
          return 100;
        }
        return prev + 1;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [navigate]);

  const logoIndex = Math.floor((loading / 100) * logos.length);
  const LogoComponent = logos[Math.min(logoIndex, logos.length - 1)];
  const logoStyle = logoStyles[Math.min(logoIndex, logoStyles.length - 1)];

  return (
    <Box
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
        background: "var(--dark-10)",
      }}
    >
      <Box style={{ flex: 1, display: "flex", transform: "translateY(-10%)" }}>
        <Box style={{ flex: 1 }}>
          <FrameTop style={{ width: "200%", height: "100%", objectFit: "cover" }} />
        </Box>
        <Box style={{ flex: 1 }}>
          <FrameBottom
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "rotate(180deg)",
              opacity: 0,
            }}
          />
        </Box>
      </Box>

      <AnimatePresence mode="wait">
        <motion.div
          key={logoIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          style={{
            position: "absolute",
            top: logoStyle.top,
            left: logoStyle.left,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
          }}
        >
          {logoIndex === 0 ? (
            <>
              <NotifyIcon style={{ width: "5px", height: "auto", marginRight: "-10px" }} />
              <FrameLogo1 style={{ width: logoStyle.width, height: "auto" }} />
            </>
          ) : (
            <LogoComponent style={{ width: logoStyle.width, height: "auto" }} />
          )}
        </motion.div>
      </AnimatePresence>

      <Box style={{ flex: 1, display: "flex", transform: "translateY(-25%)" }}>
        <Box style={{ flex: 1 }}>
          <FrameTop
            style={{
              width: "200%",
              height: "100%",
              objectFit: "cover",
              transform: "rotate(180deg)",
            }}
          />
        </Box>
        <Box style={{ flex: 1 }}>
          <FrameBottom style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0 }} />
        </Box>
      </Box>
    </Box>
  );
};

export default Main;
