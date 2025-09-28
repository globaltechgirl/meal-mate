import { AppShell, Burger } from "@mantine/core";
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
    >
      <AppShell.Header hiddenFrom="sm">
        <div className="flex items-center justify-between p-6">
          <Logo />
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
        </div>
      </AppShell.Header>

      <AppShell.Navbar style={{ boxShadow: "inset -2px 0 6px var(--dark-10)" }}>
        <SideBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default PrivateLayout;
