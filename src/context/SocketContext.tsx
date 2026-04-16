"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import toast from "react-hot-toast";
import { useLanguage } from "./LanguageContext";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

import { getApiUrl } from "@/lib/api";

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    const socketUrl = getApiUrl();
    const socketInstance = io(socketUrl, {
      transports: ["websocket"],
      reconnectionAttempts: 5,
    });

    socketInstance.on("connect", () => {
      // console.log("Connected to SocketIO server");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      // console.log("Disconnected from SocketIO server");
      setIsConnected(false);
    });

    socketInstance.on("new_article", (data: any) => {
      const title = language === "bn" ? "🔴 নতুন সংবাদ আপডেট" : "🔴 New News Update";
      toast(
        (t) => (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-blood">{title}</span>
            <span className="text-xs">{data.title}</span>
            <span className="text-[0.6rem] text-text-faint uppercase">{data.district} · {data.source_name}</span>
          </div>
        ),
        { icon: "📡" }
      );
    });

    socketInstance.on("status_change", (data: any) => {
      const title = language === "bn" ? "⚖️ মামলার স্ট্যাটাস পরিবর্তন" : "⚖️ Case Status Change";
      toast(
        (t) => (
          <div className="flex flex-col gap-1">
            <span className="font-bold text-teal">{title}</span>
            <span className="text-xs">{data.title}</span>
            <span className="text-[0.65rem]">
              {data.old_status} → <span className="text-teal font-bold">{data.new_status}</span>
            </span>
          </div>
        ),
        { icon: "⚖️" }
      );
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [language]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
