import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Homepage from "./pages/Homepage";
import Settings from "./components/settings/settings";
import Volumetric from "./components/volumetric/volumetric";

function App() {
  return (
    // <div className="">
    //   <Homepage />
    // </div>
    <div className="w-full ">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          {/* <Route path="/" element={<NewLogin />} /> */}
          {/* <Route path="/" element={<ChangedLogin />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* <Route path="/dashboard" element={<DashboardNew/>}/> */}
          {/* <Route path="/dashboard" element={<DashboardNew />} />*/}
          <Route path="/volumetric" element={<Volumetric />} />
          <Route path="/" element={<Homepage />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;