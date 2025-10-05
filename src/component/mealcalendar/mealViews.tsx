import { Box, Text } from "@mantine/core";
import { useState, useRef, useCallback, type FC, type CSSProperties } from "react";

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
  headerActions: {
    display: "flex",
    gap: 8,
    alignItems: "center",
  },
};

const STATUS_CYCLE: StatusFilter[] = ["All", "Planned", "Completed"];
const MEAL_TYPE_CYCLE: MealTypeView[] = ["All", "Breakfast", "Lunch", "Dinner"];

const MealViews: FC = () => {
  const today = new Date();

  const [viewMode, setViewMode] = useState<ViewMode>("Board");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [arrowState, setArrowState] = useState<ArrowState>("Prev");
  const [mealTypeView, setMealTypeView] = useState<MealTypeView>("All");

  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());

  const boardRef = useRef<BoardViewHandle>(null);

  const toggleStatusFilter = () => {
    setStatusFilter(prev => STATUS_CYCLE[(STATUS_CYCLE.indexOf(prev) + 1) % STATUS_CYCLE.length]);
  };

  const toggleMealTypeOrMonth = () => {
    if (viewMode === "Calendar") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(prev => prev + 1);
      } else {
        setCurrentMonth(prev => prev + 1);
      }
    } else {
      setMealTypeView(
        prev => MEAL_TYPE_CYCLE[(MEAL_TYPE_CYCLE.indexOf(prev) + 1) % MEAL_TYPE_CYCLE.length]
      );
    }
  };

  const toggleViewMode = () => {
    setViewMode(prev => (prev === "Board" ? "Calendar" : "Board"));
  };

  const handleBoardArrowClick = useCallback(() => {
    if (!boardRef.current) return;
    const { scrollLeft, maxScrollLeft } = boardRef.current.getScrollInfo();

    if (arrowState === "Prev") {
      boardRef.current.scrollRight();
      if (scrollLeft + 300 >= maxScrollLeft) {
        setArrowState("Next");
      }
    } else {
      boardRef.current.scrollLeft();
      if (scrollLeft <= 0) {
        setArrowState("Prev");
      }
    }
  }, [arrowState]);

  const goPrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonth(prev => prev - 1);
    }
  };

  const goNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonth(prev => prev + 1);
    }
  };

  const resetFilters = () => {
    if (viewMode === "Board") {
      setStatusFilter("All");
      setArrowState("Prev");
      setMealTypeView("All");
    } else {
      setStatusFilter("All");
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth());
    }
  };

  const renderBoardArrowIcon = arrowState === "Prev" 
    ? <ArrowNextIcon width={12} height={12} /> 
    : <ArrowPrevIcon width={12} height={12} />;

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Meal Calendar</Text>
        <Box style={styles.headerActions}>
          <Box style={styles.filterBox} onClick={toggleViewMode}>
            <BoardIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.filterText}>{viewMode} View</Text>
          </Box>

          <Box style={styles.filterBox} onClick={toggleMealTypeOrMonth}>
            <ClockIcon width={10} height={10} color="var(--light-100)" />
            <Text style={styles.filterText}>
              {viewMode === "Calendar"
                ? `${currentYear} - ${currentMonth + 1}`
                : mealTypeView}
            </Text>
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

          {viewMode === "Calendar" ? (
            <>
              <Box style={styles.iconCircle} onClick={goPrevMonth}>
                <ArrowPrevIcon width={12} height={12} />
              </Box>
              <Box style={styles.iconCircle} onClick={goNextMonth}>
                <ArrowNextIcon width={12} height={12} />
              </Box>
            </>
          ) : (
            <Box style={styles.iconCircle} onClick={handleBoardArrowClick}>
              {renderBoardArrowIcon}
            </Box>
          )}

          <Box style={styles.iconCircle} onClick={resetFilters}>
            <ResetIcon width={12} height={12} />
          </Box>
        </Box>
      </Box>

      <Box>
        {viewMode === "Board" ? (
          <BoardView
            key="board"
            ref={boardRef}
            statusFilter={statusFilter}
            mealTypeFilter={mealTypeView}
            arrowState={arrowState}
          />
        ) : (
          <CalendarView
            key="calendar"
            year={currentYear}
            month={currentMonth}
            statusFilter={statusFilter}
            mealTypeFilter={mealTypeView}
          />
        )}
      </Box>
    </Box>
  );
};

export default MealViews;
