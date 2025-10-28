import { Box, Text, Popover } from "@mantine/core";
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  useEffect,
  memo,
  type CSSProperties,
  type FC,
} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AddIcon from "@/assets/icons/add";
import BoxIcon from "@/assets/icons/box";
import MenuIcon from "@/assets/icons/menu";
import TagIcon from "@/assets/icons/tag";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";

import AddMealModal from "./addMeal";

export interface BoardViewHandle {
  scrollLeft: () => void;
  scrollRight: () => void;
  getScrollInfo: () => { scrollLeft: number; maxScrollLeft: number };
}

interface BoardViewProps {
  statusFilter?: "All" | string;
  mealTypeFilter?: "All" | "Breakfast" | "Lunch" | "Dinner";
  arrowState?: "Prev" | "Next";
}

export interface MealItem {
  id: number;
  name: string;
  note: string;
  type: "Breakfast" | "Lunch" | "Dinner";
  status: string; // category
  image: string;
  recipesCount: number;
}

interface Column {
  day: string;
  meals: MealItem[];
}

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const mealTypeOrder: Record<MealItem["type"], number> = {
  Breakfast: 1,
  Lunch: 2,
  Dinner: 3,
};

const mealStatusOrder: Record<string, number> = {
  Planned: 1,
  Completed: 2,
};

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
    display: "flex",
    gap: 15,
    padding: 8,
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
  column: {
    flex: "0 0 220px",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    padding: 4,
  },
  columnHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 4,
    color: "var(--light-200)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: 4,
  },
  addIcon: { cursor: "pointer" },
  mealCard: {
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 8,
    display: "flex",
    flexDirection: "column",
    gap: 6,
    cursor: "pointer",
  },
  mealTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusBox: {
    padding: "2px 6px",
    borderRadius: 4,
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    fontSize: 8,
    color: "var(--light-200)",
    cursor: "pointer",
  },
  mealImage: {
    width: "100%",
    height: 80,
    borderRadius: 6,
    border: "2px solid var(--dark-30)",
    objectFit: "cover",
    marginBottom: 6,
  },
  mealInfo: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  mealName: {
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },
  mealNote: {
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-100)",
  },
  tagText: {
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-100)",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  popoverItem: {
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-100)",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "transparent",
    transition: "background-color 0.2s",
  },
};

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}
const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick }) => (
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
  day: string;
  toggleStatus: (day: string, mealId: number) => void;
  handleDelete: (mealId: number, day: string) => void;
}

const MealCard: FC<MealCardProps> = ({ meal, day, toggleStatus, handleDelete }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/recipes");
  }, [navigate]);

  const handleToggleStatus = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      toggleStatus(day, meal.id);
    },
    [day, meal.id, toggleStatus]
  );

  return (
    <Box style={styles.mealCard}>
      <Box style={styles.mealTop}>
        <Box style={{ display: "flex", gap: 4 }}>
          <Box style={styles.statusBox} onClick={handleToggleStatus}>
            {meal.status}
          </Box>
          <Box style={styles.statusBox}>{meal.type}</Box>
        </Box>

        <Popover width={100} position="bottom" shadow="md">
          <Popover.Target>
            <Box style={{ cursor: "pointer" }} onClick={(e) => e.stopPropagation()}>
              <MenuIcon width={10} height={10} color="var(--light-100)" />
            </Box>
          </Popover.Target>
          <Popover.Dropdown
            style={{
              width: 60,
              padding: 2,
              backgroundColor: "var(--dark-30)",
              border: "1px solid var(--dark-10)",
              borderRadius: 6,
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginLeft: "-20px",
              marginTop: "-2px",
            }}
          >
            <PopoverItem label="Delete" onClick={() => handleDelete(meal.id, day)} />
          </Popover.Dropdown>
        </Popover>
      </Box>

      <Box onClick={handleNavigate}>
        <img src={meal.image} alt={meal.name} style={styles.mealImage} />
        <Box style={styles.mealInfo}>
          <Text style={styles.mealName}>{meal.name}</Text>
          <Text style={styles.mealNote}>
            {meal.note.length > 80 ? `${meal.note.slice(0, 80)}...` : meal.note}
          </Text>
          <Box style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <TagIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.tagText}>{meal.recipesCount} recipes</Text>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const BoardView = forwardRef<BoardViewHandle, BoardViewProps>(
  ({ statusFilter = "All", mealTypeFilter = "All", arrowState }, ref) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState<Column[]>([]);
    const [addModalOpened, setAddModalOpened] = useState(false);
    const [selectedDay, setSelectedDay] = useState<string>();

    const fetchMeals = useCallback(async () => {
      try {
        const { data } = await axios.get("http://127.0.0.1:8000/api/meal-calendar/");

        const grouped: Record<string, MealItem[]> = {};
        data.forEach((meal: any) => {
          const date = new Date(meal.date_added);
          const day = DAYS[date.getDay()];

          let type: MealItem["type"] = "Lunch";
          const hour = date.getHours();
          if (hour >= 5 && hour < 11) type = "Breakfast";
          else if (hour >= 11 && hour < 17) type = "Lunch";
          else type = "Dinner";

          const mealItem: MealItem = {
            id: meal.id,
            name: meal.title,
            note: meal.instructions,
            type,
            status: meal.category || "Planned",
            image: meal.thumbnail || BestImg1,
            recipesCount: 1,
          };

          if (!grouped[day]) grouped[day] = [];
          grouped[day].push(mealItem);
        });

        const columnsData: Column[] = DAYS.map((day) => ({
          day,
          meals: grouped[day] || [],
        }));

        setColumns(columnsData);
      } catch (err) {
        console.error("Error fetching meal calendar:", err);
      }
    }, []);

    useEffect(() => {
      fetchMeals();
    }, [fetchMeals]);

    const toggleMealStatus = useCallback((day: string, mealId: number) => {
      setColumns((prev) =>
        prev.map((col) =>
          col.day === day
            ? {
                ...col,
                meals: col.meals.map((meal) =>
                  meal.id === mealId
                    ? {
                        ...meal,
                        status: meal.status === "Planned" ? "Completed" : "Planned",
                      }
                    : meal
                ),
              }
            : col
        )
      );
    }, []);

    const handleDelete = useCallback(async (mealId: number, day: string) => {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/meal-calendar/${mealId}/`);
        setColumns((prev) =>
          prev.map((col) =>
            col.day === day
              ? { ...col, meals: col.meals.filter((meal) => meal.id !== mealId) }
              : col
          )
        );
      } catch (err) {
        console.error("Error deleting meal:", err);
      }
    }, []);

    const openAddModal = useCallback((day: string) => {
      setSelectedDay(day);
      setAddModalOpened(true);
    }, []);
    const closeAddModal = useCallback(() => setAddModalOpened(false), []);

    useImperativeHandle(ref, () => ({
      scrollLeft: () =>
        wrapperRef.current?.scrollBy({ left: -300, behavior: "smooth" }),
      scrollRight: () =>
        wrapperRef.current?.scrollBy({ left: 300, behavior: "smooth" }),
      getScrollInfo: () => {
        if (!wrapperRef.current) return { scrollLeft: 0, maxScrollLeft: 0 };
        const { scrollLeft, scrollWidth, clientWidth } = wrapperRef.current;
        return { scrollLeft, maxScrollLeft: scrollWidth - clientWidth };
      },
    }));

    useEffect(() => {
      if (!arrowState || !wrapperRef.current) return;
      const scrollAmount = arrowState === "Prev" ? -300 : 300;
      wrapperRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }, [arrowState]);

    return (
      <>
        <Box ref={wrapperRef} style={styles.wrapper}>
          {columns.map((col) => (
            <Box key={col.day} style={styles.column}>
              <Box style={styles.columnHeader}>
                <Box style={styles.headerLeft}>
                  <BoxIcon width={12} height={12} />
                  <Text style={{ fontSize: 9.5, fontWeight: 450 }}>{col.day}</Text>
                </Box>
                <AddIcon
                  width={10}
                  height={10}
                  style={styles.addIcon}
                  onClick={() => openAddModal(col.day)}
                />
              </Box>

              {col.meals
                .filter((meal) => mealTypeFilter === "All" || meal.type === mealTypeFilter)
                .filter((meal) => statusFilter === "All" || meal.status === statusFilter)
                .sort((a, b) =>
                  mealTypeOrder[a.type] !== mealTypeOrder[b.type]
                    ? mealTypeOrder[a.type] - mealTypeOrder[b.type]
                    : (mealStatusOrder[a.status] || 0) - (mealStatusOrder[b.status] || 0)
                )
                .map((meal) => (
                  <MealCard
                    key={meal.id}
                    meal={meal}
                    day={col.day}
                    toggleStatus={toggleMealStatus}
                    handleDelete={handleDelete}
                  />
                ))}
            </Box>
          ))}
        </Box>

        <AddMealModal opened={addModalOpened} onClose={closeAddModal} day={selectedDay} />
      </>
    );
  }
);

BoardView.displayName = "BoardView";
export default BoardView;
