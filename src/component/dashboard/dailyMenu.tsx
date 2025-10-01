import { Box, Text } from "@mantine/core";
import { type FC, useRef, useState } from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";
import DownIcon from "@/assets/icons/down";
import RightIcon from "@/assets/icons/right";

interface FoodItem {
  name: string;
  image: string;
  week: string;
}

const dailyMenuItems: FoodItem[] = [
  { name: "Burger", image: BestImg1, week: "Tuesday" },
  { name: "Chicken", image: BestImg2, week: "Friday" },
  { name: "Pasta", image: BestImg3, week: "Monday" },
  { name: "Pizza", image: BestImg4, week: "Thursday" },
  { name: "Coca Cola", image: BestImg5, week: "Sunday" },
];

const ITEM_HEIGHT = 48;

const DailyMenu: FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const [scrollDown, setScrollDown] = useState(true); 

  const toggleScroll = () => {
    if (!listRef.current) return;

    const scrollBox = listRef.current;
    if (scrollDown) {
      scrollBox.scrollBy({ top: ITEM_HEIGHT, behavior: "smooth" });
      if (scrollBox.scrollTop + scrollBox.clientHeight >= scrollBox.scrollHeight) {
        setScrollDown(false);
      }
    } else {
      scrollBox.scrollBy({ top: -ITEM_HEIGHT, behavior: "smooth" });
      if (scrollBox.scrollTop <= 0) {
        setScrollDown(true);
      }
    }
  };

  const styles = {
    wrapper: {
      width: "100%",
      backgroundColor: "var(--dark-20)",
      border: "0.5px solid var(--border-100)",
      borderRadius: 8,
      padding: 10,
      display: "flex",
      flexDirection: "column" as const,
      gap: 15,
    },

    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },

    title: {
      fontSize: 10.5,
      fontWeight: 500,
      color: "var(--light-100)",
    },

    scrollBox: {
      height: ITEM_HEIGHT * 4,
      overflow: "hidden",
    },

    listWrapper: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 8,
      overflowY: "hidden" as const,
    },

    item: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 10,
      backgroundColor: "var(--dark-30)",
      borderRadius: 12,
      padding: 4,
      flexShrink: 0,
      height: ITEM_HEIGHT,
    },

    image: {
      width: 38,
      height: 38,
      borderRadius: 8,
      objectFit: "cover" as const,
    },

    nameWrapper: {
      display: "flex",
      flexDirection: "column" as const,
      gap: 1,
      flex: 1,
    },

    foodName: {
      fontSize: 9.5,
      fontWeight: 450,
      color: "var(--light-100)",
    },

    weekName: {
      fontSize: 8,
      fontWeight: 400,
      color: "var(--light-200)",
    },

    toggleIcon: {
      cursor: "pointer",
      transform: scrollDown ? "rotate(0deg)" : "rotate(180deg)",
      transition: "transform 0.3s",
      color: "var(--light-200)",
      marginRight: 2,
    },

    rightIcon: {
      cursor: "pointer",
      color: "var(--light-100)",
      fontSize: 12,
      transform: "rotate(30deg)",
      marginRight: 10,
    },
  };

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.header}>
        <Text style={styles.title}>Daily Menus</Text>
        <Box style={styles.toggleIcon} onClick={toggleScroll}>
          <DownIcon width={12} height={12} />
        </Box>
      </Box>

      <Box style={styles.scrollBox} ref={listRef}>
        <Box style={styles.listWrapper}>
          {dailyMenuItems.map((item, index) => (
            <Box key={index} style={styles.item}>
              <img src={item.image} alt={item.name} style={styles.image} />
              <Box style={styles.nameWrapper}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.weekName}>{item.week}</Text>
              </Box>
              <RightIcon width={12} height={12} style={styles.rightIcon} />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DailyMenu;
