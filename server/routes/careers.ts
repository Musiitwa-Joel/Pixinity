import express from "express";
import { pool } from "../database";
import { validateSession } from "../auth";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

const router = express.Router();

// Middleware to check admin authentication
const requireAdmin = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await validateSession(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    // Check if user is admin
    if (user.role !== "admin" && user.role !== "super_admin") {
      console.log(`Access denied for user: ${user.email}, role: ${user.role}`);
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = user;
    console.log(`Admin access granted for user: ${user.email}`);
    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Middleware to check authentication (optional)
const optionalAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies["auth-token"];
    if (token) {
      const user = await validateSession(token);
      if (user) {
        req.user = user;
      }
    }
    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    next(); // Continue without authentication
  }
};

// Middleware to check authentication (required)
const requireAuth = async (req: any, res: any, next: any) => {
  try {
    const token = req.cookies["auth-token"];
    if (!token) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const user = await validateSession(token);
    if (!user) {
      return res.status(401).json({ error: "Invalid session" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Ensure careers table exists
const ensureCareersTable = async () => {
  try {
    // Check if job_postings table exists
    const [tablesResult] = await pool.execute(
      `SELECT COUNT(*) as count FROM information_schema.tables 
       WHERE table_schema = DATABASE() AND table_name = 'job_postings'`
    );

    const tableExists = (tablesResult as RowDataPacket[])[0].count > 0;

    if (!tableExists) {
      console.log("Creating job_postings table...");
      await pool.execute(`
        CREATE TABLE job_postings (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          department VARCHAR(100) NOT NULL,
          location VARCHAR(255) NOT NULL,
          location_type ENUM('remote', 'hybrid', 'onsite') NOT NULL,
          employment_type ENUM('full-time', 'part-time', 'contract', 'internship') NOT NULL,
          salary_range VARCHAR(100),
          description TEXT NOT NULL,
          responsibilities TEXT NOT NULL,
          requirements TEXT NOT NULL,
          benefits TEXT NOT NULL,
          application_url VARCHAR(255) NOT NULL,
          is_active BOOLEAN NOT NULL DEFAULT TRUE,
          featured BOOLEAN NOT NULL DEFAULT FALSE,
          applicants_count INT NOT NULL DEFAULT 0,
          views_count INT NOT NULL DEFAULT 0,
          posted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          expires_at DATE NULL,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
      `);

      // Create job applications table
      await pool.execute(`
        CREATE TABLE job_applications (
          id INT AUTO_INCREMENT PRIMARY KEY,
          job_id INT NOT NULL,
          user_id INT NULL,
          full_name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          resume_url VARCHAR(255),
          cover_letter TEXT,
          status ENUM('pending', 'reviewed', 'interviewed', 'rejected', 'hired') NOT NULL DEFAULT 'pending',
          created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (job_id) REFERENCES job_postings(id) ON DELETE CASCADE
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci
      `);

      // Insert sample job postings
      await insertSampleJobs();
      console.log("Sample job postings created");
    } else {
      // Check if we have any active jobs, if not, create some
      const [activeJobsResult] = await pool.execute(
        "SELECT COUNT(*) as count FROM job_postings WHERE is_active = 1"
      );
      const activeJobsCount = (activeJobsResult as RowDataPacket[])[0].count;

      if (activeJobsCount === 0) {
        console.log("No active jobs found, creating sample jobs...");
        await insertSampleJobs();
      }
    }
  } catch (error) {
    console.error("Error ensuring job_postings table:", error);
  }
};

// Insert sample job postings
const insertSampleJobs = async () => {
  try {
    const sampleJobs = [
      {
        title: "Senior Frontend Developer",
        department: "Engineering",
        location: "San Francisco, CA",
        location_type: "hybrid",
        employment_type: "full-time",
        salary_range: "$120,000 - $150,000",
        description:
          "We're looking for a Senior Frontend Developer to join our engineering team. You'll be responsible for building and maintaining our web applications, with a focus on user experience and performance.",
        responsibilities: JSON.stringify([
          "Develop and maintain our web applications using React, TypeScript, and modern frontend tools",
          "Collaborate with designers to implement responsive, accessible, and visually appealing user interfaces",
          "Write clean, maintainable, and well-tested code",
          "Participate in code reviews and mentor junior developers",
          "Contribute to technical architecture decisions and best practices",
        ]),
        requirements: JSON.stringify([
          "5+ years of experience in frontend development",
          "Strong proficiency in React, TypeScript, and modern JavaScript",
          "Experience with state management solutions (Redux, Context API, etc.)",
          "Knowledge of responsive design, accessibility, and cross-browser compatibility",
          "Familiarity with testing frameworks (Jest, React Testing Library, etc.)",
          "Bachelor's degree in Computer Science or equivalent experience",
        ]),
        benefits: JSON.stringify([
          "Competitive salary and equity package",
          "Comprehensive health, dental, and vision insurance",
          "Flexible work arrangements",
          "Professional development budget",
          "Generous paid time off",
          "401(k) matching",
        ]),
        application_url:
          "https://careers.pixinity.com/apply/senior-frontend-developer",
        is_active: true,
        featured: true,
        applicants_count: 24,
        views_count: 456,
        posted_at: "2025-06-01 10:00:00",
        expires_at: "2025-07-01",
      },
      {
        title: "Product Designer",
        department: "Design",
        location: "Remote",
        location_type: "remote",
        employment_type: "full-time",
        salary_range: "$90,000 - $120,000",
        description:
          "We're seeking a talented Product Designer to help shape the future of our photography platform. You'll work closely with product managers, engineers, and other designers to create intuitive and delightful user experiences.",
        responsibilities: JSON.stringify([
          "Create wireframes, prototypes, and high-fidelity designs for web and mobile applications",
          "Conduct user research and usability testing to inform design decisions",
          "Develop and maintain our design system",
          "Collaborate with cross-functional teams to define and implement new features",
          "Advocate for user-centered design throughout the product development process",
        ]),
        requirements: JSON.stringify([
          "3+ years of experience in product design",
          "Strong portfolio demonstrating your design process and outcomes",
          "Proficiency in design tools such as Figma, Sketch, or Adobe XD",
          "Experience with responsive web design and mobile app design",
          "Understanding of accessibility standards and best practices",
          "Excellent communication and collaboration skills",
        ]),
        benefits: JSON.stringify([
          "Competitive salary and equity package",
          "Comprehensive health, dental, and vision insurance",
          "Flexible work arrangements",
          "Professional development budget",
          "Generous paid time off",
          "Home office stipend",
        ]),
        application_url: "https://careers.pixinity.com/apply/product-designer",
        is_active: true,
        featured: true,
        applicants_count: 18,
        views_count: 325,
        posted_at: "2025-06-05 14:30:00",
        expires_at: "2025-07-05",
      },
      {
        title: "Marketing Manager",
        department: "Marketing",
        location: "New York, NY",
        location_type: "onsite",
        employment_type: "full-time",
        salary_range: "$80,000 - $100,000",
        description:
          "We're looking for a Marketing Manager to lead our marketing efforts and help grow our brand. You'll be responsible for developing and executing marketing strategies across multiple channels.",
        responsibilities: JSON.stringify([
          "Develop and implement comprehensive marketing strategies",
          "Manage digital marketing campaigns across social media, email, and paid advertising",
          "Create compelling content for various marketing channels",
          "Analyze marketing performance and optimize campaigns for better ROI",
          "Collaborate with sales team to generate qualified leads",
          "Manage marketing budget and vendor relationships",
        ]),
        requirements: JSON.stringify([
          "3+ years of experience in marketing or related field",
          "Strong understanding of digital marketing channels and tools",
          "Experience with marketing automation platforms",
          "Excellent written and verbal communication skills",
          "Data-driven mindset with experience in analytics tools",
          "Bachelor's degree in Marketing, Communications, or related field",
        ]),
        benefits: JSON.stringify([
          "Competitive salary and performance bonuses",
          "Comprehensive health, dental, and vision insurance",
          "Professional development opportunities",
          "Flexible work arrangements",
          "Generous paid time off",
          "Company-sponsored events and team building",
        ]),
        application_url: "https://careers.pixinity.com/apply/marketing-manager",
        is_active: true,
        featured: false,
        applicants_count: 31,
        views_count: 542,
        posted_at: "2025-06-10 09:00:00",
        expires_at: "2025-07-10",
      },
    ];

    for (const job of sampleJobs) {
      await pool.execute(
        `INSERT INTO job_postings (
          title, department, location, location_type, employment_type, salary_range,
          description, responsibilities, requirements, benefits, application_url,
          is_active, featured, applicants_count, views_count, posted_at, expires_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          job.title,
          job.department,
          job.location,
          job.location_type,
          job.employment_type,
          job.salary_range,
          job.description,
          job.responsibilities,
          job.requirements,
          job.benefits,
          job.application_url,
          job.is_active,
          job.featured,
          job.applicants_count,
          job.views_count,
          job.posted_at,
          job.expires_at,
        ]
      );
    }
  } catch (error) {
    console.error("Error inserting sample jobs:", error);
  }
};

// Initialize table on module load
ensureCareersTable();

// PUBLIC ROUTES

// Get all job postings with improved filtering
router.get("/jobs", optionalAuth, async (req, res) => {
  try {
    const {
      search = "",
      department = "",
      location_type = "",
      status = "",
      sort = "newest",
      limit = 20,
      offset = 0,
    } = req.query;

    console.log("📋 Jobs API called with params:", req.query);

    // Build the query
    let query = `
      SELECT * FROM job_postings
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Add search filter
    if (search) {
      query += ` AND (
        title LIKE ? OR 
        description LIKE ? OR 
        department LIKE ? OR
        location LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Add department filter
    if (department) {
      query += ` AND department = ?`;
      queryParams.push(department);
    }

    // Add location type filter
    if (location_type) {
      query += ` AND location_type = ?`;
      queryParams.push(location_type);
    }

    // Add status filter - FIXED: Handle 'active' status properly
    if (status === "active") {
      query += ` AND is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())`;
    } else if (status === "inactive") {
      query += ` AND (is_active = 0 OR (expires_at IS NOT NULL AND expires_at <= CURDATE()))`;
    } else if (status === "featured") {
      query += ` AND featured = 1 AND is_active = 1`;
    }
    // If no status filter, show all jobs (for admin)

    // Add sorting
    if (sort === "oldest") {
      query += ` ORDER BY posted_at ASC`;
    } else if (sort === "title-asc") {
      query += ` ORDER BY title ASC`;
    } else if (sort === "title-desc") {
      query += ` ORDER BY title DESC`;
    } else if (sort === "applicants") {
      query += ` ORDER BY applicants_count DESC`;
    } else if (sort === "views") {
      query += ` ORDER BY views_count DESC`;
    } else {
      // Default: newest first, featured jobs at top
      query += ` ORDER BY featured DESC, posted_at DESC`;
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    console.log("🔍 Executing query:", query);
    console.log("📊 Query params:", queryParams);

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM job_postings
      WHERE 1=1
    `;

    const countParams: any[] = [];

    // Add search filter to count query
    if (search) {
      countQuery += ` AND (
        title LIKE ? OR 
        description LIKE ? OR 
        department LIKE ? OR
        location LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Add department filter to count query
    if (department) {
      countQuery += ` AND department = ?`;
      countParams.push(department);
    }

    // Add location type filter to count query
    if (location_type) {
      countQuery += ` AND location_type = ?`;
      countParams.push(location_type);
    }

    // Add status filter to count query
    if (status === "active") {
      countQuery += ` AND is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())`;
    } else if (status === "inactive") {
      countQuery += ` AND (is_active = 0 OR (expires_at IS NOT NULL AND expires_at <= CURDATE()))`;
    } else if (status === "featured") {
      countQuery += ` AND featured = 1 AND is_active = 1`;
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = (countResult as RowDataPacket[])[0].total;

    // Format the response
    const jobs = (rows as RowDataPacket[]).map((job) => ({
      id: job.id.toString(),
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.location_type,
      employmentType: job.employment_type,
      salaryRange: job.salary_range,
      description: job.description,
      responsibilities: JSON.parse(job.responsibilities),
      requirements: JSON.parse(job.requirements),
      benefits: JSON.parse(job.benefits),
      applicationUrl: job.application_url,
      isActive: Boolean(job.is_active),
      featured: Boolean(job.featured),
      applicantsCount: job.applicants_count,
      viewsCount: job.views_count,
      postedAt: job.posted_at,
      expiresAt: job.expires_at,
      updatedAt: job.updated_at,
    }));

    console.log(`✅ Returning ${jobs.length} jobs out of ${total} total`);

    res.json({
      jobs,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Get job by ID
router.get("/jobs/:id", optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;

    // Increment view count
    await pool.execute(
      "UPDATE job_postings SET views_count = views_count + 1 WHERE id = ?",
      [id]
    );

    // Get job details
    const [rows] = await pool.execute(
      "SELECT * FROM job_postings WHERE id = ?",
      [id]
    );

    const jobs = rows as RowDataPacket[];
    if (jobs.length === 0) {
      return res.status(404).json({ error: "Job not found" });
    }

    const job = jobs[0];

    // Format the response
    const formattedJob = {
      id: job.id.toString(),
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.location_type,
      employmentType: job.employment_type,
      salaryRange: job.salary_range,
      description: job.description,
      responsibilities: JSON.parse(job.responsibilities),
      requirements: JSON.parse(job.requirements),
      benefits: JSON.parse(job.benefits),
      applicationUrl: job.application_url,
      isActive: Boolean(job.is_active),
      featured: Boolean(job.featured),
      applicantsCount: job.applicants_count,
      viewsCount: job.views_count,
      postedAt: job.posted_at,
      expiresAt: job.expires_at,
      updatedAt: job.updated_at,
    };

    res.json(formattedJob);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// Submit job application - FIXED: Allow applications without user authentication
router.post("/jobs/:id/apply", optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, email, phone, resumeUrl, coverLetter } = req.body;

    console.log("📝 Job application received:", { jobId: id, email, fullName });

    // Validate required fields
    if (!fullName || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ error: "Please provide a valid email address" });
    }

    // Check if job exists and is active
    const [jobRows] = await pool.execute(
      "SELECT id, title, is_active, expires_at FROM job_postings WHERE id = ?",
      [id]
    );

    if ((jobRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    const job = (jobRows as RowDataPacket[])[0];
    if (!job.is_active) {
      return res.status(400).json({ error: "This job is no longer active" });
    }

    // Check if job is expired
    if (job.expires_at && new Date(job.expires_at) <= new Date()) {
      return res.status(400).json({ error: "This job posting has expired" });
    }

    // Check if user already applied for this job (if authenticated)
    if (req.user) {
      const [existingApplicationRows] = await pool.execute(
        "SELECT id FROM job_applications WHERE job_id = ? AND (user_id = ? OR email = ?)",
        [id, req.user.id, email]
      );

      if ((existingApplicationRows as RowDataPacket[]).length > 0) {
        return res
          .status(400)
          .json({ error: "You have already applied for this job" });
      }
    } else {
      // Check by email only if not authenticated
      const [existingApplicationRows] = await pool.execute(
        "SELECT id FROM job_applications WHERE job_id = ? AND email = ?",
        [id, email]
      );

      if ((existingApplicationRows as RowDataPacket[]).length > 0) {
        return res.status(400).json({
          error: "An application with this email already exists for this job",
        });
      }
    }

    // Insert application
    const [result] = await pool.execute(
      `INSERT INTO job_applications (
        job_id, user_id, full_name, email, phone, resume_url, cover_letter
      ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        req.user?.id || null,
        fullName,
        email,
        phone || null,
        resumeUrl || null,
        coverLetter || null,
      ]
    );

    // Increment applicants count
    await pool.execute(
      "UPDATE job_postings SET applicants_count = applicants_count + 1 WHERE id = ?",
      [id]
    );

    const insertResult = result as ResultSetHeader;

    console.log(
      "✅ Application submitted successfully:",
      insertResult.insertId
    );

    res.status(201).json({
      message: "Application submitted successfully",
      applicationId: insertResult.insertId,
    });
  } catch (error) {
    console.error("Error submitting job application:", error);
    res.status(500).json({ error: "Not logged in. Submission blocked" });
  }
});

// Get user's job applications
router.get("/my-applications", requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;

    // Get applications
    const [rows] = await pool.execute(
      `SELECT 
        a.id, a.job_id, a.full_name, a.email, a.phone, a.resume_url, a.cover_letter, a.status, a.created_at,
        j.title as job_title, j.department, j.location, j.location_type
      FROM job_applications a
      JOIN job_postings j ON a.job_id = j.id
      WHERE a.user_id = ?
      ORDER BY a.created_at DESC`,
      [userId]
    );

    const applications = (rows as RowDataPacket[]).map((app) => ({
      id: app.id.toString(),
      jobId: app.job_id.toString(),
      jobTitle: app.job_title,
      department: app.department,
      location: app.location,
      locationType: app.location_type,
      fullName: app.full_name,
      email: app.email,
      phone: app.phone,
      resumeUrl: app.resume_url,
      coverLetter: app.cover_letter,
      status: app.status,
      createdAt: app.created_at,
    }));

    res.json({ applications });
  } catch (error) {
    console.error("Error fetching user applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Get job statistics
router.get("/stats", async (req, res) => {
  try {
    // Get total jobs count
    const [totalResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM job_postings"
    );
    const totalJobs = (totalResult as RowDataPacket[])[0].total;

    // Get active jobs count
    const [activeResult] = await pool.execute(
      "SELECT COUNT(*) as active FROM job_postings WHERE is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())"
    );
    const activeJobs = (activeResult as RowDataPacket[])[0].active;

    // Get featured jobs count
    const [featuredResult] = await pool.execute(
      "SELECT COUNT(*) as featured FROM job_postings WHERE featured = 1 AND is_active = 1"
    );
    const featuredJobs = (featuredResult as RowDataPacket[])[0].featured;

    // Get total applicants count
    const [applicantsResult] = await pool.execute(
      "SELECT SUM(applicants_count) as total FROM job_postings"
    );
    const totalApplicants = (applicantsResult as RowDataPacket[])[0].total || 0;

    // Get total views count
    const [viewsResult] = await pool.execute(
      "SELECT SUM(views_count) as total FROM job_postings"
    );
    const totalViews = (viewsResult as RowDataPacket[])[0].total || 0;

    // Get departments
    const [departmentsResult] = await pool.execute(
      "SELECT DISTINCT department FROM job_postings WHERE is_active = 1 ORDER BY department"
    );
    const departments = (departmentsResult as RowDataPacket[]).map(
      (row) => row.department
    );

    // Get location types
    const [locationTypesResult] = await pool.execute(
      "SELECT location_type, COUNT(*) as count FROM job_postings WHERE is_active = 1 GROUP BY location_type"
    );
    const locationTypes = (locationTypesResult as RowDataPacket[]).map(
      (row) => ({
        type: row.location_type,
        count: row.count,
      })
    );

    res.json({
      totalJobs,
      activeJobs,
      featuredJobs,
      totalApplicants,
      totalViews,
      departments,
      locationTypes,
    });
  } catch (error) {
    console.error("Error fetching job statistics:", error);
    res.status(500).json({ error: "Failed to fetch job statistics" });
  }
});

// ADMIN ROUTES

// Get all job postings for admin (with all statuses)
router.get("/admin/jobs", requireAdmin, async (req, res) => {
  try {
    const {
      search = "",
      department = "",
      location_type = "",
      status = "",
      sort = "newest",
      limit = 50,
      offset = 0,
    } = req.query;

    console.log("🔧 Admin jobs API called with params:", req.query);

    // Build the query (admin sees all jobs)
    let query = `
      SELECT * FROM job_postings
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Add search filter
    if (search) {
      query += ` AND (
        title LIKE ? OR 
        description LIKE ? OR 
        department LIKE ? OR
        location LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Add department filter
    if (department) {
      query += ` AND department = ?`;
      queryParams.push(department);
    }

    // Add location type filter
    if (location_type) {
      query += ` AND location_type = ?`;
      queryParams.push(location_type);
    }

    // Add status filter for admin
    if (status === "active") {
      query += ` AND is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())`;
    } else if (status === "inactive") {
      query += ` AND (is_active = 0 OR (expires_at IS NOT NULL AND expires_at <= CURDATE()))`;
    } else if (status === "featured") {
      query += ` AND featured = 1`;
    } else if (status === "expired") {
      query += ` AND expires_at IS NOT NULL AND expires_at <= CURDATE()`;
    }

    // Add sorting
    if (sort === "oldest") {
      query += ` ORDER BY posted_at ASC`;
    } else if (sort === "title-asc") {
      query += ` ORDER BY title ASC`;
    } else if (sort === "title-desc") {
      query += ` ORDER BY title DESC`;
    } else if (sort === "applicants") {
      query += ` ORDER BY applicants_count DESC`;
    } else if (sort === "views") {
      query += ` ORDER BY views_count DESC`;
    } else {
      // Default: newest first
      query += ` ORDER BY posted_at DESC`;
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM job_postings
      WHERE 1=1
    `;

    const countParams: any[] = [];

    // Add filters to count query
    if (search) {
      countQuery += ` AND (
        title LIKE ? OR 
        description LIKE ? OR 
        department LIKE ? OR
        location LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    if (department) {
      countQuery += ` AND department = ?`;
      countParams.push(department);
    }

    if (location_type) {
      countQuery += ` AND location_type = ?`;
      countParams.push(location_type);
    }

    if (status === "active") {
      countQuery += ` AND is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())`;
    } else if (status === "inactive") {
      countQuery += ` AND (is_active = 0 OR (expires_at IS NOT NULL AND expires_at <= CURDATE()))`;
    } else if (status === "featured") {
      countQuery += ` AND featured = 1`;
    } else if (status === "expired") {
      countQuery += ` AND expires_at IS NOT NULL AND expires_at <= CURDATE()`;
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = (countResult as RowDataPacket[])[0].total;

    // Format the response
    const jobs = (rows as RowDataPacket[]).map((job) => ({
      id: job.id.toString(),
      title: job.title,
      department: job.department,
      location: job.location,
      locationType: job.location_type,
      employmentType: job.employment_type,
      salaryRange: job.salary_range,
      description: job.description,
      responsibilities: JSON.parse(job.responsibilities),
      requirements: JSON.parse(job.requirements),
      benefits: JSON.parse(job.benefits),
      applicationUrl: job.application_url,
      isActive: Boolean(job.is_active),
      featured: Boolean(job.featured),
      applicantsCount: job.applicants_count,
      viewsCount: job.views_count,
      postedAt: job.posted_at,
      expiresAt: job.expires_at,
      updatedAt: job.updated_at,
    }));

    console.log(`✅ Admin returning ${jobs.length} jobs out of ${total} total`);

    res.json({
      jobs,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Error fetching admin jobs:", error);
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// Create new job posting
router.post("/admin/jobs", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      department,
      location,
      locationType,
      employmentType,
      salaryRange,
      description,
      responsibilities,
      requirements,
      benefits,
      applicationUrl,
      isActive = true,
      featured = false,
      expiresAt,
    } = req.body;

    console.log("📝 Creating new job posting:", { title, department });

    // Validate required fields
    if (
      !title ||
      !department ||
      !location ||
      !locationType ||
      !employmentType ||
      !description
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Validate arrays
    if (
      !Array.isArray(responsibilities) ||
      !Array.isArray(requirements) ||
      !Array.isArray(benefits)
    ) {
      return res.status(400).json({
        error: "Responsibilities, requirements, and benefits must be arrays",
      });
    }

    // Insert job posting
    const [result] = await pool.execute(
      `INSERT INTO job_postings (
        title, department, location, location_type, employment_type, salary_range,
        description, responsibilities, requirements, benefits, application_url,
        is_active, featured, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        department,
        location,
        locationType,
        employmentType,
        salaryRange || null,
        description,
        JSON.stringify(responsibilities),
        JSON.stringify(requirements),
        JSON.stringify(benefits),
        applicationUrl ||
          `https://careers.pixinity.com/apply/${title
            .toLowerCase()
            .replace(/\s+/g, "-")}`,
        isActive,
        featured,
        expiresAt || null,
      ]
    );

    const insertResult = result as ResultSetHeader;

    const [newJobRows] = await pool.execute(
      "SELECT * FROM job_postings WHERE id = ?",
      [insertResult.insertId]
    );
    const newJob = (newJobRows as RowDataPacket[])[0];

    const formattedJob = {
      id: newJob.id.toString(),
      title: newJob.title,
      department: newJob.department,
      location: newJob.location,
      locationType: newJob.location_type,
      employmentType: newJob.employment_type,
      salaryRange: newJob.salary_range,
      description: newJob.description,
      responsibilities: JSON.parse(newJob.responsibilities),
      requirements: JSON.parse(newJob.requirements),
      benefits: JSON.parse(newJob.benefits),
      applicationUrl: newJob.application_url,
      isActive: Boolean(newJob.is_active),
      featured: Boolean(newJob.featured),
      applicantsCount: newJob.applicants_count,
      viewsCount: newJob.views_count,
      postedAt: newJob.posted_at,
      expiresAt: newJob.expires_at,
      updatedAt: newJob.updated_at,
    };

    console.log("✅ Job posting created successfully:", insertResult.insertId);

    res.status(201).json({
      message: "Job posting created successfully",
      jobId: insertResult.insertId,
      job: formattedJob,
    });
  } catch (error) {
    console.error("Error creating job posting:", error);
    res.status(500).json({ error: "Failed to create job posting" });
  }
});

// Update job posting
router.put("/admin/jobs/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      department,
      location,
      locationType,
      employmentType,
      salaryRange,
      description,
      responsibilities,
      requirements,
      benefits,
      applicationUrl,
      isActive,
      featured,
      expiresAt,
    } = req.body;

    console.log("📝 Updating job posting:", { id, title });

    // Check if job exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM job_postings WHERE id = ?",
      [id]
    );
    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    // Validate arrays if provided
    if (responsibilities && !Array.isArray(responsibilities)) {
      return res
        .status(400)
        .json({ error: "Responsibilities must be an array" });
    }
    if (requirements && !Array.isArray(requirements)) {
      return res.status(400).json({ error: "Requirements must be an array" });
    }
    if (benefits && !Array.isArray(benefits)) {
      return res.status(400).json({ error: "Benefits must be an array" });
    }

    // Build update query dynamically
    const updateFields: string[] = [];
    const updateValues: any[] = [];

    if (title !== undefined) {
      updateFields.push("title = ?");
      updateValues.push(title);
    }
    if (department !== undefined) {
      updateFields.push("department = ?");
      updateValues.push(department);
    }
    if (location !== undefined) {
      updateFields.push("location = ?");
      updateValues.push(location);
    }
    if (locationType !== undefined) {
      updateFields.push("location_type = ?");
      updateValues.push(locationType);
    }
    if (employmentType !== undefined) {
      updateFields.push("employment_type = ?");
      updateValues.push(employmentType);
    }
    if (salaryRange !== undefined) {
      updateFields.push("salary_range = ?");
      updateValues.push(salaryRange);
    }
    if (description !== undefined) {
      updateFields.push("description = ?");
      updateValues.push(description);
    }
    if (responsibilities !== undefined) {
      updateFields.push("responsibilities = ?");
      updateValues.push(JSON.stringify(responsibilities));
    }
    if (requirements !== undefined) {
      updateFields.push("requirements = ?");
      updateValues.push(JSON.stringify(requirements));
    }
    if (benefits !== undefined) {
      updateFields.push("benefits = ?");
      updateValues.push(JSON.stringify(benefits));
    }
    if (applicationUrl !== undefined) {
      updateFields.push("application_url = ?");
      updateValues.push(applicationUrl);
    }
    if (isActive !== undefined) {
      updateFields.push("is_active = ?");
      updateValues.push(isActive);
    }
    if (featured !== undefined) {
      updateFields.push("featured = ?");
      updateValues.push(featured);
    }
    if (expiresAt !== undefined) {
      updateFields.push("expires_at = ?");
      updateValues.push(expiresAt);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Add updated_at
    updateFields.push("updated_at = CURRENT_TIMESTAMP");

    // Add job ID for WHERE clause
    updateValues.push(id);

    const updateQuery = `UPDATE job_postings SET ${updateFields.join(
      ", "
    )} WHERE id = ?`;

    await pool.execute(updateQuery, updateValues);

    const [updatedJobRows] = await pool.execute(
      "SELECT * FROM job_postings WHERE id = ?",
      [id]
    );
    const updatedJob = (updatedJobRows as RowDataPacket[])[0];

    const formattedJob = {
      id: updatedJob.id.toString(),
      title: updatedJob.title,
      department: updatedJob.department,
      location: updatedJob.location,
      locationType: updatedJob.location_type,
      employmentType: updatedJob.employment_type,
      salaryRange: updatedJob.salary_range,
      description: updatedJob.description,
      responsibilities: JSON.parse(updatedJob.responsibilities),
      requirements: JSON.parse(updatedJob.requirements),
      benefits: JSON.parse(updatedJob.benefits),
      applicationUrl: updatedJob.application_url,
      isActive: Boolean(updatedJob.is_active),
      featured: Boolean(updatedJob.featured),
      applicantsCount: updatedJob.applicants_count,
      viewsCount: updatedJob.views_count,
      postedAt: updatedJob.posted_at,
      expiresAt: updatedJob.expires_at,
      updatedAt: updatedJob.updated_at,
    };

    console.log("✅ Job posting updated successfully:", id);

    res.json({
      message: "Job posting updated successfully",
      job: formattedJob,
    });
  } catch (error) {
    console.error("Error updating job posting:", error);
    res.status(500).json({ error: "Failed to update job posting" });
  }
});

// Delete job posting
router.delete("/admin/jobs/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Deleting job posting:", id);

    // Check if job exists
    const [existingRows] = await pool.execute(
      "SELECT id, title FROM job_postings WHERE id = ?",
      [id]
    );
    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    const job = (existingRows as RowDataPacket[])[0];

    // Delete job posting (applications will be deleted due to foreign key constraint)
    await pool.execute("DELETE FROM job_postings WHERE id = ?", [id]);

    console.log("✅ Job posting deleted successfully:", job.title);

    res.json({ message: "Job posting deleted successfully" });
  } catch (error) {
    console.error("Error deleting job posting:", error);
    res.status(500).json({ error: "Failed to delete job posting" });
  }
});

// Get all job applications for admin
router.get("/admin/applications", requireAdmin, async (req, res) => {
  try {
    const {
      jobId = "",
      status = "",
      search = "",
      sort = "newest",
      limit = 50,
      offset = 0,
    } = req.query;

    console.log("📋 Admin applications API called with params:", req.query);

    // Build the query
    let query = `
      SELECT 
        a.id, a.job_id, a.user_id, a.full_name, a.email, a.phone, a.resume_url, 
        a.cover_letter, a.status, a.created_at, a.updated_at,
        j.title as job_title, j.department, j.location, j.location_type
      FROM job_applications a
      JOIN job_postings j ON a.job_id = j.id
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Add job filter
    if (jobId) {
      query += ` AND a.job_id = ?`;
      queryParams.push(jobId);
    }

    // Add status filter
    if (status) {
      query += ` AND a.status = ?`;
      queryParams.push(status);
    }

    // Add search filter
    if (search) {
      query += ` AND (
        a.full_name LIKE ? OR 
        a.email LIKE ? OR 
        j.title LIKE ? OR
        j.department LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    // Add sorting
    if (sort === "oldest") {
      query += ` ORDER BY a.created_at ASC`;
    } else if (sort === "name-asc") {
      query += ` ORDER BY a.full_name ASC`;
    } else if (sort === "name-desc") {
      query += ` ORDER BY a.full_name DESC`;
    } else if (sort === "job-title") {
      query += ` ORDER BY j.title ASC`;
    } else {
      // Default: newest first
      query += ` ORDER BY a.created_at DESC`;
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM job_applications a
      JOIN job_postings j ON a.job_id = j.id
      WHERE 1=1
    `;

    const countParams: any[] = [];

    // Add filters to count query
    if (jobId) {
      countQuery += ` AND a.job_id = ?`;
      countParams.push(jobId);
    }

    if (status) {
      countQuery += ` AND a.status = ?`;
      countParams.push(status);
    }

    if (search) {
      countQuery += ` AND (
        a.full_name LIKE ? OR 
        a.email LIKE ? OR 
        j.title LIKE ? OR
        j.department LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm, searchTerm);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = (countResult as RowDataPacket[])[0].total;

    // Format the response
    const applications = (rows as RowDataPacket[]).map((app) => ({
      id: app.id.toString(),
      jobId: app.job_id.toString(),
      userId: app.user_id?.toString() || null,
      jobTitle: app.job_title,
      department: app.department,
      location: app.location,
      locationType: app.location_type,
      fullName: app.full_name,
      email: app.email,
      phone: app.phone,
      resumeUrl: app.resume_url,
      coverLetter: app.cover_letter,
      status: app.status,
      createdAt: app.created_at,
      updatedAt: app.updated_at,
    }));

    console.log(
      `✅ Admin returning ${applications.length} applications out of ${total} total`
    );

    res.json({
      applications,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Error fetching admin applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Update application status
router.put("/admin/applications/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    console.log("📝 Updating application status:", { id, status });

    // Validate status
    const validStatuses = [
      "pending",
      "reviewed",
      "interviewed",
      "rejected",
      "hired",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Check if application exists
    const [existingRows] = await pool.execute(
      "SELECT id, full_name, email FROM job_applications WHERE id = ?",
      [id]
    );
    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    const application = (existingRows as RowDataPacket[])[0];

    // Update application status
    await pool.execute(
      "UPDATE job_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, id]
    );

    console.log(
      "✅ Application status updated successfully:",
      application.full_name
    );

    res.json({ message: "Application status updated successfully" });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

// Delete application
router.delete("/admin/applications/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    console.log("🗑️ Deleting application:", id);

    // Check if application exists
    const [existingRows] = await pool.execute(
      "SELECT id, full_name, email, job_id FROM job_applications WHERE id = ?",
      [id]
    );
    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    const application = (existingRows as RowDataPacket[])[0];

    // Delete application
    await pool.execute("DELETE FROM job_applications WHERE id = ?", [id]);

    // Decrement applicants count
    await pool.execute(
      "UPDATE job_postings SET applicants_count = applicants_count - 1 WHERE id = ?",
      [application.job_id]
    );

    console.log("✅ Application deleted successfully:", application.full_name);

    res.json({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    res.status(500).json({ error: "Failed to delete application" });
  }
});

// Get admin dashboard statistics
router.get("/admin/dashboard", requireAdmin, async (req, res) => {
  try {
    // Get job statistics
    const [totalJobsResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM job_postings"
    );
    const totalJobs = (totalJobsResult as RowDataPacket[])[0].total;

    const [activeJobsResult] = await pool.execute(
      "SELECT COUNT(*) as active FROM job_postings WHERE is_active = 1 AND (expires_at IS NULL OR expires_at > CURDATE())"
    );
    const activeJobs = (activeJobsResult as RowDataPacket[])[0].active;

    const [featuredJobsResult] = await pool.execute(
      "SELECT COUNT(*) as featured FROM job_postings WHERE featured = 1 AND is_active = 1"
    );
    const featuredJobs = (featuredJobsResult as RowDataPacket[])[0].featured;

    // Get application statistics
    const [totalApplicationsResult] = await pool.execute(
      "SELECT COUNT(*) as total FROM job_applications"
    );
    const totalApplications = (totalApplicationsResult as RowDataPacket[])[0]
      .total;

    const [pendingApplicationsResult] = await pool.execute(
      "SELECT COUNT(*) as pending FROM job_applications WHERE status = 'pending'"
    );
    const pendingApplications = (
      pendingApplicationsResult as RowDataPacket[]
    )[0].pending;

    const [reviewedApplicationsResult] = await pool.execute(
      "SELECT COUNT(*) as reviewed FROM job_applications WHERE status = 'reviewed'"
    );
    const reviewedApplications = (
      reviewedApplicationsResult as RowDataPacket[]
    )[0].reviewed;

    // Get recent applications
    const [recentApplicationsResult] = await pool.execute(
      `SELECT 
        a.id, a.full_name, a.email, a.status, a.created_at,
        j.title as job_title, j.department
      FROM job_applications a
      JOIN job_postings j ON a.job_id = j.id
      ORDER BY a.created_at DESC
      LIMIT 10`
    );

    const recentApplications = (
      recentApplicationsResult as RowDataPacket[]
    ).map((app) => ({
      id: app.id.toString(),
      fullName: app.full_name,
      email: app.email,
      jobTitle: app.job_title,
      department: app.department,
      status: app.status,
      createdAt: app.created_at,
    }));

    // Get top performing jobs
    const [topJobsResult] = await pool.execute(
      `SELECT 
        id, title, department, applicants_count, views_count
      FROM job_postings
      WHERE is_active = 1
      ORDER BY applicants_count DESC
      LIMIT 5`
    );

    const topJobs = (topJobsResult as RowDataPacket[]).map((job) => ({
      id: job.id.toString(),
      title: job.title,
      department: job.department,
      applicantsCount: job.applicants_count,
      viewsCount: job.views_count,
    }));

    res.json({
      jobStats: {
        totalJobs,
        activeJobs,
        featuredJobs,
      },
      applicationStats: {
        totalApplications,
        pendingApplications,
        reviewedApplications,
      },
      recentApplications,
      topJobs,
    });
  } catch (error) {
    console.error("Error fetching admin dashboard:", error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

// Get applications for a specific job (for admin)
router.get("/jobs/:id/applications", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      status = "",
      search = "",
      sort = "newest",
      limit = 50,
      offset = 0,
    } = req.query;

    console.log("📋 Fetching applications for job:", id);

    // Check if job exists
    const [jobRows] = await pool.execute(
      "SELECT id, title FROM job_postings WHERE id = ?",
      [id]
    );
    if ((jobRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    // Build the query
    let query = `
      SELECT 
        a.id, a.job_id, a.user_id, a.full_name, a.email, a.phone, a.resume_url, 
        a.cover_letter, a.status, a.created_at, a.updated_at,
        j.title as job_title, j.department, j.location, j.location_type
      FROM job_applications a
      JOIN job_postings j ON a.job_id = j.id
      WHERE a.job_id = ?
    `;

    const queryParams: any[] = [id];

    // Add status filter
    if (status) {
      query += ` AND a.status = ?`;
      queryParams.push(status);
    }

    // Add search filter
    if (search) {
      query += ` AND (
        a.full_name LIKE ? OR 
        a.email LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    // Add sorting
    if (sort === "oldest") {
      query += ` ORDER BY a.created_at ASC`;
    } else if (sort === "name-asc") {
      query += ` ORDER BY a.full_name ASC`;
    } else if (sort === "name-desc") {
      query += ` ORDER BY a.full_name ASC`;
    } else {
      // Default: newest first
      query += ` ORDER BY a.created_at DESC`;
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);

    // Format the response with mock user data since we don't have a users table
    const applications = (rows as RowDataPacket[]).map((app) => ({
      id: app.id.toString(),
      jobId: app.job_id.toString(),
      jobTitle: app.job_title,
      department: app.department,
      location: app.location,
      locationType: app.location_type,
      fullName: app.full_name,
      email: app.email,
      phone: app.phone,
      resumeUrl: app.resume_url,
      coverLetter: app.cover_letter,
      status: app.status,
      createdAt: app.created_at,
      updatedAt: app.updated_at,
      user: {
        id: app.user_id?.toString() || "guest",
        username: app.email.split("@")[0],
        firstName: app.full_name.split(" ")[0] || "Unknown",
        lastName: app.full_name.split(" ").slice(1).join(" ") || "User",
        avatar: null,
      },
    }));

    console.log(
      `✅ Returning ${applications.length} applications for job ${id}`
    );

    res.json({
      applications,
      total: applications.length,
    });
  } catch (error) {
    console.error("Error fetching job applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
});

// Toggle job active status
router.post("/jobs/:id/toggle-active", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get current status
    const [rows] = await pool.execute(
      "SELECT is_active FROM job_postings WHERE id = ?",
      [id]
    );
    if ((rows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    const currentStatus = (rows as RowDataPacket[])[0].is_active;
    const newStatus = !currentStatus;

    // Update status
    await pool.execute(
      "UPDATE job_postings SET is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newStatus, id]
    );

    console.log(`✅ Job ${id} active status changed to: ${newStatus}`);

    res.json({
      isActive: newStatus,
      message: `Job posting ${
        newStatus ? "activated" : "deactivated"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling job active status:", error);
    res.status(500).json({ error: "Failed to update job status" });
  }
});

// Toggle job featured status
router.post("/jobs/:id/toggle-featured", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Get current status
    const [rows] = await pool.execute(
      "SELECT featured FROM job_postings WHERE id = ?",
      [id]
    );
    if ((rows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Job posting not found" });
    }

    const currentStatus = (rows as RowDataPacket[])[0].featured;
    const newStatus = !currentStatus;

    // Update status
    await pool.execute(
      "UPDATE job_postings SET featured = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [newStatus, id]
    );

    console.log(`✅ Job ${id} featured status changed to: ${newStatus}`);

    res.json({
      featured: newStatus,
      message: `Job posting ${
        newStatus ? "featured" : "unfeatured"
      } successfully`,
    });
  } catch (error) {
    console.error("Error toggling job featured status:", error);
    res.status(500).json({ error: "Failed to update featured status" });
  }
});

// Update application status (alternative endpoint)
router.patch("/applications/:id/status", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("📝 Updating application status:", { id, status });

    // Validate status
    const validStatuses = [
      "pending",
      "reviewed",
      "interviewed",
      "rejected",
      "hired",
    ];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    // Check if application exists
    const [existingRows] = await pool.execute(
      "SELECT id, full_name, email FROM job_applications WHERE id = ?",
      [id]
    );
    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Application not found" });
    }

    const application = (existingRows as RowDataPacket[])[0];

    // Update application status
    await pool.execute(
      "UPDATE job_applications SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [status, id]
    );

    console.log(
      "✅ Application status updated successfully:",
      application.full_name
    );

    res.json({
      message: "Application status updated successfully",
      status: status,
    });
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ error: "Failed to update application status" });
  }
});

export default router;
