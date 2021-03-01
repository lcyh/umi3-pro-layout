import { createContext,useContext } from 'react';

export const LayoutContext = createContext({} as any);
export const useStore = () => {
    const store = useContext(LayoutContext);
    if (!store) {
        throw new Error("请在 <StoreProvider> 组件中使用");
    }
    return store;
};

