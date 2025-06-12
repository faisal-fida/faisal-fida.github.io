import "./Blog.css";
import useSWR from "swr";
import { portfolioFetcher, useOfflineStatus } from "../../utils/swrUtils";

interface Post {
  id: number;
  category: string;
  title: string;
  date: string;
  author: string;
  url: string;
}

const Blog = () => {
  const isOffline = useOfflineStatus();
  const { data: posts, error, isLoading, mutate } = useSWR("data/blog.json", portfolioFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    errorRetryCount: 3,
    errorRetryInterval: 2000,
  });

  // Enhanced error handling
  if (error) {
    return (
      <section className="blog container section" id="blog">
        <h2 className="section__title">Latest Posts</h2>
        <div className="error-container">
          <p>
            {isOffline
              ? "You're offline. Please check your internet connection."
              : `Error loading blog data: ${error.message || 'Unknown error'}`
            }
          </p>
          <button onClick={() => mutate()} disabled={isOffline}>
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (isLoading || !posts) {
    return (
      <section className="blog container section" id="blog">
        <h2 className="section__title">Latest Posts</h2>
        <div className="loading-container">
          <div>Loading blog posts...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog container section" id="blog">
      <h2 className="section__title">Latest Posts</h2>

      <div className="blog__container grid">
        {posts.map((post: Post) => (
          <div className="blog__card" key={post.id}>
            <span className="blog__category">{post.category}</span>
            <div className="blog__details">
              <a href={post.url}>
                <h3 className="blog__title">{post.title}</h3>
                <div className="blog__meta">
                  <span>{post.date}</span>
                  <span className="blog__dot">.</span>
                  <span>{post.author}</span>
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Blog;
