import React, { createContext, useReducer } from "react";

export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const ADD_FLIGHTID = "ADD_FLIGHTID";
export const ADD_PILOTID = "ADD_PILOTID";
export const ADD_ACTIVE_PILOT_ID = "ADD_ACTIVE_PILOT_ID";

const copyMultidimensionalArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
};

const flightId = {
    currentFlightId: null,
    pilotId: null,
    activePilotId: null,
    accessToken: null
}

export const FlightDataContext = createContext(flightId);

export const flightReducer = (state, action) => {

    switch (action.type) {
        case ADD_FLIGHTID: {
            let temp = copyMultidimensionalArray(state);
            temp.currentFlightId = action.currentFlightId;
            return temp
        }
        case ADD_PILOTID: {
            let temp = copyMultidimensionalArray(state);
            temp.pilotId = action.pilotId;
            return temp
        }
        case ADD_ACTIVE_PILOT_ID: {
            let temp = copyMultidimensionalArray(state);
            temp.activePilotId = action.activePilotId;
            return temp
        }
        case SET_ACCESS_TOKEN: {
            let temp = copyMultidimensionalArray(state);
            temp.accessToken = action.payload;
            return temp
        }
        default: return state;
    }
}

export const FlightDataProvider = ({ children, ...rest }) => {
  const [state, dispatch] = useReducer(flightReducer, flightId);
  return (
    <>
        <FlightDataContext.Provider value={[state, dispatch]}>
            {children}
        </FlightDataContext.Provider>
    </>
  )
}