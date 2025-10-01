import { Box, Grid, Paper, Text } from "@mantine/core";

import Info from "@/component/dashboard/info";
import Classes from "@/component/dashboard/classes";
import MonthlyRecipes from "@/component/dashboard/monthlyRecipes";
import WeeklyBest from "@/component/dashboard/weeklyBest";
import DailyMenu from "./dailyMenu";
import RecentList from "./recentList";

type CardProps = {
  title: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <Paper
      shadow="sm"
      radius="md"
      p="sm"
      style={{
        backgroundColor: "var(--dark-20)",
        border: "0.5px solid var(--border-100)",
        borderRadius: "8px",
        height: "100%",
      }}
    >
      <Text size="sm" fw={500} c="var(--light-100)">
        {title}
      </Text>
    </Paper>
  );
};

const Dashboards: React.FC = () => {
  return (
    <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {/* 1️⃣ Top info bar */}
      <Grid gutter={10} m={0} style={{ width: "100%" }}>
        <Grid.Col span={12}>
          <Card title={<Info />} />
        </Grid.Col>
      </Grid>

      {/* 2️⃣ Replace Carbs/Proteins/Dairy with Classes */}
      <Grid gutter={10} m={0} style={{ width: "100%" }}>
        <Grid.Col span={12}>
         <Classes />
        </Grid.Col>
      </Grid>

   <Grid gutter={10} m={0} style={{ width: "100%" }}>
  <Grid.Col
    span={{ base: 12, md: 6 }}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <MonthlyRecipes />
    </Box>
  </Grid.Col>

  <Grid.Col
    span={{ base: 12, md: 3 }}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <WeeklyBest />
    </Box>
  </Grid.Col>

  <Grid.Col
    span={{ base: 12, md: 3 }}
    style={{ display: "flex", flexDirection: "column" }}
  >
    <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <DailyMenu />
    </Box>
  </Grid.Col>
</Grid>



      {/* 4️⃣ Shopping */}
      <Grid gutter={10} m={0} style={{ width: "100%" }}>
        <Grid.Col span={{ base: 12, md: 9 }}style={{ display: "flex", flexDirection: "column" }}
  >
    <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <RecentList />
    </Box>
        </Grid.Col>
         <Grid.Col span={{ base: 12, md: 3 }}style={{ display: "flex", flexDirection: "column" }}
  >
    <Box style={{ flex: 1, display: "flex", flexDirection: "column" }}>
      <Card title="Shopping Map" />
    </Box>
        </Grid.Col>
     
      </Grid>
    </Box>
  );
};

export default Dashboards;
