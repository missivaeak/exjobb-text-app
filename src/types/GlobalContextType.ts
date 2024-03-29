import { Dispatch, SetStateAction } from "react"
import GlobalStateType from "./GlobalStateType"

type GlobalContextType = {
    globalState: GlobalStateType
    setGlobalState: Dispatch<SetStateAction<GlobalStateType>>

    spinnerActive: boolean
    setSpinnerActive: Dispatch<SetStateAction<boolean>>

    modalOpen: boolean,
    setModalOpen: Dispatch<SetStateAction<boolean>>
}

export default GlobalContextType