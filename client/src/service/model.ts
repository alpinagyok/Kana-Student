import {
  browser, LayersModel, loadLayersModel, Tensor,
} from '@tensorflow/tfjs';
import models from '../pages/lesson/models';

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

export const predict = (
  model: LayersModel | undefined,
  canvas: HTMLCanvasElement | null,
  context: CanvasRenderingContext2D | null,
  materialName: string,
): void => {
  if (model && canvas && context) {
    let inputImage = browser.fromPixels(context.getImageData(0, 0, 48, 48), 1);
    inputImage = inputImage.asType('float32');
    inputImage = inputImage.div(255.0);

    // (inputImage as Tensor).array().then((res) => {
    //   console.log((res as number[][]));
    // });

    inputImage = inputImage.reshape([1, 48, 48, 1]);

    const result = model.predict(inputImage);

    (result as Tensor).array().then((res) => {
      const mappedResult = [];
      for (let i = 0; i < (res as number[][])[0].length; i += 1) {
        mappedResult.push([
          models.find((modelInfo) => modelInfo.name === materialName)?.label[i],
          (res as number[][])[0][i] * 100,
        ]);
      }

      mappedResult.sort((a, b) => (b[1] as number) - (a[1] as number));
      console.log(mappedResult.slice(0, 3));
    });
  }
};
