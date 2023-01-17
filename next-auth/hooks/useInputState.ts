import { useState } from "react";

export default function useInputState<T>(inputState: T) {
  const [input, setInput] = useState<T>(inputState);

  const onChangeInputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setInput((prevState) => ({ ...prevState, [name]: value }));
  };

  return {
    input,
    setInput,
    onChangeInputHandler,
  };
}
