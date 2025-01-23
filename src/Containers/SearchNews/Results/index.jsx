import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Loader";
import Article from "./Article";
import "./style.scss";
function Results({ page, setPage }) {
  const { newsAPIArticles, isNewsApiArticlesFetching, newsAPIArticleError } =
    useSelector((state) => state?.NewsAPIReducer);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const totalPages = 5; // Assuming there are 5 pages for simplicity

  return (
    <div className="results-container">
      <div className="results-content">
        {isNewsApiArticlesFetching ? (
          <div className="loader-container">
            <Loader />
          </div>
        ) : newsAPIArticles?.length > 0 ? (
          <div className="results-grid">
            {newsAPIArticles.map((article, index) => (
              <div className="result-item" key={index}>
                <Article article={article} index={index} />
              </div>
            ))}
            <div className="pagination-container">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  className={`pagination-btn ${page === i + 1 ? "active" : ""}`}
                  onClick={() => handleChangePage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="no-data">No Data found</p>
        )}
        {newsAPIArticleError && (
          <p className="error-message">{newsAPIArticleError}</p>
        )}
      </div>
    </div>
  );
}

export default Results;
