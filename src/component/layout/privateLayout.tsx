import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

const PrivateLayout = () => {
  return (
    <AppShell
      padding="md"
      header={{ height: { base: 60, sm: 60 } }}
      styles={{
        main: {
          minHeight: "100vh",
          padding: 0,      
        },
      }}
    >
      <Outlet />
    </AppShell>
  );
};

export default PrivateLayout;
