"use client";
import { FavoriteService } from "@/lib/Api/favorite/favorite.service";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../UserContext/UserContext";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
type IFavoriteContext = {
    favoriteIds: string[];
    addFavorite: (id: string) => any;
    removeFavorite: (id: string) => any;
    toggleFavorite: (id: string) => any;
};
const FavoritesContext = createContext<IFavoriteContext | null>(null);

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
    const { user } = useUser();
    const favoriteService = new FavoriteService();
    const dataLoadManager = new DataLoadManagementService();
    useEffect(() => {
        console.log("FavoritesContext", user?.id);
        if (user) {
            favoriteService
                .getByQuery({ personId: user.id })

                .then((data) => {
                    if (data) {
                        setFavoriteIds(data.map((itemFav) => itemFav.ItemId));
                    }
                });
        }
        // Загружаем избранное при старте
    }, [user]);

    const addFavorite = async (id: string) => {
        const favoriteTypes = await dataLoadManager.getFavoriteTypes();
        const establishmentFavoriteType = favoriteTypes?.find(
            (item) => item.Name === "Establishment"
        );
        if (!user || !establishmentFavoriteType)
            return new Promise(() => false);

        const res = await favoriteService
            .create({
                Person: user?.id,
                ItemId: id,
                ItemType: establishmentFavoriteType.Id,
            })
            .then((res) => {
                if (res) {
                    setFavoriteIds((prev) => [...prev, id]);
                }
                return res;
            });

        res ? true : false;
    };

    const removeFavorite = async (id: string) => {
        setFavoriteIds((prev) => prev.filter((f) => f !== id));

        const res = await favoriteService.delete(id);
        if (res) {
            return true;
        }

        return res ? true : false;
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
            value={{ favoriteIds, addFavorite, removeFavorite, toggleFavorite }} //, addFavorite, removeFavorite, toggleFavorite
        >
            {children}
        </FavoritesContext.Provider>
    );
};

// export const useFavorites = () => useContext(FavoritesContext);
export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return context;
};
