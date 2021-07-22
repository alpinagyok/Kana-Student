/* eslint-disable react/prop-types */
/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../components/common/Error';
import Loading from '../../components/common/Loading';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../store/interfaces';
import {
  addPreparedKanas, removePreparedKanas, setMaterialBlock,
} from '../../store/lesson/reducer';
import { getPreparedKanas, getSelectedMaterialsBlock } from '../../store/lesson/selectors';
import { fetchMaterials } from '../../store/materials/reducer';
import { getMaterials, getMaterialsStatus } from '../../store/materials/selectors';

interface Props {
  incrementStep: () => void
}

const LessonStarter: React.FC<Props> = ({ incrementStep }) => {
  const dispatch = useDispatch();
  const materials = useSelector(getMaterials);
  const materialsStatus = useSelector(getMaterialsStatus);
  const selectedMaterial = useSelector(getSelectedMaterialsBlock);
  const preparedKanas = useSelector(getPreparedKanas);

  useEffect(() => {
    if (materialsStatus === IDLE) {
      dispatch(fetchMaterials());
    }
  }, [materials, dispatch]);

  let content;
  if (materialsStatus === LOADING) {
    content = (
      <Loading message="Loading materials" />
    );
  } else if (materialsStatus === SUCCEEDED) {
    content = (
      <div>
        {materials.map((materialBlock) => (
          <button
            key={materialBlock.id}
            type="button"
            onClick={() => {
              dispatch(setMaterialBlock(
                (({ id, name }) => ({ id, name }))(materialBlock),
              ));
            }}
          >
            {materialBlock.name}
          </button>
        ))}

        <div>
          {materials.find((materialBlock) => (
            materialBlock.id === selectedMaterial?.id ?? ''))?.kanas.map((kanaRow) => (
              <div key={`row${kanaRow.row[0].romName}`}>
                {kanaRow.row.map((kana) => (
                  <button
                    type="button"
                    key={`kana${kana.romName}`}
                    onClick={() => (preparedKanas?.find((preparedKana) => preparedKana.romName === kana.romName) ? dispatch(removePreparedKanas([kana])) : dispatch(addPreparedKanas([kana])))}
                    style={preparedKanas?.find((preparedKana) => preparedKana.romName === kana.romName) ? { color: 'green' } : {}}
                  >
                    {kana.japName}

                  </button>
                ))}
                <button onClick={() => dispatch(addPreparedKanas(kanaRow.row))} type="button">Add row</button>
                <button onClick={() => dispatch(removePreparedKanas(kanaRow.row))} type="button">Remove row</button>
              </div>
          ))}
        </div>

        {preparedKanas && preparedKanas?.length > 3 && selectedMaterial && (
          <button type="button" onClick={() => incrementStep()}>Next</button>
        )}
      </div>
    );
  } else if (materialsStatus === FAILED) {
    content = (
      <Error message="Failed to load materials" />
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
