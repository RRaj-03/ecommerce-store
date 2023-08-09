"use client";

import React, { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import IconButton from "./iconButton";
import { X } from "lucide-react";
const Modal = ({
  open,
  onClose,
  children,
}: {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) => {
  return (
    <Transition show={open} appear as={Fragment}>
      <Dialog as="div" onClose={onClose} className={"z-10 relative"}>
        <div className="fixed inset-0 bg-black bg-opacity-50" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full text-center items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-300"
              leaveFrom="scale-100 opacity-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={
                  "w-full max-w-3xl overflow-hidden rounded-md text-left align-middle"
                }
              >
                <div className="relative flex items-center w-full bg-white overflow-hidden px-4 pt-14 pb-8 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8 ">
                  <div className="absolute right-4 top-4">
                    <IconButton icon={<X size={15} />} onClick={onClose} />
                  </div>
                  {children}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
