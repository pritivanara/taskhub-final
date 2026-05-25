"use client"

import Link from "next/link"

import {
  LayoutDashboard,
  Sparkles,
  LogOut,
  CheckSquare,
  ShieldCheck
} from "lucide-react"

import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const router = useRouter()

  const logout = async () => {

    await supabase.auth.signOut()

    router.push("/login")
  }

  return (

    <div className="min-h-screen flex bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white">

      <aside className="w-72 bg-white/5 backdrop-blur-xl border-r border-white/10 p-8 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-bold mb-12 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            TaskHub AI
          </h1>

          <nav className="flex flex-col gap-4">

            <Link
              href="/dashboard"
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition"
            >
              <LayoutDashboard size={22} />
              Dashboard
            </Link>

            <Link
              href="/dashboard/tasks"
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition"
            >
              <CheckSquare size={22} />
              Tasks
            </Link>

            <Link
              href="/dashboard/studio"
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition"
            >
              <Sparkles size={22} />
              AI Studio
            </Link>

            <Link
              href="/dashboard/admin"
              className="flex items-center gap-3 p-4 rounded-xl hover:bg-white/10 transition"
            >
              <ShieldCheck size={22} />
              Admin
            </Link>

          </nav>

        </div>

        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition p-4 rounded-xl"
        >
          <LogOut size={20} />
          Logout
        </button>

      </aside>

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  )
}