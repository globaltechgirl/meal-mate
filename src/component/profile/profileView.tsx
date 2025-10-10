import { Box, Text } from "@mantine/core";
import { type FC, type CSSProperties, useState } from "react";
import { Eye, EyeOff } from "tabler-icons-react";

import SaveIcon from "@/assets/icons/save";
import EditIcon from "@/assets/icons/edit";

const styles: Record<string, CSSProperties> = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    gap: 100,
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
    background: "var(--dark-30)",
    border: "1px solid var(--dark-10)",
    borderRadius: 12,
    padding: 5,
  },
  backgroundBox: {
    width: "100%",
    height: 180,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
    position: "relative",
  },
  backgroundText: {
    fontSize: 45,
    fontWeight: 600,
    color: "var(--light-100)",
  },
  profileWrapper: {
    position: "absolute",
    top: 150,
    left: "20%",
    transform: "translateX(-50%)",
    width: 100,
    height: 100,
    overflow: "hidden",
    background: "var(--dark-30)",
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
    fontSize: 40,
    fontWeight: 600,
    color: "var(--light-100)",
    backgroundColor: "var(--dark-20)",
    borderRadius: 8,
    border: "1px solid var(--dark-10)",
  },
  sectionBox: {
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: 35,
  },
  fieldGroup: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
  },
  labelBox: {
    display: "flex",
    flexDirection: "column",
    color: "var(--light-100)",
    width: "30%",
  },
  labelTitle: {
    fontWeight: 450,
    fontSize: 9.5,
  },
  labelSub: {
    fontSize: 8.5,
        fontWeight: 400,
    opacity: 0.7,
    marginTop: 3,
  },
  inputBox: {
    flexGrow: 1,
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  input: {
    width: "100%",
    padding: "10px 70px 10px 12px", 
    background: "var(--dark-30)",
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
    gap: 8,
  },
  icon: {
    cursor: "pointer",
    opacity: 0.7,
    width: 10,
    height: 10,
  },
  dangerZone: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dangerLeft: {
    display: "flex",
    flexDirection: "column",
  },
  dangerHeader: {
    fontWeight: 450,
    fontSize: 9.5,
    color: "var(--light-100)",
  },
  dangerSub: {
    fontSize: 8.5,
     fontWeight: 400,
    opacity: 0.7,
    marginTop: 3,
  },
  dangerActions: {
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  dangerBox: {
   background: "var(--dark-30)",
      color: "var(--light-100)",
      border: "1px solid var(--dark-10)",
    padding: "6px 12px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: 400,
    fontSize: 8.5,
  },
};

const UserProfileHeader: FC = () => {
  const fullName = "Tolani Bajo";
  const firstName = fullName.split(" ")[0];
  const firstLetter = firstName.charAt(0).toUpperCase();

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Box style={styles.wrapper}>
      {/* Header */}
      <Box style={styles.backgroundWrapper}>
        <Box style={styles.backgroundBox}>
          <Text style={styles.backgroundText}>{firstName}</Text>
        </Box>
      </Box>

      {/* Profile Box */}
      <Box style={styles.profileWrapper}>
        <Box style={styles.profileBox}>{firstLetter}</Box>
      </Box>

      {/* Info Fields */}
      <Box style={styles.sectionBox}>
        {/* Full Name */}
        <Box style={styles.fieldGroup}>
          <Box style={styles.labelBox}>
            <Text style={styles.labelTitle}>Full Name</Text>
            <Text style={styles.labelSub}>Your display name</Text>
          </Box>
          <Box style={styles.inputBox}>
            <input
              style={styles.input}
              placeholder="First Last"
              defaultValue={fullName}
              disabled={!isEditingName}
            />
            <Box style={styles.iconInside}>
              {isEditingName ? (
                <SaveIcon
                  style={styles.icon}
                  onClick={() => setIsEditingName(false)}
                />
              ) : (
                <EditIcon
                  style={styles.icon}
                  onClick={() => setIsEditingName(true)}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Email */}
        <Box style={styles.fieldGroup}>
          <Box style={styles.labelBox}>
            <Text style={styles.labelTitle}>Email</Text>
            <Text style={styles.labelSub}>Your email address</Text>
          </Box>
          <Box style={styles.inputBox}>
            <input
              style={styles.input}
              placeholder="name@gmail.com"
              defaultValue="tolani.bajo@gmail.com"
              disabled={!isEditingEmail}
            />
            <Box style={styles.iconInside}>
              {isEditingEmail ? (
                <SaveIcon
                  style={styles.icon}
                  onClick={() => setIsEditingEmail(false)}
                />
              ) : (
                <EditIcon
                  style={styles.icon}
                  onClick={() => setIsEditingEmail(true)}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Password */}
        <Box style={styles.fieldGroup}>
          <Box style={styles.labelBox}>
            <Text style={styles.labelTitle}>Password</Text>
            <Text style={styles.labelSub}>Your secret password</Text>
          </Box>
          <Box style={styles.inputBox}>
            <input
              style={styles.input}
              type={showPassword ? "text" : "password"}
              placeholder="password"
              defaultValue="password123"
              disabled={!isEditingPassword}
            />
            <Box style={styles.iconInside}>
              {showPassword ? (
                <Eye
                  style={styles.icon}
                  onClick={() => setShowPassword(false)}
                />
              ) : (
                <EyeOff
                  style={styles.icon}
                  onClick={() => setShowPassword(true)}
                />
              )}
              {isEditingPassword ? (
                <SaveIcon
                  style={styles.icon}
                  onClick={() => setIsEditingPassword(false)}
                />
              ) : (
                <EditIcon
                  style={styles.icon}
                  onClick={() => setIsEditingPassword(true)}
                />
              )}
            </Box>
          </Box>
        </Box>

        {/* Danger Zone */}
        <Box style={styles.dangerZone}>
          <Box style={styles.dangerLeft}>
            <Text style={styles.dangerHeader}>Danger Zone</Text>
            <Text style={styles.dangerSub}>
              Delete account or logout
            </Text>
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
