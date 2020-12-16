import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { H1, StyledDiv, StyledUl, Wrapper } from './styles/styledComponents';
import { Button } from "@material-ui/core";
const image1 = require('./pics/gift-box-1.png')

function List() {

  const [items, setItems] = useState([1,2,3,4,5]);
  const [stores, setStores] = useState([5,6,7,8,9]);

  return (
    <>
    <H1 color={'green'}>What Are We Waiting For?</H1>
    <Wrapper padding="100px">
      <Button>Add item</Button>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <StyledUl>
          {items && items.map(item => <StyledDiv repeatFormula="1fr 1fr">{ item }</StyledDiv>)}
        </StyledUl>
        <StyledUl>
          {stores && stores.map(store => <StyledDiv repeatFormula=" 1fr 1fr">{store}</StyledDiv>)}
        </StyledUl>
      </div>
      </Wrapper>
    </>  
  )
}

function Received () {
  return (
    <div>this is received</div>  
  )
}

interface CanvasProps {
    width: number;
    height: number;
}

const Canvas = ({width, height} : CanvasProps) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef(null);
    const giftBox1: any = new Image()
    giftBox1.src = image1;

  useEffect(() => {
    const canvas : HTMLCanvasElement | null = canvasRef.current;
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    const ctx = canvas?.getContext("2d");
    
    ctx!.drawImage(giftBox1, 50, 80)
    console.log(giftBox1);
    ctx!.stroke();
    // ctx!.fillStyle = 'red';
    // ctx!.fillRect(20, 20, 50, 50)
    // console.log(ctx, canvas)
    
   
    
  }, [])
  

  return (
    <canvas ref={canvasRef} >{giftBox1 }</canvas> 
  )
}

function App  () {
  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/list">My Orders</Link>
          </li>
          <li>
            <Link to="/received">Received</Link>
          </li>
        </ul>
      </div>
      <Route exact path="/list" component={List}></Route>
      <Route exact path="/received" component={Received}></Route>
      <Route exact path="/canvas" component={Canvas}></Route>
    </Router>
  );
};

export default App;
