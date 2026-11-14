import { Navigate } from "react-router"
import { useMe } from "@/features/auth/hooks"
import TelegramLoginWidget from "@/features/auth/TelegramLoginWidget"
import DevLoginForm from "@/features/auth/DevLoginForm"

export default function LoginPage() {
  const { data, isLoading } = useMe()

  if (isLoading) {
    return <p className="text-muted-foreground">Загрузка…</p>
  }

  if (data) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-sm space-y-6 py-10">
      <h1 className="text-2xl font-semibold">Вход</h1>
      <TelegramLoginWidget />
      {import.meta.env.DEV && (
        <>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="h-px flex-1 bg-border" />
            <span>или</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <DevLoginForm />
        </>
      )}
    </div>
  )
}