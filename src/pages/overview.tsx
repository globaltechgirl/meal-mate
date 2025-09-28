import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Stack, Button } from "@mantine/core";

import FrameTop from "@/assets/frame-top.svg?react";
import FrameBottom from "@/assets/frame-bottom.svg?react";
import OverviewIcon from "@/assets/overview-icon.svg?react";

const Overview: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .overviewCenter {
            position: absolute;
            top: 52%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 12px;
          }

          .overviewBtn {
            width: 250px;
            padding: 0 20px;
            font-size: 10px;
            font-weight: 500;
            border-radius: 8px;
            border: 0.5px solid var(--mild-300);
            cursor: pointer;
            transition: transform 0.18s ease, background-color 0.18s ease, color 0.18s ease, border-color 0.18s ease;
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          .createBtn {
            background-color: var(--mild-300);
            color: var(--light-100);
          }

          .createBtn:hover {
            background-color: var(--mild-400);
            border-color: var(--mild-400);
          }

          .loginBtn {
            background-color: transparent;
            color: var(--mild-300);
          }

          .loginBtn:hover {
            background-color: var(--mild-400);
            color: var(--light-100);
            border-color: var(--mild-400);
          }
        `}
      </style>

      <Box
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          background: "var(--dark-500)",
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

        <Stack className="overviewCenter">
          <OverviewIcon style={{ width: "200px", height: "auto", marginLeft: "-10px" }} />

          <Button
            className="overviewBtn createBtn"
            onClick={() => navigate("/create")}
          >
            Create Account
          </Button>

          <Button
            className="overviewBtn loginBtn"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Stack>

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
    </>
  );
};

export default Overview;
