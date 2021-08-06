import { Button, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Error from '../../../components/common/Error';
import Loading from '../../../components/common/Loading';
import {
  FAILED, IDLE, LOADING, SUCCEEDED,
} from '../../../store/interfaces';
import {
  setMaterialBlock,
} from '../../../store/lesson/reducer';
import { getPreparedKanas, getSelectedMaterialsBlock } from '../../../store/lesson/selectors';
import { fetchMaterials } from '../../../store/materials/reducer';
import { getMaterials, getMaterialsStatus } from '../../../store/materials/selectors';
import {
  KanaRowsBlock,
  LessonStarterContent, MaterialsContainer, PaperMaterial, SelectableKanasContainer,
} from '../styles';
import KanaRowComp from './KanaRowComp';

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
    const kanasForDisplay = materials.find((materialBlock) => (
      materialBlock.id === selectedMaterial?.id ?? ''))?.kanas;

    let firstHalf;
    let secondHalf;
    if (kanasForDisplay) {
      const kanasForDisplayCopy = [...kanasForDisplay];
      const middleIndex = Math.ceil(kanasForDisplayCopy.length / 2);
      firstHalf = kanasForDisplayCopy.splice(0, middleIndex);
      secondHalf = kanasForDisplayCopy.splice(-middleIndex);
    }

    content = (
      <>
        <MaterialsContainer>
          {materials.map((materialBlock) => {
            const selected = selectedMaterial?.id === materialBlock.id;
            return (
              <PaperMaterial
                elevation={selected ? 10 : 3}
                $selected={selected}
                key={materialBlock.id}
                onClick={() => {
                  dispatch(setMaterialBlock(
                    (({ id, name }) => ({ id, name }))(materialBlock),
                  ));
                }}
              >
                <Typography variant="h2" align="center">
                  {materialBlock.japName}
                </Typography>
                <Typography variant="h6" gutterBottom align="center">
                  {materialBlock.name}
                </Typography>
              </PaperMaterial>
            );
          })}
        </MaterialsContainer>

        {firstHalf && secondHalf && (
          <SelectableKanasContainer>
            <KanaRowsBlock>
              {firstHalf.map((kanaRow) => <KanaRowComp key={`row${kanaRow.row[0].romName}`} kanaRow={kanaRow} preparedKanas={preparedKanas} />)}
            </KanaRowsBlock>
            <KanaRowsBlock>
              {secondHalf.map((kanaRow) => <KanaRowComp key={`row${kanaRow.row[0].romName}`} kanaRow={kanaRow} preparedKanas={preparedKanas} />)}
            </KanaRowsBlock>
          </SelectableKanasContainer>
        )}

        {preparedKanas && preparedKanas?.length > 3 && selectedMaterial && (
          <Button onClick={() => incrementStep()} size="large" variant="outlined" color="primary">
            Next
          </Button>
        )}
      </>
    );
  } else if (materialsStatus === FAILED) {
    content = (
      <Error message="Failed to load materials" />
    );
  }

  return (
    <LessonStarterContent>
      {content}
    </LessonStarterContent>
  );
};

export default LessonStarter;
