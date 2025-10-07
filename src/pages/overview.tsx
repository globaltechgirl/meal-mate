import { type FC } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button } from "@mantine/core";

import FrameTop from "@/assets/frame-top.svg?react";
import FrameBottom from "@/assets/frame-bottom.svg?react";
import OverviewIcon from "@/assets/overview-icon.svg?react";

const styles = {
  container: {
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column" as const,
    overflow: "hidden",
    position: "relative" as const,
    background: "var(--dark-10)",
  },
  topFrames: {
    flex: 1,
    display: "flex",
    transform: "translateY(-10%)",
  },
  bottomFrames: {
    flex: 1,
    display: "flex",
    transform: "translateY(-25%)",
  },
  frameTop: {
    width: "200%",
    height: "100%",
    objectFit: "cover" as const,
  },
  frameBottom: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
    transform: "rotate(180deg)",
    opacity: 0,
  },
  overviewCenter: {
    position: "absolute" as const,
    top: "52%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    gap: 12,
  },
  overviewBtn: {
    width: 250,
    padding: "0 20px",
    fontSize: "9.5px",
    fontWeight: 450,
    color: "var(--light-100)",
    borderRadius: 8,
    border: "1px solid var(--dark-30)",
    cursor: "pointer",
    transition:
      "transform 0.18s ease, background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
  },
  createBtn: {
    backgroundColor: "var(--dark-30)",
  },
  loginBtn: {
    backgroundColor: "var(--dark-20)",
  },
} as const;

const Overview: FC = () => {
  const navigate = useNavigate();

  const handleNavigate = (path: string) => () => navigate(path);

  return (
    <Box style={styles.container}>
      <Box style={styles.topFrames}>
        <Box style={{ flex: 1 }}>
          <FrameTop style={styles.frameTop} />
        </Box>
        <Box style={{ flex: 1 }}>
          <FrameBottom style={styles.frameBottom} />
        </Box>
      </Box>

      <Stack style={styles.overviewCenter}>
        <OverviewIcon
          style={{ width: 200, height: "auto", marginLeft: -10 }}
        />

        <Button
          style={{ ...styles.overviewBtn, ...styles.createBtn }}
          onClick={handleNavigate("/create")}
        >
          Create Account
        </Button>

        <Button
          style={{ ...styles.overviewBtn, ...styles.loginBtn }}
          onClick={handleNavigate("/login")}
        >
          Login
        </Button>
      </Stack>

      <Box style={styles.bottomFrames}>
        <Box style={{ flex: 1 }}>
          <FrameTop style={{ ...styles.frameTop, transform: "rotate(180deg)" }} />
        </Box>
        <Box style={{ flex: 1 }}>
          <FrameBottom style={styles.frameBottom} />
        </Box>
      </Box>
    </Box>
  );
};

export default Overview;
