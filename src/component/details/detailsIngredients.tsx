import { type FC, type CSSProperties, useEffect, useState } from "react";
import { Box, Text } from "@mantine/core";
import { useParams } from "react-router-dom";

interface Ingredient {
  ingredient: string;
}

const DetailsIngredients: FC = () => {
  const { id } = useParams<{ id: string }>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://meal-mate-api-pd3x.onrender.com/api/recipes/${id}/`);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch recipe ingredients");
        }

        const data = await res.json();
        setIngredients(data.ingredients || []);
      } catch (err: any) {
        console.error("Error fetching ingredients:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchIngredients();
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
        Loading ingredients...
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

  if (!ingredients.length)
    return (
      <Text
        style={{
          textAlign: "center",
          color: "var(--light-200)",
          marginTop: 40,
          fontSize: 12,
        }}
      >
        No ingredients found.
      </Text>
    );

  const styles: Record<string, CSSProperties> = {
    wrapper: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
      backgroundColor: "var(--dark-20)",
      borderRadius: 12,
      border: "1px solid var(--dark-10)",
      padding: 4,
    },
    innerBox: {
      backgroundColor: "var(--dark-30)",
      borderRadius: 8,
      border: "1px solid var(--dark-10)",
      padding: 15,
      display: "flex",
      flexDirection: "column",
      gap: 8,
    },
    header: {
      fontSize: 11,
      fontWeight: 500,
      color: "var(--light-100)",
      marginBottom: 6,
    },
    ingredient: {
      fontSize: 10,
      fontWeight: 400,
      color: "var(--light-200)",
      borderBottom: "1px dashed var(--dark-10)",
      paddingBottom: 6,
      marginBottom: 6,
    },
  };

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.innerBox}>
        <Text style={styles.header}>Ingredients</Text>

        {ingredients.map((item, index) => (
          <Text key={index} style={styles.ingredient}>
            {item.ingredient}
          </Text>
        ))}
      </Box>
    </Box>
  );
};

export default DetailsIngredients;
