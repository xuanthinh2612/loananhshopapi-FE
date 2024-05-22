import {
    CREATE_STUDENT,
    DETAIL_STUDENTS,
    UPDATE_STUDENT,
    DELETE_STUDENT,
    GET_LIST_STUDENT,
    LOADING,
    FETCH_DATA_FAILURE,
    RESET_STORE,
} from '../actions/types';

const initStudentStatate = { list: [], item: {}, isLoading: false, error: null };

function studentReducer(studentState = initStudentStatate, action) {
    const { type, payload } = action;

    switch (type) {
        case CREATE_STUDENT:
            studentState.list.push(payload);

            return {
                ...studentState,
                item: payload,
                isLoading: false,
            };
        case UPDATE_STUDENT:
            let updatedList;

            const index = studentState.list.findIndex((item) => item.id === payload.id);

            // If the item is found, update it in the list
            if (index !== -1) {
                updatedList = [...studentState.list];
                updatedList[index] = payload;
            }

            return {
                ...studentState,
                list: updatedList,
                item: payload,
                isLoading: false,
            };

        case GET_LIST_STUDENT:
            return { ...studentState, list: payload, isLoading: false };
        case DETAIL_STUDENTS:
            return {
                ...studentState,
                item: payload,
                isLoading: false,
            };
        case DELETE_STUDENT:
            const subList = studentState.list.filter((item) => item.id !== payload);

            return {
                ...studentState,
                list: subList,
                item: null,
                isLoading: false,
            };
        case LOADING:
            return {
                ...studentState,
                isLoading: true,
            };
        case RESET_STORE:
            return initStudentStatate;
        case FETCH_DATA_FAILURE:
            return { isLoading: false, error: payload };

        default:
            return { ...studentState, isLoading: false };
    }
}

export default studentReducer;
