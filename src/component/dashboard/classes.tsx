import { Box, Text } from "@mantine/core";
import { type FC } from "react";
import {
  AreaChart,
  Line,
  Area,
  ResponsiveContainer,
} from "recharts";

import FoodIcon from "@/assets/icons/food";

const styles = {
  classesWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
    gap: "10px",
  } as const,

  classCard: {
    backgroundColor: "var(--dark-20)",
    border: "0.5px solid var(--border-100)",
    borderRadius: "8px",
    padding: "10px 0 0 10px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
    cursor: "pointer",
  } as const,

  leftColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  } as const,

  topRow: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
  } as const,

  iconCircle: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as const,

  title: {
    fontSize: "10.5px",
    fontWeight: 500,
    color: "var(--light-100)",
  } as const,

  number: {
    fontSize: "10.5px",
    fontWeight: 600,
    color: "var(--light-100)",
  } as const,

  sinceText: {
    fontSize: "8.5px",
    fontWeight: 400,
    color: "var(--light-200)",
    marginBottom: "10px",
  } as const,

  chartWrapper: {
    width: "135px",
    height: "55px",
    marginBottom: "-10px",
  } as const,
};

interface ChartDataPoint {
  value: number;
}

interface ClassCardProps {
  icon: React.ReactNode;
  title: string;
  number: number;
  since: number;
  data: ChartDataPoint[];
}

const ClassCard: FC<ClassCardProps> = ({ icon, title, number, since, data }) => {
  const gradientId = `gradient-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Box style={styles.classCard}>
      <Box style={styles.leftColumn}>
        <Box style={styles.topRow}>
          <Box style={styles.iconCircle}>{icon}</Box>
          <Text style={styles.title}>{title}</Text>
        </Box>
        <Text style={styles.number}>{number}</Text>
        <Text style={styles.sinceText}>Since Yesterday {since}</Text>
      </Box>

      <Box style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 1, right: 0, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id={`${gradientId}-line`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mild-500)" stopOpacity={0.9} />
                <stop offset="100%" stopColor="var(--mild-500)" stopOpacity={0.2} />
              </linearGradient>

              <linearGradient id={`${gradientId}-area`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--mild-200)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="var(--mild-200)" stopOpacity={0} />
              </linearGradient>
            </defs>

            <Area type="basis" dataKey="value" stroke="none" fill={`url(#${gradientId}-area)`} />

            <Line
              type="basis"
              dataKey="value"
              stroke={`url(#${gradientId}-line)`}
              strokeWidth={2}
              dot={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

const chartData = {
  carbohydrates: [
    { value: 5 }, { value: 12 }, { value: 3 }, { value: 15 }, { value: 7 },
    { value: 18 }, { value: 6 }, { value: 14 }, { value: 4 }, { value: 17 },
    { value: 8 }, { value: 20 },
  ],
  protein: [
    { value: 6 }, { value: 14 }, { value: 9 }, { value: 18 }, { value: 7 },
    { value: 20 }, { value: 8 }, { value: 16 }, { value: 5 }, { value: 12 },
    { value: 8 }, { value: 16 },
  ],
  dairy: [
    { value: 4 }, { value: 10 }, { value: 5 }, { value: 12 }, { value: 6 },
    { value: 14 }, { value: 3 }, { value: 11 }, { value: 7 }, { value: 13 },
    { value: 9 }, { value: 12 },
  ],
  extras: [
    { value: 8 }, { value: 18 }, { value: 10 }, { value: 22 }, { value: 12 },
    { value: 20 }, { value: 11 }, { value: 25 }, { value: 9 }, { value: 21 },
    { value: 15 }, { value: 25 },
  ],
};

const Classes: FC = () => (
  <Box style={styles.classesWrapper}>
    <ClassCard
      icon={<FoodIcon width={11} height={11} color="var(--light-100)" />}
      title="Carbohydrates"
      number={10}
      since={20}
      data={chartData.carbohydrates}
    />

    <ClassCard
      icon={<FoodIcon width={11} height={11} color="var(--light-100)" />}
      title="Protein"
      number={15}
      since={25}
      data={chartData.protein}
    />

    <ClassCard
      icon={<FoodIcon width={11} height={11} color="var(--light-100)" />}
      title="Dairy"
      number={8}
      since={11}
      data={chartData.dairy}
    />

    <ClassCard
      icon={<FoodIcon width={11} height={11} color="var(--light-100)" />}
      title="Extras"
      number={20}
      since={30}
      data={chartData.extras}
    />
  </Box>
);

export default Classes;
