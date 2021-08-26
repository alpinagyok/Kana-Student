import React, {
  useContext, useState, createContext,
} from 'react';

export interface IToast {
  id: string;
  name: string;
  description: string;
  icon: string;
  isFadingOut?: boolean;
}

type Value = {
  toastList: IToast[];
  addToast: ((newToast: IToast) => void) | undefined;
  deleteToast: ((id: string) => void) | undefined;
};

const ToastContext = createContext<Value>(
  { toastList: [], addToast: undefined, deleteToast: undefined },
);

export const useToast = (): Value => useContext(ToastContext);

export const ToastProvider: React.FC = ({ children }) => {
  const [toastList, setToastList] = useState<IToast[]>([]);

  // First set it to fade out animation, then remove from state after a delay
  const deleteToast = (id: string) => {
    setToastList(toastList.map((toast) => (toast.id === id
      ? { ...toast, isFadingOut: true } : toast)));
    setTimeout(() => {
      setToastList(toastList.filter((toast) => toast.id !== id));
    }, 400);
  };

  const addToast = (newToast: IToast) => {
    setToastList([...toastList, newToast]);
  };

  const value = {
    toastList, addToast, deleteToast,
  };

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
};
