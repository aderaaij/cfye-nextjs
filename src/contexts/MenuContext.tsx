import { createContext, useContext } from 'react';

interface Initialstate {
  isMenuActive: boolean;
  toggleMenu: any;
}

const initialState = {
  isMenuActive: false,
  toggleMenu: (isActive) => {}, // eslint-disable-line
};

interface Props {
  value: Initialstate;
  children: React.ReactNode;
}

export const AppContext = createContext(initialState);

const AppWrapper: React.FC<Props> = ({ children, value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppWrapper;

export const useAppContext = () => useContext(AppContext);
