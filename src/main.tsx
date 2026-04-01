import { createRoot } from "react-dom/client";
import "./index.css";
import { initializeApp } from "./lib/capacitor";

const createMemoryStorage = (): Storage => {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear: () => {
      store.clear();
    },
    getItem: (key: string) => store.get(key) ?? null,
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    removeItem: (key: string) => {
      store.delete(key);
    },
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  };
};

const ensureStorage = (storageKey: "localStorage" | "sessionStorage") => {
  try {
    const storage = window[storageKey];
    const testKey = `__boac_${storageKey}_test__`;
    storage.setItem(testKey, "1");
    storage.removeItem(testKey);
    return storage;
  } catch (error) {
    console.warn(`${storageKey} unavailable, using in-memory fallback`, error);
    const fallbackStorage = createMemoryStorage();

    Object.defineProperty(window, storageKey, {
      value: fallbackStorage,
      configurable: true,
    });

    return fallbackStorage;
  }
};

ensureStorage("localStorage");
ensureStorage("sessionStorage");

const rootElement = document.getElementById("root");

if (rootElement) {
  import("./App.tsx")
    .then(({ default: App }) => {
      createRoot(rootElement).render(<App />);
      initializeApp().catch(console.error);
    })
    .catch((error) => {
      console.error("Failed to load app", error);
    });
} else {
  console.error("Root element not found!");
}
