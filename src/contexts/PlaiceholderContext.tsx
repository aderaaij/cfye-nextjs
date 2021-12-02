import { createContext, useContext, useMemo, useState } from 'react';

interface Img {
  src: string;
  width: number;
  height: number;
  type: string;
}
export interface PlaiceHolderImage {
  base64: string;
  img: Img;
  id: string;
}

export type PlaiceholderState = {
  [key: string]: PlaiceHolderImage;
};

export type PlaiceholderActions = {
  setPlaiceholders: (images: PlaiceholderState) => void;
};

export const PlaiceholderStateContext = createContext<PlaiceholderState>(null);
PlaiceholderStateContext.displayName = 'PlaiceholderStateContext';

export const PlaiceholderActionsContext =
  createContext<PlaiceholderActions>(null);
PlaiceholderActionsContext.displayName = 'PlaiceholderActionsContext';

export const usePlaiceholderStateContext = (): any =>
  useContext(PlaiceholderStateContext);
export const usePlaiceholderActionsContext = (): any =>
  useContext(PlaiceholderActionsContext);

const initialPlaiceholderState: PlaiceholderState = {};

export const PlaiceholderProvider: React.FC = ({ children }) => {
  const [plaiceholderState, setPlaiceholderState] = useState<PlaiceholderState>(
    initialPlaiceholderState
  );

  const actions = useMemo<PlaiceholderActions>(
    () => ({
      setPlaiceholders: (images) => {
        setPlaiceholderState((prevState) => ({
          ...prevState,
          ...images,
        }));
      },
    }),
    []
  );

  return (
    <PlaiceholderStateContext.Provider value={plaiceholderState}>
      <PlaiceholderActionsContext.Provider value={actions}>
        {children}
      </PlaiceholderActionsContext.Provider>
    </PlaiceholderStateContext.Provider>
  );
};
