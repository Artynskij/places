"use client";
import { FavoriteService } from "@/lib/Api/favorite/favorite.service";
import { createContext, useContext, useState, useEffect } from "react";
import { useUser } from "../UserContext/UserContext";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { IFavoriteEntity } from "@/lib/models";
type IFavoriteContext = {
    favorites: IFavoriteEntity[];
    addFavorite: (id: string) => Promise<boolean>;
    removeFavorite: (id: string) => Promise<boolean>;
    toggleFavorite: (id: string) => Promise<boolean>;
};
const FavoritesContext = createContext<IFavoriteContext | null>(null);

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favorites, setFavorites] = useState<IFavoriteEntity[]>([]);
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
                        setFavorites(data.map((itemFav) => itemFav));
                    }
                });
        }
        // Загружаем избранное при старте
    }, [user]);

    const addFavorite = async (id: string): Promise<boolean> => {
        const favoriteTypes = await dataLoadManager.getFavoriteTypes();
        const establishmentFavoriteType = favoriteTypes?.find(
            (item) => item.Name === "Establishment"
        );
        if (!user || !establishmentFavoriteType) return false;

        const res = await favoriteService
            .create({
                Person: user.id,
                ItemId: id,
                ItemType: establishmentFavoriteType.Id,
            })
            .then((res) => {
                if (res) {
                    setFavorites((prev) => [...prev, res]);
                }
                return res;
            });

        return !!res;
    };

    const removeFavorite = async (id: string): Promise<boolean> => {
        setFavorites((prev) => prev.filter((f) => f.ItemId !== id));

        const res = await favoriteService.delete(id);
        if (res) {
            return true;
        }

        return res ? true : false;
    };

    const toggleFavorite = async (id: string): Promise<boolean> => {
        let res;
        if (favorites.some((item) => item.ItemId === id)) {
            res = await removeFavorite(id);
        } else {
            res = await addFavorite(id);
        }
        return res ? true : false;
    };

    return (
        <FavoritesContext.Provider
            value={{ favorites, addFavorite, removeFavorite, toggleFavorite }} //, addFavorite, removeFavorite, toggleFavorite
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
