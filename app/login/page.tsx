"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function LoginPage() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signUp = async () => {

    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Signup Successful")
    }
  }

  const login = async () => {

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Login Successful")
    }
  }
  const loginWithGoogle = async () => {

    await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "http://localhost:3000/dashboard"
        }
      })
    }

  const loginWithGithub = async () => {

      await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: "http://localhost:3000/dashboard"
        }
      })
    }

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-950 to-purple-950 text-white">

      <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-10 shadow-2xl">

        <h1 className="text-5xl font-bold mb-3 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
          TaskHub AI
        </h1>

        <p className="text-center text-gray-400 mb-10">
          AI Powered Workflow Platform
        </p>

        <div className="flex flex-col gap-4">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-white/10 bg-black/40 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-purple-500 transition"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-white/10 bg-black/40 text-white placeholder-gray-400 p-4 rounded-xl outline-none focus:border-purple-500 transition"
          />

          <button
            onClick={signUp}
            className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Sign Up
          </button>

          <button
            onClick={login}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Login
          </button>

          <button
            onClick={loginWithGoogle}
            className="bg-white text-black p-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Continue with Google
          </button>

          <button
            onClick={loginWithGithub}
            className="bg-gray-900 border border-white/10 p-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Continue with GitHub
          </button>

        </div>

      </div>
    </div>
  )
}