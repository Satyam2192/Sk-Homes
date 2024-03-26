import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebsiteRoutes from "./Routes/WebsiteRoutes"
import {Dashboard} from "./Dashboard/layouts"
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<WebsiteRoutes />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        {/* <Route path="/demo" element={<UserCards />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}
