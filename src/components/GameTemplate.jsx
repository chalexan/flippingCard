import { nanoid } from "nanoid";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as col from "./colorsSet";

const CardTemplate = () => {
  const dispatch = useDispatch();
  const { gameBoard } = useSelector((state) => state);
  let clickCounter = 0;
  let colorCards = [];

  useEffect(() => {
    generateTable();
  }, []);

  const generateTable = () => {
    const table = [];
    col.colors.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 16; i += 1) {
      table.push({ id: nanoid(), color: col.colors[i] });
    }
    dispatch({ type: "SETGAMEBOARD", payload: table });
  };

  const handleClick = (event) => {
    clickCounter += 1;
    if (clickCounter <= 2) {
      event.target.style = `background-color:${event.target.dataset.color};`;
      colorCards.push({
        color: event.target.dataset.color,
        id: event.target.dataset.id,
      });
      if (clickCounter === 2) {
        if (colorCards[0].color === colorCards[1].color) {
          if (colorCards[0].id !== colorCards[1].id) {
            dispatch({ type: "DELETECELLS", payload: colorCards });
          }
        }
        const cards = document.querySelectorAll(".card");
        setTimeout(() => {
          cards.forEach((el) => {
            el.style = `background-color:white;`;
          });
        }, 300);

        colorCards = [];
        clickCounter = 0;
      }
    }
  };

  return (
    <div className="container">
      {gameBoard &&
        gameBoard.map((el) => (
          <div
            className="card"
            key={el.id}
            data-id={el.id}
            data-color={el.color}
            onClick={handleClick}
          >
            {" "}
          </div>
        ))}
    </div>
  );
};

export default CardTemplate;
