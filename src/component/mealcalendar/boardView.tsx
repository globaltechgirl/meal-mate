import { Box, Text, Popover } from "@mantine/core";
import {
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
  type CSSProperties,
  memo,
  type FC,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";

import AddIcon from "@/assets/icons/add";
import BoxIcon from "@/assets/icons/box";
import MenuIcon from "@/assets/icons/menu";
import TagIcon from "@/assets/icons/tag";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";

export interface BoardViewHandle {
  scrollLeft: () => void;
  scrollRight: () => void;
  getScrollInfo: () => { scrollLeft: number; maxScrollLeft: number };
}

interface BoardViewProps {
  statusFilter?: "All" | "Planned" | "Completed";
  mealTypeFilter?: "All" | "Breakfast" | "Lunch" | "Dinner";
  arrowState?: "Prev" | "Next";
}

interface MealItem {
  id: number;
  name: string;
  note: string;
  type: "Breakfast" | "Lunch" | "Dinner";
  status: "Planned" | "Completed";
  image: string;
  recipesCount: number;
}

interface Column {
  day: string;
  meals: MealItem[];
}

const initialColumns: Column[] = [
  {
    day: "Monday",
    meals: [
      { id: 1, name: "Pancakes", note: "Fluffy pancakes with maple syrup, topped with fresh berries and a sprinkle of powdered sugar for extra sweetness", type: "Breakfast", status: "Planned", image: BestImg1, recipesCount: 2 },
      { id: 2, name: "Caesar Salad", note: "Fresh lettuce with croutons, parmesan cheese, and a creamy Caesar dressing, perfect for a light lunch", type: "Lunch", status: "Completed", image: BestImg2, recipesCount: 1 },
      { id: 3, name: "Steak Dinner", note: "Juicy steak with roasted vegetables and a rich red wine sauce, served with garlic mashed potatoes", type: "Dinner", status: "Planned", image: BestImg3, recipesCount: 3 },
    ],
  },
  {
    day: "Tuesday",
    meals: [
      { id: 4, name: "Omelette", note: "Cheese and ham omelette with sautéed mushrooms, onions, and bell peppers, a hearty breakfast option", type: "Breakfast", status: "Completed", image: BestImg4, recipesCount: 1 },
      { id: 5, name: "Grilled Chicken", note: "Grilled chicken breast marinated in herbs and spices, served with quinoa salad and steamed vegetables", type: "Lunch", status: "Planned", image: BestImg5, recipesCount: 2 },
    ],
  },
  {
    day: "Wednesday",
    meals: [
      { id: 6, name: "Fruit Yogurt", note: "Greek yogurt with fresh seasonal fruits, chia seeds, and a drizzle of honey for a healthy dessert or snack", type: "Dinner", status: "Planned", image: BestImg1, recipesCount: 1 },
      { id: 7, name: "French Toast", note: "Served with fresh berries, maple syrup, and a dusting of powdered sugar, perfect for weekend breakfast", type: "Breakfast", status: "Planned", image: BestImg2, recipesCount: 2 },
      { id: 8, name: "Quinoa Salad", note: "Healthy quinoa with fresh vegetables, avocado, and a lemon vinaigrette dressing, ideal for a light and nutritious lunch", type: "Lunch", status: "Completed", image: BestImg3, recipesCount: 2 },
    ],
  },
  {
    day: "Thursday",
    meals: [
      { id: 9, name: "Grilled Salmon", note: "Served with lemon butter sauce, roasted asparagus, and garlic mashed potatoes, a delicious dinner option", type: "Dinner", status: "Planned", image: BestImg4, recipesCount: 3 },
      { id: 10, name: "Smoothie Bowl", note: "Mixed berries, banana, and granola with a dollop of Greek yogurt, topped with chia seeds and coconut flakes", type: "Breakfast", status: "Completed", image: BestImg5, recipesCount: 1 },
    ],
  },
  {
    day: "Friday",
    meals: [
      { id: 11, name: "Oatmeal", note: "Oats cooked with milk, topped with banana slices, honey, and a sprinkle of cinnamon, a comforting breakfast", type: "Breakfast", status: "Completed", image: BestImg1, recipesCount: 1 },
      { id: 12, name: "Burger", note: "Beef burger with cheese, lettuce, tomato, and a side of crispy fries, a classic dinner favorite", type: "Breakfast", status: "Planned", image: BestImg3, recipesCount: 2 },
    ],
  },
  {
    day: "Saturday",
    meals: [
      { id: 13, name: "Waffles", note: "Waffles topped with syrup, fresh berries, and whipped cream, a sweet and indulgent breakfast treat", type: "Breakfast", status: "Planned", image: BestImg4, recipesCount: 1 },
      { id: 14, name: "Caesar Wrap", note: "Grilled chicken wrap with lettuce, parmesan, and Caesar dressing, a quick and tasty lunch option", type: "Lunch", status: "Completed", image: BestImg5, recipesCount: 2 },
    ],
  },
  {
    day: "Sunday",
    meals: [
      { id: 15, name: "Salmon Salad", note: "With avocado, mixed greens, cherry tomatoes, and a light vinaigrette, perfect for a refreshing lunch", type: "Lunch", status: "Completed", image: BestImg2, recipesCount: 3 },
      { id: 16, name: "Pasta", note: "With tomato sauce, basil, and parmesan cheese, served with garlic bread for a classic Italian meal", type: "Lunch", status: "Completed", image: BestImg2, recipesCount: 2 },
      { id: 17, name: "Roast Chicken", note: "Served with roasted vegetables, gravy, and fresh herbs, a hearty dinner for the family", type: "Dinner", status: "Planned", image: BestImg3, recipesCount: 3 },
    ],
  },
];

const mealTypeOrder: Record<MealItem["type"], number> = { Breakfast: 1, Lunch: 2, Dinner: 3 };
const mealStatusOrder: Record<MealItem["status"], number> = { Planned: 1, Completed: 2 };

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    height: "100%",
    overflowX: "auto",
    overflowY: "auto",
    gap: 15,
    padding: 8,
    display: "flex",
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
    gap: 4 
  },
  addIcon: { 
    cursor: "pointer" 
  },
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
    alignItems: "center" 
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
    gap: 6 
  },
  mealName: { 
    fontSize: 9.5, 
    fontWeight: 450, 
    color: "var(--light-100)" 
  },
  mealNote: { 
    fontSize: 8, 
    fontWeight: 450, 
    color: "var(--light-100)" 
  },
  tagText: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    display: "flex",
    alignItems: "center",
    gap: 2,
  },
  popoverItem: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "transparent",
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
}
const MealCard: FC<MealCardProps> = ({ meal, day, toggleStatus }) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(() => {
    navigate("/shopping-list");
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
          <Box style={styles.statusBox} onClick={(e) => e.stopPropagation()}>
            {meal.type}
          </Box>
        </Box>

        <Popover width={100} position="bottom" shadow="md">
          <Popover.Target>
            <Box style={{ cursor: "pointer" }} onClick={(e) => e.stopPropagation()}>
              <MenuIcon width={10} height={10} />
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
            <PopoverItem label="Edit" onClick={() => console.log("Edit", meal.id)} />
            <PopoverItem label="Delete" onClick={() => console.log("Delete", meal.id)} />
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
            <TagIcon width={10} height={10} />
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
    const [columns, setColumns] = useState<Column[]>(initialColumns);

    useImperativeHandle(ref, () => ({
      scrollLeft: () => wrapperRef.current?.scrollBy({ left: -300, behavior: "smooth" }),
      scrollRight: () => wrapperRef.current?.scrollBy({ left: 300, behavior: "smooth" }),
      getScrollInfo: () => {
        if (!wrapperRef.current) return { scrollLeft: 0, maxScrollLeft: 0 };
        const scrollLeft = wrapperRef.current.scrollLeft;
        const maxScrollLeft = wrapperRef.current.scrollWidth - wrapperRef.current.clientWidth;
        return { scrollLeft, maxScrollLeft };
      },
    }));

    useEffect(() => {
      if (!arrowState || !wrapperRef.current) return;
      const scrollBy = arrowState === "Prev" ? -300 : 300;
      wrapperRef.current.scrollBy({ left: scrollBy, behavior: "smooth" });
    }, [arrowState]);

    const toggleMealStatus = useCallback((day: string, mealId: number) => {
      setColumns((prev) =>
        prev.map((col) =>
          col.day === day
            ? {
                ...col,
                meals: col.meals.map((meal) =>
                  meal.id === mealId
                    ? { ...meal, status: meal.status === "Planned" ? "Completed" : "Planned" }
                    : meal
                ),
              }
            : col
        )
      );
    }, []);

    return (
      <Box ref={wrapperRef} style={styles.wrapper}>
        {columns.map((col) => (
          <Box key={col.day} style={styles.column}>
            <Box style={styles.columnHeader}>
              <Box style={styles.headerLeft}>
                <BoxIcon width={12} height={12} style={styles.addIcon} />
                <Text style={{ fontSize: 9.5, fontWeight: 450 }}>{col.day}</Text>
              </Box>
              <AddIcon width={10} height={10} style={styles.addIcon} />
            </Box>

            {col.meals
              .filter((meal) => mealTypeFilter === "All" || meal.type === mealTypeFilter)
              .filter((meal) => statusFilter === "All" || meal.status === statusFilter)
              .sort((a, b) =>
                mealTypeOrder[a.type] !== mealTypeOrder[b.type]
                  ? mealTypeOrder[a.type] - mealTypeOrder[b.type]
                  : mealStatusOrder[a.status] - mealStatusOrder[b.status]
              )
              .map((meal) => (
                <MealCard key={meal.id} meal={meal} day={col.day} toggleStatus={toggleMealStatus} />
              ))}
          </Box>
        ))}
      </Box>
    );
  }
);

BoardView.displayName = "BoardView";
export default BoardView;
