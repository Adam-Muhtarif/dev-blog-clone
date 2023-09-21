import { useParams } from "react-router-dom";
import BlogAuthor from "../Components/BlogAuthor";
import BlogContent from "../Components/BlogContent";

import { useEffect, useState } from "react";
import { getBlog } from "../Utils/ApiFetch";

export default function Blog() {
  const { titleUrl } = useParams();
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState({});
  async function fetchApi() {
    try {
      const response = await getBlog(titleUrl);
      setBlog(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleUrl]);

  if (loading) return;
  return (
    <div className="flex my-5 space-x-5">
      <BlogContent blog={blog} author={blog.author} />
      <BlogAuthor author={blog.author} />
    </div>
  );
}
