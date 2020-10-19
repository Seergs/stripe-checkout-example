import { useState } from "react";

function useFormValues(initialValues) {
  const [values, setValues] = useState(initialValues);

  function handleChange(e) {
    const {
      target: { name, value },
    } = e;
    e.persist();

    setValues({ ...values, [name]: value });
  }

  return { values, handleChange };
}

export default useFormValues;
