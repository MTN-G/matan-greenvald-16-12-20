import React, { useCallback, useEffect, useRef } from "react";
import image1 from "../pics/gift-box-1.jpg";
import image2 from "../pics/gift-box-2.jpg";
import image3 from "../pics/gift-box-3.jpg";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const giftsColumn = useCallback(
    (
      ctx: any,
      xAxis: number,
      yAxis: number,
      reapet: number,
      ppi: number,
      images: HTMLImageElement[]
    ) => {
      const currImage: HTMLImageElement = images[Math.floor(Math.random() * 3)];
      setInterval(() => {
        ctx!.clearRect(xAxis, yAxis - ppi, 80, 80);
        ctx!.drawImage(currImage, xAxis, yAxis, 80, 80);
        if (yAxis === Math.floor(ctx.canvas!.height / ppi / reapet) * ppi) {
          giftsColumn(ctx, xAxis, -81, reapet, ppi, images);
        }
        yAxis += ppi;
      }, [10]);
    },
    []
  );

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    canvas!.width = window.innerWidth;
    canvas!.height = window.innerHeight;
    const ctx = canvas?.getContext("2d");
    const giftBox1: any = new Image();
    const giftBox2: any = new Image();
    const giftBox3: any = new Image();
    giftBox1.src = image1;
    giftBox2.src = image2;
    giftBox3.src = image3;
    const images: HTMLImageElement[] = [giftBox1, giftBox2, giftBox3];
    giftBox3.onload = () => {
      for (let i = 0; i < 14; i++) {
        const latency: number = Math.random() * 2000;
        setTimeout(() => {
          let yAxis = -81;
          let xAxis = i * 120;
          giftsColumn(ctx, xAxis, yAxis, 6, 3, images);
        }, latency);
      }
    };
  }, [giftsColumn]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 0 }}
    ></canvas>
  );
};

export default Canvas;
