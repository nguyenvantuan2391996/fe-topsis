import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import StandardPage from "./pages/StandardPage";
import ScoreRatingPage from "./pages/ScoreRatingPage";
import ConsultPage from "./pages/ConsultPage";

const PrivateRoute = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  const isLoggedIn: boolean = localStorage.getItem("user_info") !== null;
  return isLoggedIn ? <>{children}</> : <Navigate replace={true} to="/" />;
};

const PrivateRouteV2 = (props: { children: React.ReactNode }): JSX.Element => {
  const { children } = props;
  const isLoggedIn: boolean = localStorage.getItem("user_info") !== null;
  return isLoggedIn ? (
    <Navigate replace={true} to="/standard" />
  ) : (
    <>{children}</>
  );
};

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
              <PrivateRouteV2>
                <SignUpPage />
              </PrivateRouteV2>
            }
          />
          <Route
            path="/standard"
            element={
              <div
                style={{
                  marginTop: 24,
                  marginLeft: 24,
                }}
              >
                <PrivateRoute>
                  <StandardPage />
                </PrivateRoute>
              </div>
            }
          />
          <Route
            path="/score-rating"
            element={
              <div
                style={{
                  marginTop: 24,
                  marginLeft: 24,
                }}
              >
                <PrivateRoute>
                  <ScoreRatingPage />
                </PrivateRoute>
              </div>
            }
          />
          <Route
            path="/consult"
            element={
              <div
                style={{
                  marginTop: 24,
                  marginLeft: 24,
                }}
              >
                <PrivateRoute>
                  <ConsultPage />
                </PrivateRoute>
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
