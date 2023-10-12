import { useRouter } from "next/router";
import classes from "./ManUserCard.module.css";
import { motion } from "framer-motion";
function Pagination({ currentPage, totalPages }) {
  const router = useRouter();
  const MAX_PAGES = 1; // maximum number of pages to show

  totalPages = Math.ceil(totalPages);
  // create an array of page numbers from 1 to totalPages
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  // calculate the start and end indices of the pages to show
  let start = Math.max(0, currentPage - Math.floor(MAX_PAGES / 2));
  let end = Math.min(totalPages - 1, start + MAX_PAGES - 1);

  // adjust the start index if there are fewer pages to show
  start = Math.max(0, end - MAX_PAGES + 1);

  // create an array of page numbers to show
  const visiblePages = pages.slice(start, end + 1);

  const handlePageNumberClick = (page) => {
    const queryParams = { ...router.query, p: page };
    const stringParameters = Object.entries(queryParams).map(
      ([key, value]) => `${key}=${value}`
    );

    window.location.href = `${router.pathname}?${stringParameters.join("&")}`;
  };

  const renderPageLink = (page) => (
    <li key={page} className="flex gap-2">
      <motion.div
        onClick={() => {
          handlePageNumberClick(page);
        }}
        whileHover={{ y: -2 }}
        style={{ cursor: "pointer" }}
        className={
          parseInt(page) === parseInt(currentPage)
            ? "px-3 py-1 !bg-primary rounded-full !text-white"
            : "px-3 py-1 !bg-primary rounded-full  !text-white"
        }
      >
        {page}
      </motion.div>
    </li>
  );

  return (
    <ul className={classes["pul"]}>
      {currentPage > Math.ceil(MAX_PAGES / 2) && (
        <>
          {renderPageLink(1)}
          {start > 1 && <li className="mx-2">ـ</li>}
        </>
      )}

      <>
        <li key={currentPage} className="flex gap-2">
          <motion.div
            onClick={() => {
              handlePageNumberClick(currentPage);
            }}
            whileHover={{ y: -2 }}
            style={{ cursor: "pointer" }}
            className={
              "px-3 py-1 !bg-white rounded-full  !text-primary border border-solid !border-primary"
            }
          >
            {currentPage}
          </motion.div>
        </li>
        {<li className="mx-2">ـ</li>}
      </>

      {visiblePages.map(renderPageLink)}

      {currentPage < totalPages - Math.ceil(MAX_PAGES / 2) && (
        <>
          {end < totalPages - 1 && <li className="mx-2">ـ</li>}
          {renderPageLink(totalPages)}
        </>
      )}
    </ul>
  );
}

export default Pagination;
