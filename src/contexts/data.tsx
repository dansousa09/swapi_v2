import { createContext, useState, useContext } from "react";
import { ICharacters } from "../interfaces/ICharacter";

interface IContext {
  data: ICharacters;
  handleSetData: (data: ICharacters) => void;
}

const Context = createContext({} as IContext);

interface Props {
  children: React.ReactNode;
}

export const Provider = ({ children }: Props) => {
  const [data, setData] = useState({} as ICharacters);

  const handleSetData = (data: ICharacters) => {
    setData(data);
  }

  return (
    <Context.Provider value={{ data, handleSetData }}>
      {children}
    </Context.Provider>
  )
};

export const useData = () => {

  const context = useContext(Context);
  return context;
}
