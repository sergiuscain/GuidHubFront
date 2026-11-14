import { useState } from "react"
import { Navigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useMe } from "@/features/auth/hooks"
import { useBecomeGuide } from "@/features/profile/hooks"

export default function BecomeGuidePage() {
  const { data: me } = useMe()
  const becomeGuide = useBecomeGuide()
  const [bio, setBio] = useState("")
  const [paymentDetails, setPaymentDetails] = useState("")

  if (!me) return <Navigate to="/login" replace />

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    becomeGuide.mutate({
      bio: bio || null,
      paymentDetails: paymentDetails || null,
    })
  }

  return (
    <div className="max-w-xl space-y-4">
      <h1 className="text-2xl font-semibold">Стать гидом</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <label className="block space-y-1">
          <span className="text-sm text-muted-foreground">О себе</span>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm text-muted-foreground">Реквизиты для оплаты</span>
          <textarea
            value={paymentDetails}
            onChange={(e) => setPaymentDetails(e.target.value)}
            rows={2}
            className="flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          />
        </label>
        <Button type="submit" disabled={becomeGuide.isPending}>
          Стать гидом
        </Button>
        {becomeGuide.isError && <p className="text-sm text-destructive">Не удалось</p>}
        {becomeGuide.isSuccess && <p className="text-sm text-muted-foreground">Вы стали гидом</p>}
      </form>
    </div>
  )
}