import { useState, useCallback } from "react";
import "./index.css";

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSymbolAllowed, setIsSymbolAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-+";
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let chars = letters;
    if (isNumberAllowed) {
      chars += numbers;
    }
    if (isSymbolAllowed) {
      chars += symbols;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }

    setPassword(newPassword);
  }, [length, isNumberAllowed, isSymbolAllowed, setPassword]);

  const copyVisualFeedback = useCallback(() => {
    if (password) {
      const copyButton = document.querySelector("button");
      const passwordContainer = document.getElementById("password-container");
      passwordContainer.classList.add("bg-green-500");
      setTimeout(() => {
        passwordContainer.classList.remove("bg-green-500");
      }, 1000);
      copyButton.textContent = "Copied!";
      setTimeout(() => {
        copyButton.textContent = "Copy";
      }, 1000);
    } else {
      alert("No password to copy!");
    }
  }, [password]);

  return (
    <>
      <div className="w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-center text-white text-lg my-3">
          Password Generator
        </h1>
        <div
          className="flex shadow rounded-lg overflow-hidden mb-4 bg-amber-50"
          id="password-container"
        >
          <input
            type="text"
            value={password}
            readOnly
            placeholder="Your Password"
            className="outline-none w-full py-1 px-3"
          ></input>
          <button
            className="bg-blue-500 hover:bg-blue-800 text-white py-1 px-3 cursor-pointer"
            onClick={() => {
              navigator.clipboard.writeText(password);
              copyVisualFeedback();
            }}
          >
            Copy
          </button>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <input
              type="range"
              min="8"
              max="50"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="cursor-pointer"
            ></input>
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="include-numbers"
              type="checkbox"
              defaultChecked={isNumberAllowed}
              className="cursor-pointer"
              onChange={() => setIsNumberAllowed((prev) => !prev)}
            ></input>
            <label
              className="cursor-pointer text-sm "
              htmlFor="include-numbers"
            >
              Include Numbers
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="include-symbols"
              type="checkbox"
              defaultChecked={isSymbolAllowed}
              className="cursor-pointer"
              onChange={() => setIsSymbolAllowed((prev) => !prev)}
            ></input>
            <label className="cursor-pointer text-sm" htmlFor="include-symbols">
              Include Symbols
            </label>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-800 text-white py-1 px-3 cursor-pointer rounded-2xl"
            onClick={passwordGenerator}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
