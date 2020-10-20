import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  return [isOpen, setIsOpen];
}

export default useModal;
