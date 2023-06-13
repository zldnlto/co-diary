import { atom } from 'recoil';

export const confirmModalState = atom({
  key: 'confirmModalState',
  default: {
    visible: false,
  },
});

export const mapModalState = atom({
  key: 'mapModalState',
  default: {
    visible: false,
  },
});
