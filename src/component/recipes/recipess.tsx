import { type FC, type CSSProperties, type ReactNode } from "react";
import { Box, Grid, Paper } from "@mantine/core";

import Info from "@/component/layout/info";
import MainRecipes from "./mainRecipes";

interface CardProps {
  children: ReactNode;
}

const Card: FC<CardProps> = ({ children }) => (
  <Paper
    radius="md"
    bg="var(--dark-20)"
    h="100%"
    style={{ display: "flex", flexDirection: "column", overflow: "hidden", }}
  >
    {children}
  </Paper>
);

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    height: "100%",
  },
  gridFullHeight: {
    flex: 1,
    display: "flex",
  },
  columnFullHeight: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
};

const MealCalendars: FC = () => {
  return (
    <Box style={styles.container}>
      <Grid gutter={10} m={0}>
        <Grid.Col span={12}>
          <Card><Info /></Card>
        </Grid.Col>
      </Grid>

      <Grid gutter={10} m={0} style={styles.gridFullHeight}>
        <Grid.Col span={12} style={styles.columnFullHeight}>
          <Card><MainRecipes /></Card>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default MealCalendars;
