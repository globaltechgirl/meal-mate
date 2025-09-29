import { AppShell, Burger, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Outlet } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SideBar from "@/component/layout/sidebar";

const PrivateLayout = () => {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, sm: 0 } }}
      navbar={{
        width: 220,
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      style={{ backgroundColor: "var(--dark-600)" }}
    >
      <AppShell.Header hiddenFrom="sm">
        <div className="flex items-center justify-between p-6">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </div>
      </AppShell.Header>

      <AppShell.Navbar
        style={{
          borderRight: "none",
          boxShadow: "none",
          backgroundColor: "var(--dark-600)",
          padding: "10px",
        }}
      >
        <Box
          style={{
            height: "100%",
            borderRadius: "8px",
            backgroundColor: "var(--dark-700)",
            border: "0.5px solid var(--border-100)",
            padding: "20px 10px",
          }}
        >
          <SideBar />
        </Box>
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          padding: "10px",
          marginLeft: 220,
        }}
      >
        <Box
          style={{
            height: "100%",
            borderRadius: "8px",
            backgroundColor: "var(--dark-700)",
            border: "0.5px solid var(--border-100)",
            padding: "10px",
          }}
        >
          <Outlet />
        </Box>
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
