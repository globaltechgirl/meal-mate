import { type FC, type CSSProperties, useState, useEffect, useCallback, memo } from "react";
import { Box, Text, Popover } from "@mantine/core";
import UtensilsIcon from "@/assets/icons/utensils";
import CheckIcon from "@/assets/icons/check";
import MenuIcon from "@/assets/icons/menu";

const styles: Record<string, CSSProperties> = {
  contentWrapper: {
    display: "flex",
    width: "100%",
  },
  detailsWrapper: {
    flex: 1,
    width: "50%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 12,
    border: "1px solid var(--dark-10)",
    padding: 4,
  },
  detailsMain: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--dark-30)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 15,
    gap: 20,
    position: "relative",
  },
  detailsHeaderWrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "4px 6px 6px 6px",
  },
  detailsHeader: {
    fontSize: 10,
    fontWeight: 450,
    color: "var(--light-100)",
  },
  itemRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    position: "relative",
  },
  iconWrapper: {
    position: "relative",
    width: 32,
    height: 32,
    borderRadius: 8,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    color: "var(--light-100)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  dottedLine: {
    position: "absolute" as const,
    top: 32,
    left: "50%",
    transform: "translateX(-50%)",
    width: 2,
    height: 20,
    borderLeft: "1px dashed var(--dark-10)",
    zIndex: 0,
  },
  text: {
    fontSize: 10,
    fontWeight: 400,
    color: "var(--light-100)",
  },
  popoverItem: {
    fontSize: 9,
    fontWeight: 400,
    color: "var(--light-100)",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "transparent",
  },
  error: {
    textAlign: "center",
    color: "red",
    marginTop: 40,
    fontSize: 12,
  },
  loading: {
    textAlign: "center",
    color: "var(--light-200)",
    marginTop: 40,
    fontSize: 12,
  },
} as const;

interface Ingredient {
  name: string;
  measure: string;
  checked: boolean;
}

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}

const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick }) => {
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "var(--dark-20)";
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = "transparent";
  };
  return (
    <Box
      style={styles.popoverItem}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {label}
    </Box>
  );
});
PopoverItem.displayName = "PopoverItem";

const DetailsIngredientsMeasurements: FC = () => {
  const [opened, setOpened] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const recipeId = window.location.pathname.split("/").pop(); // uses last segment of URL as id

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/recipes/${recipeId}/`);
        if (!res.ok) throw new Error("Failed to fetch recipe data");
        const data = await res.json();

        // expect data.ingredients as [{ingredient: "Flour", measure: "1 cup"}, ...]
        if (data.ingredients && data.ingredients.length > 0) {
          setIngredients(
            data.ingredients.map((ing: any) => ({
              name: ing.ingredient,
              measure: ing.measure,
              checked: false,
            }))
          );
        } else {
          setIngredients([]);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, [recipeId]);

  const toggleCheck = useCallback((index: number) => {
    setIngredients(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
    );
    setSelectedIndex(index);
  }, []);

  if (loading) return <Text style={styles.loading}>Loading ingredients...</Text>;
  if (error) return <Text style={styles.error}>{error}</Text>;
  if (!ingredients.length)
    return <Text style={styles.loading}>No ingredients found.</Text>;

  return (
    <Box style={styles.contentWrapper}>
      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsHeaderWrapper}>
          <Text style={styles.detailsHeader}>Ingredients & Measurements</Text>

          <Popover
            width={100}
            position="bottom"
            shadow="md"
            opened={opened}
            onClose={() => setOpened(false)}
          >
            <Popover.Target>
              <Box style={{ cursor: "pointer" }} onClick={() => setOpened(o => !o)}>
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
              <PopoverItem label="Check All" onClick={() => setIngredients(prev => prev.map(i => ({ ...i, checked: true })))} />
              <PopoverItem label="Uncheck All" onClick={() => setIngredients(prev => prev.map(i => ({ ...i, checked: false })))} />
            </Popover.Dropdown>
          </Popover>
        </Box>

        <Box style={styles.detailsMain}>
          {ingredients.map((item, index) => (
            <Box key={`${item.name}-${index}`} style={styles.itemRow}>
              <Box
                style={{
                  ...styles.iconWrapper,
                  borderColor:
                    selectedIndex === index
                      ? "var(--light-100)"
                      : "var(--dark-10)",
                }}
                onClick={() => toggleCheck(index)}
              >
                {item.checked ? (
                  <CheckIcon width={14} height={14} />
                ) : (
                  <UtensilsIcon width={14} height={14} />
                )}
                {index < ingredients.length - 1 && <Box style={styles.dottedLine} />}
              </Box>

              <Text style={styles.text}>
                {item.name} — <span style={{ color: "var(--light-200)" }}>{item.measure}</span>
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsIngredientsMeasurements;
