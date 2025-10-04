import { Box, Text } from "@mantine/core";
import { useState, useCallback, useRef, type FC, type CSSProperties } from "react";

import BoardView, { type BoardViewHandle } from "./boardView";
import CalendarView from "./calendarView";

import BoardIcon from "@/assets/icons/board";
import ResetIcon from "@/assets/icons/reset";
import CheckIcon from "@/assets/icons/check";
import UncheckIcon from "@/assets/icons/uncheck";
import PauseIcon from "@/assets/icons/pause";
import ArrowNextIcon from "@/assets/icons/arrownext";
import ArrowPrevIcon from "@/assets/icons/arrowprev";
import ClockIcon from "@/assets/icons/clock";

type StatusFilter = "All" | "Planned" | "Completed";
type ViewMode = "Board" | "Calendar";
type ArrowState = "Prev" | "Next";
type MealTypeView = "All" | "Breakfast" | "Lunch" | "Dinner";

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
  filterText: {
    marginLeft: 4,
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
  },
};

const MealViews: FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("Board");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [arrowState, setArrowState] = useState<ArrowState>("Prev");
  const [mealTypeView, setMealTypeView] = useState<MealTypeView>("All");

  const boardRef = useRef<BoardViewHandle>(null);

  const statusCycle: StatusFilter[] = ["All", "Planned", "Completed"];
  const mealTypeCycle: MealTypeView[] = ["All", "Breakfast", "Lunch", "Dinner"];

  const toggleStatusFilter = useCallback(() => {
    setStatusFilter((prev) => {
      const nextIndex = (statusCycle.indexOf(prev) + 1) % statusCycle.length;
      return statusCycle[nextIndex];
    });
  }, []);

  const toggleMealTypeView = useCallback(() => {
    setMealTypeView((prev) => {
      const nextIndex = (mealTypeCycle.indexOf(prev) + 1) % mealTypeCycle.length;
      return mealTypeCycle[nextIndex];
    });
  }, []);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "Board" ? "Calendar" : "Board"));
  }, []);

  const handleArrowClick = useCallback(() => {
    if (!boardRef.current) return;

    const { scrollLeft, maxScrollLeft } = boardRef.current.getScrollInfo();
    const scrollAmount = 300;

    if (arrowState === "Prev") {
        const newScrollLeft = Math.max(scrollLeft - scrollAmount, 0);
        boardRef.current.scrollLeft();
        if (newScrollLeft === 0) setArrowState("Next"); 
    } else {
        const newScrollLeft = Math.min(scrollLeft + scrollAmount, maxScrollLeft);
        boardRef.current.scrollRight();
        if (newScrollLeft === maxScrollLeft) setArrowState("Prev"); 
    }
  }, [arrowState]);


  const resetFilters = useCallback(() => {
    setViewMode("Board");
    setStatusFilter("All");
    setArrowState("Prev");
    setMealTypeView("All");
  }, []);

  const renderArrowIcon = useCallback(() => {
    return arrowState === "Prev" ? (
      <ArrowPrevIcon width={12} height={12} />
    ) : (
      <ArrowNextIcon width={12} height={12} />
    );
  }, [arrowState]);

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Meal Calendar</Text>
        <Box style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Box style={styles.filterBox} onClick={toggleViewMode}>
            <BoardIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.filterText}>{viewMode} View</Text>
          </Box>

          <Box style={styles.filterBox} onClick={toggleMealTypeView}>
            <ClockIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.filterText}>{mealTypeView}</Text>
          </Box>

          <Box style={styles.iconCircle} onClick={toggleStatusFilter}>
            {statusFilter === "Completed" ? (
              <CheckIcon width={12} height={12} />
            ) : statusFilter === "Planned" ? (
              <UncheckIcon width={12} height={12} />
            ) : (
              <PauseIcon width={12} height={12} />
            )}
          </Box>

          <Box style={styles.iconCircle} onClick={handleArrowClick}>
            {renderArrowIcon()}
          </Box>

          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      <Box>
        {viewMode === "Board" ? (
          <BoardView ref={boardRef} statusFilter={statusFilter} mealTypeFilter={mealTypeView} />
        ) : (
          <CalendarView />
        )}
      </Box>
    </Box>
  );
};

export default MealViews;
