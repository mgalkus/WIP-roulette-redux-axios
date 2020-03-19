import update from "immutability-helper";

const initialState = { loadgingMessage: "", timeLeftGlobal: null, list: [] };

export function getNextGameReducer(state = initialState, action) {
  if (action.type === "NEXT_GAME") {
    // If state is empty (on page load):
    if (state.list.length === 0) {
      return update(state, {
        timeLeftGlobal: { $set: action.payload.fakeStartDelta },
        list: {
          $push: [
            {
              id: action.payload.id
            }
          ]
        }
      });
    }
    // If first API call has already been made and state has some data:
    else {
      // And if new API call returns same id as previous (means we're still counting)
      if (
        action.actionState.list[action.actionState.list.length - 1].id ===
        action.payload.id
      ) {
        // If counting is less than 0, showing loadingMessage and replacing last object in state with info from new API call:
        if (action.payload.fakeStartDelta <= 0) {
          return update(state, {
            loadgingMessage: { $set: "result loading..." },
            list: {
              $splice: [
                [
                  -1,
                  1,
                  {
                    id: action.payload.id
                  }
                ]
              ]
            }
          });
        }
        // If counting is not at 0, means we continue counting (replacing last object in state with info from new API call):
        else
          return update(state, {
            loadgingMessage: { $set: "" },
            list: {
              $splice: [
                [
                  -1,
                  1,
                  {
                    id: action.payload.id
                  }
                ]
              ]
            }
          });
      }
      // If new API call returns info about new game:
      // !!!!!! But we will not have result from API just yet, because it will fetch for a second or so
      return update(state, {
        loadgingMessage: {
          $set: "msg new API call returns info about new gam"
        },
        timeLeftGlobal: { $set: action.payload.fakeStartDelta },
        list: {
          $push: [
            {
              id: action.payload.id
            }
          ]
        }
      });
    }
  } else if (action.type === "DECREMENT") {
    return update(state, {
      timeLeftGlobal: { $set: state.timeLeftGlobal - 1 },
      loadgingMessage: { $set: null }
    });
  } else if (action.type === "GET_RESULT") {
    // console.log(action.payload.data.result);
    return update(state, {
      loadgingMessage: { $set: " loading GET_RESULT msg" },
      timeLeftGlobal: { $set: action.payload.fakeStartDelta },
      list: {
        $push: [
          {
            id: action.payload.id,
            result: action.payload.data.result
          }
        ]
      }
    });
  } else return state;
}
