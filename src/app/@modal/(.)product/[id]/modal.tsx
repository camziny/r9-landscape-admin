"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }
  }, []);

  function onDismiss() {
    router.back();
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="absolute h-screen w-screen bg-black/60 text-gray-800"
      onClose={onDismiss}
    >
      <button
        onClick={onDismiss}
        className="absolute top-3 right-3 text-gray-500 text-xl hover:text-gray-800"
      >
        &times;
      </button>
      {children}
      {/* <button onClick={onDismiss} className="close-button" /> */}
    </dialog>,
    document.getElementById("modal-root")!
  );
}
