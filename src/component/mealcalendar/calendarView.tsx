import { Box, Text } from "@mantine/core";
import { forwardRef, memo, useImperativeHandle, useMemo, useState, type CSSProperties, type FC, } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import DotIcon from "@/assets/icons/dot";

type MealType = "Breakfast" | "Lunch" | "Dinner";
type Status = "Planned" | "Completed";

export interface CalendarViewHandle {
  scrollTop?: () => void;
}

type MealItem = {
  id: number;
  name: string;
  note: string;
  type: MealType;
  status: Status;
  image: string;
  recipesCount: number;
  createdDate: string;
};

type DayMeals = {
  dayNumber: number;
  meals: MealItem[];
};

type CalendarViewProps = {
  year: number;
  month: number;
  statusFilter?: "All" | Status;
  mealTypeFilter?: "All" | MealType;
};

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "98.5%",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: 4,
    marginTop: 10,
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
    minHeight: 100,
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 6,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    cursor: "pointer",
  },
  dayNumber: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-200)",
  },
  mealCard: {
    backgroundColor: "var(--dark-30)",
    borderRadius: 5,
    border: "1px solid var(--dark-10)",
    padding: "4px 6px",
    display: "flex",
    flexDirection: "column",
    gap: 2,
    cursor: "pointer",
  },
  mealHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mealNameWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    maxWidth: "70%",
    overflow: "hidden",
  },
  mealName: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  mealTime: {
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-200)",
  },
  moreLink: {
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--blue-100)",
    marginTop: 2,
    marginLeft: 2,
  },
};

const formatTime = (dateStr: string): string =>
  new Date(dateStr).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

const truncate = (text: string, max: number): string =>
  text.length > max ? `${text.slice(0, max)}...` : text;

const MealCard: FC<{ meal: MealItem }> = memo(({ meal }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate("/shopping-list");
  };

  return (
    <Box style={styles.mealCard} onClick={handleClick}>
      <Box style={styles.mealHeader}>
        <Box style={styles.mealNameWrapper}>
          {meal.status === "Planned" && (
            <DotIcon width={10} height={10} color="var(--light-100)" />
          )}
          <Text style={styles.mealName}>{truncate(meal.name, 10)}</Text>
        </Box>
        {!isSmallScreen && !isMediumScreen && (
          <Text style={styles.mealTime}>{formatTime(meal.createdDate)}</Text>
        )}
      </Box>
    </Box>
  );
});
MealCard.displayName = "MealCard";

const DayCell: FC<{ day: DayMeals }> = memo(({ day }) => {
  const [expanded, setExpanded] = useState(false);

  if (day.dayNumber === 0) return <Box style={styles.dayCell} />;

  const visibleMeals = expanded ? day.meals : day.meals.slice(0, 3);
  const remainingMeals = day.meals.length - 3;

  return (
    <Box style={styles.dayCell} onClick={() => setExpanded((prev) => !prev)}>
      <Text style={styles.dayNumber}>{day.dayNumber}</Text>
      {visibleMeals.map((meal) => (
        <MealCard key={meal.id} meal={meal} />
      ))}
      {!expanded && remainingMeals > 0 && (
        <Text style={styles.moreLink}>{remainingMeals} more...</Text>
      )}
    </Box>
  );
});
DayCell.displayName = "DayCell";

const CalendarView = forwardRef<CalendarViewHandle, CalendarViewProps>(
  ({ year, month, statusFilter = "All", mealTypeFilter = "All" }, ref) => {
    useImperativeHandle(ref, () => ({
      scrollTop: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    }));

    const weekdays = useMemo(
      () => ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      []
    );

    const sampleMeals: MealItem[] = useMemo(
      () => [
        {
          id: 1,
          name: "Pancakes with Maple Syrup",
          note: "",
          type: "Breakfast",
          status: "Planned",
          image: "",
          recipesCount: 2,
          createdDate: "2025-10-01T09:00:00",
        },
        {
          id: 2,
          name: "Salad",
          note: "",
          type: "Lunch",
          status: "Completed",
          image: "",
          recipesCount: 1,
          createdDate: "2025-10-01T13:00:00",
        },
        {
          id: 3,
          name: "Steak",
          note: "",
          type: "Dinner",
          status: "Planned",
          image: "",
          recipesCount: 3,
          createdDate: "2025-10-01T19:00:00",
        },
        {
          id: 4,
          name: "Soup with Bread and Extra Toppings",
          note: "",
          type: "Dinner",
          status: "Planned",
          image: "",
          recipesCount: 1,
          createdDate: "2025-10-01T20:30:00",
        },
        {
          id: 5,
          name: "Omelette",
          note: "",
          type: "Breakfast",
          status: "Planned",
          image: "",
          recipesCount: 1,
          createdDate: "2025-11-01T08:30:00",
        },
      ],
      []
    );

    const calendarDays: DayMeals[] = useMemo(() => {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();
      const startOffset = firstDay === 0 ? 6 : firstDay - 1;

      const days: DayMeals[] = [];

      for (let i = 0; i < startOffset; i++) {
        days.push({ dayNumber: 0, meals: [] });
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(
          d
        ).padStart(2, "0")}`;
        const meals = sampleMeals.filter(
          (meal) =>
            meal.createdDate.startsWith(dateKey) &&
            (mealTypeFilter === "All" || meal.type === mealTypeFilter) &&
            (statusFilter === "All" || meal.status === statusFilter)
        );

        days.push({ dayNumber: d, meals });
      }

      return days;
    }, [year, month, statusFilter, mealTypeFilter, sampleMeals]);

    return (
      <Box style={styles.wrapper}>
        {weekdays.map((day) => (
          <Box key={day} style={styles.headerCell}>
            {day}
          </Box>
        ))}
        {calendarDays.map((day, index) => (
          <DayCell key={index} day={day} />
        ))}
      </Box>
    );
  }
);

CalendarView.displayName = "CalendarView";
export default CalendarView;
