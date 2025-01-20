import { Grid, Pagination } from "@mui/material";
import Loader from "../../../Components/Loader";
import Article from "./Article";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Container from "@mui/material/Container";
function Results({ page, setPage }) {
  const { newsAPIArticles, isNewsApiArticlesFetching, newsAPIArticleError } =
    useSelector((state) => state?.NewsAPIReducer);

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Container sx={{ my: 5 }}>
        <Box
          sx={{ flexGrow: 1, px: 5, pb: 3, background: "var(--primary-back)" }}
        >
          <Grid item xs={12}>
            {isNewsApiArticlesFetching ? (
              <Grid
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
                mt={5}
                pt={5}
              >
                <Loader />
              </Grid>
            ) : newsAPIArticles?.length > 0 ? (
              <Grid container spacing={3}>
                {newsAPIArticles.map((article, index) => (
                  <Grid item xs={12} sm={12} md={6} lg={4} key={index}>
                    <Article article={article} index={index} />
                  </Grid>
                ))}
                <Box mt={3}>
                  <Pagination
                    count={5}
                    page={page}
                    color="primary"
                    onChange={handleChangePage}
                  />
                </Box>
              </Grid>
            ) : (
              <Typography
                align="center"
                sx={{ pt: 2, color: "var(--primary)" }}
              >
                No Data found
              </Typography>
            )}
            {newsAPIArticleError && (
              <Typography color="error" align="center">
                {newsAPIArticleError}
              </Typography>
            )}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

export default Results;
