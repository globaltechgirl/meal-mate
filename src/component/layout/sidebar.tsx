import { type FC, memo, useCallback, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Box, Popover, Text } from "@mantine/core";

import { NAV_LINKS } from "@/utils/constants";
import FrameLogo3 from "@/assets/frame-logo3.svg?react";
import FrameLogo4 from "@/assets/frame-logo4.svg?react";
import UnfoldIcon from "@/assets/icons/unfold";
import UserImg from "@/assets/best-img1.jpg";

const styles = {
  wrapper: { height: "100%", display: "flex", flexDirection: "column" as const, justifyContent: "space-between" },
  topSection: { display: "flex", flexDirection: "column" as const, gap: 20 },
  logoBox: { display: "flex", alignItems: "flex-end", gap: 6, marginLeft: 5 },
  navLinks: { display: "flex", flexDirection: "column" as const, width: "100%", gap: 0 },
  userWrapper: { display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "4px 8px 4px 4px", borderRadius: 8, backgroundColor: "var(--dark-30)", border: "1px solid var(--dark-10)", cursor: "pointer" },
  userInfo: { display: "flex", alignItems: "center", gap: 8 },
  userImg: { width: 30, height: 30, borderRadius: 6, border: "1px solid var(--dark-10)", objectFit: "cover" as const },
  nameEmail: { display: "flex", flexDirection: "column" as const, gap: 1, letterSpacing: "0.1px" },
  userName: { fontSize: 8.5, fontWeight: 450, color: "var(--light-100)" },
  userEmail: { fontSize: 8, fontWeight: 400, color: "var(--light-200)" },
  popoverItem: { fontSize: 8.5, fontWeight: 400, color: "var(--light-100)", padding: "4px 8px", borderRadius: 4, cursor: "pointer", transition: "background-color 0.2s ease" },
  footerText: { fontSize: 8.5, fontWeight: 400, color: "var(--light-300)", marginTop: 10, textAlign: "center" as const },
};

interface PopoverItemProps { label: string; onClick: () => void }
const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick }) => (
  <Box
    style={styles.popoverItem}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--dark-20)")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {label}
  </Box>
));
PopoverItem.displayName = "PopoverItem";

const Sidebar: FC = () => {
  const [opened, setOpened] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [email, setEmail] = useState("user@example.com");

  const navigate = useNavigate();

  // ✅ Fetch user info from localStorage on mount
  useEffect(() => {
    const storedName = localStorage.getItem("full_name");
    const storedEmail = localStorage.getItem("user_email");
    if (storedName) setFullName(storedName);
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleTogglePopover = useCallback(() => {
    setOpened((prev) => !prev);
  }, []);

  const handleViewProfile = useCallback(() => {
    setOpened(false);
    navigate("/profile");
  }, [navigate]);

  const handleLogout = useCallback(() => {
    // Clear tokens and user info
    ["access", "refresh", "full_name", "user_email"].forEach((key) => localStorage.removeItem(key));
    navigate("/login");
  }, [navigate]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.topSection}>
        <Box style={styles.logoBox}>
          <FrameLogo3 width={25} height="auto" />
          <FrameLogo4 width={75} height="auto" />
        </Box>

        <Box style={styles.navLinks}>
          {NAV_LINKS.map(({ link, label, icon: Icon }) => (
            <NavLink
              key={link}
              to={link}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                textDecoration: "none",
                fontSize: 9,
                fontWeight: 400,
                padding: "7px 12px",
                borderRadius: 8,
                letterSpacing: "0.4px",
                color: "var(--light-100)",
                backgroundColor: isActive ? "var(--dark-30)" : "transparent",
                border: isActive ? "1px solid var(--dark-10)" : "transparent",
                marginBottom: isActive ? 5 : 0,
                transition: "all 0.2s ease",
              })}
            >
              <Icon width={10} height={10} style={{ marginTop: 1 }} />
              {label}
            </NavLink>
          ))}
        </Box>
      </Box>

      <Box style={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Popover opened={opened} onChange={setOpened} position="top">
          <Popover.Target>
            <Box style={styles.userWrapper} onClick={handleTogglePopover}>
              <Box style={styles.userInfo}>
                <img src={UserImg} alt="User avatar" style={styles.userImg} />
                <Box style={styles.nameEmail}>
                  <Text style={styles.userName}>{fullName}</Text>
                  <Text style={styles.userEmail}>{email}</Text>
                </Box>
              </Box>
              <UnfoldIcon width={10} height={10} color="var(--light-100)" />
            </Box>
          </Popover.Target>

          <Popover.Dropdown
            style={{
              width: 90,
              padding: 2,
              backgroundColor: "var(--dark-30)",
              border: "1px solid var(--dark-10)",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <PopoverItem label="View Profile" onClick={handleViewProfile} />
            <PopoverItem label="Logout" onClick={handleLogout} />
          </Popover.Dropdown>
        </Popover>

        <Text style={styles.footerText}>© 2025 Meal Mate</Text>
      </Box>
    </Box>
  );
};

export default Sidebar;
