import {Card, CardActions, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LazyLoad from 'react-lazyload';
import moment from "moment";
import styles from './Articales.module.scss'; 

function Article({ article, index }) {
  const defaultImg = process.env.PUBLIC_URL + "/empty.jpg";

  return (
    <div key={article?.index} className={styles['article-card']}> 
      <LazyLoad height={200}>
        <img
          src={article.image_url || defaultImg}
          alt={article?.title}
          className={styles['article-image']}
        />
      </LazyLoad>
      <div className={styles['article-content']}>
        <h5 className={styles['article-title']}>
          {article?.title.substring(0, 50)}
        </h5>
        <div className={styles['article-meta']}>
          <span>{article?.author_name}</span> | <span>{moment(article?.publish_date).format('DD MMMM, YYYY')}</span>
        </div>
        <p className={styles['article-description']}>
          {article?.description.length > 100
            ? article?.description.substring(0, 100) + "..."
            : article?.description}
        </p>
      </div>
      <div className={styles['article-actions']}>
        <a href={article?.url} target="_blank" className={styles['read-more-btn']}>Read More</a>
      </div>
    </div>
  );
}

export default Article;