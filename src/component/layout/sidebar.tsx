import { NavLink } from "react-router-dom";
import { NAV_LINKS } from "@/utils/constants";
import { Box } from "@mantine/core";

import FrameLogo3 from "@/assets/frame-logo3.svg?react";
import FrameLogo4 from "@/assets/frame-logo4.svg?react";

const Sidebar: React.FC = () => {
  return (
    <Box
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: "30px",
      }}
    >
      <Box style={{ display: "flex", alignItems: "flex-end", gap: "6px", marginLeft: "15px" }}>
        <FrameLogo3 style={{ width: "25px", height: "auto" }} />
        <FrameLogo4 style={{ width: "75px", height: "auto" }} />
      </Box>

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "0px",
        }}
      >
        {NAV_LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.link}
              to={item.link}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "flex-start",
                gap: "10px",
                textDecoration: "none",
                fontSize: "10px",
                fontWeight: 400,
                padding: "7px 12px",
                borderRadius: "8px",
                letterSpacing: "0.4px",
                color: "var(--light-100)",
                backgroundColor: isActive ? "var(--dark-500)" : "transparent",
                marginBottom: isActive ? "5px" : "0px",
                transition: "all 0.2s ease",
              })}
            >
              <Icon style={{ width: "12px", height: "12px", marginTop: "1px" }} />
              {item.label}
            </NavLink>
          );
        })}
      </Box>
    </Box>
  );
}

export default Sidebar;
