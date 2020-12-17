import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { H1, StyledDiv, StyledUl, Wrapper } from "./styles/styledComponents";
import { Button } from "@material-ui/core";
import Canvas from "./components/canvas";
import List from "./components/list";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffc926",
    },
    secondary: {
      main: "#b39c68",
    },
  },
});


function Received() {
  return <div>this is received</div>;
}

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App" style={{ textAlign: "center" }}>
          <StyledDiv
            style={{ zIndex: 1, position: "absolute", width: "100%", top: 0 }}
            repeatFormula={"5fr 2fr 3fr 2fr 5fr"}
          >
            <span />
            <Link to="/list" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                My Orders
              </Button>
            </Link>
            <span />
            <Link to="/received" style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Received
              </Button>
            </Link>
            <span />
          </StyledDiv>
          <Canvas />
        </div>
        <Route exact path="/list" component={List}></Route>
        <Route exact path="/received" component={Received}></Route>
        {/* <Route exact path="/canvas" component={Canvas}></Route> */}
      </ThemeProvider>
    </Router>
  );
}

export default App;
