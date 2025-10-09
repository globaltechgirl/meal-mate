import { type FC, type CSSProperties, memo, useState } from "react";
import { Box, Text, Popover } from "@mantine/core";

import FoodIcon from "@/assets/icons/food";
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
    position: "relative" as const,
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
  ingredientRow: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    position: "relative" as const,
  },
  iconWrapper: {
    position: "relative" as const,
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
  ingredientText: {
    fontSize: 10,
    fontWeight: 400,
    color: "var(--light-100)",
    cursor: "pointer",
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
} as const;

interface Ingredient {
  text: string;
  checked: boolean;
}

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}

const PopoverItem: FC<PopoverItemProps> = memo(({ label, onClick }) => (
  <Box
    style={styles.popoverItem}
    onClick={onClick}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = "var(--dark-20)";
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = "transparent";
    }}
  >
    {label}
  </Box>
));
PopoverItem.displayName = "PopoverItem";

const DetailsIngredients: FC = () => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { text: "200g pasta", checked: false },
    { text: "1 cup tomato sauce", checked: false },
    { text: "50g parmesan", checked: false },
    { text: "Basil leaves", checked: false },
    { text: "1 clove garlic", checked: false },
  ]);

  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleCheck = (index: number) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
    setSelectedIndex(index);
  };

  const handleAdd = () => {
    setIngredients((prev) => [...prev, { text: "", checked: false }]);
    setEditingIndex(ingredients.length);
    setPopoverOpened(false);
  };

  const handleEdit = () => {
    if (selectedIndex !== null) setEditingIndex(selectedIndex);
    setPopoverOpened(false);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setIngredients((prev) => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
    }
    setPopoverOpened(false);
  };

  const updateText = (index: number, value: string) => {
    setIngredients((prev) =>
      prev.map((item, i) => (i === index ? { ...item, text: value } : item))
    );
  };

  return (
    <Box style={styles.contentWrapper}>
      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsHeaderWrapper}>
          <Text style={styles.detailsHeader}>Ingredients</Text>

          <Popover
            width={100}
            position="bottom"
            shadow="md"
            opened={popoverOpened}
            onClose={() => setPopoverOpened(false)}
          >
            <Popover.Target>
              <Box style={{ cursor: "pointer" }} onClick={() => setPopoverOpened((o) => !o)}>
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
              <PopoverItem label="Add" onClick={handleAdd} />
              <PopoverItem label="Edit" onClick={handleEdit} />
              <PopoverItem label="Delete" onClick={handleDelete} />
            </Popover.Dropdown>
          </Popover>
        </Box>

        <Box style={styles.detailsMain}>
          {ingredients.map((item, index) => {
            const isSelected = selectedIndex === index;
            const isEditing = editingIndex === index;

            return (
              <Box key={index} style={styles.ingredientRow}>
                <Box
                  style={{
                    ...styles.iconWrapper,
                    borderColor: isSelected ? "var(--light-100)" : "var(--dark-10)",
                  }}
                  onClick={() => toggleCheck(index)}
                >
                  {item.checked ? (
                    <CheckIcon width={14} height={14} />
                  ) : (
                    <FoodIcon width={14} height={14} />
                  )}
                  {index < ingredients.length - 1 && <Box style={styles.dottedLine} />}
                </Box>

                {isEditing ? (
                  <input
                    type="text"
                    value={item.text}
                    onChange={(e) => updateText(index, e.currentTarget.value)}
                    onBlur={() => setEditingIndex(null)}
                    autoFocus
                    style={{
                      fontSize: 10,
                      padding: 0,
                      margin: 0,
                      border: "none",
                      outline: "none",
                      background: "transparent",
                      color: "var(--light-100)",
                      fontWeight: 450,
                    }}
                  />
                ) : (
                  <Text style={styles.ingredientText} onClick={() => setEditingIndex(index)}>
                    {item.text}
                  </Text>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsIngredients;
