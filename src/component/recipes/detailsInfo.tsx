import { Box, Text, Button, Image } from "@mantine/core";
import { type FC, useState } from "react";

import BestImg1 from "@/assets/best-img1.jpg";
import StarIcon from "@/assets/icons/star";
import StarredIcon from "@/assets/icons/starred";
import CameraIcon from "@/assets/icons/camera";
import ClockIcon from "@/assets/icons/clock";
import CalendarIcon from "@/assets/icons/calendar";

const styles = {
  contentWrapper: { 
    display: "flex", 
    width: "100%", 
    gap: 10 
  },
  imageBox: {
    flex: 1,
    width: "50%",
    position: "relative" as const,
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
  hoverWrapper: {
    position: "absolute" as const,
    top: 10,
    right: 10,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  hoverBox: {
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
  hoverBoxVisible: { 
    opacity: 1 
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
    fontSize: 22, 
    fontWeight: 500, 
    color: "var(--light-100)" 
  },
  hr: { 
    border: "none", 
    borderTop: "1px dashed var(--dark-10)", 
    margin: "6px 0" 
  },
  descriptionHeader: { 
    fontSize: 11, 
    fontWeight: 450, 
    color: "var(--light-100)" 
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
    gap: 12 
  },
  boxHeader: { 
    fontWeight: 450, 
    fontSize: 10, 
    color: "var(--light-100)" 
  },
  timeWrapper: { 
    display: "flex", 
    gap: 12, 
    alignItems: "center" 
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
    color: "var(--light-200)" 
  },
  servesWrapper: { 
    display: "flex", 
    alignItems: "center", 
    gap: 8 
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

const DetailsInfo: FC = () => {
  const [serves, setServes] = useState<number>(2);
  const [hovered, setHovered] = useState<boolean>(false);
  const [starred, setStarred] = useState<boolean>(false);

  const [name, setName] = useState<string>("Delicious Pasta");
  const [editingName, setEditingName] = useState<boolean>(false);

  const [description, setDescription] = useState<string>(
    "This classic Italian pasta features rich tomato sauce, fresh basil, and a touch of garlic. Perfect for a hearty dinner or a casual lunch, it’s easy to make and packed with flavor. Serve with a sprinkle of parmesan cheese for the ultimate experience."
  );
  const [editingDescription, setEditingDescription] = useState<boolean>(false);

  const [lastMade, setLastMade] = useState<string>("2025-10-01");
  const [editingDate, setEditingDate] = useState<boolean>(false);

  const [totalTime, setTotalTime] = useState<string>("45 min");
  const [editingTime, setEditingTime] = useState<boolean>(false);

  return (
    <Box style={styles.contentWrapper}>
      <Box
        style={styles.imageBox}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={BestImg1} alt={name} radius={8} fit="cover" />

        <Box style={styles.hoverWrapper}>
          <Box
            style={{ ...styles.hoverBox, ...(hovered ? styles.hoverBoxVisible : {}) }}
            onClick={() => setStarred(!starred)}
          >
            {starred ? (
              <StarredIcon width={16} height={16} />
            ) : (
              <StarIcon width={16} height={16} />
            )}
          </Box>

          <Box style={{ ...styles.hoverBox, ...(hovered ? styles.hoverBoxVisible : {}) }}>
            <CameraIcon width={16} height={16} />
          </Box>
        </Box>
      </Box>

      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsMain}>
          <Box style={styles.detailsBox}>
            {editingName ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                onBlur={() => setEditingName(false)}
                autoFocus
                style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: "var(--light-100)",
                  background: "transparent",
                  border: "none",
                  outline: "none",
                }}
              />
            ) : (
              <Text style={styles.recipeName} onClick={() => setEditingName(true)}>
                {name}
              </Text>
            )}

            <hr style={styles.hr} />

            <Box style={styles.boxStyles}>
              <Text style={styles.descriptionHeader}>Description</Text>
              {editingDescription ? (
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  onBlur={() => setEditingDescription(false)}
                  autoFocus
                  style={{
                    fontSize: 9.5,
                    fontWeight: 400,
                    color: "var(--light-200)",
                    background: "transparent",
                    border: "1px solid var(--dark-10)",
                    borderRadius: 6,
                    padding: 4,
                    lineHeight: 1.4,
                    minHeight: 60,
                    resize: "vertical",
                  }}
                />
              ) : (
                <Text style={styles.descriptionText} onClick={() => setEditingDescription(true)}>
                  {description}
                </Text>
              )}
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxStyles}>
              <Text style={styles.boxHeader}>Time Info</Text>

              <Box style={styles.timeWrapper}>
                <Box style={styles.timeBox}>
                  <CalendarIcon width={10} height={10} color="var(--light-200)" />
                  {editingDate ? (
                    <input
                      type="date"
                      value={lastMade}
                      onChange={(e) => setLastMade(e.currentTarget.value)}
                      onBlur={() => setEditingDate(false)}
                      autoFocus
                      style={{
                        fontSize: 9.5,
                        color: "var(--light-200)",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                      }}
                    />
                  ) : (
                    <Text style={styles.timeText} onClick={() => setEditingDate(true)}>
                      Last made: {new Date(lastMade).toLocaleDateString("en-US")}
                    </Text>
                  )}
                </Box>

                <Box style={styles.timeBox}>
                  <ClockIcon width={10} height={10} color="var(--light-200)" />
                  {editingTime ? (
                    <input
                      type="text"
                      value={totalTime}
                      onChange={(e) => setTotalTime(e.currentTarget.value)}
                      onBlur={() => setEditingTime(false)}
                      autoFocus
                      style={{
                        fontSize: 9.5,
                        color: "var(--light-200)",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        width: 50,
                      }}
                    />
                  ) : (
                    <Text style={styles.timeText} onClick={() => setEditingTime(true)}>
                      Total time: {totalTime}
                    </Text>
                  )}
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
                  onClick={() => setServes((s) => Math.max(1, s - 1))}
                >
                  -
                </Button>
                <Text style={styles.servesNumber}>{serves}</Text>
                <Button
                  variant="outline"
                  size="xs"
                  style={styles.servesButton}
                  onClick={() => setServes((s) => s + 1)}
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
