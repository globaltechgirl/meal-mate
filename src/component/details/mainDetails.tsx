import {
  type FC,
  type CSSProperties,
  memo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { Box, Text, Popover, Loader } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import BoardIcon from "@/assets/icons/board";
import CheckIcon from "@/assets/icons/check";
import DetailsView from "../details/detailsView";

export type Category = "All" | "Vegetarian" | "Vegan" | "Keto" | "Desserts";

const CATEGORY_LIST: Category[] = [
  "All",
  "Vegetarian",
  "Vegan",
  "Keto",
  "Desserts",
];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--border-100)",
    borderRadius: 8,
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 8px",
  },
  headerText: {
    fontSize: 10,
    fontWeight: 500,
    color: "var(--light-100)",
  },
  headerActions: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
  filterBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    padding: "0 8px 0 6px",
    background: "var(--dark-30)",
    cursor: "pointer",
    height: 24,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },
  popoverDropdown: {
    width: 95,
    padding: 2,
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    marginTop: -4,
    display: "flex",
    flexDirection: "column",
    gap: 2,
  },
  popoverItem: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  },
  popoverItemSelected: {
    backgroundColor: "var(--dark-20)",
  },
} as const;

interface PopoverItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const PopoverItem: FC<PopoverItemProps> = memo(({ label, selected, onClick }) => {
  const handleMouseEnter = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "var(--dark-20)";
  }, []);

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.backgroundColor = selected
        ? "var(--dark-20)"
        : "transparent";
    },
    [selected]
  );

  return (
    <Box
      style={{
        ...styles.popoverItem,
        ...(selected ? styles.popoverItemSelected : {}),
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </Box>
  );
});
PopoverItem.displayName = "PopoverItem";

interface MainDetailsProps {
  recipeId: number;
}

const MainDetails: FC<MainDetailsProps> = ({ recipeId }) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [addedToCalendar, setAddedToCalendar] = useState(false);
  const [loadingCategory, setLoadingCategory] = useState(false);
  const [loadingCalendar, setLoadingCalendar] = useState(false);
  const [opened, setOpened] = useState(false);
  const [recipeData, setRecipeData] = useState<any>(null);

  // Fetch full recipe details from TheMealDB
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`
        );
        const data = await res.json();
        if (data.meals && data.meals[0]) {
          setRecipeData(data.meals[0]);
        }
      } catch (err) {
        console.error("Failed to fetch recipe details:", err);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  const handleSelectCategory = useCallback(
    async (cat: Category) => {
      if (!recipeData) return;

      setCategory(cat);
      setLoadingCategory(true);

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/api/recipes/add-to-category/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
            body: JSON.stringify({
              meal_id: recipeData.idMeal,
              title: recipeData.strMeal,
              category: cat,
              area: recipeData.strArea,
              instructions: recipeData.strInstructions,
              thumbnail: recipeData.strMealThumb,
              tags: recipeData.strTags,
              youtube: recipeData.strYoutube,
              source: recipeData.strSource,
            }),
          }
        );

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Failed to add to category");

        notifications.show({
          title: "Success",
          message: "Recipe added to category successfully!",
          color: "green",
        });
      } catch (error: any) {
        notifications.show({
          title: "Error",
          message: error.message,
          color: "red",
        });
      } finally {
        setLoadingCategory(false);
        setOpened(false);
      }
    },
    [recipeData]
  );

  const handleAddToCalendar = useCallback(async () => {
    if (!recipeData) return;

    setLoadingCalendar(true);
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/recipes/add-to-calendar/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
          body: JSON.stringify({
            meal_id: recipeData.idMeal,
            title: recipeData.strMeal,
            category_name: recipeData.strCategory,
            area: recipeData.strArea,
            instructions: recipeData.strInstructions,
            thumbnail: recipeData.strMealThumb,
            tags: recipeData.strTags,
            youtube: recipeData.strYoutube,
            source: recipeData.strSource,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to add to calendar");

      setAddedToCalendar(true);
      notifications.show({
        title: "Success",
        message: "Recipe added to calendar!",
        color: "green",
      });
    } catch (error: any) {
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    } finally {
      setLoadingCalendar(false);
    }
  }, [recipeData]);

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>

        <Box style={styles.headerActions}>
          <Popover
            width={95}
            opened={opened}
            onChange={setOpened}
            position="bottom"
          >
            <Popover.Target>
              <Box style={styles.filterBox} onClick={() => setOpened((o) => !o)}>
                <BoardIcon width={10} height={10} color="var(--light-100)" />
                <Text style={styles.filterText}>
                  {loadingCategory
                    ? "Adding..."
                    : category ?? "Add to Category"}
                </Text>
              </Box>
            </Popover.Target>

            <Popover.Dropdown style={styles.popoverDropdown}>
              {CATEGORY_LIST.map((cat) => (
                <PopoverItem
                  key={cat}
                  label={cat}
                  selected={cat === category}
                  onClick={() => handleSelectCategory(cat)}
                />
              ))}
            </Popover.Dropdown>
          </Popover>

          <Box style={styles.filterBox} onClick={handleAddToCalendar}>
            {loadingCalendar ? (
              <Loader size="xs" color="gray" />
            ) : (
              <CheckIcon width={10} height={10} color="var(--light-100)" />
            )}
            <Text style={styles.filterText}>
              {addedToCalendar ? "Added" : "Add to Calendar"}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box>
        <DetailsView />
      </Box>
    </Box>
  );
};

export default MainDetails;
