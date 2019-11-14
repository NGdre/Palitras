import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectIsLoading } from "../actions/pictureSelectors";
import { push } from "connected-react-router";
import ButtonIcon from "../buttons/ButtonIcon";
import _ from "lodash";
import Button from "../buttons/Button";

interface Props {
  fetchPage: (page: number) => void;
  defaultPage: number;
  totalPages: number;
  totalImages: number;
  pathname?: string;
  search?: string;
}

const Pagination: React.FC<Props> = ({
  fetchPage,
  defaultPage,
  totalPages,
  totalImages,
  pathname = "/",
  search
}) => {
  const isLoading = useSelector(selectIsLoading);
  const dispatch = useDispatch();

  const [inputValue, setInputValue] = useState<number | string>(
    defaultPage || 1
  );

  const [currentPage, setCurrentPage] = useState(defaultPage || 1);

  useEffect(() => {
    const resource = search
      ? `${pathname}${search}${currentPage}`
      : `${pathname}?page=${currentPage}`;

    if (currentPage === 1) {
      dispatch(push(resource));
      return fetchPage(1);
    }

    dispatch(push(resource));
    fetchPage(currentPage);
  }, [currentPage, dispatch, search, pathname, fetchPage]);

  const handlePage = (changeType: string) => () => {
    if (changeType !== "increment" && changeType !== "decrement") {
      throw new Error(
        'you should provide correct action type of "increment" or "decrement" '
      );
    }

    const newPage =
      changeType === "increment" ? currentPage + 1 : currentPage - 1;

    setCurrentPage(newPage);
    setInputValue(newPage);
  };

  const handleChange = ({
    currentTarget: { value }
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(value);
  };

  const handleSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const page = +inputValue;

      if (_.isNumber(page) && !(page % 1) && page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    }
  };

  const disabled = isLoading === true;
  const disabledPrev = disabled || currentPage === 1;
  const disabledNext = disabled || currentPage === totalPages;

  if (totalPages === 1) {
    return null;
  }

  return (
    <div className="pagination">
      <div className="flex-center">
        <Button handleClick={handlePage("increment")} disabled={disabledNext}>
          Next page >
        </Button>
      </div>
      <div className="flex-right">
        <div className="pagination__select-page-box">
          <input
            className="pagination__select-page"
            onChange={handleChange}
            onKeyDown={handleSubmit}
            disabled={disabled}
            value={inputValue}
          />
          <p className="pagination__total-pages">/ {totalPages}</p>
        </div>
        <ButtonIcon
          disabled={disabledPrev}
          iconName="navigate_before"
          className="pagination__prev"
          handleClick={handlePage("decrement")}
        />
        <ButtonIcon
          disabled={disabledNext}
          iconName="navigate_next"
          className="pagination__next"
          handleClick={handlePage("increment")}
        />
        <p className="pagination__total-images">
          total images: <strong>{totalImages}</strong>
        </p>
      </div>
    </div>
  );
};

export default Pagination;
