"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  open,
  onClose,
  titleId,
  closeLabel,
  children,
  wide = false,
  contentKey,
}: {
  open: boolean;
  onClose: () => void;
  titleId: string;
  closeLabel: string;
  children: ReactNode;
  wide?: boolean;
  contentKey?: string | null;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const trigger =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      trigger?.focus({ preventScroll: true });
    };
  }, [open]);
  useEffect(() => {
    if (open) ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [open, contentKey]);
  return (
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      className={`aru-dialog ${wide ? "aru-dialog-wide" : ""}`}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const elements = Array.from(
          event.currentTarget.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]',
          ),
        ).filter((element) => element.getClientRects().length > 0);
        const first = elements[0];
        const last = elements[elements.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative p-6 sm:p-10">
        <button
          type="button"
          onClick={onClose}
          autoFocus
          aria-label={closeLabel}
          className="icon-button absolute right-3 top-3"
        >
          <X size={22} />
        </button>
        {children}
      </div>
    </dialog>
  );
}
