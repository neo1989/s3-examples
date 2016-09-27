import fetch from 'isomorphic-fetch';


export const FETCHING = 'FETCHING'
export const RECEIVE = 'RECEIVE'


export function fetching() {
    return {
        type: FETCHING
    }
}

export function receive(images) {
    return {
        type: RECEIVE,
        images: images
    }
}

export function fetchImages() {
    return function (dispatch) {
        dispatch(fetching())

        return fetch(`/images`)
        .then(response => response.json())
        .then(json => dispatch(receive(json)))
    }
}


