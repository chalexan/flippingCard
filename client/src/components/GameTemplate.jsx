import { nanoid } from 'nanoid';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const CardTemplate = () => {
const dispatch = useDispatch();
const { gameBoard } = useSelector((state) => state);
let clickCounter = 0;
let colors = [];

useEffect(()=> {
 generateTable();
},[]);

const generateTable = () => {
 const table = [];
 let counter = 0;
 const colors = ['yellow', 'yellow', 'black', 'black', 'green', 'green', 'blue', 'blue', 'red', 'red', 'orange', 'orange', 'violet', 'violet', 'teal', 'teal'];
 colors.sort(() => Math.random() - 0.5);

 for (let i = 0; i < 16; i += 1) {
   table.push({ id: nanoid(), color: colors[counter], visible: true});
   counter += 1;
     }  
 dispatch({type: 'SETGAMEBOARD', payload: table})
}

const handleClick = (event) => {
clickCounter += 1;
if (clickCounter <=2) {
  event.target.style = `background-color:${event.target.dataset.color};`;
  colors.push({color: event.target.dataset.color, id: event.target.dataset.id});
if (clickCounter === 2) {
  if (colors[0].color === colors[1].color) {
    dispatch({type: 'DELETECELLS', payload: colors});
  }
  const cards = document.querySelectorAll('.card');
  setTimeout(function(){ cards.forEach((el) => {
    el.style = `background-color:white;` }); }, 300);
  
  colors = [];
  clickCounter = 0;
}   
}
}

    return (  
    <div className="container">
      {gameBoard && gameBoard.map((el) => 
        <div className="card" data-id={el.id} data-color={el.color} onClick={handleClick}> </div>
      )}
    </div>
    );
}
 
export default CardTemplate;