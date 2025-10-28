import { Box, Text, Popover, Loader } from "@mantine/core";
import {
  useState,
  useCallback,
  useEffect,
  useMemo,
  type CSSProperties,
  type FC,
  memo,
} from "react";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mantine/hooks";

import MenuIcon from "@/assets/icons/menu";
import StarIcon from "@/assets/icons/star";
import StarredIcon from "@/assets/icons/starred";

import type { Category, StarState } from "./mainRecipes";

interface RecipeItem {
  id: string;
  title: string;
  instructions: string;
  thumbnail: string;
  category?: string;
  area?: string;
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
  loading?: boolean;
}

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

const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick, loading }) => {
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
      {loading ? <Loader size="xs" /> : label}
    </Box>
  );
});
PopoverItem.displayName = "PopoverItem";

const RecipesView: FC<RecipesViewProps> = ({
  page,
  category,
  starState,
  onTotalPagesChange,
}) => {
  const navigate = useNavigate();

  const handleNavigate = useCallback(
    (id: string) => navigate(`/recipes/${id}`),
    [navigate]
  );

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  const [starred, setStarred] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<RecipeItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingId, setAddingId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // ✅ Fetch recipes
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/recipes/`);
        if (!res.ok) throw new Error("Failed to fetch recipes");
        const data = await res.json();

        const formatted = data.map((item: any) => ({
          id: item.idMeal || item.id,
          title: item.name || item.title || item.strMeal,
          instructions:
            item.note ||
            item.instructions ||
            item.strInstructions ||
            "No description available",
          thumbnail: item.image || item.thumbnail || item.strMealThumb,
          category: item.category || item.strCategory,
          area: item.area || item.strArea,
        }));

        setRecipes(formatted);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const toggleStar = useCallback((id: string) => {
    setStarred((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }, []);

  // ✅ Add selected recipe to meal calendar
  const handleAddToCalendar = async (recipe: RecipeItem) => {
    try {
      setAddingId(recipe.id);

      const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/meal-calendar/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          recipe_id: recipe.id,
          title: recipe.title,
          category: recipe.category,
          thumbnail: recipe.thumbnail,
          instructions: recipe.instructions,
          date_added: new Date().toISOString(),
        }),
      });

      if (!res.ok) throw new Error("Failed to add to calendar");

      alert(`✅ ${recipe.title} added to your meal calendar!`);
    } catch (err) {
      console.error(err);
      alert("❌ Could not add to calendar. Please try again.");
    } finally {
      setAddingId(null);
    }
  };

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (starState === "Starred" && !starred.includes(r.id)) return false;
      if (starState === "Star" && starred.includes(r.id)) return false;
      return true;
    });
  }, [recipes, category, starState, starred]);

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
        cursor: "pointer",
      },
      loadingWrapper: {
        width: "100%", 
        backgroundColor: "var(--dark-30)",
        borderRadius: 12,
        border: "1px solid var(--dark-10)",
        padding: 2,
      },
      loadingBox: {
        background: "var(--dark-20)",
        border: "1px solid var(--dark-10)",
        borderRadius: 12,
        padding: 10, 
        width: "100%", 
      },
      loadingText: {
        textAlign: "center", 
        color: "var(--light-200)", 
        fontSize: 9.5, 
        fontWeight: 400,
      },
      errorText: {
        textAlign: "center", 
        color: "var(--mild-500)", 
        fontSize: 9.5, 
        fontWeight: 400,
      }
    }),
    [isSmallScreen, isMediumScreen]
  );

  if (loading)
    return (
      <Box style={styles.loadingWrapper}>
        <Box style={styles.loadingBox}><Text style={styles.loadingText}>Loading recipes...</Text></Box>
      </Box>
    );

  if (error)
    return (
      <Box style={styles.loadingWrapper}>
        <Box style={styles.loadingBox}><Text style={styles.errorText}>{error}</Text></Box>
      </Box>
    );

  return (
    <Box style={styles.wrapper}>
      {paginated.map((meal) => (
        <Box key={meal.id} style={styles.recipeCard}>
          <Box style={styles.mealImageWrapper}>
            <img src={meal.thumbnail} alt={meal.title} style={styles.mealImage} />
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
                  width: 90,
                  padding: 2,
                  backgroundColor: "var(--dark-30)",
                  border: "1px solid var(--dark-10)",
                  borderRadius: 6,
                }}
              >
                <PopoverItem
                  label="Add to Calendar"
                  onClick={() => handleAddToCalendar(meal)}
                  loading={addingId === meal.id}
                />
              </Popover.Dropdown>
            </Popover>

            <Box style={styles.recipeContent}>
              {meal.category && (
                <Box style={styles.categoryBadge}>{meal.category}</Box>
              )}
              <Box style={styles.recipeText}>
                <Text style={styles.recipeName}>{meal.title}</Text>
                <Text style={styles.recipeNote}>
                  {meal.instructions.length > 60
                    ? `${meal.instructions.slice(0, 60)}...`
                    : meal.instructions}
                </Text>
              </Box>
              <Text
                style={styles.detailsLink}
                onClick={() => handleNavigate(meal.id)}
              >
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
