import { type FC, type CSSProperties, useState } from "react";
import { Modal, Text, Box, Stack } from "@mantine/core";
import CalendarIcon from "@/assets/icons/calendar";

interface AddRecipeProps {
  opened: boolean;
  onClose: () => void;
  day?: string;
}

type Status = "Planned" | "Completed";

const STATUS_CYCLE: Status[] = ["Planned", "Completed"];

const styles: Record<string, CSSProperties> = {
  actionButton: {
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    color: "var(--light-200)",
    cursor: "pointer",
    fontSize: 8.5,
    fontWeight: 400,
    padding: "4px 10px",
    textAlign: "center",
  },
  actionRow: {
    display: "flex",
    gap: 10,
    justifyContent: "flex-end",
  },
  innerBox: {
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    color: "var(--light-100)",
    fontSize: 8.5,
    fontWeight: 400,
    padding: 6,
  },
  input: {
    width: "100%",
  },
  textarea: {
    minHeight: 60,
    resize: "vertical",
    width: "100%",
  },
  timeBox: {
    alignItems: "center",
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    display: "flex",
    flexGrow: 1,
    flexShrink: 1,
    gap: 4,
    minWidth: 100,
    padding: "6px 8px",
  },
  timeText: {
    color: "var(--light-200)",
    fontSize: 8.5,
    fontWeight: 400,
  },
  timeWrapper: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  toggleBox: {
    backgroundColor: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 6,
    color: "var(--light-100)",
    cursor: "pointer",
    fontSize: 8,
    fontWeight: 400,
    padding: "2px 6px",
    textAlign: "center",
  },
  toggleRow: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
  },
  wrapper: {
    backgroundColor: "transparent",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    width: "100%",
  },
  wrapperBox: {
    backgroundColor: "var(--dark-20)",
    border: "1px solid var(--dark-10)",
    borderRadius: 8,
    display: "flex",
    flexDirection: "column",
    gap: 4,
    padding: 4,
  },
  wrapperHeader: {
    color: "var(--light-100)",
    fontSize: 8.5,
    fontWeight: 450,
    padding: "0 4px",
  },
  wrapperMain: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },
};

const AddRecipe: FC<AddRecipeProps> = ({ opened, onClose }) => {
  const [status, setStatus] = useState<Status>("Planned");
  const [foodName, setFoodName] = useState("");
  const [shoppingNote, setShoppingNote] = useState("");
  const [source, setSource] = useState("");
  const [qty, setQty] = useState<number>(1);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<string>("");

  const toggleStatus = () => {
    setStatus((prev) =>
      STATUS_CYCLE[(STATUS_CYCLE.indexOf(prev) + 1) % STATUS_CYCLE.length]
    );
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      centered
      size="md"
      withCloseButton={false}
      styles={{ content: styles.wrapper, body: { padding: 0 } }}
      overlayProps={{ backgroundOpacity: 0.55, blur: 5 }}
    >
      <Stack style={styles.wrapperMain}>
        <Box style={styles.toggleRow}>
          <Box style={styles.toggleBox} onClick={toggleStatus}>
            {status}
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
          <Text style={styles.wrapperHeader}>Shopping Note</Text>
          <textarea
            placeholder="Write note or description"
            style={{ ...styles.innerBox, ...styles.textarea }}
            value={shoppingNote}
            onChange={(e) => setShoppingNote(e.target.value)}
          />
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Source</Text>
          <input
            type="text"
            placeholder="Write source"
            style={{ ...styles.innerBox, ...styles.input }}
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </Box>

        <Box style={styles.wrapperBox}>
          <Text style={styles.wrapperHeader}>Details</Text>
          <Box style={styles.timeWrapper}>
            <Box style={{ ...styles.timeBox, flexBasis: "10%" }}>
              <Text style={styles.timeText}>Qty :</Text>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--light-200)",
                  fontSize: 8.5,
                  outline: "none",
                  width: 40,
                }}
              />
            </Box>

            <Box style={{ ...styles.timeBox, flexBasis: "30%" }}>
              <Text style={styles.timeText}>Amount :</Text>
              <input
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--light-200)",
                  fontSize: 8.5,
                  outline: "none",
                  width: 60,
                }}
              />
            </Box>

            <Box style={{ ...styles.timeBox, flexBasis: "40%" }}>
              <CalendarIcon width={10} height={10} color="var(--light-200)" />
              <Text style={styles.timeText}>Date :</Text>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--light-200)",
                  fontSize: 8.5,
                  outline: "none",
                  flexGrow: 1,
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* Action Buttons */}
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

export default AddRecipe;
