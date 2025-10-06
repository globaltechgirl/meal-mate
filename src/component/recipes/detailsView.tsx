import { Box, Grid } from "@mantine/core";
import type { FC, CSSProperties } from "react";

import DetailsInfo from "./detailsInfo";
import DetailsIngredients from "./detailsIngredients";
import DetailsUtensils from "./detailsUtensils";
import DetailsInstructions from "./detailsInstructions";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "98.5%",
    margin: "0 auto",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 12,
    padding: 15,
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
};

const DetailsView: FC = () => {
  return (
    <Box style={styles.wrapper}>
      <Grid gutter="sm">
        <Grid.Col span={12}>
          <DetailsInfo />
        </Grid.Col>
      </Grid>

      <Grid gutter="sm">
        <Grid.Col span={6}>
          <DetailsUtensils />
        </Grid.Col>
        <Grid.Col span={6}>
          <DetailsIngredients />
        </Grid.Col>
      </Grid>

      <Grid gutter="sm">
        <Grid.Col span={12}>
          <DetailsInstructions />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DetailsView;
