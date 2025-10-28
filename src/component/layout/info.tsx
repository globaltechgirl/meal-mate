import { type FC, type CSSProperties, useState, useCallback, useEffect, type ChangeEvent } from "react";
import { Box, Text, Avatar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import SearchIcon from "@/assets/icons/search";
import SunIcon from "@/assets/icons/sun";
import MoonIcon from "@/assets/icons/moon";

interface IconCircleProps {
  children: React.ReactNode;
  onClick?: () => void;
}

const IconCircle: FC<IconCircleProps> = ({ children, onClick }) => (
  <Box
    onClick={onClick}
    style={{
      width: 24,
      height: 24,
      borderRadius: "50%",
      background: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      overflow: "hidden",
      position: "relative",
    }}
  >
    {children}
  </Box>
);

const Info: FC = () => {
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(
    (localStorage.getItem("theme") as "dark" | "light") || "dark"
  );
  const [animating, setAnimating] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  // Fetch user info from API
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) return;

      try {
        const res = await fetch("https://meal-mate-api-pd3x.onrender.com/api/accounts/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch user:", res.status, res.statusText);
          return;
        }

        const data = await res.json();
        setFullName(data.full_name || "User");
        setProfileImage(data.profile_image || null);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${theme}-theme`);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = useCallback(() => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => setTheme(prev => (prev === "dark" ? "light" : "dark")), 150);
    setTimeout(() => setAnimating(false), 300);
  }, [animating]);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []);

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map(n => n[0].toUpperCase())
      .slice(0, 2)
      .join("");

  const styles: Record<string, CSSProperties> = {
    infoBar: {
      width: "100%",
      height: 25,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "var(--dark-20)",
      border: "1px solid var(--border-100)",
      borderRadius: 8,
      padding: "4px 8px",
      transition: "background 0.3s ease, border 0.3s ease",
    },
    greetingText: {
      fontSize: 10,
      fontWeight: 450,
      color: "var(--light-100)",
      transition: "color 0.3s ease",
    },
    rightSection: { display: "flex", alignItems: "center", gap: 8 },
    searchWrapper: {
      display: "flex",
      alignItems: "center",
      background: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      borderRadius: 6,
      height: 24,
      padding: "0 8px 1px",
      transition: "background 0.3s ease, border 0.3s ease",
    },
    searchInput: {
      border: "none",
      outline: "none",
      background: "transparent",
      fontSize: 10,
      fontWeight: 400,
      color: "var(--light-100)",
      marginTop: 1,
      paddingLeft: 6,
      width: 120,
      transition: "color 0.3s ease",
    },
  };

  const animationCSS = `
    @keyframes slideUpOut { 0% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-100%); opacity: 0; } }
    @keyframes slideUpIn { 0% { transform: translateY(100%); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
    .icon-out { position: absolute; top: 0; left: 0; animation: slideUpOut 0.3s forwards ease; }
    .icon-in { position: absolute; top: 0; left: 0; animation: slideUpIn 0.3s forwards ease; }
  `;

  return (
    <>
      <style>{animationCSS}</style>

      <Box p="lg" px="sm" style={styles.infoBar}>
        {!isSmallScreen && (
          <Text style={styles.greetingText}>
            {fullName}. Welcome back to Meal Mate!
          </Text>
        )}

        <Box
          style={{
            ...styles.rightSection,
            justifyContent: isSmallScreen ? "space-between" : "flex-end",
            width: isSmallScreen ? "100%" : "auto",
          }}
        >
          {isSmallScreen && (
            <IconCircle>
              <Avatar radius="xl" size={20}>
                {!profileImage && getInitials(fullName)}
              </Avatar>
            </IconCircle>
          )}

          <Box style={styles.rightSection}>
            <Box style={styles.searchWrapper}>
              <SearchIcon width={11} height={11} color="var(--light-100)" />
              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="Search"
                style={styles.searchInput}
              />
            </Box>

            <IconCircle onClick={toggleTheme}>
              <Box style={{ position: "relative", width: 12, height: 12 }} />
            </IconCircle>

            {!isSmallScreen && (
              <IconCircle>
                <Avatar radius="xl" size={20}>
                  {!profileImage && getInitials(fullName)}
                </Avatar>
              </IconCircle>
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Info;
