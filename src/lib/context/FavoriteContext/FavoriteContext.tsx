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
import { IFavoriteFront } from "@/lib/models";
import { useNotification } from "../NotificationContext/NotificationContext";

type IFavoriteContext = {
    favorites: IFavoriteFront[] | null;
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
    const [favorites, setFavorites] = useState<IFavoriteFront[] | null>([]);
    const { user } = useUser();
    const notification = useNotification();

    const favoriteService = useMemo(() => new FavoriteService(), []);
    const dataLoadManager = useMemo(() => new DataLoadManagementService(), []);

    useEffect(() => {
        if (user) {
            favoriteService.getByQuery({ personId: user.id }).then((data) => {
                if (data) {
                    setFavorites(data.length > 0 ? data : null);
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
                setFavorites((prev) => {
                    return prev ? [...prev, res] : [res];
                });
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
                setFavorites((prev) => {
                    const newFavorites = prev
                        ? prev.filter((f) => f.id !== idFavorite)
                        : null;
                    return !!newFavorites?.length ? newFavorites : null;
                });
                notification.info({
                    message: "объект удален из избранного",
                });
                return true;
            } else {
                notification.error({
                    message: "ошибка при удалении избранного",
                });
                return false;
            }
        },
        [favoriteService, user, notification]
    );

    const toggleFavorite = useCallback(
        async (idEstablishment: string): Promise<boolean> => {
            const isFavorite = favorites
                ? favorites.find((item) => item.itemId === idEstablishment)
                : false;
            let res;

            if (isFavorite) {
                res = await removeFavorite(isFavorite.id);
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
