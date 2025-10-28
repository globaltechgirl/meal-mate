import { type FC, type CSSProperties } from "react";
import { Box } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import Slider from "@/component/auth/slider";
import LoginForm from "@/component/auth/login";

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    height: "100vh",
    overflow: "hidden",
    background: "var(--dark-10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  contentWrapper: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    background: "var(--dark-20)",
    borderRadius: 8,
    padding: 5,
    gap: 10,
  },
  sliderSection: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--dark-500)",
    borderRadius: 8,
    textAlign: "center",
  },
  formSection: {
    flex: 1,
    display: "flex",
    background: "var(--light-200)",
    borderRadius: 8,
  },
};

const Login: FC = () => {
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const wrapperWidth = isSmallScreen ? "98%" : isMediumScreen ? "95%" : "80%";
  const wrapperHeight = isSmallScreen ? "98vh" : isMediumScreen ? "95%" : "90vh";

  const showSlider = !isSmallScreen && !isMediumScreen;

  return (
    <Box style={styles.container}>
      <Box style={{ ...styles.contentWrapper, width: wrapperWidth, height: wrapperHeight }}>
        {showSlider && (
          <Box style={styles.sliderSection}>
            <Slider />
          </Box>
        )}

        <Box style={styles.formSection}>
          <LoginForm />
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
