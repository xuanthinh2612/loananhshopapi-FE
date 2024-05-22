import * as classService from '../service/classService';
import {
    CREATE_CLASS,
    DELETE_CLASS,
    GET_LIST_CLASS,
    DETAIL_CLASS,
    UPDATE_CLASS,
    LOADING,
    FETCH_DATA_FAILURE,
} from '../actions/types';

export const createClassAction = (classPayload) => async (dispatch) => {
    dispatch(setLoadingStatusAction());
    try {
        const res = await classService.createClass(classPayload);

        dispatch({
            type: CREATE_CLASS,
            payload: res,
        });
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};

export const updateClassAction = (classPayload) => async (dispatch) => {
    dispatch(setLoadingStatusAction());
    try {
        const res = await classService.updateClass(classPayload);

        dispatch({
            type: UPDATE_CLASS,
            payload: res,
        });
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};

export const getDetailClassAction = (classPayload) => async (dispatch) => {
    dispatch(setLoadingStatusAction());
    try {
        const res = await classService.getClassById(classPayload);

        dispatch({
            type: DETAIL_CLASS,
            payload: res,
        });
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};

export const getListClassAction = () => async (dispatch) => {
    dispatch(setLoadingStatusAction());
    try {
        const res = await classService.getClassList();
        dispatch({
            type: GET_LIST_CLASS,
            payload: res,
        });
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};

export const deleteClassAction = (classId) => async (dispatch) => {
    dispatch(setLoadingStatusAction());
    try {
        await classService.deleteClassById(classId);
        dispatch({
            type: DELETE_CLASS,
            payload: classId,
        });
    } catch (error) {
        dispatch(fetchDataFailure(error));
    }
};
export const setLoadingStatusAction = () => async (dispatch) => {
    dispatch({
        type: LOADING,
        payload: true,
    });
};

export const fetchDataFailure = (error) => async (dispatch) => {
    dispatch({
        type: FETCH_DATA_FAILURE,
        payload: error,
    });
};
