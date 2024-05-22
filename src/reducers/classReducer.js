import {
    CREATE_CLASS,
    DELETE_CLASS,
    GET_LIST_CLASS,
    DETAIL_CLASS,
    UPDATE_CLASS,
    LOADING,
    FETCH_DATA_FAILURE,
} from '../actions/types';

const initClassStatate = { list: [], item: {}, isLoading: false, error: null };

function classReducer(classState = initClassStatate, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_CLASS:
            classState.list.push(payload);
            return { ...classState, item: payload, isLoading: false, error: null };
        case UPDATE_CLASS:
            let updatedList;

            const index = classState.list.findIndex((item) => item.id === payload.id);

            // If the item is found, update it in the list
            if (index !== -1) {
                updatedList = [...classState.list];
                updatedList[index] = payload;
            }

            return {
                ...classState,
                list: updatedList,
                item: payload,
                isLoading: false,
                error: null,
            };

        case GET_LIST_CLASS:
            return { ...classState, list: payload, isLoading: false, error: null };
        case DETAIL_CLASS:
            return { ...classState, item: payload, isLoading: false, error: null };
        case DELETE_CLASS:
            const updatedClassList = classState.list.filter((e) => e.id !== payload);
            return { ...classState, list: updatedClassList, item: null, isLoading: false, error: null };
        case LOADING:
            return {
                ...classState,
                isLoading: true,
                error: null,
            };
        case FETCH_DATA_FAILURE:
            return { isLoading: false, error: payload };

        default:
            return { ...classState, isLoading: false, error: null };
    }
}

export default classReducer;
