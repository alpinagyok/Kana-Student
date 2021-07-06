/* eslint-disable no-param-reassign */
import {
  LayersModel,
} from '@tensorflow/tfjs';
import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  beginDrawing, draw, endDrawing, clearCanvas,
} from '../../service/drawing';
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

  const blackColor = '#000000';
  const whiteColor = '#FFFFFF';

  const materialName = selectedMaterial?.name ?? 'katakana';

  const [model, setModel] = useState<LayersModel>();

  useEffect(() => {
    canvas = canvasRef.current;
    if (canvas) {
      context = canvas.getContext('2d');
      ({ left, top } = canvas.getBoundingClientRect());
      if (context) {
        context.fillStyle = whiteColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    if (!model) { loadModel(materialName, setModel); }
  }, [model, randomKanas, kanaToGuess]);

  const handlePredict = async () => {
    const predictedKanaJapName = await predict(model, canvas, context, materialName);
    handleKanaChoice(predictedKanaJapName, kanaToGuess);
  };

  return (
    <div>
      {model ? (
        <>
          <div>
            <button type="button" onClick={() => clearCanvas(canvas, context)}>x</button>
            <button type="button" onClick={() => handlePredict()}>predict</button>
          </div>
          <canvas
            onMouseDown={(e) => beginDrawing(context, e, left, top)}
            onTouchStart={(e) => beginDrawing(context, e, left, top)}
            onMouseMove={(e) => draw(context, e, left, top)}
            onTouchMove={(e) => draw(context, e, left, top)}
            onMouseUp={() => endDrawing(context)}
            style={{ border: '1px solid black' }}
            ref={canvasRef}
            width="300"
            height="300"
          />
          <canvas
            id="test"
            style={{ border: '1px solid black' }}
            width="48"
            height="48"
          />
          {/* <div id="test" /> */}
        </>
      ) : (
        <h1>loading</h1>
      )}
    </div>
  );
};

export default Writer;
