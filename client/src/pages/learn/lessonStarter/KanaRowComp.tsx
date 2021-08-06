import { Typography } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
} from '@material-ui/icons';
import {
  addPreparedKanas, removePreparedKanas,
} from '../../../store/lesson/reducer';
import {
  AddRemoveButton,
  KanaPapersBlock,
  KanaRow,
  PaperKana,
} from '../styles';
import { Kana } from '../../../store/interfaces';

interface Props {
  kanaRow: {
    row: Kana[];
  };
  preparedKanas: Kana[] | undefined;
}

const KanaRowComp: React.FC<Props> = ({ kanaRow, preparedKanas }) => {
  const dispatch = useDispatch();

  return (
    <KanaRow>
      <AddRemoveButton color="secondary" onClick={() => dispatch(removePreparedKanas(kanaRow.row))}>
        <RemoveIcon />
      </AddRemoveButton>
      <KanaPapersBlock>
        {kanaRow.row.map((kana) => {
          const kanaInRow = preparedKanas?.find((preparedKana) => (
            preparedKana.romName === kana.romName
          ));
          return (
            <PaperKana
              elevation={kanaInRow ? 8 : 2}
              key={`kana${kana.romName}`}
              $selected={kanaInRow !== undefined}
              onClick={() => (kanaInRow
                ? dispatch(removePreparedKanas([kana])) : dispatch(addPreparedKanas([kana])))}
            >
              <Typography variant="h6">
                {kana.japName}
              </Typography>
            </PaperKana>
          );
        })}
      </KanaPapersBlock>
      <AddRemoveButton color="primary" onClick={() => dispatch(addPreparedKanas(kanaRow.row))}>
        <AddIcon />
      </AddRemoveButton>
    </KanaRow>
  );
};

export default KanaRowComp;
