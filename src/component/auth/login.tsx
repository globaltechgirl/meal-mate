import { type FC, useState, useCallback, type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";
import { Box, Button, Text } from "@mantine/core";
import { Eye, EyeOff } from "tabler-icons-react";
import FrameLogo3 from "@/assets/frame-logo3.svg?react";

const Create: FC = () => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibility = useCallback(
    () => setPasswordVisible((prev) => !prev),
    []
  );

  // ✅ Handle Login API
  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save tokens, full name, and email to localStorage
        localStorage.setItem("access", data.tokens.access);
        localStorage.setItem("refresh", data.tokens.refresh);
        localStorage.setItem("full_name", data.full_name);
        localStorage.setItem("user_email", data.email); // <-- store email too

        alert("Login successful!");
        navigate("/recipes");
      } else {
        // Remove any old tokens
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        alert(data.error || "Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const styles: Record<string, CSSProperties> = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "100%",
      height: "100%",
      padding: 10,
      borderRadius: 8,
      background: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
    },
    header: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
    poweredBy: { padding: "2px 6px", borderRadius: 4, backgroundColor: "var(--dark-20)", border: "1px solid var(--dark-10)", fontSize: 8, fontWeight: 400, color: "var(--light-100)", textAlign: "center" },
    main: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textAlign: "center", gap: 30 },
    welcomeText: { fontSize: 16, fontWeight: 600, color: "var(--light-100)" },
    subtitle: { marginTop: 4, fontSize: 9, fontWeight: 500, color: "var(--light-200)" },
    formWrapper: { display: "flex", flexDirection: "column", gap: 10, width: isSmallScreen ? "90%" : isMediumScreen ? "80%" : "70%", margin: "0 auto", textAlign: "left" },
    formMain: { display: "flex", flexDirection: "column", gap: 15 },
    label: { fontSize: 9, fontWeight: 450, color: "var(--light-100)", marginBottom: -5 },
    input: { width: "100%", boxSizing: "border-box", borderRadius: 8, padding: "10px", fontSize: 9, fontWeight: 400, background: "var(--dark-20)", color: "var(--light-100)", border: "1px solid var(--dark-10)", outline: "none" },
    passwordWrapper: { position: "relative", display: "flex", alignItems: "center" },
    passwordIcon: { position: "absolute", right: 15, cursor: "pointer", color: "var(--light-100)" },
    button: { marginTop: 10, width: "100%", fontSize: 9, fontWeight: 450, color: "var(--light-100)", borderRadius: 8, backgroundColor: "var(--dark-10)", border: "0.5px solid var(--dark-10)", cursor: "pointer", boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.15), inset -1px -1px 2px rgba(0,0,0,0.15)", transition: "opacity 0.2s ease" },
    formLink: { marginTop: 10, textAlign: "center", cursor: "pointer", fontSize: 8.5, fontWeight: 500, color: "var(--light-200)", textDecoration: "underline", textUnderlineOffset: 2.5 },
    footer: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    footerText: { fontSize: 8.5, fontWeight: 400, color: "var(--light-100)" },
    registerLink: { fontSize: 8.5, fontWeight: 400, color: "var(--light-100)", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2.5 },
  };

  return (
    <Box style={styles.container}>
      <Box style={styles.header}>
        <FrameLogo3 width={30} height={30} />
        <Text style={styles.poweredBy}>Powered by FifthLab</Text>
      </Box>

      <Box style={styles.main}>
        <Box>
          <Text style={styles.welcomeText}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Plan smarter, cook easier — sign in to continue</Text>
        </Box>

        <Box style={styles.formWrapper}>
          <Box style={styles.formMain}>
            <Text style={styles.label}>Email Address</Text>
            <input
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />

            <Text style={styles.label}>Password *</Text>
            <Box style={styles.passwordWrapper}>
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="at least 8 characters"
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
          </Box>

          <Button
            style={styles.button}
            onClick={handleLogin}
            disabled={loading}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {loading ? "Logging in..." : "Get Started"}
          </Button>

          <Text style={styles.formLink}>Forgot Password?</Text>
        </Box>
      </Box>

      <Box style={styles.footer}>
        <Text style={styles.footerText}>© 2025 Meal Mate</Text>
        <Text style={styles.registerLink} onClick={() => navigate("/register")}>
          Register Here
        </Text>
      </Box>
    </Box>
  );
};

export default Create;
