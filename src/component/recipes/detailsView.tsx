import { Box } from "@mantine/core";
import { type FC } from "react";

import DetailsInfo from "./detailsInfo";

const styles = {
  wrapper: {
    width: "98.5%",
    margin: "0 auto",
    gap: 6,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 12,
  },
} as const;

const DetailsView: FC = () => {
  return (
    <Box p={3} style={styles.wrapper}>
      <DetailsInfo />
    </Box>
  );
};

export default DetailsView;
