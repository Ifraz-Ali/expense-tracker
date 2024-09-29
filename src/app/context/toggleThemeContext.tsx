"use client";
import { createContext, useContext, ReactNode, useState } from "react";

type toggleThemeContextType = {
    isDark: boolean,
    toggleTheme: () => void
}
const toggleThemeContext = createContext<toggleThemeContextType | null>(null);

export default function ToggleThemeContextProvider({ children }: { children: ReactNode }) {
    const [isDark, setisDark] = useState(false);

    const toggleTheme = () => {
        setisDark(!isDark);
    }
    return (
        <toggleThemeContext.Provider value={{ isDark, toggleTheme }}>
            {children}
        </toggleThemeContext.Provider>
    )
}

export const useToggleThemeContext = () => useContext(toggleThemeContext);
