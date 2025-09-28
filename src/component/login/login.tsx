import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, TextInput, PasswordInput } from "@mantine/core";

import FrameLogo3 from "@/assets/frame-logo3.svg?react";
import EyeIcon from "@/assets/close-eye.svg?react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "100%",
    height: "100%",
    borderRadius: 8,
    padding: "15px",
    background: "var(--light-200)",
  };

  const topBoxStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  const middleBoxStyles: React.CSSProperties = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    gap: 20,
    width: "50%",
    margin: "0 auto",
  };

  const bottomBoxStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 14,
    opacity: 0.7,
  };

  return (
    <>
      <style>
        {`
          .overviewBtn {
            font-size: 11px;
            font-weight: 500;
          }

          .createBtn {
            background-color: var(--mild-400);
            color: var(--light-100);
          }

          .createBtn:hover {
            background-color: var(--mild-300);
            border-color: var(--mild-300);
          }
        `}
      </style>

      <Box style={containerStyles}>
        <Box style={topBoxStyles}>
          <FrameLogo3 width={30} height={30}/>
          <Text 
            style={{
              fontSize: "9px",
              fontWeight: 450,
              color: "var(--mild-500)",
              backgroundColor: "var(--light-500)",
              padding: "2px 6px",
              borderRadius: 5
            }}
          >
            Powered by FifthLab
          </Text>
        </Box>

        <Box style={middleBoxStyles}>
          <Box>
            <Text style={{ fontSize: "22px", fontWeight: 600, color: "var(--mild-500)" }}>
              Welcome Back Tolani!
            </Text>
            <Text style={{ fontSize: "10px", fontWeight: 500, color: "var(--mild-400)" }}>
              Plan smarter, cook easier - sign in to continue
            </Text>
          </Box>

          <TextInput
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />

          <PasswordInput
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            rightSection={
              passwordVisible ? (
                <EyeIcon width={12} onClick={() => setPasswordVisible(false)} style={{ cursor: "pointer" }} />
              ) : (
                <EyeIcon width={12} onClick={() => setPasswordVisible(true)} style={{ cursor: "pointer" }} />
              )
            }
            type={passwordVisible ? "text" : "password"}
          />

          <Button
            className="overviewBtn createBtn"
            onClick={() => navigate("/home")}
          >
            Create Account
          </Button>
          

          <Text style={{ cursor: "pointer", fontSize: "10px", fontWeight: 500, color: "var(--mild-500)" }}>
            Forgot password?
          </Text>
        </Box>

        {/* Bottom Section */}
        <Box style={bottomBoxStyles}>
          <Text style={{ fontSize: "10px", fontWeight: 500, color: "var(--mild-400)" }}>
            © 2025 Meal Mate
          </Text>
          <Text style={{ fontSize: "10px", fontWeight: 500, color: "var(--mild-400)", cursor: "pointer", textDecoration: "underline" }}>Sign up here</Text>
        </Box>
      </Box>
    </>
  );
};

export default Login;
