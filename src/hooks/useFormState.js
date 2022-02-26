import { useState } from 'react';

export default function useFormState (defaultValue) {
  const [stateGetter, stateSetter] = useState(defaultValue);

  const handleInput = event => {
    stateSetter(event.target.value);
  };

  return [stateGetter, stateSetter, handleInput];
}
