import { useEffect, useRef } from "react"
import { useTelegramLogin } from "./hooks"
import type { TelegramAuthData } from "@/types/auth"

const BOT_USERNAME = import.meta.env.VITE_TELEGRAM_BOT_USERNAME as string | undefined

declare global {
  interface Window {
    onTelegramAuth?: (user: TelegramAuthData) => void
  }
}

export default function TelegramLoginWidget() {
  const containerRef = useRef<HTMLDivElement>(null)
  const telegramLogin = useTelegramLogin()

  useEffect(() => {
    if (!BOT_USERNAME || !containerRef.current) return

    window.onTelegramAuth = (user: TelegramAuthData) => {
      telegramLogin.mutate(user)
    }

    const script = document.createElement("script")
    script.src = "https://telegram.org/js/telegram-widget.js?22"
    script.async = true
    script.setAttribute("data-telegram-login", BOT_USERNAME)
    script.setAttribute("data-size", "large")
    script.setAttribute("data-onauth", "onTelegramAuth(user)")
    script.setAttribute("data-request-access", "write")

    const container = containerRef.current
    container.appendChild(script)

    return () => {
      container.innerHTML = ""
      delete window.onTelegramAuth
    }
  }, [telegramLogin])

  if (!BOT_USERNAME) {
    return <p className="text-sm text-muted-foreground">Telegram bot username не задан</p>
  }

  return (
    <div className="space-y-2">
      <div ref={containerRef} />
      {telegramLogin.isError && (
        <p className="text-sm text-destructive">Не удалось войти через Telegram</p>
      )}
    </div>
  )
}