import { Box, Text, Avatar } from "@mantine/core";
import { useState, type ChangeEvent, type FC } from "react";

import SearchIcon from "@/assets/icons/search";
import BellIcon from "@/assets/icons/bell";
import SunIcon from "@/assets/icons/sun";
import ProfileImg from "@/assets/profile-img.svg";

const styles = {
  infoBar: {
    width: "100%",
    height: "25px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "var(--dark-20)",
  } as React.CSSProperties,

  text: {
    fontSize: "10px",
    fontWeight: 400,
    color: "var(--light-100)",
  } as React.CSSProperties,

  rightWrapper: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  } as React.CSSProperties,

  searchWrapper: {
    display: "flex",
    alignItems: "center",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: "6px",
    height: "28px",
    padding: "0 8px",
  } as React.CSSProperties,

  searchInput: {
    border: "none",
    outline: "none",
    background: "transparent",
    fontSize: "10px",
    fontWeight: 400,
    color: "var(--light-100)",
    marginTop: "1px",
    paddingLeft: "6px",
    width: "120px",
  } as React.CSSProperties,

  iconCircle: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  } as React.CSSProperties,
};

interface IconCircleProps {
  children: React.ReactNode;
}

const IconCircle: FC<IconCircleProps> = ({ children }) => (
  <Box style={styles.iconCircle}>{children}</Box>
);

const Info: FC = () => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box style={styles.infoBar}>
      <Text style={styles.text}>
        Tolani Bajo. Welcome back to Meal Mate!
      </Text>

      <Box style={styles.rightWrapper}>
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

        <IconCircle>
          <Avatar src={ProfileImg} radius="xl" size={20} />
        </IconCircle>
      </Box>
    </Box>
  );
};

export default Info;
