import { Box, Text, Popover } from "@mantine/core";
import { useState, type FC, type CSSProperties } from "react";

import MenuIcon from "@/assets/icons/menu";
import { type Item } from "./shoppingViews";
import EditRecipeModal from "./editRecipe";

interface ShoppingBodyProps {
  items: Item[];
  toggleRowStatus: (name: string) => void;
  currencySymbol: React.ReactNode;
}

interface PrettyCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: number;
  color?: string;
  borderColor?: string;
  bgUnchecked?: string;
  iconColor?: string;
  disabled?: boolean;
}

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}

const styles: Record<string, CSSProperties> = {
  bodyWrapper: {
    padding: 4,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    overflowX: "auto",
    overflowY: "hidden",
    maxWidth: "100%",
  },
  scrollInner: {
    minWidth: 800,
  },
  topSection: {
    display: "grid",
    gridTemplateColumns:
      "0.1fr 0.6fr 1fr 0.5fr 0.4fr 0.45fr 0.4fr 0.45fr 0.1fr",
    alignItems: "center",
    backgroundColor: "var(--dark-20)",
    borderRadius: 6,
    padding: 8,
  },
  topText: {
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-200)",
  },
  row: {
    display: "grid",
    gridTemplateColumns:
      "0.1fr 0.6fr 1fr 0.5fr 0.4fr 0.45fr 0.4fr 0.45fr 0.06fr",
    alignItems: "center",
    padding: 8,
  },
  rowText: {
    fontSize: 9.5,
    fontWeight: 400,
    color: "var(--light-100)",
  },
  statusText: {
    padding: "3px 6px",
    width: "fit-content",
    borderRadius: 5,
    backgroundColor: "var(--dark-10)",
    border: "1px solid var(--dark-20)",
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    textAlign: "center",
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
};

const PrettyCheckbox: FC<PrettyCheckboxProps> = ({
  checked,
  onChange,
  size = 12,
  color = "var(--primary)",
  borderColor = "var(--dark-10)",
  bgUnchecked = "var(--dark-30)",
  iconColor = "var(--light-100)",
  disabled = false,
}) => (
  <span
    style={{
      width: size,
      height: size,
      minWidth: size,
      minHeight: size,
      borderRadius: 2,
      border: `1px solid ${borderColor}`,
      background: checked ? color : bgUnchecked,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: disabled ? "not-allowed" : "pointer",
    }}
    onClick={() => !disabled && onChange(!checked)}
  >
    {checked && (
      <svg
        width={Math.max(6, size - 4)}
        height={Math.max(6, size - 4)}
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M20 6L9 17L4 12"
          stroke={iconColor}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )}
  </span>
);

const PopoverItem: FC<PopoverItemProps> = ({ label, onClick }) => (
  <Box
    style={styles.popoverItem}
    onClick={onClick}
    onMouseEnter={(e) =>
      (e.currentTarget.style.backgroundColor = "var(--dark-20)")
    }
    onMouseLeave={(e) =>
      (e.currentTarget.style.backgroundColor = "transparent")
    }
  >
    {label}
  </Box>
);

const ShoppingBody: FC<ShoppingBodyProps> = ({ items, toggleRowStatus, currencySymbol, }) => {
  const [rowPopoverOpenIndex, setRowPopoverOpenIndex] = useState<number | null>(
    null
  );
  const [editModalOpened, setEditModalOpened] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);

  const openEditModal = (item: Item): void => {
    setEditingItem(item);
    setEditModalOpened(true);
  };

  const closeEditModal = (): void => {
    setEditingItem(null);
    setEditModalOpened(false);
  };

  const handlePopoverToggle = (idx: number): void => {
    setRowPopoverOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <Box style={styles.bodyWrapper}>
      <Box style={styles.scrollInner}>
        <Box style={styles.topSection}>
          <PrettyCheckbox checked={false} onChange={() => {}} disabled size={12} />
          <Text style={styles.topText}>Food Name</Text>
          <Text style={styles.topText}>Shopping Note</Text>
          <Text style={styles.topText}>Source</Text>
          <Text style={styles.topText}>Qty</Text>
          <Text style={styles.topText}>Amount</Text>
          <Text style={styles.topText}>Status</Text>
          <Text style={styles.topText}>Date</Text>
          <Text style={styles.topText}></Text>
        </Box>

        {items.map((item, idx) => (
          <Box key={item.name}>
            <Box style={styles.row}>
              <PrettyCheckbox
                checked={item.status === "Complete"}
                onChange={() => toggleRowStatus(item.name)}
                size={11}
                color="var(--dark-20)"
                borderColor="var(--dark-10)"
                bgUnchecked="var(--dark-30)"
                iconColor="var(--light-100)"
              />
              <Text style={styles.rowText}>{item.name}</Text>
              <Text style={styles.rowText}>
                {item.note.length > 30
                  ? `${item.note.slice(0, 30)}...`
                  : item.note}
              </Text>
              <Text style={styles.rowText}>{item.source}</Text>
              <Text style={styles.rowText}>{item.qty} Qty</Text>
              <Text
                style={{
                  ...styles.rowText,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.5,
                }}
              >
                {currencySymbol}
                {item.amount.toFixed(2)}
              </Text>
              <Text style={{ ...styles.rowText, ...styles.statusText }}>
                {item.status}
              </Text>
              <Text style={styles.rowText}>{item.createdAt}</Text>

              <Popover
                opened={rowPopoverOpenIndex === idx}
                onClose={() => setRowPopoverOpenIndex(null)}
                position="bottom"
                shadow="md"
                closeOnClickOutside
              >
                <Popover.Target>
                  <Box
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePopoverToggle(idx);
                    }}
                  >
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
                    gap: "2px",
                  }}
                >
                  <PopoverItem
                    label="Edit"
                    onClick={() => {
                      openEditModal(item);
                      setRowPopoverOpenIndex(null);
                    }}
                  />
                  <PopoverItem
                    label="Delete"
                    onClick={() => {
                      console.log("Delete clicked", idx);
                      setRowPopoverOpenIndex(null);
                    }}
                  />
                </Popover.Dropdown>
              </Popover>
            </Box>

            {idx < items.length - 1 && (
              <hr style={{ border: "0.5px solid var(--dark-10)" }} />
            )}
          </Box>
        ))}
      </Box>

      {editingItem && (
        <EditRecipeModal
          opened={editModalOpened}
          onClose={closeEditModal}
          item={editingItem}
        />
      )}
    </Box>
  );
};

export default ShoppingBody;
