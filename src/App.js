import { BrowserRouter as Router } from "react-router-dom";
import React, { useState, useEffect , Suspense} from "react";
const AppRouter = React.lazy(() => import("./AppRouter"));

function App() {
  const loaderFunction = () => {
    return (
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "9999",
          top: "50%",
          left: "0",
        }}
      >
        <div className="text-center w-100">
          <div
            className="spinner-border"
            style={{
              width: "3rem",
              height: "3rem",
              color: "#00b074",
            }}
            role="status"
          ></div>
          <h3
            className=" font-size-4 text-center"
            style={{
              marginLeft: "10px",
              marginTop: "10px",
            }}
          >
            Loading...
          </h3>
        </div>
      </div>
    );
  };

  return <Router>
      <Suspense fallback={loaderFunction()}>
        <AppRouter/>
      </Suspense>
    </Router>;
}

export default App;
