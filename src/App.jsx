import React from "react";
import AppRouter from "./router/AppRouter";
import Navegador from "./components/Navegador";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <Navegador />
      <AppRouter />
      {/* <Footer /> */}
    </div>
  );
};

export default App;
