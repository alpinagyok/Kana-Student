/* eslint-disable no-param-reassign */
import {
  browser, LayersModel, loadLayersModel, Tensor,
} from '@tensorflow/tfjs';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { Kana } from '../../store/interfaces';

interface Props {
  randomKanas: Kana[];
  kanaToGuess: Kana;
  // model?: LayersModel;
  handleKanaChoice: (
    chosenKana: Kana,
    kanaToGuess: Kana,
  ) => void
}

const Writer: React.FC<Props> = ({
  randomKanas, kanaToGuess, handleKanaChoice,
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

  const [model, setModel] = useState<LayersModel>();
  const loadModel = async () => {
    let loadedModel: LayersModel;
    if (localStorage.getItem('tensorflowjs_models/katakana-model/model_metadata')) {
      loadedModel = await loadLayersModel('localstorage://katakana-model');
    } else {
      loadedModel = await loadLayersModel('https://firebasestorage.googleapis.com/v0/b/kana-student.appspot.com/o/katakana%2Fmodel.json?alt=media');
      await loadedModel.save('localstorage://katakana-model');
    }
    setModel(loadedModel);
  };

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
    if (!model) { loadModel(); }
  }, [model]);

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

  const predict = () => {
    if (model && canvas && context) {
      let inputImage = browser.fromPixels(context.getImageData(0, 0, 48, 48), 1);
      inputImage = inputImage.asType('float32');
      inputImage = inputImage.div(255.0);

      // (inputImage as Tensor).array().then((res) => {
      //   console.log((res as number[][]));
      // });

      inputImage = inputImage.reshape([1, 48, 48, 1]);

      const result = model.predict(inputImage);

      const label = [
        'ア',
        'イ',
        'ウ',
        'エ',
        'オ',
        'カ',
        'キ',
        'ク',
        'ケ',
        'コ',
        'サ',
        'シ',
        'ス',
        'セ',
        'ソ',
        'タ',
        'チ',
        'ツ',
        'テ',
        'ト',
        'ナ',
        'ニ',
        'ヌ',
        'ネ',
        'ノ',
        'ハ',
        'ヒ',
        'フ',
        'ヘ',
        'ホ',
        'マ',
        'ミ',
        'ム',
        'メ',
        'モ',
        'ヤ',
        'ユ',
        'ヨ',
        'ラ',
        'リ',
        'ル',
        'レ',
        'ロ',
        'ワ',
        'ヰ',
        'ヱ',
        'ヲ',
        'ン',
      ];

      (result as Tensor).array().then((res) => {
        const mappedResult = [];
        for (let i = 0; i < (res as number[][])[0].length; i += 1) {
          mappedResult.push([label[i], (res as number[][])[0][i] * 100]);
        }

        mappedResult.sort((a, b) => (b[1] as number) - (a[1] as number));
        console.log(mappedResult.slice(0, 3));
      });
    }
  };

  return (
    <div>
      <button type="button" onClick={clearCanvas}>x</button>
      <button type="button" onClick={predict}>predict</button>
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
