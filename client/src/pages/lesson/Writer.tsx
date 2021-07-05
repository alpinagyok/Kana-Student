/* eslint-disable no-param-reassign */
import {
  LayersModel,
} from '@tensorflow/tfjs';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { loadModel, predict } from '../../service/model';
import { Kana, SimplifiedMaterialBlock } from '../../store/interfaces';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
  selectedMaterial: SimplifiedMaterialBlock | undefined;
  handleKanaChoice: (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ) => void
}

const Writer: React.FC<Props> = ({
  randomKanas, kanaToGuess, handleKanaChoice, selectedMaterial,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let canvas: HTMLCanvasElement | null;
  let context: CanvasRenderingContext2D | null;
  let left: number; let top: number;
  let drawing = false;
  let brushX = 0; let brushY = 0;
  const smoothnessRadius = 1;

  // const blackColor = '#000000';
  // const whiteColor = '#FFFFFF';
  const blackColor = '#FFFFFF';
  const whiteColor = '#000000 ';

  const materialName = selectedMaterial?.name ?? 'katakana';

  const [model, setModel] = useState<LayersModel>();

  useEffect(() => {
    canvas = canvasRef.current;
    if (canvas) {
      context = canvas.getContext('2d');
      ({ left, top } = canvas.getBoundingClientRect());
      if (context) {
        context.fillStyle = whiteColor;
        context.fillRect(0, 0, 48, 48);
      }
    }
    if (!model) { loadModel(materialName, setModel); }
  }, [model, randomKanas, kanaToGuess]);

  const beginDrawing = (event: React.MouseEvent | React.TouchEvent) => {
    if (context) {
      drawing = true;

      context.strokeStyle = blackColor;
      context.lineWidth = 4;

      // handle both mobile and pc
      if (event.type === 'mousedown') {
        brushX = (event as React.MouseEvent).clientX - left;
        brushY = (event as React.MouseEvent).clientY - top;
      } else {
        brushX = (event as React.TouchEvent).touches[0].clientX - left;
        brushY = (event as React.TouchEvent).touches[0].clientY - top;
      }
      context.moveTo(brushX, brushY);
      context.beginPath();
    }
  };

  const endDrawing = () => {
    if (context) {
      drawing = false;
    }
  };

  const draw = (event: React.MouseEvent | React.TouchEvent) => {
    if (context && drawing) {
      let eventPosX: number; let eventPosY: number;

      if (event.type === 'mousemove') {
        eventPosX = (event as React.MouseEvent).clientX - left;
        eventPosY = (event as React.MouseEvent).clientY - top;
      } else {
        eventPosX = (event as React.TouchEvent).touches[0].clientX - left;
        eventPosY = (event as React.TouchEvent).touches[0].clientY - top;
      }

      // moves the line only when the mouse is some distance away,
      // provides smoothness effect
      const dist = Math.sqrt(
        (eventPosX - brushX) ** 2 + (eventPosY - brushY) ** 2,
      );
      if (dist > smoothnessRadius) {
        const distToMove = dist - smoothnessRadius;
        const sin = (eventPosY - brushY) / dist;
        const cos = (eventPosX - brushX) / dist;

        brushX += distToMove * cos;
        brushY += distToMove * sin;
      }

      context.lineTo(brushX, brushY);
      context.stroke();
    }
  };

  const clearCanvas = () => {
    if (context && canvas) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = whiteColor;
      context.fillRect(0, 0, 48, 48);
    }
  };

  const handlePredict = async () => {
    const predictedKanaJapName = await predict(model, canvas, context, materialName);
    handleKanaChoice(predictedKanaJapName, kanaToGuess);
    clearCanvas();
  };

  return (
    <div>
      <button type="button" onClick={() => clearCanvas()}>x</button>
      <button type="button" onClick={() => handlePredict()}>predict</button>
      <canvas
        onMouseDown={beginDrawing}
        onTouchStart={beginDrawing}
        onMouseMove={draw}
        onTouchMove={draw}
        onMouseUp={endDrawing}
        style={{ border: '1px solid black' }}
        ref={canvasRef}
        width="48"
        height="48"
      />
    </div>
  );
};

export default Writer;
