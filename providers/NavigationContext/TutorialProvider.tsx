import React, { ReactNode, createContext, useReducer } from 'react';

const tutorialState = {
    showTutorialModal: false,
    tutorialDisplay: false
};

export const TutorialContext = createContext(tutorialState);

export const DispatchTutorialContext = createContext<any>(undefined);

type Props = {
    children: ReactNode;
};

const TutorialProvider = (props: Props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(
        (state: any, newValue: any) => ({
            ...state,
            ...newValue,
          }),
          tutorialState
    );
    return (
        <TutorialContext.Provider value={state}>
            <DispatchTutorialContext.Provider value={dispatch}>
            {children}
            </DispatchTutorialContext.Provider>
            
        </TutorialContext.Provider>

    )

}

export default TutorialProvider;
