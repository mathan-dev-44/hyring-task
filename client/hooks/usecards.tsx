import { api } from "@/lib/axios";
import { socket } from "@/lib/socket";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const usegetCards = () => {
  return useQuery({
    queryKey: ["cards"],
    queryFn: async () => {
      const { data } = await api.get("/api/cards");

      return data;
    },
  });
};

export const useCreateCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (card: { title: string; status: string }) => {
      const { data } = await api.post("/api/cards", {
        ...card,
        socketId: socket.id,
      });

      return data;
    },
  });
};

export const useUpdateCard = () => {
  return useMutation({
    mutationFn: async ({
      id,
      card,
    }: {
      id: string;
      card: {
        title: string;
        status: string;
        position: number;
      };
    }) => {
      const { data } = await api.put(`/api/cards/${id}`, {
        title: card.title,
        status: card.status,
        position: card.position,
        socketId: socket.id,
      });

      return data;
    },
  });
};

export const useDeleteCard = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data } = await api.delete(`/api/cards/${id}`, {
        data: {
          socketId: socket.id,
        },
      });

      return data;
    },
  });
};
