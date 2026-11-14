import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { useLocation } from "react-router"
import { useMe } from "./hooks"

type RoleMode = "client" | "guide"

interface RoleModeContextValue {
  mode: RoleMode
  setMode: (mode: RoleMode) => void
  isGuide: boolean
}

const RoleModeContext = createContext<RoleModeContextValue | null>(null)

export function RoleModeProvider({ children }: { children: ReactNode }) {
  const { data: me } = useMe()
  const location = useLocation()
  const [mode, setModeState] = useState<RoleMode>("client")

  const isGuide = me?.roles.includes("Guide") ?? false

  // URL важнее состояния: если открыт /guide/* и пользователь — гид, включаем режим guide
  useEffect(() => {
    if (location.pathname.startsWith("/guide") && isGuide) {
      setModeState("guide")
    }
  }, [location.pathname, isGuide])

  // Если пользователь не гид — принудительно client
  useEffect(() => {
    if (!isGuide && mode === "guide") {
      setModeState("client")
    }
  }, [isGuide, mode])

  function setMode(next: RoleMode) {
    if (next === "guide" && !isGuide) {
      const goBecome = window.confirm("Вы не гид. Стать гидом?")
      if (goBecome) {
        window.location.href = "/profile/become-guide"
      }
      return
    }
    setModeState(next)
  }

  return (
    <RoleModeContext.Provider value={{ mode, setMode, isGuide }}>
      {children}
    </RoleModeContext.Provider>
  )
}

export function useRoleMode() {
  const ctx = useContext(RoleModeContext)
  if (!ctx) throw new Error("useRoleMode must be used within RoleModeProvider")
  return ctx
}