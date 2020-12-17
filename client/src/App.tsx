import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { H1, StyledDiv, StyledUl, Wrapper } from './styles/styledComponents';
import { Button } from "@material-ui/core";
import image1 from './pics/gift-box-1.jpg'
import image2 from './pics/gift-box-2.jpg'
import image3 from './pics/gift-box-3.jpg'

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
  

  useEffect(() => {
    const canvas : HTMLCanvasElement | null = canvasRef.current;
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    const ctx = canvas?.getContext("2d");
    const giftBox1: any = new Image(40, 40)
    const giftBox2: any = new Image(40, 40) 
    const giftBox3: any = new Image(35,35) 
    giftBox1.src = image1;
    giftBox2.src = image2;
    giftBox3.src = image3;
    const images: HTMLImageElement[] = [giftBox1, giftBox2, giftBox3]
    giftBox3.onload = () => {
      for (let i = 0; i < 12; i++) {
        const latency: number = Math.random() * 2000;
          setTimeout(() => {
            let yAxis = 0
            let xAxis = (i * 120)
            giftsColumn(xAxis, yAxis, 5, 3)
          }, latency);
      }
      
    }

    function giftsColumn(xAxis: number, yAxis: number, reapet: number, ppi: number) {
      const currImage: HTMLImageElement = images[Math.floor(Math.random() * 3)]
      setInterval(() => {
        ctx!.clearRect(xAxis, yAxis - ppi, 100, 100)
        ctx!.drawImage(currImage, xAxis, yAxis, 100, 100);
        if (yAxis === Math.floor(canvas!.height / ppi / reapet) * ppi) {
          giftsColumn(xAxis, 0, reapet, ppi)
        }
        yAxis += ppi
      }, [20]);  
    };
    
    // ctx!.fillStyle = 'red';
    // ctx!.fillRect(20, 20, 50, 50)
    // console.log(ctx, canvas)
    
   
    
  }, [])
  

  return (
    <canvas ref={canvasRef} ></canvas> 
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
