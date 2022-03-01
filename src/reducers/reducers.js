import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
    switch (action.type) {
        case SET_FILTER:
            console.log('SET_FILTER reducer reached');
            return action.value;
        default:
            return state;
    }
}

function movies(state = [], action) {
    switch (action.type) {
        case SET_MOVIES:
            console.log('SET_MOVIES reducer reached');
            return action.value;
        default:
            return state;
    }
}

function user(state = '', action) {
    switch (action.type) {
        case SET_USER:
            console.log('SET_USER reducer reached');
            return action.value;
        default:
            return state;
    }
}

// Below function was replaced by combineReducers build in function:
// function moviesApp(state = {}, action) {
//     return {
//         visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//         movies: movies(state.movies, action)
//     }
// }

const moviesApp = combineReducers({
    visibilityFilter,
    movies,
    user
});

export default moviesApp;       