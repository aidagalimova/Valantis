import { useState } from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import { CatalogPage } from "pages/catalog";
import { ThemeSwitcher } from "shared/ui";

import "./styles/App.scss";

function App() {
  const [theme, updateTheme] = useState("app_light_theme");

  const toggleTheme = () => {
    if (theme === "app_light_theme") {
      updateTheme("app_dark_theme");
    } else {
      updateTheme("app_light_theme");
    }
  };

  return (
    <Provider store={store}>
      <div className={`App ${theme}`}>
        <ThemeSwitcher onClick={() => toggleTheme()} />
        <CatalogPage />
      </div>
    </Provider>
  );
}

export default App;
