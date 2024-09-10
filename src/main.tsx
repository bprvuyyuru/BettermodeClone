import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <body className="bg-[#D3D3D3] h-auto">
      <App />
    </body>
  </StrictMode>
);
