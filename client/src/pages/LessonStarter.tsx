import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FAILED, GUESSER_LESSON, IDLE, LOADING, SUCCEEDED, WRITER_LESSON,
} from '../store/interfaces';
import {
  addPreparedKanas, removePreparedKanas, setLessonType, setMaterialBlockID, setPreparedKanas,
} from '../store/lesson/reducer';
import { getPreparedKanas, getSelectedMaterialsBlockID } from '../store/lesson/selectors';
import { fetchMaterials } from '../store/materials/reducer';
import { getMaterials, getMaterialsStatus } from '../store/materials/selectors';

const LessonStarter: React.FC = () => {
  const dispatch = useDispatch();
  const materials = useSelector(getMaterials);
  const materialsStatus = useSelector(getMaterialsStatus);
  const selectedMaterial = useSelector(getSelectedMaterialsBlockID);
  const preparedKanas = useSelector(getPreparedKanas);

  useEffect(() => {
    if (materialsStatus === IDLE) {
      dispatch(fetchMaterials());
    }
  }, [materials, dispatch]);

  let content;
  if (materialsStatus === LOADING) {
    content = (
      <div><h1>Loading</h1></div>
    );
  } else if (materialsStatus === SUCCEEDED) {
    content = (
      <div>
        {materials.map((materialBlock) => (
          <button
            key={materialBlock.id}
            type="button"
            onClick={() => {
              dispatch(setMaterialBlockID(materialBlock.id));
            }}
          >
            {materialBlock.name}
          </button>
        ))}

        <div>
          <button
            type="button"
            onClick={() => {
              dispatch(setLessonType(GUESSER_LESSON));
            }}
          >
            {GUESSER_LESSON}
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(setLessonType(WRITER_LESSON));
            }}
          >
            {WRITER_LESSON}
          </button>
        </div>

        <table>
          {materials.find((materialBlock) => (
            materialBlock.id === selectedMaterial))?.kanas.map((kanaRow) => (
              <tr>
                {kanaRow.map((kana) => (
                  <td style={preparedKanas?.find((preparedKana) => preparedKana.id === kana.id) ? { color: 'green' } : {}}>{kana.japName}</td>
                ))}
                <td><button onClick={() => dispatch(addPreparedKanas(kanaRow))} type="button">Add row</button></td>
                <td><button onClick={() => dispatch(removePreparedKanas(kanaRow))} type="button">Remove row</button></td>
              </tr>
          ))}
        </table>
      </div>
    );
  } else if (materialsStatus === FAILED) {
    content = (
      <div><h1>Failed</h1></div>
    );
  }

  return (
    <div>
      <h1>LessonStarter</h1>
      {content}
    </div>
  );
};

export default LessonStarter;
