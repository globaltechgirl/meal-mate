import { Box, Text, Popover, Menu } from "@mantine/core";
import { useState, useMemo, type FC, type CSSProperties } from "react";

import FilterIcon from "@/assets/icons/filter";
import ResetIcon from "@/assets/icons/reset";
import CheckIcon from "@/assets/icons/check";
import UncheckIcon from "@/assets/icons/uncheck";
import MenuIcon from "@/assets/icons/menu";
import MoneyIcon from "@/assets/icons/money";
import PauseCheckIcon from "@/assets/icons/pausecheck";

type StatusFilter = "All" | "Pending" | "Complete";
type AmountView = "Pending" | "Complete";
type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";

const styles = {
  wrapper: {
    width: "100%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column" as const,
    gap: "4px",
  },
  header: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "4px 8px",
  } as CSSProperties,
  headerText: {
    fontSize: 10.5,
    fontWeight: 500,
    color: "var(--light-100)",
  } as CSSProperties,
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
  } as CSSProperties,
  filterBox: {
    display: "flex",
    alignItems: "center",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    padding: "0 8px 0 6px",
    background: "var(--dark-30)",
    cursor: "pointer",
    height: 24,
  } as CSSProperties,
  bodyWrapper: {
    padding: 4,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
  } as CSSProperties,
  topSection: {
    display: "grid",
    gridTemplateColumns:
      "0.1fr 0.6fr 1fr 0.5fr 0.4fr 0.45fr 0.4fr 0.45fr 0.06fr",
    alignItems: "center",
    backgroundColor: "var(--dark-20)",
    borderRadius: 6,
    padding: "8px",
  } as CSSProperties,
  textBase: {
    fontSize: 9.5,
    fontWeight: 450,
  } as CSSProperties,
  topText: {
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-200)",
  } as CSSProperties,
  row: {
    display: "grid",
    gridTemplateColumns:
      "0.1fr 0.6fr 1fr 0.5fr 0.4fr 0.45fr 0.4fr 0.45fr 0.06fr",
    alignItems: "center",
    padding: "8px",
  } as CSSProperties,
  rowText: {
    fontSize: 9.5,
    fontWeight: 450,
    color: "var(--light-100)",
  } as CSSProperties,
  statusText: {
    padding: "3px 6px",
    width: "fit-content",
    borderRadius: 6,
    backgroundColor: "var(--dark-10)",
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    textAlign: "center" as const,
  } as CSSProperties,
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
  const boxStyle: CSSProperties = {
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
  };

  const handleClick = () => {
    if (!disabled) onChange(!checked);
  };

  return (
    <span style={boxStyle} onClick={handleClick}>
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
  {
    name: "Tomatoes",
    note: "Fresh Roma tomatoes, fully ripe and ideal for salad or sauce preparation",
    qty: 3,
    source: "Local Market",
    amount: 1500,
    status: "Pending",
    createdAt: "2025-10-01",
  },
  {
    name: "Milk",
    note: "2% low fat milk, primarily for morning coffee and cereal use",
    qty: 2,
    source: "Supermart",
    amount: 1500,
    status: "Complete",
    createdAt: "2025-10-02",
  },
  {
    name: "Eggs",
    note: "One dozen organic brown eggs, perfect for breakfast and light baking",
    qty: 12,
    source: "Farm Fresh",
    amount: 1500,
    status: "Pending",
    createdAt: "2025-10-03",
  },
];

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

const dateOptions: DateFilter[] = ["Today", "Yesterday", "This Week", "This Month"];

const MainList: FC = () => {
  const [dateFilter, setDateFilter] = useState<DateFilter>("This Month");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [shoppingList, setShoppingList] = useState<Item[]>(initialList);
  const [amountView, setAmountView] = useState<AmountView>("Pending");
  const [popoverOpened, setPopoverOpened] = useState(false);

  const filteredList = useMemo(
    () =>
      shoppingList.filter(
        (item) =>
          matchDateFilter(item.createdAt, dateFilter) &&
          (statusFilter === "All" || item.status === statusFilter)
      ),
    [shoppingList, dateFilter, statusFilter]
  );

  const pendingAmount = useMemo(
    () =>
      filteredList
        .filter((i) => i.status === "Pending")
        .reduce((s, i) => s + i.amount, 0),
    [filteredList]
  );

  const completedAmount = useMemo(
    () =>
      filteredList
        .filter((i) => i.status === "Complete")
        .reduce((s, i) => s + i.amount, 0),
    [filteredList]
  );

  const displayedAmount =
    amountView === "Pending" ? pendingAmount : completedAmount;

  const toggleRowStatus = (name: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.name === name
          ? {
              ...item,
              status: item.status === "Complete" ? "Pending" : "Complete",
            }
          : item
      )
    );
  };

  const toggleStatusFilter = () => {
    setStatusFilter((prev) =>
      prev === "All" ? "Pending" : prev === "Pending" ? "Complete" : "All"
    );
  };

  const toggleAmountView = () => {
    setAmountView((prev) => (prev === "Pending" ? "Complete" : "Pending"));
  };

  const resetFilters = () => {
    setDateFilter("This Month");
    setStatusFilter("All");
    setAmountView("Pending");
  };

  const currencySymbol = <MoneyIcon width={11} height={11} color="var(--light-100)" />;

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Shopping List</Text>
        <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {/* Amount Toggle */}
          <Box style={styles.filterBox} onClick={toggleAmountView}>
            {currencySymbol}
            <Text
              style={{
                fontSize: 8.5,
                fontWeight: 500,
                color: "var(--light-100)",
                marginLeft: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {displayedAmount.toFixed(2)}
              <span style={{ fontSize: 7.5, color: "var(--light-300)" }}>
                ({amountView})
              </span>
            </Text>
          </Box>

          {/* Date Filter using Popover */}
          <Popover
            opened={popoverOpened}
            onClose={() => setPopoverOpened(false)}
            position="bottom"
            closeOnClickOutside
          >
            <Popover.Target>
              <Box 
                style={styles.filterBox} 
                onClick={() => setPopoverOpened((o) => !o)}>
                <FilterIcon width={10} height={10} color="var(--light-100)" />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 8.5,
                    fontWeight: 450,
                    color: "var(--light-100)",
                  }}
                >
                  {dateFilter}
                </Text>
              </Box>
            </Popover.Target>

            <Popover.Dropdown
              style={{
                width: 80,
                padding: 2,
                backgroundColor: "var(--dark-30)",
                border: "1px solid var(--dark-10)",
                borderRadius: 6,
              }}
            >
              {dateOptions.map((item) => (
                <Box
                  key={item}
                  onClick={() => {
                    setDateFilter(item);
                    setPopoverOpened(false);
                  }}
                  style={{
                    fontSize: 8.5,
                    fontWeight: 450,
                    color: "var(--light-100)",
                    padding: "4px 12px",
                    borderRadius: 4,
                    cursor: "pointer",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor = "var(--dark-20)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.backgroundColor =
                      dateFilter === item ? "var(--dark-20)" : "transparent")
                  }
                >
                  {item}
                </Box>
              ))}
            </Popover.Dropdown>
          </Popover>

          {/* Status Filter */}
          <Box style={styles.iconCircle} onClick={toggleStatusFilter}>
            {statusFilter === "Complete" ? (
              <CheckIcon width={12} height={12} />
            ) : statusFilter === "Pending" ? (
              <UncheckIcon width={12} height={12} />
            ) : (
              <PauseCheckIcon width={12} height={12} />
            )}
          </Box>

          {/* Reset */}
          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      {/* Body */}
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
              <Text style={styles.rowText}>
                {item.note.length > 40 ? `${item.note.slice(0, 40)}...` : item.note}
              </Text>
              <Text style={styles.rowText}>{item.source}</Text>
              <Text style={styles.rowText}>{item.qty} Qty</Text>
              <Text style={{ ...styles.rowText, display: "flex", alignItems: "center", gap: 0.5 }}>
                {currencySymbol}
                {item.amount.toFixed(2)}
              </Text>
              <Text style={{ ...styles.rowText, ...styles.statusText }}>{item.status}</Text>
              <Text style={styles.rowText}>{item.createdAt}</Text>

              <Menu shadow="md" width={100}>
                <Menu.Target>
                  <Box style={{ cursor: "pointer" }}>
                    <MenuIcon width={10} height={10} />
                  </Box>
                </Menu.Target>
                <Menu.Dropdown
                  style={{
                    width: 85,
                    padding: 4,
                    backgroundColor: "var(--dark-30)",
                    border: "1px solid var(--dark-10)",
                    borderRadius: 6,
                  }}
                >
                  <Menu.Item style={{ fontSize: 10, color: "var(--light-100)" }}>
                    Edit
                  </Menu.Item>
                  <Menu.Item style={{ fontSize: 10, color: "var(--light-100)" }}>
                    Delete
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Box>
            {idx < filteredList.length - 1 && (
              <hr style={{ border: "0.5px solid var(--dark-10)" }} />
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default MainList;
