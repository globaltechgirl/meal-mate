import { Box, Text, Popover } from "@mantine/core";
import { useState, type FC, memo } from "react";

import BoardIcon from "@/assets/icons/board";
import CheckIcon from "@/assets/icons/check";
import DetailsView from "./detailsView";

export type Category = "All" | "Vegetarian" | "Vegan" | "Keto" | "Desserts";
const CATEGORY_LIST: Category[] = ["All", "Vegetarian", "Vegan", "Keto", "Desserts"];

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginBottom: 8,
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

const PopoverItem: FC<PopoverItemProps> = memo(({ label, selected, onClick }) => (
  <Box
    style={{
      ...styles.popoverItem,
      ...(selected ? styles.popoverItemSelected : {}),
    }}
    onClick={onClick}
    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--dark-20)")}
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = selected ? "var(--dark-20)" : "transparent")
    }
  >
    {label}
  </Box>
));
PopoverItem.displayName = "PopoverItem";

const MainDetails: FC = () => {
  const [category, setCategory] = useState<Category | null>(null);
  const [addedToCalendar, setAddedToCalendar] = useState<boolean>(false);

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Recipes</Text>

        <Box style={styles.headerActions}>
          <Popover width={80} trapFocus position="bottom">
            <Popover.Target>
              <Box style={styles.filterBox}>
                <BoardIcon width={10} height={10} color="var(--light-100)" />
                <Text style={styles.filterText}>
                  {category ?? "Add to Category"}
                </Text>
              </Box>
            </Popover.Target>

            <Popover.Dropdown style={styles.popoverDropdown}>
              {CATEGORY_LIST.map((cat) => (
                <PopoverItem
                  key={cat}
                  label={cat}
                  selected={cat === category}
                  onClick={() => setCategory(cat)}
                />
              ))}
            </Popover.Dropdown>
          </Popover>

          <Box
            style={styles.filterBox}
            onClick={() => setAddedToCalendar(true)}
          >
            <CheckIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.filterText}>
              {addedToCalendar ? "Added to Calendar" : "Add to Calendar"}
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
