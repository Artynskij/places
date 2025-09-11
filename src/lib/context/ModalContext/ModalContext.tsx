"use client";
import { ModalCustom } from "@/components/UI/ModalCustom/ModalCustom";
import React, { createContext, useContext, useState, ReactNode } from "react";
import { createPortal } from "react-dom";


type ModalContent = {
  id: string;
  node: ReactNode;
  props?: {
    title?: string;
    view?: "over" | "small" | "middle" | "big" | "fit";
    zIndex?: number;
  };
};

interface ModalContextValue {
  openModal: (
    node: ReactNode,
    props?: ModalContent["props"]
  ) => { close: () => void; id: string };
  closeModal: (id: string) => void;
  closeAll: () => void;
}

const ModalContext = createContext<ModalContextValue | null>(null);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalContent[]>([]);

  const openModal: ModalContextValue["openModal"] = (node, props) => {
    const id = Math.random().toString(36).substring(2, 9);
    setModals((prev) => [...prev, { id, node, props }]);

    return {
      id,
      close: () => closeModal(id),
    };
  };

  const closeModal = (id: string) => {
    setModals((prev) => prev.filter((m) => m.id !== id));
  };

  const closeAll = () => setModals([]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal, closeAll }}>
      {children}

      {typeof window !== "undefined" &&
        createPortal(
          <>
            {modals.map((m, i) => (
              <ModalCustom
                key={m.id}
                active={true}
                closeModal={() => closeModal(m.id)}
                title={m.props?.title}
                view={m.props?.view}
                zIndex={1000 + i * 10}
              >
                {m.node}
              </ModalCustom>
            ))}
          </>,
          document.body
        )}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used inside ModalProvider");
  return ctx;
};
