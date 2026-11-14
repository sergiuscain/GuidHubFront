import { Link, Outlet } from "react-router"

export default function Layout() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="text-lg font-semibold">
            Guidhub
          </Link>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Клиент</span>
            <span>/</span>
            <span>Гид</span>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  )
}