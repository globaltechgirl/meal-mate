import { type FC, type CSSProperties, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useParams } from "react-router-dom";
import MenuIcon from "@/assets/icons/menu";

interface RecipeDetail {
  id: string;
  title: string;
  youtube?: string;
}

const DetailsInstructions: FC = () => {
  const { id } = useParams<{ id: string }>();
  const isSmall = useMediaQuery("(max-width: 768px)");
  const isMedium = useMediaQuery("(max-width: 1024px)");

  const [youtubeLink, setYoutubeLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/recipes/${id}/`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch recipe details");
        }

        const data: RecipeDetail = await res.json();
        setYoutubeLink(data.youtube || null);
      } catch (err: any) {
        console.error("Error fetching recipe details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRecipe();
  }, [id]);

  // Helper to extract video ID from YouTube link
  const getYoutubeEmbedUrl = (url: string): string | null => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/))([^?&\s]+)/
    );
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const styles: Record<string, CSSProperties> = {
    contentWrapper: {
      display: "flex",
      flexDirection: isSmall || isMedium ? "column" : "row",
      width: "100%",
      gap: 10,
    },
    detailsWrapper: {
      flex: 1,
      width: "100%",
      backgroundColor: "var(--dark-20)",
      borderRadius: 12,
      border: "1px solid var(--dark-10)",
      padding: 4,
    },
    detailsHeaderWrapper: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "4px 6px 6px 6px",
    },
    detailsHeader: {
      fontSize: 10,
      fontWeight: 450,
      color: "var(--light-100)",
    },
    detailsMain: {
      display: "flex",
      flexDirection: "column",
      gap: 8,
      backgroundColor: "var(--dark-30)",
      borderRadius: 8,
      border: "1px solid var(--dark-10)",
      padding: 12,
      position: "relative",
      justifyContent: "center",
      minHeight: 200,
    },
    youtubeFrame: {
      width: "100%",
      aspectRatio: "16/9",
      borderRadius: 8,
      border: "none",
    },
    youtubeLink: {
      fontSize: 11,
      fontWeight: 450,
      color: "var(--light-100)",
      textDecoration: "underline",
      wordBreak: "break-all",
      cursor: "pointer",
      textAlign: "center",
    },
    loadingText: {
      textAlign: "center", 
      color: "var(--light-200)", 
      fontSize: 9.5, 
      fontWeight: 400,
    },
    errorText: {
      textAlign: "center", 
      color: "var(--mild-500)", 
      fontSize: 9.5, 
      fontWeight: 400,
    }
  };

  return (
    <Box style={styles.contentWrapper}>
      <Box style={styles.detailsWrapper}>
        <Box style={styles.detailsHeaderWrapper}>
          <Text style={styles.detailsHeader}>YouTube Tutorial</Text>
          <MenuIcon width={10} height={10} color="var(--light-100)" />
        </Box>

        <Box style={styles.detailsMain}>
          {loading ? (
            <Text style={styles.loadingText}>
              Loading video...
            </Text>
          ) : error ? (
            <Text style={styles.errorText}>
              {error}
            </Text>
          ) : youtubeLink ? (
            getYoutubeEmbedUrl(youtubeLink) ? (
              <iframe
                src={getYoutubeEmbedUrl(youtubeLink)!}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={styles.youtubeFrame}
              />
            ) : (
              <a
                href={youtubeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.youtubeLink}
              >
                {youtubeLink}
              </a>
            )
          ) : (
            <Text style={styles.errorText}>No YouTube link available.</Text>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DetailsInstructions;
