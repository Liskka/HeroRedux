const initialState = {
    heroes: [],
    // heroesLoadingStatus: 'idle',
    isError: false,
    isLoading: false,
    filters: [],
    activeFilter: 'all',
    filteredHeroes: []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                isLoading: true
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                isLoading: false
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                isError: true,
                isLoading: false
            }
        case 'HERO_DELETED':
            const newHeroList = state.heroes.filter(item => item.id !== action.payload);
            return {
                ...state,
                heroes: newHeroList
            }
        case 'FILTERS_FETCH':
            return {
                ...state,
                filters: action.payload
            }
        case 'SET_ACTIVE_FILTER':
            const newFilters = state.filters.map(filter => ({
                ...filter,
                isActive: action.payload === filter.name
            }))
            return {
                ...state,
                filters: newFilters
            }
        case 'ADD_NEW_HERO':
            // const newHeroes = state.heroes.push(action.payload);
            const newHeroes = [...state.heroes, action.payload];
            return {
                ...state,
                heroes: newHeroes
            }
        default: return state
    }
}

export default reducer;