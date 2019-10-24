import React from "react";

const Pagination = props => {
  //destructure the props
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  //create a const instructing how many pages must be create and if the result is 1 page then dont both return anything to render
  const pagesCount = itemsCount / pageSize;
  if (Math.ceil(pagesCount) === 1) {
    return null;
  }

  //make a dynamic array of numbers starting from 1 up the the pagesCount to reflect each page that will be needed
  const pageCountArr = [];
  for (var i = 0; i < Math.ceil(pagesCount); ++i) {
    pageCountArr.push(i + 1);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageCountArr.map((
          page //for each page render a pagination ui for it
        ) => (
          <li
            key={page}
            //if the current page is the same as the page we are on then add the class "active" to illustrate this
            className={page === currentPage ? "page-item active" : "page-item"}
            onClick={() => onPageChange(page)}
          >
            <a className="page-link">{page}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
