import * as productService from "service/productService";
import {
  GET_LIST_PRODUCT,
  GET_PRODUCT,
  FETCH_DATA_FAILURE,
  LOADING,
  GET_PRODUCT_BY_ADMIN,
} from "actions/types";

// return list product
export const getListProductAction = () => async (dispatch) => {
  dispatch(setLoadingStatusAction());
  try {
    const res = await productService.getProductList();
    dispatch({
      type: GET_LIST_PRODUCT,
      payload: res,
    });
  } catch (error) {
    fetchDataFailureAction(error);
  }
};

// return list product
export const getProductAction = (id) => async (dispatch) => {
  dispatch(setLoadingStatusAction());
  try {
    const res = await productService.getProductById(id);
    dispatch({
      type: GET_PRODUCT,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: error,
    });
  }
};

//==============================================ADMIN======================================

// return list product
export const getListProductByAdminAction = () => async (dispatch) => {
  dispatch(setLoadingStatusAction());
  try {
    const res = await productService.getProductListByAdmin();
    dispatch({
      type: GET_PRODUCT_BY_ADMIN,
      payload: res,
    });
  } catch (error) {
    dispatch({
      type: FETCH_DATA_FAILURE,
      payload: error,
    });
  }
};

//=======================COMMON===============================================================

// handle if any error occurred
export const fetchDataFailureAction = (error) => (dispatch) => {
  dispatch({
    type: FETCH_DATA_FAILURE,
    payload: error,
  });
};

// set loading status before fetch api
export const setLoadingStatusAction = () => async (dispatch) => {
  dispatch({
    type: LOADING,
    payload: true,
  });
};
