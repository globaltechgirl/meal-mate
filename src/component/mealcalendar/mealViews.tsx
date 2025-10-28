import { Box, Text } from "@mantine/core";
import { useState, useRef, useCallback, type FC, type CSSProperties } from "react";
import { useMediaQuery } from "@mantine/hooks";

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

const STATUS_CYCLE: StatusFilter[] = ["All", "Planned", "Completed"];
const MEAL_TYPE_CYCLE: MealTypeView[] = ["All", "Breakfast", "Lunch", "Dinner"];

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

const MealViews: FC = () => {
  const today = new Date();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const [viewMode, setViewMode] = useState<ViewMode>("Board");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");
  const [arrowState, setArrowState] = useState<ArrowState>("Prev");
  const [mealTypeView, setMealTypeView] = useState<MealTypeView>("All");
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());

  const boardRef = useRef<BoardViewHandle>(null);

  const toggleStatusFilter = useCallback(() => {
    setStatusFilter((prev) => {
      const nextIndex = (STATUS_CYCLE.indexOf(prev) + 1) % STATUS_CYCLE.length;
      return STATUS_CYCLE[nextIndex];
    });
  }, []);

  const toggleMealTypeOrMonth = useCallback(() => {
    if (viewMode === "Calendar") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear((prev) => prev + 1);
      } else {
        setCurrentMonth((prev) => prev + 1);
      }
    } else {
      setMealTypeView((prev) => {
        const nextIndex = (MEAL_TYPE_CYCLE.indexOf(prev) + 1) % MEAL_TYPE_CYCLE.length;
        return MEAL_TYPE_CYCLE[nextIndex];
      });
    }
  }, [viewMode, currentMonth]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === "Board" ? "Calendar" : "Board"));
  }, []);

  const handleBoardArrowClick = useCallback(() => {
    const board = boardRef.current;
    if (!board) return;

    const { scrollLeft, maxScrollLeft } = board.getScrollInfo();

    if (arrowState === "Prev") {
      board.scrollRight();
      if (scrollLeft + 300 >= maxScrollLeft) setArrowState("Next");
    } else {
      board.scrollLeft();
      if (scrollLeft <= 0) setArrowState("Prev");
    }
  }, [arrowState]);

  const goPrevMonth = useCallback(() => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  }, [currentMonth]);

  const goNextMonth = useCallback(() => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  }, [currentMonth]);

  const resetFilters = useCallback(() => {
    if (viewMode === "Board") {
      setStatusFilter("All");
      setArrowState("Prev");
      setMealTypeView("All");
    } else {
      setStatusFilter("All");
      setCurrentYear(today.getFullYear());
      setCurrentMonth(today.getMonth());
    }
  }, [viewMode]);

  const renderStatusIcon = (() => {
    switch (statusFilter) {
      case "Completed":
        return <CheckIcon width={12} height={12} />;
      case "Planned":
        return <UncheckIcon width={12} height={12} />;
      default:
        return <PauseIcon width={12} height={12} />;
    }
  })();

  const renderArrowIcon =
    arrowState === "Prev" ? (
      <ArrowNextIcon width={12} height={12} />
    ) : (
      <ArrowPrevIcon width={12} height={12} />
    );

  return (
    <Box p={3} style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.headerText}>Meal Calendar</Text>

        <Box style={styles.headerActions}>
          <Box
            style={isSmallScreen ? styles.iconCircle : styles.filterBox}
            onClick={toggleViewMode}
          >
            <BoardIcon width={10} height={10} color="var(--light-100)" />
            {!isSmallScreen && <Text style={styles.filterText}>{viewMode} View</Text>}
          </Box>

          <Box
            style={isSmallScreen ? styles.iconCircle : styles.filterBox}
            onClick={toggleMealTypeOrMonth}
          >
            <ClockIcon width={10} height={10} color="var(--light-100)" />
            {!isSmallScreen && (
              <Text style={styles.filterText}>
                {viewMode === "Calendar"
                  ? `${currentYear} - ${currentMonth + 1}`
                  : mealTypeView}
              </Text>
            )}
          </Box>

          <Box style={styles.iconCircle} onClick={toggleStatusFilter}>
            {renderStatusIcon}
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
              {renderArrowIcon}
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
