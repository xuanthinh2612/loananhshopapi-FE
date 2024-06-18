import * as productService from "service/productService";
import {
  GET_LIST_PRODUCT,
  GET_PRODUCT,
  FETCH_DATA_FAILURE,
} from "actions/types";

// return list product
export const getListProductAction = () => async (dispatch) => {
  //   dispatch(setLoadingStatusAction());
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
  //   dispatch(setLoadingStatusAction());
  try {
    const res = await productService.getProductById(id);
    dispatch({
      type: GET_PRODUCT,
      payload: res,
    });
  } catch (error) {
    fetchDataFailureAction(error);
  }
};

// handle if any error occurred
export const fetchDataFailureAction = (error) => async (dispatch) => {
  // Nếu xảy ra lỗi authentication thì xóa thông tin đăng nhập trong localStorage
  dispatch({
    type: FETCH_DATA_FAILURE,
    payload: error,
  });
};
