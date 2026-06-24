// SoundContext.jsx

import { createContext, useContext, useState } from "react";

const SoundContext = createContext();

export const SoundProvider = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);

  return (
    <SoundContext.Provider
      value={{
        isSoundEnabled,
        setIsSoundEnabled,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => useContext(SoundContext);