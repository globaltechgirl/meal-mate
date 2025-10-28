import { Modal, Text, Box, Stack, Group } from "@mantine/core";
import { type FC, type CSSProperties, useState, useRef, useCallback, useEffect, } from "react";

import type { MealItem } from "./boardView";
import UploadIcon from "@/assets/icons/upload";

interface EditMealModalProps {
  opened: boolean;
  onClose: () => void;
  meal: MealItem | null;
}

const STATUS_CYCLE = ["Planned", "Completed"] as const;
type Status = (typeof STATUS_CYCLE)[number];

const MEAL_TYPE_CYCLE = ["Breakfast", "Lunch", "Dinner"] as const;
type MealType = (typeof MEAL_TYPE_CYCLE)[number];

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  wrapperMain: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
  wrapperBox: {
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 4,
    display: "flex",
    flexDirection: "column",
    gap: 4,
  },
  innerBox: {
    backgroundColor: "var(--dark-30)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    padding: 6,
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-100)",
  },
  wrapperHeader: {
    fontSize: 8.5,
    fontWeight: 450,
    color: "var(--light-100)",
    padding: "0 4px",
  },
  innerBoxButton: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    width: "fit-content",
    padding: "6px 12px",
    borderRadius: 8,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    cursor: "pointer",
  },
  innerTextWrapper: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    marginTop: 10,
  },
  wrapperMaintext: {
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-100)",
  },
  wrapperSubtext: {
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-200)",
  },
  toggleRow: {
    display: "flex",
    gap: 12,
    alignItems: "center",
    flexWrap: "wrap",
  },
  toggleBox: {
    padding: "2px 6px",
    borderRadius: 6,
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-100)",
    cursor: "pointer",
    textAlign: "center",
  },
  input: {
    width: "100%",
  },
  textarea: {
    width: "100%",
    resize: "vertical",
    minHeight: 60,
  },
  recipeBox: {
    padding: "2px 6px",
    borderRadius: 6,
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
    fontSize: 8,
    fontWeight: 400,
    color: "var(--light-100)",
    textAlign: "center",
  },
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: 10,
  },
  actionButton: {
    padding: "4px 10px",
    borderRadius: 6,
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    fontSize: 8.5,
    fontWeight: 400,
    color: "var(--light-200)",
    textAlign: "center",
    cursor: "pointer",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
  },
  imagePreview: {
    width: "100%",
    maxHeight: 120,
    objectFit: "cover",
    display: "block",
  },
  imageOverlay: {
    position: "absolute",
    inset: 0,
    background: "rgba(0, 0, 0, 0.55)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
    opacity: 0,
    cursor: "pointer",
  },
};

const EditMealModal: FC<EditMealModalProps> = ({ opened, onClose, meal }) => {
  const [status, setStatus] = useState<Status>("Planned");
  const [mealType, setMealType] = useState<MealType>("Breakfast");
  const [foodName, setFoodName] = useState("");
  const [foodNote, setFoodNote] = useState("");
  const [recipes, setRecipes] = useState<string[]>([]);
  const [recipeInput, setRecipeInput] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!meal) return;

    // setStatus(meal.status);
    setMealType(meal.type);
    setFoodName(meal.name);
    setFoodNote(meal.note);
    setRecipes([]);
    setRecipeInput("");
    setSelectedFile(null);
    setPreviewImage(meal.image ?? null);

    return () => {
      if (previewImage?.startsWith("blob:")) URL.revokeObjectURL(previewImage);
    };
  }, [meal, previewImage]);

  const handleAddRecipe = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && recipeInput.trim()) {
        e.preventDefault();
        setRecipes((prev) => [...prev, recipeInput.trim()]);
        setRecipeInput("");
      }
    },
    [recipeInput]
  );

  const toggleStatus = useCallback(() => {
    setStatus((prev) => {
      const nextIndex = (STATUS_CYCLE.indexOf(prev) + 1) % STATUS_CYCLE.length;
      return STATUS_CYCLE[nextIndex];
    });
  }, []);

  const toggleMealType = useCallback(() => {
    setMealType((prev) => {
      const nextIndex = (MEAL_TYPE_CYCLE.indexOf(prev) + 1) % MEAL_TYPE_CYCLE.length;
      return MEAL_TYPE_CYCLE[nextIndex];
    });
  }, []);

  const handleFileClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;

    setSelectedFile(file);
    const imageURL = URL.createObjectURL(file);
    setPreviewImage(imageURL);
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      withCloseButton={false}
      styles={{
        content: styles.wrapper,
        body: { padding: 0 },
      }}
      overlayProps={{
        backgroundOpacity: 0.55,
        blur: 5,
      }}
    >
      <Stack style={styles.wrapperMain}>
        <Box style={styles.toggleRow}>
          <Box style={styles.toggleBox} onClick={toggleStatus}>
            {status}
          </Box>
          <Box style={styles.toggleBox} onClick={toggleMealType}>
            {mealType}
          </Box>
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Image</Text>
          <Box style={styles.imageContainer}>
            {previewImage && (
              <img src={previewImage} alt="Meal preview" style={styles.imagePreview} />
            )}

            <Box
              style={{
                ...styles.imageOverlay,
                opacity: previewImage ? undefined : 1,
              }}
              onClick={handleFileClick}
            >
              <Box style={styles.innerBoxButton}>
                <UploadIcon width={10} height={10} style={{ marginRight: 4 }} />
                {previewImage ? "Replace Image" : "Upload Image"}
              </Box>

              {!previewImage && (
                <Box style={styles.innerTextWrapper}>
                  <Text style={styles.wrapperMaintext}>
                    {selectedFile
                      ? `Selected: ${selectedFile.name}`
                      : "Choose or drop an image"}
                  </Text>
                  <Text style={styles.wrapperSubtext}>JPG, JPEG, PNG, WEBP. Max 5MB.</Text>
                </Box>
              )}
            </Box>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </Box>
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Food Name</Text>
          <input
            type="text"
            placeholder="Write food name"
            style={{ ...styles.innerBox, ...styles.input }}
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
          />
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Food Description</Text>
          <textarea
            placeholder="Write food note"
            style={{ ...styles.innerBox, ...styles.textarea }}
            value={foodNote}
            onChange={(e) => setFoodNote(e.target.value)}
          />
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Recipes</Text>
          <Box style={{ ...styles.innerBox, minHeight: 80 }}>
            <Group gap={6} mb="sm" style={{ flexWrap: "wrap" }}>
              {recipes.map((recipe, idx) => (
                <Box key={idx} style={styles.recipeBox}>
                  {recipe}
                </Box>
              ))}
            </Group>
            <input
              type="text"
              placeholder="Write recipe and press Enter"
              value={recipeInput}
              onChange={(e) => setRecipeInput(e.target.value)}
              onKeyDown={handleAddRecipe}
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
              }}
            />
          </Box>
        </Box>

        <Box style={styles.actionRow}>
          <Box style={styles.actionButton} onClick={onClose}>
            Cancel
          </Box>
          <Box style={styles.actionButton}>Save</Box>
        </Box>
      </Stack>
    </Modal>
  );
};

export default EditMealModal;
