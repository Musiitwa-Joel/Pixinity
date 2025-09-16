"use client";

import type React from "react";
import { useState, useEffect } from "react";
import {
  Briefcase,
  Search,
  Plus,
  Edit,
  Trash2,
  RefreshCw,
  MapPin,
  Clock,
  Calendar,
  CheckCircle,
  XCircle,
  Mail,
  LinkIcon,
  ExternalLink,
  Loader2,
  Globe,
  Building,
  DollarSign,
  Users,
  Star,
  Save,
  ArrowLeft,
  Eye,
  Phone,
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

interface JobStats {
  totalJobs: number;
  activeJobs: number;
  featuredJobs: number;
  totalApplicants: number;
  totalViews: number;
  departments: string[];
  locationTypes: { type: string; count: number }[];
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  department: string;
  fullName: string;
  email: string;
  phone: string;
  resumeUrl: string;
  coverLetter: string;
  status: "pending" | "reviewed" | "interviewed" | "rejected" | "hired";
  createdAt: string;
  user: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    avatar?: string;
  };
}

const AdminCareers: React.FC = () => {
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [locationTypeFilter, setLocationTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [isEditing, setIsEditing] = useState(false);
  const [currentJob, setCurrentJob] = useState<JobPosting | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [stats, setStats] = useState<JobStats>({
    totalJobs: 0,
    activeJobs: 0,
    featuredJobs: 0,
    totalApplicants: 0,
    totalViews: 0,
    departments: [],
    locationTypes: [],
  });
  const [applications, setApplications] = useState<Application[]>([]);
  const [isViewingApplications, setIsViewingApplications] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [selectedApplication, setSelectedApplication] =
    useState<Application | null>(null);

  // Form state for editing jobs
  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    locationType: "remote",
    employmentType: "full-time",
    salaryRange: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    applicationUrl: "",
    isActive: true,
    featured: false,
    expiresAt: "",
  });

  useEffect(() => {
    fetchJobs();
    fetchStats();
  }, []);

  useEffect(() => {
    filterJobs();
  }, [
    jobs,
    searchQuery,
    departmentFilter,
    locationTypeFilter,
    statusFilter,
    sortBy,
  ]);

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/careers/stats", {
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setStats(data);
      } else {
        console.error("Failed to fetch job stats:", await response.text());
      }
    } catch (error) {
      console.error("Error fetching job stats:", error);
    }
  };

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      // Build query parameters
      const params = new URLSearchParams();

      // Include all jobs for admin
      params.append("limit", "50");
      params.append("offset", "0");

      console.log("Fetching jobs with params:", Object.fromEntries(params));

      // Fetch from API
      const response = await fetch(
        `http://localhost:5000/api/careers/admin/jobs?${params}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to fetch jobs: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log(`Fetched ${data.jobs.length} jobs`);
      setJobs(data.jobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load job postings");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchApplications = async (jobId: string) => {
    setIsLoadingApplications(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/jobs/${jobId}/applications`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch applications");
      }

      const data = await response.json();
      setApplications(data.applications);
      setSelectedJobId(jobId);
      setIsViewingApplications(true);
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications");
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const filterJobs = () => {
    let result = [...jobs];

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
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

    // Apply status filter
    if (statusFilter !== "all") {
      if (statusFilter === "active") {
        result = result.filter((job) => job.isActive);
      } else if (statusFilter === "inactive") {
        result = result.filter((job) => !job.isActive);
      } else if (statusFilter === "featured") {
        result = result.filter((job) => job.featured);
      }
    }

    // Apply sorting
    switch (sortBy) {
      case "oldest":
        result.sort(
          (a, b) =>
            new Date(a.postedAt).getTime() - new Date(b.postedAt).getTime()
        );
        break;
      case "title-asc":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "applicants":
        result.sort((a, b) => b.applicantsCount - a.applicantsCount);
        break;
      case "views":
        result.sort((a, b) => b.viewsCount - a.viewsCount);
        break;
      default: // newest
        result.sort(
          (a, b) =>
            new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()
        );
    }

    // Always put featured jobs at the top
    result.sort((a, b) => {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return 0;
    });

    setFilteredJobs(result);
  };

  const handleCreateJob = () => {
    const newJob: JobPosting = {
      id: `job-${Date.now()}`,
      title: "New Job Position",
      department: "Department",
      location: "Location",
      locationType: "remote",
      employmentType: "full-time",
      salaryRange: "",
      description: "Write a description for this job position...",
      responsibilities: [
        "Responsibility 1",
        "Responsibility 2",
        "Responsibility 3",
      ],
      requirements: ["Requirement 1", "Requirement 2", "Requirement 3"],
      benefits: ["Benefit 1", "Benefit 2", "Benefit 3"],
      applicationUrl: "https://careers.pixinity.com/apply",
      isActive: false,
      featured: false,
      applicantsCount: 0,
      viewsCount: 0,
      postedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setCurrentJob(newJob);
    setFormData({
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      locationType: newJob.locationType,
      employmentType: newJob.employmentType,
      salaryRange: newJob.salaryRange || "",
      description: newJob.description,
      responsibilities: newJob.responsibilities.join("\n"),
      requirements: newJob.requirements.join("\n"),
      benefits: newJob.benefits.join("\n"),
      applicationUrl: newJob.applicationUrl,
      isActive: newJob.isActive,
      featured: newJob.featured,
      expiresAt: newJob.expiresAt
        ? new Date(newJob.expiresAt).toISOString().split("T")[0]
        : "",
    });
    setIsEditing(true);
  };

  const handleEditJob = (job: JobPosting) => {
    setCurrentJob(job);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.locationType,
      employmentType: job.employmentType,
      salaryRange: job.salaryRange || "",
      description: job.description,
      responsibilities: job.responsibilities.join("\n"),
      requirements: job.requirements.join("\n"),
      benefits: job.benefits.join("\n"),
      applicationUrl: job.applicationUrl,
      isActive: job.isActive,
      featured: job.featured,
      expiresAt: job.expiresAt
        ? new Date(job.expiresAt).toISOString().split("T")[0]
        : "",
    });
    setIsEditing(true);
  };

  const handleDeleteJob = async (jobId: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this job posting? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/admin/jobs/${jobId}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete job posting");
      }

      setJobs(jobs.filter((job) => job.id !== jobId));
      toast.success("Job posting deleted successfully");
      fetchStats(); // Refresh stats after deletion
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job posting");
    }
  };

  const handleToggleActive = async (jobId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/jobs/${jobId}/toggle-active`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update job status");
      }

      const data = await response.json();

      // Update local state
      setJobs(
        jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                isActive: data.isActive,
                updatedAt: new Date().toISOString(),
              }
            : job
        )
      );

      toast.success(
        `Job posting ${
          data.isActive ? "activated" : "deactivated"
        } successfully`
      );
      fetchStats(); // Refresh stats after status change
    } catch (error) {
      console.error("Error toggling active status:", error);
      toast.error("Failed to update job status");
    }
  };

  const handleToggleFeatured = async (jobId: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/jobs/${jobId}/toggle-featured`,
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
      setJobs(
        jobs.map((job) =>
          job.id === jobId
            ? {
                ...job,
                featured: data.featured,
                updatedAt: new Date().toISOString(),
              }
            : job
        )
      );

      toast.success(
        `Job posting ${data.featured ? "featured" : "unfeatured"} successfully`
      );
      fetchStats(); // Refresh stats after status change
    } catch (error) {
      console.error("Error toggling featured status:", error);
      toast.error("Failed to update featured status");
    }
  };

  const handleUpdateApplicationStatus = async (
    applicationId: string,
    status: string
  ) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/careers/applications/${applicationId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update application status");
      }

      // Update local state
      setApplications(
        applications.map((app) =>
          app.id === applicationId
            ? {
                ...app,
                status: status as any,
              }
            : app
        )
      );

      if (selectedApplication?.id === applicationId) {
        setSelectedApplication({
          ...selectedApplication,
          status: status as any,
        });
      }

      toast.success("Application status updated successfully");
    } catch (error) {
      console.error("Error updating application status:", error);
      toast.error("Failed to update application status");
    }
  };

  const handleSaveJob = async () => {
    if (!currentJob) return;

    setIsSaving(true);
    try {
      const isNewJob = currentJob.id.startsWith("job-");

      const jobData = {
        title: formData.title,
        department: formData.department,
        location: formData.location,
        locationType: formData.locationType,
        employmentType: formData.employmentType,
        salaryRange: formData.salaryRange,
        description: formData.description,
        responsibilities: formData.responsibilities
          .split("\n")
          .filter((r) => r.trim()),
        requirements: formData.requirements.split("\n").filter((r) => r.trim()),
        benefits: formData.benefits.split("\n").filter((r) => r.trim()),
        applicationUrl: formData.applicationUrl,
        isActive: formData.isActive,
        featured: formData.featured,
        expiresAt: formData.expiresAt || undefined,
      };

      let response;

      if (isNewJob) {
        // Create new job
        response = await fetch("http://localhost:5000/api/careers/admin/jobs", {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jobData),
        });
      } else {
        // Update existing job
        response = await fetch(
          `http://localhost:5000/api/careers/admin/jobs/${currentJob.id}`,
          {
            method: "PUT",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(jobData),
          }
        );
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to save job posting");
      }

      const data = await response.json();

      if (isNewJob) {
        // Add new job to the list
        setJobs([data.job, ...jobs]);
      } else {
        // Update existing job in the list
        setJobs(jobs.map((job) => (job.id === currentJob.id ? data.job : job)));
      }

      toast.success(data.message);
      setIsEditing(false);
      setCurrentJob(null);
      fetchStats(); // Refresh stats after saving
    } catch (error: any) {
      console.error("Error saving job:", error);
      toast.error(error.message || "Failed to save job posting");
    } finally {
      setIsSaving(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Pending
          </span>
        );
      case "reviewed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Reviewed
          </span>
        );
      case "interviewed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            Interviewed
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Rejected
          </span>
        );
      case "hired":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Hired
          </span>
        );
      default:
        return null;
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
                {currentJob?.id.includes("job-")
                  ? "Create New Job"
                  : "Edit Job"}
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
                onClick={handleSaveJob}
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
                    <span>Save Job</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Job Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Senior Frontend Developer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Department
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., Engineering"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., San Francisco, CA"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Location Type
                </label>
                <select
                  value={formData.locationType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      locationType: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="onsite">On-site</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Employment Type
                </label>
                <select
                  value={formData.employmentType}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      employmentType: e.target.value as any,
                    })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Salary Range (optional)
                </label>
                <input
                  type="text"
                  value={formData.salaryRange}
                  onChange={(e) =>
                    setFormData({ ...formData, salaryRange: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="e.g., $80,000 - $100,000"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Job Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Write a description of the job position..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Responsibilities (one per line)
              </label>
              <textarea
                value={formData.responsibilities}
                onChange={(e) =>
                  setFormData({ ...formData, responsibilities: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="List the job responsibilities, one per line..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Requirements (one per line)
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) =>
                  setFormData({ ...formData, requirements: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="List the job requirements, one per line..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Benefits (one per line)
              </label>
              <textarea
                value={formData.benefits}
                onChange={(e) =>
                  setFormData({ ...formData, benefits: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="List the job benefits, one per line..."
              />
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Application URL
              </label>
              <input
                type="text"
                value={formData.applicationUrl}
                onChange={(e) =>
                  setFormData({ ...formData, applicationUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="e.g., https://careers.pixinity.com/apply/job-title"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Expiration Date (optional)
                </label>
                <input
                  type="date"
                  value={formData.expiresAt}
                  onChange={(e) =>
                    setFormData({ ...formData, expiresAt: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label
                  htmlFor="isActive"
                  className="ml-2 block text-sm text-neutral-900"
                >
                  Active (visible to applicants)
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) =>
                    setFormData({ ...formData, featured: e.target.checked })
                  }
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label
                  htmlFor="featured"
                  className="ml-2 block text-sm text-neutral-900"
                >
                  Featured (highlighted on careers page)
                </label>
              </div>
            </div>
          </div>
        </div>
      ) : isViewingApplications ? (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsViewingApplications(false);
                  setSelectedJobId(null);
                  setApplications([]);
                  setSelectedApplication(null);
                }}
                className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 text-neutral-700" />
              </button>
              <h1 className="text-3xl font-bold text-neutral-900">
                Applications
              </h1>
              <span className="bg-primary-100 text-primary-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                {applications.length} total
              </span>
            </div>
            <button
              onClick={() => {
                if (selectedJobId) {
                  fetchApplications(selectedJobId);
                }
              }}
              className="btn-outline flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refresh</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-1 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-neutral-200">
                <h3 className="font-semibold text-neutral-900">Applicants</h3>
              </div>

              <div className="overflow-y-auto max-h-[600px]">
                {isLoadingApplications ? (
                  <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
                  </div>
                ) : applications.length > 0 ? (
                  <div className="divide-y divide-neutral-200">
                    {applications.map((application) => (
                      <div
                        key={application.id}
                        onClick={() => setSelectedApplication(application)}
                        className={`p-4 cursor-pointer hover:bg-neutral-50 transition-colors ${
                          selectedApplication?.id === application.id
                            ? "bg-primary-50 border-l-4 border-primary-500"
                            : ""
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <img
                            src={
                              application.user.avatar ||
                              `https://ui-avatars.com/api/?name=${
                                application.user.firstName || "/placeholder.svg"
                              }+${
                                application.user.lastName
                              }&background=2563eb&color=ffffff`
                            }
                            alt={`${application.user.firstName} ${application.user.lastName}`}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <div>
                            <h4 className="font-medium text-neutral-900">
                              {application.fullName}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {application.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-neutral-500">
                            {new Date(
                              application.createdAt
                            ).toLocaleDateString()}
                          </div>
                          {getStatusBadge(application.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center">
                    <Users className="h-12 w-12 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-1">
                      No applications yet
                    </h3>
                    <p className="text-neutral-500">
                      There are no applications for this job posting yet.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Application Details */}
            <div className="lg:col-span-2 bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
              {selectedApplication ? (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900">
                      Application Details
                    </h2>
                    <div className="flex items-center space-x-2">
                      <select
                        value={selectedApplication.status}
                        onChange={(e) =>
                          handleUpdateApplicationStatus(
                            selectedApplication.id,
                            e.target.value
                          )
                        }
                        className="px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="interviewed">Interviewed</option>
                        <option value="rejected">Rejected</option>
                        <option value="hired">Hired</option>
                      </select>
                    </div>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-neutral-900">
                        {selectedApplication.jobTitle}
                      </h3>
                      <span className="text-sm text-neutral-500">
                        {selectedApplication.department}
                      </span>
                    </div>
                    <div className="text-sm text-neutral-600">
                      Applied on{" "}
                      {new Date(
                        selectedApplication.createdAt
                      ).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Applicant
                      </h3>
                      <div className="flex items-center space-x-3">
                        <img
                          src={
                            selectedApplication.user.avatar ||
                            `https://ui-avatars.com/api/?name=${
                              selectedApplication.user.firstName ||
                              "/placeholder.svg"
                            }+${
                              selectedApplication.user.lastName
                            }&background=2563eb&color=ffffff`
                          }
                          alt={`${selectedApplication.user.firstName} ${selectedApplication.user.lastName}`}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-neutral-900">
                            {selectedApplication.fullName}
                          </p>
                          <p className="text-sm text-neutral-500">
                            @{selectedApplication.user.username}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-1">
                        Contact Information
                      </h3>
                      <p className="text-neutral-900 mb-1">
                        <Mail className="inline h-4 w-4 mr-1 text-neutral-400" />
                        {selectedApplication.email}
                      </p>
                      {selectedApplication.phone && (
                        <p className="text-neutral-900">
                          <Phone className="inline h-4 w-4 mr-1 text-neutral-400" />
                          {selectedApplication.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {selectedApplication.resumeUrl && (
                    <div className="mb-6">
                      <h3 className="text-sm font-medium text-neutral-500 mb-2">
                        Resume
                      </h3>
                      <a
                        href={selectedApplication.resumeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
                      >
                        <LinkIcon className="h-4 w-4" />
                        <span>View Resume</span>
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                  )}

                  {selectedApplication.coverLetter && (
                    <div>
                      <h3 className="text-sm font-medium text-neutral-500 mb-2">
                        Cover Letter
                      </h3>
                      <div className="bg-neutral-50 rounded-lg p-4 whitespace-pre-wrap">
                        {selectedApplication.coverLetter}
                      </div>
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-neutral-200 flex justify-between">
                    <div>
                      <a
                        href={`mailto:${selectedApplication.email}`}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-100 hover:bg-primary-200 text-primary-700 rounded-lg transition-colors"
                      >
                        <Mail className="h-4 w-4" />
                        <span>Email Candidate</span>
                      </a>
                    </div>
                    <div className="space-x-2">
                      {selectedApplication.status === "pending" && (
                        <button
                          onClick={() =>
                            handleUpdateApplicationStatus(
                              selectedApplication.id,
                              "reviewed"
                            )
                          }
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Mark as Reviewed</span>
                        </button>
                      )}
                      {(selectedApplication.status === "pending" ||
                        selectedApplication.status === "reviewed") && (
                        <button
                          onClick={() =>
                            handleUpdateApplicationStatus(
                              selectedApplication.id,
                              "interviewed"
                            )
                          }
                          className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-colors"
                        >
                          <Users className="h-4 w-4" />
                          <span>Schedule Interview</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full p-8">
                  <div className="text-center">
                    <Users className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-neutral-900 mb-1">
                      No application selected
                    </h3>
                    <p className="text-neutral-500">
                      Select an application from the list to view details
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">
                Careers Management
              </h1>
              <p className="text-neutral-600">
                Create and manage job postings for your careers page
              </p>
            </div>
            <button
              onClick={handleCreateJob}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Create Job Posting</span>
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[
              {
                title: "Total Jobs",
                value: stats.totalJobs,
                icon: Briefcase,
                color: "text-blue-500",
                bgColor: "bg-blue-100",
              },
              {
                title: "Active Jobs",
                value: stats.activeJobs,
                icon: CheckCircle,
                color: "text-green-500",
                bgColor: "bg-green-100",
              },
              {
                title: "Featured Jobs",
                value: stats.featuredJobs,
                icon: Star,
                color: "text-amber-500",
                bgColor: "bg-amber-100",
              },
              {
                title: "Total Applicants",
                value: stats.totalApplicants,
                icon: Users,
                color: "text-purple-500",
                bgColor: "bg-purple-100",
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
                  placeholder="Search jobs..."
                  className="pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-full sm:w-64"
                />
              </div>

              {/* Department Filter */}
              <select
                value={departmentFilter}
                onChange={(e) => setDepartmentFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Departments</option>
                {stats.departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>

              {/* Location Type Filter */}
              <select
                value={locationTypeFilter}
                onChange={(e) => setLocationTypeFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Locations</option>
                <option value="remote">Remote</option>
                <option value="hybrid">Hybrid</option>
                <option value="onsite">On-site</option>
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="featured">Featured</option>
              </select>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort By */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title-asc">Title A-Z</option>
                <option value="title-desc">Title Z-A</option>
                <option value="applicants">Most Applicants</option>
                <option value="views">Most Views</option>
              </select>

              <button
                onClick={fetchJobs}
                className="btn-outline flex items-center space-x-2"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-500" />
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="divide-y divide-neutral-200">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {job.title}
                          </h3>
                          {job.featured && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Featured
                            </span>
                          )}
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              job.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {job.isActive ? "Active" : "Inactive"}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-neutral-500 mb-3">
                          <div className="flex items-center">
                            <Building className="h-4 w-4 mr-1" />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center">
                            {job.locationType === "remote" ? (
                              <Globe className="h-4 w-4 mr-1" />
                            ) : job.locationType === "hybrid" ? (
                              <Building className="h-4 w-4 mr-1" />
                            ) : (
                              <MapPin className="h-4 w-4 mr-1" />
                            )}
                            <span>
                              {job.locationType
                                .split("-")
                                .map(
                                  (word) =>
                                    word.charAt(0).toUpperCase() + word.slice(1)
                                )
                                .join("-")}
                            </span>
                          </div>
                          {job.salaryRange && (
                            <div className="flex items-center">
                              <DollarSign className="h-4 w-4 mr-1" />
                              <span>{job.salaryRange}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-neutral-600 mb-3 line-clamp-2">
                          {job.description}
                        </p>
                        <div className="flex flex-wrap items-center text-sm text-neutral-500 space-x-4">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>
                              Posted:{" "}
                              {new Date(job.postedAt).toLocaleDateString()}
                            </span>
                          </div>
                          {job.expiresAt && (
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>
                                Expires:{" "}
                                {new Date(job.expiresAt).toLocaleDateString()}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-1" />
                            <span>{job.applicantsCount} applicants</span>
                          </div>
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1" />
                            <span>{job.viewsCount} views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => handleToggleActive(job.id)}
                          className={`p-2 rounded-md ${
                            job.isActive
                              ? "text-green-500 hover:bg-green-50"
                              : "text-red-500 hover:bg-red-50"
                          }`}
                          title={job.isActive ? "Deactivate" : "Activate"}
                        >
                          {job.isActive ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            <XCircle className="h-5 w-5" />
                          )}
                        </button>
                        <button
                          onClick={() => handleToggleFeatured(job.id)}
                          className={`p-2 rounded-md ${
                            job.featured
                              ? "text-amber-500 hover:bg-amber-50"
                              : "text-neutral-500 hover:bg-neutral-100"
                          }`}
                          title={job.featured ? "Unfeature" : "Feature"}
                        >
                          <Star
                            className={`h-5 w-5 ${
                              job.featured ? "fill-amber-500" : ""
                            }`}
                          />
                        </button>
                        <button
                          onClick={() => fetchApplications(job.id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 rounded-md"
                          title="View applications"
                        >
                          <Users className="h-5 w-5" />
                        </button>
                        <a
                          href={job.applicationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-md"
                          title="View job posting"
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <button
                          onClick={() => handleEditJob(job)}
                          className="p-2 text-primary-500 hover:bg-primary-50 rounded-md"
                          title="Edit job posting"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteJob(job.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-md"
                          title="Delete job posting"
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
                <Briefcase className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-neutral-900 mb-1">
                  No job postings found
                </h3>
                <p className="text-neutral-500 mb-4">
                  {searchQuery ||
                  departmentFilter !== "all" ||
                  locationTypeFilter !== "all" ||
                  statusFilter !== "all"
                    ? "Try adjusting your filters"
                    : "Get started by creating your first job posting"}
                </p>
                {!searchQuery &&
                  departmentFilter === "all" &&
                  locationTypeFilter === "all" &&
                  statusFilter === "all" && (
                    <button
                      onClick={handleCreateJob}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Job Posting
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

export default AdminCareers;
