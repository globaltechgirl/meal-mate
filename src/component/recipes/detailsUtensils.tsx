import { Box, Text, Popover } from "@mantine/core";
import { type FC, useState, memo } from "react";

import UtensilsIcon from "@/assets/icons/utensils";
import CheckIcon from "@/assets/icons/check";
import MenuIcon from "@/assets/icons/menu";

const styles = {
  contentWrapper: { 
    display: "flex", 
    width: "100%" 
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
    color: "var(--light-100)" 
  },
  utensilRow: { 
    display: "flex", 
    alignItems: "center", 
    gap: 10, 
    position: "relative" 
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
  utensilText: { 
    fontSize: 10, 
    fontWeight: 400, 
    color: "var(--light-100)" 
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

interface Utensil {
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
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--dark-20)")}
    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
  >
    {label}
  </Box>
));
PopoverItem.displayName = "PopoverItem";

const DetailsUtensils: FC = () => {
  const [opened, setOpened] = useState(false);
  const [utensils, setUtensils] = useState<Utensil[]>([
    { text: "200g pasta", checked: false },
    { text: "1 cup tomato sauce", checked: false },
    { text: "50g parmesan", checked: false },
    { text: "Basil leaves", checked: false },
    { text: "1 clove garlic", checked: false },
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const toggleCheck = (index: number) => {
    setUtensils(prev =>
      prev.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
    setSelectedIndex(index);
  };

  const handleAdd = () => {
    setUtensils(prev => [...prev, { text: "", checked: false }]);
    setEditingIndex(utensils.length);
    setOpened(false);
  };

  const handleEdit = () => {
    if (selectedIndex !== null) setEditingIndex(selectedIndex);
    setOpened(false);
  };

  const handleDelete = () => {
    if (selectedIndex !== null) {
      setUtensils(prev => prev.filter((_, i) => i !== selectedIndex));
      setSelectedIndex(null);
    }
    setOpened(false);
  };

  const updateText = (index: number, value: string) => {
    setUtensils(prev => prev.map((item, i) => (i === index ? { ...item, text: value } : item)));
  };

  return (
    <Box style={styles.contentWrapper}>
      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsHeaderWrapper}>
          <Text style={styles.detailsHeader}>Utensils</Text>
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
              <PopoverItem label="Add" onClick={handleAdd} />
              <PopoverItem label="Edit" onClick={handleEdit} />
              <PopoverItem label="Delete" onClick={handleDelete} />
            </Popover.Dropdown>
          </Popover>
        </Box>

        <Box style={styles.detailsMain}>
          {utensils.map((item, index) => (
            <Box key={index} style={styles.utensilRow}>
              <Box
                style={{
                  ...styles.iconWrapper,
                  borderColor: selectedIndex === index ? "var(--light-100)" : "var(--dark-10)",
                }}
                onClick={() => toggleCheck(index)}
              >
                {item.checked ? (
                  <CheckIcon width={14} height={14} />
                ) : (
                  <UtensilsIcon width={14} height={14} />
                )}
                {index < utensils.length - 1 && <Box style={styles.dottedLine} />}
              </Box>

              {editingIndex === index ? (
                <input
                  type="text"
                  value={item.text}
                  onChange={e => updateText(index, e.currentTarget.value)}
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
                <Text style={styles.utensilText} onClick={() => setEditingIndex(index)}>
                  {item.text}
                </Text>
              )}
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsUtensils;
