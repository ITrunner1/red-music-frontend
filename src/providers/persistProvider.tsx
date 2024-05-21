'use client';

import { persistor } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";

interface PersistProviderProps { 
    children: React.ReactNode;
};

const PersistProvider: React.FC<PersistProviderProps> = ({
    children
}) => {
    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    )
}

export default PersistProvider;