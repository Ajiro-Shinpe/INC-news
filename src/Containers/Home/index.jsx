import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss"; // Import SCSS Module

function Home() {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Welcome to Inc News</title>
      </Helmet>

      <div
  className={styles.heroSection}
  style={{
    backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt5VvFdIMSduCXH36XEjOXomEcE7XXBohk2g&s")`  }}
>
        <h1 className={styles.heroTitle}>Welcome to Innos News</h1>
        <p className={styles.heroSubtitle}>
          Stay updated with the latest news from trusted sources like The New
          York Times, The Guardian, and News API. Explore trending topics and
          deep-dive into the stories that matter most to you.
        </p>
        <Link to="/news-search">
          <button className={styles.ctaButton}>Search Now</button>
        </Link>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Popular Categories</h2>
        <p className={styles.sectionDescription}>
          Explore the most popular topics in news, from politics and economy to
          sports and entertainment. Whether you're interested in breaking news,
          local news, or international news, we've got you covered.
        </p>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Top Stories</h2>
        <p className={styles.sectionDescription}>
          Catch up with the latest updates and headlines across the globe. From
          politics and business to entertainment and technology, we’ve got you
          covered.
        </p>
        <div className={styles.newsGrid}>
          {Array.from({ length: 3 }).map((_, index) => (
            <div className={styles.newsCard} key={index}>
              <img
                className={styles.newsImage}
                src={`./assets/news-110x110-${index + 1}.jpg`}
                alt={`News ${index + 1}`}
              />
              <h3 className={styles.newsTitle}>Headline {index + 1}</h3>
              <p className={styles.newsDescription}>
                A brief description of the news article. Stay informed with the
                latest details.
              </p>
              <Link to={`/news/${index + 1}`} className={styles.readMoreLink}>
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Subscribe to Our Newsletter</h2>
        <p className={styles.ctaDescription}>
          Don’t miss out on breaking news and exclusive insights. Subscribe to
          our newsletter today.
        </p>
        <Link to="/subscribe">
          <button className={styles.ctaButton}>Subscribe Now</button>
        </Link>
      </div>
    </HelmetProvider>
  );
}

export default Home;

// Adil123###