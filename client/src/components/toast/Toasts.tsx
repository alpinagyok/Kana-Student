import React from 'react';
import { useToast } from '../../contexts/toastContext';
import { Toast, ToastsContainer } from './styles';

const Toasts: React.FC = () => {
  const { toastList, deleteToast } = useToast();

  return (
    <ToastsContainer>
      {toastList.map((toast) => (
        <Toast $isFadingOut={toast.isFadingOut} style={{ backgroundColor: 'red' }}>
          {toast.name}
          <button type="button" onClick={() => deleteToast && deleteToast(toast.id)}>X</button>
        </Toast>
      ))}
    </ToastsContainer>
  );
};

export default Toasts;
