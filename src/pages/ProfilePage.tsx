import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import { useMe } from "@/features/auth/hooks"
import {
  useAddChild,
  useChildren,
  useDeleteChild,
  useDeleteMe,
  useTogglePrivacy,
  useUpdateMe,
} from "@/features/profile/hooks"

export default function ProfilePage() {
  const { data: me, isLoading } = useMe()
  const updateMe = useUpdateMe()
  const togglePrivacy = useTogglePrivacy()
  const deleteMe = useDeleteMe()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    bloodType: "",
    isProfilePublic: true,
  })

  useEffect(() => {
    if (me) {
      setForm({
        firstName: me.firstName ?? "",
        lastName: me.lastName ?? "",
        middleName: me.middleName ?? "",
        phone: me.phone ?? "",
        email: me.email ?? "",
        dateOfBirth: me.dateOfBirth ?? "",
        bloodType: me.bloodType ?? "",
        isProfilePublic: me.isProfilePublic,
      })
    }
  }, [me])

  if (isLoading) return <p className="text-muted-foreground">Загрузка…</p>
  if (!me) return <Navigate to="/login" replace />

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    updateMe.mutate({
      firstName: form.firstName,
      lastName: form.lastName || null,
      middleName: form.middleName || null,
      phone: form.phone,
      email: form.email || null,
      dateOfBirth: form.dateOfBirth || null,
      bloodType: form.bloodType || null,
      isProfilePublic: form.isProfilePublic,
    })
  }

  function handleDelete() {
    if (!confirm("Удалить аккаунт? Это действие необратимо.")) return
    deleteMe.mutate(undefined, {
      onSuccess: () => navigate("/login"),
    })
  }

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-2xl font-semibold">Профиль</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <Field label="Имя" value={form.firstName} onChange={(v) => setForm({ ...form, firstName: v })} />
        <Field label="Фамилия" value={form.lastName} onChange={(v) => setForm({ ...form, lastName: v })} />
        <Field label="Отчество" value={form.middleName} onChange={(v) => setForm({ ...form, middleName: v })} />
        <Field label="Телефон" value={form.phone} onChange={(v) => setForm({ ...form, phone: v })} />
        <Field label="Email" value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
        <Field label="Дата рождения" type="date" value={form.dateOfBirth} onChange={(v) => setForm({ ...form, dateOfBirth: v })} />
        <Field label="Группа крови" value={form.bloodType} onChange={(v) => setForm({ ...form, bloodType: v })} />

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.isProfilePublic}
            onChange={(e) => {
              setForm({ ...form, isProfilePublic: e.target.checked })
              togglePrivacy.mutate(e.target.checked)
            }}
          />
          Публичный профиль
        </label>

        <Button type="submit" disabled={updateMe.isPending}>
          Сохранить
        </Button>
        {updateMe.isError && <p className="text-sm text-destructive">Не удалось сохранить</p>}
        {updateMe.isSuccess && <p className="text-sm text-muted-foreground">Сохранено</p>}
      </form>

      <ChildrenSection />

      <div className="border-t border-border pt-4">
        <Button variant="destructive" onClick={handleDelete} disabled={deleteMe.isPending}>
          Удалить аккаунт
        </Button>
      </div>
    </div>
  )
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
}) {
  return (
    <label className="block space-y-1">
      <span className="text-sm text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
      />
    </label>
  )
}

function ChildrenSection() {
  const { data: children } = useChildren()
  const addChild = useAddChild()
  const deleteChild = useDeleteChild()
  const [fullName, setFullName] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!fullName.trim()) return
    addChild.mutate(
      { fullName: fullName.trim(), dateOfBirth: dateOfBirth || null },
      { onSuccess: () => { setFullName(""); setDateOfBirth("") } },
    )
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold">Дети</h2>
      <ul className="space-y-1">
        {children?.map((child) => (
          <li key={child.id} className="flex items-center justify-between text-sm">
            <span>
              {child.fullName}
              {child.dateOfBirth ? ` — ${child.dateOfBirth}` : ""}
            </span>
            <button
              type="button"
              onClick={() => deleteChild.mutate(child.id)}
              className="text-destructive hover:underline"
            >
              Удалить
            </button>
          </li>
        ))}
        {children?.length === 0 && <li className="text-sm text-muted-foreground">Пока нет</li>}
      </ul>
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="ФИО"
          className="flex h-9 flex-1 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
        <input
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
        />
        <Button type="submit" disabled={addChild.isPending}>
          Добавить
        </Button>
      </form>
    </div>
  )
}