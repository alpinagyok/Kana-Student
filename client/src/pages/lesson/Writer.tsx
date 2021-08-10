/* eslint-disable no-param-reassign */
import {
  LayersModel,
} from '@tensorflow/tfjs';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { IResponse } from '../../api/interfaces';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
import {
  beginDrawing, draw, endDrawing, clearCanvas, whiteColor,
} from '../../service/drawing';
import { loadModel, predict } from '../../service/model';
import {
  FAILED, IDLE, Kana, LOADING, SimplifiedMaterialBlock,
} from '../../store/interfaces';
import { LessonCont } from './styles';

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
  const writerContRef = useRef<HTMLDivElement>(null);

  let canvas: HTMLCanvasElement | null;
  let context: CanvasRenderingContext2D | null;
  let left: number; let top: number;

  const materialName = selectedMaterial?.name ?? 'katakana';

  const [model, setModel] = useState<LayersModel>();
  const [resStatus, setResStatus] = useState<IResponse>({ type: IDLE, message: '' });

  const canvasSize = 500;
  const canvasBorder = 50;

  useEffect(() => {
    canvas = canvasRef.current;
    const writerCont = writerContRef.current;

    if (canvas) {
      context = canvas.getContext('2d');
      ({ left, top } = canvas.getBoundingClientRect());
      if (context) {
        context.fillStyle = whiteColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
    if (resStatus.type === IDLE) { loadModel(materialName, setModel, setResStatus); }

    const handleResize = () => {
      if (canvas) {
        ({ left, top } = canvas.getBoundingClientRect());
      }
      if (context && writerCont) {
        const writerContWidth = writerCont.getBoundingClientRect().width;
        context.canvas.width = writerContWidth;
        context.canvas.height = writerContWidth;

        (writerCont.querySelector('#canvas-border') as HTMLElement).style.width = `${writerContWidth}px`;
        (writerCont.querySelector('#canvas-border') as HTMLElement).style.height = `${writerContWidth}px`;

        Array.from((writerCont.getElementsByClassName('canvas-border-line-vert') as HTMLCollectionOf<HTMLElement>)).forEach((line) => {
          line.style.height = `${writerContWidth}px`;
        });
        Array.from((writerCont.getElementsByClassName('canvas-border-line-horiz') as HTMLCollectionOf<HTMLElement>)).forEach((line) => {
          line.style.width = `${writerContWidth}px`;
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [resStatus, randomKanas]);

  const handlePredict = async () => {
    const predictedKanaJapName = await predict(model, canvas, context, materialName);
    handleKanaChoice(predictedKanaJapName, kanaToGuess);
  };

  return (
    <LessonCont ref={writerContRef}>
      {resStatus.type === FAILED && (<Error message={resStatus.message} />)}
      {resStatus.type === LOADING && (<Loading message={resStatus.message} />)}
      {model && (
        <>
          <div>
            <button type="button" onClick={() => clearCanvas(canvas, context)}>x</button>
            <button type="button" onClick={() => handlePredict()}>predict</button>
          </div>
          <div
            id="canvas-border"
            style={{
              position: 'relative',
              border: '1px solid black',
              width: `${canvasSize}px`,
              height: `${canvasSize}px`,
            }}
          >
            <canvas
              onMouseDown={(e) => beginDrawing(context, e, left, top)}
              onTouchStart={(e) => beginDrawing(context, e, left, top)}
              onMouseMove={(e) => draw(context, e, left, top)}
              onTouchMove={(e) => draw(context, e, left, top)}
              onMouseUp={() => endDrawing(context)}
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
            >
              <h1 style={{ zIndex: 2000, width: '500px', height: '500px' }}>aaaa</h1>
            </canvas>
            <div
              className="canvas-border-line-vert"
              style={{
                height: `${canvasSize}px`,
                position: 'absolute',
                top: 0,
                left: `${canvasBorder}px`,
                borderLeft: '1px black dotted',
              }}
            />
            <div
              className="canvas-border-line-vert"
              style={{
                height: `${canvasSize}px`,
                position: 'absolute',
                top: 0,
                right: `${canvasBorder}px`,
                borderRight: '1px black dotted',
              }}
            />
            <div
              className="canvas-border-line-horiz"
              style={{
                width: `${canvasSize}px`,
                position: 'absolute',
                top: `${canvasBorder}px`,
                left: 0,
                borderTop: '1px black dotted',
              }}
            />
            <div
              className="canvas-border-line-horiz"
              style={{
                width: `${canvasSize}px`,
                position: 'absolute',
                bottom: `${canvasBorder}px`,
                left: 0,
                borderBottom: '1px black dotted',
              }}
            />
          </div>
        </>
      )}
    </LessonCont>
  );
};

export default Writer;
