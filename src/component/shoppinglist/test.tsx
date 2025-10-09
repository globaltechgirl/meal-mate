import { Box, Text, Popover } from "@mantine/core";
import { useState, useMemo, useCallback, type FC, type CSSProperties } from "react";

import FilterIcon from "@/assets/icons/filter";
import ResetIcon from "@/assets/icons/reset";
import CheckIcon from "@/assets/icons/check";
import UncheckIcon from "@/assets/icons/uncheck";
import MenuIcon from "@/assets/icons/menu";
import MoneyIcon from "@/assets/icons/money";
import PauseIcon from "@/assets/icons/pause";

type StatusFilter = "All" | "Pending" | "Complete";
type AmountView = "Pending" | "Complete";
type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";

interface Item {
  name: string;
  note: string;
  qty: number;
  source: string;
  amount: number;
  status: "Pending" | "Complete";
  createdAt: string;
}

const initialList: Item[] = [
  { name: "Tomatoes", note: "Fresh Roma tomatoes, fully ripe and ideal for salad or sauce preparation", qty: 3, source: "Local Market", amount: 1500, status: "Pending", createdAt: "2025-10-01" },
  { name: "Milk", note: "2% low fat milk, primarily for morning coffee and cereal use", qty: 2, source: "Supermart", amount: 500, status: "Complete", createdAt: "2025-10-02" },
  { name: "Eggs", note: "One dozen organic brown eggs, perfect for breakfast and light baking", qty: 12, source: "Farm Fresh", amount: 350, status: "Pending", createdAt: "2025-10-03" },
  { name: "Apples", note: "Red Gala apples, crisp and sweet", qty: 6, source: "Fruit Bazaar", amount: 900, status: "Complete", createdAt: "2025-10-04" },
  { name: "Bread", note: "Whole grain sandwich bread loaf", qty: 2, source: "Bakery", amount: 250, status: "Pending", createdAt: "2025-10-01" },
  { name: "Cheese", note: "Cheddar cheese block, aged 6 months", qty: 1, source: "Deli Shop", amount: 1200, status: "Complete", createdAt: "2025-10-05" },
  { name: "Chicken", note: "Boneless chicken breast, frozen", qty: 5, source: "Supermart", amount: 2500, status: "Pending", createdAt: "2025-10-06" },
  { name: "Rice", note: "Basmati rice, 5 kg pack", qty: 1, source: "Wholesale Market", amount: 1800, status: "Complete", createdAt: "2025-10-02" },
  { name: "Pasta", note: "Italian penne pasta, 500g", qty: 3, source: "Supermart", amount: 450, status: "Pending", createdAt: "2025-10-03" },
  { name: "Orange Juice", note: "Freshly squeezed, 1 liter bottle", qty: 2, source: "Juice Bar", amount: 600, status: "Complete", createdAt: "2025-10-04" },
  { name: "Spinach", note: "Organic green spinach leaves, washed", qty: 1, source: "Farm Fresh", amount: 200, status: "Pending", createdAt: "2025-10-05" },
  { name: "Yogurt", note: "Greek yogurt, plain 500g tub", qty: 2, source: "Supermart", amount: 700, status: "Complete", createdAt: "2025-10-06" },
  { name: "Butter", note: "Unsalted butter, 250g", qty: 1, source: "Dairy Shop", amount: 400, status: "Pending", createdAt: "2025-10-01" },
  { name: "Bananas", note: "Cavendish bananas, ripe yellow bunch", qty: 6, source: "Fruit Bazaar", amount: 300, status: "Complete", createdAt: "2025-10-02" },
  { name: "Coffee", note: "Ground coffee, medium roast, 250g", qty: 1, source: "Coffee Shop", amount: 900, status: "Pending", createdAt: "2025-10-03" },
  { name: "Tea Bags", note: "Green tea bags, 20 count box", qty: 2, source: "Supermart", amount: 500, status: "Complete", createdAt: "2025-10-04" },
  { name: "Cucumber", note: "Fresh cucumbers, ideal for salads", qty: 4, source: "Local Market", amount: 400, status: "Pending", createdAt: "2025-10-05" },
  { name: "Carrots", note: "Organic orange carrots, 1 kg", qty: 2, source: "Farm Fresh", amount: 350, status: "Complete", createdAt: "2025-10-06" },
  { name: "Olive Oil", note: "Extra virgin olive oil, 500ml bottle", qty: 1, source: "Gourmet Shop", amount: 1500, status: "Pending", createdAt: "2025-10-02" },
  { name: "Sugar", note: "White granulated sugar, 1 kg", qty: 1, source: "Supermart", amount: 300, status: "Complete", createdAt: "2025-10-03" },
];

const dateOptions: DateFilter[] = ["Today", "Yesterday", "This Week", "This Month"];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
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
  iconCircle: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
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
  bodyWrapper: {
    padding: 4,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
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
};

interface PrettyCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: number;
  color?: string;
  borderColor?: string;
  bgUnchecked?: string;
  iconColor?: string;
}

const PrettyCheckbox: FC<PrettyCheckboxProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 12,
  color = "var(--primary)",
  borderColor = "var(--dark-10)",
  bgUnchecked = "var(--dark-30)",
  iconColor = "var(--light-100)",
}) => {
  const handleClick = useCallback(() => {
    if (!disabled) onChange(!checked);
  }, [checked, disabled, onChange]);

  return (
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
      onClick={handleClick}
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
};

const matchDateFilter = (date: string, filter: DateFilter): boolean => {
  const itemDate = new Date(date);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  switch (filter) {
    case "Today":
      return itemDate.toDateString() === today.toDateString();
    case "Yesterday":
      return itemDate.toDateString() === yesterday.toDateString();
    case "This Week": {
      const weekStart = new Date(today);
      weekStart.setDate(today.getDate() - today.getDay());
      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekStart.getDate() + 6);
      weekStart.setHours(0, 0, 0, 0);
      weekEnd.setHours(23, 59, 59, 999);
      return itemDate >= weekStart && itemDate <= weekEnd;
    }
    case "This Month":
      return (
        itemDate.getMonth() === today.getMonth() &&
        itemDate.getFullYear() === today.getFullYear()
      );
    default:
      return true;
  }
};

interface PopoverItemProps {
  label: string;
  onClick: () => void;
}

const PopoverItem: FC<PopoverItemProps> = ({ label, onClick }) => {
  const baseStyle: CSSProperties = {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    padding: "4px 8px",
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "transparent",
  };

  return (
    <Box
      style={baseStyle}
      onClick={onClick}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--dark-20)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "transparent")}
    >
      {label}
    </Box>
  );
};

const MainList: FC = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("This Month");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [shoppingList, setShoppingList] = useState<Item[]>(initialList);
  const [amountView, setAmountView] = useState<AmountView>("Pending");
  const [datePopoverOpened, setDatePopoverOpened] = useState(false);
  const [rowPopoverOpenIndex, setRowPopoverOpenIndex] = useState<number | null>(null);

  const filteredList = useMemo(() => {
    const list = shoppingList.filter(
      (item) =>
        matchDateFilter(item.createdAt, dateFilter) &&
        (statusFilter === "All" || item.status === statusFilter)
    );

    return list.sort((a, b) =>
      a.status === "Pending" && b.status === "Complete"
        ? -1
        : a.status === "Complete" && b.status === "Pending"
        ? 1
        : 0
    );
  }, [shoppingList, dateFilter, statusFilter]);

  const pendingAmount = useMemo(
    () => filteredList.filter((i) => i.status === "Pending").reduce((s, i) => s + i.amount, 0),
    [filteredList]
  );
  const completedAmount = useMemo(
    () => filteredList.filter((i) => i.status === "Complete").reduce((s, i) => s + i.amount, 0),
    [filteredList]
  );
  const displayedAmount = amountView === "Pending" ? pendingAmount : completedAmount;

  const toggleRowStatus = useCallback(
    (name: string) => {
      setShoppingList((prev) =>
        prev.map((item) =>
          item.name === name
            ? { ...item, status: item.status === "Complete" ? "Pending" : "Complete" }
            : item
        )
      );
    },
    [setShoppingList]
  );

  const toggleStatusFilter = useCallback(() => {
    setStatusFilter((prev) =>
      prev === "All" ? "Pending" : prev === "Pending" ? "Complete" : "All"
    );
  }, []);

  const toggleAmountView = useCallback(() => setAmountView((prev) => (prev === "Pending" ? "Complete" : "Pending")), []);
  const resetFilters = useCallback(() => {
    setDateFilter("This Month");
    setStatusFilter("All");
    setAmountView("Pending");
  }, []);

  const currencySymbol = <MoneyIcon width={11} height={11} color="var(--light-100)" />;

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Shopping List</Text>
        <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Box style={styles.filterBox} onClick={toggleAmountView}>
            {currencySymbol}
            <Text style={{ fontSize: 8.5, fontWeight: 450, color: "var(--light-100)", marginLeft: 0.5, display: "flex", alignItems: "center", gap: 4 }}>
              {displayedAmount.toFixed(2)}
              <span style={{ fontSize: 7.5, color: "var(--light-300)" }}>({amountView})</span>
            </Text>
          </Box>

          <Popover opened={datePopoverOpened} onClose={() => setDatePopoverOpened(false)} position="bottom" closeOnClickOutside>
            <Popover.Target>
              <Box style={styles.filterBox} onClick={() => setDatePopoverOpened((o) => !o)}>
                <FilterIcon width={10} height={10} color="var(--light-100)" />
                <Text style={{ marginLeft: 4, fontSize: 8.5, fontWeight: 450, color: "var(--light-100)" }}>{dateFilter}</Text>
              </Box>
            </Popover.Target>
            <Popover.Dropdown style={{ width: 80, padding: 2, backgroundColor: "var(--dark-30)", border: "1px solid var(--dark-10)", borderRadius: 6, marginTop: -4, display: "flex", flexDirection: "column", gap: "2px" }}>
              {dateOptions.map((item) => (
                <Box
                  key={item}
                  onClick={() => {
                    setDateFilter(item);
                    setDatePopoverOpened(false);
                  }}
                  style={{ fontSize: 8.5, fontWeight: 450, color: "var(--light-100)", padding: "4px 12px", borderRadius: 4, cursor: "pointer", backgroundColor: dateFilter === item ? "var(--dark-20)" : "transparent" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--dark-20)")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = dateFilter === item ? "var(--dark-20)" : "transparent")}
                >
                  {item}
                </Box>
              ))}
            </Popover.Dropdown>
          </Popover>

          <Box style={styles.iconCircle} onClick={toggleStatusFilter}>
            {statusFilter === "Complete" ? (
              <CheckIcon width={12} height={12} />
            ) : statusFilter === "Pending" ? (
              <UncheckIcon width={12} height={12} />
            ) : (
              <PauseIcon width={12} height={12} />
            )}
          </Box>

          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      <Box style={styles.bodyWrapper}>
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

        {filteredList.map((item, idx) => (
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
              <Text style={styles.rowText}>{item.note.length > 40 ? `${item.note.slice(0, 40)}...` : item.note}</Text>
              <Text style={styles.rowText}>{item.source}</Text>
              <Text style={styles.rowText}>{item.qty} Qty</Text>
              <Text style={{ ...styles.rowText, display: "flex", alignItems: "center", gap: 0.5 }}>{currencySymbol}{item.amount.toFixed(2)}</Text>
              <Text style={{ ...styles.rowText, ...styles.statusText }}>{item.status}</Text>
              <Text style={styles.rowText}>{item.createdAt}</Text>

              <Popover opened={rowPopoverOpenIndex === idx} onClose={() => setRowPopoverOpenIndex(null)} position="bottom" shadow="md" closeOnClickOutside withinPortal>
                <Popover.Target>
                  <Box
                    style={{ cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 24, height: 24 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRowPopoverOpenIndex((prev) => (prev === idx ? null : idx));
                    }}
                  >
                    <MenuIcon width={10} height={10} />
                  </Box>
                </Popover.Target>
                <Popover.Dropdown style={{ width: 60, padding: 2, backgroundColor: "var(--dark-30)", border: "1px solid var(--dark-10)", borderRadius: 6, marginLeft: -10, marginTop: -6, display: "flex", flexDirection: "column", gap: "2px" }}>
                  <PopoverItem label="Edit" onClick={() => setRowPopoverOpenIndex(null)} />
                  <PopoverItem label="Delete" onClick={() => { console.log("Delete clicked", idx); setRowPopoverOpenIndex(null); }} />
                </Popover.Dropdown>
              </Popover>
            </Box>
            {idx < filteredList.length - 1 && <hr style={{ border: "0.5px solid var(--dark-10)" }} />}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainList;
