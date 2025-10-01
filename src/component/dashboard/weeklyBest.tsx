import { Box, Text } from "@mantine/core";
import { type FC, useState, useEffect } from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import BestImg2 from "@/assets/best-img2.jpg";
import BestImg3 from "@/assets/best-img3.jpg";
import BestImg4 from "@/assets/best-img4.jpg";
import BestImg5 from "@/assets/best-img5.jpg";

interface FoodItem {
  name: string;
  image: string;
}

const weeklyBestItems: FoodItem[] = [
  { name: "Burger", image: BestImg1 },
  { name: "Chicken", image: BestImg2 },
  { name: "Chicken", image: BestImg3 },
  { name: "Pizza", image: BestImg4 },
  { name: "Coca Cola", image: BestImg5 },
];

const WeeklySelfBest: FC = () => {
  const [currentIndex, setCurrentIndex] = useState(2); 

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % weeklyBestItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const leftIndex = (currentIndex - 1 + weeklyBestItems.length) % weeklyBestItems.length;
  const rightIndex = (currentIndex + 1) % weeklyBestItems.length;

  const styles = {
    wrapper: {
      width: "100%",
      height: 220,
      backgroundColor: "var(--dark-20)",
      border: "0.5px solid var(--border-100)",
      borderRadius: 8,
      display: "flex",
      flexDirection: "column" as const,
      gap: 15,
      padding: 10,
      overflow: "hidden",
      position: "relative" as const,
      flex: 1,
    },

    title: {
      fontSize: 10.5,
      fontWeight: 500,
      color: "var(--light-100)",
    },

    sliderWrapper: {
      width: "100%",
      height: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative" as const,
    },

    card: (isActive: boolean): React.CSSProperties => ({
      width: "80%",
      height: "98%",
      backgroundColor: "var(--dark-30)",
      borderRadius: 12,
      display: "flex",
      flexDirection: "column" as const,
      alignItems: "center",
      justifyContent: "center",
      padding: 4,
      transform: `scale(${isActive ? 1 : 0.85})`,
      filter: isActive ? "brightness(1)" : "brightness(0.6)",
      transition: "transform 0.5s ease, filter 0.5s ease",
      position: "absolute" as const,
      zIndex: isActive ? 2 : 1,
      paddingBottom: 6,
      flex: 1,
    }),

    image: {
      width: "100%",
      height: "88%",
      objectFit: "cover" as const,
      borderRadius: 8,
    },

    foodName: {
      marginTop: 8,
      fontSize: 9,
      fontWeight: 450,
      color: "var(--light-200)",
      textAlign: "center" as const,
    },
  };

  const renderCard = (item: FoodItem, isActive: boolean, position: "left" | "center" | "right") => {
    let positionStyle: React.CSSProperties = {};
    if (position === "left") positionStyle = { left: "-68%" };
    if (position === "center") positionStyle = { left: "50%", transform: "translateX(-50%) scale(1)" };
    if (position === "right") positionStyle = { right: "-68%" };

    return (
      <Box style={{ ...styles.card(isActive), ...positionStyle }}>
        <img src={item.image} alt={item.name} style={styles.image} />
        <Text style={styles.foodName}>{item.name}</Text>
      </Box>
    );
  };

  return (
    <Box style={styles.wrapper}>
      <Text style={styles.title}>Weekly Self Best Item</Text>
      <Box style={styles.sliderWrapper}>
        {renderCard(weeklyBestItems[leftIndex], false, "left")}
        {renderCard(weeklyBestItems[currentIndex], true, "center")}
        {renderCard(weeklyBestItems[rightIndex], false, "right")}
      </Box>
    </Box>
  );
};

export default WeeklySelfBest;
