import { Box, Text, Popover } from "@mantine/core";
import {
  useState,
  forwardRef,
  useImperativeHandle,
  type CSSProperties,
  memo,
  type FC,
} from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";

interface MealItem {
  id: number;
  name: string;
  note: string;
  type: "Breakfast" | "Lunch" | "Dinner";
  status: "Planned" | "Completed";
  image: string;
  recipesCount: number;
}

interface DayMeals {
  dayNumber: number; // Day of month (1-31)
  meals: MealItem[];
}

export interface CalendarViewHandle {
  scrollTop?: () => void;
}

interface CalendarViewProps {
  statusFilter?: "All" | "Planned" | "Completed";
  mealTypeFilter?: "All" | "Breakfast" | "Lunch" | "Dinner";
}

// Example: first week of month
const initialData: DayMeals[] = [
  { dayNumber: 1, meals: [{ id: 1, name: "Pancakes", note: "Delicious", type: "Breakfast", status: "Planned", image: BestImg1, recipesCount: 2 }] },
  { dayNumber: 2, meals: [{ id: 2, name: "Salad", note: "Fresh", type: "Lunch", status: "Completed", image: BestImg2, recipesCount: 1 }] },
  { dayNumber: 3, meals: [{ id: 3, name: "Steak", note: "Juicy", type: "Dinner", status: "Planned", image: BestImg3, recipesCount: 3 }] },
  { dayNumber: 4, meals: [] },
  { dayNumber: 5, meals: [] },
  { dayNumber: 6, meals: [] },
  { dayNumber: 7, meals: [] },
];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 8,
    padding: 8,
  },
  headerCell: {
    textAlign: "center",
    fontSize: 10,
    fontWeight: 600,
    color: "var(--light-200)",
    borderBottom: "1px solid var(--dark-10)",
    padding: 4,
  },
  dayCell: {
    minHeight: 120,
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 6,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  dayNumber: {
    fontSize: 10,
    fontWeight: 600,
    color: "var(--light-200)",
  },
  mealCard: {
    backgroundColor: "var(--dark-30)",
    borderRadius: 6,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mealName: { fontSize: 9, fontWeight: 500, color: "var(--light-100)" },
};

const MealCard: FC<{ meal: MealItem }> = ({ meal }) => (
  <Box style={styles.mealCard}>
    <Text style={styles.mealName}>{meal.name}</Text>
  </Box>
);

const CalendarView = forwardRef<CalendarViewHandle, CalendarViewProps>(
  ({ statusFilter = "All", mealTypeFilter = "All" }, ref) => {
    const [data, setData] = useState<DayMeals[]>(initialData);

    useImperativeHandle(ref, () => ({
      scrollTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    }));

    const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Create a 4-week calendar (28 days)
    const calendarDays: DayMeals[] = [];
    for (let i = 0; i < 28; i++) {
      const existing = data.find(d => d.dayNumber === i + 1);
      calendarDays.push(existing || { dayNumber: i + 1, meals: [] });
    }

    return (
      <Box style={styles.wrapper}>
        {/* Weekday header */}
        {weekdays.map(day => (
          <Box key={day} style={styles.headerCell}>{day}</Box>
        ))}

        {/* Calendar days */}
        {calendarDays.map(day => (
          <Box key={day.dayNumber} style={styles.dayCell}>
            <Text style={styles.dayNumber}>{day.dayNumber}</Text>
            {day.meals
              .filter(meal => mealTypeFilter === "All" || meal.type === mealTypeFilter)
              .filter(meal => statusFilter === "All" || meal.status === statusFilter)
              .map(meal => (
                <MealCard key={meal.id} meal={meal} />
              ))}
          </Box>
        ))}
      </Box>
    );
  }
);

CalendarView.displayName = "CalendarView";
export default CalendarView;
