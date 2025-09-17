// FavoritesContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
type IFavoriteContext = {
    favoriteIds: string[];
    // error: (text: string) => void;
    // info: (text: string) => void;
    // warning: (text: string) => void;
};
const FavoritesContext = createContext<IFavoriteContext | null>(null);

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

    useEffect(() => {
        // Загружаем избранное при старте
        fetch("/api/favorites")
            .then((res) => res.json())
            .then((data) =>
                setFavoriteIds(data.map((f: any) => f.establishmentId))
            );
    }, []);

    const addFavorite = async (id: string) => {
        setFavoriteIds((prev) => [...prev, id]); // оптимистично
        try {
            await fetch("/api/favorites", {
                method: "POST",
                body: JSON.stringify({ establishmentId: id }),
            });
        } catch {
            setFavoriteIds((prev) => prev.filter((f) => f !== id)); // откат если ошибка
        }
    };

    const removeFavorite = async (id: string) => {
        setFavoriteIds((prev) => prev.filter((f) => f !== id));
        try {
            await fetch(`/api/favorites/${id}`, { method: "DELETE" });
        } catch {
            setFavoriteIds((prev) => [...prev, id]); // откат
        }
    };

    const toggleFavorite = (id: string) => {
        if (favoriteIds.includes(id)) {
            removeFavorite(id);
        } else {
            addFavorite(id);
        }
    };

    return (
        <FavoritesContext.Provider
            value={{ favoriteIds}} //, addFavorite, removeFavorite, toggleFavorite 
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
