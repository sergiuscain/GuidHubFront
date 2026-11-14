import { useNavigate } from "react-router"
import { useRoleMode } from "@/features/auth/RoleModeContext"

export default function ModeSwitcher() {
  const { mode, setMode } = useRoleMode()
  const navigate = useNavigate()

  function handleClient() {
    setMode("client")
    navigate("/")
  }

  function handleGuide() {
    setMode("guide")
    navigate("/guide/events")
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <button
        type="button"
        onClick={handleClient}
        className={
          mode === "client"
            ? "rounded-md bg-primary px-2 py-1 text-primary-foreground"
            : "rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground"
        }
      >
        Клиент
      </button>
      <button
        type="button"
        onClick={handleGuide}
        className={
          mode === "guide"
            ? "rounded-md bg-primary px-2 py-1 text-primary-foreground"
            : "rounded-md px-2 py-1 hover:bg-accent hover:text-accent-foreground"
        }
      >
        Гид
      </button>
    </div>
  )
}