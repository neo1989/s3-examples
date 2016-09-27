import { FETCHING, RECEIVE } from './action'

const defaultState = {
    isFetching: false,
    images: []
}


export function imageReducer(state = defaultState, action) {

    switch (action.type) {
        case FETCHING:
            return Object.assign({}, state, {isFetching: true})
        case RECEIVE:
            return Object.assign({}, state, {isFetching: false, images: action.images})
        default:
            return state;
    }
}


