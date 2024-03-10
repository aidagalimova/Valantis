import { CatalogPage } from "pages/catalog";
import { Provider } from "react-redux";
import store from "./store/store";
import "./styles/App.scss";
import { ThemeSwitcher } from "shared/ui";
import React, { useState } from "react";

function App() {
  const [theme, updateTheme] = useState("app_light_theme");

  const toggleTheme = () => {
    if (theme === "app_light_theme") {
      updateTheme("app_dark_theme");
    } else {
      updateTheme("app_light_theme");
    }
  };
  console.log(theme);
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
