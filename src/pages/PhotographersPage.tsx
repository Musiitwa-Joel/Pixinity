import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  MapPin,
  Camera,
  Users,
  Award,
  CheckCircle,
  Eye,
  Heart,
  Download,
  Grid3X3,
  List,
  Star,
  Crown,
  Shield,
} from "lucide-react";
import { Link } from "react-router-dom";
import { User } from "../types";
import toast from "react-hot-toast";

const PhotographersPage: React.FC = () => {
  const [photographers, setPhotographers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<
    "followers" | "uploads" | "views" | "newest"
  >("followers");
  const [filterBy, setFilterBy] = useState<"all" | "verified" | "featured">(
    "all"
  );
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [stats, setStats] = useState({
    totalPhotographers: 0,
    verifiedPhotographers: 0,
    featuredPhotographers: 0,
    totalPhotos: 0,
  });

  useEffect(() => {
    loadPhotographers();
    loadStats();
  }, [searchQuery, sortBy, filterBy]);

  const loadPhotographers = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams({
        search: searchQuery,
        filter: filterBy,
        sort: sortBy,
        limit: "20",
        offset: "0",
      });

      const response = await fetch(
        `http://localhost:5000/api/photographers?${params}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch photographers");
      }

      const data = await response.json();
      setPhotographers(data.photographers);
    } catch (error) {
      console.error("Failed to load photographers:", error);
      toast.error("Failed to load photographers");
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/photographers/stats",
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error("Failed to load stats:", error);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case "company":
        return <Shield className="h-5 w-5 text-blue-500" />;
      default:
        return <Camera className="h-5 w-5 text-primary-500" />;
    }
  };

  const PhotographerCard: React.FC<{ photographer: User; index: number }> = ({
    photographer,
    index,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link
        to={`/@${photographer.username}`}
        className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-200"
      >
        <div className="relative p-8 text-center">
          {/* Avatar */}
          <div className="relative inline-block mb-6">
            <img
              src={
                photographer.avatar ||
                `https://ui-avatars.com/api/?name=${photographer.firstName}+${photographer.lastName}&background=2563eb&color=ffffff&size=120`
              }
              alt={`${photographer.firstName} ${photographer.lastName}`}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-lg mx-auto"
            />
            {photographer.verified && (
              <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white p-2 rounded-full">
                <CheckCircle className="h-4 w-4" />
              </div>
            )}
            {photographer.role === "admin" && (
              <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-2 rounded-full">
                <Crown className="h-4 w-4" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <h3 className="text-xl font-bold text-neutral-900 group-hover:text-primary-600 transition-colors">
                {photographer.firstName} {photographer.lastName}
              </h3>
              {getRoleIcon(photographer.role)}
            </div>
            <p className="text-neutral-600 mb-1">@{photographer.username}</p>
            {/* {photographer.location && (
              <div className="flex items-center justify-center space-x-1 text-sm text-neutral-500">
                <MapPin className="h-4 w-4" />
                <span>{photographer.location}</span>
              </div>
            )} */}
          </div>

          {/* Bio */}
          {/* {photographer.bio && (
            <p className="text-neutral-600 text-sm leading-relaxed mb-6 line-clamp-3">
              {photographer.bio}
            </p>
          )} */}

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900">
                {photographer.uploadsCount}
              </div>
              <div className="text-xs text-neutral-500">Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900">
                {photographer.followersCount.toLocaleString()}
              </div>
              <div className="text-xs text-neutral-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-neutral-900">
                {photographer.totalViews > 0
                  ? photographer.totalViews >= 1000
                    ? `${(photographer.totalViews / 1000).toFixed(0)}K`
                    : photographer.totalViews
                  : 0}
              </div>
              <div className="text-xs text-neutral-500">Views</div>
            </div>
          </div>

          {/* Follow Button */}
          {/* <button className="btn-primary w-full group-hover:scale-105 transition-transform">
            <Users className="mr-2 h-4 w-4" />
            Follow
          </button> */}
        </div>
      </Link>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden">
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
              <Star className="h-5 w-5 text-yellow-300" />
              <span className="font-medium">Discover talented creators</span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="block">Meet our</span>
              <span className="font-cursive text-6xl md:text-7xl bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                photographers
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Connect with talented photographers from around the world.
              Discover their unique perspectives, follow their journeys, and get
              inspired by their incredible work.
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
              placeholder="Search photographers..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Filter */}
            <select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">All Photographers</option>
              <option value="verified">Verified Only</option>
              <option value="featured">Featured</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-4 py-2 bg-white border border-neutral-200 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="followers">Most Followers</option>
              <option value="uploads">Most Photos</option>
              <option value="views">Most Views</option>
              <option value="newest">Newest</option>
            </select>

            {/* View Mode */}
            <div className="flex items-center bg-white border border-neutral-200 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-primary-500 text-white"
                    : "text-neutral-500 hover:text-primary-500"
                }`}
              >
                <Grid3X3 className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-primary-500 text-white"
                    : "text-neutral-500 hover:text-primary-500"
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
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
              icon: Users,
              value: stats.totalPhotographers.toLocaleString(),
              label: "Active Photographers",
              color: "text-blue-500",
            },
            {
              icon: CheckCircle,
              value: stats.verifiedPhotographers.toLocaleString(),
              label: "Verified Creators",
              color: "text-green-500",
            },
            {
              icon: Award,
              value: stats.featuredPhotographers.toLocaleString(),
              label: "Featured Artists",
              color: "text-yellow-500",
            },
            {
              icon: Camera,
              value: stats.totalPhotos.toLocaleString(),
              label: "Photos Shared",
              color: "text-purple-500",
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

        {/* Photographers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border border-neutral-200"
                >
                  <div className="text-center">
                    <div className="h-24 w-24 bg-neutral-200 rounded-full mx-auto mb-6 animate-pulse" />
                    <div className="h-6 bg-neutral-200 rounded animate-pulse mb-2" />
                    <div className="h-4 bg-neutral-200 rounded animate-pulse mb-4 w-3/4 mx-auto" />
                    <div className="h-4 bg-neutral-200 rounded animate-pulse mb-6" />
                    <div className="h-10 bg-neutral-200 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {photographers.map((photographer, index) => (
                <PhotographerCard
                  key={photographer.id}
                  photographer={photographer}
                  index={index}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {!isLoading && photographers.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="max-w-md mx-auto">
              <div className="h-32 w-32 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-16 w-16 text-neutral-400" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No photographers found
              </h3>
              <p className="text-neutral-600">
                Try adjusting your search criteria or explore different filters.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PhotographersPage;
