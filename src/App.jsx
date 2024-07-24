import React from "react";
import AppRouter from "./router/AppRouter";
import Navegador from "./components/Navegador";

const App = () => {
  return (
    <div>
      <Navegador />
      <AppRouter />
    </div>
  );
};

export default App;
