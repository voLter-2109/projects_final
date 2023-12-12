import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectCategoryId } from "../../redux/slices/filterSlice";
import style from "./Pagination.module.scss";
// ! из-за  новой версии @types\react 18 typePagination выдает ощибку 

type IPaginationProps = {
  setCurrentPage: (currentPage: number) => void;
  currentPage: number;
};

const Pagination: React.FC<IPaginationProps> = ({
  setCurrentPage,
  currentPage,
}) => {
  const [pagination, setPagination] = useState<number>();
  const catId = useSelector(selectCategoryId);

  useEffect(() => {
    const dataPagination = async () => {
      const { data } = await axios.get<{ totalItems: string }[]>(
        "https://642582899e0a30d92b34169f.mockapi.io/pagination"
      );
      return setPagination(Math.ceil(Number(data[0].totalItems) / 4));
    };
    dataPagination();
  }, []);

  return (
    <>
      {pagination && catId === 0 && (
      //@ts-ignore
        <ReactPaginate
          className={style.root}
          breakLabel="..."
          nextLabel=">"
          onPageChange={(e) => setCurrentPage(e.selected + 1)}
          pageRangeDisplayed={4}
          pageCount={pagination}
          forcePage={currentPage - 1}
          previousLabel="<"
        />
      )}
    </>
  );
};

export default Pagination;
