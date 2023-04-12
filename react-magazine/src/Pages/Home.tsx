// lib
import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// lib for string obj for url
import qs from "qs";
// component
import Sort, { sortList } from "../components/Sort";
import Categories from "../components/Categories";
import Pagination from "../components/Pagination";
import ProductBlock from "../components/ProductBlock/ProductBlock";
import SceletonProduct from "../components/ProductBlock/SceletonProductBlock";
// redux
import { useSelector } from "react-redux";
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";
import {
  IHoneLocationParams,
  fetchProducts,
  selectProduct,
} from "../redux/slices/productSlice";
// style
import "../scss/app.scss";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const {
    categoryId,
    sort: sortState,
    currentPage,
    searchValue,
  } = useSelector(selectFilter);
  const sortType = sortState.sort;

  const { items, status } = useSelector(selectProduct);
  const dispath = useAppDispatch();

  const navigate = useNavigate();
  // проверка на первый рендер
  const isMounted = useRef<boolean>(false);

  const onChangePage = useCallback(
    (number: number) => {
      dispath(setCurrentPage(number));
    },
    [dispath]
  );

  const onChangeCategory = useCallback(
    (index: number) => {
      dispath(setCategoryId(index));
    },
    [dispath]
  );

  useEffect(() => {
    console.log(1, window.location.search);
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as IHoneLocationParams;

      const sort = sortList.find((obj) => obj.sort === params.sortBy);

      dispath(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.categoryId),
          currentPage: Number(params.currentPage),
          sort: sort ? sort : sortList[0],
        })
      );
    }

    isMounted.current = true;
  }, []);

  useEffect(() => {
    console.log(2, window.location.search);
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortType: sortState.sort,
        categoryId: categoryId,
        currentPage: currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;

    getProduct();
  }, [
    categoryId,
    sortType,
    sortState.sort,
    currentPage,
    searchValue,
    navigate,
  ]);

  const getProduct = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : "";
    const sortBy = sortType.replace("-", "");
    const order = sortType.includes("-") ? "&order=asc" : "&order=desc";
    const search = searchValue ? `search=${searchValue}` : "";

    dispath(
      fetchProducts({
        category,
        sortBy,
        order,
        search,
        currentPage: String(currentPage),
      })
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const product = items.map((obj: any) => (
    <ProductBlock key={obj.id} {...obj} />
  ));
  const sceletons = [...new Array(4)].map((_, i) => (
    <SceletonProduct key={i} />
  ));

  return (
    <>
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={onChangeCategory} />
          <Sort />
        </div>
        <h2 className="content__title">All Goods</h2>
        {status === "error" ? (
          <div style={{ textAlign: "center", height: "300px" }}>
            <h2>loading error, please try again later 💀</h2>
          </div>
        ) : (
          <div className="content__items">
            {status === "loading" ? (
              sceletons
            ) : status === "success" && product.length !== 0 ? (
              product
            ) : (
              <p>Nothing found for your request</p>
            )}
          </div>
        )}

        <Pagination currentPage={currentPage} setCurrentPage={onChangePage} />
      </div>
    </>
  );
};

export default Home;
