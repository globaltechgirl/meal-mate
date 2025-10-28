import { Box, Text, Popover } from "@mantine/core";
import {
  useState,
  useCallback,
  type FC,
  memo,
  type CSSProperties,
  useEffect,
} from "react";

import RecipesView from "./recipesView";

import BoardIcon from "@/assets/icons/board";
import ResetIcon from "@/assets/icons/reset";
import ArrowNextIcon from "@/assets/icons/arrownext";
import ArrowPrevIcon from "@/assets/icons/arrowprev";
import StarIcon from "@/assets/icons/star";
import StarredIcon from "@/assets/icons/starred";
import PauseIcon from "@/assets/icons/pause";

export type Category = string;
export type StarState = "Pause" | "Star" | "Starred";

const STAR_CYCLE: StarState[] = ["Pause", "Star", "Starred"];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column" as const,
    gap: 4,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--border-100)",
    borderRadius: 8,
  },
  header: {
    width: "100%",
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
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    color: "var(--light-100)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    opacity: 1,
    transition: "opacity 0.2s ease",
  },
  disabledIcon: {
    opacity: 0.4,
    cursor: "not-allowed",
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
  const handleHover = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, hover: boolean) => {
      e.currentTarget.style.backgroundColor =
        hover || selected ? "var(--dark-20)" : "transparent";
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
      onMouseEnter={(e) => handleHover(e, true)}
      onMouseLeave={(e) => handleHover(e, false)}
    >
      {label}
    </Box>
  );
});
PopoverItem.displayName = "PopoverItem";

const MainRecipes: FC = () => {
  const [categories, setCategories] = useState<Category[]>(["All"]);
  const [category, setCategory] = useState<Category>("All");
  const [starState, setStarState] = useState<StarState>("Pause");
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  // 🟡 Fetch categories from TheMealDB
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
        const data = await res.json();
        if (data.categories) {
          const catNames = data.categories.map((c: any) => c.strCategory);
          setCategories(["All", ...catNames]);
        }
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const toggleStarState = useCallback(() => {
    setStarState((prev) => STAR_CYCLE[(STAR_CYCLE.indexOf(prev) + 1) % STAR_CYCLE.length]);
    setCurrentPage(0);
  }, []);

  const goPrevPage = useCallback(() => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
  }, []);

  const goNextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1 < totalPages ? prev + 1 : prev));
  }, [totalPages]);

  const resetFilters = useCallback(() => {
    setCategory("All");
    setStarState("Pause");
    setCurrentPage(0);
  }, []);

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>

        <Box style={styles.headerActions}>
          <Popover width={100} trapFocus position="bottom">
            <Popover.Target>
              <Box style={styles.filterBox}>
                <BoardIcon width={10} height={10} color="var(--light-100)" />
                <Text style={styles.filterText}>{category}</Text>
              </Box>
            </Popover.Target>

            <Popover.Dropdown
              style={{
                width: 100,
                padding: 2,
                backgroundColor: "var(--dark-30)",
                border: "1px solid var(--dark-10)",
                borderRadius: 6,
                marginTop: -4,
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {categories.map((cat) => (
                <PopoverItem
                  key={cat}
                  label={cat}
                  selected={cat === category}
                  onClick={() => {
                    setCategory(cat);
                    setCurrentPage(0);
                  }}
                />
              ))}
            </Popover.Dropdown>
          </Popover>

          <Box style={styles.iconCircle} onClick={toggleStarState}>
            {starState === "Pause" ? (
              <PauseIcon width={12} height={12} />
            ) : starState === "Star" ? (
              <StarIcon width={12} height={12} color="var(--light-100)" />
            ) : (
              <StarredIcon width={12} height={12} color="var(--light-100)" />
            )}
          </Box>

          <Box
            style={{
              ...styles.iconCircle,
              ...(currentPage === 0 ? styles.disabledIcon : {}),
            }}
            onClick={goPrevPage}
          >
            <ArrowPrevIcon width={12} height={12} />
          </Box>

          <Box
            style={{
              ...styles.iconCircle,
              ...(currentPage + 1 >= totalPages ? styles.disabledIcon : {}),
            }}
            onClick={goNextPage}
          >
            <ArrowNextIcon width={12} height={12} />
          </Box>

          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      <Box>
        <RecipesView
          page={currentPage}
          category={category}
          starState={starState}
          onTotalPagesChange={setTotalPages}
        />
      </Box>
    </Box>
  );
};

MainRecipes.displayName = "MainRecipes";
export default memo(MainRecipes);
