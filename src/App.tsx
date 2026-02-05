import { Router } from "./components/Router"
import{BrowserRouter} from 'react-router-dom'


export function App() {
  return <div>
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  </div>
}
