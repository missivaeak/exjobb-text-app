import { createContext } from 'react';
import type GlobalContextType from '../types/GlobalContextType';

const GlobalContext = createContext({
    globalState: {database: null},
    setGlobalState: () => undefined,

    spinnerActive: false,
    setSpinnerActive: () => undefined,

    modalOpen: false,
    setModalOpen: () => undefined
} as GlobalContextType)

export default GlobalContext
