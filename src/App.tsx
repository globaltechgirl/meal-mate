import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";

import "@/App.css";
import router from "@/router/routes";
import { persistor, store } from "@/store/store";
import { theme, variablesResolver } from "@/utils/mantine-theme";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.classList.remove("light-theme", "dark-theme");
    document.documentElement.classList.add(`${savedTheme}-theme`);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MantineProvider theme={theme} cssVariablesResolver={variablesResolver}>
          <Notifications position="bottom-right" />
          <RouterProvider router={router} />
        </MantineProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
