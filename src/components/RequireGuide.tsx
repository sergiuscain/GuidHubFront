import { Navigate, Outlet } from "react-router"
import { useMe } from "@/features/auth/hooks"

export default function RequireGuide() {
  const { data: me, isLoading } = useMe()

  if (isLoading) return <p className="text-muted-foreground">Загрузка…</p>
  if (!me) return <Navigate to="/login" replace />
  if (!me.roles.includes("Guide")) return <Navigate to="/" replace />

  return <Outlet />
}