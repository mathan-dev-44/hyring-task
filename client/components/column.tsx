import Card, { CardType } from "./card";
import { AddCard } from "./AddCard";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  title: string;
  cards: Record<any, any>;
  onEdit: (v: any) => void;
  onDelete: (v: any) => void;
  onAdd: (v: any) => void;
  status: CardType["status"];
}

export default function Column({
  title,
  status,
  cards,
  onEdit,
  onDelete,
  onAdd,
}: Props) {
  const { setNodeRef } = useDroppable({
    id: status,
  });
  return (
    <div className="bg-[#fdf9f9] p-4 rounded-xl h-[70vh] flex flex-col">
      <div className="flex items-center justify-between gap-2 w-full mb-3">
        <div className="flex items-center gap-2 px-2">
          <div
            className={`h-2 w-2 rounded-full ${
              title === "To Do"
                ? "bg-gray-300"
                : title === "In Progress"
                  ? "bg-orange-500"
                  : "bg-green-400"
            }`}
          />
          <div className="font-bold text-zinc-800">{title}</div>
        </div>
        <div className="flex items-center gap-2  text-sm text-gray-300 rounded-md bg-gray-100 px-2 py-1">
          {cards.length}
        </div>
      </div>

      <div
        ref={setNodeRef}
        className="space-y-3 flex-1 overflow-y-auto pr-2
             scrollbar-none "
      >
        {cards.map((card: any) => (
          <Card key={card.id} card={card} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </div>
      <AddCard onClick={() => onAdd(status)} />
    </div>
  );
}
