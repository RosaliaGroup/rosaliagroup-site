import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { loadAnalytics } from "./analytics";

createRoot(document.getElementById("root")!).render(<App />);

loadAnalytics();
