'use client';

import { NextUIProvider } from "@nextui-org/react";
import React from "react";

interface ReactQueryProps {
    children: React.ReactNode;
};

const NextUiProvider: React.FC<ReactQueryProps> = ({
    children
}) => {
    return (
        <NextUIProvider>
            {children}
        </NextUIProvider>
    )
}

export default NextUiProvider;