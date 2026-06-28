"use client";

import Board from "@/components/Board";
import { useOnlineUsers, useSocket } from "@/hooks/usesocket";
import { Users } from "lucide-react";

export default function Home() {
  const status = useSocket();
  const users = useOnlineUsers();
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-6">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="flex items-center justify-between border-b px-6 py-4">
          <h1 className="text-2xl font-bold text-zinc-900">Hyring Task</h1>
          <div className="flex items-center gap-2 ">
            <div className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2">
              <div
                className={`h-2 w-2 rounded-full ${
                  status === "connected" ? "bg-green-500" : "bg-red-500"
                }`}
              />

              <span
                className={`text-sm font-medium ${
                  status === "connected" ? "text-green-700" : "text-red-700"
                }`}
              >
                {status === "connected" ? "Connected" : "Disconnected"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={18} color="#3830df" />
              <span className="text-sm text-zinc-700">
                {users.length} online
              </span>
            </div>
          </div>
        </header>

        <div className="p-6 bg-[#fdf9f9]">
          <Board />
        </div>
      </div>
    </main>
  );
}
