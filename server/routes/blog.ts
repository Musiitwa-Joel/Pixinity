import express from "express";
import { pool } from "../database";
import { validateSession } from "../auth";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import multer from "multer";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

// Middleware to check authentication
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
    if (user.role !== "admin" && user.email !== "musiitwajoel@gmail.com") {
      return res.status(403).json({ error: "Admin access required" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Admin auth middleware error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

// Configure multer for blog cover image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), "uploads", "blog");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "blog-cover-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed") as any);
    }
  },
});

// Ensure blog tables exist
const ensureBlogTables = async () => {
  try {
    // Check if blog_posts table exists
    const [postsTableResult] = await pool.execute(
      `SELECT COUNT(*) as count FROM information_schema.tables 
       WHERE table_schema = DATABASE() AND table_name = 'blog_posts'`
    );
    const postsTableExists = (postsTableResult as RowDataPacket[])[0].count > 0;

    if (!postsTableExists) {
      console.log("Creating blog_posts table...");
      await pool.execute(`
        CREATE TABLE blog_posts (
          id INT AUTO_INCREMENT PRIMARY KEY,
          title VARCHAR(255) NOT NULL,
          slug VARCHAR(255) NOT NULL UNIQUE,
          excerpt TEXT,
          content TEXT,
          cover_image VARCHAR(255),
          category VARCHAR(100),
          tags JSON,
          author_id INT NOT NULL,
          published BOOLEAN DEFAULT FALSE,
          featured BOOLEAN DEFAULT FALSE,
          views INT DEFAULT 0,
          likes INT DEFAULT 0,
          comments INT DEFAULT 0,
          read_time INT DEFAULT 5,
          published_at TIMESTAMP NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
    }

    // Check if blog_comments table exists
    const [commentsTableResult] = await pool.execute(
      `SELECT COUNT(*) as count FROM information_schema.tables 
       WHERE table_schema = DATABASE() AND table_name = 'blog_comments'`
    );
    const commentsTableExists =
      (commentsTableResult as RowDataPacket[])[0].count > 0;

    if (!commentsTableExists) {
      console.log("Creating blog_comments table...");
      await pool.execute(`
        CREATE TABLE blog_comments (
          id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT NOT NULL,
          user_id INT NOT NULL,
          parent_id INT NULL,
          content TEXT NOT NULL,
          likes INT DEFAULT 0,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
          FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (parent_id) REFERENCES blog_comments(id) ON DELETE CASCADE
        )
      `);
    }

    // Check if blog_likes table exists
    const [likesTableResult] = await pool.execute(
      `SELECT COUNT(*) as count FROM information_schema.tables 
       WHERE table_schema = DATABASE() AND table_name = 'blog_likes'`
    );
    const likesTableExists = (likesTableResult as RowDataPacket[])[0].count > 0;

    if (!likesTableExists) {
      console.log("Creating blog_likes table...");
      await pool.execute(`
        CREATE TABLE blog_likes (
          id INT AUTO_INCREMENT PRIMARY KEY,
          post_id INT NOT NULL,
          user_id INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          UNIQUE KEY unique_post_user (post_id, user_id),
          FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
      `);
    }

    // Insert sample blog posts if none exist
    const [postsCountResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM blog_posts"
    );
    const postsCount = (postsCountResult as RowDataPacket[])[0].count;

    if (postsCount === 0) {
      console.log("Inserting sample blog posts...");

      // Find admin user
      const [adminResult] = await pool.execute(
        "SELECT id FROM users WHERE email = 'musiitwajoel@gmail.com' OR role = 'admin' LIMIT 1"
      );

      const adminUsers = adminResult as RowDataPacket[];
      if (adminUsers.length > 0) {
        const adminId = adminUsers[0].id;

        // Insert sample posts
        await pool.execute(
          `
          INSERT INTO blog_posts 
          (title, slug, excerpt, content, cover_image, category, tags, author_id, published, featured, views, likes, comments, read_time, published_at) 
          VALUES 
          (
            'Mastering Golden Hour Photography: A Complete Guide', 
            'mastering-golden-hour-photography', 
            'Discover the secrets to capturing stunning golden hour photos with professional techniques and insider tips.',
            '# Mastering Golden Hour Photography: A Complete Guide\n\nThe golden hour is that magical time shortly after sunrise or before sunset when the sun is low on the horizon, creating a soft, diffused light that can transform an ordinary scene into something extraordinary. This guide will help you make the most of this special time for photography.\n\n## What is Golden Hour?\n\nGolden hour occurs twice daily: shortly after sunrise and just before sunset. During these times, the sun\'s position in the sky creates several ideal conditions for photography:\n\n- Soft, diffused light that minimizes harsh shadows\n- A warm, golden glow that adds richness to your images\n- Long shadows that add depth and dimension\n- Reduced contrast that helps preserve details in highlights and shadows\n\n## Planning for Golden Hour\n\nSuccessful golden hour photography starts with planning:\n\n1. **Check the timing**: Use apps like PhotoPills or websites like SunsetWx to determine exactly when golden hour will occur at your location.\n\n2. **Scout locations in advance**: Visit potential shooting locations during the day to plan compositions and understand how the light will fall.\n\n3. **Arrive early**: Give yourself at least 30 minutes before golden hour starts to set up your equipment and prepare.\n\n4. **Stay late**: The light continues to change throughout golden hour, often becoming more dramatic as it progresses.\n\n## Camera Settings for Golden Hour\n\nWhile settings will vary based on your specific scene, here are some starting points:\n\n- **Aperture**: f/8 to f/16 for landscapes to maximize depth of field\n- **ISO**: Keep as low as possible (100-400) to minimize noise\n- **Shutter Speed**: Adjust based on available light, typically 1/60 to 1/200\n- **White Balance**: Auto works well, but try the Daylight or Cloudy presets for warmer tones\n\n## Composition Techniques\n\nGolden hour light enhances almost any composition, but these techniques work particularly well:\n\n1. **Backlighting**: Shooting toward the sun can create dramatic silhouettes and beautiful rim lighting.\n\n2. **Side lighting**: When the sun is low, side lighting creates texture and dimension by casting gentle shadows.\n\n3. **Flare**: Intentionally including lens flare can add a dreamy, artistic quality to your images.\n\n4. **Reflections**: Golden hour light creates stunning reflections on water surfaces.\n\n## Post-Processing Golden Hour Photos\n\nGolden hour photos often need minimal editing, but consider these adjustments:\n\n- Slightly boost warmth to enhance the golden glow\n- Add a gentle vignette to draw attention to your subject\n- Use graduated filters to balance exposure between bright skies and darker foregrounds\n- Consider using split toning to add complementary colors to highlights and shadows\n\n## Common Challenges and Solutions\n\n**Challenge**: The sun is too bright when shooting directly into it.\n**Solution**: Use a graduated ND filter or bracket your exposures to blend later.\n\n**Challenge**: Colors look washed out or flat.\n**Solution**: Slightly underexpose (by 1/3 to 2/3 stops) to saturate colors.\n\n**Challenge**: Golden hour doesn\'t last long enough.\n**Solution**: Have a shot list prepared and prioritize your most important compositions.\n\n## Conclusion\n\nGolden hour photography requires planning and quick execution, but the results are well worth the effort. With practice, you\'ll develop an intuitive understanding of how to work with this magical light to create images that stand out from the crowd.\n\nRemember that while technical skills are important, the best golden hour photos often come from photographers who connect emotionally with their subjects and the light. Take time to appreciate the beauty around you, and let that appreciation guide your creative decisions.',
            'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            'Photography Tips',
            '["golden hour", "lighting", "landscape", "tips"]',
            ?,
            TRUE,
            TRUE,
            12500,
            342,
            89,
            8,
            DATE_SUB(NOW(), INTERVAL 15 DAY)
          ),
          (
            'Camera Gear Review: Sony α7R V vs Canon EOS R5', 
            'sony-a7r-v-vs-canon-eos-r5-comparison', 
            'An in-depth comparison of two flagship mirrorless cameras for professional photographers.',
            '# Sony α7R V vs Canon EOS R5: The Ultimate Comparison\n\nWhen it comes to professional mirrorless cameras, the Sony α7R V and Canon EOS R5 represent the pinnacle of what\'s currently available. Both cameras offer exceptional image quality, advanced autofocus capabilities, and impressive video features. But which one is right for you? Let\'s break it down.\n\n## Sensor and Image Quality\n\n### Sony α7R V\n- **Resolution**: 61MP full-frame Exmor R CMOS sensor\n- **Dynamic Range**: Approximately 15 stops\n- **ISO Range**: 100-32,000 (expandable to 50-102,400)\n- **Bit Depth**: 14-bit RAW\n\n### Canon EOS R5\n- **Resolution**: 45MP full-frame CMOS sensor\n- **Dynamic Range**: Approximately 14 stops\n- **ISO Range**: 100-51,200 (expandable to 50-102,400)\n- **Bit Depth**: 14-bit RAW\n\n**Verdict**: The Sony α7R V wins on pure resolution, making it better for landscape, studio, and commercial work where detail is paramount. However, the Canon R5\'s slightly lower resolution may result in better high ISO performance for low-light shooting.\n\n## Autofocus Performance\n\n### Sony α7R V\n- **AF Points**: 693 phase-detection points covering 93% of the frame\n- **Eye AF**: Human, animal, and bird eye detection\n- **Low-light Performance**: -4 EV\n- **AI Subject Recognition**: Advanced real-time tracking with deep learning\n\n### Canon EOS R5\n- **AF Points**: 1,053 phase-detection points covering 100% of the frame\n- **Eye AF**: Human, animal, and bird eye detection\n- **Low-light Performance**: -6 EV\n- **AI Subject Recognition**: Deep learning-based subject detection and tracking\n\n**Verdict**: Both cameras offer industry-leading autofocus, but Canon\'s system works in slightly darker conditions and covers more of the frame. In real-world use, both are exceptional, with Canon perhaps having a slight edge for action photography.\n\n## Video Capabilities\n\n### Sony α7R V\n- **8K**: No\n- **4K**: Up to 60p with 1.24x crop (oversampled from 6.2K)\n- **Full-frame 4K**: Yes, up to 30p\n- **10-bit**: Yes, 4:2:2 internal\n- **Log Profiles**: S-Log2, S-Log3\n- **Recording Limits**: 60 minutes\n\n### Canon EOS R5\n- **8K**: Yes, up to 30p RAW\n- **4K**: Up to 120p\n- **Full-frame 4K**: Yes, up to 60p\n- **10-bit**: Yes, 4:2:2 internal\n- **Log Profiles**: Canon Log, Canon Log 3\n- **Recording Limits**: 20-30 minutes (8K/4K60), longer for 4K30\n\n**Verdict**: The Canon EOS R5 offers more impressive video specs on paper, particularly with 8K RAW and 4K120. However, it\'s known to have overheating issues when pushing these limits. The Sony offers more reliable performance for extended shooting, albeit with lower maximum specifications.\n\n## Stabilization\n\n### Sony α7R V\n- **In-body Stabilization**: 8 stops (claimed)\n- **Sensor-shift Technology**: Yes, with multi-shot high-resolution mode\n\n### Canon EOS R5\n- **In-body Stabilization**: 8 stops (claimed)\n- **Sensor-shift Technology**: Yes, with multi-shot high-resolution mode\n\n**Verdict**: Both cameras offer excellent stabilization. Real-world testing suggests they\'re very comparable, with performance varying slightly depending on the lens used.\n\n## Build and Ergonomics\n\n### Sony α7R V\n- **Weather Sealing**: Excellent\n- **Weight**: 723g\n- **Battery Life**: Approximately 530 shots\n- **Card Slots**: Dual (1 CFexpress Type A/SD, 1 SD)\n- **EVF**: 9.44M-dot, 0.90x magnification\n\n### Canon EOS R5\n- **Weather Sealing**: Excellent\n- **Weight**: 738g\n- **Battery Life**: Approximately 490 shots\n- **Card Slots**: Dual (1 CFexpress Type B, 1 SD)\n- **EVF**: 5.76M-dot, 0.76x magnification\n\n**Verdict**: Sony has the better EVF, while Canon uses the faster CFexpress Type B cards. Ergonomics are highly personal, but Canon\'s design is often preferred by those with larger hands, while Sony\'s more compact body appeals to others.\n\n## Price and Value\n\n- **Sony α7R V**: $3,899 (body only)\n- **Canon EOS R5**: $3,899 (body only)\n\nBoth cameras represent significant investments and are priced identically, making the decision more about features and ecosystem than cost.\n\n## Ecosystem Considerations\n\n### Sony\n- Mature mirrorless system with extensive native lens lineup\n- Excellent third-party lens support\n- Strong focus on continuous improvement via firmware updates\n\n### Canon\n- Growing RF lens lineup with exceptional premium offerings\n- Backward compatibility with EF lenses via adapter\n- Historically strong professional support network\n\n## Conclusion\n\n**Choose the Sony α7R V if:**\n- Maximum resolution is your priority\n- You need the most reliable video recording for longer sessions\n- You already own Sony lenses\n- You value having the best electronic viewfinder available\n\n**Choose the Canon EOS R5 if:**\n- You need 8K video capability\n- You shoot in extremely low light conditions\n- You prefer Canon\'s color science and ergonomics\n- You own Canon EF lenses you want to continue using\n\nBoth cameras represent the cutting edge of mirrorless technology and will serve professional photographers exceptionally well. The decision ultimately comes down to specific needs, preferences, and existing equipment investments rather than one camera being objectively "better" than the other.',
            'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            'Gear Reviews',
            '["camera", "review", "sony", "canon", "mirrorless"]',
            ?,
            TRUE,
            FALSE,
            8900,
            156,
            45,
            12,
            DATE_SUB(NOW(), INTERVAL 12 DAY)
          ),
          (
            'Street Photography Ethics: Capturing Life Respectfully', 
            'street-photography-ethics', 
            'Navigate the complex world of street photography while respecting privacy and cultural sensitivities.',
            '# Street Photography Ethics: Capturing Life Respectfully\n\nStreet photography captures authentic moments of everyday life in public spaces. But with this art form comes significant ethical responsibilities. This guide explores how to practice street photography respectfully while still creating powerful images.\n\n## The Legal vs. Ethical Distinction\n\nBefore diving into ethics, it\'s important to understand the legal framework:\n\n- In most countries, photographing people in public spaces is legal without explicit permission\n- Commercial usage often requires a model release\n- Some countries have stricter privacy laws that limit street photography\n- Legal rights to photograph don\'t always align with ethical considerations\n\nJust because you *can* legally take a photo doesn\'t always mean you *should*.\n\n## Core Ethical Principles\n\n### 1. Respect Dignity and Privacy\n\nThe fundamental principle of ethical street photography is respecting the dignity of your subjects. Consider:\n\n- Would you feel comfortable if someone photographed you in this situation?\n- Does the image potentially embarrass or exploit the subject?\n- Are you photographing someone in a vulnerable state or private moment?\n\n### 2. Cultural Sensitivity\n\nDifferent cultures have varying attitudes toward photography. Research local customs before photographing in unfamiliar places:\n\n- Some cultures believe photographs capture the soul or essence of a person\n- Religious practices may prohibit or discourage photography\n- Certain communities may have historical reasons to distrust photographers\n\n### 3. Informed Consent Considerations\n\nWhile street photography traditionally doesn\'t require explicit permission, consider these approaches:\n\n- **Candid then connect**: Take the candid shot, then approach the subject, show them the image, and offer to delete it if they object\n- **Engage first**: Start a conversation and ask permission before photographing\n- **Nonverbal consent**: Make your intentions clear with your camera visible, giving subjects the opportunity to move away or signal disapproval\n\n## Practical Ethical Guidelines\n\n### Photographing Vulnerable Populations\n\nExtra sensitivity is required when photographing:\n\n- Homeless individuals\n- Children\n- People in distress or emergency situations\n- Those with visible disabilities or differences\n\nAsk yourself: Is this image necessary? Does it tell an important story, or does it potentially exploit vulnerability?\n\n### Editing and Presentation\n\nEthics extend beyond the moment of capture:\n\n- Present images in their proper context\n- Avoid misleading captions or framing\n- Consider how your edit affects the perception of the subject\n- Be thoughtful about where and how you share the images\n\n### When to Put the Camera Down\n\nSome situations call for humanity over photography:\n\n- When someone explicitly asks not to be photographed\n- When someone needs help or assistance\n- When taking a photo would escalate a tense situation\n- When photography feels exploitative rather than documentary\n\n## Finding Your Ethical Approach\n\nDevelop your personal code of ethics by considering:\n\n1. **Intent**: Why are you taking this photograph? Is it to document, to tell a story, or for personal gain?\n\n2. **Impact**: What effect might this image have on the subject? On viewers? On society?\n\n3. **Representation**: Does your work fairly represent the communities you photograph?\n\n4. **Consistency**: Apply the same ethical standards regardless of location or subject\n\n## Case Studies in Ethical Street Photography\n\n### The Work of Vivian Maier\n\nVivian Maier\'s approach involved:\n- Photographing from hip level, often unnoticed\n- Focusing on composition and moment rather than confrontation\n- Capturing authentic human experiences with respect\n\n### Contemporary Approaches\n\nPhotographers like Matt Stuart demonstrate that you can:\n- Create compelling street photography while remaining respectful\n- Use humor and timing rather than intrusion\n- Develop a style that doesn\'t rely on shocking or embarrassing subjects\n\n## Conclusion\n\nEthical street photography requires ongoing reflection and adaptation. By approaching your craft with respect, sensitivity, and thoughtfulness, you can create powerful images that honor your subjects while still telling important stories about the human condition.\n\nRemember that the best street photographers are not just observers but participants in the communities they photograph. Building trust and understanding leads not only to more ethical practice but often to more compelling and authentic images.',
            'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            'Photography Tips',
            '["street photography", "ethics", "documentary", "culture"]',
            ?,
            TRUE,
            TRUE,
            5600,
            234,
            67,
            6,
            DATE_SUB(NOW(), INTERVAL 10 DAY)
          ),
          (
            'Post-Processing Workflow: From RAW to Masterpiece', 
            'post-processing-workflow', 
            'Learn a professional post-processing workflow that will transform your RAW files into stunning images.',
            '# Post-Processing Workflow: From RAW to Masterpiece\n\nA well-defined post-processing workflow is essential for consistently producing high-quality images. This guide will walk you through a comprehensive workflow that takes you from RAW files to finished masterpieces, while maintaining efficiency and image quality.\n\n## Part 1: Preparation and Organization\n\n### Setting Up Your Environment\n\nBefore you begin editing, ensure your workspace is optimized:\n\n1. **Monitor Calibration**: Use a calibration tool like X-Rite i1Display or Datacolor SpyderX to ensure accurate colors.\n\n2. **Ambient Lighting**: Edit in consistent lighting conditions, ideally with neutral gray walls and controlled lighting.\n\n3. **Software Updates**: Keep your editing software updated for the latest features and camera support.\n\n### File Management\n\nA solid organization system saves time and frustration:\n\n1. **Folder Structure**: Create a logical hierarchy (Year > Month > Shoot Name).\n\n2. **Naming Convention**: Develop a consistent file naming system (e.g., YYYYMMDD_ProjectName_SequenceNumber).\n\n3. **Backup Strategy**: Implement a 3-2-1 backup strategy (3 copies, 2 different media types, 1 off-site).\n\n## Part 2: Culling and Selection\n\nBefore detailed editing, narrow down your images:\n\n1. **First Pass**: Quickly mark obvious keepers and rejects.\n\n2. **Second Pass**: Compare similar shots and select the strongest versions.\n\n3. **Final Selection**: Limit your selection to the truly exceptional images that tell your story.\n\nTools like Adobe Bridge, Photo Mechanic, or Lightroom\'s Compare View can streamline this process.\n\n## Part 3: Basic Adjustments in Lightroom/ACR\n\nStart with foundational adjustments that affect the entire image:\n\n1. **Lens Corrections**: Apply profile corrections to remove distortion and vignetting.\n\n2. **White Balance**: Set accurate color temperature and tint.\n\n3. **Exposure Adjustments**:\n   - Set the overall exposure\n   - Recover highlights\n   - Open up shadows\n   - Set black and white points for proper contrast\n\n4. **Clarity, Texture, and Dehaze**: Apply subtle adjustments to enhance detail.\n\n5. **Vibrance and Saturation**: Make careful color adjustments to enhance without oversaturating.\n\n## Part 4: Local Adjustments\n\nRefine specific areas of your image:\n\n1. **Graduated Filters**: Balance exposure between sky and foreground.\n\n2. **Radial Filters**: Draw attention to your subject with subtle vignetting or exposure adjustments.\n\n3. **Adjustment Brush**: Make precise local adjustments to exposure, clarity, and color.\n\n4. **Range Masks**: Refine local adjustments based on luminance or color ranges.\n\n## Part 5: Advanced Color Work\n\nElevate your image with sophisticated color adjustments:\n\n1. **HSL Panel**: Fine-tune individual color hues, saturation, and luminance.\n\n2. **Split Toning/Color Grading**: Add creative color to highlights and shadows.\n\n3. **Color Calibration**: Adjust primary colors for a distinctive look.\n\n4. **Color Profiles**: Select or create custom profiles that match your vision.\n\n## Part 6: Photoshop Refinement\n\nFor images that need pixel-level work:\n\n1. **Layered Editing**: Work non-destructively with adjustment layers.\n\n2. **Advanced Healing**: Remove distractions with the healing brush and content-aware fill.\n\n3. **Compositing**: Combine elements from multiple images if needed.\n\n4. **Frequency Separation**: For portrait retouching, separate texture from color/tone.\n\n5. **Dodge and Burn**: Sculpt light and shadow to add dimension.\n\n## Part 7: Sharpening and Noise Reduction\n\nOptimize detail in your final image:\n\n1. **Selective Sharpening**: Apply different levels of sharpening to different areas.\n\n2. **High Pass Sharpening**: For a more controlled approach to edge sharpening.\n\n3. **Noise Reduction**: Address luminance and color noise separately.\n\n4. **Masking**: Apply sharpening only where needed, avoiding smooth areas like skies.\n\n## Part 8: Output Preparation\n\nPrepare your image for its intended use:\n\n1. **Resizing**: Resize appropriately for print or web.\n\n2. **Output Sharpening**: Apply a final pass of sharpening specific to the output size and medium.\n\n3. **Color Space Conversion**: Convert to sRGB for web, Adobe RGB or ProPhoto for print.\n\n4. **Export Settings**: Choose appropriate file format, quality, and metadata options.\n\n## Part 9: Presets and Automation\n\nStreamline your workflow:\n\n1. **Create Import Presets**: Apply basic adjustments automatically on import.\n\n2. **Develop Presets**: Create and refine presets for different types of images.\n\n3. **Export Presets**: Save common export settings for different purposes.\n\n4. **Actions and Droplets**: Automate repetitive Photoshop tasks.\n\n## Part 10: Continuous Improvement\n\nRefine your workflow over time:\n\n1. **Review Past Work**: Periodically review older edits to see how your style has evolved.\n\n2. **Study Others**: Analyze the work of photographers you admire.\n\n3. **Seek Feedback**: Get constructive criticism from peers and mentors.\n\n4. **Track Trends**: Stay current with new techniques while developing your unique style.\n\n## Conclusion\n\nA consistent, well-defined workflow is the foundation of efficient and effective post-processing. While this guide provides a comprehensive framework, remember that your workflow should evolve to match your personal style and the specific needs of each project.\n\nThe goal isn\'t just technical perfection but artistic expression—let your workflow serve your creative vision, not constrain it.',
            'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1',
            'Tutorials',
            '["post-processing", "lightroom", "photoshop", "workflow"]',
            ?,
            TRUE,
            FALSE,
            15200,
            489,
            123,
            15,
            DATE_SUB(NOW(), INTERVAL 8 DAY)
          )
        `,
          [adminId, adminId, adminId, adminId]
        );
      }
    }

    console.log("✅ Blog tables ensured");
  } catch (error) {
    console.error("❌ Error creating blog tables:", error);
  }
};

// Initialize tables on module load
ensureBlogTables();

// Get blog stats
router.get("/stats", async (req, res) => {
  try {
    // Get total posts count
    const [totalPostsResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM blog_posts"
    );
    const totalPosts = (totalPostsResult as RowDataPacket[])[0].count;

    // Get published posts count
    const [publishedPostsResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM blog_posts WHERE published = TRUE"
    );
    const publishedPosts = (publishedPostsResult as RowDataPacket[])[0].count;

    // Get draft posts count
    const [draftPostsResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM blog_posts WHERE published = FALSE"
    );
    const draftPosts = (draftPostsResult as RowDataPacket[])[0].count;

    // Get featured posts count
    const [featuredPostsResult] = await pool.execute(
      "SELECT COUNT(*) as count FROM blog_posts WHERE featured = TRUE"
    );
    const featuredPosts = (featuredPostsResult as RowDataPacket[])[0].count;

    // Get total views
    const [viewsResult] = await pool.execute(
      "SELECT SUM(views) as total FROM blog_posts"
    );
    const totalViews = (viewsResult as RowDataPacket[])[0].total || 0;

    // Get total likes
    const [likesResult] = await pool.execute(
      "SELECT SUM(likes) as total FROM blog_posts"
    );
    const totalLikes = (likesResult as RowDataPacket[])[0].total || 0;

    // Get total comments
    const [commentsResult] = await pool.execute(
      "SELECT SUM(comments) as total FROM blog_posts"
    );
    const totalComments = (commentsResult as RowDataPacket[])[0].total || 0;

    // Get unique authors count
    const [authorsResult] = await pool.execute(
      "SELECT COUNT(DISTINCT author_id) as count FROM blog_posts"
    );
    const uniqueAuthors = (authorsResult as RowDataPacket[])[0].count;

    // Get categories
    const [categoriesResult] = await pool.execute(
      "SELECT DISTINCT category FROM blog_posts WHERE category IS NOT NULL AND category != ''"
    );
    const categories = (categoriesResult as RowDataPacket[]).map(
      (row) => row.category
    );

    res.json({
      totalPosts,
      publishedPosts,
      draftPosts,
      featuredPosts,
      totalViews,
      totalLikes,
      totalComments,
      uniqueAuthors,
      categories,
    });
  } catch (error) {
    console.error("Error fetching blog stats:", error);
    res.status(500).json({ error: "Failed to fetch blog stats" });
  }
});

// Get all blog posts with pagination and filtering
router.get("/posts", async (req, res) => {
  try {
    const {
      search = "",
      category = "",
      tag = "",
      published = "true",
      featured = "",
      author = "",
      sort = "newest",
      limit = 10,
      offset = 0,
    } = req.query;

    // Build the query
    let query = `
      SELECT 
        bp.id, bp.title, bp.slug, bp.excerpt, bp.content, bp.cover_image, 
        bp.category, bp.tags, bp.published, bp.featured, bp.views, bp.likes, 
        bp.comments, bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
        u.id as author_id, u.username as author_username, u.first_name as author_first_name, 
        u.last_name as author_last_name, u.avatar as author_avatar, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE 1=1
    `;

    const queryParams: any[] = [];

    // Add search filter
    if (search) {
      query += ` AND (
        bp.title LIKE ? OR 
        bp.excerpt LIKE ? OR 
        bp.content LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm, searchTerm);
    }

    // Add category filter
    if (category) {
      query += ` AND bp.category = ?`;
      queryParams.push(category);
    }

    // Add tag filter
    if (tag) {
      query += ` AND JSON_CONTAINS(bp.tags, ?)`;
      queryParams.push(`"${tag}"`);
    }

    // Add published filter
    if (published !== "all") {
      const isPublished = published === "true";
      query += ` AND bp.published = ?`;
      queryParams.push(isPublished);
    }

    // Add featured filter
    if (featured) {
      const isFeatured = featured === "true";
      query += ` AND bp.featured = ?`;
      queryParams.push(isFeatured);
    }

    // Add author filter
    if (author) {
      query += ` AND bp.author_id = ?`;
      queryParams.push(author);
    }

    // Add sorting
    if (sort === "oldest") {
      query += ` ORDER BY bp.created_at ASC`;
    } else if (sort === "title_asc") {
      query += ` ORDER BY bp.title ASC`;
    } else if (sort === "title_desc") {
      query += ` ORDER BY bp.title DESC`;
    } else if (sort === "most_viewed") {
      query += ` ORDER BY bp.views DESC`;
    } else if (sort === "most_liked") {
      query += ` ORDER BY bp.likes DESC`;
    } else if (sort === "most_commented") {
      query += ` ORDER BY bp.comments DESC`;
    } else {
      // Default: newest
      query += ` ORDER BY bp.created_at DESC`;
    }

    // Add pagination
    query += ` LIMIT ? OFFSET ?`;
    queryParams.push(Number(limit), Number(offset));

    // Execute the query
    const [rows] = await pool.execute(query, queryParams);
    const posts = rows as RowDataPacket[];

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) as total
      FROM blog_posts bp
      WHERE 1=1
    `;

    const countParams: any[] = [];

    // Add search filter to count query
    if (search) {
      countQuery += ` AND (
        bp.title LIKE ? OR 
        bp.excerpt LIKE ? OR 
        bp.content LIKE ?
      )`;
      const searchTerm = `%${search}%`;
      countParams.push(searchTerm, searchTerm, searchTerm);
    }

    // Add category filter to count query
    if (category) {
      countQuery += ` AND bp.category = ?`;
      countParams.push(category);
    }

    // Add tag filter to count query
    if (tag) {
      countQuery += ` AND JSON_CONTAINS(bp.tags, ?)`;
      countParams.push(`"${tag}"`);
    }

    // Add published filter to count query
    if (published !== "all") {
      const isPublished = published === "true";
      countQuery += ` AND bp.published = ?`;
      countParams.push(isPublished);
    }

    // Add featured filter to count query
    if (featured) {
      const isFeatured = featured === "true";
      countQuery += ` AND bp.featured = ?`;
      countParams.push(isFeatured);
    }

    // Add author filter to count query
    if (author) {
      countQuery += ` AND bp.author_id = ?`;
      countParams.push(author);
    }

    const [countResult] = await pool.execute(countQuery, countParams);
    const total = (countResult as RowDataPacket[])[0].total;

    // Format the response
    const formattedPosts = posts.map((post) => ({
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.cover_image,
      category: post.category,
      tags: JSON.parse(post.tags),
      published: Boolean(post.published),
      featured: Boolean(post.featured),
      views: post.views,
      likes: post.likes,
      comments: post.comments,
      readTime: post.read_time,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      author: {
        id: post.author_id.toString(),
        name: `${post.author_first_name} ${post.author_last_name}`,
        username: post.author_username,
        avatar: post.author_avatar,
        role: post.author_role,
      },
    }));

    res.json({
      posts: formattedPosts,
      total,
      limit: Number(limit),
      offset: Number(offset),
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    res.status(500).json({ error: "Failed to fetch blog posts" });
  }
});

// Get a single blog post by ID or slug
router.get("/posts/:identifier", async (req, res) => {
  try {
    const { identifier } = req.params;

    // Determine if identifier is ID or slug
    const isId = !isNaN(Number(identifier));

    // Build the query based on identifier type
    const query = `
      SELECT 
        bp.id, bp.title, bp.slug, bp.excerpt, bp.content, bp.cover_image, 
        bp.category, bp.tags, bp.published, bp.featured, bp.views, bp.likes, 
        bp.comments, bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
        u.id as author_id, u.username as author_username, u.first_name as author_first_name, 
        u.last_name as author_last_name, u.avatar as author_avatar, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE ${isId ? "bp.id = ?" : "bp.slug = ?"}
    `;

    // Execute the query
    const [rows] = await pool.execute(query, [identifier]);
    const posts = rows as RowDataPacket[];

    if (posts.length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const post = posts[0];

    // Increment view count
    await pool.execute("UPDATE blog_posts SET views = views + 1 WHERE id = ?", [
      post.id,
    ]);

    // Format the response
    const formattedPost = {
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.cover_image,
      category: post.category,
      tags: JSON.parse(post.tags),
      published: Boolean(post.published),
      featured: Boolean(post.featured),
      views: post.views + 1, // Include the new view
      likes: post.likes,
      comments: post.comments,
      readTime: post.read_time,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      author: {
        id: post.author_id.toString(),
        name: `${post.author_first_name} ${post.author_last_name}`,
        username: post.author_username,
        avatar: post.author_avatar,
        role: post.author_role,
      },
    };

    res.json(formattedPost);
  } catch (error) {
    console.error("Error fetching blog post:", error);
    res.status(500).json({ error: "Failed to fetch blog post" });
  }
});

// Create a new blog post
router.post("/posts", requireAdmin, async (req, res) => {
  try {
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      published,
      featured,
    } = req.body;

    // Validate required fields
    if (!title || !slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }

    // Check if slug already exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE slug = ?",
      [slug]
    );

    if ((existingRows as RowDataPacket[]).length > 0) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Insert the new post
    const [result] = await pool.execute(
      `INSERT INTO blog_posts (
        title, slug, excerpt, content, cover_image, category, tags, 
        author_id, published, featured, read_time, published_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        slug,
        excerpt || "",
        content || "",
        coverImage || "",
        category || "",
        JSON.stringify(tags || []),
        req.user.id,
        published || false,
        featured || false,
        readTime,
        published ? new Date() : null,
      ]
    );

    const insertResult = result as ResultSetHeader;
    const newPostId = insertResult.insertId;

    // Get the created post
    const [postRows] = await pool.execute(
      `SELECT 
        bp.id, bp.title, bp.slug, bp.excerpt, bp.content, bp.cover_image, 
        bp.category, bp.tags, bp.published, bp.featured, bp.views, bp.likes, 
        bp.comments, bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
        u.id as author_id, u.username as author_username, u.first_name as author_first_name, 
        u.last_name as author_last_name, u.avatar as author_avatar, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = ?`,
      [newPostId]
    );

    const post = (postRows as RowDataPacket[])[0];

    // Format the response
    const formattedPost = {
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.cover_image,
      category: post.category,
      tags: JSON.parse(post.tags),
      published: Boolean(post.published),
      featured: Boolean(post.featured),
      views: post.views,
      likes: post.likes,
      comments: post.comments,
      readTime: post.read_time,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      author: {
        id: post.author_id.toString(),
        name: `${post.author_first_name} ${post.author_last_name}`,
        username: post.author_username,
        avatar: post.author_avatar,
        role: post.author_role,
      },
    };

    res.status(201).json({
      message: "Blog post created successfully",
      post: formattedPost,
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ error: "Failed to create blog post" });
  }
});

// Update a blog post
router.put("/posts/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      coverImage,
      category,
      tags,
      published,
      featured,
    } = req.body;

    // Validate required fields
    if (!title || !slug) {
      return res.status(400).json({ error: "Title and slug are required" });
    }

    // Check if post exists
    const [existingPostRows] = await pool.execute(
      "SELECT id, published FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingPostRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const existingPost = (existingPostRows as RowDataPacket[])[0];

    // Check if slug already exists for another post
    const [existingSlugRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE slug = ? AND id != ?",
      [slug, id]
    );

    if ((existingSlugRows as RowDataPacket[]).length > 0) {
      return res.status(400).json({ error: "Slug already exists" });
    }

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = content.split(/\s+/).length;
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

    // Determine if we need to update published_at
    let publishedAt = null;
    if (published && !existingPost.published) {
      // If publishing for the first time, set published_at to now
      publishedAt = new Date();
    } else if (!published) {
      // If unpublishing, set published_at to null
      publishedAt = null;
    }

    // Update the post
    let updateQuery = `
      UPDATE blog_posts SET
        title = ?,
        slug = ?,
        excerpt = ?,
        content = ?,
        cover_image = ?,
        category = ?,
        tags = ?,
        published = ?,
        featured = ?,
        read_time = ?
    `;

    const updateParams: any[] = [
      title,
      slug,
      excerpt || "",
      content || "",
      coverImage || "",
      category || "",
      JSON.stringify(tags || []),
      published || false,
      featured || false,
      readTime,
    ];

    // Add published_at to query if it's changing
    if (publishedAt !== null || !published) {
      updateQuery += `, published_at = ?`;
      updateParams.push(publishedAt);
    }

    updateQuery += ` WHERE id = ?`;
    updateParams.push(id);

    await pool.execute(updateQuery, updateParams);

    // Get the updated post
    const [postRows] = await pool.execute(
      `SELECT 
        bp.id, bp.title, bp.slug, bp.excerpt, bp.content, bp.cover_image, 
        bp.category, bp.tags, bp.published, bp.featured, bp.views, bp.likes, 
        bp.comments, bp.read_time, bp.published_at, bp.created_at, bp.updated_at,
        u.id as author_id, u.username as author_username, u.first_name as author_first_name, 
        u.last_name as author_last_name, u.avatar as author_avatar, u.role as author_role
      FROM blog_posts bp
      JOIN users u ON bp.author_id = u.id
      WHERE bp.id = ?`,
      [id]
    );

    const post = (postRows as RowDataPacket[])[0];

    // Format the response
    const formattedPost = {
      id: post.id.toString(),
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.cover_image,
      category: post.category,
      tags: JSON.parse(post.tags),
      published: Boolean(post.published),
      featured: Boolean(post.featured),
      views: post.views,
      likes: post.likes,
      comments: post.comments,
      readTime: post.read_time,
      publishedAt: post.published_at,
      createdAt: post.created_at,
      updatedAt: post.updated_at,
      author: {
        id: post.author_id.toString(),
        name: `${post.author_first_name} ${post.author_last_name}`,
        username: post.author_username,
        avatar: post.author_avatar,
        role: post.author_role,
      },
    };

    res.json({
      message: "Blog post updated successfully",
      post: formattedPost,
    });
  } catch (error) {
    console.error("Error updating blog post:", error);
    res.status(500).json({ error: "Failed to update blog post" });
  }
});

// Delete a blog post
router.delete("/posts/:id", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Delete the post
    await pool.execute("DELETE FROM blog_posts WHERE id = ?", [id]);

    res.json({ message: "Blog post deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    res.status(500).json({ error: "Failed to delete blog post" });
  }
});

// Toggle published status
router.post("/posts/:id/toggle-published", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists and get current status
    const [existingRows] = await pool.execute(
      "SELECT id, published FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const currentStatus = Boolean(
      (existingRows as RowDataPacket[])[0].published
    );
    const newStatus = !currentStatus;

    // Update published status
    if (newStatus) {
      // If publishing, set published_at to now
      await pool.execute(
        "UPDATE blog_posts SET published = ?, published_at = NOW() WHERE id = ?",
        [newStatus, id]
      );
    } else {
      // If unpublishing, just update the status
      await pool.execute("UPDATE blog_posts SET published = ? WHERE id = ?", [
        newStatus,
        id,
      ]);
    }

    // Get the updated published_at date
    const [updatedRows] = await pool.execute(
      "SELECT published_at FROM blog_posts WHERE id = ?",
      [id]
    );
    const publishedAt = (updatedRows as RowDataPacket[])[0].published_at;

    res.json({
      message: `Blog post ${
        newStatus ? "published" : "unpublished"
      } successfully`,
      published: newStatus,
      publishedAt,
    });
  } catch (error) {
    console.error("Error toggling published status:", error);
    res.status(500).json({ error: "Failed to update published status" });
  }
});

// Toggle featured status
router.post("/posts/:id/toggle-featured", requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists and get current status
    const [existingRows] = await pool.execute(
      "SELECT id, featured FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    const currentStatus = Boolean(
      (existingRows as RowDataPacket[])[0].featured
    );
    const newStatus = !currentStatus;

    // Update featured status
    await pool.execute("UPDATE blog_posts SET featured = ? WHERE id = ?", [
      newStatus,
      id,
    ]);

    res.json({
      message: `Blog post ${
        newStatus ? "featured" : "unfeatured"
      } successfully`,
      featured: newStatus,
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    res.status(500).json({ error: "Failed to update featured status" });
  }
});

// Like a blog post
router.post("/posts/:id/like", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Check if post exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Check if user already liked this post
    const [likeRows] = await pool.execute(
      "SELECT id FROM blog_likes WHERE post_id = ? AND user_id = ?",
      [id, userId]
    );

    let liked = false;
    let message = "";

    if ((likeRows as RowDataPacket[]).length > 0) {
      // User already liked, so unlike
      await pool.execute(
        "DELETE FROM blog_likes WHERE post_id = ? AND user_id = ?",
        [id, userId]
      );
      await pool.execute(
        "UPDATE blog_posts SET likes = likes - 1 WHERE id = ?",
        [id]
      );
      message = "Post unliked successfully";
    } else {
      // User hasn't liked, so add like
      await pool.execute(
        "INSERT INTO blog_likes (post_id, user_id) VALUES (?, ?)",
        [id, userId]
      );
      await pool.execute(
        "UPDATE blog_posts SET likes = likes + 1 WHERE id = ?",
        [id]
      );
      liked = true;
      message = "Post liked successfully";
    }

    // Get updated likes count
    const [updatedRows] = await pool.execute(
      "SELECT likes FROM blog_posts WHERE id = ?",
      [id]
    );
    const likesCount = (updatedRows as RowDataPacket[])[0].likes;

    res.json({
      message,
      liked,
      likesCount,
    });
  } catch (error) {
    console.error("Error liking blog post:", error);
    res.status(500).json({ error: "Failed to like blog post" });
  }
});

// Get comments for a blog post
router.get("/posts/:id/comments", async (req, res) => {
  try {
    const { id } = req.params;

    // Check if post exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Get comments
    const [commentRows] = await pool.execute(
      `SELECT 
        bc.id, bc.content, bc.likes, bc.created_at, bc.updated_at,
        u.id as user_id, u.username, u.first_name, u.last_name, u.avatar, u.verified, u.role,
        (SELECT COUNT(*) FROM blog_comments WHERE parent_id = bc.id) as replies_count
      FROM blog_comments bc
      JOIN users u ON bc.user_id = u.id
      WHERE bc.post_id = ? AND bc.parent_id IS NULL
      ORDER BY bc.created_at DESC`,
      [id]
    );

    // Format the response
    const comments = (commentRows as RowDataPacket[]).map((comment) => ({
      id: comment.id.toString(),
      content: comment.content,
      user: {
        id: comment.user_id.toString(),
        username: comment.username,
        firstName: comment.first_name,
        lastName: comment.last_name,
        avatar: comment.avatar,
        verified: Boolean(comment.verified),
        role: comment.role,
      },
      likesCount: comment.likes,
      repliesCount: comment.replies_count,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
    }));

    res.json({ comments });
  } catch (error) {
    console.error("Error fetching blog comments:", error);
    res.status(500).json({ error: "Failed to fetch blog comments" });
  }
});

// Add a comment to a blog post
router.post("/posts/:id/comments", requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user.id;

    // Validate content
    if (!content || !content.trim()) {
      return res.status(400).json({ error: "Comment content is required" });
    }

    // Check if post exists
    const [existingRows] = await pool.execute(
      "SELECT id FROM blog_posts WHERE id = ?",
      [id]
    );

    if ((existingRows as RowDataPacket[]).length === 0) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // If parentId is provided, check if parent comment exists
    if (parentId) {
      const [parentRows] = await pool.execute(
        "SELECT id FROM blog_comments WHERE id = ?",
        [parentId]
      );

      if ((parentRows as RowDataPacket[]).length === 0) {
        return res.status(404).json({ error: "Parent comment not found" });
      }
    }

    // Insert the comment
    const [result] = await pool.execute(
      `INSERT INTO blog_comments (post_id, user_id, parent_id, content)
       VALUES (?, ?, ?, ?)`,
      [id, userId, parentId || null, content.trim()]
    );

    const commentId = (result as ResultSetHeader).insertId;

    // Update comment count on the post
    await pool.execute(
      "UPDATE blog_posts SET comments = comments + 1 WHERE id = ?",
      [id]
    );

    // Get the created comment
    const [commentRows] = await pool.execute(
      `SELECT 
        bc.id, bc.content, bc.likes, bc.created_at, bc.updated_at,
        u.id as user_id, u.username, u.first_name, u.last_name, u.avatar, u.verified, u.role,
        (SELECT COUNT(*) FROM blog_comments WHERE parent_id = bc.id) as replies_count
      FROM blog_comments bc
      JOIN users u ON bc.user_id = u.id
      WHERE bc.id = ?`,
      [commentId]
    );

    const comment = (commentRows as RowDataPacket[])[0];

    // Format the response
    const formattedComment = {
      id: comment.id.toString(),
      content: comment.content,
      user: {
        id: comment.user_id.toString(),
        username: comment.username,
        firstName: comment.first_name,
        lastName: comment.last_name,
        avatar: comment.avatar,
        verified: Boolean(comment.verified),
        role: comment.role,
      },
      likesCount: comment.likes,
      repliesCount: comment.replies_count,
      createdAt: comment.created_at,
      updatedAt: comment.updated_at,
    };

    res.status(201).json(formattedComment);
  } catch (error) {
    console.error("Error adding blog comment:", error);
    res.status(500).json({ error: "Failed to add blog comment" });
  }
});

// Upload cover image
router.post(
  "/upload-cover",
  requireAdmin,
  upload.single("image"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: "No image file provided" });
      }

      // Generate URL for the uploaded file
      const imageUrl = `/uploads/blog/${req.file.filename}`;

      res.json({
        message: "Image uploaded successfully",
        imageUrl,
      });
    } catch (error) {
      console.error("Error uploading cover image:", error);
      res.status(500).json({ error: "Failed to upload cover image" });
    }
  }
);

export default router;
