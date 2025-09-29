import { Box, Grid, Paper, Text } from "@mantine/core";

import Info from "@/component/dashboard/info";

type CardProps = {
  title: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ title }) => {
  return (
    <Paper
      shadow="sm"
      radius="md"
      p="md"
      style={{
        backgroundColor: "var(--dark-500)",
        border: "1px solid var(--dark-400)",
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
    <Box style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Grid gutter="md" m={0} style={{ width: "100%" }}>
        <Grid.Col span={12}>
           <Card title={<Info />} />
        </Grid.Col>
      </Grid>

      {/* 2️⃣ Carbohydrate, Proteins, Dairy, Extra */}
      <Grid gutter="md" m={0} style={{ width: "100%" }}>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card title="Carbohydrate" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card title="Proteins" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card title="Dairy" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
          <Card title="Extra (Drink & Fruits)" />
        </Grid.Col>
      </Grid>

      {/* 3️⃣ Recipes */}
      <Grid gutter="md" m={0} style={{ width: "100%" }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card title="Monthly Recipes" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card title="Weekly Self Best Item" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Card title="Daily Recipe Menu" />
        </Grid.Col>
      </Grid>

      {/* 4️⃣ Shopping */}
      <Grid gutter="md" m={0} style={{ width: "100%" }}>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card title="Shopping List" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card title="Shopping Map" />
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export default Dashboards;
