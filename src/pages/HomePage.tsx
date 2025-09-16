import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Camera,
  Upload,
  Heart,
  Globe,
  Users,
  FileText,
  Bookmark,
  Shield,
  Scale,
  MessageCircle,
  AlertTriangle,
  Calendar,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../contexts/AppContext";
import { useLanguage } from "../contexts/LanguageContext";
import PhotoGrid from "../components/Common/PhotoGrid";
import { Photo } from "../types";

const HomePage: React.FC = () => {
  const { openUploadModal } = useApp();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredPhotos, setFeaturedPhotos] = useState<Photo[]>([]);
  const [testimonies, setTestimonies] = useState<Photo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedContent();
  }, []);

  const fetchFeaturedContent = async () => {
    setIsLoading(true);
    try {
      // Fetch featured photos (evidence)
      const featuredResponse = await fetch(
        "http://localhost:5000/api/photos?category=evidence&limit=12",
        { credentials: "include" }
      );

      // Fetch testimonies
      const testimoniesResponse = await fetch(
        "http://localhost:5000/api/photos?category=testimony&limit=8",
        { credentials: "include" }
      );

      if (featuredResponse.ok && testimoniesResponse.ok) {
        const featuredData = await featuredResponse.json();
        const testimoniesData = await testimoniesResponse.json();

        setFeaturedPhotos(featuredData.photos || []);
        setTestimonies(testimoniesData.photos || []);
      }
    } catch (error) {
      console.error("Failed to fetch content:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/2531709/pexels-photo-2531709.jpeg"
            alt="Children in Gaza"
            className="w-full h-full object-cover opacity-40"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
              <Scale className="h-5 w-5 text-amber-300" />
              <span className="font-medium">
                Documenting Truth • Seeking Justice
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              <span className="block">Bearing Witness to the</span>
              <span className="font-cursive text-5xl md:text-7xl bg-gradient-to-r from-amber-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Human Cost of War
              </span>
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              This platform exists to collect and present verifiable evidence of
              civilian suffering in Gaza, particularly of children and
              non-combatants, to support justice and accountability.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openUploadModal}
                className="btn bg-white text-neutral-900 hover:bg-neutral-100 text-lg px-8 py-4 group shadow-2xl"
              >
                <Upload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                <span>Submit Evidence</span>
              </button>

              <Link
                to="/testimonies"
                className="btn-glass text-lg px-8 py-4 group"
              >
                <FileText className="mr-2 h-5 w-5" />
                <span>View Testimonies</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              We stand for human dignity, truth, and accountability, not
              vengeance. This platform is not political—it does not represent
              Israel or Hamas. It is a space for documenting suffering,
              preserving testimonies, and highlighting the human cost of
              conflict to support justice at the International Criminal Court
              (ICC) and other humanitarian forums.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-neutral-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Document</h3>
                <p className="text-neutral-600">
                  Collect and verify evidence of civilian suffering to create an
                  accurate historical record.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Amplify</h3>
                <p className="text-neutral-600">
                  Share the stories of survivors and witnesses to ensure their
                  voices are heard.
                </p>
              </div>

              <div className="bg-neutral-50 p-6 rounded-xl">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Scale className="h-6 w-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Seek Justice</h3>
                <p className="text-neutral-600">
                  Support legal accountability for violations of international
                  humanitarian law.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Evidence */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-4 py-1 text-sm font-medium mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <span>Sensitive Content</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  Documented Evidence
                </h2>
                <p className="text-neutral-600 max-w-2xl">
                  Verified photographic evidence of civilian impact. These
                  images may be disturbing but are essential for documenting the
                  truth.
                </p>
              </div>

              <Link
                to="/explore"
                className="mt-4 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View All Evidence
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-neutral-200 rounded-xl animate-pulse"
                  />
                ))}
              </div>
            ) : featuredPhotos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {featuredPhotos.map((photo) => (
                  <div
                    key={photo.id}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/photos/${photo.id}`)}
                  >
                    <div className="aspect-square bg-neutral-200 rounded-xl overflow-hidden relative">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <h3 className="font-bold text-lg mb-1 line-clamp-1">
                          {photo.title}
                        </h3>
                        <p className="text-sm text-white/80 line-clamp-2">
                          {photo.description}
                        </p>
                        <div className="flex items-center mt-2 text-xs text-white/70">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(photo.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white rounded-xl border border-neutral-200">
                <Camera className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No evidence uploaded yet
                </h3>
                <p className="text-neutral-600 mb-6">
                  Be the first to contribute to this important documentation
                  effort.
                </p>
                <button onClick={openUploadModal} className="btn-primary">
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Evidence
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Testimonies */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1 text-sm font-medium mb-4">
                  <MessageCircle className="h-4 w-4" />
                  <span>Survivor Stories</span>
                </div>
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                  Testimonies
                </h2>
                <p className="text-neutral-600 max-w-2xl">
                  First-hand accounts from survivors and witnesses, preserving
                  their experiences and perspectives.
                </p>
              </div>

              <Link
                to="/testimonies"
                className="mt-4 md:mt-0 inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
              >
                View All Testimonies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-neutral-100 p-6 rounded-xl animate-pulse"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-12 h-12 bg-neutral-200 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-neutral-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-neutral-200 rounded w-1/4"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 bg-neutral-200 rounded"></div>
                      <div className="h-3 bg-neutral-200 rounded"></div>
                      <div className="h-3 bg-neutral-200 rounded w-2/3"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : testimonies.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {testimonies.map((testimony) => (
                  <div
                    key={testimony.id}
                    className="bg-neutral-50 p-6 rounded-xl border border-neutral-200 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <img
                        src={
                          testimony.photographer.avatar ||
                          `https://ui-avatars.com/api/?name=${testimony.photographer.firstName}+${testimony.photographer.lastName}&background=2563eb&color=ffffff`
                        }
                        alt={testimony.photographer.username}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-neutral-900">
                          {testimony.photographer.firstName}{" "}
                          {testimony.photographer.lastName}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {new Date(testimony.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <h4 className="font-semibold text-lg mb-3">
                      {testimony.title}
                    </h4>
                    <p className="text-neutral-700 mb-4 line-clamp-3">
                      {testimony.description}
                    </p>
                    <Link
                      to={`/photos/${testimony.id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center"
                    >
                      Read Full Testimony
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-neutral-50 rounded-xl border border-neutral-200">
                <MessageCircle className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  No testimonies shared yet
                </h3>
                <p className="text-neutral-600 mb-6">
                  Be the first to share a testimony or survivor story.
                </p>
                <button onClick={openUploadModal} className="btn-primary">
                  <Upload className="mr-2 h-4 w-4" />
                  Share a Testimony
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* How You Can Help */}
      <section className="py-16 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How You Can Help
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Join our efforts to document, preserve, and seek justice for the
              civilian victims of conflict.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                <Camera className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Submit Evidence
              </h3>
              <p className="text-neutral-600 mb-6">
                Share verified photos, videos, or documents that provide
                evidence of civilian impact in Gaza.
              </p>
              <button onClick={openUploadModal} className="btn-primary w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Evidence
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Share Testimonies
              </h3>
              <p className="text-neutral-600 mb-6">
                Record and share first-hand accounts, survivor stories, and
                witness testimonies.
              </p>
              <Link
                to="/testimonies"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                Share Your Story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl border border-neutral-200 hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900 mb-3">
                Spread Awareness
              </h3>
              <p className="text-neutral-600 mb-6">
                Share verified content from this platform to raise awareness
                about the humanitarian crisis.
              </p>
              <Link
                to="/explore"
                className="btn-primary w-full inline-flex items-center justify-center"
              >
                <Heart className="mr-2 h-4 w-4" />
                Explore & Share
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">
              Stand for Truth and Justice
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
              Every piece of evidence, every testimony, and every act of witness
              matters. Join us in documenting the truth and advocating for the
              protection of human rights.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openUploadModal}
                className="btn bg-white text-amber-700 hover:bg-neutral-100 text-lg px-8 py-4"
              >
                <Camera className="mr-2 h-5 w-5" />
                Submit Evidence
              </button>

              <Link to="/about" className="btn-glass text-lg px-8 py-4">
                Learn More About Our Mission
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-neutral-900 mb-6">
              Search the Archive
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Find specific evidence, testimonies, or documentation by keyword,
              location, or date.
            </p>

            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for evidence, testimonies, locations..."
                  className="w-full pl-12 pr-4 py-4 bg-neutral-100 border-0 rounded-xl text-lg placeholder-neutral-500 focus:bg-white focus:ring-2 focus:ring-amber-500 focus:outline-none transition-all"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-amber-500 text-white rounded-lg px-4 py-2 hover:bg-amber-600 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
