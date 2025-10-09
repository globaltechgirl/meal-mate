import { type FC, useState, useCallback, type ChangeEvent } from "react";
import { Box, Text, Avatar } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import SearchIcon from "@/assets/icons/search";
import BellIcon from "@/assets/icons/bell";
import SunIcon from "@/assets/icons/sun";
import ProfileImg from "@/assets/profile-img.svg";

interface IconCircleProps {
  children: React.ReactNode;
}

const IconCircle: FC<IconCircleProps> = ({ children }) => (
  <Box
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
    }}
  >
    {children}
  </Box>
);

const Info: FC = () => {
  const [search, setSearch] = useState("");
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value), []
  );

  const styles = {
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
    } as const,
    greetingText: {
      fontSize: 10,
      fontWeight: 450,
      color: "var(--light-100)",
    } as const,
    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: 8,
    } as const,
    searchWrapper: {
      display: "flex",
      alignItems: "center",
      background: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      borderRadius: 6,
      height: 24,
      padding: "0 8px 1px",
    } as const,
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
    } as const,
  };

  return (
    <Box p="lg" px="sm" style={styles.infoBar}>
      {!isSmallScreen && (
        <Text style={styles.greetingText}>
          Tolani Bajo. Welcome back to Meal Mate!
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
            <Avatar src={ProfileImg} radius="xl" size={20} />
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

          <IconCircle>
            <BellIcon width={12} height={12} color="var(--light-100)" />
          </IconCircle>

          <IconCircle>
            <SunIcon width={12} height={12} color="var(--light-100)" />
          </IconCircle>

          {!isSmallScreen && (
            <IconCircle>
              <Avatar src={ProfileImg} radius="xl" size={20} />
            </IconCircle>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Info;
