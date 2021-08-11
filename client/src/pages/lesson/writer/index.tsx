/* eslint-disable no-param-reassign */
import {
  LayersModel,
} from '@tensorflow/tfjs';
import React, {
  useEffect, useRef, useState,
} from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import { IResponse } from '../../../api/interfaces';
import Error from '../../../components/common/Error';
import Loading from '../../../components/common/Loading';
import {
  beginDrawing, draw, endDrawing, clearCanvas, whiteColor,
} from '../../../service/drawing';
import { loadModel, predict } from '../../../service/model';
import {
  FAILED, IDLE, Kana, LOADING, SimplifiedMaterialBlock,
} from '../../../store/interfaces';
import {
  BottomLine,
  CanvasButton, CanvasButtons, CanvasWrapper, LeftLine, RightLine, TopLine,
} from './styles';
import { LessonCont } from '../styles';

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
  const [useSmoothness, setUseSmoothness] = useState(false);
  const [canvasSize, setCanvasSize] = useState(500);

  const canvasBorderRatio = 1 / 8;

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
        // Resize canvas to fit the screen
        const writerContWidth = writerCont.getBoundingClientRect().width;
        context.canvas.width = writerContWidth;
        context.canvas.height = writerContWidth;

        setCanvasSize(writerContWidth);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [resStatus, randomKanas, useSmoothness, canvasSize]);

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
          <CanvasWrapper $size={canvasSize}>
            <canvas
              onMouseDown={(e) => beginDrawing(context, e, left, top)}
              onTouchStart={(e) => beginDrawing(context, e, left, top)}
              onMouseMove={(e) => draw(context, e, left, top, useSmoothness ? 30 : 0)}
              onTouchMove={(e) => draw(context, e, left, top, useSmoothness ? 30 : 0)}
              onMouseUp={() => endDrawing(context)}
              ref={canvasRef}
              width={canvasSize}
              height={canvasSize}
            />
            <LeftLine $size={canvasSize} $borderRation={canvasBorderRatio} />
            <RightLine $size={canvasSize} $borderRation={canvasBorderRatio} />
            <TopLine $size={canvasSize} $borderRation={canvasBorderRatio} />
            <BottomLine $size={canvasSize} $borderRation={canvasBorderRatio} />

            <CanvasButtons>
              <FormControlLabel
                control={(
                  <Checkbox
                    checked={useSmoothness}
                    onChange={() => setUseSmoothness(!useSmoothness)}
                    name="useSmoothness"
                    color="primary"
                  />
                )}
                label="Use smoothness"
              />
              <CanvasButton variant="outlined" color="secondary" onClick={() => clearCanvas(canvas, context)}>
                Clear
              </CanvasButton>
              <CanvasButton variant="outlined" color="primary" onClick={handlePredict}>
                Confirm
              </CanvasButton>
            </CanvasButtons>
          </CanvasWrapper>
        </>
      )}
    </LessonCont>
  );
};

export default Writer;
