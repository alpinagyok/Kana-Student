import { Button } from '@material-ui/core';
import React from 'react';
import {
  Clear as ClearIcon,
} from '@material-ui/icons';
import { useToast } from '../../contexts/toastContext';
import {
  Toast, ToastImage, ToastsContainer, ToastTypogrophy,
} from './styles';

const Toasts: React.FC = () => {
  const { toastList, deleteToast } = useToast();

  return (
    <ToastsContainer>
      {toastList.map((toast) => (
        <Toast key={toast.id} elevation={10} $isFadingOut={toast.isFadingOut}>
          <ToastImage src={toast.icon} alt="Achievement" />
          <ToastTypogrophy variant="h5">
            {toast.name}
          </ToastTypogrophy>
          <Button style={{ minWidth: 0 }} color="primary" onClick={() => deleteToast && deleteToast(toast.id)}>
            <ClearIcon />
          </Button>
        </Toast>
      ))}
    </ToastsContainer>
  );
};

export default Toasts;
