import { useState } from "react";
import "./App.css";

function App() {
  const [outputString, setOutputString] = useState("");

  const handleClick = (letter) => {
    setOutputString((prevString) => {
      const newString = prevString + letter;
      const lastThree = newString.slice(-3);
      const repeatedCount = lastThree
        .split("")
        .reduce((acc, char) => (char === lastThree[0] ? acc + 1 : 1), 0);

      if (repeatedCount >= 3) {
        return (
          newString.slice(0, -repeatedCount) +
          (repeatedCount > 3 ? "_".repeat(repeatedCount - 3) : "_")
        );
      }

      return newString;
    });
  };

  const tiles = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <div>
      <h1>
        Output String: <span>{outputString}</span>
      </h1>
      <div>
        {tiles.map((letter) => (
          <button key={letter} onClick={() => handleClick(letter)}>
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
