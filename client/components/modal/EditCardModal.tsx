import { CardType } from "../card";
import CardForm from "../cardForm";
import Modal from "./modal";

interface Props {
  open: boolean;
  title: string;
  status: CardType["status"];
  setTitle: (v: string) => void;
  setStatus: (v: CardType["status"]) => void;
  onSave: () => void;
  onClose: () => void;
}

export default function EditCardModal(props: Props) {
  return (
    <Modal
      open={props.open}
      title="Edit Card"
      onClose={props.onClose}
      footer={
        <>
          <button
            onClick={props.onClose}
            className="border rounded text-gray-500 bg-zinc-100 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={props.onSave}
            className="bg-green-600 text-white rounded px-4 py-2"
          >
            Save
          </button>
        </>
      }
    >
      <CardForm
        title={props.title}
        status={props.status}
        setTitle={props.setTitle}
        setStatus={props.setStatus}
      />
    </Modal>
  );
}
