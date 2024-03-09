import { CatalogPage } from "pages/catalog";
import { Provider } from "react-redux";
import store from "./store/store";
import "./styles/App.scss";
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <CatalogPage />
      </div>
    </Provider>
  );
}

export default App;
