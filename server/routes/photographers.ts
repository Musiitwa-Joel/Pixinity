import express from "express";
import { pool } from "../database";
import type { ResultSetHeader, RowDataPacket } from "mysql2";

const router = express.Router();

// Get all photographers
router.get("/", async (req, res) => {
  try {
    const {
      search = "",
      filter = "all",
      sort = "followers",
      limit = 20,
      offset = 0,
    } = req.query;

    console.log("Fetching photographers with params:", {
      search,
      filter,
      sort,
      limit,
      offset,
    });

    // Build the query based on filters
    let query = `
      SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.avatar, 
             u.bio, u.website, u.location, u.instagram, u.twitter, u.behance, u.dribbble,
             u.role, u.verified, u.followers_count, u.following_count, u.uploads_count, 
             u.total_views, u.total_downloads, u.created_at, u.updated_at,
             (SELECT COUNT(*) FROM photos WHERE user_id = u.id) as actual_uploads_count,
             (SELECT COALESCE(SUM(views), 0) FROM photos WHERE user_id = u.id) as actual_total_views,
             (SELECT COALESCE(SUM(likes), 0) FROM photos WHERE user_id = u.id) as actual_total_likes,
             (SELECT COALESCE(SUM(downloads), 0) FROM photos WHERE user_id = u.id) as actual_total_downloads,
             (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as actual_followers_count
      FROM users u
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Add search filter
    if (search) {
      query += ` AND (
        u.username LIKE ? OR 
        u.first_name LIKE ? OR 
        u.last_name LIKE ? OR 
        u.bio LIKE ? OR
        u.location LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm,
        searchTerm
      );
    }

    // Add role filter
    if (filter === "verified") {
      query += " AND u.verified = 1";
    } else if (filter === "featured") {
      query += " AND (u.verified = 1 OR u.role = 'admin')";
    }

    // Add sorting
    if (sort === "followers") {
      query += " ORDER BY actual_followers_count DESC";
    } else if (sort === "uploads") {
      query += " ORDER BY actual_uploads_count DESC";
    } else if (sort === "views") {
      query += " ORDER BY actual_total_views DESC";
    } else if (sort === "newest") {
      query += " ORDER BY u.created_at DESC";
    } else {
      query += " ORDER BY actual_followers_count DESC";
    }

    // Add pagination
    query += " LIMIT ? OFFSET ?";
    queryParams.push(Number(limit), Number(offset));

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);
    const photographers = rows as RowDataPacket[];

    // Get total count for pagination
    const [countResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM users WHERE role = 'photographer' OR role = 'company' OR role = 'admin'`
    );
    const total = (countResult as RowDataPacket[])[0].total;

    // Format the response
    const formattedPhotographers = photographers.map((photographer) => ({
      id: photographer.id.toString(),
      email: photographer.email,
      username: photographer.username,
      firstName: photographer.first_name,
      lastName: photographer.last_name,
      avatar: photographer.avatar,
      bio: photographer.bio,
      website: photographer.website,
      location: photographer.location,
      socialLinks: {
        instagram: photographer.instagram,
        twitter: photographer.twitter,
        behance: photographer.behance,
        dribbble: photographer.dribbble,
      },
      role: photographer.role,
      verified: Boolean(photographer.verified),
      followersCount: photographer.actual_followers_count || 0,
      followingCount: photographer.following_count || 0,
      uploadsCount: photographer.actual_uploads_count || 0,
      totalViews: photographer.actual_total_views || 0,
      totalLikes: photographer.actual_total_likes || 0,
      totalDownloads: photographer.actual_total_downloads || 0,
      createdAt: photographer.created_at,
      updatedAt: photographer.updated_at,
    }));

    console.log(
      `Fetched ${formattedPhotographers.length} photographers out of ${total} total`
    );

    res.json({
      photographers: formattedPhotographers,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Error fetching photographers:", error);
    res.status(500).json({ error: "Failed to fetch photographers" });
  }
});

// Get photographer stats
router.get("/stats", async (req, res) => {
  try {
    // Get total photographers count
    const [totalResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM users WHERE role = 'photographer' OR role = 'company' OR role = 'admin'`
    );
    const total = (totalResult as RowDataPacket[])[0].total;

    // Get verified photographers count
    const [verifiedResult] = await pool.execute(
      `SELECT COUNT(*) as verified FROM users WHERE verified = 1 AND (role = 'photographer' OR role = 'company' OR role = 'admin')`
    );
    const verified = (verifiedResult as RowDataPacket[])[0].verified;

    // Get featured photographers count (admin or verified with high followers)
    const [featuredResult] = await pool.execute(
      `SELECT COUNT(*) as featured FROM users WHERE (role = 'admin' OR verified = 1) AND followers_count > 100`
    );
    const featured = (featuredResult as RowDataPacket[])[0].featured;

    // Get total photos count
    const [photosResult] = await pool.execute(
      `SELECT COUNT(*) as total FROM photos`
    );
    const totalPhotos = (photosResult as RowDataPacket[])[0].total;

    res.json({
      totalPhotographers: total,
      verifiedPhotographers: verified,
      featuredPhotographers: featured,
      totalPhotos,
    });
  } catch (error) {
    console.error("Error fetching photographer stats:", error);
    res.status(500).json({ error: "Failed to fetch photographer stats" });
  }
});

// Get photographer by username
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const [rows] = await pool.execute(
      `SELECT u.id, u.email, u.username, u.first_name, u.last_name, u.avatar, 
              u.bio, u.website, u.location, u.instagram, u.twitter, u.behance, u.dribbble,
              u.role, u.verified, u.followers_count, u.following_count, u.uploads_count, 
              u.total_views, u.total_downloads, u.created_at, u.updated_at,
              (SELECT COUNT(*) FROM photos WHERE user_id = u.id) as actual_uploads_count,
              (SELECT COALESCE(SUM(views), 0) FROM photos WHERE user_id = u.id) as actual_total_views,
              (SELECT COALESCE(SUM(likes), 0) FROM photos WHERE user_id = u.id) as actual_total_likes,
              (SELECT COALESCE(SUM(downloads), 0) FROM photos WHERE user_id = u.id) as actual_total_downloads,
              (SELECT COUNT(*) FROM follows WHERE following_id = u.id) as actual_followers_count
       FROM users u WHERE u.username = ?`,
      [username]
    );

    const photographers = rows as RowDataPacket[];
    if (photographers.length === 0) {
      return res.status(404).json({ error: "Photographer not found" });
    }

    const photographer = photographers[0];

    // Format the response
    const formattedPhotographer = {
      id: photographer.id.toString(),
      email: photographer.email,
      username: photographer.username,
      firstName: photographer.first_name,
      lastName: photographer.last_name,
      avatar: photographer.avatar,
      bio: photographer.bio,
      website: photographer.website,
      location: photographer.location,
      socialLinks: {
        instagram: photographer.instagram,
        twitter: photographer.twitter,
        behance: photographer.behance,
        dribbble: photographer.dribbble,
      },
      role: photographer.role,
      verified: Boolean(photographer.verified),
      followersCount: photographer.actual_followers_count || 0,
      followingCount: photographer.following_count || 0,
      uploadsCount: photographer.actual_uploads_count || 0,
      totalViews: photographer.actual_total_views || 0,
      totalLikes: photographer.actual_total_likes || 0,
      totalDownloads: photographer.actual_total_downloads || 0,
      createdAt: photographer.created_at,
      updatedAt: photographer.updated_at,
    };

    res.json(formattedPhotographer);
  } catch (error) {
    console.error("Error fetching photographer:", error);
    res.status(500).json({ error: "Failed to fetch photographer" });
  }
});

export default router;
