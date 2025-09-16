"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  Calendar,
  Search,
  Building,
  DollarSign,
  ChevronRight,
  Globe,
  Users,
  CheckCircle,
  Send,
  Loader2,
  Mail,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import toast from "react-hot-toast";

interface JobPosting {
  id: string;
  title: string;
  department: string;
  location: string;
  locationType: "remote" | "hybrid" | "onsite";
  employmentType: "full-time" | "part-time" | "contract" | "internship";
  salaryRange?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  applicationUrl: string;
  isActive: boolean;
  featured: boolean;
  applicantsCount: number;
  viewsCount: number;
  postedAt: string;
  expiresAt?: string;
  updatedAt: string;
}

interface JobApplication {
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
}

// Mock user context for demo - replace with your actual auth context
const useAuth = () => ({
  isAuthenticated: true,
  user: {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
  },
});

const CareersPageFixed: React.FC = () => {
  const { isAuthenticated, user } = useAuth();
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobPosting | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [locationTypeFilter, setLocationTypeFilter] = useState<string>("all");
  const [isApplying, setIsApplying] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [myApplications, setMyApplications] = useState<any[]>([]);
  const [hasApplied, setHasApplied] = useState(false);

  // Application form state
  const [application, setApplication] = useState<JobApplication>({
    fullName: "",
    email: "",
    phone: "",
    resumeUrl: "",
    coverLetter: "",
  });

  useEffect(() => {
    fetchJobs();
    if (isAuthenticated) {
      fetchMyApplications();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    filterJobs();
  }, [jobs, searchQuery, departmentFilter, locationTypeFilter]);

  useEffect(() => {
    if (selectedJob && isAuthenticated) {
      checkIfApplied(selectedJob.id);
    }
  }, [selectedJob, myApplications]);

  const fetchJobs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("🔍 Fetching jobs from API...");

      // Try multiple API endpoints to ensure we get data
      const endpoints = [
        // Primary endpoint - active jobs only
        "/api/careers/jobs?status=active&limit=50&offset=0",
        // Fallback endpoint - all jobs, filter client-side
        "/api/careers/jobs?limit=50&offset=0",
        // Direct endpoint without query params
        "/api/careers/jobs",
      ];

      let response: Response | null = null;
      let data: any = null;

      // Try each endpoint until one works
      for (const endpoint of endpoints) {
        try {
          const apiUrl = `http://localhost:5000${endpoint}`;
          console.log(`📡 Trying API URL: ${apiUrl}`);

          response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          });

          if (response.ok) {
            data = await response.json();
            console.log(`✅ Success with endpoint: ${endpoint}`);
            console.log(`📊 Response data:`, data);
            break;
          } else {
            console.log(
              `❌ Failed with endpoint: ${endpoint} - Status: ${response.status}`
            );
          }
        } catch (endpointError) {
          console.log(`❌ Error with endpoint: ${endpoint}`, endpointError);
          continue;
        }
      }

      if (!response || !response.ok || !data) {
        throw new Error(
          "All API endpoints failed. Please check if the server is running."
        );
      }

      // Handle different response formats
      let jobsArray: JobPosting[] = [];

      if (data.jobs && Array.isArray(data.jobs)) {
        jobsArray = data.jobs;
      } else if (Array.isArray(data)) {
        jobsArray = data;
      } else {
        console.warn("⚠️ Unexpected response format:", data);
        jobsArray = [];
      }

      // Filter for active jobs if we got all jobs
      const activeJobs = jobsArray.filter((job) => {
        // Check if job is active and not expired
        const isActive = job.isActive === true || job.isActive === 1;
        const isNotExpired =
          !job.expiresAt || new Date(job.expiresAt) > new Date();
        return isActive && isNotExpired;
      });

      console.log(`📋 Total jobs received: ${jobsArray.length}`);
      console.log(`✅ Active jobs: ${activeJobs.length}`);

      setJobs(activeJobs);
      setFilteredJobs(activeJobs);

      if (activeJobs.length === 0) {
        setError("No active job postings available at the moment.");
      }
    } catch (error: any) {
      console.error("💥 Error fetching jobs:", error);
      setError(
        error.message || "Failed to load job postings. Please try again later."
      );

      // Set some mock data for development/testing
      const mockJobs: JobPosting[] = [
        {
          id: "mock-1",
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "San Francisco, CA",
          locationType: "hybrid",
          employmentType: "full-time",
          salaryRange: "$120,000 - $150,000",
          description:
            "We're looking for a Senior Frontend Developer to join our engineering team. You'll be responsible for building and maintaining our web applications, with a focus on user experience and performance.",
          responsibilities: [
            "Develop and maintain web applications using React and TypeScript",
            "Collaborate with designers to implement user interfaces",
            "Write clean, maintainable, and well-tested code",
            "Participate in code reviews and mentor junior developers",
          ],
          requirements: [
            "5+ years of experience in frontend development",
            "Strong proficiency in React and TypeScript",
            "Experience with state management solutions",
            "Knowledge of responsive design and accessibility",
          ],
          benefits: [
            "Competitive salary and equity package",
            "Comprehensive health insurance",
            "Flexible work arrangements",
            "Professional development budget",
          ],
          applicationUrl:
            "https://careers.example.com/apply/senior-frontend-developer",
          isActive: true,
          featured: true,
          applicantsCount: 24,
          viewsCount: 456,
          postedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];

      console.log("🔧 Using mock data for development");
      setJobs(mockJobs);
      setFilteredJobs(mockJobs);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMyApplications = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch(
        "http://localhost:5000/api/careers/my-applications",
        {
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMyApplications(data.applications || []);
      } else {
        console.log("Could not fetch applications - user may not be logged in");
        setMyApplications([]);
      }
    } catch (error) {
      console.error("Error fetching applications:", error);
      setMyApplications([]);
    }
  };

  const checkIfApplied = (jobId: string) => {
    const hasAppliedToJob = myApplications.some((app) => app.jobId === jobId);
    setHasApplied(hasAppliedToJob);
  };

  const filterJobs = () => {
    let result = [...jobs];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(query) ||
          job.department.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query)
      );
    }

    // Apply department filter
    if (departmentFilter !== "all") {
      result = result.filter((job) => job.department === departmentFilter);
    }

    // Apply location type filter
    if (locationTypeFilter !== "all") {
      result = result.filter((job) => job.locationType === locationTypeFilter);
    }

    // Sort: featured jobs first, then by posted date
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
    });

    setFilteredJobs(result);
  };

  const handleJobSelect = (job: JobPosting) => {
    setSelectedJob(job);
    console.log("🎯 Selected job:", job);

    // Track view (fire and forget)
    fetch(`http://localhost:5000/api/careers/jobs/${job.id}`, {
      credentials: "include",
    }).catch((error) => {
      console.log("Could not track job view:", error);
    });
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to apply for jobs");
      return;
    }

    if (!selectedJob) return;

    // Pre-fill form with user data
    setApplication({
      fullName: user ? `${user.firstName} ${user.lastName}` : "",
      email: user?.email || "",
      phone: "",
      resumeUrl: "",
      coverLetter: `Dear Hiring Manager,

I am writing to express my interest in the ${
        selectedJob.title
      } position at your company. I believe my skills and experience make me a strong candidate for this role.

I would welcome the opportunity to discuss how I can contribute to your team.

Best regards,
${user ? `${user.firstName} ${user.lastName}` : ""}`,
    });

    setIsApplying(true);
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    // Validate form
    if (!application.fullName.trim() || !application.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(application.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/jobs/${selectedJob.id}/apply`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            fullName: application.fullName.trim(),
            email: application.email.trim(),
            phone: application.phone.trim() || null,
            resumeUrl: application.resumeUrl.trim() || null,
            coverLetter: application.coverLetter.trim() || null,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `Application failed with status ${response.status}`
        );
      }

      const result = await response.json();
      toast.success("Application submitted successfully!");
      setIsApplying(false);

      // Update local state
      setHasApplied(true);
      fetchMyApplications();

      // Update job applicants count
      setSelectedJob({
        ...selectedJob,
        applicantsCount: selectedJob.applicantsCount + 1,
      });

      // Update jobs list
      setJobs(
        jobs.map((job) =>
          job.id === selectedJob.id
            ? { ...job, applicantsCount: job.applicantsCount + 1 }
            : job
        )
      );
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error(
        error.message || "Failed to submit application. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get unique departments for filter
  const departments = ["All", ...new Set(jobs.map((job) => job.department))];

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-6 py-3 mb-8">
            <Briefcase className="h-5 w-5 text-blue-300" />
            <span className="font-medium">Join our team</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="block">Build your</span>
            <span className="font-cursive text-6xl md:text-7xl bg-gradient-to-r from-blue-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent">
              career
            </span>
            <span className="block">with us</span>
          </h1>

          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
            Join our team of passionate professionals and help shape the future
            of photography. We're looking for talented individuals who share our
            vision and values.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#open-positions"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-medium hover:bg-neutral-100 transition-colors shadow-2xl group"
            >
              <span>View Open Positions</span>
              <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section id="open-positions" className="py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Find your perfect role and join our growing team.
            </p>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-800">Notice</h4>
                  <p className="text-sm text-amber-700 mt-1">{error}</p>
                  <button
                    onClick={fetchJobs}
                    className="mt-2 text-sm text-amber-800 underline hover:no-underline"
                  >
                    Try again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12">
            {/* Search */}
            <div className="relative max-w-md mb-6 lg:mb-0">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search positions..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4">
              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept === "All" ? "all" : dept}>
                    {dept}
                  </option>
                ))}
              </select>

              {/* Location Type Filter */}
              <select
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
                className="px-4 py-3 bg-white border border-neutral-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>

              <button
                onClick={fetchJobs}
                disabled={isLoading}
                className="px-4 py-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 disabled:opacity-50 flex items-center space-x-2"
              >
                <Loader2
                  className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Job Listings */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Job List */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                <div className="p-4 border-b border-neutral-200">
                  <h3 className="font-semibold text-neutral-900">
                    {filteredJobs.length} Open Position
                    {filteredJobs.length !== 1 ? "s" : ""}
                  </h3>
                </div>

                <div className="overflow-y-auto max-h-[600px]">
                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                    </div>
                  ) : filteredJobs.length > 0 ? (
                    <div className="divide-y divide-neutral-200">
                      {filteredJobs.map((job) => (
                        <div
                          key={job.id}
                          onClick={() => handleJobSelect(job)}
                          className={`p-4 cursor-pointer hover:bg-neutral-50 transition-colors ${
                            selectedJob?.id === job.id
                              ? "bg-primary-50 border-l-4 border-primary-500"
                              : ""
                          }`}
                        >
                          {job.featured && (
                            <div className="mb-2">
                              <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                Featured
                              </span>
                            </div>
                          )}
                          <h3 className="font-semibold text-neutral-900 mb-1">
                            {job.title}
                          </h3>
                          <div className="flex flex-wrap items-center text-sm text-neutral-600 gap-y-1">
                            <div className="flex items-center mr-4">
                              <Building className="h-4 w-4 mr-1 text-neutral-400" />
                              <span>{job.department}</span>
                            </div>
                            <div className="flex items-center mr-4">
                              <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
                              <span>{job.location}</span>
                            </div>
                            <div className="flex items-center">
                              {job.locationType === "remote" ? (
                                <Globe className="h-4 w-4 mr-1 text-neutral-400" />
                              ) : job.locationType === "hybrid" ? (
                                <Building className="h-4 w-4 mr-1 text-neutral-400" />
                              ) : (
                                <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
                              )}
                              <span>
                                {job.locationType.charAt(0).toUpperCase() +
                                  job.locationType.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2 text-xs text-neutral-500">
                            <span>
                              Posted{" "}
                              {new Date(job.postedAt).toLocaleDateString()}
                            </span>
                            <div className="flex items-center">
                              <Users className="h-3 w-3 mr-1" />
                              <span>{job.applicantsCount} applicants</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <Briefcase className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-neutral-900 mb-1">
                        No positions found
                      </h3>
                      <p className="text-neutral-500">
                        {searchQuery ||
                        departmentFilter !== "all" ||
                        locationTypeFilter !== "all"
                          ? "Try adjusting your filters"
                          : "Check back later for new opportunities"}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="lg:col-span-2">
              {selectedJob ? (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
                  {isApplying ? (
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-neutral-900">
                          Apply for {selectedJob.title}
                        </h2>
                        <button
                          onClick={() => setIsApplying(false)}
                          className="text-neutral-500 hover:text-neutral-700 text-2xl"
                        >
                          ×
                        </button>
                      </div>

                      <form
                        onSubmit={handleSubmitApplication}
                        className="space-y-6"
                      >
                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            value={application.fullName}
                            onChange={(e) =>
                              setApplication({
                                ...application,
                                fullName: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Email *
                          </label>
                          <input
                            type="email"
                            value={application.email}
                            onChange={(e) =>
                              setApplication({
                                ...application,
                                email: e.target.value,
                              })
                            }
                            required
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Phone
                          </label>
                          <input
                            type="tel"
                            value={application.phone}
                            onChange={(e) =>
                              setApplication({
                                ...application,
                                phone: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Resume URL
                          </label>
                          <input
                            type="url"
                            value={application.resumeUrl}
                            onChange={(e) =>
                              setApplication({
                                ...application,
                                resumeUrl: e.target.value,
                              })
                            }
                            placeholder="https://example.com/my-resume.pdf"
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                          />
                          <p className="mt-1 text-xs text-neutral-500">
                            Link to your resume on Google Drive, Dropbox, etc.
                          </p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-neutral-700 mb-2">
                            Cover Letter
                          </label>
                          <textarea
                            value={application.coverLetter}
                            onChange={(e) =>
                              setApplication({
                                ...application,
                                coverLetter: e.target.value,
                              })
                            }
                            rows={5}
                            className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                            placeholder="Tell us why you're interested in this position..."
                          ></textarea>
                        </div>

                        <div className="flex justify-end space-x-4">
                          <button
                            type="button"
                            onClick={() => setIsApplying(false)}
                            className="px-6 py-3 border border-neutral-300 rounded-lg text-neutral-700 hover:bg-neutral-50"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 flex items-center space-x-2"
                          >
                            {isSubmitting ? (
                              <>
                                <Loader2 className="animate-spin h-4 w-4" />
                                <span>Submitting...</span>
                              </>
                            ) : (
                              <>
                                <Send className="h-4 w-4" />
                                <span>Submit Application</span>
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="p-6">
                      <div className="mb-6">
                        {selectedJob.featured && (
                          <div className="mb-2">
                            <span className="bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                              Featured
                            </span>
                          </div>
                        )}
                        <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                          {selectedJob.title}
                        </h2>
                        <div className="flex flex-wrap items-center text-sm text-neutral-600 gap-y-2 gap-x-4 mb-4">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1 text-neutral-400" />
                            <span>{selectedJob.department}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
                            <span>{selectedJob.location}</span>
                          </div>
                          <div className="flex items-center">
                            {selectedJob.locationType === "remote" ? (
                              <Globe className="h-4 w-4 mr-1 text-neutral-400" />
                            ) : selectedJob.locationType === "hybrid" ? (
                              <Building className="h-4 w-4 mr-1 text-neutral-400" />
                            ) : (
                              <MapPin className="h-4 w-4 mr-1 text-neutral-400" />
                            )}
                            <span>
                              {selectedJob.locationType
                                .charAt(0)
                                .toUpperCase() +
                                selectedJob.locationType.slice(1)}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-1 text-neutral-400" />
                            <span>
                              {selectedJob.employmentType
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join("-")}
                            </span>
                          </div>
                          {selectedJob.salaryRange && (
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1 text-neutral-400" />
                              <span>{selectedJob.salaryRange}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-sm text-neutral-500 mb-6">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>
                            Posted{" "}
                            {new Date(
                              selectedJob.postedAt
                            ).toLocaleDateString()}
                          </span>
                          {selectedJob.expiresAt && (
                            <>
                              <span className="mx-2">•</span>
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                Expires{" "}
                                {new Date(
                                  selectedJob.expiresAt
                                ).toLocaleDateString()}
                              </span>
                            </>
                          )}
                        </div>

                        <div className="prose max-w-none mb-8">
                          <p className="text-neutral-700 leading-relaxed">
                            {selectedJob.description}
                          </p>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                            Responsibilities
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.responsibilities.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start text-neutral-700"
                              >
                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                            Requirements
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.requirements.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start text-neutral-700"
                              >
                                <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="mb-8">
                          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                            Benefits
                          </h3>
                          <ul className="space-y-2">
                            {selectedJob.benefits.map((item, index) => (
                              <li
                                key={index}
                                className="flex items-start text-neutral-700"
                              >
                                <CheckCircle className="h-5 w-5 text-purple-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {hasApplied ? (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                              <div>
                                <h4 className="font-medium text-green-800">
                                  Application Submitted
                                </h4>
                                <p className="text-sm text-green-700">
                                  You have already applied for this position.
                                  We'll review your application and get back to
                                  you soon.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <button
                              onClick={handleApply}
                              className="w-full bg-primary-600 text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2"
                            >
                              <Send className="h-4 w-4" />
                              <span>Apply for this position</span>
                            </button>

                            {selectedJob.applicationUrl && (
                              <a
                                href={selectedJob.applicationUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full border border-neutral-300 text-neutral-700 py-3 px-6 rounded-lg hover:bg-neutral-50 transition-colors flex items-center justify-center space-x-2"
                              >
                                <ExternalLink className="h-4 w-4" />
                                <span>Apply on External Site</span>
                              </a>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 text-center">
                  <Briefcase className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                    Select a job to view details
                  </h3>
                  <p className="text-neutral-600">
                    Click on any job posting to see more information and apply.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl overflow-hidden shadow-xl">
            <div className="px-6 py-122 md:p-12 text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Don't see the right position?
              </h2>
              <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
                We're always looking for talented individuals to join our team.
                Send us your resume and we'll keep you in mind for future
                opportunities.
              </p>
              <a
                href="mailto:careers@pixinity.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-indigo-600 rounded-xl font-medium hover:bg-neutral-100 transition-colors shadow-lg"
              >
                <Mail className="mr-2 h-5 w-5" />
                <span>Contact Our Recruiting Team</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CareersPageFixed;
