import {
  GET_LIST_PRODUCT,
  GET_PRODUCT,
  LOADING,
  FETCH_DATA_FAILURE,
  FETCH_DATA_SUCCESS,
  GET_PRODUCT_BY_ADMIN,
} from "../actions/types";

const initProductStatate = {
  list: [],
  item: {},
  isLoading: false,
  error: null,
};

function productReducer(productState = initProductStatate, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_LIST_PRODUCT:
      return { ...productState, list: payload, isLoading: false };
    case GET_PRODUCT:
      return { ...productState, item: payload, isLoading: false };
    case LOADING:
      return { ...productState, isLoading: true };
    case GET_PRODUCT_BY_ADMIN:
      return { ...productState, list: payload, isLoading: false };
    case FETCH_DATA_FAILURE:
      return { ...productState, isLoading: false, error: payload };
    default:
      return { ...productState, isLoading: false };
  }
}

export default productReducer;
