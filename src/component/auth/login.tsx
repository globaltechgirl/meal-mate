import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Text, Button, TextInput } from "@mantine/core";
import { Eye, EyeOff } from "tabler-icons-react";

import FrameLogo3 from "@/assets/frame-logo3.svg?react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  return (
    <>
      <style>
        {`
          .overviewBtn {
            font-size: 10px;
            font-weight: 500;
          }

          .createBtn {
            background-color: var(--mild-400);
            color: var(--light-100);
            border-radius: 8px;
            box-shadow: 
              inset 1px 1px 2px rgba(0, 0, 0, 0.15),
              inset -1px -1px 2px rgba(0, 0, 0, 0.15);
          }

          .createBtn:hover {
            background-color: var(--mild-400);
            opacity: 0.9;
          }

          .custom-input {
            border-radius: 8px;
            padding: 10px;
            font-size: 9px;
            font-weight: 500;
            background: transparent;
            color: var(--mild-500) !important;
            border: 0.5px solid var(--mild-500);
          }

          .custom-input::placeholder,
          .mantine-PasswordInput-input::placeholder {
            color: var(--mild-500) !important;
            opacity: 0.8 !important;
          }

          .custom-label {
            font-size: 9px;
            font-weight: 500;
            color: var(--mild-500);
            margin-bottom: 6px;
          }
        `}
      </style>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
          borderRadius: 8,
          padding: "10px",
          background: "var(--light-200)",
        }}
      >
        <Box
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <FrameLogo3 width={30} height={30} />
          <Text
            style={{
              fontSize: "8px",
              fontWeight: 500,
              color: "var(--mild-500)",
              backgroundColor: "var(--light-500)",
              padding: "2px 6px",
              borderRadius: 5,
            }}
          >
            Powered by FifthLab
          </Text>
        </Box>

        <Box
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            textAlign: "center",
            gap: 15,
          }}
        >
          <Box>
            <Text
              style={{
                fontSize: "16px",
                fontWeight: 600,
                color: "var(--mild-500)",
              }}
            >
              Welcome Back Tolani!
            </Text>
            <Text
              mt={4}
              style={{
                fontSize: "9px",
                fontWeight: 500,
                color: "var(--mild-400)",
              }}
            >
              Plan smarter, cook easier - sign in to continue
            </Text>
          </Box>

          <Box
            style={{
              textAlign: "left",
              display: "flex",
              flexDirection: "column",
              gap: 10,
              width: "80%",
              margin: "0 auto",
            }}
          >
            <TextInput
              label="Email Address"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              classNames={{
                label: "custom-label",
                input: "custom-input",
              }}
            />

            <TextInput
              label="Password"
              placeholder="at least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              type={passwordVisible ? "text" : "password"}
              rightSection={
                passwordVisible ? (
                  <EyeOff
                    size={11}
                    onClick={() => setPasswordVisible(false)}
                    style={{ cursor: "pointer", color: "var(--mild-500)" }}
                  />
                ) : (
                  <Eye
                    size={11}
                    onClick={() => setPasswordVisible(true)}
                    style={{ cursor: "pointer", color: "var(--mild-500)" }}
                  />
                )
              }
              classNames={{
                label: "custom-label",
                input: "custom-input",
              }}
            />

            <Button
              mt={10}
              className="overviewBtn createBtn"
              onClick={() => navigate("/home")}
            >
              Get Started
            </Button>

            <Text
              mt={10}
              style={{
                textAlign: "center",
                cursor: "pointer",
                fontSize: "9px",
                fontWeight: 500,
                color: "var(--mild-500)",
                textDecoration: "underline",
              }}
            >
              Forgot password?
            </Text>
          </Box>
        </Box>

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: "9px", fontWeight: 500, color: "var(--mild-500)" }}>
            © 2025 Meal Mate
          </Text>
          <Text
            style={{
              fontSize: "9px",
              fontWeight: 500,
              color: "var(--mild-500)",
              cursor: "pointer",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/create")}
          >
            Register Here
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default Login;
