/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FAILED, GUESSER_LESSON, IDLE, LOADING, SUCCEEDED, WRITER_LESSON,
} from '../../store/interfaces';
import {
  addPreparedKanas, removePreparedKanas, setLessonType, setMaterialBlockID, setPreparedKanas,
} from '../../store/lesson/reducer';
import { getPreparedKanas, getSelectedMaterialsBlockID } from '../../store/lesson/selectors';
import { fetchMaterials } from '../../store/materials/reducer';
import { getMaterials, getMaterialsStatus } from '../../store/materials/selectors';

interface Props {
  incrementStep: () => void
}

const LessonStarter: React.FC<Props> = ({ incrementStep }) => {
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

        <table>
          <tbody>
            {materials.find((materialBlock) => (
              materialBlock.id === selectedMaterial))?.kanas.map((kanaRow) => (
                <tr key={`row${kanaRow[0].id}`}>
                  {kanaRow.map((kana) => (
                    <td
                      key={`kana${kana.id}`}
                      onClick={() => (preparedKanas?.find((preparedKana) => preparedKana.id === kana.id) ? dispatch(removePreparedKanas([kana])) : dispatch(addPreparedKanas([kana])))}
                      style={preparedKanas?.find((preparedKana) => preparedKana.id === kana.id) ? { color: 'green' } : {}}
                    >
                      {kana.japName}

                    </td>
                  ))}
                  <td><button onClick={() => dispatch(addPreparedKanas(kanaRow))} type="button">Add row</button></td>
                  <td><button onClick={() => dispatch(removePreparedKanas(kanaRow))} type="button">Remove row</button></td>
                </tr>
            ))}
          </tbody>
        </table>

        {preparedKanas && preparedKanas?.length > 3 && selectedMaterial && (
          <button type="button" onClick={() => incrementStep()}>Next</button>
        )}
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
