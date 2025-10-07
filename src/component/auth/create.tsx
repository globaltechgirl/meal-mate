import { useState, type FC, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Box, Text, Button } from "@mantine/core";
import { Eye, EyeOff } from "tabler-icons-react";
import FrameLogo3 from "@/assets/frame-logo3.svg?react";

const Create: FC = () => {
  const navigate = useNavigate();

  const isSmall = useMediaQuery("(max-width: 768px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () => setPasswordVisible((v) => !v);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible((v) => !v);
  const handleNavigate = (path: string) => () => navigate(path);

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      borderRadius: 8,
      padding: 10,
      background: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },
    poweredBy: {
      padding: "2px 6px",
      borderRadius: 4,
      backgroundColor: "var(--dark-20)",
      border: "1px solid var(--dark-10)",
      fontSize: 8,
      fontWeight: 400,
      color: "var(--light-100)",
      textAlign: "center",
    },
    main: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      textAlign: "center",
      gap: 30,
    },
    welcomeText: { 
      fontSize: 16, 
      fontWeight: 600,
      color: "var(--light-100)" 
    },
    subtitle: { 
      marginTop: 4, 
      fontSize: 9, 
      fontWeight: 500,
      color: "var(--light-200)" 
    },
    formWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: isSmall ? "90%" : isMedium ? "80%" : "80%", 
      margin: "0 auto",
      textAlign: "left",
    },
    formMain: { 
      display: "flex", 
      flexDirection: "column", 
      gap: 15 
    },
    label: { 
      fontSize: 9, 
      fontWeight: 450, 
      color: "var(--light-100)", 
      marginBottom: -5 
    },
    input: {
      borderRadius: 8,
      padding: "10px",
      fontSize: 9,
      fontWeight: 400,
      background: "var(--dark-20)",
      color: "var(--light-100)",
      border: "1px solid var(--dark-10)",
      outline: "none",
      width: "100%",
      boxSizing: "border-box",
    },
    passwordWrapper: { 
      position: "relative", 
      display: "flex", 
      alignItems: "center" 
    },
    passwordIcon: { 
      position: "absolute", 
      right: 15, 
      cursor: "pointer", 
      color: "var(--light-100)" 
    },
    button: {
      marginTop: 10,
      fontSize: 9,
      fontWeight: 450,
      color: "var(--light-100)",
      borderRadius: 8,
      cursor: "pointer",
      width: "100%",
      backgroundColor: "var(--dark-10)",
      border: "0.5px solid var(--dark-10)",
      boxShadow:
        "inset 1px 1px 2px rgba(0, 0, 0, 0.15), inset -1px -1px 2px rgba(0, 0, 0, 0.15)",
      transition: "opacity 0.2s ease",
    },
    forgotPassword: {
      marginTop: 10,
      textAlign: "center",
      cursor: "pointer",
      fontSize: 8.5,
      fontWeight: 500,
      color: "var(--light-200)",
      textDecoration: "underline",
      textUnderlineOffset: 2.5,
    },
    footer: { 
      display: "flex", 
      justifyContent: "space-between", 
      alignItems: "center" 
    },
    footerText: { 
      fontSize: 8.5, 
      fontWeight: 400, 
      color: "var(--light-100)" 
    },
    registerLink: {
      fontSize: 8.5,
      fontWeight: 400,
      color: "var(--light-100)",
      cursor: "pointer",
      textDecoration: "underline",
      textUnderlineOffset: 2.5,
    },
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <FrameLogo3 width={30} height={30} />
        <Text style={styles.poweredBy}>Powered by FifthLab</Text>
      </Box>

      <Box style={styles.main}>
        <Box>
          <Text style={styles.welcomeText}>Create Your Account</Text>
          <Text style={styles.subtitle}>Personalized meal planning - sign up to start</Text>
        </Box>

        <Box style={styles.formWrapper}>
          <Box style={styles.formMain}>
            <Text style={styles.label}>Email Address *</Text>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <Text style={styles.label}>Password *</Text>
            <Box style={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
              />
              {passwordVisible ? (
                <EyeOff size={10} style={styles.passwordIcon} onClick={togglePasswordVisibility} />
              ) : (
                <Eye size={10} style={styles.passwordIcon} onClick={togglePasswordVisibility} />
              )}
            </Box>

            <Text style={styles.label}>Confirm Password *</Text>
            <Box style={styles.passwordWrapper}>
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                placeholder="Re-enter your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                style={styles.input}
              />
              {confirmPasswordVisible ? (
                <EyeOff size={10} style={styles.passwordIcon} onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <Eye size={10} style={styles.passwordIcon} onClick={toggleConfirmPasswordVisibility} />
              )}
            </Box>
          </Box>

          <Button
            style={styles.button}
            onClick={handleNavigate("/meal-calendar")}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Register
          </Button>

          <Text style={styles.forgotPassword}>Terms & Privacy Policy</Text>
        </Box>
      </Box>

      <Box style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Meal Mate</Text>
        <Text style={styles.registerLink} onClick={handleNavigate("/login")}>
          Login Here
        </Text>
      </Box>
    </Box>
  );
};

export default Create;
