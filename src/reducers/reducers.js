import update from "immutability-helper";

const initialState = {
  isFetching: false,
  list: []
};

export function getNextGameReducer(state = initialState, action) {
  console.log(state.list.length);

  if (action.type === "NEXT_GAME") {
    // If state is empty (on page load):
    if (state.list.length === 0) {
      return update(state, {
        list: {
          $push: [
            {
              isFetching: false,
              id: action.payload.id,
              timeLeft: action.payload.fakeStartDelta,
              result: null
            }
          ]
        }
      });
    }
    // If first API call has already been made and state has some data:
    else {
      // If new API call returns info about same game as previous (means we're counting):
      if (
        action.actionState.list[action.actionState.list.length - 1].id ===
        action.payload.id
      ) {
        // Replacing last object in state with info from new API call:
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
      // else
      //   return update(state, {
      //     list: {
      //       $push: [
      //         {
      //           id: action.payload.id,
      //           timeLeft: action.payload.fakeStartDelta,
      //           result: action.payload.result
      //         }
      //       ]
      //     }
      //   });
    }
  } else if (action.type === "GET_RESULT") {
    return update(state, {
      list: {
        $push: [
          {
            id: action.payload.id,
            timeLeft: null,
            result: action.payload.result,
            isFetching: false
          }
        ]
      }
    });
  } else if (action.type === "SET_LOADING") {
    return update(state, {
      isFetching: {
        $set: action.payload
      }
    });
  } else return state;
}
