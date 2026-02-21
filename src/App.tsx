import { BrowserRouter } from "react-router-dom";
import { Router } from "./components/Router";
import { CyclesContentProvider } from "./contexts/CyclesContext";

export function App() {
  return (
    <BrowserRouter>
      <CyclesContentProvider>
        <Router />
      </CyclesContentProvider>
    </BrowserRouter>
  );
}
