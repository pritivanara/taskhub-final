"use client"

import Link from "next/link"
import {
  CheckSquare,
  Sparkles,
  ShieldCheck
} from "lucide-react"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
export default function DashboardPage() {
  const [role, setRole] = useState("")

  useEffect(() => {

      getRole()

    }, [])

    const getRole = async () => {

      const {
        data: { user }
      } = await supabase.auth.getUser()

      if (!user) return

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("email", user.email)
        .single()

      if (data) {
        setRole(data.role)
      }
    }
  return (

    <div>

      <h1 className="text-5xl font-bold mb-4">
        Welcome to TaskHub AI
      </h1>
      <p className="text-purple-400 mb-10">
        Logged in as: {role}
      </p>
      <p className="text-gray-400 mb-10">
        Manage AI product photography workflows efficiently.
      </p>

      <div className="grid grid-cols-3 gap-6">
        {
          role === "admin" && (

            <div
              className="bg-gray-900 border border-red-500 p-8 rounded-2xl"
            >

              <h2 className="text-2xl font-bold mb-2 text-red-400">
                Admin Panel
              </h2>

              <p className="text-gray-400">
                Manage users, review AI generations and monitor system activity.
              </p>

            </div>
          )
        }

        <Link
          href="/dashboard/tasks"
          className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-8 rounded-2xl hover:border-green-500 transition hover:scale-105 hover:border-purple-500"
        >

          <CheckSquare
            size={40}
            className="mb-4 text-green-400"
          />

          <h2 className="text-2xl font-bold mb-2">
            Tasks
          </h2>

          <p className="text-gray-400">
            Manage and organize your AI generation tasks.
          </p>

        </Link>

        <Link
          href="/dashboard/studio"
          className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-8 rounded-2xl hover:border-pink-500 transition hover:scale-105 hover:border-purple-500"
        >

          <Sparkles
            size={40}
            className="mb-4 text-pink-400"
          />

          <h2 className="text-2xl font-bold mb-2">
            AI Studio
          </h2>

          <p className="text-gray-400">
            Generate professional AI product photography.
          </p>

        </Link>

        <div
          className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-xl p-8 rounded-2xl"
        >

          <ShieldCheck
            size={40}
            className="mb-4 text-purple-400"
          />

          <h2 className="text-2xl font-bold mb-2">
            Secure Auth
          </h2>

          <p className="text-gray-400">
            Protected authentication powered by Supabase.
          </p>

        </div>

      </div>

    </div>
  )
}