import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  Eye,
  Calendar,
  User,
  Tag,
  Save,
  Image,
  ArrowLeft,
  Upload,
  CheckCircle,
  XCircle,
  MessageCircle,
  Heart,
  Loader2,
  Star,
} from "lucide-react";
import toast from "react-hot-toast";

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
  published: boolean;
  featured: boolean;
  views: number;
  likes: number;
  comments: number;
  readTime: number;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  featuredPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  uniqueAuthors: number;
  categories: string[];
}

const AdminBlog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState<BlogStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    featuredPosts: 0,
    totalViews: 0,
    totalLikes: 0,
    totalComments: 0,
    uniqueAuthors: 0,
    categories: [],
  });

  // Form state for editing posts
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    coverImage: "",
    category: "",
    tags: "",
    published: true,
    featured: false,
  });

  useEffect(() => {
    fetchPosts();
    fetchStats();
  }, []);

  useEffect(() => {
    filterPosts();
  }, [posts, searchQuery, statusFilter, sortBy]);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blog/stats", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
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

      // Include both published and draft posts for admin
      // params.append('published', 'all');
      params.append("limit", "50");
      params.append("offset", "0");

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
      toast.error("Failed to load blog posts");
    } finally {
      setIsLoading(false);
    }
  };

  const filterPosts = () => {
    let result = [...posts];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.content.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "published") {
        result = result.filter((post) => post.published);
      } else if (statusFilter === "draft") {
        result = result.filter((post) => !post.published);
      } else if (statusFilter === "featured") {
        result = result.filter((post) => post.featured);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "z-a":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "most-viewed":
        result.sort((a, b) => b.views - a.views);
        break;
      case "most-liked":
        result.sort((a, b) => b.likes - a.likes);
        break;
      case "most-commented":
        result.sort((a, b) => b.comments - a.comments);
        break;
      default: // newest
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    setFilteredPosts(result);
  };

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: `post-${Date.now()}`,
      title: "New Blog Post",
      slug: "new-blog-post",
      excerpt: "Write a short excerpt for your blog post here.",
      content: "# New Blog Post\n\nStart writing your content here...",
      coverImage: "",
      category: "",
      tags: [],
      published: false,
      featured: false,
      views: 0,
      likes: 0,
      comments: 0,
      readTime: 1,
      author: {
        id: "",
        name: "",
        username: "",
        avatar: "",
        role: "",
      },
      publishedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentPost(newPost);
    setFormData({
      title: newPost.title,
      slug: newPost.slug,
      excerpt: newPost.excerpt,
      content: newPost.content,
      coverImage: newPost.coverImage,
      category: newPost.category,
      tags: newPost.tags.join(", "),
      published: newPost.published,
      featured: newPost.featured,
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverImage: post.coverImage || "",
      category: post.category || "",
      tags: post.tags.join(", "),
      published: post.published,
      featured: post.featured,
    });
    setIsEditing(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${postId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      setPosts(posts.filter((post) => post.id !== postId));
      toast.success("Post deleted successfully");
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Failed to delete post");
    }
  };

  const handleTogglePublish = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${postId}/toggle-published`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update publish status");
      }

      const data = await response.json();

      // Update local state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                published: data.published,
                publishedAt: data.publishedAt,
                updatedAt: new Date().toISOString(),
              }
            : post
        )
      );

      toast.success(
        `Post ${data.published ? "published" : "unpublished"} successfully`
      );
      fetchStats(); // Refresh stats after status change
    } catch (error) {
      console.error("Error toggling publish status:", error);
      toast.error("Failed to update publish status");
    }
  };

  const handleToggleFeatured = async (postId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/blog/posts/${postId}/toggle-featured`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update featured status");
      }

      const data = await response.json();

      // Update local state
      setPosts(
        posts.map((post) =>
          post.id === postId
            ? {
                ...post,
                featured: data.featured,
                updatedAt: new Date().toISOString(),
              }
            : post
        )
      );

      toast.success(
        `Post ${data.featured ? "featured" : "unfeatured"} successfully`
      );
      fetchStats(); // Refresh stats after status change
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleSavePost = async () => {
    if (!currentPost) return;

    setIsSaving(true);
    try {
      const isNewPost = currentPost.id.startsWith("post-");

      const postData = {
        title: formData.title,
        slug: formData.slug,
        excerpt: formData.excerpt,
        content: formData.content,
        coverImage: formData.coverImage,
        category: formData.category,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag),
        published: formData.published,
        featured: formData.featured,
      };

      let response;

      if (isNewPost) {
        // Create new post
        response = await fetch("http://localhost:5000/api/blog/posts", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
      } else {
        // Update existing post
        response = await fetch(
          `http://localhost:5000/api/blog/posts/${currentPost.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save post");
      }

      const data = await response.json();

      if (isNewPost) {
        // Add new post to the list
        setPosts([data.post, ...posts]);
      } else {
        // Update existing post in the list
        setPosts(
          posts.map((post) => (post.id === currentPost.id ? data.post : post))
        );
      }

      toast.success(data.message);
      setIsEditing(false);
      setCurrentPost(null);
      fetchStats(); // Refresh stats after saving
    } catch (error: any) {
      console.error("Error saving post:", error);
      toast.error(error.message || "Failed to save post");
    } finally {
      setIsSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, "-");
  };

  const handleUploadCoverImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files || e.target.files.length === 0) return;

    const file = e.target.files[0];

    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Check file type
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        "http://localhost:5000/api/blog/upload-cover",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();

      setFormData({
        ...formData,
        coverImage: data.imageUrl,
      });

      toast.success("Cover image uploaded successfully");
    } catch (error) {
      console.error("Error uploading cover image:", error);
      toast.error("Failed to upload cover image");
    }
  };

  return (
    <div>
      {isEditing ? (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-700" />
              </button>
              <h1 className="text-3xl font-bold text-neutral-900">
                {currentPost?.id.includes("post-")
                  ? "Create New Post"
                  : "Edit Post"}
              </h1>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setIsEditing(false)}
                className="btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={handleSavePost}
                disabled={isSaving}
                className="btn-primary flex items-center space-x-2"
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="animate-spin h-4 w-4" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Save Post</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      title: e.target.value,
                      slug: generateSlug(e.target.value),
                    });
                  }}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Slug
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) =>
                    setFormData({ ...formData, slug: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="post-slug"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Excerpt
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) =>
                  setFormData({ ...formData, excerpt: e.target.value })
                }
                rows={2}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Write a short excerpt..."
              ></textarea>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Cover Image
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={formData.coverImage}
                  onChange={(e) =>
                    setFormData({ ...formData, coverImage: e.target.value })
                  }
                  className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="https://example.com/image.jpg"
                />
                <label className="btn-outline cursor-pointer">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadCoverImage}
                    className="hidden"
                  />
                </label>
              </div>
              {formData.coverImage && (
                <div className="mt-2">
                  <img
                    src={formData.coverImage}
                    alt="Cover preview"
                    className="h-40 w-full object-cover rounded-lg"
                  />
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Select a category</option>
                  {stats.categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                  <option value="Photography Tips">Photography Tips</option>
                  <option value="Gear Reviews">Gear Reviews</option>
                  <option value="Tutorials">Tutorials</option>
                  <option value="Industry News">Industry News</option>
                  <option value="Artist Spotlight">Artist Spotlight</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="tag1, tag2, tag3"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Content (Markdown)
              </label>
              <textarea
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                rows={12}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 font-mono"
                placeholder="Write your post content in Markdown..."
              ></textarea>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-700">
                  Publish this post
                </span>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <span className="ml-2 text-sm text-neutral-700">
                  Feature this post on the homepage
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Blog Management
              </h1>
              <p className="text-neutral-600">
                Create, edit, and manage your blog posts
              </p>
            </div>
            <button
              onClick={handleCreatePost}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Post</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Posts",
                value: stats.totalPosts,
                icon: FileText,
                color: "text-blue-500",
                bgColor: "bg-blue-100",
              },
              {
                title: "Published",
                value: stats.publishedPosts,
                icon: CheckCircle,
                color: "text-green-500",
                bgColor: "bg-green-100",
              },
              {
                title: "Drafts",
                value: stats.draftPosts,
                icon: FileText,
                color: "text-orange-500",
                bgColor: "bg-orange-100",
              },
              {
                title: "Featured",
                value: stats.featuredPosts,
                icon: Star,
                color: "text-yellow-500",
                bgColor: "bg-yellow-100",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Engagement Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                title: "Total Views",
                value: stats.totalViews.toLocaleString(),
                icon: Eye,
                color: "text-purple-500",
                bgColor: "bg-purple-100",
              },
              {
                title: "Total Likes",
                value: stats.totalLikes.toLocaleString(),
                icon: Heart,
                color: "text-red-500",
                bgColor: "bg-red-100",
              },
              {
                title: "Total Comments",
                value: stats.totalComments.toLocaleString(),
                icon: MessageCircle,
                color: "text-teal-500",
                bgColor: "bg-teal-100",
              },
            ].map((stat) => (
              <div
                key={stat.title}
                className="bg-white rounded-xl p-6 border border-neutral-200 shadow-sm"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-neutral-900">
                      {stat.value}
                    </div>
                    <div className="text-sm text-neutral-600">{stat.title}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search posts..."
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-64"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Posts</option>
                <option value="published">Published</option>
                <option value="draft">Drafts</option>
                <option value="featured">Featured</option>
              </select>

              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="a-z">A-Z</option>
                <option value="z-a">Z-A</option>
                <option value="most-viewed">Most Views</option>
                <option value="most-liked">Most Likes</option>
                <option value="most-commented">Most Comments</option>
              </select>
            </div>

            <button
              onClick={fetchPosts}
              className="btn-outline flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Blog Posts */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              </div>
            ) : filteredPosts.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {filteredPosts.map((post) => (
                  <div key={post.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {post.title}
                          </h3>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              post.published
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {post.published ? "Published" : "Draft"}
                          </span>
                          {post.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                        </div>
                        <p className="text-neutral-600 mb-3 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center text-sm text-neutral-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              {post.publishedAt
                                ? new Date(
                                    post.publishedAt
                                  ).toLocaleDateString()
                                : "Not published"}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author.name}</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{post.views.toLocaleString()} views</span>
                          </div>
                          <div className="flex items-center">
                            <Tag className="h-4 w-4 mr-1" />
                            <span>{post.tags.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleTogglePublish(post.id)}
                          className={`p-2 rounded-md ${
                            post.published
                              ? "text-green-500 hover:bg-green-50"
                              : "text-yellow-500 hover:bg-yellow-50"
                          }`}
                          title={post.published ? "Unpublish" : "Publish"}
                        >
                          {post.published ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(post.id)}
                          className={`p-2 rounded-md ${
                            post.featured
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-neutral-500 hover:bg-neutral-100"
                          }`}
                          title={post.featured ? "Unfeature" : "Feature"}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              post.featured ? "fill-amber-500" : ""
                            }`}
                          />
                        </button>
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-md"
                          title="View post"
                        >
                          <Eye className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => handleEditPost(post)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-md"
                          title="Edit post"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          title="Delete post"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <FileText className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                  No blog posts found
                </h3>
                <p className="text-neutral-500 mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first blog post"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <button
                    onClick={handleCreatePost}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Create First Post
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBlog;
