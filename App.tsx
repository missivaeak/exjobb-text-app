import * as React from 'react';
import GlobalContext from './src/contexts/GlobalContext';
import Navigation from './src/navigation/Navigation';
import GlobalContextType from './src/types/GlobalContextType';
import GlobalStateType from './src/types/GlobalStateType';

const App = () => {
  const [ modalOpen, setModalOpen ] = React.useState(false)
  const [ spinnerActive, setSpinnerActive ] = React.useState(false)
  const [ globalState, setGlobalState ] = React.useState<GlobalStateType>({
    database: null
  })

  const globalContext: GlobalContextType = {
    globalState,
    setGlobalState,
    spinnerActive,
    setSpinnerActive,
    modalOpen,
    setModalOpen
  }

  return (
    <>
      <GlobalContext.Provider value={globalContext}>
        <Navigation />
      </GlobalContext.Provider>
    </>
  )
}

export default App
