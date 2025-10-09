import { AppShell, Burger, Box } from "@mantine/core";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SideBar from "@/component/layout/sidebar";

const PrivateLayout: React.FC = () => {
  const [opened, { toggle }] = useDisclosure();
  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <AppShell
      padding={10}
      header={{ height: isSmallScreen ? 56 : 0 }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      style={{
        backgroundColor: "var(--dark-10)",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {isSmallScreen && (
        <AppShell.Header
          style={{
            backgroundColor: "var(--dark-20)",
            borderBottom: "1px solid var(--border-100)",
            padding: "0 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 200,
          }}
        >
          <Logo width={25} height={25} />
          <Burger
            opened={opened}
            onClick={toggle}
            size={12}
            color="var(--light-100)"
          />
        </AppShell.Header>
      )}

      <AppShell.Navbar
        p={10}
        pr={isSmallScreen ? 10 : 0}
        style={{
          borderRight: "none",
          backgroundColor: "var(--dark-10)",
        }}
      >
        <Box
          style={{
            height: "100%",
            backgroundColor: "var(--dark-20)",
            border: "1px solid var(--border-100)",
            borderRadius: 8,
            padding: 10,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SideBar />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          backgroundColor: "var(--dark-10)",
          border: "1px solid var(--border-100)",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            height: "100%",
            overflowY: "auto",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
