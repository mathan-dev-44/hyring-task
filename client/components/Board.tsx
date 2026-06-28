"use client";

import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import Column from "./column";
import Modal from "./modal/modal";
import { CardType } from "./card";

import {
  useCreateCard,
  useDeleteCard,
  usegetCards,
  useUpdateCard,
} from "@/hooks/usecards";

import { socket } from "@/lib/socket";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSocketCards } from "@/hooks/usesocket";
import { useCardModals } from "@/hooks/usecardModal";
import CreateCardModal from "./modal/CreateCardModal";
import DeleteCardModal from "./modal/DeleteCardModal";
import EditCardModal from "./modal/EditCardModal";

const COLUMNS: CardType["status"][] = ["todo", "in_progress", "done"];
const COLUMN_LABELS: Record<CardType["status"], string> = {
  todo: "To Do",
  in_progress: "In Progress",
  done: "Done",
};

export default function Board() {
  const queryClient = useQueryClient();

  const { data: cards = [] } = usegetCards();
  const updateCard = useUpdateCard();
  const deleteCard = useDeleteCard();
  const createCard = useCreateCard();

  // const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  // const [editModal, setEditModal] = useState<boolean>(false);

  // const [deleteModal, setDeleteModal] = useState<boolean>(false);

  // const [createModal, setCreateModal] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [newTitle, setNewTitle] = useState<string>("");

  const [status, setStatus] = useState<CardType["status"]>("todo");

  const [newStatus, setNewStatus] = useState<CardType["status"]>("todo");

  useSocketCards();

  const {
    selectedCard,
    setSelectedCard,

    editModal,
    setEditModal,

    deleteModal,
    setDeleteModal,

    createModal,
    setCreateModal,
  } = useCardModals();

  // useEffect(() => {
  //   const onCreate = (card: CardType) => {
  //     queryClient.setQueryData<CardType[]>(["cards"], (old = []) => [
  //       ...old,
  //       card,
  //     ]);
  //   };

  //   const onUpdate = (updated: CardType) => {
  //     queryClient.setQueryData<CardType[]>(["cards"], (old = []) =>
  //       old.map((c) => (c.id === updated.id ? updated : c)),
  //     );
  //   };

  //   const onDelete = ({ id }: { id: string }) => {
  //     queryClient.setQueryData<CardType[]>(["cards"], (old = []) =>
  //       old.filter((c) => c.id !== id),
  //     );
  //   };

  //   socket.on("card:created", onCreate);
  //   socket.on("card:updated", onUpdate);
  //   socket.on("card:deleted", onDelete);

  //   return () => {
  //     socket.off("card:created", onCreate);
  //     socket.off("card:updated", onUpdate);
  //     socket.off("card:deleted", onDelete);
  //   };
  // }, [queryClient]);

  useEffect(() => {
    if (!selectedCard) return;

    setTitle(selectedCard.title);
    setStatus(selectedCard.status);
  }, [selectedCard]);

  const openEdit = (card: CardType) => {
    setSelectedCard(card);
    setEditModal(true);
  };

  const openDelete = (card: CardType) => {
    setSelectedCard(card);
    setDeleteModal(true);
  };

  const openCreate = (status: CardType["status"]) => {
    setNewStatus(status);
    setNewTitle("");
    setCreateModal(true);
  };

  const handleEdit = async () => {
    if (!selectedCard) return;

    try {
      await updateCard.mutateAsync({
        id: selectedCard.id,
        card: {
          title,
          status,
          position: selectedCard.position || 0,
        },
      });

      setEditModal(false);
      setSelectedCard(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    if (!selectedCard) return;

    try {
      await deleteCard.mutateAsync(selectedCard.id);

      setDeleteModal(false);
      setSelectedCard(null);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = async () => {
    if (!newTitle.trim()) return;
    try {
      await createCard.mutateAsync({
        title: newTitle,
        status: newStatus,
      });

      setCreateModal(false);
      setNewTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;

    const activeCard = cards.find((c: any) => c.id === activeId);
    if (!activeCard) return;

    const overData = over.data.current;

    const newStatus =
      overData?.status || overData?.sortable?.containerId || over.id;

    if (!newStatus) return;

    if (activeCard.status !== newStatus) {
      queryClient.setQueryData<CardType[]>(["cards"], (old = []) =>
        old.map((c) =>
          c.id === activeId
            ? { ...c, status: newStatus as CardType["status"] }
            : c,
        ),
      );

      updateCard.mutate({
        id: activeId,
        card: {
          title: activeCard.title,
          status: newStatus,
          position: 0,
        },
      });
    }
  };

  return (
    <>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <div className="grid grid-cols-3 gap-6">
          {COLUMNS.map((col) => {
            const columnCards = cards.filter((c: any) => c.status === col);

            return (
              <SortableContext
                key={col}
                items={columnCards.map((c: any) => c.id)}
                strategy={verticalListSortingStrategy}
              >
                <div key={col} className="border border-gray-200 rounded-xl">
                  <Column
                    title={COLUMN_LABELS[col]}
                    status={col}
                    cards={columnCards}
                    onEdit={openEdit}
                    onDelete={openDelete}
                    onAdd={openCreate}
                  />
                </div>
              </SortableContext>
            );
          })}
        </div>
      </DndContext>

      <EditCardModal
        open={editModal}
        title={title}
        status={status}
        setTitle={setTitle}
        setStatus={setStatus}
        onSave={handleEdit}
        onClose={() => {
          setEditModal(false);
          setSelectedCard(null);
        }}
      />

      <DeleteCardModal
        open={deleteModal}
        cardTitle={selectedCard?.title}
        onDelete={handleDelete}
        onClose={() => {
          setDeleteModal(false);
          setSelectedCard(null);
        }}
      />

      <CreateCardModal
        open={createModal}
        title={newTitle}
        status={newStatus}
        setTitle={setNewTitle}
        setStatus={setNewStatus}
        onCreate={handleCreate}
        onClose={() => {
          setCreateModal(false);
          setNewTitle("");
        }}
      />

      {/* Edit Modal */}
      {/* 
      <Modal
        open={editModal}
        title="Edit Card"
        onClose={() => {
          setEditModal(false);
          setSelectedCard(null);
        }}
        footer={
          <>
            <button
              onClick={() => setEditModal(false)}
              className="rounded border cursor-pointer px-4 py-2 text-zinc-600"
            >
              Cancel
            </button>

            <button
              onClick={handleEdit}
              className="rounded cursor-pointer bg-green-600 px-4 py-2 text-white"
            >
              Save
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded border p-3 text-zinc-800 outline-none focus:outline-none p-3 text-zinc-800"
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as CardType["status"])}
            className="w-full rounded cursor-pointer border p-3 text-zinc-800 outline-none"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </Modal> */}

      {/* Delete Modal */}

      {/* <Modal
        open={deleteModal}
        title="Delete Card"
        onClose={() => {
          setDeleteModal(false);
          setSelectedCard(null);
        }}
        footer={
          <>
            <button
              onClick={() => setDeleteModal(false)}
              className="rounded border cursor-pointer px-4 py-2"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              className="rounded cursor-pointer bg-red-600 px-4 py-2 text-white"
            >
              Delete
            </button>
          </>
        }
      >
        <p>Delete "{selectedCard?.title}" ?</p>
      </Modal> */}
      {/* 
      <Modal
        open={createModal}
        title="Create Card"
        onClose={() => {
          setCreateModal(false);
          setNewTitle("");
        }}
        footer={
          <>
            <button
              onClick={() => setCreateModal(false)}
              className="rounded cursor-pointer border px-4 py-2 text-zinc-600"
            >
              Cancel
            </button>

            <button
              onClick={handleCreate}
              className="rounded bg-green-600 cursor-pointer px-4 py-2 text-white"
            >
              Create
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <input
            placeholder="Card title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full rounded border    p-3 text-zinc-800"
          />

          <select
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value as CardType["status"])}
            className="w-full rounded cursor-pointer border p-3 text-zinc-800"
          >
            <option value="todo">To Do</option>
            <option value="in_progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </Modal> */}
    </>
  );
}
