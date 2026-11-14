import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useDevLogin } from "./hooks"

export default function DevLoginForm() {
  const [username, setUsername] = useState("")
  const devLogin = useDevLogin()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!username.trim()) return
    devLogin.mutate(username.trim())
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <p className="text-sm text-muted-foreground">Dev-вход (только в development)</p>
      <div className="flex gap-2">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="username"
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
        <Button type="submit" disabled={devLogin.isPending}>
          Войти
        </Button>
      </div>
      {devLogin.isError && (
        <p className="text-sm text-destructive">Не удалось войти</p>
      )}
    </form>
  )
}