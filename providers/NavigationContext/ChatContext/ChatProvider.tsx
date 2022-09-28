import React, { ReactNode, createContext, useReducer } from 'react';

const chat = {
    randomGroup: []
};

export const ChatContext = createContext<any>(chat);

export const DispatchChatContext = createContext<any>(undefined);

type Props = {
    children: ReactNode;
}

const ChatProvider = (props: Props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(
        (state: any, newValue: any) => ({
            ...state,
            ...newValue,
          }),
          chat
    );
    return (
        <ChatContext.Provider value={state}>
            <DispatchChatContext.Provider value={dispatch}>
            {children}
            </DispatchChatContext.Provider>
            
        </ChatContext.Provider>

    )

}

export default ChatProvider;



