import { Box, Grid, Paper, Text } from "@mantine/core";

import Info from "@/component/layout/info";
import Classes from "@/component/dashboard/classes";
import MonthlyRecipes from "@/component/dashboard/monthlyRecipes";
import WeeklyBest from "@/component/dashboard/weeklyBest";
import DailyMenu from "./dailyMenu";
import RecentList from "./recentList";
import ShoppingMap from "./shoppingMap";

type CardProps = {
  title: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title }) => (
  <Paper
    shadow="sm"
    radius="md"
    p="sm"
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

const Dashboards: React.FC = () => (
  <Box style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    <Grid gutter={10} m={0}>
      <Grid.Col span={12}>
        <Card title={<Info />} />
      </Grid.Col>
    </Grid>

    <Grid gutter={10} m={0}>
      <Grid.Col span={12}>
        <Classes />
      </Grid.Col>
    </Grid>

    <Grid gutter={10} m={0}>
      <Grid.Col span={{ base: 12, md: 6 }}>
        <MonthlyRecipes />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <WeeklyBest />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <DailyMenu />
      </Grid.Col>
    </Grid>

    <Grid gutter={10} m={0}>
      <Grid.Col span={{ base: 12, md: 9 }}>
        <RecentList />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 3 }}>
        <ShoppingMap />
      </Grid.Col>
    </Grid>
  </Box>
);

export default Dashboards;
