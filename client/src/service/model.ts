import {
  browser, LayersModel, loadLayersModel, Tensor,
} from '@tensorflow/tfjs';
import models from '../pages/lesson/models';
import { Kana } from '../store/interfaces';

const tensorSize = 48;

export const loadModel = async (
  materialName: string,
  setModel: React.Dispatch<React.SetStateAction<LayersModel | undefined>>,
): Promise<void> => {
  let loadedModel: LayersModel;
  try {
    if (localStorage.getItem(`tensorflowjs_models/${materialName}-model/model_metadata`)) {
      loadedModel = await loadLayersModel(`localstorage://${materialName}-model`);
    } else {
      loadedModel = await loadLayersModel(`https://firebasestorage.googleapis.com/v0/b/kana-student.appspot.com/o/${materialName}%2Fmodel.json?alt=media`);
      await loadedModel.save(`localstorage://${materialName}-model`);
    }
    setModel(loadedModel);
    // eslint-disable-next-line no-empty
  } catch { }
};

export const predict = async (
  model: LayersModel | undefined,
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  materialName: string,
): Promise<Kana> => {
  const newCanvas = document.createElement('canvas');
  newCanvas.width = tensorSize;
  newCanvas.height = tensorSize;
  // const newCanvas: HTMLCanvasElement | null = document.querySelector('#test');
  const newContext = newCanvas?.getContext('2d');

  if (model && canvas && context && newContext) {
    // load img from canvas
    const imgPromise: Promise<HTMLImageElement> = new Promise((resolve) => {
      const imageObject = new Image();
      imageObject.onload = () => resolve(imageObject);
      imageObject.src = canvas.toDataURL();
    });

    const imgObj = await imgPromise;

    // scale the canvas img
    newContext.fillStyle = '#FFFFFF';
    newContext.fillRect(0, 0, tensorSize, tensorSize);
    newContext.scale(tensorSize / canvas.width, tensorSize / canvas.height);
    newContext.drawImage(imgObj, 0, 0);
    newContext.scale(canvas.width / tensorSize, canvas.height / tensorSize);

    // get tensor from canvas
    let inputImage = browser.fromPixels(
      newContext.getImageData(0, 0, tensorSize, tensorSize), 1,
    );
    inputImage = inputImage.asType('float32');
    inputImage = inputImage.div(255.0);

    // inverse colors
    inputImage = inputImage.sub(1.0);
    inputImage = inputImage.abs();

    inputImage = inputImage.reshape([1, tensorSize, tensorSize, 1]);

    const result = model.predict(inputImage);

    const tensorArray = await (result as Tensor).array();

    const mappedResult: [Kana, number][] = [];
    for (let i = 0; i < (tensorArray as number[][])[0].length; i += 1) {
      const foundLabel = models.find((modelInfo) => modelInfo.name === materialName)?.label[i] ?? { romName: 'unknown', japName: 'unknown' };
      mappedResult.push([
        foundLabel,
        (tensorArray as number[][])[0][i] * 100,
      ]);
    }

    mappedResult.sort((a, b) => (b[1] as number) - (a[1] as number));
    console.log(mappedResult.slice(0, 3));

    return mappedResult[0][0];
  }
  return { romName: 'error', japName: 'error' };
};
