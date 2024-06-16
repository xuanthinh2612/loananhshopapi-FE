import { GET_LIST_PRODUCT, GET_PRODUCT } from "../actions/types";

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
      return { ...productState, list: payload };
    case GET_PRODUCT:
      return { ...productState, item: payload };
    default:
      return productState;
  }
}

export default productReducer;
