import { useState } from "react";

export default function useFileHandler() {
  const [fileValue, setFileValue] = useState({});
  const [imageDataURl, setImageDataURl] = useState("");

  function handleFileChange(e) {
    const reader = new FileReader();
    const currentFile = e.target.files[0];

    reader.onload = () => {
      setImageDataURl(reader.result);
      setFileValue(currentFile);
    };

    reader.readAsDataURL(currentFile);
  }

  function clear() {
    setFileValue({});
    setImageDataURl("");
  }

  return {
    fileValue,
    imageDataURl,
    handleFileChange,
    clear
  };
}
