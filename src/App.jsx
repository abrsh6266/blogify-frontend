import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage/Homepage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Homepage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
