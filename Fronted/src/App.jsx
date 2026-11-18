import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./Router/Router";
import  { Toaster } from "react-hot-toast";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
}

export default App;
