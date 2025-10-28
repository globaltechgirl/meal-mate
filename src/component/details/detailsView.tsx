import { type FC, type CSSProperties } from "react";
import { Box, Grid, } from "@mantine/core";

import DetailsInfo from "./detailsInfo";
import DetailsIngredientsMeasurements from "./detailsIngredients";
import DetailsInstructions from "./detailsInstructions";

const styles: Record<string, CSSProperties> = {
  container: {
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
  gridFullHeight: {
    flex: 1,
    display: "flex",
  },
};

const DetailsView: FC = () => {
  return (
    <Box style={styles.container}>
      <Grid gutter={10} m={0}>
        <Grid.Col span={12}>
          <DetailsInfo />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} m={0} style={styles.gridFullHeight}>
        <Grid.Col span={12}>
          <DetailsIngredientsMeasurements />
        </Grid.Col>
      </Grid>

      <Grid gutter={10} m={0} style={styles.gridFullHeight}>
        <Grid.Col span={12} style={styles.columnFullHeight}>
          <DetailsInstructions />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default DetailsView;
