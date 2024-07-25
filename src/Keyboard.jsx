import { Button } from "./Button";
import modules from "./styles/keyboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import { useState } from "react";

const numbers = [];

export const Keyboard = () => {
  library.add(faAngleLeft);

  const [screen, setScreen] = useState("");
  const [pressed, setPressed] = useState(false);
  const [currentNumber, setCurrentNumber] = useState("");

  const clicked = (e) => {
    setScreen(screen + e.target.innerHTML);
    setCurrentNumber(currentNumber + e.target.innerHTML);
  };

  const clear = () => {
    setScreen("");
    setPressed(false);
    setCurrentNumber("");
  };

  const backspace = () => {
    if (screen.slice(-1) === ".") setPressed(false);
    setScreen(screen.slice(0, -1));
    setCurrentNumber(currentNumber.slice(0, -1));
  };

  const dot = () => {
    if (!pressed) setScreen(screen + ".");
    setPressed(true);
  };

  const action = (e) => {
    setScreen(screen + e.target.innerHTML);
    numbers.push({
      number: parseFloat(currentNumber),
      action: e.target.innerHTML,
    });
    setCurrentNumber("");
  };

  const equal = () => {
    numbers.push({ number: parseFloat(currentNumber), action: "=" });
    const { number, _ } = numbers.reduce((acc, current) => {
      if (acc.action === "%")
        return { number: acc.number % current.number, action: current.action };
      if (acc.action === "/")
        return { number: acc.number / current.number, action: current.action };
      if (acc.action === "*")
        return { number: acc.number * current.number, action: current.action };
      if (acc.action === "+")
        return { number: acc.number + current.number, action: current.action };
      if (acc.action === "-")
        return { number: acc.number - current.number, action: current.action };
    });
    setScreen(number);
    numbers.length = 0;
    setCurrentNumber(number);
  };

  const buttons = [
    { text: "AC", function: clear },
    {
      text: <FontAwesomeIcon icon="fa-solid fa-angle-left" />,
      function: backspace,
    },
    { text: "%", function: action },
    { text: "/", function: action },
    { text: "7", function: clicked },
    { text: "8", function: clicked },
    { text: "9", function: clicked },
    { text: "*", function: action },
    { text: "4", function: clicked },
    { text: "5", function: clicked },
    { text: "6", function: clicked },
    { text: "-", function: action },
    { text: "1", function: clicked },
    { text: "2", function: clicked },
    { text: "3", function: clicked },
    { text: "+", function: action },
    { text: "0", function: clicked, double: true },
    { text: ".", function: dot },
    { text: "=", function: equal },
  ];

  return (
    <div className={modules.wrapper}>
      <div className={modules.screen}>
        <h1>{screen}</h1>
      </div>
      {buttons.map((button) => (
        <Button
          text={button.text}
          clicked={button.function}
          key={button.text}
		  double={button.double}
        />
      ))}
    </div>
  );
};
