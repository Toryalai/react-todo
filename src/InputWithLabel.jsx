import React, { useRef, useEffect } from 'react';

function InputWithLabel({ id, value, onChange, children }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  });

  return (
    <>
      <label htmlFor={id}>{children}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
}

export default InputWithLabel;
