import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { StyledDiv } from "./styles/styledComponents";
import { Button } from "@material-ui/core";
import Canvas from "./components/canvas";
import List from "./components/list";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import Recieved from "./components/recieved";

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

function App() {
  const [currency, setCurrency] = useState<number>(0);

  const getCurrency = useCallback(async() => {
    const { data } = await axios.get(
      "https://api.exchangeratesapi.io/latest",
      {
        params: {
          base: "USD",
          symbols: "ILS",
        },
      }
    );
    if (currency !== data.rates.ILS) {
      setCurrency(data.rates.ILS);
    }
  }, [currency]);
  
  useEffect(() => {
    getCurrency()
    setInterval(async () => {
      getCurrency();
    }, [1000 * 10]);
  }, [getCurrency]);

  console.log(currency);
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
        <Route
          exact
          path="/list"
          component={() => <List currency={currency} />}
        ></Route>
        <Route
          exact
          path="/received"
          component={() => <Recieved currency={currency} />}
        ></Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
