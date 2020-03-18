import update from "immutability-helper";

export function getNextGameReducer(
  state = { loadginMessage: "", list: [] },
  action
) {
  if (action.type === "NEXT_GAME") {
    // If state is empty (on page load):
    if (state.list.length === 0) {
      return [
        ...state,
        {
          list: {
            $push: [
              {
                id: action.payload.id,
                timeLeft: action.payload.fakeStartDelta,
                result: null
              }
            ]
          }
        }
      ];
    }
    // If first API call has already been made and state has some data:
    else {
      // And if new API call returns same id as previous (means we're still counting):
      if (
        action.actionState.list[action.actionState.list.length - 1].id ===
        action.payload.id
      ) {
        // Replacing last object in state with info from new API call:
        if (action.payload.fakeStartDelta <= 0) {
          return update(state, {
            list: {
              $splice: [
                [
                  -1,
                  1,
                  {
                    id: action.payload.id,
                    timeLeft: action.payload.fakeStartDelta,
                    loadingMessage: "Loading...",
                    result: null
                  }
                ]
              ]
            }
          });
        } else
          return update(state, {
            list: {
              $splice: [
                [
                  -1,
                  1,
                  {
                    id: action.payload.id,
                    timeLeft: action.payload.fakeStartDelta,
                    result: null
                  }
                ]
              ]
            }
          });
      }
      // If new API call returns info about new game:
      // else return state;
      return [
        ...state,
        {
          id: action.payload.id,
          timeLeft: action.payload.fakeStartDelta,
          result: action.payload.result
        }
      ];
    }
  }

  // else if (action.type === "GET_RESULT") {
  //   return [
  //     ...state,
  //     {
  //       id: action.payload.id,
  //       timeLeft: "time from GET_RESULT in reducer",
  //       result: action.payload.result
  //     }
  //   ];
  // }
  else return state;
}
