import ReactDOM from "react-dom/client";
import "./index.css";
import Providers from "./app/providers";
import Home from "./pages/Home";

// Initialize dark mode based on user preference (localStorage) or system preference
if (typeof window !== "undefined") {
  const savedTheme = localStorage.getItem("theme");
  const html = document.documentElement;
  
  if (savedTheme === "dark") {
    html.classList.add("dark");
  } else if (savedTheme === "light") {
    html.classList.remove("dark");
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    html.classList.add("dark");
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Home />
  </Providers>
);
