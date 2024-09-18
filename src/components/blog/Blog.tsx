import "./Blog.css";
import useSWR from "swr";
import { fetcher } from "../../utils/swrUtils";

interface Post {
  id: number;
  category: string;
  title: string;
  date: string;
  author: string;
  url: string;
}

const Blog = () => {
  const { data: posts, error } = useSWR("data/blog.json", fetcher);

  if (error) return <div>Error loading blog data</div>;
  if (!posts) return <div>Loading...</div>;

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
