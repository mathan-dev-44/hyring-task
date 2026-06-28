import { Plus } from "lucide-react";

interface Props {
  onClick: () => void;
}

export const AddCard = ({ onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className="
        w-full
        rounded-xl
        border-2
        mt-4
        border-dashed
        border-gray-300
        bg-white
        p-4
        transition
        hover:border-gray-400
        hover:bg-gray-50
      "
    >
      <div className="flex items-center justify-center gap-2 text-zinc-600">
        <Plus size={16} />
        <span className="font-medium text-sm">Add Card</span>
      </div>
    </button>
  );
};
