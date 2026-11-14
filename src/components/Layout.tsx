import { Link, Outlet, useNavigate } from "react-router"
import { useLogout, useMe } from "@/features/auth/hooks"
import { Button } from "@/components/ui/button"

export default function Layout() {
  const { data: me } = useMe()
  const logout = useLogout()
  const navigate = useNavigate()

  function handleLogout() {
    logout.mutate(undefined, {
      onSuccess: () => navigate("/login"),
    })
  }

  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold">
            Guidhub
          </Link>
          <Link to="/profile" className="text-sm underline-offset-4 hover:underline">Профиль</Link>
<Link to="/profile/become-guide" className="text-sm underline-offset-4 hover:underline">Стать гидом</Link>
          <div className="flex items-center gap-3 text-sm">
            {me ? (
              <>
                <span className="text-muted-foreground">{me.firstName}</span>
                <span className="text-muted-foreground">/</span>
                <span className="text-muted-foreground">Гид</span>
                <Button variant="ghost" size="sm" onClick={handleLogout} disabled={logout.isPending}>
                  Выйти
                </Button>
              </>
            ) : (
              <Link to="/login" className="text-sm underline-offset-4 hover:underline">
                Войти
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}