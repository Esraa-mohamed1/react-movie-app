const initialState = {
    favorites: [],
    loading: false,
    error: null
};

const favoritesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_FAVORITES':
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };
        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter(movie => movie.id !== action.payload)
            };
        default:
            return state;
    }
};

export default favoritesReducer; 