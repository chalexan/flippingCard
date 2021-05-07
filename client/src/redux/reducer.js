import * as action from "./actionTypes";

const initState = {
  gameBoard: [],
};

export default function reducer(state = initState, { type, payload }) {
  switch (type) {
    case action.SETGAMEBOARD:
      return { ...state, gameBoard: payload };
    case action.DELETECELLS:
      const newBoard = state.gameBoard
        .filter((item) => payload[0].id !== item.id)
        .filter((item) => payload[1].id !== item.id);
      return { ...state, gameBoard: newBoard };
    default:
      return state;
  }
}
