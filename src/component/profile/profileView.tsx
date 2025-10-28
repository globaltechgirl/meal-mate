import { type FC, type CSSProperties, useState, useEffect } from "react";
import { Box, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Eye, EyeOff } from "tabler-icons-react";

import SaveIcon from "@/assets/icons/save";
import EditIcon from "@/assets/icons/edit";

const UserProfileHeader: FC = () => {
  const [fullName, setFullName] = useState("User Name");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("********"); // default masked

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isSmallScreen = useMediaQuery("(max-width: 768px)");
  const isMediumScreen = useMediaQuery("(max-width: 1024px)");

  useEffect(() => {
    // Fetch current user info (adjust based on your auth implementation)
    const storedName = localStorage.getItem("full_name");
    const storedEmail = localStorage.getItem("user_email");
    const storedPassword = localStorage.getItem("user_password"); // if available (masked or empty)

    if (storedName) setFullName(storedName);
    if (storedEmail) setEmail(storedEmail);
    if (storedPassword) setPassword(storedPassword);
  }, []);

  const firstName = fullName.split(" ")[0];
  const firstLetter = firstName.charAt(0).toUpperCase();

  const styles: Record<string, CSSProperties> = {
    wrapper: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      gap: isSmallScreen ? 80 : isMediumScreen ? 95 : 100,
      backgroundColor: "var(--dark-20)",
      border: "1px solid var(--border-100)",
      borderRadius: 12,
      padding: 20,
      paddingBottom: 30,
      position: "relative",
    },
    backgroundWrapper: {
      width: "100%",
      overflow: "hidden",
      backgroundColor: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      borderRadius: 12,
      padding: 5,
    },
    backgroundBox: {
      width: "100%",
      height: isSmallScreen ? 150 : isMediumScreen ? 160 : 180,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "var(--dark-20)",
      borderRadius: 8,
      border: "1px solid var(--dark-10)",
      position: "relative",
    },
    backgroundText: {
      fontSize: isSmallScreen ? 35 : isMediumScreen ? 40 : 45,
      fontWeight: 600,
      color: "var(--light-100)",
    },
    profileWrapper: {
      position: "absolute",
      top: isSmallScreen ? 140 : isMediumScreen ? 145 : 150,
      left: isSmallScreen ? "25%" : "20%",
      transform: "translateX(-50%)",
      width: isSmallScreen ? 80 : isMediumScreen ? 90 : 100,
      height: isSmallScreen ? 80 : isMediumScreen ? 90 : 100,
      overflow: "hidden",
      backgroundColor: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      borderRadius: 12,
      padding: 4,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    profileBox: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isSmallScreen ? 30 : isMediumScreen ? 35 : 40,
      fontWeight: 600,
      color: "var(--light-100)",
      backgroundColor: "var(--dark-20)",
      borderRadius: 8,
      border: "1px solid var(--dark-10)",
    },
    sectionBox: {
      width: isSmallScreen ? "90%" : isMediumScreen ? "85%" : "75%",
      margin: "0 auto",
      display: "flex",
      flexDirection: "column",
      gap: isSmallScreen ? 25 : 35,
    },
    fieldGroup: {
      display: "flex",
      flexDirection: isSmallScreen ? "column" : "row",
      alignItems: isSmallScreen ? "flex-start" : "center",
      justifyContent: "space-between",
      gap: isSmallScreen ? 10 : 30,
    },
    labelBox: {
      display: "flex",
      flexDirection: "column",
      color: "var(--light-100)",
      width: "30%",
    },
    labelTitle: { 
      fontWeight: 450, 
      fontSize: 9.5 
    },
    labelSub: { 
      fontSize: 8.5, 
      fontWeight: 400, 
      opacity: 0.7, 
      marginTop: 3 
    },
    inputBox: {
      flexGrow: 1,
      width: isSmallScreen ? "100%" : "30%",
      position: "relative",
      display: "flex",
      alignItems: "center",
    },
    input: {
      width: "100%",
      padding: "10px 70px 10px 12px",
      backgroundColor: "var(--dark-30)",
      border: "1px solid var(--dark-10)",
      borderRadius: 8,
      color: "var(--light-100)",
      outline: "none",
      fontSize: 8.5,
    },
    iconInside: { 
      position: "absolute", 
      right: 12, 
      display: "flex", 
      alignItems: "center", 
      gap: 8
    },
    icon: { 
      cursor: "pointer", 
      opacity: 0.7, 
      width: 10,
      height: 10 
    },
    dangerZone: { 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "space-between" 
    },
    dangerLeft: {
      display: "flex", 
      flexDirection: "column" 
    },
    dangerHeader: { 
      fontWeight: 450, 
      fontSize: 9.5, 
      color: "var(--light-100)" 
    },
    dangerSub: { 
      fontSize: 8.5, 
      fontWeight: 400, 
      opacity: 0.7, 
      marginTop: 3 
    },
    dangerActions: { 
      display: "flex", 
      alignItems: "center", 
      gap: 10 
    },
    dangerBox: {
      backgroundColor: "var(--dark-30)",
      color: "var(--light-100)",
      border: "1px solid var(--dark-10)",
      padding: "6px 12px",
      borderRadius: 8,
      cursor: "pointer",
      fontWeight: 400,
      fontSize: 8.5,
    },
  };

  const renderField = (
    label: string,
    subLabel: string,
    value: string,
    isEditing: boolean,
    toggleEdit: () => void,
    placeholder: string,
    type: string = "text",
    extraIcon?: React.ReactNode
  ) => (
    <Box style={styles.fieldGroup}>
      <Box style={styles.labelBox}>
        <Text style={styles.labelTitle}>{label}</Text>
        <Text style={styles.labelSub}>{subLabel}</Text>
      </Box>
      <Box style={styles.inputBox}>
        <input style={styles.input} placeholder={placeholder} defaultValue={value} disabled={!isEditing} type={type} />
        <Box style={styles.iconInside}>
          {extraIcon}
          {isEditing ? (
            <SaveIcon style={styles.icon} onClick={toggleEdit} />
          ) : (
            <EditIcon style={styles.icon} onClick={toggleEdit} />
          )}
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box style={styles.wrapper}>
      <Box style={styles.backgroundWrapper}>
        <Box style={styles.backgroundBox}>
          <Text style={styles.backgroundText}>{firstName}</Text>
        </Box>
      </Box>

      <Box style={styles.profileWrapper}>
        <Box style={styles.profileBox}>{firstLetter}</Box>
      </Box>

      <Box style={styles.sectionBox}>
  {renderField(
    "Full Name",
    "Your display name",
    fullName, // now comes from signed-in user
    isEditingName,
    () => setIsEditingName(!isEditingName),
    "" // remove placeholder
  )}

  {renderField(
    "Email",
    "Your email address",
    email, // now comes from signed-in user
    isEditingEmail,
    () => setIsEditingEmail(!isEditingEmail),
    "" // remove placeholder
  )}

  {renderField(
    "Password",
    "Your secret password",
    password, // shows masked password for signed-in user
    isEditingPassword,
    () => setIsEditingPassword(!isEditingPassword),
    "",
    showPassword ? "text" : "password",
    showPassword
      ? <Eye style={styles.icon} onClick={() => setShowPassword(false)} />
      : <EyeOff style={styles.icon} onClick={() => setShowPassword(true)} />
  )}

  <Box style={styles.dangerZone}>
    <Box style={styles.dangerLeft}>
      <Text style={styles.dangerHeader}>Danger Zone</Text>
      <Text style={styles.dangerSub}>Delete account or logout</Text>
    </Box>
    <Box style={styles.dangerActions}>
      <Box style={styles.dangerBox}>Logout</Box>
      <Box style={styles.dangerBox}>Delete</Box>
    </Box>
  </Box>
</Box>

    </Box>
  );
};

export default UserProfileHeader;
