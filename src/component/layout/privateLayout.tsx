import type { FC, CSSProperties } from "react";
import { AppShell, Burger, Box } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SideBar from "@/component/layout/sidebar";

const PrivateLayout: FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  const styles: Record<string, CSSProperties> = {
    appShell: {
      backgroundColor: "var(--dark-10)",
      height: "100vh",
      overflow: "hidden",
    },
    header: {
      backgroundColor: "var(--dark-20)",
      borderBottom: "1px solid var(--border-100)",
      padding: "0 16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      zIndex: 200,
    },
    navbarWrapper: {
      height: "100%",
      backgroundColor: "var(--dark-20)",
      border: "1px solid var(--border-100)",
      borderRadius: 8,
      padding: 10,
      display: "flex",
      flexDirection: "column" as const, 
    },
    mainWrapper: {
      backgroundColor: "var(--dark-10)",
      border: "none",
      display: "flex",
      flexDirection: "column" as const,
      height: "100%",
      overflow: "hidden",
    },
    contentWrapper: {
      flex: 1,
      minWidth: 0,
      overflowY: "auto" as const,
      overflowX: "hidden" as const,
      scrollbarWidth: "none",
      msOverflowStyle: "none",
    },
  };

  return (
    <AppShell
      padding={10}
      header={{ height: isSmallScreen ? 56 : 0 }}
      navbar={{ width: 220, breakpoint: "sm", collapsed: { mobile: !opened } }}
      style={styles.appShell}
    >
      {isSmallScreen && (
        <AppShell.Header style={styles.header}>
          <Logo width={25} height={25} />
          <Burger opened={opened} onClick={toggle} size={12} color="var(--light-100)" />
        </AppShell.Header>
      )}

      <AppShell.Navbar p={10} pr={0} style={{ borderRight: "none", backgroundColor: "var(--dark-10)" }}>
        <Box style={styles.navbarWrapper}>
          <SideBar />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main style={styles.mainWrapper}>
        <Box style={styles.contentWrapper}>
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
