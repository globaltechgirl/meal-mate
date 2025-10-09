import { Box, Text, Popover } from "@mantine/core";
import { useState, useCallback, useEffect, useMemo, type CSSProperties, type FC, memo, } from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import MenuIcon from "@/assets/icons/menu";
import StarIcon from "@/assets/icons/star";
import StarredIcon from "@/assets/icons/starred";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";

import type { Category, StarState } from "./mainRecipes";

interface RecipeItem {
  id: number;
  name: string;
  note: string;
  image: string;
  category?: Category;
}

interface RecipesViewProps {
  page: number;
  category: Category;
  starState: StarState;
  onTotalPagesChange?: (total: number) => void;
}

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}

const INITIAL_RECIPES: RecipeItem[] = [
  { id: 1, name: "Pancakes", note: "Fluffy pancakes with maple syrup, topped with fresh berries and powdered sugar.", image: BestImg1, category: "Desserts" },
  { id: 2, name: "Caesar Salad", note: "Fresh lettuce with croutons, parmesan cheese, and a creamy Caesar dressing.", image: BestImg2, category: "Vegetarian" },
  { id: 3, name: "Steak Dinner", note: "Juicy steak with roasted vegetables, rich red wine sauce, and garlic mashed potatoes.", image: BestImg3, category: "Keto" },
  { id: 4, name: "Omelette", note: "Cheese and ham omelette with sautéed mushrooms, onions, and bell peppers.", image: BestImg4, category: "Desserts" },
  { id: 5, name: "Grilled Chicken", note: "Herb-marinated grilled chicken breast served with quinoa salad.", image: BestImg5, category: "Keto" },
  { id: 6, name: "Vegan Buddha Bowl", note: "Quinoa, roasted chickpeas, avocado, kale, and tahini dressing.", image: BestImg4, category: "Vegan" },
  { id: 7, name: "Berry Smoothie", note: "Refreshing smoothie with mixed berries, almond milk, and chia seeds.", image: BestImg3, category: "Vegan" },
  { id: 8, name: "Avocado Toast", note: "Toasted sourdough topped with smashed avocado, chili flakes, and lemon.", image: BestImg2, category: "Vegetarian" },
  { id: 9, name: "Chocolate Cake", note: "Moist chocolate sponge layered with ganache and chocolate shavings.", image: BestImg5, category: "Desserts" },
  { id: 10, name: "Grilled Salmon", note: "Salmon fillet with garlic butter, lemon slices, and roasted asparagus.", image: BestImg1, category: "Keto" },
  { id: 11, name: "Margarita Pizza", note: "Thin crust pizza with fresh mozzarella, basil, and tomato sauce.", image: BestImg4, category: "Vegetarian" },
  { id: 12, name: "Fruit Salad", note: "A mix of watermelon, kiwi, strawberries, and pineapple drizzled with honey.", image: BestImg2, category: "Vegan" },
  { id: 13, name: "Beef Tacos", note: "Crispy tacos filled with seasoned beef, lettuce, salsa, and cheddar cheese.", image: BestImg5, category: "Keto" },
  { id: 14, name: "Pumpkin Soup", note: "Creamy pumpkin soup with ginger, garlic, and a swirl of coconut cream.", image: BestImg1, category: "Vegetarian" },
  { id: 15, name: "Ice Cream Sundae", note: "Vanilla ice cream with hot fudge, whipped cream, and a cherry on top.", image: BestImg3, category: "Desserts" },
];

const sharedPopoverItemStyle: CSSProperties = {
  fontSize: 8.5,
  fontWeight: 400,
  color: "var(--light-100)",
  padding: "4px 8px",
  borderRadius: 4,
  cursor: "pointer",
  backgroundColor: "transparent",
  transition: "background-color 0.2s ease",
};

const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick }) => {
  const handleHover = (e: React.MouseEvent<HTMLDivElement>, hover: boolean) => {
    e.currentTarget.style.backgroundColor = hover
      ? "var(--dark-20)"
      : "transparent";
  };

  return (
    <Box
      style={sharedPopoverItemStyle}
      onClick={onClick}
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {label}
    </Box>
  );
});
PopoverItem.displayName = "PopoverItem";

const RecipesView: FC<RecipesViewProps> = ({ page, category, starState, onTotalPagesChange }) => {
  const navigate = useNavigate();
  const handleNavigate = useCallback(
    () => navigate("/recipes-details"),
    [navigate]
  );

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const [starred, setStarred] = useState<number[]>([]);

  const toggleStar = useCallback((id: number) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  const filtered = useMemo(() => {
    return INITIAL_RECIPES.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (starState === "Starred" && !starred.includes(r.id)) return false;
      if (starState === "Star" && starred.includes(r.id)) return false;
      return true;
    });
  }, [category, starState, starred]);

  const perPage = 9;
  const totalPages = Math.ceil(filtered.length / perPage);

  useEffect(() => {
    onTotalPagesChange?.(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const paginated = useMemo(
    () => filtered.slice(page * perPage, (page + 1) * perPage),
    [filtered, page]
  );

  const styles = useMemo<Record<string, CSSProperties>>(
    () => ({
      wrapper: {
        width: "98.5%",
        height: "100%",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: isSmallScreen
          ? "repeat(1, 1fr)"
          : isMediumScreen
          ? "repeat(2, 1fr)"
          : "repeat(3, 1fr)",
        gap: 6,
        background: "var(--dark-30)",
        border: "1px solid var(--dark-10)",
        borderRadius: 12,
        padding: 6,
        overflow: "hidden",
      },
      recipeCard: {
        position: "relative",
        display: "flex",
        backgroundColor: "var(--dark-20)",
        borderRadius: 8,
        border: "1px solid var(--dark-10)",
        padding: 8,
        gap: 6,
      },
      mealImageWrapper: {
        flex: 1,
        position: "relative",
        flexShrink: 0,
      },
      mealImage: {
        width: "100%",
        height: 124,
        borderRadius: 8,
        objectFit: "cover",
      },
      starIcon: {
        position: "absolute",
        top: 4,
        right: 4,
        background: "var(--dark-30)",
        borderRadius: "50%",
        padding: 2,
        cursor: "pointer",
      },
      recipeInfo: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative",
        paddingLeft: 8,
        paddingBottom: 4,
        cursor: "pointer",
      },
      menuIcon: {
        position: "absolute",
        top: 0,
        right: 0,
        cursor: "pointer",
      },
      recipeContent: {
        display: "flex",
        flexDirection: "column",
        gap: 8,
      },
      categoryBadge: {
        width: "fit-content",
        padding: "2px 6px",
        borderRadius: 4,
        backgroundColor: "var(--dark-30)",
        border: "1px solid var(--dark-10)",
        fontSize: 8,
        fontWeight: 400,
        color: "var(--light-200)",
        textAlign: "center",
      },
      recipeText: {
        display: "flex",
        flexDirection: "column",
        gap: 5,
      },
      recipeName: {
        fontSize: 9.5,
        fontWeight: 450,
        color: "var(--light-100)",
      },
      recipeNote: {
        fontSize: 8.5,
        fontWeight: 400,
        color: "var(--light-100)",
      },
      detailsLink: {
        fontSize: 8,
        fontWeight: 400,
        color: "var(--light-100)",
        textDecoration: "underline",
        textUnderlineOffset: 2,
      },
    }),
    [isSmallScreen, isMediumScreen]
  );

  return (
    <Box style={styles.wrapper}>
      {paginated.map((meal) => (
        <Box key={meal.id} style={styles.recipeCard}>
          <Box style={styles.mealImageWrapper}>
            <img src={meal.image} alt={meal.name} style={styles.mealImage} />
            <Box style={styles.starIcon} onClick={() => toggleStar(meal.id)}>
              {starred.includes(meal.id) ? (
                <StarredIcon width={10} height={10} color="var(--light-200)" />
              ) : (
                <StarIcon width={10} height={10} color="var(--light-200)" />
              )}
            </Box>
          </Box>

          <Box style={styles.recipeInfo}>
            <Popover width={100} position="bottom-end" shadow="md" withinPortal>
              <Popover.Target>
                <Box
                  style={styles.menuIcon}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MenuIcon width={10} height={10} color="var(--light-200)" />
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
                }}
              >
                <PopoverItem
                  label="Edit"
                  onClick={() => console.log("Edit", meal.id)}
                />
              </Popover.Dropdown>
            </Popover>

            <Box style={styles.recipeContent}>
              {meal.category && (
                <Box style={styles.categoryBadge}>{meal.category}</Box>
              )}
              <Box style={styles.recipeText}>
                <Text style={styles.recipeName}>{meal.name}</Text>
                <Text style={styles.recipeNote}>
                  {meal.note.length > 60
                    ? `${meal.note.slice(0, 60)}...`
                    : meal.note}
                </Text>
              </Box>
              <Text style={styles.detailsLink} onClick={handleNavigate}>
                View details
              </Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

RecipesView.displayName = "RecipesView";
export default memo(RecipesView);
