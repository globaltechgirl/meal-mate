import { Box, Text, Button, Image } from "@mantine/core";
import { type FC, useState } from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import StarIcon from "@/assets/icons/star"; // outline star
import StarredIcon from "@/assets/icons/starred";
import ClockIcon from "@/assets/icons/clock";
import CalendarIcon from "@/assets/icons/calendar";

const styles = {
  contentWrapper: {
    display: "flex",
    width: "100%",
    gap: 10,
    padding: 20,
  },
  imageBox: {
    flex: 1.2,
    width: "50%",
    position: "relative" as "relative", // needed for absolute positioning
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "var(--dark-20)",
    borderRadius: 12,
    border: "1px solid var(--dark-10)",
    padding: 4,
    overflow: "hidden",
    cursor: "pointer",
  },
  starBox: {
    position: "absolute" as "absolute",
    top: 12,
    right: 12,
    width: 32,
    height: 32,
    borderRadius: 6,
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    color: "var(--light-200)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: 2,
  },
  starBoxVisible: {
    opacity: 1,
  },
  detailsWrapper: {
    flex: 1,
    width: "50%",
    backgroundColor: "var(--dark-20)",
    borderRadius: 12,
    border: "1px solid var(--dark-10)",
    padding: 4,
  },
  detailsMain: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "var(--dark-30)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 15,
    height: "100%",
  },
  detailsBox: {
    display: "flex",
    flexDirection: "column",
    marginTop: "auto",
    gap: 12,
  },
  recipeName: {
    fontWeight: 500,
    fontSize: 22,
    color: "var(--light-100)",
  },
  hr: {
    border: "none",
    borderTop: "1px dashed var(--dark-10)",
    margin: "6px 0",
  },
  descriptionHeader: {
    fontWeight: 450,
    fontSize: 11,
    color: "var(--light-100)",
  },
  descriptionText: {
    fontSize: 9.5,
    fontWeight: 400,
    color: "var(--light-200)",
    lineHeight: 1.6,
  },
  boxStyles: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  boxHeader: {
    fontWeight: 450,
    fontSize: 10,
    color: "var(--light-100)",
  },
  timeWrapper: {
    display: "flex",
    gap: 12,
    alignItems: "center",
  },
  timeBox: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: "fit-content",
    padding: "6px 8px",
    borderRadius: 6,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
  },
  timeText: {
    fontSize: 9.5,
    fontWeight: 400,
    color: "var(--light-200)",
  },
  servesWrapper: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  servesButton: {
    width: 24,
    height: 24,
    padding: 0,
    color: "var(--light-200)",
    borderRadius: 6,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
  },
  servesNumber: {
    padding: "4px 8px",
    textAlign: "center",
    fontSize: 9.5,
    fontWeight: 400,
    color: "var(--light-200)",
    borderRadius: 6,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
  },
} as const;

const recipeDetails = {
  name: "Delicious Pasta",
  description:
    "This classic Italian pasta features rich tomato sauce, fresh basil, and a touch of garlic. Perfect for a hearty dinner or a casual lunch, it’s easy to make and packed with flavor. Serve with a sprinkle of parmesan cheese for the ultimate experience.",
  lastMade: "2025-10-01",
  totalTime: "45 min",
  image: BestImg1,
};

const DetailsInfo: FC = () => {
  const [serves, setServes] = useState(2);
  const [hovered, setHovered] = useState(false);
  const [starred, setStarred] = useState(false);

  return (
    <Box style={styles.contentWrapper}>
      {/* Left: Image */}
      <Box
        style={styles.imageBox}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={recipeDetails.image} alt={recipeDetails.name} radius={8} fit="cover" />

        {/* Star box */}
        <Box
          style={{
            ...styles.starBox,
            ...(hovered ? styles.starBoxVisible : {}),
          }}
          onClick={() => setStarred(!starred)}
        >
          {starred ? (
            <StarredIcon width={16} height={16} />
          ) : (
            <StarIcon width={16} height={16} />
          )}
        </Box>
      </Box>

      {/* Right: Details */}
      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsMain}>
          <Box style={styles.detailsBox}>
            <Box>
              <Text style={styles.recipeName}>{recipeDetails.name}</Text>
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxStyles}>
              <Text style={styles.descriptionHeader}>Description</Text>
              <Text style={styles.descriptionText}>{recipeDetails.description}</Text>
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxStyles}>
              <Text style={styles.boxHeader}>Time Info</Text>

              <Box style={styles.timeWrapper}>
                <Box style={styles.timeBox}>
                  <CalendarIcon width={10} height={10} color="var(--light-200)" />
                  <Text style={styles.timeText}>Last made: {recipeDetails.lastMade}</Text>
                </Box>
                <Box style={styles.timeBox}>
                  <ClockIcon width={10} height={10} color="var(--light-200)" />
                  <Text style={styles.timeText}>Total time: {recipeDetails.totalTime}</Text>
                </Box>
              </Box>
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxStyles}>
              <Text style={styles.boxHeader}>Serves</Text>

              <Box style={styles.servesWrapper}>
                <Button
                  variant="outline"
                  size="xs"
                  style={styles.servesButton}
                  onClick={() => setServes(serves - 1)}
                  disabled={serves <= 1}
                >
                  -
                </Button>
                <Text style={styles.servesNumber}>{serves}</Text>
                <Button
                  variant="outline"
                  size="xs"
                  style={styles.servesButton}
                  onClick={() => setServes(serves + 1)}
                >
                  +
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsInfo;
