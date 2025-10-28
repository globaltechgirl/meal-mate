import { type FC, useState, useMemo, useCallback, type CSSProperties } from "react";
import { Box, Text, Popover } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import FilterIcon from "@/assets/icons/filter";
import ResetIcon from "@/assets/icons/reset";
import CheckIcon from "@/assets/icons/check";
import UncheckIcon from "@/assets/icons/uncheck";
import PauseIcon from "@/assets/icons/pause";
import MoneyIcon from "@/assets/icons/money";
import PlusIcon from "@/assets/icons/plus";

import ShoppingBody from "./shoppingBody";
import AddRecipeModal from "./addRecipe";

export type StatusFilter = "All" | "Pending" | "Complete";
export type AmountView = "Pending" | "Complete";
export type DateFilter = "Today" | "Yesterday" | "This Week" | "This Month";

export interface Item {
  name: string;
  note: string;
  qty: number;
  source: string;
  amount: number;
  status: "Pending" | "Complete";
  createdAt: string;
}

const INITIAL_LIST: Item[] = [
  { name: "Tomatoes", note: "Fresh Roma tomatoes, fully ripe", qty: 3, source: "Local Market", amount: 1500, status: "Pending", createdAt: "2025-10-01" },
  { name: "Milk", note: "2% low fat milk", qty: 2, source: "Supermart", amount: 500, status: "Complete", createdAt: "2025-10-02" },
  { name: "Eggs", note: "One dozen organic eggs", qty: 12, source: "Farm Fresh", amount: 350, status: "Pending", createdAt: "2025-10-03" },
  { name: "Apples", note: "Red Gala apples", qty: 6, source: "Fruit Bazaar", amount: 900, status: "Complete", createdAt: "2025-10-04" },
  { name: "Bread", note: "Whole grain sandwich loaf", qty: 2, source: "Bakery", amount: 250, status: "Pending", createdAt: "2025-10-01" },
  { name: "Cheese", note: "Cheddar cheese block", qty: 1, source: "Deli Shop", amount: 1200, status: "Complete", createdAt: "2025-10-05" },
  { name: "Chicken", note: "Boneless chicken breast", qty: 5, source: "Supermart", amount: 2500, status: "Pending", createdAt: "2025-10-06" },
];

const DATE_OPTIONS: DateFilter[] = ["Today", "Yesterday", "This Week", "This Month"];

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

const ShoppingViews: FC = () => {
  const [shoppingList, setShoppingList] = useState<Item[]>(INITIAL_LIST);
  const [dateFilter, setDateFilter] = useState<DateFilter>("This Month");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [datePopoverOpened, setDatePopoverOpened] = useState(false);
  const [addModalOpened, setAddModalOpened] = useState(false); 

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const filteredList = useMemo(() => {
    return shoppingList
      .filter(
        (item) =>
          matchDateFilter(item.createdAt, dateFilter) &&
          (statusFilter === "All" || item.status === statusFilter)
      )
      .sort((a, b) =>
        a.status === "Pending" && b.status === "Complete" ? -1 : 1
      );
  }, [shoppingList, dateFilter, statusFilter]);

  const pendingAmount = useMemo(
    () =>
      filteredList
        .filter((i) => i.status === "Pending")
        .reduce((sum, i) => sum + i.amount, 0),
    [filteredList]
  );

  const completedAmount = useMemo(
    () =>
      filteredList
        .filter((i) => i.status === "Complete")
        .reduce((sum, i) => sum + i.amount, 0),
    [filteredList]
  );

  const displayedAmount =
    statusFilter === "Complete" ? completedAmount : pendingAmount;

  const displayedView: AmountView =
    statusFilter === "Complete" ? "Complete" : "Pending";

  const toggleRowStatus = useCallback((name: string) => {
    setShoppingList((prev) =>
      prev.map((item) =>
        item.name === name
          ? { ...item, status: item.status === "Complete" ? "Pending" : "Complete" }
          : item
      )
    );
  }, []);

  const toggleStatusFilter = useCallback(() => {
    setStatusFilter((prev) =>
      prev === "All" ? "Pending" : prev === "Pending" ? "Complete" : "All"
    );
  }, []);

  const resetFilters = useCallback(() => {
    setDateFilter("This Month");
    setStatusFilter("All");
  }, []);

  const openAddModal = useCallback(() => setAddModalOpened(true), []);
  const closeAddModal = useCallback(() => setAddModalOpened(false), []);

  const getShortDateLabel = useCallback(
    (filter: DateFilter) => {
      if (!isSmallScreen) return filter;
      switch (filter) {
        case "Today":
          return "T";
        case "Yesterday":
          return "Y";
        case "This Week":
          return "W";
        case "This Month":
          return "M";
        default:
          return filter;
      }
    },
    [isSmallScreen]
  );

  const currencySymbol = (
    <MoneyIcon width={11} height={11} color="var(--light-100)" />
  );

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Shopping List</Text>

        <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Box style={styles.filterBox}>
            {currencySymbol}
            <Text
              style={{
                fontSize: 8.5,
                fontWeight: 450,
                color: "var(--light-100)",
                marginLeft: 0.5,
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {displayedAmount.toFixed(2)}
              <span style={{ fontSize: 7.5, color: "var(--light-300)" }}>
                ({isSmallScreen
                  ? displayedView === "Pending"
                    ? "P"
                    : "C"
                  : displayedView})
              </span>
            </Text>
          </Box>

          <Popover
            opened={datePopoverOpened}
            onClose={() => setDatePopoverOpened(false)}
            position="bottom"
            closeOnClickOutside
          >
            <Popover.Target>
              <Box
                style={{ ...styles.filterBox, cursor: "pointer" }}
                onClick={() => setDatePopoverOpened((o) => !o)}
              >
                <FilterIcon width={10} height={10} color="var(--light-100)" />
                <Text
                  style={{
                    marginLeft: 4,
                    fontSize: 8.5,
                    fontWeight: 450,
                    color: "var(--light-100)",
                  }}
                >
                  {getShortDateLabel(dateFilter)}
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
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {DATE_OPTIONS.map((option) => (
                <Box
                  key={option}
                  onClick={() => {
                    setDateFilter(option);
                    setDatePopoverOpened(false);
                  }}
                  style={{
                    fontSize: 8.5,
                    fontWeight: 450,
                    color: "var(--light-100)",
                    padding: "4px 8px",
                    borderRadius: 4,
                    cursor: "pointer",
                    backgroundColor:
                      dateFilter === option ? "var(--dark-20)" : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "var(--dark-20)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                      dateFilter === option ? "var(--dark-20)" : "transparent")
                  }
                >
                  {getShortDateLabel(option)}
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

          <Box style={styles.iconCircle} onClick={openAddModal}>
            <PlusIcon width={12} height={12} />
          </Box>

          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      <ShoppingBody
        items={filteredList}
        toggleRowStatus={toggleRowStatus}
        currencySymbol={currencySymbol}
      />

      <AddRecipeModal opened={addModalOpened} onClose={closeAddModal} />
    </Box>
  );
};

export default ShoppingViews;
