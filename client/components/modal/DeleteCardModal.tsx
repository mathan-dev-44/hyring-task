import Modal from "./modal";

interface Props {
  open: boolean;
  cardTitle?: string;
  onDelete: () => void;
  onClose: () => void;
}

export default function DeleteCardModal({
  open,
  cardTitle,
  onDelete,
  onClose,
}: Props) {
  return (
    <Modal
      open={open}
      title="Delete Card"
      onClose={onClose}
      footer={
        <>
          <button
            onClick={onClose}
            className="border rounded text-gray-500 bg-zinc-100 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onDelete}
            className="bg-red-600 text-white rounded px-4 py-2"
          >
            Delete
          </button>
        </>
      }
    >
      <p>Delete "{cardTitle}" ?</p>
    </Modal>
  );
}
