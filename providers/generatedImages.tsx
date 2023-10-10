import { createContext, useReducer } from 'react'

export const GeneratedImagesContext = createContext();

const initialState = {
  result: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case "GENERATE_NEW_IMAGE":
      return {...state, result: [...state.result, action.payload]}
    case "ADD_IMAGE":
      const newResult = state.result.map(obj => {
        if(obj.task_id === action.payload.id){
          return {
            ...obj,
            uri: action.payload.uri
          }
        }
        return obj
      })

      return {...state, result: newResult}
    case "FETCH_IMAGES_IN_STORAGE":
      return {...state, result: action.payload}
    default:
      return state;
  }
}

const GeneratedImagesProvider = ({children}) => {
  return (
    <GeneratedImagesContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </GeneratedImagesContext.Provider>
  )
};

export default GeneratedImagesProvider