import axios from "axios";
import { nextGameAction, getResultAction } from "./actions";

export function nextGameApiAction() {
  return (dispatch, getState) => {
    (async () => {
      try {
        const response = await axios.get(
          "http://dev-games-backend.advbet.com/v1/ab-roulette/1/nextGame"
        );
        // console.log(response);
        dispatch(nextGameAction(response.data, getState()));
        return response.data;
      } catch (error) {
        console.error(error);
      }
    })();
  };
}

export function getResultApiAction() {
  return (dispatch, getState) => {
    let gameID = getState().list[getState().list.length - 1].id;
    console.log("IDDDD: " + gameID);
    (async () => {
      try {
        const response = await axios.get(
          `https://dev-games-backend.advbet.com/v1/ab-roulette/1/game/${gameID}`
        );
        dispatch(getResultAction(response, getState()));
        return response;
      } catch (error) {
        console.error(error);
      }
    })();
  };
}

// export default nextGameApiAction;
