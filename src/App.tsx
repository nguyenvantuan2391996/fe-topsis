import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          background-size: cover; background-repeat: no-repeat;
          background-position: center center; width: auto
          <Route
            path="/"
            element={
              <div
                style={{
                  backgroundImage: "url(images/m8c20gchf7231.jpg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  width: "auto",
                }}
              >
                <SignIn />
              </div>
            }
          />
          <Route
            path="/sign-up"
            element={
              <div
                style={{
                  backgroundImage: "url(images/background.jpg)",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center center",
                  width: "auto",
                }}
              >
                <SignUp />
              </div>
            }
          />
          <Route
            path="/dashboard"
            element={
              <div style={{ marginTop: 24, marginLeft: 24 }}>
                <Dashboard />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
