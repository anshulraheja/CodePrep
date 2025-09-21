// pure UI component, reusable anywhere.
export default function PaginationControls({
  currentPage,
  prevPage,
  totalPages,
  goToPage,
  nextPage,
  data,
  pageSize,
}) {
  const start = currentPage * pageSize + 1;
  const end = Math.min((currentPage + 1) * pageSize, data.length);

  /* Efficient Page Number Rendering (Windowed)
    Instead of rendering all pages, render a sliding window (5 pages before and after).
  */
  //   const windowSize = 5;
  //   const start = Math.max(0, currentPage - windowSize);
  //   const end = Math.min(totalPages, currentPage + windowSize + 1);

  const pageNumbers = [];
  for (let i = start; i < end; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="pagination">
      <div>
        <button disabled={currentPage === 0} onClick={prevPage}>
          Prev
        </button>

        {/* {start > 0 && <span onClick={() => goToPage(0)}>1 …</span>}

        {pageNumbers.map((pageIndex) => (
          <span
            key={pageIndex}
            className={`page-number ${currentPage === pageIndex ? 'active' : ''}`}
            onClick={() => goToPage(pageIndex)}
          >
            {pageIndex + 1}
          </span>
        ))}

        {end < totalPages && <span onClick={() => goToPage(totalPages - 1)}>… {totalPages}</span>} */}
        {[
          ...Array(totalPages)
            .keys()
            .map((pageIndex) => (
              <span
                key={pageIndex}
                className={`page-number ${currentPage === pageIndex ? 'active' : ''}`}
                onClick={() => goToPage(pageIndex)}
              >
                {pageIndex + 1}
              </span>
            )),
        ]}
        <button disabled={currentPage === totalPages - 1} onClick={nextPage}>
          Next
        </button>
      </div>
      <p>
        Showing {start} – {end} of {data.length} results
      </p>
    </div>
  );
}
