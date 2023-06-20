import React from 'react';

export const formContext = React.createContext({});

// action-type的类型
const UP_FORM = 'UP_FORM'
const UP_ADDRESS = 'UP_ADDRESS'

// state的类型
export type StateData = { 
    formList: number[]
    addressList: []
}

// Reducer的类型
export type CountReducer = React.Reducer<StateData, any>

export const initState: StateData = {
    formList: [1],
    addressList: [],
};

export const reducer: CountReducer = (state:any, action:any) => {
    switch (action.type) {
        case UP_FORM: return {...state, formList: action.formList};
        case UP_ADDRESS: return {...state, addressList: action.addressList};
        default: return state;
    }
}
