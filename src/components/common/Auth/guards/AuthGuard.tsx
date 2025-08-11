"use client";
import { useUser } from "@/lib/context/UserContext/UserContext";
import { TTypeUser } from "@/lib/models/types";
import { ReactNode, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader } from "../../Loader/Loader";
import { ROUTES } from "@/lib/config/Routes";
import { useNotification } from "@/lib/context";
import { CONSTANT_SEARCH_PARAMS } from "@/asset/constants/SearchParamsConst";

interface AuthGuardProps {
    children: ReactNode;
    roles?: TTypeUser[]; // если не указано, пускаем всех
    fallback?: ReactNode; // например, редирект или сообщение
}

export const AuthGuard = ({
    children,
    roles,
    fallback = null,
}: AuthGuardProps) => {
    const { user } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    const searchParams = useSearchParams();
    const notification = useNotification();
    const hasRedirected = useRef(false); // ← флаг, чтобы не дублировать

    useEffect(() => {
        if (hasRedirected.current) return; // уже редиректили — выходим

        if (!user) {
            notification.info({
                message: "Эта страница для аутентифицированных пользователей",
            });
            const redirectUrl = encodeURIComponent(pathname);
            router.replace(
                `${ROUTES.AUTH.LOGIN}?${CONSTANT_SEARCH_PARAMS.REDIRECT}=${redirectUrl}`
            );
            hasRedirected.current = true;
            return;
        }

        if (roles && !roles.includes(user.typeUser)) {
            notification.info({
                message: "Зайдите в профиль с другим типом",
            });
            const redirectUrl = encodeURIComponent(pathname);
           

            router.replace(
                `${ROUTES.AUTH.LOGIN}?${CONSTANT_SEARCH_PARAMS.REDIRECT}=${redirectUrl}`
            );
            hasRedirected.current = true;
        }
    }, [user, roles, notification, router]);

    if (!user) return <Loader />;

    if (roles && !roles.includes(user.typeUser)) return fallback;

    return <>{children}</>;
};
