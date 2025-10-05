import { Box, Grid, Paper, Text } from "@mantine/core";

import Info from "@/component/layout/info";
import MainRecipes from "./mainRecipes";

type CardProps = {
  title: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title }) => (
  <Paper
    shadow="sm"
    radius="md"
    style={{
      backgroundColor: "var(--dark-20)",
      border: "0.5px solid var(--border-100)",
      height: "100%",
    }}
  >
    <Text size="sm" fw={500} c="var(--light-100)">
      {title}
    </Text>
  </Paper>
);

const Recipess: React.FC = () => (
  <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <Grid gutter={10} m={0}>
      <Grid.Col span={12}>
        <Card title={<Info />} />
      </Grid.Col>
    </Grid>

    <Grid gutter={10} m={0}>
      <Grid.Col span={12}>
        <Card title={<MainRecipes />} />
      </Grid.Col>
    </Grid>
  </Box>
);

export default Recipess;
