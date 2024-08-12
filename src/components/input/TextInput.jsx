import React from 'react';

const TextInput = ({ value, onChange, placeholder, type = 'text', name }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name}
        className='form-control'
      />
    </div>
  );
};

export default TextInput;
