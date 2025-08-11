"use client";

import { IUser } from "@/lib/models/common/IUser";
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type UserContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<IUser | null>(null);

    // Загружаем пользователя из localStorage при старте
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUserState(JSON.parse(savedUser));
        }
    }, []);

    const setUser = (newUser: IUser | null) => {
        setUserState(newUser);

        if (newUser) {
            localStorage.setItem("user", JSON.stringify(newUser));
        } else {
            localStorage.removeItem("user");
        }
    };

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
