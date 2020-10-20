import { useState } from "react";

function useModal(initial) {
  const [isOpen, setIsOpen] = useState(initial);

  return [isOpen, setIsOpen];
}

export default useModal;
