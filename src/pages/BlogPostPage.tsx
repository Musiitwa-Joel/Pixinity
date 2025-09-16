import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Tag,
  ArrowLeft,
  MessageCircle,
  Send,
  Loader2,
  BadgeCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    role: string;
  };
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
}

interface Comment {
  id: string;
  content: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    verified: boolean;
    role: string;
  };
  likesCount: number;
  repliesCount: number;
  createdAt: string;
}

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (slug) {
      fetchPost(slug);
    }
  }, [slug]);

  const fetchPost = async (postSlug: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${postSlug}`,
        {
          credentials: "include",
        }
      );

      if (response.status === 404) {
        navigate("/404");
        return;
      }

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog post: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setPost(data);

      // Check if user has liked this post
      if (isAuthenticated) {
        checkLikeStatus(data.id);
      }

      // Fetch comments
      fetchComments(data.id);

      // Fetch related posts
      fetchRelatedPosts(data.category, data.tags, data.id);
    } catch (error) {
      console.error("Error fetching blog post:", error);
      toast.error("Failed to load blog post");
    } finally {
      setIsLoading(false);
    }
  };

  const checkLikeStatus = async (postId: string) => {
    try {
      // This would be a real API call in a production app
      // For now, we'll just simulate it
      setIsLiked(false);
    } catch (error) {
      console.error("Error checking like status:", error);
    }
  };

  const fetchComments = async (postId: string) => {
    setIsLoadingComments(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${postId}/comments`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }

      const data = await response.json();
      setComments(data.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setIsLoadingComments(false);
    }
  };

  const fetchRelatedPosts = async (
    category: string,
    tags: string[],
    currentPostId: string
  ) => {
    try {
      // Build query parameters to find related posts
      const params = new URLSearchParams();
      params.append("published", "true");
      params.append("limit", "3");

      if (category) {
        params.append("category", category);
      }

      const response = await fetch(
        `http://localhost:5000/api/blog/posts?${params}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch related posts");
      }

      const data = await response.json();

      // Filter out the current post
      const filtered = data.posts.filter(
        (p: BlogPost) => p.id !== currentPostId
      );

      // If we don't have enough posts, we could fetch more with different criteria
      // For now, just use what we have
      setRelatedPosts(filtered.slice(0, 3));
    } catch (error) {
      console.error("Error fetching related posts:", error);
    }
  };

  const handleLike = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to like posts");
      return;
    }

    if (!post) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${post.id}/like`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to like post");
      }

      const data = await response.json();

      setIsLiked(data.liked);
      setPost((prev) => (prev ? { ...prev, likes: data.likesCount } : null));

      toast.success(data.message);
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

  const handleShare = () => {
    if (!post) return;

    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Please sign in to comment");
      return;
    }

    if (!post) return;

    if (!commentText.trim()) {
      toast.error("Comment cannot be empty");
      return;
    }

    setIsSubmittingComment(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${post.id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            content: commentText.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit comment");
      }

      const newComment = await response.json();

      // Update comments list
      setComments([newComment, ...comments]);

      // Update comment count on post
      setPost((prev) =>
        prev ? { ...prev, comments: prev.comments + 1 } : null
      );

      // Clear comment form
      setCommentText("");

      toast.success("Comment added successfully");
    } catch (error) {
      console.error("Error submitting comment:", error);
      toast.error("Failed to submit comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">
            Post not found
          </h2>
          <p className="text-neutral-600 mb-6">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog" className="btn-primary">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section
        className="relative py-32 bg-cover bg-center text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${post.coverImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-8 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-medium">Back to Blog</span>
            </Link>

            <div className="space-y-4">
              {post.category && (
                <span className="inline-block bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              )}

              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center justify-center space-x-6 text-white/80">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>{post.views.toLocaleString()} views</span>
                </div>
              </div>

              <div className="flex items-center justify-center space-x-3 pt-4">
                <img
                  src={
                    post.author.avatar ||
                    `https://ui-avatars.com/api/?name=${post.author.name.replace(
                      " ",
                      "+"
                    )}&background=2563eb&color=ffffff`
                  }
                  alt={post.author.name}
                  className="h-10 w-10 rounded-full object-cover border-2 border-white"
                />
                <div className="text-left">
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm text-white/70">{post.author.role}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 overflow-hidden">
          {/* Article Content */}
          <motion.article
            className="prose prose-lg max-w-none p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </motion.article>

          {/* Tags and Social Actions */}
          <div className="px-8 py-6 border-t border-neutral-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link
                    key={index}
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-sm transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isLiked
                      ? "bg-red-100 text-red-600"
                      : "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-red-600" : ""}`}
                  />
                  <span>{post.likes}</span>
                </button>

                <button
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-neutral-100 text-neutral-700 hover:bg-neutral-200 rounded-lg transition-colors"
                >
                  <Share2 className="h-5 w-5" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="px-8 py-6 bg-neutral-50 border-t border-neutral-200">
            <div className="flex items-start space-x-4">
              <img
                src={
                  post.author.avatar ||
                  `https://ui-avatars.com/api/?name=${post.author.name.replace(
                    " ",
                    "+"
                  )}&background=2563eb&color=ffffff`
                }
                alt={post.author.name}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                  About {post.author.name}
                </h3>
                <p className="text-neutral-600 mb-3">
                  Professional photographer and writer specializing in{" "}
                  {post.category.toLowerCase()} photography.
                </p>
                <Link
                  to={`/@${post.author.username}`}
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  View Profile
                </Link>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="px-8 py-6 border-t border-neutral-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-primary-500" />
              Comments ({post.comments})
            </h3>

            {/* Comment Form */}
            {isAuthenticated ? (
              <form onSubmit={handleSubmitComment} className="mb-8">
                <div className="flex space-x-4">
                  <img
                    src={
                      user?.avatar ||
                      `https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=2563eb&color=ffffff`
                    }
                    alt="Your avatar"
                    className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1">
                    <textarea
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full p-3 border border-neutral-200 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      rows={3}
                    ></textarea>
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!commentText.trim() || isSubmittingComment}
                        className="btn-primary text-sm px-4 py-2 disabled:opacity-50"
                      >
                        {isSubmittingComment ? (
                          <div className="flex items-center">
                            <Loader2 className="animate-spin h-4 w-4 mr-2" />
                            Posting...
                          </div>
                        ) : (
                          <>
                            <Send className="h-4 w-4 mr-2" />
                            Post Comment
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            ) : (
              <div className="bg-neutral-50 rounded-lg p-4 mb-8 text-center">
                <p className="text-neutral-600 mb-2">
                  Please sign in to leave a comment
                </p>
                <Link to="/login" className="btn-primary text-sm">
                  Sign In
                </Link>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {isLoadingComments ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-primary-500" />
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-4">
                    <img
                      src={
                        comment.user.avatar ||
                        `https://ui-avatars.com/api/?name=${comment.user.firstName}+${comment.user.lastName}&background=2563eb&color=ffffff`
                      }
                      alt={`${comment.user.firstName} ${comment.user.lastName}`}
                      className="h-10 w-10 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="bg-neutral-50 rounded-lg p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-neutral-900">
                            {comment.user.firstName} {comment.user.lastName}
                          </span>
                          <span className="text-xs text-neutral-500">
                            @{comment.user.username}
                          </span>
                          {comment.user.verified && (
                            <BadgeCheck className="h-4 w-4 text-blue-500" />
                          )}
                        </div>
                        <p className="text-neutral-700">{comment.content}</p>
                      </div>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                        <span>
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                        <button className="flex items-center space-x-1 hover:text-red-500 transition-colors">
                          <Heart className="h-3 w-3" />
                          <span>{comment.likesCount}</span>
                        </button>
                        {comment.repliesCount > 0 && (
                          <button className="hover:text-primary-500 transition-colors">
                            View {comment.repliesCount}{" "}
                            {comment.repliesCount === 1 ? "reply" : "replies"}
                          </button>
                        )}
                        {isAuthenticated && (
                          <button className="hover:text-primary-500 transition-colors">
                            Reply
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 text-neutral-300 mx-auto mb-3" />
                  <p className="text-neutral-600">No comments yet</p>
                  <p className="text-sm text-neutral-500">
                    Be the first to share your thoughts!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="group"
                >
                  <Link
                    to={`/blog/${relatedPost.slug}`}
                    className="block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-neutral-200"
                  >
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={relatedPost.coverImage}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-neutral-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                        {relatedPost.title}
                      </h3>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span>
                          {new Date(
                            relatedPost.publishedAt
                          ).toLocaleDateString()}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{relatedPost.views}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="h-3 w-3" />
                            <span>{relatedPost.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPostPage;
