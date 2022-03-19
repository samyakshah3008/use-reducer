

export const reducerFunction = (state,action) => {
       
    console.log(state)
    console.log(action)
    // console.log(action.payload)


    return {...state, counter: state.counter + action.payload  }
}
