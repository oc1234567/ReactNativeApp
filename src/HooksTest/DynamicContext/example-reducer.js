export const reducer1 = (state, count) => {
    return {
        ...state,
        count: ++count,
    }
}

export const reducer2 = (state, count) => {
    return {
        ...state,
        count: --count,
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