import { HelmetProvider } from 'react-helmet-async';
import AppNavigation from './navigation/Navigation';
import { Provider } from "react-redux";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from './app/providers';
import store from "./redux/store";

function App() {

  return (
    <Provider store={store}>
      <Providers>
      <HelmetProvider>
        <div className="main-page-wrapper">
          <AppNavigation />
        </div>
      </HelmetProvider>
      </Providers>
    </Provider>
  );
}

export default App;
