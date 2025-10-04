import { Box, Text } from "@mantine/core";
import { useState, type FC, useMemo } from "react";
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
    padding: "10px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px",
    flex: 1,
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: "10.5px",
    fontWeight: 500,
    color: "var(--light-100)",
  },

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
    flex: 1,
    flexDirection: "row",
    gap: "8px",
    alignItems: "stretch",
    marginTop: "10px",
  } as const,

  chartInner: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative" as const,
  },
};

interface DataPoint {
  label: string;
  value: number;
}

type Range = "1W" | "1M";

interface CustomTooltipProps {
  active?: boolean;
  label?: string;
  payload?: { value: number; label?: string }[];
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
};

// Y-axis domains
const yDomainMap: Record<Range, [number, number]> = {
  "1W": [0.8, 10],
  "1M": [7.8, 100],
};

const CustomTooltip: FC<CustomTooltipProps & { range: Range }> = ({
  active,
  payload,
  label,
  range,
}) => {
  if (!active || !payload || !payload.length) return null;

  const actualDataPoint = recipeData[range].find((d) => d.label === label);
  const actualValue = actualDataPoint?.value ?? payload[0].value;

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
      {label} : {actualValue}
    </div>
  );
};
const todayLabel = new Date().toLocaleDateString("en-US", { weekday: "short" });

// Get current week of the month (1-4)
const getCurrentWeekLabel = (): string => {
  const today = new Date();
  const dayOfMonth = today.getDate();
  const weekNumber = Math.ceil(dayOfMonth / 7);
  return `W${weekNumber}`;
};
// Custom bar shape with balls inside
const BarWithBalls: FC<{ x: number; y: number; width: number; height: number; value: number; payload: any; range: Range }> = ({
  x,
  y,
  width,
  height,
  value,
  payload,
  range,
}) => {
  // Scale factor: 1W = 1 unit/ball, 1M = 10 units/ball
  const scaleFactor = range === "1M" ? 10 : 1;
  const ballCount = Math.max(1, Math.round(value / scaleFactor));

  const ballRadius = 4;
  const gap = 2;
  let isActive = false;
  if (range === "1W") {
    isActive = payload?.label === todayLabel;
  } else if (range === "1M") {
    const currentWeek = getCurrentWeekLabel();
    isActive = payload?.label === currentWeek;
  }

  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="transparent" rx={6} ry={6} />
      {Array.from({ length: ballCount }).map((_, i) => {
        const cy = y + height - (i * (ballRadius * 6.5 + gap) + ballRadius);
        return (
          <circle
            key={i}
            cx={x + width / 2}
            cy={cy}
            r={ballRadius}
           fill={isActive ? "var(--mild-500)" : "url(#barGradient)"}
          />
        );
      })}
    </g>
  );
};

const ShoppingMap: FC = () => {
  const [range, setRange] = useState<Range>("1W");

  // Clamp data values so they don't exceed domain max
  const clampedData = useMemo(() => {
    const max = range === "1W" ? 10 : 100;
    return recipeData[range].map((d) => ({
      ...d,
      value: Math.min(d.value, max),
    }));
  }, [range]);

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.title}>Shopping Map</Text>
        <Box style={styles.tabs}>
          {(["1W", "1M"] as Range[]).map((r) => (
            <Box key={r} style={styles.tab(range === r)} onClick={() => setRange(r)}>
              {r}
            </Box>
          ))}
        </Box>
      </Box>

      <Box style={styles.chartRow}>
        <Box style={styles.chartInner}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={clampedData} margin={{ top: 4, right: 0, left: -38, bottom: 0 }}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--mild-500)" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="var(--mild-500)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="var(--dark-30)" />
              <XAxis
                dataKey="label"
                tick={{ fill: "var(--light-200)", fontSize: 8.5, fontWeight: 400, dy: 8 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                domain={yDomainMap[range]}
                ticks={
                  range === "1W"
                    ? Array.from({ length: 10 }, (_, i) => i + 1)
                    : Array.from({ length: 10 }, (_, i) => (i + 1) * 10)
                }
                tick={{ fill: "var(--light-200)", fontSize: 8.5, fontWeight: 400 }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                interval={0}
              />

              <Tooltip cursor={false} content={<CustomTooltip range={range} />} />
              <Bar
                dataKey="value"
                shape={<BarWithBalls range={range} />}
                isAnimationActive={false}
              />
              
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default ShoppingMap;
