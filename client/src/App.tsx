import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Canvas from "./components/canvas";
import List from "./components/list";
import Recieved from "./components/recieved";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { StyledDiv } from "./styles/styledComponents";
import { Button } from "@material-ui/core";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { Item, Label, Store } from "./typescript/interfaces";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffc926",
    },
    secondary: {
      main: "#b39c68",
    },
    error: {
      main: "#f44336"
    }
  },
});

function App() {

  const [currency, setCurrency] = useState<number>(0);

  const getItems = useCallback(async (type: string, setItems: Function) => {
    try {
      const data: Item[] =(await axios.get(`/api/items/all/${type}`)).data;
      setItems(data);
    } catch (error) {
      console.trace(error)
    }
  }, []);

  const getLabels = useCallback(async (setLabels: Function) => {
    try {
      const data: Label[] = (await axios.get("/api/labels/all")).data;
      setLabels(data);
    } catch (error) {
      console.trace(error)
    }
  }, []);

  const getStores = useCallback(async (setStores: Function) => {
    try {
      const data: Store[] = (await axios.get("/api/stores/all")).data;
      setStores(data);
    } catch (error) {
      console.trace(error);
    }
  }, []);

  const getCurrency = useCallback(async () => {
    const { data } = await axios.get("https://api.exchangeratesapi.io/latest", {
      params: {
        base: "USD",
        symbols: "ILS",
      },
    });
    if (currency !== data.rates.ILS) {
      setCurrency(data.rates.ILS);
    }
  }, [currency]);

  useEffect(() => {
    getCurrency();
    setInterval(async () => {
      getCurrency();
    }, [1000 * 10]);
  }, [getCurrency]);

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
          component={() => <List currency={currency} getItems={getItems} getStores={getStores} getLabels={getLabels} />}
        ></Route>
        <Route
          exact
          path="/received"
          component={() => <Recieved currency={currency} getItems={getItems} getStores={getStores} getLabels={getLabels}  />}
        ></Route>
      </ThemeProvider>
    </Router>
  );
}

export default App;
