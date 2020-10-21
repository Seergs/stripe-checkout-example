import { useState } from "react";

function useModal() {
  const [openModal, setOpenModal] = useState(null);
  const [data, setData] = useState(null);

  return { openModal, setOpenModal, data, setData };
}

export default useModal;
