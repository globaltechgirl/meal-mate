import { Box, Text } from "@mantine/core";
import { useState, type FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    border: "0.5px solid var(--border-100)",
    borderRadius: "8px",
    padding: "10px 10px 0 10px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  } as const,

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as const,

  title: {
    fontSize: "10.5px",
    fontWeight: 500,
    color: "var(--light-100)",
  } as const,

  tabs: {
    display: "flex",
    gap: "6px",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: "6px",
    padding: "1px",
  } as const,

  tab: (active: boolean): React.CSSProperties => ({
    fontSize: "8px",
    fontWeight: 400,
    color: "var(--light-200)",
    padding: "2px 4px",
    borderRadius: "4px",
    backgroundColor: active ? "var(--dark-20)" : "transparent",
    cursor: "pointer",
  }),

  chartRow: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    alignItems: "stretch",
  } as const,

  yLabels: {
    width: 25,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-end",
    paddingRight: 4,
    color: "var(--light-200)",
  } as const,

  chartInner: {
    flex: 1,
    height: "200px",
    position: "relative" as const,
  },
};

interface DataPoint {
  label: string;
  value: number;
}

type Range = "1W" | "1M" | "6M" | "1Y";

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number }[];
}

const recipeData: Record<Range, DataPoint[]> = {
  "1W": [
    { label: "Mon", value: 8 },
    { label: "Tue", value: 12 },
    { label: "Wed", value: 6 },
    { label: "Thu", value: 15 },
    { label: "Fri", value: 10 },
    { label: "Sat", value: 18 },
    { label: "Sun", value: 9 },
  ],
  "1M": [
    { label: "W1", value: 20 },
    { label: "W2", value: 35 },
    { label: "W3", value: 28 },
    { label: "W4", value: 40 },
  ],
  "6M": [
    { label: "Apr", value: 55 },
    { label: "May", value: 70 },
    { label: "Jun", value: 45 },
    { label: "Jul", value: 80 },
    { label: "Aug", value: 60 },
    { label: "Sep", value: 90 },
  ],
  "1Y": [
    { label: "Jan", value: 35 },
    { label: "Feb", value: 50 },
    { label: "Mar", value: 65 },
    { label: "Apr", value: 45 },
    { label: "May", value: 75 },
    { label: "Jun", value: 85 },
    { label: "Jul", value: 60 },
    { label: "Aug", value: 95 },
    { label: "Sep", value: 70 },
    { label: "Oct", value: 88 },
    { label: "Nov", value: 55 },
    { label: "Dec", value: 100 },
  ],
};

const yLabelValues = [100, 75, 50, 25, 15, ""];

const CustomTooltip: FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div
      style={{
        backgroundColor: "var(--dark-30)",
        fontSize: "8.5px",
        color: "var(--light-200)",
        border: "0.5px solid var(--dark-10)",
        borderRadius: "6px",
        padding: "2px 6px",
        whiteSpace: "nowrap",
      }}
    >
      {label} : {payload[0].value}
    </div>
  );
};

const MonthlyRecipes: FC = () => {
  const [range, setRange] = useState<Range>("1Y");
  const ranges: Range[] = ["1W", "1M", "6M", "1Y"];

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.title}>Monthly Recipes</Text>
        <Box style={styles.tabs}>
          {ranges.map((r) => (
            <Box
              key={r}
              style={styles.tab(range === r)}
              onClick={() => setRange(r)}
            >
              {r}
            </Box>
          ))}
        </Box>
      </Box>

      <Box style={styles.chartRow}>
        <Box style={styles.yLabels}>
          {yLabelValues.map((lbl) => (
            <Text
              key={lbl}
              style={{ fontSize: "8.5px", fontWeight: 400, color: "var(--light-200)" }}
            >
              {lbl}
            </Text>
          ))}
        </Box>

        <Box style={styles.chartInner}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={recipeData[range]}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--mild-200)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--mild-200)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--dark-30)" />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--light-200)", fontSize: 8.5, fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis domain={[0, 100]} hide />
              <Tooltip cursor={false} content={<CustomTooltip />} />
              <Bar
                dataKey="value"
                fill="url(#barGradient)"
                radius={[6, 6, 0, 0]}
                activeBar={{ fill: "var(--dark-30)" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default MonthlyRecipes;
