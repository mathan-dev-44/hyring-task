"use client";

import { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  title?: string;
  children: ReactNode;
  onClose: () => void;
  footer?: ReactNode;
}

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: ModalProps) {
  if (!open) return null;

  return (
    <div
      className="
        fixed inset-0 z-50
        flex items-center justify-center
        bg-black/50 backdrop-blur-sm
        p-4
        animate-in fade-in duration-200
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full max-w-lg
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          border border-gray-200
          animate-in zoom-in-95 duration-200
        "
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-5">
          <h2 className="text-xl font-semibold text-zinc-900">{title}</h2>

          <button
            onClick={onClose}
            className="
              rounded-full
              p-2
              text-zinc-500
              cursor-pointer
              transition
              hover:bg-gray-100
              hover:text-zinc-900
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 text-zinc-700">{children}</div>

        {/* Footer */}
        {footer && (
          <div className="flex justify-end gap-3  border-t bg-gray-50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
