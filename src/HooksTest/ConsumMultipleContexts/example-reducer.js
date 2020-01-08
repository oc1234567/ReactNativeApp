export const addCountReducer = (state) => {
    return {
        ...state,
        count: state.count + 1,
    }
}

export const reduceCountReducer = (state) => {
    return {
        ...state,
        count: state.count - 1,
    }
}

export const setName = (state, name) => {
    return {
        ...state,
        user: {
            ...state.user,
            name
        }
    }
}

export const setTheme = (state, theme) => {
    return {
        ...state,
        theme
    }
}