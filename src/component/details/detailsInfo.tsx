import { type FC, type CSSProperties, useState, useEffect } from "react";
import { Box, Text, Button, Image } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";
// import { BASE_URL } from "@/utils/constants";

import StarIcon from "@/assets/icons/star";
import StarredIcon from "@/assets/icons/starred";
import CameraIcon from "@/assets/icons/camera";
import ClockIcon from "@/assets/icons/clock";
import CalendarIcon from "@/assets/icons/calendar";

interface Recipe {
  id: string;
  title: string;
  category?: string;
  area?: string;
  instructions?: string;
  thumbnail?: string;
  last_made?: string;
  total_time?: string;
}

const DetailsInfo: FC = () => {
  // 🧠 FIXED: React Router param must match route definition (usually "id" not "pk")
  const { id } = useParams<{ id: string }>();

  const isSmall = useMediaQuery("(max-width: 768px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");

  const [hovered, setHovered] = useState(false);
  const [starred, setStarred] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // const [isEditingName, setIsEditingName] = useState(false);
  // const [isEditingDescription, setIsEditingDescription] = useState(false);
  // const [isEditingDate, setIsEditingDate] = useState(false);
  // const [isEditingTime, setIsEditingTime] = useState(false);
  const [serves, setServes] = useState(2);

  // ✅ Fetch recipe details
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        // ⚙️ Ensure BASE_URL is correct (e.g., https://meal-mate-api-pd3x.onrender.com/api)
        const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/recipes/${id}/`);

        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch recipe details");
        }

        const data = await res.json();
        setRecipe(data);
      } catch (err: any) {
        console.error("Error fetching recipe details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  if (loading)
    return (
      <Text
        style={{
          textAlign: "center",
          color: "var(--light-200)",
          marginTop: 40,
          fontSize: 12,
        }}
      >
        Loading recipe details...
      </Text>
    );

  if (error)
    return (
      <Text
        style={{
          textAlign: "center",
          color: "red",
          marginTop: 40,
          fontSize: 12,
        }}
      >
        {error}
      </Text>
    );

  if (!recipe)
    return (
      <Text
        style={{
          textAlign: "center",
          color: "red",
          marginTop: 40,
          fontSize: 12,
        }}
      >
        Recipe not found.
      </Text>
    );

  // 🎨 same styling retained
  const styles: Record<string, CSSProperties> = {
    contentWrapper: {
      display: "flex",
      flexDirection: isSmall || isMedium ? "column" : "row",
      width: "100%",
      gap: 10,
    },
    imageBox: {
      flex: 1,
      width: isSmall || isMedium ? "100%" : "50%",
      position: "relative",
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
      position: "absolute",
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
    hoverVisible: { opacity: 1 },
    detailsWrapper: {
      flex: 1,
      width: isSmall || isMedium ? "100%" : "50%",
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
      color: "var(--light-100)",
      cursor: "pointer",
    },
    hr: {
      border: "none",
      borderTop: "1px dashed var(--dark-10)",
      margin: "6px 0",
    },
    sectionHeader: {
      fontSize: 11,
      fontWeight: 450,
      color: "var(--light-100)",
    },
    descriptionText: {
      fontSize: 9.5,
      fontWeight: 400,
      color: "var(--light-200)",
      lineHeight: 1.6,
      cursor: "pointer",
    },
    boxColumn: { display: "flex", flexDirection: "column", gap: 12 },
    timeWrapper: { display: "flex", gap: 12, alignItems: "center" },
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
      cursor: "pointer",
    },
    servesWrapper: { display: "flex", alignItems: "center", gap: 8 },
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
  };

  // const editableInputStyle: React.CSSProperties = {
  //   background: "transparent",
  //   border: "none",
  //   outline: "none",
  //   color: "var(--light-200)",
  //   fontSize: 9.5,
  // };

  return (
    <Box style={styles.contentWrapper}>
      <Box
        style={styles.imageBox}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Image src={recipe.thumbnail} alt={recipe.title} radius={8} fit="cover" />

        <Box style={styles.hoverWrapper}>
          <Box
            style={{
              ...styles.hoverBox,
              ...(hovered ? styles.hoverVisible : {}),
            }}
            onClick={() => setStarred((prev) => !prev)}
          >
            {starred ? (
              <StarredIcon width={16} height={16} />
            ) : (
              <StarIcon width={16} height={16} />
            )}
          </Box>

          <Box
            style={{
              ...styles.hoverBox,
              ...(hovered ? styles.hoverVisible : {}),
            }}
          >
            <CameraIcon width={16} height={16} />
          </Box>
        </Box>
      </Box>

      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsMain}>
          <Box style={styles.detailsBox}>
            <Text
              style={styles.recipeName}
              // onClick={() => setIsEditingName(true)}
            >
              {recipe.title}
            </Text>

            <hr style={styles.hr} />

            <Box style={styles.boxColumn}>
              <Text style={styles.sectionHeader}>Description</Text>
              <Text style={styles.descriptionText}>
                {recipe.instructions || "No instructions available."}
              </Text>
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxColumn}>
              <Text style={styles.sectionHeader}>Time Info</Text>

              <Box style={styles.timeWrapper}>
                <Box style={styles.timeBox}>
                  <CalendarIcon width={10} height={10} color="var(--light-200)" />
                  <Text style={styles.timeText}>
                    Last made :{" "}
                    {recipe.last_made
                      ? new Date(recipe.last_made).toLocaleDateString()
                      : "N/A"}
                  </Text>
                </Box>

                <Box style={styles.timeBox}>
                  <ClockIcon width={10} height={10} color="var(--light-200)" />
                  <Text style={styles.timeText}>
                    Total time : {recipe.total_time || "45 min"}
                  </Text>
                </Box>
              </Box>
            </Box>

            <hr style={styles.hr} />

            <Box style={styles.boxColumn}>
              <Text style={styles.sectionHeader}>Serves</Text>
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
