"use client";

import { useState } from "react";
import { X, Lock, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { safeFetch } from "@/lib/api";

export default function AuthModal({ onClose }: { onClose: () => void }) {
  const { t } = useLanguage();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("journalist");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const result = await safeFetch(`/api/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      if (mode === "login" && result.access_token) {
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt_token", result.access_token);
          localStorage.setItem("user_role", result.role);
        }
        setMessage("Login successful!");
        setTimeout(onClose, 1000);
      } else {
        setMessage("Success! Now log in.");
        setMode("login");
      }
    } catch (error) {
      setMessage("Error: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-bg/95 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-surface border border-border w-full max-w-md p-8">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-text-faint hover:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-white mb-2">
            {mode === "login" ? "Login" : "Register"}
          </h2>
        </div>

        {message && (
          <div className={`mb-6 p-3 border ${message.includes("Error") ? "border-blood text-blood" : "border-green-500 text-green-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" size={16} />
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-bg border border-border p-3 pl-10 text-text text-sm focus:border-blood outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" size={16} />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bg border border-border p-3 pl-10 text-text text-sm focus:border-blood outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          {mode === "register" && (
            <div className="space-y-2">
              <label className="text-[0.7rem] font-mono text-text-faint uppercase tracking-widest block">Role</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-bg border border-border p-3 text-text text-sm focus:border-blood outline-none"
                disabled={loading}
              >
                <option value="journalist">Journalist</option>
                <option value="verifier">Verifier</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blood text-white font-mono text-[0.8rem] font-bold uppercase tracking-[0.3em] py-5 hover:bg-blood/90 transition-all disabled:opacity-50"
          >
            {loading ? "Loading..." : mode === "login" ? "Login" : "Register"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-text-dim hover:text-text text-sm underline"
          >
            {mode === "login" ? "Don't have an account? Register" : "Already have an account? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}