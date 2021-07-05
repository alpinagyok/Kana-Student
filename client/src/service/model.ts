import {
  browser, LayersModel, loadLayersModel, Tensor,
} from '@tensorflow/tfjs';
import models from '../pages/lesson/models';
import { Kana } from '../store/interfaces';

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
  if (model && canvas && context) {
    let inputImage = browser.fromPixels(context.getImageData(0, 0, 48, 48), 1);
    inputImage = inputImage.asType('float32');
    inputImage = inputImage.div(255.0);

    // (inputImage as Tensor).array().then((res) => {
    //   console.log((res as number[][]));
    // });

    inputImage = inputImage.reshape([1, 48, 48, 1]);

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
