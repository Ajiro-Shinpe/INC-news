import { Helmet, HelmetProvider } from "react-helmet-async";
import Searchbar from "./Searchbar";
import Results from "./Results";
import withAuth from "../../hoc/withAuth";
import { useState } from "react";
import { Grid } from "@mui/material";

function Home() {
  const [page, setPage] = useState(1);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Welcome to Inc News</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} lg={4} md={5}>
          <Searchbar page={page} />
        </Grid>
        <Grid item xs={12} sm={6} lg={8} md={7}>
          <Results setPage={setPage} page={page} />
        </Grid>
      </Grid>
    </HelmetProvider>
  );
}
export default withAuth(Home);
