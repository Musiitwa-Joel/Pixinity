import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  User,
  Clock,
  Eye,
  Heart,
  Share2,
  BookOpen,
  Tag,
  Search,
  Filter,
  TrendingUp,
  Star,
  ArrowRight,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

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

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  uniqueAuthors: number;
}

const BlogPage: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    uniqueAuthors: 0,
  });
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchStats();
    fetchPosts();
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [selectedCategory, searchQuery]);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog/stats", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setStats({
          totalPosts: data.totalPosts,
          publishedPosts: data.publishedPosts,
          totalViews: data.totalViews,
          totalLikes: data.totalLikes,
          totalComments: data.totalComments,
          uniqueAuthors: data.uniqueAuthors,
        });
        setCategories(data.categories);
      } else {
        console.error("Failed to fetch blog stats:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching blog stats:", error);
    }
  };

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();
      params.append("published", "true");
      params.append("limit", "20");
      params.append("offset", "0");

      if (searchQuery) {
        params.append("search", searchQuery);
      }

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }

      console.log(
        "Fetching blog posts with params:",
        Object.fromEntries(params)
      );

      // Fetch from API
      const response = await fetch(
        `http://localhost:5000/api/blog/posts?${params}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch blog posts: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Fetched ${data.posts.length} blog posts`);
      setPosts(data.posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const BlogPostCard: React.FC<{
    post: BlogPost;
    index: number;
    featured?: boolean;
  }> = ({ post, index, featured = false }) => (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className={`group ${featured ? "md:col-span-2" : ""}`}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200"
      >
        {/* Cover Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? "aspect-[2/1]" : "aspect-video"
          }`}
        >
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {post.featured && (
            <div className="absolute top-4 left-4">
              <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                <Star className="h-3 w-3" />
                <span>Featured</span>
              </div>
            </div>
          )}

          <div className="absolute top-4 right-4">
            <span className="bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className={`p-6 ${featured ? "md:p-8" : ""}`}>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={
                post.author.avatar ||
                `https://ui-avatars.com/api/?name=${post.author.name.replace(
                  " ",
                  "+"
                )}&background=2563eb&color=ffffff`
              }
              alt={post.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-neutral-900">{post.author.name}</p>
              <p className="text-sm text-neutral-500">{post.author.role}</p>
            </div>
          </div>

          <h2
            className={`font-bold text-neutral-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 ${
              featured ? "text-2xl md:text-3xl" : "text-xl"
            }`}
          >
            {post.title}
          </h2>

          <p
            className={`text-neutral-600 mb-4 line-clamp-3 leading-relaxed ${
              featured ? "text-lg" : ""
            }`}
          >
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between text-sm text-neutral-500 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-neutral-500">
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{post.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Heart className="h-4 w-4" />
                <span>{post.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="h-4 w-4" />
                <span>{post.comments}</span>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-primary-600 group-hover:text-primary-700 transition-colors">
              <span className="text-sm font-medium">Read more</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.article>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10zm-20 0c0-5.5 4.5-10 10-10s10 4.5 10 10-4.5 10-10 10-10-4.5-10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <BookOpen className="h-5 w-5 text-emerald-300" />
              <span className="font-medium">
                Photography insights & inspiration
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="block">Photography</span>
              <span className="font-cursive text-6xl md:text-7xl bg-gradient-to-r from-emerald-300 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                blog
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Discover expert tips, gear reviews, tutorials, and inspiring
              stories from the world of photography. Learn from professionals
              and elevate your craft.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <motion.div
          className="flex flex-col lg:flex-row lg:items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative max-w-md mb-6 lg:mb-0">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            <button
              key="all"
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                  : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                    : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {[
            {
              icon: BookOpen,
              value: stats.publishedPosts.toString(),
              label: "Articles Published",
              color: "text-emerald-500",
            },
            {
              icon: Eye,
              value: stats.totalViews.toLocaleString(),
              label: "Total Views",
              color: "text-blue-500",
            },
            {
              icon: User,
              value: stats.uniqueAuthors.toString(),
              label: "Expert Contributors",
              color: "text-purple-500",
            },
            {
              icon: Heart,
              value: stats.totalLikes.toLocaleString(),
              label: "Total Likes",
              color: "text-red-500",
            },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-neutral-100 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    {stat.value}
                  </div>
                  <div className="text-sm text-neutral-600">{stat.label}</div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, index) => (
                <BlogPostCard
                  key={post.id}
                  post={post}
                  index={index}
                  featured={post.featured && index < 2}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {!isLoading && posts.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md mx-auto">
              <div className="h-32 w-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-16 w-16 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No articles found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search or browse different categories.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
