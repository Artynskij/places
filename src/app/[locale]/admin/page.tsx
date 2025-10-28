import { ROUTES } from "@/lib/config/Routes";
import { redirect } from "next/navigation";

export default function AdminPage() {
    redirect(ROUTES.ADMIN.USERS);
}
