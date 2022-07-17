export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleted = (id) => {
    return {
        type: 'HERO_DELETED',
        payload: id
    }
}

export const filtersFetch = (filters) => {
    return {
        type: 'FILTERS_FETCH',
        payload: filters
    }
}

export const setActiveFilter = (name) => {
    return {
        type: 'SET_ACTIVE_FILTER',
        payload: name
    }
}

export const addHero = (hero) => {
    return {
        type: 'ADD_NEW_HERO',
        payload: hero
    }
}