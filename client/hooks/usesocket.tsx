"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import { useQueryClient } from "@tanstack/react-query";
import { CardType } from "@/components/card";

export const useSocket = () => {
  const [status, setStatus] = useState(
    socket.connected ? "connected" : "disconnected",
  );

  useEffect(() => {
    if (!socket.connected) socket.connect();

    const onConnect = () => setStatus("connected");
    const onDisconnect = () => setStatus("disconnected");
    const onReconnectAttempt = () => setStatus("reconnecting");
    const onReconnect = () => setStatus("connected");

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("reconnect_attempt", onReconnectAttempt);
    socket.on("reconnect", onReconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("reconnect_attempt", onReconnectAttempt);
      socket.off("reconnect", onReconnect);
    };
  }, []);

  return status;
};
export const useOnlineUsers = () => {
  const [users, setUsers] = useState<string[]>([]);

  useEffect(() => {
    socket.on("users:online", setUsers);

    return () => {
      socket.off("users:online", setUsers);
    };
  }, []);

  return users;
};

export const useSocketCards = () => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const onCreate = (card: CardType) => {
      queryClient.setQueryData<CardType[]>(["cards"], (old = []) => [
        ...old,
        card,
      ]);
    };

    const onUpdate = (updated: CardType) => {
      queryClient.setQueryData<CardType[]>(["cards"], (old = []) =>
        old.map((c) => (c.id === updated.id ? updated : c)),
      );
    };

    const onDelete = ({ id }: { id: string }) => {
      queryClient.setQueryData<CardType[]>(["cards"], (old = []) =>
        old.filter((c) => c.id !== id),
      );
    };

    socket.on("card:created", onCreate);
    socket.on("card:updated", onUpdate);
    socket.on("card:deleted", onDelete);

    return () => {
      socket.off("card:created", onCreate);
      socket.off("card:updated", onUpdate);
      socket.off("card:deleted", onDelete);
    };
  }, [queryClient]);
};
