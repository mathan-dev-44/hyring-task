interface Props {
  title: string;
  status: string;
  setTitle: (v: string) => void;
  setStatus: (v: any) => void;
}

export default function CardForm({
  title,
  status,
  setTitle,
  setStatus,
}: Props) {
  return (
    <div className="space-y-4">
      <input
        placeholder={title ? title : "Enter card Title.."}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="  w-full
            rounded-xl
            border
            border-zinc-300
            bg-zinc-50
            px-4
            py-3
            text-zinc-800
            placeholder:text-zinc-400
            outline-none
            transition
           
            "
      />

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className=" w-full
            rounded-xl
            border
            border-zinc-300
            bg-zinc-50
            px-4
            py-3
            text-zinc-800
            outline-none
            transition
         cursor-pointer"
      >
        <option value="todo">To Do</option>
        <option value="in_progress">In Progress</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
}
