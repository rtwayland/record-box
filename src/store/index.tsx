import { createContext, Dispatch, ReactNode, useReducer } from 'react';
import recordReducer, {
  initialState,
  Action,
  RecordState,
} from './recordReducer';

const store = createContext<[RecordState, Dispatch<Action>]>([
  initialState,
  () => {},
]);
const { Provider } = store;

const StateProvider = ({ children }: { children: ReactNode }) => {
  const [recordState, dispatch] = useReducer(recordReducer, initialState);

  const state = {
    ...recordState,
  };
  return <Provider value={[state, dispatch]}>{children}</Provider>;
};

export { store, StateProvider };
