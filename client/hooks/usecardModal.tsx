"use client";

import { useState } from "react";
import { CardType } from "@/components/card";

export const useCardModals = () => {
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [createModal, setCreateModal] = useState(false);

  return {
    selectedCard,
    setSelectedCard,
    editModal,
    setEditModal,
    deleteModal,
    setDeleteModal,
    createModal,
    setCreateModal,
  };
};
