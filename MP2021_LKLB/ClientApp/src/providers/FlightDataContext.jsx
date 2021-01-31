import React, { createContext, useReducer } from "react";

export const ADD_FLIGHTID = "ADD_FLIGHTID";

const copyMultidimensionalArray = (arr) => {
    return JSON.parse(JSON.stringify(arr));
};

const flightId = {
    currentFlightId: null
}

export const FlightDataContext = createContext(flightId);

export const flightReducer = (state, action) => {
    switch (action.type) {
        case ADD_FLIGHTID: {
            
            let temp = copyMultidimensionalArray(state);
            temp.currentFlightId = action.currentFlightId;
            console.log(temp);
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