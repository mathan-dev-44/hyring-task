import { useDraggable } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { EditIcon, TableOfContents, Trash } from "lucide-react";

export interface CardType {
  id: string;
  title: string;
  status: "todo" | "in_progress" | "done";
  position?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface Props {
  card: CardType;
  onEdit: (card: CardType) => void;
  onDelete: (card: CardType) => void;
}

export default function Card({ card, onEdit, onDelete }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { status: card.status },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="bg-white flex items-center justify-between p-4 rounded-xl border shadow-sm"
    >
      <h2 className="font-medium text-sm text-zinc-800">{card.title}</h2>

      <div className="flex items-center gap-3">
        <div {...listeners} className="cursor-grab active:cursor-grabbing px-2">
          <TableOfContents size={18} color="#C5C6C7" />
        </div>

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onEdit(card)}
        >
          <EditIcon size={18} color="#DA70D6" />
        </button>

        <button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => onDelete(card)}
        >
          <Trash size={18} color="#FF0000" />
        </button>
      </div>
    </div>
  );
}
