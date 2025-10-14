"use client";

import { PersonService } from "@/lib/Api/(Person)/person/person.service";
import { IUser } from "@/lib/models/common/IUser";
import { TTypeUser } from "@/lib/models/types";
import {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
    useMemo,
    useCallback,
} from "react";

interface IUserLocalStorage {
    id: string;
    typeUser: TTypeUser;
}

type UserContextType = {
    user: IUser | null;
    setUser: (user: IUser | null) => void;
    loadingUser: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUserState] = useState<IUser | null>(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // Мемоизируем сервис
    const personService = useMemo(() => new PersonService(), []);

    // Загружаем пользователя из localStorage при старте
    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        const parsedSavedUser: IUserLocalStorage | null = savedUser
            ? JSON.parse(savedUser)
            : null;

        if (parsedSavedUser?.id) {
            personService.getById(parsedSavedUser.id).then((res) => {
                if (res) {
                    setUserState({
                        typeUser: parsedSavedUser.typeUser,
                        ...res,
                    });
                } else {
                    localStorage.removeItem("user");
                }
                setLoadingUser(false);
            });
        } else {
            setLoadingUser(false);
        }
    }, [personService]);

    // Мемоизируем setUser функцию
    const setUser = useCallback((newUser: IUser | null) => {
        setUserState(newUser);

        if (newUser) {
            localStorage.setItem(
                "user",
                JSON.stringify({ id: newUser.id, typeUser: newUser.typeUser })
            );
        } else {
            localStorage.removeItem("user");
        }
    }, []);

    // Мемоизируем значение контекста
    const contextValue = useMemo(
        (): UserContextType => ({
            user,
            setUser,
            loadingUser,
        }),
        [user, setUser, loadingUser]
    );

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};
