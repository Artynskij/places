"use client";
import { FavoriteService } from "@/lib/Api/favorite/favorite.service";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    useMemo,
} from "react";
import { useUser } from "../UserContext/UserContext";
import { DataLoadManagementService } from "@/lib/Api/dataLoadManagement/dataLoadManagement.service";
import { IFavoriteEntity } from "@/lib/models";
import { useNotification } from "../NotificationContext/NotificationContext";

type IFavoriteContext = {
    favorites: IFavoriteEntity[];
    addFavorite: (idEstablishment: string) => Promise<boolean>;
    removeFavorite: (idEstablishment: string) => Promise<boolean>;
    toggleFavorite: (idEstablishment: string) => Promise<boolean>;
};

const FavoritesContext = createContext<IFavoriteContext | null>(null);

export const FavoritesProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const [favorites, setFavorites] = useState<IFavoriteEntity[]>([]);
    const { user } = useUser();
    const notification = useNotification();

    const favoriteService = useMemo(() => new FavoriteService(), []);
    const dataLoadManager = useMemo(() => new DataLoadManagementService(), []);

    useEffect(() => {
        if (user) {
            favoriteService.getByQuery({ personId: user.id }).then((data) => {
                if (data) {
                    setFavorites(data);
                }
            });
        }
    }, [user, favoriteService]);

    const addFavorite = useCallback(
        async (idEstablishment: string): Promise<boolean> => {
            if (!user) {
                notification.error({ message: "пользователь не найден" });
                return false;
            }
            const favoriteTypes = await dataLoadManager.getFavoriteTypes();
            const establishmentFavoriteType = favoriteTypes?.find(
                (item) => item.Name === "Establishment"
            );
            if (!establishmentFavoriteType) return false;

            const res = await favoriteService.create({
                Person: user.id,
                ItemId: idEstablishment,
                ItemType: establishmentFavoriteType.Id,
            });

            if (res) {
                setFavorites((prev) => [...prev, res]);
                notification.success({
                    message: "объект добавлен из избранного",
                });
                return true;
            }
            return false;
        },
        [user, dataLoadManager, favoriteService, notification]
    );

    const removeFavorite = useCallback(
        async (idFavorite: string): Promise<boolean> => {
            if (!user) {
                notification.error({ message: "пользователь не найден" });
                return false;
            }
            const res = await favoriteService.delete(idFavorite);
            if (res) {
                setFavorites((prev) => prev.filter((f) => f.Id !== idFavorite));
                notification.info({
                    message: "объект удален из избранного",
                });
                return true;
            }
            return false;
        },
        [favoriteService, user, notification]
    );

    const toggleFavorite = useCallback(
        async (idEstablishment: string): Promise<boolean> => {
            const isFavorite = favorites.find(
                (item) => item.ItemId === idEstablishment
            );
            let res;

            if (isFavorite) {
                res = await removeFavorite(isFavorite.Id);
            } else {
                res = await addFavorite(idEstablishment);
            }
            return res;
        },
        [favorites, removeFavorite, addFavorite]
    );

    // Мемоизируем значение контекста
    const contextValue = useMemo(
        (): IFavoriteContext => ({
            favorites,
            addFavorite,
            removeFavorite,
            toggleFavorite,
        }),
        [favorites, addFavorite, removeFavorite, toggleFavorite]
    );

    return (
        <FavoritesContext.Provider value={contextValue}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
};
