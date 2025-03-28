import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import React, { useState, useEffect } from 'react';
import Homepage from "./pages/Homepage";
import Settings from "./components/settings/settings";
import Volumetric from "./components/volumetric/volumetric";
import AuthPages from "./components/user_login/UserLogin";
import NeophyteLoader from "./components/NeophyteLoader";
function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Set a timer to change loading state after the loader animation completes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 7500); // 8 seconds to match the loader animation duration

    // Cleanup the timer if component unmounts
    return () => clearTimeout(timer);
  }, []);

   // If still loading, render the loader
  //  if (isLoading) {
  //   return <NeophyteLoader />;
  

  return (
    // <div className="">
    //   <Homepage />
    // </div>
    <div>
      {isLoading?(<NeophyteLoader />):(
      <div className="w-full ">
      {console.log(1234)}
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<AuthPages />} /> */}
          {/* <Route path="/" element={<NewLogin />} /> */}
          {/* <Route path="/" element={<ChangedLogin />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
          {/* <Route path="/dashboard" element={<DashboardNew/>}/> */}
          {/* <Route path="/dashboard" element={<DashboardNew />} />*/}
          <Route path="/volumetric" element={<Volumetric />} />
          {/* <Route path="/home" element={<Homepage />} /> */}
          <Route path="/" element={<Homepage />} />

          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </div>
    )
    }
    </div>
    
    
  );
}

export default App;
