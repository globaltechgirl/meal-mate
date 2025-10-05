import { Box, Text, } from "@mantine/core";
import { type FC, } from "react";

import DetailsView from "./detailsView";

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 4,
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 8px",
  },
  headerText: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--light-100)",
  },
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 1,
  },
  disabledIcon: {
    opacity: 0.4,
    cursor: "not-allowed",
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    padding: "0 8px 0 6px",
    background: "var(--dark-30)",
    cursor: "pointer",
    height: 24,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },
} as const;

const MainDetails: FC = () => {
  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>
      </Box>

      <Box>
        <DetailsView />
      </Box>
    </Box>
  );
};

export default MainDetails;
