import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";

type TProductItem = {
  id: string;
  imageUrl: string[];
  name: string;
  price: number;
  sizes: number[];
  types: number[];
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface IProductSliceState {
  items: TProductItem[];
  status: Status;
}

interface ISearch {
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
}

export interface ISearchPatams {
  category: string;
  sortBy: string;
  order: string;
  search: string;
  currentPage: string;
}

export interface IHoneLocationParams extends ISearch {
  categoryId: string;
}

export const fetchProducts = createAsyncThunk(
  "product/fetchProduct",
  async (params: ISearchPatams) => {
    const { category, sortBy, order, search, currentPage } = params;
    const { data } = await axios.get<TProductItem[]>(
      `https://642582899e0a30d92b34169f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}${order}&${search}`
    );
    return data;
  }
);

const initialState: IProductSliceState = {
  items: [],
  status: Status.LOADING,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<TProductItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchProducts.fulfilled, (state, actions) => {
      state.items = actions.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectProduct = (state: RootState) => state.product;

export const { setItems } = productSlice.actions;

export default productSlice.reducer;


