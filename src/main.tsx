import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { initializeApp } from "./lib/capacitor";

console.log("Main.tsx loaded - attempting to render App");

const rootElement = document.getElementById("root");
console.log("Root element found:", rootElement);

if (rootElement) {
  createRoot(rootElement).render(<App />);
  console.log("App rendered successfully");
  
  // Initialize Capacitor native features
  initializeApp().catch(console.error);
} else {
  console.error("Root element not found!");
}
