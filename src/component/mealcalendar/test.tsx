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
  day: string; // Mon, Tue...
  meals: MealItem[];
}

export interface CalendarViewHandle {
  scrollTop?: () => void;
}

interface CalendarViewProps {
  statusFilter?: "All" | "Planned" | "Completed";
  mealTypeFilter?: "All" | "Breakfast" | "Lunch" | "Dinner";
}

const initialData: DayMeals[] = [
  { day: "Mon", meals: [{ id: 1, name: "Pancakes", note: "Delicious", type: "Breakfast", status: "Planned", image: BestImg1, recipesCount: 2 }] },
  { day: "Tue", meals: [{ id: 2, name: "Salad", note: "Fresh", type: "Lunch", status: "Completed", image: BestImg2, recipesCount: 1 }] },
  { day: "Wed", meals: [{ id: 3, name: "Steak", note: "Juicy", type: "Dinner", status: "Planned", image: BestImg3, recipesCount: 3 }] },
  { day: "Thu", meals: [] },
  { day: "Fri", meals: [] },
  { day: "Sat", meals: [] },
  { day: "Sun", meals: [] },
];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gridTemplateRows: "auto 1fr 1fr 1fr 1fr",
    gap: 4,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    padding: 4,
  },
  headerCell: {
    textAlign: "center",
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-200)",
    borderBottom: "1px solid var(--dark-10)",
    padding: 4,
  },
  dayCell: {
    minHeight: 50,
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 2,
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  statusBox: {
    padding: "2px 6px",
    borderRadius: 5,
    backgroundColor: "var(--dark-30)",
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    textAlign: "center",
    cursor: "pointer",
  },
  mealCard: {
    backgroundColor: "var(--dark-30)",
    borderRadius: 6,
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  mealImage: { width: "100%", height: 60, objectFit: "cover", borderRadius: 4 },
  mealName: { fontSize: 9, fontWeight: 500, color: "var(--light-100)" },
  mealNote: { fontSize: 8, color: "var(--light-100)" },
  tagText: { fontSize: 8, color: "var(--light-100)", display: "flex", alignItems: "center", gap: 2 },
  popoverItem: { fontSize: 8, color: "var(--light-100)", padding: "2px 4px", cursor: "pointer" },
};

const PopoverItem = memo(({ label, onClick }: { label: string; onClick: () => void }) => (
  <Box
    style={styles.popoverItem}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--dark-20)")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {label}
  </Box>
));

interface MealCardProps {
  meal: MealItem;
  toggleStatus: (mealId: number) => void;
}

const MealCard: FC<MealCardProps> = ({ meal, toggleStatus }) => (
  <Box style={styles.mealCard}>
    <Text style={styles.mealName}>{meal.name}</Text>
  </Box>
);

const CalendarView = forwardRef<CalendarViewHandle, CalendarViewProps>(
  ({ statusFilter = "All", mealTypeFilter = "All" }, ref) => {
    const [data, setData] = useState<DayMeals[]>(initialData);

    const toggleMealStatus = (mealId: number) => {
      setData((prev) =>
        prev.map((day) => ({
          ...day,
          meals: day.meals.map((meal: MealItem) =>
            meal.id === mealId
              ? { ...meal, status: meal.status === "Planned" ? "Completed" : "Planned" }
              : meal
          ),
        }))
      );
    };

    useImperativeHandle(ref, () => ({
      scrollTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    }));

    const weekdays: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    return (
      <Box style={styles.wrapper}>
        {/* Header row */}
        {weekdays.map((day) => (
          <Box key={day} style={styles.headerCell}>{day}</Box>
        ))}

        {/* 4 rows × 7 columns */}
        {Array.from({ length: 4 }).map((_, rowIdx) =>
          weekdays.map((_, colIdx) => {
            const dayData: DayMeals | undefined = data[colIdx];
            return (
              <Box key={`${rowIdx}-${colIdx}`} style={styles.dayCell}>
                {dayData?.meals
                  .filter((meal: MealItem) => mealTypeFilter === "All" || meal.type === mealTypeFilter)
                  .filter((meal: MealItem) => statusFilter === "All" || meal.status === statusFilter)
                  .map((meal: MealItem) => (
                    <MealCard key={meal.id} meal={meal} toggleStatus={toggleMealStatus} />
                  ))}
              </Box>
            );
          })
        )}
      </Box>
    );
  }
);

CalendarView.displayName = "CalendarView";
export default CalendarView;
