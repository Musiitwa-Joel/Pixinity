-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 06, 2025 at 06:44 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `pixinity`
--

-- --------------------------------------------------------

--
-- Table structure for table `blog_comments`
--

CREATE TABLE `blog_comments` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `likes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_comments`
--

INSERT INTO `blog_comments` (`id`, `post_id`, `user_id`, `parent_id`, `content`, `likes`, `created_at`, `updated_at`) VALUES
(1, 1, 6, NULL, 'Hello', 0, '2025-06-13 17:04:17', '2025-06-13 17:04:17'),
(2, 1, 9, NULL, 'Indeed', 0, '2025-06-13 17:14:10', '2025-06-13 17:14:10');

-- --------------------------------------------------------

--
-- Table structure for table `blog_likes`
--

CREATE TABLE `blog_likes` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_likes`
--

INSERT INTO `blog_likes` (`id`, `post_id`, `user_id`, `created_at`) VALUES
(2, 1, 6, '2025-06-13 17:04:52');

-- --------------------------------------------------------

--
-- Table structure for table `blog_posts`
--

CREATE TABLE `blog_posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `excerpt` text DEFAULT NULL,
  `content` text DEFAULT NULL,
  `cover_image` varchar(255) DEFAULT NULL,
  `category` varchar(100) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `author_id` int(11) NOT NULL,
  `published` tinyint(1) DEFAULT 0,
  `featured` tinyint(1) DEFAULT 0,
  `views` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `comments` int(11) DEFAULT 0,
  `read_time` int(11) DEFAULT 5,
  `published_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `blog_posts`
--

INSERT INTO `blog_posts` (`id`, `title`, `slug`, `excerpt`, `content`, `cover_image`, `category`, `tags`, `author_id`, `published`, `featured`, `views`, `likes`, `comments`, `read_time`, `published_at`, `created_at`, `updated_at`) VALUES
(1, 'Write a short excerpt for your blog post here.', 'write-a-short-excerpt-for-your-blog-post-here', '', '# New Blog Post\n\nWrite a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.Write a short excerpt for your blog post here.', '/uploads/blog/blog-cover-1749834156640-631338821.jpg', 'Artist Spotlight', '[\"imagery\"]', 6, 1, 1, 29, 1, 2, 1, '2025-06-13 17:03:20', '2025-06-13 17:03:20', '2025-06-14 12:47:38');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `description`, `parent_id`, `created_at`) VALUES
(1, 'Nature', 'Beautiful landscapes, plants, and animals', NULL, '2025-06-08 16:20:31'),
(2, 'Architecture', 'Buildings, structures, and urban environments', NULL, '2025-06-08 16:20:31'),
(3, 'People', 'Portraits, lifestyle, and human interactions', NULL, '2025-06-08 16:20:31'),
(4, 'Travel', 'Destinations, cultures, and adventures', NULL, '2025-06-08 16:20:31'),
(5, 'Food', 'Culinary photography and food styling', NULL, '2025-06-08 16:20:31'),
(6, 'Abstract', 'Conceptual and abstract imagery', NULL, '2025-06-08 16:20:31'),
(7, 'Black & White', 'Monochrome photography', NULL, '2025-06-08 16:20:31'),
(8, 'Street', 'Urban life and street photography', NULL, '2025-06-08 16:20:31');

-- --------------------------------------------------------

--
-- Table structure for table `collections`
--

CREATE TABLE `collections` (
  `id` int(11) NOT NULL,
  `uuid` varchar(36) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `is_private` tinyint(1) DEFAULT 0,
  `cover_photo_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_collaborative` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collections`
--

INSERT INTO `collections` (`id`, `uuid`, `user_id`, `name`, `description`, `is_private`, `cover_photo_id`, `created_at`, `updated_at`, `is_collaborative`) VALUES
(1, 'e2fac5a2-4505-11f0-be05-3c15c2cebeee', 7, 'SSAD Collection', 'Organize your photos into beautiful collections', 0, 2, '2025-06-09 07:05:44', '2025-06-10 08:56:04', 0),
(5, '0d541d09-32e4-4f9e-ab80-295968c168ba', 8, 'Nkumba University', 'Nkumba University Collections', 0, 8, '2025-06-10 16:15:19', '2025-06-10 16:26:54', 0),
(6, '3b6e9aad-c8b2-4dbe-a8a4-1a28a20f68de', 8, 'Uganda ', 'Uganda the pearl', 0, 6, '2025-06-11 04:44:05', '2025-06-11 04:44:06', 0),
(14, '923dd492-eb3c-4eb5-b064-146f98abdd0c', 8, 'cvc', 'cvcvcvc', 0, 5, '2025-06-11 05:28:38', '2025-06-11 05:28:38', 1),
(15, 'f3d483da-0f1f-400d-8add-d1ac4fd0276e', 6, 'Create Collection', 'Create Collection, Create Collection\n\n', 0, 3, '2025-06-11 07:18:53', '2025-06-11 07:18:53', 0),
(24, 'f239efd6-46c8-4eac-ab6f-e5bc0736cca3', 6, 'Vcx', 'Organize your photos into beautiful collections', 0, 3, '2025-06-11 08:42:35', '2025-06-11 11:39:29', 1);

-- --------------------------------------------------------

--
-- Table structure for table `collection_access_requests`
--

CREATE TABLE `collection_access_requests` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `message` text DEFAULT NULL,
  `status` enum('pending','approved','denied') NOT NULL DEFAULT 'pending',
  `requested_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `responded_at` timestamp NULL DEFAULT NULL,
  `responded_by` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `collection_collaborators`
--

CREATE TABLE `collection_collaborators` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` enum('editor','viewer') NOT NULL DEFAULT 'editor',
  `status` enum('pending','accepted','declined') NOT NULL DEFAULT 'pending',
  `invited_by` int(11) NOT NULL,
  `invited_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `responded_at` timestamp NULL DEFAULT NULL,
  `otp_code` varchar(6) DEFAULT NULL,
  `otp_expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_collaborators`
--

INSERT INTO `collection_collaborators` (`id`, `collection_id`, `user_id`, `role`, `status`, `invited_by`, `invited_at`, `responded_at`, `otp_code`, `otp_expires_at`, `created_at`, `updated_at`) VALUES
(1, 14, 6, 'editor', 'accepted', 8, '2025-06-11 05:28:38', '2025-06-11 11:44:29', '551884', '2025-06-12 11:42:01', '2025-06-11 05:28:38', '2025-06-11 11:44:29'),
(4, 24, 7, 'editor', 'accepted', 6, '2025-06-11 08:42:35', '2025-06-11 08:45:41', '356094', '2025-06-12 08:42:35', '2025-06-11 08:42:35', '2025-06-11 08:45:41'),
(5, 24, 8, 'editor', 'accepted', 6, '2025-06-11 11:30:15', '2025-06-11 11:33:04', '239076', '2025-06-12 11:30:15', '2025-06-11 11:30:15', '2025-06-11 11:33:04');

-- --------------------------------------------------------

--
-- Table structure for table `collection_comments`
--

CREATE TABLE `collection_comments` (
  `id` int(11) NOT NULL,
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_comments`
--

INSERT INTO `collection_comments` (`id`, `collection_id`, `user_id`, `parent_id`, `content`, `created_at`, `updated_at`) VALUES
(2, 24, 7, NULL, 'Thank you for the collab', '2025-06-11 09:20:54', '2025-06-11 09:20:54'),
(3, 1, 8, NULL, 'A reality', '2025-06-11 10:51:20', '2025-06-11 10:51:20'),
(4, 24, 8, NULL, 'Hello', '2025-06-11 11:33:40', '2025-06-11 11:33:40'),
(5, 24, 8, NULL, 'Top work', '2025-06-11 11:33:58', '2025-06-11 11:33:58'),
(6, 14, 6, NULL, 'Nice Collab', '2025-06-11 11:48:52', '2025-06-11 11:48:52');

-- --------------------------------------------------------

--
-- Table structure for table `collection_comment_likes`
--

CREATE TABLE `collection_comment_likes` (
  `id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_comment_likes`
--

INSERT INTO `collection_comment_likes` (`id`, `comment_id`, `user_id`, `created_at`) VALUES
(1, 2, 7, '2025-06-11 10:31:26'),
(2, 3, 8, '2025-06-11 10:54:52'),
(4, 2, 8, '2025-06-11 11:33:34'),
(5, 4, 8, '2025-06-11 11:33:42');

-- --------------------------------------------------------

--
-- Table structure for table `collection_likes`
--

CREATE TABLE `collection_likes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_likes`
--

INSERT INTO `collection_likes` (`id`, `collection_id`, `user_id`, `created_at`) VALUES
(3, 24, 6, '2025-06-11 08:44:15'),
(7, 24, 7, '2025-06-11 10:43:36'),
(8, 5, 8, '2025-06-11 10:50:53'),
(9, 14, 8, '2025-06-11 11:41:45'),
(10, 14, 6, '2025-06-11 11:47:42'),
(11, 5, 7, '2025-06-30 16:48:26'),
(12, 1, 6, '2025-07-01 10:33:41'),
(13, 15, 6, '2025-07-01 10:35:39');

-- --------------------------------------------------------

--
-- Table structure for table `collection_photos`
--

CREATE TABLE `collection_photos` (
  `collection_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_photos`
--

INSERT INTO `collection_photos` (`collection_id`, `photo_id`, `added_at`) VALUES
(1, 2, '2025-06-10 08:56:04'),
(1, 4, '2025-06-10 08:56:04'),
(5, 8, '2025-06-10 16:26:54'),
(6, 6, '2025-06-11 04:44:06'),
(14, 5, '2025-06-11 05:28:38'),
(14, 10, '2025-06-11 11:47:23'),
(15, 3, '2025-06-11 07:18:53'),
(24, 3, '2025-06-11 11:39:29'),
(24, 12, '2025-07-01 10:45:51');

-- --------------------------------------------------------

--
-- Table structure for table `collection_views`
--

CREATE TABLE `collection_views` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `collection_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `interaction` varchar(50) DEFAULT 'view',
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `collection_views`
--

INSERT INTO `collection_views` (`id`, `collection_id`, `user_id`, `ip_address`, `interaction`, `viewed_at`) VALUES
(1, 1, NULL, '::1', 'page_view', '2025-06-11 08:09:32'),
(2, 1, NULL, '::1', 'page_view', '2025-06-11 08:09:32'),
(5, 24, NULL, '::1', 'page_view', '2025-06-11 08:44:04'),
(6, 1, NULL, '::1', 'view', '2025-06-11 09:16:53'),
(7, 1, NULL, '::1', 'view', '2025-06-11 09:16:53'),
(8, 24, NULL, '::1', 'view', '2025-06-11 10:03:50'),
(9, 24, 7, '::1', 'view', '2025-06-11 10:30:35'),
(10, 24, 7, '::1', 'view', '2025-06-11 10:30:36'),
(11, 1, 8, '::1', 'view', '2025-06-11 10:30:38'),
(12, 24, 7, '::1', 'card_hover', '2025-06-11 10:39:44'),
(13, 15, 7, '::1', 'card_hover', '2025-06-11 10:39:46'),
(14, 14, 7, '::1', 'card_hover', '2025-06-11 10:39:51'),
(15, 1, 7, '::1', 'card_hover', '2025-06-11 10:39:54'),
(16, 5, 7, '::1', 'card_hover', '2025-06-11 10:39:56'),
(17, 6, 7, '::1', 'card_hover', '2025-06-11 10:39:57'),
(18, 24, 7, '::1', 'view', '2025-06-11 10:40:04'),
(19, 24, 7, '::1', 'view', '2025-06-11 10:40:05'),
(20, 15, 7, '::1', 'card_hover', '2025-06-11 10:40:37'),
(21, 24, 7, '::1', 'card_hover', '2025-06-11 10:40:38'),
(22, 14, 7, '::1', 'card_hover', '2025-06-11 10:40:46'),
(23, 1, 8, '::1', 'page_view', '2025-06-11 10:41:50'),
(24, 24, 7, '::1', 'page_view', '2025-06-11 10:43:08'),
(25, 24, 7, '::1', 'page_view', '2025-06-11 10:43:30'),
(26, 24, 7, '::1', 'view', '2025-06-11 10:43:59'),
(27, 1, 8, '::1', 'view', '2025-06-11 10:43:59'),
(28, 24, 7, '::1', 'view', '2025-06-11 10:43:59'),
(29, 24, 7, '::1', 'view', '2025-06-11 10:44:00'),
(30, 1, 8, '::1', 'view', '2025-06-11 10:44:09'),
(31, 14, 7, '::1', 'card_hover', '2025-06-11 10:44:23'),
(32, 1, 7, '::1', 'card_hover', '2025-06-11 10:44:24'),
(33, 15, 7, '::1', 'card_hover', '2025-06-11 10:46:21'),
(34, 24, 7, '::1', 'card_hover', '2025-06-11 10:46:24'),
(35, 5, 7, '::1', 'card_hover', '2025-06-11 10:46:33'),
(36, 6, 7, '::1', 'card_hover', '2025-06-11 10:46:35'),
(37, 15, 8, '::1', 'card_hover', '2025-06-11 10:50:32'),
(38, 14, 8, '::1', 'card_hover', '2025-06-11 10:50:36'),
(39, 1, 8, '::1', 'card_hover', '2025-06-11 10:50:41'),
(40, 5, 8, '::1', 'card_hover', '2025-06-11 10:50:42'),
(41, 6, 8, '::1', 'card_hover', '2025-06-11 10:50:44'),
(42, 5, 8, '::1', 'view', '2025-06-11 10:50:49'),
(43, 5, 8, '::1', 'view', '2025-06-11 10:50:49'),
(44, 24, 8, '::1', 'card_hover', '2025-06-11 10:51:05'),
(45, 6, 8, '::1', 'card_hover', '2025-06-11 10:51:07'),
(46, 1, 8, '::1', 'card_hover', '2025-06-11 10:51:09'),
(47, 1, 8, '::1', 'view', '2025-06-11 10:51:09'),
(48, 1, 8, '::1', 'view', '2025-06-11 10:51:10'),
(49, 24, 8, '::1', 'card_hover', '2025-06-11 10:55:05'),
(50, 6, 8, '::1', 'card_hover', '2025-06-11 10:55:08'),
(51, 24, 8, '::1', 'view', '2025-06-11 10:55:23'),
(52, 24, 6, '::1', 'card_hover', '2025-06-11 11:29:12'),
(53, 14, 6, '::1', 'card_hover', '2025-06-11 11:30:26'),
(54, 24, 6, '::1', 'view', '2025-06-11 11:30:32'),
(55, 24, 6, '::1', 'view', '2025-06-11 11:30:32'),
(56, 15, 8, '::1', 'card_hover', '2025-06-11 11:32:33'),
(57, 24, 8, '::1', 'card_hover', '2025-06-11 11:32:35'),
(58, 24, 8, '::1', 'card_hover', '2025-06-11 11:32:43'),
(59, 24, 8, '::1', 'view', '2025-06-11 11:32:45'),
(60, 24, 8, '::1', 'view', '2025-06-11 11:33:04'),
(61, 24, 8, '::1', 'view', '2025-06-11 11:33:26'),
(62, 15, 7, '::1', 'card_hover', '2025-06-11 11:37:58'),
(63, 24, 7, '::1', 'view', '2025-06-11 11:38:00'),
(64, 24, 6, '::1', 'view', '2025-06-11 11:39:08'),
(65, 24, 6, '::1', 'view', '2025-06-11 11:39:29'),
(66, 24, 6, '::1', 'view', '2025-06-11 11:39:39'),
(67, 24, 6, '::1', 'card_hover', '2025-06-11 11:40:14'),
(68, 14, 6, '::1', 'card_hover', '2025-06-11 11:40:17'),
(69, 14, 6, '::1', 'view', '2025-06-11 11:40:19'),
(70, 14, 6, '::1', 'card_hover', '2025-06-11 11:40:40'),
(71, 24, 6, '::1', 'card_hover', '2025-06-11 11:40:44'),
(72, 14, 8, '::1', 'card_hover', '2025-06-11 11:41:24'),
(73, 14, 8, '::1', 'view', '2025-06-11 11:41:30'),
(74, 14, 6, '::1', 'card_hover', '2025-06-11 11:43:37'),
(75, 14, 6, '::1', 'view', '2025-06-11 11:43:39'),
(76, 14, 6, '::1', 'card_hover', '2025-06-11 11:44:11'),
(77, 14, 6, '::1', 'view', '2025-06-11 11:44:29'),
(78, 14, 6, '::1', 'view', '2025-06-11 11:44:47'),
(79, 14, 6, '::1', 'view', '2025-06-11 11:47:23'),
(80, 15, 6, '::1', 'card_hover', '2025-06-11 11:48:33'),
(81, 14, 6, '::1', 'card_hover', '2025-06-11 11:48:36'),
(82, 14, 6, '::1', 'view', '2025-06-11 11:48:36'),
(83, 24, 6, '::1', 'card_hover', '2025-06-11 11:49:02'),
(84, 15, 6, '::1', 'view', '2025-06-11 11:49:03'),
(85, 15, 6, '::1', 'card_hover', '2025-06-11 11:49:38'),
(87, 15, 6, '::1', 'card_hover', '2025-06-11 11:50:17'),
(88, 15, 6, '::1', 'card_hover', '2025-06-11 12:19:21'),
(89, 1, 6, '::1', 'card_hover', '2025-06-11 12:19:25'),
(90, 5, 6, '::1', 'card_hover', '2025-06-11 12:19:27'),
(91, 6, 6, '::1', 'card_hover', '2025-06-11 12:19:29'),
(92, 1, 8, '::1', 'view', '2025-06-11 14:21:00'),
(93, 24, 6, '::1', 'view', '2025-06-11 14:21:29'),
(94, 1, 8, '::1', 'view', '2025-06-11 14:24:48'),
(95, 5, 6, '::1', 'card_hover', '2025-06-12 10:13:40'),
(96, 15, 6, '::1', 'card_hover', '2025-06-12 10:13:45'),
(97, 15, 6, '::1', 'card_hover', '2025-06-12 10:18:02'),
(98, 6, 6, '::1', 'card_hover', '2025-06-12 10:18:12'),
(99, 5, 6, '::1', 'card_hover', '2025-06-12 10:18:14'),
(100, 1, 6, '::1', 'card_hover', '2025-06-12 10:18:15'),
(101, 14, 6, '::1', 'card_hover', '2025-06-14 08:18:16'),
(102, 15, 6, '::1', 'card_hover', '2025-06-14 08:18:17'),
(103, 5, 6, '::1', 'card_hover', '2025-06-14 08:18:20'),
(104, 1, 6, '::1', 'card_hover', '2025-06-14 08:18:22'),
(105, 1, 6, '::1', 'view', '2025-06-14 08:18:22'),
(106, 1, 6, '::1', 'view', '2025-06-14 08:18:23'),
(107, 14, 6, '::1', 'card_hover', '2025-06-14 08:18:32'),
(108, 1, 6, '::1', 'card_hover', '2025-06-14 08:18:33'),
(109, 15, 6, '::1', 'card_hover', '2025-06-14 08:18:37'),
(110, 24, 6, '::1', 'card_hover', '2025-06-14 08:18:40'),
(111, 14, 6, '::1', 'card_hover', '2025-06-14 12:37:29'),
(112, 14, 6, '::1', 'view', '2025-06-14 12:37:30'),
(113, 14, 6, '::1', 'view', '2025-06-14 12:37:30'),
(114, 15, 7, '::1', 'card_hover', '2025-06-30 16:47:40'),
(115, 5, 7, '::1', 'card_hover', '2025-06-30 16:47:42'),
(116, 5, 7, '::1', 'view', '2025-06-30 16:47:43'),
(117, 5, 7, '::1', 'view', '2025-06-30 16:47:43'),
(118, 5, 7, '::1', 'card_hover', '2025-06-30 16:48:34'),
(119, 5, 7, '::1', 'view', '2025-06-30 16:48:35'),
(120, 5, 7, '::1', 'view', '2025-06-30 16:48:35'),
(121, 5, 7, '::1', 'view', '2025-06-30 16:49:06'),
(122, 15, 6, '::1', 'card_hover', '2025-07-01 10:33:28'),
(123, 1, 6, '::1', 'view', '2025-07-01 10:33:35'),
(124, 1, 6, '::1', 'view', '2025-07-01 10:33:35'),
(125, 1, 6, '::1', 'card_hover', '2025-07-01 10:34:03'),
(126, 14, 6, '::1', 'card_hover', '2025-07-01 10:34:05'),
(127, 24, 6, '::1', 'view', '2025-07-01 10:34:08'),
(128, 24, 6, '::1', 'view', '2025-07-01 10:34:08'),
(129, 15, 6, '::1', 'card_hover', '2025-07-01 10:35:18'),
(130, 5, 6, '::1', 'card_hover', '2025-07-01 10:35:20'),
(131, 24, 6, '::1', 'card_hover', '2025-07-01 10:35:23'),
(132, 15, 6, '::1', 'view', '2025-07-01 10:35:26'),
(133, 15, 6, '::1', 'view', '2025-07-01 10:35:26'),
(134, 15, 6, '::1', 'card_hover', '2025-07-01 10:36:04'),
(135, 15, 6, '::1', 'view', '2025-07-01 10:36:05'),
(136, 15, 6, '::1', 'view', '2025-07-01 10:36:05'),
(137, 15, 6, '::1', 'card_hover', '2025-07-01 10:36:22'),
(138, 15, 6, '::1', 'view', '2025-07-01 10:36:22'),
(139, 15, 6, '::1', 'view', '2025-07-01 10:36:22'),
(140, 15, NULL, '::1', 'card_hover', '2025-07-01 10:41:45'),
(141, 14, NULL, '::1', 'view', '2025-07-01 10:41:48'),
(142, 14, NULL, '::1', 'view', '2025-07-01 10:41:48'),
(143, 15, 6, '::1', 'card_hover', '2025-07-01 10:42:36'),
(144, 24, 6, '::1', 'card_hover', '2025-07-01 10:42:38'),
(145, 14, 6, '::1', 'view', '2025-07-01 10:42:43'),
(146, 14, 6, '::1', 'view', '2025-07-01 10:42:43'),
(147, 14, 6, '::1', 'card_hover', '2025-07-01 10:43:05'),
(148, 15, 6, '::1', 'view', '2025-07-01 10:43:06'),
(149, 15, 6, '::1', 'view', '2025-07-01 10:43:06'),
(150, 24, 6, '::1', 'view', '2025-07-01 10:43:16'),
(151, 24, 6, '::1', 'view', '2025-07-01 10:43:16'),
(152, 24, 7, '::1', 'card_hover', '2025-07-01 10:44:03'),
(153, 24, 7, '::1', 'view', '2025-07-01 10:44:04'),
(154, 24, 7, '::1', 'view', '2025-07-01 10:44:05'),
(155, 24, 7, '::1', 'view', '2025-07-01 10:45:51'),
(156, 15, NULL, '::1', 'card_hover', '2025-07-06 16:29:21'),
(157, 15, NULL, '::1', 'view', '2025-07-06 16:29:22'),
(158, 15, NULL, '::1', 'view', '2025-07-06 16:29:23');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `content` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `photo_id`, `user_id`, `content`, `created_at`, `updated_at`, `parent_id`) VALUES
(1, 2, 8, 'Hey, this looks great', '2025-06-09 19:24:07', '2025-06-09 19:24:07', NULL),
(2, 2, 6, 'Great', '2025-06-09 19:43:01', '2025-06-09 19:43:01', NULL),
(3, 2, 6, 'Thanks', '2025-06-09 20:23:14', '2025-06-09 20:23:14', 1),
(4, 2, 6, 'Thanks', '2025-06-09 20:23:25', '2025-06-09 20:23:25', 1),
(5, 2, 6, 'ccc', '2025-06-09 20:23:30', '2025-06-09 20:23:30', 1),
(6, 3, 8, 'Wonderful', '2025-06-10 07:14:08', '2025-06-10 07:14:08', NULL),
(7, 3, 8, 'Sure', '2025-06-10 07:14:18', '2025-06-10 07:14:18', 6),
(8, 2, 7, 'Coool', '2025-06-10 07:32:08', '2025-06-10 07:32:08', 1),
(9, 3, 7, 'Hey', '2025-06-10 07:54:08', '2025-06-10 07:54:08', 6),
(10, 3, 7, 'Wish to meet the developers', '2025-06-10 07:54:11', '2025-06-10 07:54:11', NULL),
(11, 2, 6, 'Hello', '2025-06-10 07:59:18', '2025-06-10 07:59:18', 2),
(12, 4, 7, 'Indebted', '2025-06-10 08:56:40', '2025-06-10 08:56:40', NULL),
(13, 3, 6, 'Thanks for your feedback', '2025-06-10 10:21:40', '2025-06-10 10:21:40', 6),
(14, 4, 7, 'Thank you', '2025-06-10 14:06:16', '2025-06-10 14:06:16', 12),
(15, 5, 7, 'The Pearl', '2025-06-11 10:47:25', '2025-06-11 10:47:25', NULL),
(16, 6, 9, 'Awesome', '2025-06-12 20:06:44', '2025-06-12 20:06:44', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `comment_likes`
--

CREATE TABLE `comment_likes` (
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comment_likes`
--

INSERT INTO `comment_likes` (`user_id`, `comment_id`, `created_at`) VALUES
(6, 1, '2025-07-01 10:33:06'),
(6, 2, '2025-06-10 07:59:00'),
(6, 6, '2025-06-10 10:21:24'),
(6, 7, '2025-06-10 07:33:29'),
(6, 9, '2025-06-10 10:21:44'),
(6, 13, '2025-06-10 10:21:43'),
(7, 1, '2025-06-10 07:31:20'),
(7, 2, '2025-06-10 07:31:22'),
(7, 3, '2025-06-10 07:31:40'),
(7, 4, '2025-06-10 14:00:53'),
(7, 5, '2025-06-10 14:00:49'),
(7, 8, '2025-06-10 14:00:50'),
(7, 12, '2025-06-10 08:56:44'),
(8, 1, '2025-06-09 19:24:22'),
(8, 6, '2025-06-10 07:14:11'),
(8, 12, '2025-06-10 10:39:02'),
(8, 15, '2025-06-11 15:56:10');

-- --------------------------------------------------------

--
-- Table structure for table `downloads`
--

CREATE TABLE `downloads` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `download_date` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `downloads`
--

INSERT INTO `downloads` (`id`, `user_id`, `photo_id`, `download_date`) VALUES
(1, 7, 2, '2025-06-09 16:42:11'),
(2, 7, 2, '2025-06-09 16:42:37'),
(6, 8, 2, '2025-06-09 17:30:42'),
(7, 7, 2, '2025-06-09 19:27:23'),
(8, 6, 3, '2025-06-09 20:26:38'),
(9, 7, 2, '2025-06-10 08:48:50'),
(10, 7, 5, '2025-06-10 13:59:44'),
(11, 6, 3, '2025-06-11 11:40:04'),
(12, 6, 5, '2025-06-13 00:18:10'),
(13, 6, 10, '2025-06-13 00:20:10'),
(14, 7, 8, '2025-06-30 16:47:55');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `follower_id` int(11) NOT NULL,
  `following_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`follower_id`, `following_id`, `created_at`) VALUES
(6, 6, '2025-06-13 15:29:27'),
(6, 7, '2025-06-13 15:29:29'),
(6, 8, '2025-06-12 20:10:40'),
(6, 9, '2025-06-13 15:29:35'),
(7, 8, '2025-06-10 11:48:25'),
(8, 6, '2025-06-10 10:55:00'),
(8, 7, '2025-06-10 10:53:35');

-- --------------------------------------------------------

--
-- Table structure for table `homepage_sections`
--

CREATE TABLE `homepage_sections` (
  `id` varchar(50) NOT NULL,
  `title` varchar(100) NOT NULL,
  `type` varchar(50) NOT NULL,
  `content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`content`)),
  `is_visible` tinyint(1) NOT NULL DEFAULT 1,
  `order_index` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `homepage_sections`
--

INSERT INTO `homepage_sections` (`id`, `title`, `type`, `content`, `is_visible`, `order_index`, `created_at`, `updated_at`) VALUES
('categories-section', 'Categories Section', 'categories', '{\"heading\":\"Explore Categories\",\"categories\":[{\"name\":\"Nature\",\"image\":\"https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg\",\"link\":\"/categories/nature\"},{\"name\":\"Architecture\",\"image\":\"https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg\",\"link\":\"/categories/architecture\"},{\"name\":\"Travel\",\"image\":\"https://images.pexels.com/photos/457882/pexels-photo-457882.jpeg\",\"link\":\"/categories/travel\"}]}', 1, 3, '2025-06-12 14:46:45', '2025-06-12 14:46:45'),
('features-section', 'Features Section', 'features', '{\"heading\":\"Why Choose Pixinity\",\"features\":[{\"title\":\"High Quality Photos\",\"description\":\"Access millions of high-resolution images\",\"icon\":\"image\"},{\"title\":\"Smart Discovery\",\"description\":\"Find exactly what you need with powerful search\",\"icon\":\"search\"},{\"title\":\"Global Community\",\"description\":\"Connect with photographers worldwide\",\"icon\":\"users\"}]}', 1, 2, '2025-06-12 14:46:45', '2025-06-12 14:46:45'),
('hero-section', 'Hero Section', 'hero', '{\"heading\":\"Discover Beautiful Photography\",\"subheading\":\"Explore millions of high-quality photos from talented creators around the world\",\"ctaText\":\"Start Exploring\",\"ctaLink\":\"/explore\",\"secondaryCtaText\":\"Join Free\",\"secondaryCtaLink\":\"/signup\",\"backgroundImage\":\"https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg\"}', 1, 1, '2025-06-12 14:46:45', '2025-06-12 14:46:45');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `job_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `resume_url` varchar(255) DEFAULT NULL,
  `cover_letter` text DEFAULT NULL,
  `status` enum('pending','reviewed','interviewed','rejected','hired') NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_id`, `user_id`, `full_name`, `email`, `phone`, `resume_url`, `cover_letter`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 6, 'John Doe', 'john.doe@example.com', '07072313435', 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzQbffXsTcjcTLTLlRDPhfTwwPDt', 'Dear Hiring Manager,\n\nI am writing to express my interest in the New Job Position position at your company. I believe my skills and experience make me a strong candidate for this role.\n\nI would welcome the opportunity to discuss how I can contribute to your team.\n\nBest regards,\nJohn Doe', 'pending', '2025-06-14 07:23:55', '2025-06-14 07:49:18'),
(2, 1, 9, 'John Doe', 'john.doye@example.com', '059545847464', 'https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzQbffXsTcjcTLTLlRDPhfTwwPDt', 'Dear Hiring Manager,\n\nI am writing to express my interest in the New Job Position position at your company. I believe my skills and experience make me a strong candidate for this role.\n\nI would welcome the opportunity to discuss how I can contribute to your team.\n\nBest regards,\nJohn Doe', 'pending', '2025-06-14 07:48:26', '2025-06-14 07:52:34');

-- --------------------------------------------------------

--
-- Table structure for table `job_postings`
--

CREATE TABLE `job_postings` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `department` varchar(100) NOT NULL,
  `location` varchar(255) NOT NULL,
  `location_type` enum('remote','hybrid','onsite') NOT NULL,
  `employment_type` enum('full-time','part-time','contract','internship') NOT NULL,
  `salary_range` varchar(100) DEFAULT NULL,
  `description` text NOT NULL,
  `responsibilities` text NOT NULL,
  `requirements` text NOT NULL,
  `benefits` text NOT NULL,
  `application_url` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `featured` tinyint(1) NOT NULL DEFAULT 0,
  `applicants_count` int(11) NOT NULL DEFAULT 0,
  `views_count` int(11) NOT NULL DEFAULT 0,
  `posted_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `expires_at` date DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_postings`
--

INSERT INTO `job_postings` (`id`, `title`, `department`, `location`, `location_type`, `employment_type`, `salary_range`, `description`, `responsibilities`, `requirements`, `benefits`, `application_url`, `is_active`, `featured`, `applicants_count`, `views_count`, `posted_at`, `expires_at`, `updated_at`) VALUES
(1, 'New Job Position', 'Department', 'Location', 'remote', 'full-time', NULL, 'Write a description for this job position...', '[\"Responsibility 1\",\"Responsibility 2\",\"Responsibility 3\"]', '[\"Requirement 1\",\"Requirement 2\",\"Requirement 3\"]', '[\"Benefit 1\",\"Benefit 2\",\"Benefit 3\"]', 'https://careers.pixinity.com/apply', 1, 1, 2, 9, '2025-06-14 06:42:57', NULL, '2025-06-14 08:05:43');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `user_id`, `photo_id`, `created_at`) VALUES
(1, 8, 2, '2025-06-09 19:23:51'),
(2, 7, 2, '2025-06-09 19:25:32'),
(4, 6, 2, '2025-06-09 19:39:22'),
(5, 6, 3, '2025-06-09 20:25:34'),
(6, 8, 3, '2025-06-10 07:13:50'),
(8, 7, 4, '2025-06-10 08:57:54'),
(9, 8, 8, '2025-06-10 10:36:19'),
(12, 8, 7, '2025-06-10 10:39:42'),
(13, 8, 6, '2025-06-10 10:39:44'),
(14, 8, 4, '2025-06-10 11:11:12'),
(15, 7, 6, '2025-06-10 11:34:56'),
(16, 7, 8, '2025-06-10 11:35:18'),
(17, 7, 5, '2025-06-10 11:47:17'),
(18, 7, 7, '2025-06-10 14:03:22'),
(19, 7, 3, '2025-06-11 08:10:50'),
(20, 7, 9, '2025-06-11 09:19:41'),
(21, 8, 9, '2025-06-11 10:57:13'),
(23, 9, 6, '2025-06-12 20:06:33'),
(24, 6, 4, '2025-06-12 20:09:24'),
(26, 6, 6, '2025-06-12 20:11:25'),
(28, 6, 8, '2025-06-12 20:11:28'),
(29, 6, 7, '2025-06-12 20:11:31'),
(30, 6, 5, '2025-06-13 00:18:17'),
(31, 6, 10, '2025-06-13 00:21:26'),
(32, 6, 9, '2025-06-13 06:32:27'),
(33, 7, 11, '2025-06-30 16:47:12');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `type` varchar(50) NOT NULL,
  `message` text NOT NULL,
  `related_id` int(11) DEFAULT NULL,
  `action_url` varchar(255) DEFAULT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `message`, `related_id`, `action_url`, `read_at`, `created_at`) VALUES
(1, 8, 'comment_like', 'Musiitwa Joel liked your comment \"Hey, this looks great\" on \"Nkumba University Intranet Login\"', 1, '/photos/2', '2025-06-10 08:10:45', '2025-06-10 07:58:59'),
(3, 8, 'comment_like', 'Musiitwa Joel liked your comment \"Wonderful\" on \"Happy Birthday\"', 6, '/photos/3', '2025-06-10 10:23:22', '2025-06-10 10:21:24'),
(4, 7, 'comment_like', 'Musiitwa Joel liked your comment \"Hey\" on \"Happy Birthday\"', 9, '/photos/3', '2025-06-10 11:35:26', '2025-06-10 10:21:44'),
(5, 7, 'like', 'Joel Musiitwa liked your photo \"Saad Photography tribute\"', 10, '/photos/4', '2025-06-10 11:35:26', '2025-06-10 10:38:55'),
(6, 7, 'comment_like', 'Joel Musiitwa liked your comment \"Indebted\" on \"Saad Photography tribute\"', 12, '/photos/4', '2025-06-10 11:35:26', '2025-06-10 10:39:02'),
(7, 7, 'follow', 'Joel Musiitwa started following you', 8, '/@Joel_nkumba', '2025-06-10 11:35:26', '2025-06-10 10:53:35'),
(8, 6, 'follow', 'Joel Musiitwa started following you', 8, '/@Joel_nkumba', '2025-06-11 07:17:50', '2025-06-10 10:55:00'),
(9, 7, 'like', 'Joel Musiitwa liked your photo \"Saad Photography tribute\"', 4, '/photos/4', '2025-06-10 11:35:26', '2025-06-10 11:11:12'),
(10, 8, 'like', 'Manager Bollz liked your photo \"Nature at its finnest\"', 15, '/photos/6', '2025-06-10 14:08:38', '2025-06-10 11:34:56'),
(11, 8, 'like', 'Manager Bollz liked your photo \"Nature at its finnest\"', 16, '/photos/8', '2025-06-10 14:08:38', '2025-06-10 11:35:18'),
(12, 8, 'like', 'Manager Bollz liked your photo \"The crested crane by Saad Shots\"', 17, '/photos/5', '2025-06-10 14:08:38', '2025-06-10 11:47:17'),
(13, 8, 'follow', 'Manager Bollz started following you', 7, '/@managerbollz', '2025-06-10 14:08:38', '2025-06-10 11:48:25'),
(17, 8, 'like', 'Manager Bollz liked your photo \"Nature at its finnest\"', 18, '/photos/7', '2025-06-10 14:08:38', '2025-06-10 14:03:22'),
(18, 6, 'like', 'Manager Bollz liked your photo \"Happy Birthday\"', 19, '/photos/3', '2025-06-11 10:03:37', '2025-06-11 08:10:50'),
(19, 6, 'collection_like', 'Manager Bollz liked your collection \"cvx\"', 23, '/collections/52937cb2-2116-42e4-af8d-b78fc968d3bf', '2025-06-11 10:03:37', '2025-06-11 08:10:52'),
(20, 6, 'collection_comment', 'Manager Bollz commented on your collection \"cvx\"', 1, '/collections/52937cb2-2116-42e4-af8d-b78fc968d3bf', '2025-06-11 10:03:37', '2025-06-11 08:11:07'),
(21, 6, 'collection_like', 'Manager Bollz liked your collection \"Vcx\"', 24, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 10:03:37', '2025-06-11 08:45:28'),
(22, 6, 'collection_upload', 'Manager Bollz added 1 photo to your collection \"Vcx\"', 7, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 10:03:37', '2025-06-11 09:19:27'),
(23, 6, 'collection_comment', 'Manager Bollz commented on your collection \"Vcx\"', 2, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 10:03:37', '2025-06-11 09:20:54'),
(24, 6, 'collection_like', 'Manager Bollz liked your collection \"Vcx\"', 24, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 10:03:37', '2025-06-11 09:33:58'),
(25, 6, 'collection_like', 'Manager Bollz liked your collection \"Vcx\"', 7, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 12:07:46', '2025-06-11 10:43:32'),
(26, 6, 'collection_like', 'Manager Bollz liked your collection \"Vcx\"', 7, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 12:07:46', '2025-06-11 10:43:36'),
(27, 8, 'comment', 'Manager Bollz commented on your photo \"The crested crane by Saad Shots\"', 15, '/photos/5', NULL, '2025-06-11 10:47:25'),
(28, 7, 'collection_comment', 'Joel Musiitwa commented on your collection \"SSAD Collection\"', 8, '/collections/e2fac5a2-4505-11f0-be05-3c15c2cebeee', '2025-07-01 06:07:04', '2025-06-11 10:51:20'),
(29, 7, 'comment_like', 'Joel Musiitwa liked your comment on collection \"Vcx\"', 8, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-07-01 06:07:04', '2025-06-11 10:55:29'),
(30, 7, 'like', 'Joel Musiitwa liked your photo \"Women\'s Day\"', 21, '/photos/9', '2025-07-01 06:07:04', '2025-06-11 10:57:13'),
(31, 6, 'collaboration_invite', 'Joel Musiitwa joined your collection \"Vcx\" as a collaborator', 8, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 12:07:46', '2025-06-11 11:33:04'),
(32, 7, 'comment_like', 'Joel Musiitwa liked your comment on collection \"Vcx\"', 8, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-07-01 06:07:04', '2025-06-11 11:33:34'),
(33, 6, 'collection_comment', 'Joel Musiitwa commented on your collection \"Vcx\"', 8, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 12:07:46', '2025-06-11 11:33:40'),
(34, 6, 'collection_comment', 'Joel Musiitwa commented on your collection \"Vcx\"', 8, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', '2025-06-11 12:07:46', '2025-06-11 11:33:58'),
(35, 8, 'collaboration_invite', 'Musiitwa Joel joined your collection \"cvc\" as a collaborator', 6, '/collections/923dd492-eb3c-4eb5-b064-146f98abdd0c', NULL, '2025-06-11 11:44:29'),
(36, 8, 'collection_upload', 'Musiitwa Joel added 1 photo(s) to your collection', 14, '/collections/923dd492-eb3c-4eb5-b064-146f98abdd0c', NULL, '2025-06-11 11:47:23'),
(37, 8, 'collection_like', 'Musiitwa Joel liked your collection \"cvc\"', 6, '/collections/923dd492-eb3c-4eb5-b064-146f98abdd0c', NULL, '2025-06-11 11:47:42'),
(38, 8, 'collection_comment', 'Musiitwa Joel commented on your collection \"cvc\"', 6, '/collections/923dd492-eb3c-4eb5-b064-146f98abdd0c', NULL, '2025-06-11 11:48:52'),
(39, 7, 'comment_like', 'Joel Musiitwa liked your comment \"The Pearl\" on \"The crested crane by Saad Shots\"', 15, '/photos/5', '2025-07-01 06:07:04', '2025-06-11 15:56:10'),
(40, 8, 'like', 'Lubega Tasha liked your photo \"Nature at its finnest\"', 23, '/photos/6', NULL, '2025-06-12 20:06:33'),
(41, 8, 'comment', 'Lubega Tasha commented on your photo \"Nature at its finnest\"', 16, '/photos/6', NULL, '2025-06-12 20:06:44'),
(42, 7, 'like', 'Musiitwa Joel liked your photo \"Saad Photography tribute\"', 24, '/photos/4', '2025-07-01 06:07:04', '2025-06-12 20:09:24'),
(43, 8, 'follow', 'Musiitwa Joel started following you', 6, '/@joelmusiitwa', NULL, '2025-06-12 20:10:40'),
(44, 8, 'like', 'Musiitwa Joel liked your photo \"The crested crane by Saad Shots\"', 25, '/photos/5', NULL, '2025-06-12 20:11:23'),
(45, 8, 'like', 'Musiitwa Joel liked your photo \"Nature at its finnest\"', 26, '/photos/6', NULL, '2025-06-12 20:11:25'),
(46, 8, 'like', 'Musiitwa Joel liked your photo \"Nature at its finnest\"', 27, '/photos/7', NULL, '2025-06-12 20:11:27'),
(47, 8, 'like', 'Musiitwa Joel liked your photo \"Nature at its finnest\"', 28, '/photos/8', NULL, '2025-06-12 20:11:28'),
(48, 8, 'like', 'Musiitwa Joel liked your photo \"Nature at its finnest\"', 29, '/photos/7', NULL, '2025-06-12 20:11:31'),
(49, 8, 'like', 'Musiitwa Joel liked your photo \"The crested crane by Saad Shots\"', 30, '/photos/5', NULL, '2025-06-13 00:18:17'),
(50, 7, 'like', 'Musiitwa Joel liked your photo \"Women\'s Day\"', 32, '/photos/9', '2025-07-01 06:07:04', '2025-06-13 06:32:27'),
(51, 8, 'collection_like', 'Manager Bollz liked your collection \"Nkumba University\"', 7, '/collections/0d541d09-32e4-4f9e-ab80-295968c168ba', NULL, '2025-06-30 16:48:26'),
(52, 8, 'comment_like', 'Musiitwa Joel liked your comment \"Hey, this looks great\" on \"Nkumba University Intranet Login\"', 1, '/photos/2', NULL, '2025-07-01 10:33:06'),
(54, 6, 'collection_upload', 'Manager Bollz added 1 photo(s) to your collection', 24, '/collections/f239efd6-46c8-4eac-ab6f-e5bc0736cca3', NULL, '2025-07-01 10:45:51');

-- --------------------------------------------------------

--
-- Table structure for table `photos`
--

CREATE TABLE `photos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `thumbnail_path` varchar(255) NOT NULL,
  `width` int(11) NOT NULL,
  `height` int(11) NOT NULL,
  `size_kb` int(11) NOT NULL,
  `format` varchar(10) NOT NULL,
  `is_premium` tinyint(1) DEFAULT 0,
  `is_featured` tinyint(1) DEFAULT 0,
  `status` enum('draft','live') DEFAULT 'live',
  `published_at` timestamp NULL DEFAULT NULL,
  `views` int(11) DEFAULT 0,
  `downloads` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `uuid` varchar(36) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photos`
--

INSERT INTO `photos` (`id`, `user_id`, `title`, `description`, `file_path`, `thumbnail_path`, `width`, `height`, `size_kb`, `format`, `is_premium`, `is_featured`, `status`, `published_at`, `views`, `downloads`, `likes`, `created_at`, `updated_at`, `uuid`) VALUES
(2, 7, 'Nkumba University Intranet Login', 'The look and fill of the design says it all', '/uploads/photos/1749480157103_yzz5kwjg26.png', '/uploads/thumbnails/1749480157103_yzz5kwjg26_thumb.png', 2560, 1600, 98, 'png', 0, 0, 'live', '2025-06-09 14:42:42', 103, 5, 3, '2025-06-09 14:42:42', '2025-07-01 10:47:11', NULL),
(3, 6, 'Happy Birthday', 'One of the best pictures on the internet', '/uploads/photos/1749500701303_vpwbu2l47s.jpeg', '/uploads/thumbnails/1749500701303_vpwbu2l47s_thumb.jpeg', 1280, 1280, 247, 'jpeg', 0, 1, 'live', '2025-06-09 20:25:01', 150, 2, 3, '2025-06-09 20:25:01', '2025-07-06 16:30:25', NULL),
(4, 7, 'Saad Photography tribute', 'In memory of Saad Shots', '/uploads/photos/1749545690014_xdsaiqikpt.webp', '/uploads/thumbnails/1749545690014_xdsaiqikpt_thumb.webp', 780, 1144, 119, 'webp', 0, 1, 'live', '2025-06-10 08:54:50', 104, 0, 3, '2025-06-10 08:54:50', '2025-07-06 16:41:14', NULL),
(5, 8, 'The crested crane by Saad Shots', 'The beauty of the Pearl of Africa', '/uploads/photos/1749551671736_qi66h1lguq.png', '/uploads/thumbnails/1749551671736_qi66h1lguq_thumb.png', 1374, 1806, 255, 'png', 0, 1, 'live', '2025-06-10 10:34:32', 109, 2, 2, '2025-06-10 10:34:32', '2025-07-06 16:30:21', NULL),
(6, 8, 'Nature at its finnest', 'Take a bow', '/uploads/photos/1749551743535_cyk1y7hkz4g.png', '/uploads/thumbnails/1749551743535_cyk1y7hkz4g_thumb.png', 2005, 1583, 517, 'png', 0, 1, 'live', '2025-06-10 10:35:45', 47, 0, 4, '2025-06-10 10:35:45', '2025-07-06 16:30:27', NULL),
(7, 8, 'Nature at its finnest', 'Take a bow', '/uploads/photos/1749551745504_ncply2s11ze.png', '/uploads/thumbnails/1749551745504_ncply2s11ze_thumb.png', 1768, 2048, 348, 'png', 0, 0, 'live', '2025-06-10 10:35:47', 39, 0, 3, '2025-06-10 10:35:47', '2025-07-06 16:30:09', NULL),
(8, 8, 'Nature at its finnest', 'Take a bow', '/uploads/photos/1749551747664_cgtgs00r2oq.png', '/uploads/thumbnails/1749551747664_cgtgs00r2oq_thumb.png', 1576, 2048, 102, 'png', 0, 1, 'live', '2025-06-10 10:35:49', 75, 1, 3, '2025-06-10 10:35:49', '2025-07-06 16:29:07', NULL),
(9, 7, 'Women\'s Day', 'Advocating for women', '/uploads/photos/1749633566333_rr3ektf3cbe.jpg', '/uploads/thumbnails/1749633566333_rr3ektf3cbe_thumb.jpg', 3962, 2641, 513, 'jpg', 0, 1, 'live', '2025-06-11 09:19:27', 36, 0, 3, '2025-06-11 09:19:27', '2025-07-01 10:33:21', NULL),
(10, 6, 'Party time', 'Party time Party time', '/uploads/photos/1749642443530_k1xsubsoxor.jpeg', '/uploads/thumbnails/1749642443530_k1xsubsoxor_thumb.jpeg', 1080, 720, 40, 'jpeg', 0, 1, 'live', '2025-06-11 11:47:23', 25, 1, 1, '2025-06-11 11:47:23', '2025-07-01 10:47:40', NULL),
(11, 7, 'Elegancy', 'Elegancy at it', '/uploads/photos/1749656490534_qnfdm385o7.jpeg', '/uploads/thumbnails/1749656490534_qnfdm385o7_thumb.jpeg', 853, 1280, 86, 'jpeg', 0, 0, 'live', '2025-06-11 15:42:38', 6, 0, 1, '2025-06-11 15:41:30', '2025-07-01 10:46:28', NULL),
(12, 7, 'Black & White', 'Took the photo in year 1', '/uploads/photos/1751366751022_17cc3j7x4vl.png', '/uploads/thumbnails/1751366751022_17cc3j7x4vl_thumb.png', 340, 340, 40, 'png', 0, 0, 'live', '2025-07-01 10:45:51', 5, 0, 0, '2025-07-01 10:45:51', '2025-07-01 10:47:43', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `photo_categories`
--

CREATE TABLE `photo_categories` (
  `photo_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photo_categories`
--

INSERT INTO `photo_categories` (`photo_id`, `category_id`) VALUES
(3, 3),
(4, 3),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 3),
(10, 3),
(11, 3),
(12, 3);

-- --------------------------------------------------------

--
-- Table structure for table `photo_tags`
--

CREATE TABLE `photo_tags` (
  `photo_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photo_tags`
--

INSERT INTO `photo_tags` (`photo_id`, `tag_id`) VALUES
(2, 21),
(3, 13),
(4, 22),
(5, 13),
(6, 13),
(7, 13),
(8, 13);

-- --------------------------------------------------------

--
-- Table structure for table `photo_views`
--

CREATE TABLE `photo_views` (
  `id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `viewed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `photo_views`
--

INSERT INTO `photo_views` (`id`, `photo_id`, `user_id`, `ip_address`, `user_agent`, `viewed_at`) VALUES
(1, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:17:46'),
(2, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:17:46'),
(3, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:17:49'),
(4, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:18:24'),
(5, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:18:25'),
(6, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:18:40'),
(7, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:19:55'),
(8, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:20:08'),
(9, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:20:09'),
(10, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:21:57'),
(11, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:28:48'),
(12, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:28:48'),
(13, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:28:51'),
(14, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:29:07'),
(15, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:29:25'),
(16, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:29:25'),
(17, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:29:41'),
(18, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:30:51'),
(19, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:30:57'),
(20, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:06'),
(21, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:07'),
(22, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:19'),
(23, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:20'),
(24, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:21'),
(25, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:22'),
(26, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:22'),
(27, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:38'),
(28, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:39'),
(29, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:31:40'),
(30, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:32:08'),
(31, 2, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:32:33'),
(32, 3, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:32:35'),
(33, 3, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:32:35'),
(34, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:33:18'),
(35, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:33:18'),
(36, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:33:29'),
(37, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:33:32'),
(38, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:26'),
(39, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:26'),
(40, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:29'),
(41, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:30'),
(42, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:44'),
(43, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:52:45'),
(44, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:53:13'),
(45, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:53:16'),
(46, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:53:57'),
(47, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:53:58'),
(48, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:53:58'),
(49, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:54:08'),
(50, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:54:11'),
(51, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:52'),
(52, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:53'),
(53, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:54'),
(54, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:58'),
(55, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:59'),
(56, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:58:59'),
(57, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:59:00'),
(58, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 07:59:18'),
(59, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:11:26'),
(60, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:15:01'),
(61, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:15:01'),
(62, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:15:14'),
(63, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:15:16'),
(64, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:15:16'),
(65, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:22:01'),
(66, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:06'),
(67, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:07'),
(68, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:08'),
(69, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:08'),
(70, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:13'),
(71, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:22'),
(72, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:23'),
(73, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:23'),
(74, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:48'),
(75, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:48:50'),
(76, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:49:32'),
(77, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:26'),
(78, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:26'),
(79, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:27'),
(80, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:40'),
(81, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:44'),
(82, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:56:48'),
(83, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:57:40'),
(84, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:57:45'),
(85, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:57:54'),
(86, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 08:57:56'),
(87, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:49:02'),
(88, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:49:10'),
(89, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:49:19'),
(90, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:49:24'),
(91, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:50:11'),
(92, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:50:13'),
(93, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 09:50:26'),
(94, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:11'),
(95, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:11'),
(96, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:11'),
(97, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:24'),
(98, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:24'),
(99, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:40'),
(100, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:43'),
(101, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:21:44'),
(102, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:24:11'),
(103, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:34:47'),
(104, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:34:47'),
(105, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:34:48'),
(106, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:36:09'),
(107, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:36:10'),
(108, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:36:10'),
(109, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:36:16'),
(110, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:36:19'),
(111, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:37:04'),
(112, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:37:18'),
(113, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:37:19'),
(114, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:37:21'),
(115, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:37:21'),
(116, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:38:52'),
(117, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:38:55'),
(118, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:02'),
(119, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:26'),
(120, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:39'),
(121, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:39'),
(122, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:41'),
(123, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:42'),
(124, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:44'),
(125, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:39:44'),
(126, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:26'),
(127, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:27'),
(128, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:28'),
(129, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:28'),
(130, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:34'),
(131, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:40:44'),
(132, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:50:49'),
(133, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:33'),
(134, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:35'),
(135, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:38'),
(136, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:40'),
(137, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:42'),
(138, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:51:45'),
(139, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:52:40'),
(140, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:52:54'),
(141, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:02'),
(142, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:02'),
(143, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:30'),
(144, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:31'),
(145, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:55'),
(146, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:53:57'),
(147, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:38'),
(148, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:39'),
(149, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:50'),
(150, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:53'),
(151, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:55'),
(152, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:57'),
(153, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:54:57'),
(154, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:55:13'),
(155, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:55:16'),
(156, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:55:54'),
(157, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:55:55'),
(158, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:06'),
(159, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:09'),
(160, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:09'),
(161, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:12'),
(162, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:20'),
(163, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:20'),
(164, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:21'),
(165, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 10:56:23'),
(166, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:39'),
(167, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:40'),
(168, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:47'),
(169, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:49'),
(170, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:52'),
(171, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:55'),
(172, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:29:57'),
(173, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:33:31'),
(174, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:27'),
(175, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:30'),
(176, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:34'),
(177, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:36'),
(178, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:38'),
(179, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:40'),
(180, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:42'),
(181, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:50'),
(182, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:52'),
(183, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:53'),
(184, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:34:55'),
(185, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:35:18'),
(186, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:05'),
(187, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:07'),
(188, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:08'),
(189, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:10'),
(190, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:11'),
(191, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:13'),
(192, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:47:17'),
(193, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:48:13'),
(194, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:48:15'),
(195, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:48:15'),
(196, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:48:21'),
(197, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:48:42'),
(198, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:53:04'),
(199, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:53:05'),
(200, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:53:11'),
(201, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 11:53:13'),
(202, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 12:02:08'),
(203, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 12:02:15'),
(204, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 12:25:43'),
(205, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 12:25:59'),
(206, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 12:26:03'),
(207, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:52:01'),
(208, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:57:21'),
(209, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:57:22'),
(210, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:57:24'),
(211, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:57:25'),
(212, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:57:26'),
(213, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:59:38'),
(214, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:59:39'),
(215, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 13:59:44'),
(216, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:22'),
(217, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:33'),
(218, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:34'),
(219, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:34'),
(220, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:46'),
(221, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:47'),
(222, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:47'),
(223, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:49'),
(224, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:50'),
(225, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:52'),
(226, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:00:53'),
(227, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:01:37'),
(228, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:02:59'),
(229, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:03:11'),
(230, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:03:12'),
(231, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:03:22'),
(232, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:03:22'),
(233, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:16'),
(234, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:25'),
(235, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:39'),
(236, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:48'),
(237, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:49'),
(238, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:57'),
(239, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:04:57'),
(240, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:05:56'),
(241, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:06:04'),
(242, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:06:16'),
(243, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:06:27'),
(244, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:07:16'),
(245, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:07:33'),
(246, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:07:39'),
(247, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:07:39'),
(248, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:07:49'),
(249, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:09:00'),
(250, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:10:37'),
(251, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:10:46'),
(252, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:11:12'),
(253, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:11:25'),
(254, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:13:08'),
(255, 8, NULL, '::1', NULL, '2025-06-10 14:18:32'),
(256, 6, NULL, '::1', NULL, '2025-06-10 14:18:33'),
(257, 3, NULL, '::1', NULL, '2025-06-10 14:19:19'),
(258, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:23:31'),
(259, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:51:46'),
(260, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:51:47'),
(261, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:51:53'),
(262, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:56:33'),
(263, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:57:05'),
(264, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 14:57:08'),
(265, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:34:33'),
(266, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:34:44'),
(267, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:34:57'),
(268, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:41:23'),
(269, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:43:43'),
(270, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:44:36'),
(271, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:53:28'),
(272, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:53:45'),
(273, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 15:53:47'),
(274, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 16:16:16'),
(275, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-10 16:16:16'),
(276, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 03:52:31'),
(277, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 03:52:47'),
(278, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 03:52:59'),
(279, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 04:22:27'),
(280, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 04:22:31'),
(281, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 04:22:31'),
(282, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 04:46:31'),
(283, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:04:12'),
(284, 7, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:06:48'),
(285, 4, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:07:15'),
(286, 2, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:07:16'),
(287, 7, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:14:06'),
(288, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 05:27:27'),
(289, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:10:48'),
(290, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:10:49'),
(291, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:10:50'),
(292, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:40:02'),
(293, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:40:03'),
(294, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:40:04'),
(295, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:48:07'),
(296, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:48:07'),
(297, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 08:48:16'),
(298, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 09:19:33'),
(299, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 09:19:39'),
(300, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 09:19:39'),
(301, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 09:19:41'),
(302, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 09:19:49'),
(303, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:03:53'),
(304, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:04:34'),
(305, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:04:36'),
(306, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:04:38'),
(307, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:04:40'),
(308, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:04:43'),
(309, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:10:03'),
(310, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:18:41'),
(311, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:18:43'),
(312, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:19:21');
INSERT INTO `photo_views` (`id`, `photo_id`, `user_id`, `ip_address`, `user_agent`, `viewed_at`) VALUES
(313, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:19:22'),
(314, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:40:09'),
(315, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:40:12'),
(316, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:47:03'),
(317, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:47:11'),
(318, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:47:14'),
(319, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:47:14'),
(320, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:47:25'),
(321, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:48:00'),
(322, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:48:01'),
(323, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:49:07'),
(324, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:49:20'),
(325, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:49:58'),
(326, 4, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:51:13'),
(327, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:01'),
(328, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:02'),
(329, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:29'),
(330, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:32'),
(331, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:39'),
(332, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:56:40'),
(333, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:10'),
(334, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:12'),
(335, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:12'),
(336, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:13'),
(337, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:28'),
(338, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:28'),
(339, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 10:57:41'),
(340, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:40:01'),
(341, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:40:04'),
(342, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:43:30'),
(343, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:47:49'),
(344, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:47:52'),
(345, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:47:53'),
(346, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:48:05'),
(347, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:48:20'),
(348, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:49:56'),
(349, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:52:15'),
(350, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 11:52:19'),
(351, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 12:03:15'),
(352, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 12:05:53'),
(353, 6, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 14:41:24'),
(354, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 14:41:28'),
(355, 10, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 14:41:30'),
(356, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 14:41:32'),
(357, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 14:41:35'),
(358, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15', '2025-06-11 14:43:17'),
(359, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15', '2025-06-11 14:43:21'),
(360, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15', '2025-06-11 15:43:01'),
(361, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2.1 Safari/605.1.15', '2025-06-11 15:43:06'),
(362, 7, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:43:12'),
(363, 11, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:43:17'),
(364, 11, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:43:19'),
(365, 8, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:43:40'),
(366, 9, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:53:44'),
(367, 2, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:53:45'),
(368, 3, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:55:01'),
(369, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:55:58'),
(370, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:55:59'),
(371, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:56:00'),
(372, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:56:04'),
(373, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 15:56:10'),
(374, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 16:13:48'),
(375, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 16:13:48'),
(376, 5, 8, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 16:13:50'),
(377, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-11 17:23:50'),
(378, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 11:45:21'),
(379, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 14:27:42'),
(380, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 14:51:08'),
(381, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:09:52'),
(382, 7, 9, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:10:48'),
(383, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:12:10'),
(384, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:12:14'),
(385, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:12:19'),
(386, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:12:24'),
(387, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:37:59'),
(388, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:38:03'),
(389, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:38:06'),
(390, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:38:07'),
(391, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:38:09'),
(392, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 15:38:12'),
(393, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:02:33'),
(394, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:02:34'),
(395, 6, 9, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '2025-06-12 20:06:30'),
(396, 6, 9, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '2025-06-12 20:06:31'),
(397, 6, 9, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '2025-06-12 20:06:31'),
(398, 6, 9, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '2025-06-12 20:06:33'),
(399, 6, 9, NULL, 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1', '2025-06-12 20:06:44'),
(400, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:09:16'),
(401, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:09:17'),
(402, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:09:22'),
(403, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:09:24'),
(404, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:10:25'),
(405, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:10:37'),
(406, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:10:38'),
(407, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:10:55'),
(408, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:12'),
(409, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:23'),
(410, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:25'),
(411, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:27'),
(412, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:27'),
(413, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:28'),
(414, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:28'),
(415, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:31'),
(416, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 20:11:31'),
(417, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:17:34'),
(418, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:21:08'),
(419, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:22:14'),
(420, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:41:58'),
(421, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:42:04'),
(422, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:42:22'),
(423, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:43:21'),
(424, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:49:28'),
(425, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:49:45'),
(426, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:49:49'),
(427, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:03'),
(428, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:09'),
(429, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:13'),
(430, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:17'),
(431, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:21'),
(432, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:29'),
(433, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:50:35'),
(434, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:51:20'),
(435, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:53:23'),
(436, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:53:28'),
(437, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:53:37'),
(438, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:54:59'),
(439, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:55:02'),
(440, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-12 23:55:03'),
(441, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:00:44'),
(442, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:00:47'),
(443, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:00:50'),
(444, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:01:57'),
(445, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:01:57'),
(446, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:02:03'),
(447, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:08:32'),
(448, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:08:32'),
(449, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:14:44'),
(450, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:14:47'),
(451, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:15:18'),
(452, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:15:22'),
(453, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:16:05'),
(454, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:16:08'),
(455, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:16:12'),
(456, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:17:41'),
(457, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:00'),
(458, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:02'),
(459, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:04'),
(460, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:10'),
(461, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:16'),
(462, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:17'),
(463, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:53'),
(464, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:53'),
(465, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:54'),
(466, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:55'),
(467, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:55'),
(468, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:56'),
(469, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:56'),
(470, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:56'),
(471, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:57'),
(472, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:57'),
(473, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:57'),
(474, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:57'),
(475, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:57'),
(476, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(477, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(478, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(479, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(480, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(481, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(482, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:18:58'),
(483, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:19:04'),
(484, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:20:04'),
(485, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:20:07'),
(486, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:20:10'),
(487, 11, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:20:13'),
(488, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:20:14'),
(489, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:18'),
(490, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:20'),
(491, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:20'),
(492, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:21'),
(493, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:24'),
(494, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:21:26'),
(495, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:23:27'),
(496, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:23:41'),
(497, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 00:23:55'),
(498, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:08:46'),
(499, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:10:38'),
(500, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:10:54'),
(501, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:29:56'),
(502, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:30:05'),
(503, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:30:08'),
(504, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:32:27'),
(505, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:33:26'),
(506, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:42:04'),
(507, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:42:26'),
(508, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:42:27'),
(509, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:43:01'),
(510, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:43:54'),
(511, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:45:37'),
(512, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:45:43'),
(513, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:45:47'),
(514, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:46:33'),
(515, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:47:21'),
(516, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:48:30'),
(517, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:48:33'),
(518, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:48:45'),
(519, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:48:51'),
(520, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:49:05'),
(521, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:49:43'),
(522, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:49:44'),
(523, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:52:01'),
(524, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:52:10'),
(525, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:52:35'),
(526, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:54:36'),
(527, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:54:39'),
(528, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:54:46'),
(529, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:54:53'),
(530, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:58:12'),
(531, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:03'),
(532, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:05'),
(533, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:05'),
(534, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:06'),
(535, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:06'),
(536, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:08'),
(537, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:08'),
(538, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:10'),
(539, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:10'),
(540, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:16'),
(541, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:38'),
(542, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:41'),
(543, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 06:59:43'),
(544, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:00:37'),
(545, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:00:41'),
(546, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:01:34'),
(547, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:02:53'),
(548, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:04:48'),
(549, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:04:50'),
(550, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:04:52'),
(551, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:04:59'),
(552, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:06:06'),
(553, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:06:13'),
(554, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:07:31'),
(555, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:07:33'),
(556, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:07:59'),
(557, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:08:03'),
(558, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:08:54'),
(559, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:11:24'),
(560, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:11:25'),
(561, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:12:36'),
(562, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:13:37'),
(563, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:13:37'),
(564, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:13:39'),
(565, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:15:01'),
(566, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:15:51'),
(567, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:25:07'),
(568, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:32:24'),
(569, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:36:40'),
(570, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:37:31'),
(571, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:38:04'),
(572, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:38:06'),
(573, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:40:07'),
(574, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:40:24'),
(575, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:41:13'),
(576, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:41:58'),
(577, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:11'),
(578, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:12'),
(579, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:14'),
(580, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:14'),
(581, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:15'),
(582, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:21'),
(583, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:25'),
(584, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:32'),
(585, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:42:34'),
(586, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:50:22'),
(587, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:50:33'),
(588, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:56:24'),
(589, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 07:56:47'),
(590, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:05:15'),
(591, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:10:27'),
(592, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:21:25'),
(593, 10, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:27:17'),
(594, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:28:35'),
(595, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:29:16'),
(596, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:31:53'),
(597, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:32:00'),
(598, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 08:32:07'),
(599, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:11:21'),
(600, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:15:58'),
(601, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:16:18'),
(602, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:16:39'),
(603, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:17:17'),
(604, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:17:23'),
(605, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:17:23'),
(606, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:17:52'),
(607, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:17:56'),
(608, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:18:41'),
(609, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:33:56'),
(610, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:34:00'),
(611, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:34:00'),
(612, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:34:07'),
(613, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:35:36'),
(614, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:35:38'),
(615, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 15:45:22'),
(616, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 17:01:50'),
(617, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-13 17:03:32'),
(618, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 08:07:00'),
(619, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 08:18:25'),
(620, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 08:18:27'),
(621, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:26:30');
INSERT INTO `photo_views` (`id`, `photo_id`, `user_id`, `ip_address`, `user_agent`, `viewed_at`) VALUES
(622, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:37:14'),
(623, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:37:16'),
(624, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:10'),
(625, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:12'),
(626, 6, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:18'),
(627, 5, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:36'),
(628, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:43'),
(629, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:38:53'),
(630, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:39:05'),
(631, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:39:07'),
(632, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:39:12'),
(633, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-14 12:48:09'),
(634, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:35:36'),
(635, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:36:09'),
(636, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:36:31'),
(637, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:36:35'),
(638, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:04'),
(639, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:17'),
(640, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:18'),
(641, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:20'),
(642, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:23'),
(643, 9, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:26'),
(644, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:31'),
(645, 10, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:37'),
(646, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:51'),
(647, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:38:52'),
(648, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:40:07'),
(649, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:05'),
(650, 11, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:11'),
(651, 11, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:12'),
(652, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:20'),
(653, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:54'),
(654, 8, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-06-30 16:47:55'),
(655, 5, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 07:47:43'),
(656, 10, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 07:47:51'),
(657, 4, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:17'),
(658, 4, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:18'),
(659, 5, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:19'),
(660, 5, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:19'),
(661, 3, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:20'),
(662, 3, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:21'),
(663, 3, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:11:24'),
(664, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:12:49'),
(665, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:12:51'),
(666, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 08:12:56'),
(667, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:32:12'),
(668, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:32:55'),
(669, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:32:58'),
(670, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:32:59'),
(671, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:33:05'),
(672, 2, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:33:06'),
(673, 9, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:33:21'),
(674, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:34:25'),
(675, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:35:11'),
(676, 8, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:39:26'),
(677, 7, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:39:34'),
(678, 3, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:39:42'),
(679, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:39:47'),
(680, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:46:15'),
(681, 12, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:46:17'),
(682, 11, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:46:28'),
(683, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:46:41'),
(684, 2, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:11'),
(685, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:16'),
(686, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:20'),
(687, 12, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:23'),
(688, 10, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:40'),
(689, 12, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:42'),
(690, 12, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:43'),
(691, 12, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-01 10:47:43'),
(692, 4, 6, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:28:53'),
(693, 8, NULL, '::1', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:29:07'),
(694, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:30:08'),
(695, 7, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:30:09'),
(696, 5, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:30:21'),
(697, 3, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:30:25'),
(698, 6, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:30:27'),
(699, 4, 7, NULL, 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36', '2025-07-06 16:41:14');

-- --------------------------------------------------------

--
-- Table structure for table `saved_photos`
--

CREATE TABLE `saved_photos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `photo_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `saved_photos`
--

INSERT INTO `saved_photos` (`id`, `user_id`, `photo_id`, `created_at`) VALUES
(5, 6, 2, '2025-06-10 07:53:16'),
(7, 8, 2, '2025-06-10 08:15:16'),
(9, 7, 3, '2025-06-10 08:48:22'),
(10, 7, 4, '2025-06-10 08:57:56'),
(12, 7, 2, '2025-06-10 11:53:13'),
(14, 6, 9, '2025-06-11 10:04:43'),
(15, 8, 9, '2025-06-11 10:57:12'),
(27, 6, 3, '2025-06-13 00:19:04'),
(29, 6, 4, '2025-06-13 07:42:12'),
(30, 6, 10, '2025-06-13 07:42:15');

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`) VALUES
(1, 'landscape', '2025-06-08 16:20:31'),
(2, 'portrait', '2025-06-08 16:20:31'),
(3, 'urban', '2025-06-08 16:20:31'),
(4, 'wildlife', '2025-06-08 16:20:31'),
(5, 'macro', '2025-06-08 16:20:31'),
(6, 'minimalist', '2025-06-08 16:20:31'),
(7, 'vintage', '2025-06-08 16:20:31'),
(8, 'aerial', '2025-06-08 16:20:31'),
(9, 'night', '2025-06-08 16:20:31'),
(10, 'sunset', '2025-06-08 16:20:31'),
(11, 'architecture', '2025-06-08 16:20:31'),
(12, 'travel', '2025-06-08 16:20:31'),
(13, 'nature', '2025-06-08 16:20:31'),
(14, 'street', '2025-06-08 16:20:31'),
(15, 'food', '2025-06-08 16:20:31'),
(16, 'abstract', '2025-06-08 16:20:31'),
(17, 'black and white', '2025-06-08 16:20:31'),
(18, 'fashion', '2025-06-08 16:20:31'),
(19, 'sports', '2025-06-08 16:20:31'),
(20, 'documentary', '2025-06-08 16:20:31'),
(21, 'academics', '2025-06-09 14:10:41'),
(22, 'camera', '2025-06-10 08:54:50');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `website` varchar(255) DEFAULT NULL,
  `location` varchar(100) DEFAULT NULL,
  `instagram` varchar(100) DEFAULT NULL,
  `twitter` varchar(100) DEFAULT NULL,
  `behance` varchar(100) DEFAULT NULL,
  `dribbble` varchar(100) DEFAULT NULL,
  `role` enum('guest','photographer','company','admin') NOT NULL DEFAULT 'photographer',
  `verified` tinyint(1) DEFAULT 0,
  `followers_count` int(11) DEFAULT 0,
  `following_count` int(11) DEFAULT 0,
  `uploads_count` int(11) DEFAULT 0,
  `total_views` int(11) DEFAULT 0,
  `total_downloads` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password_hash`, `first_name`, `last_name`, `avatar`, `bio`, `website`, `location`, `instagram`, `twitter`, `behance`, `dribbble`, `role`, `verified`, `followers_count`, `following_count`, `uploads_count`, `total_views`, `total_downloads`, `created_at`, `updated_at`) VALUES
(6, 'musiitwajoel@gmail.com', 'joelmusiitwa', '$2a$10$z4/saMff2Zi9wpInhJP.5Ot3F1Y1JtxfiQBiv0yYhw7UY29XNxN5W', 'Musiitwa', 'Joel', NULL, 'Am a dedicated photographer, I love pixinity', 'https://pixinity/admin/press', 'Mukono', 'joel_', 'joel_musii_', 'joel_musii_', 'joel_musii_', 'admin', 1, 2, 4, 2, 172, 3, '2025-06-08 16:43:42', '2025-07-01 10:40:05'),
(7, 'managerbollz@gmail.com', 'managerbollz', '$2a$10$Wpc8fuYx/uEaYPBvmmTQ7e8Zm/OLK3N.eUy5NuccBbnjBgyZIoXde', 'Manager', 'Bollz', '/uploads/avatars/avatar-1749549001086-174615677_processed.jpeg', 'Photography is my passion', 'https://tredumo.com/', 'Kampala, Uganda', 'musiitwajoel', 'footyfusionafro', '', 'musiitwajoel', 'photographer', 0, 2, 1, 5, 253, 5, '2025-06-08 21:20:33', '2025-07-06 16:29:50'),
(8, 'jmusiitwa.std@nkumbauniversity.ac.ug', 'Joel_nkumba', '$2a$10$Xh04BxvvmP.jqASimwULFek.QxDLAyvghx6B31byXuTHeobApfSGC', 'Joel', 'Musiitwa', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'company', 0, 2, 2, 4, 236, 2, '2025-06-09 07:36:26', '2025-06-13 15:50:14'),
(9, 'dredgecr01@gmail.com', 'dredgecr01', '$2a$10$eaAU7dTRcdDWd9GouLlSz.swlN.GgY3K3ik.lkKcNffn.UKbBi5TG', 'Lubega', 'Tasha', '/uploads/avatars/avatar-1749743497762-181580240_processed.jpeg', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 'photographer', 1, 1, 0, 0, 0, 0, '2025-06-12 12:07:21', '2025-06-13 15:29:35');

-- --------------------------------------------------------

--
-- Table structure for table `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_sessions`
--

INSERT INTO `user_sessions` (`id`, `user_id`, `token`, `expires_at`, `created_at`) VALUES
(26, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc0OTQ3Njc3NiwiZXhwIjoxNzUwMDgxNTc2fQ.vNSafVfv6Fo_7qrOc0_DEz9Q3E5g04Au-6LwL2gkDl4', '2025-06-16 13:46:16', '2025-06-09 13:46:16'),
(45, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTU0MDc4MCwiZXhwIjoxNzUwMTQ1NTgwfQ.NTPkSfXMezg_ZrBSV0g-N-0lamcgiTH1UOqG9fw_0OQ', '2025-06-17 07:33:00', '2025-06-10 07:33:00'),
(50, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc0OTU0NjQ3OSwiZXhwIjoxNzUwMTUxMjc5fQ.c9zzO_m8pzhIzIVXGut_eJey0L6NElHO1f4DEGaQLwc', '2025-06-17 09:07:59', '2025-06-10 09:07:59'),
(62, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTYxNzE1MiwiZXhwIjoxNzUwMjIxOTUyfQ.cLp9dmnT7tkfvdztwIjm88gGlifoc-5KWIMn-B8R6Eg', '2025-06-18 04:45:52', '2025-06-11 04:45:52'),
(63, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTc0OTYxOTE5MywiZXhwIjoxNzUwMjIzOTkzfQ.wwAonIv8PtN10zdsoUxGTBFCBPBoRP5nAT_BfkX7sio', '2025-06-18 05:19:53', '2025-06-11 05:19:53'),
(69, 8, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsImlhdCI6MTc0OTYzODk3NCwiZXhwIjoxNzUwMjQzNzc0fQ.jBGu_MsMXXT_U6u-JLVHy0yU0MIfNxUisVLifTMMvf8', '2025-06-18 10:49:34', '2025-06-11 10:49:34'),
(73, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTY0MjIwMywiZXhwIjoxNzUwMjQ3MDAzfQ.tqP1GeHI22KbcRRJVLYzxMj5ndKXwo6_sIzFu_7qeyU', '2025-06-18 11:43:23', '2025-06-11 11:43:23'),
(79, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc0OTY1Mjk2OSwiZXhwIjoxNzUwMjU3NzY5fQ.pmLcsvnFvA0UFxlJm5g7v77i1zpxXorE1N5mhSxPoHs', '2025-06-18 14:42:49', '2025-06-11 14:42:49'),
(81, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTY2MDY1MCwiZXhwIjoxNzUwMjY1NDUwfQ.ynW16jHKxc4Zv0Tpg6FuWaur20DNPPi2G5rwdFYOt58', '2025-06-18 16:50:50', '2025-06-11 16:50:50'),
(108, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTc0MzUxOSwiZXhwIjoxNzUwMzQ4MzE5fQ.dZEerpLLrDFliE3tEA7ejFcu9kL2qv6iL8E9NGx1Kys', '2025-06-19 15:51:59', '2025-06-12 15:51:59'),
(111, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTc1ODg4MSwiZXhwIjoxNzUwMzYzNjgxfQ._SBmJxBJyDpp4bpkyrffqvQmURNXhR3djUsTSyhSG6c', '2025-06-19 20:08:01', '2025-06-12 20:08:01'),
(117, 6, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjYsImlhdCI6MTc0OTg4NzMyMiwiZXhwIjoxNzUwNDkyMTIyfQ.yZMy5pYi5xTgweYdgSblXbmlMEUI5kxQRz2gsl8vmNs', '2025-06-21 07:48:42', '2025-06-14 07:48:42'),
(120, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc1MTMwMjAwNSwiZXhwIjoxNzUxOTA2ODA1fQ.pA_6SdewfHHJ8AVUFK7yy3vOmQjXM5jlkWoqOPzR9yE', '2025-07-07 16:46:45', '2025-06-30 16:46:45'),
(130, 7, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTc1MTgxOTM4MiwiZXhwIjoxNzUxOTA1NzgyfQ.e-_qsh03wixlON2Fqp5RycbtpSDylSpTVaXbJFhR2KA', '2025-07-13 16:29:42', '2025-07-06 16:29:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_post_user` (`post_id`,`user_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `author_id` (`author_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `collections`
--
ALTER TABLE `collections`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `cover_photo_id` (`cover_photo_id`),
  ADD KEY `idx_collections_uuid` (`uuid`);

--
-- Indexes for table `collection_access_requests`
--
ALTER TABLE `collection_access_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_collection_user_request` (`collection_id`,`user_id`),
  ADD KEY `idx_collection_access_requests_collection_id` (`collection_id`),
  ADD KEY `idx_collection_access_requests_user_id` (`user_id`),
  ADD KEY `idx_collection_access_requests_status` (`status`),
  ADD KEY `collection_access_requests_ibfk_3` (`responded_by`);

--
-- Indexes for table `collection_collaborators`
--
ALTER TABLE `collection_collaborators`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_collection_user` (`collection_id`,`user_id`),
  ADD KEY `idx_collection_collaborators_collection_id` (`collection_id`),
  ADD KEY `idx_collection_collaborators_user_id` (`user_id`),
  ADD KEY `idx_collection_collaborators_status` (`status`),
  ADD KEY `collection_collaborators_ibfk_3` (`invited_by`);

--
-- Indexes for table `collection_comments`
--
ALTER TABLE `collection_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_collection_comments_collection_id` (`collection_id`),
  ADD KEY `idx_collection_comments_user_id` (`user_id`),
  ADD KEY `idx_collection_comments_parent_id` (`parent_id`);

--
-- Indexes for table `collection_comment_likes`
--
ALTER TABLE `collection_comment_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_comment_like` (`comment_id`,`user_id`),
  ADD KEY `idx_collection_comment_likes_comment_id` (`comment_id`),
  ADD KEY `idx_collection_comment_likes_user_id` (`user_id`);

--
-- Indexes for table `collection_likes`
--
ALTER TABLE `collection_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `collection_id` (`collection_id`,`user_id`),
  ADD KEY `idx_collection_likes_collection_id` (`collection_id`),
  ADD KEY `idx_collection_likes_user_id` (`user_id`);

--
-- Indexes for table `collection_photos`
--
ALTER TABLE `collection_photos`
  ADD PRIMARY KEY (`collection_id`,`photo_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indexes for table `collection_views`
--
ALTER TABLE `collection_views`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_collection_views_collection_id` (`collection_id`),
  ADD KEY `idx_collection_views_user_id` (`user_id`),
  ADD KEY `idx_collection_views_ip_address` (`ip_address`),
  ADD KEY `idx_collection_views_viewed_at` (`viewed_at`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `idx_comments_parent_id` (`parent_id`),
  ADD KEY `idx_comments_photo_created` (`photo_id`,`created_at`),
  ADD KEY `idx_comments_parent_created` (`parent_id`,`created_at`);

--
-- Indexes for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD PRIMARY KEY (`user_id`,`comment_id`),
  ADD KEY `idx_comment_likes_comment_id` (`comment_id`);

--
-- Indexes for table `downloads`
--
ALTER TABLE `downloads`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_downloads_user_date` (`user_id`,`download_date`),
  ADD KEY `idx_downloads_photo_date` (`photo_id`,`download_date`);

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD PRIMARY KEY (`follower_id`,`following_id`),
  ADD KEY `idx_follows_follower` (`follower_id`),
  ADD KEY `idx_follows_following` (`following_id`);

--
-- Indexes for table `homepage_sections`
--
ALTER TABLE `homepage_sections`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `job_id` (`job_id`);

--
-- Indexes for table `job_postings`
--
ALTER TABLE `job_postings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`user_id`,`photo_id`),
  ADD KEY `idx_likes_user_id` (`user_id`),
  ADD KEY `idx_likes_photo_id` (`photo_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_notifications_user_id` (`user_id`),
  ADD KEY `idx_notifications_type` (`type`),
  ADD KEY `idx_notifications_read_at` (`read_at`),
  ADD KEY `idx_notifications_created_at` (`created_at`),
  ADD KEY `idx_notifications_user_read_created` (`user_id`,`read_at`,`created_at`);

--
-- Indexes for table `photos`
--
ALTER TABLE `photos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_photos_status` (`status`),
  ADD KEY `idx_photos_published_at` (`published_at`),
  ADD KEY `idx_photos_user_status` (`user_id`,`status`),
  ADD KEY `idx_photos_views` (`views`),
  ADD KEY `idx_photos_likes` (`likes`),
  ADD KEY `idx_photos_downloads` (`downloads`);

--
-- Indexes for table `photo_categories`
--
ALTER TABLE `photo_categories`
  ADD PRIMARY KEY (`photo_id`,`category_id`),
  ADD KEY `category_id` (`category_id`);

--
-- Indexes for table `photo_tags`
--
ALTER TABLE `photo_tags`
  ADD PRIMARY KEY (`photo_id`,`tag_id`),
  ADD KEY `tag_id` (`tag_id`);

--
-- Indexes for table `photo_views`
--
ALTER TABLE `photo_views`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_view` (`photo_id`,`user_id`,`ip_address`),
  ADD KEY `idx_photo_views` (`photo_id`),
  ADD KEY `idx_user_views` (`user_id`),
  ADD KEY `idx_photo_views_photo_id` (`photo_id`);

--
-- Indexes for table `saved_photos`
--
ALTER TABLE `saved_photos`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_save` (`user_id`,`photo_id`),
  ADD KEY `photo_id` (`photo_id`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `idx_users_role` (`role`),
  ADD KEY `idx_users_verified` (`verified`),
  ADD KEY `idx_users_created` (`created_at`);

--
-- Indexes for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blog_comments`
--
ALTER TABLE `blog_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog_likes`
--
ALTER TABLE `blog_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `blog_posts`
--
ALTER TABLE `blog_posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `collections`
--
ALTER TABLE `collections`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `collection_access_requests`
--
ALTER TABLE `collection_access_requests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `collection_collaborators`
--
ALTER TABLE `collection_collaborators`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `collection_comments`
--
ALTER TABLE `collection_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `collection_comment_likes`
--
ALTER TABLE `collection_comment_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `collection_likes`
--
ALTER TABLE `collection_likes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `collection_views`
--
ALTER TABLE `collection_views`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=159;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `downloads`
--
ALTER TABLE `downloads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `job_postings`
--
ALTER TABLE `job_postings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `photos`
--
ALTER TABLE `photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `photo_views`
--
ALTER TABLE `photo_views`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=700;

--
-- AUTO_INCREMENT for table `saved_photos`
--
ALTER TABLE `saved_photos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `user_sessions`
--
ALTER TABLE `user_sessions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blog_comments`
--
ALTER TABLE `blog_comments`
  ADD CONSTRAINT `blog_comments_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `blog_comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD CONSTRAINT `blog_likes_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `blog_posts` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_posts`
--
ALTER TABLE `blog_posts`
  ADD CONSTRAINT `blog_posts_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `collections`
--
ALTER TABLE `collections`
  ADD CONSTRAINT `collections_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collections_ibfk_2` FOREIGN KEY (`cover_photo_id`) REFERENCES `photos` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `collection_access_requests`
--
ALTER TABLE `collection_access_requests`
  ADD CONSTRAINT `collection_access_requests_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_access_requests_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_access_requests_ibfk_3` FOREIGN KEY (`responded_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `collection_collaborators`
--
ALTER TABLE `collection_collaborators`
  ADD CONSTRAINT `collection_collaborators_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_collaborators_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_collaborators_ibfk_3` FOREIGN KEY (`invited_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collection_comments`
--
ALTER TABLE `collection_comments`
  ADD CONSTRAINT `collection_comments_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `collection_comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collection_comment_likes`
--
ALTER TABLE `collection_comment_likes`
  ADD CONSTRAINT `collection_comment_likes_ibfk_1` FOREIGN KEY (`comment_id`) REFERENCES `collection_comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_comment_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collection_likes`
--
ALTER TABLE `collection_likes`
  ADD CONSTRAINT `collection_likes_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collection_photos`
--
ALTER TABLE `collection_photos`
  ADD CONSTRAINT `collection_photos_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `collection_views`
--
ALTER TABLE `collection_views`
  ADD CONSTRAINT `collection_views_ibfk_1` FOREIGN KEY (`collection_id`) REFERENCES `collections` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `collection_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_4` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comment_likes`
--
ALTER TABLE `comment_likes`
  ADD CONSTRAINT `comment_likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comment_likes_ibfk_2` FOREIGN KEY (`comment_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `downloads`
--
ALTER TABLE `downloads`
  ADD CONSTRAINT `downloads_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `downloads_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `follows`
--
ALTER TABLE `follows`
  ADD CONSTRAINT `follows_ibfk_1` FOREIGN KEY (`follower_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `follows_ibfk_2` FOREIGN KEY (`following_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD CONSTRAINT `job_applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `job_postings` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photos`
--
ALTER TABLE `photos`
  ADD CONSTRAINT `photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photo_categories`
--
ALTER TABLE `photo_categories`
  ADD CONSTRAINT `photo_categories_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photo_categories_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photo_tags`
--
ALTER TABLE `photo_tags`
  ADD CONSTRAINT `photo_tags_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photo_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `photo_views`
--
ALTER TABLE `photo_views`
  ADD CONSTRAINT `photo_views_ibfk_1` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `photo_views_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `saved_photos`
--
ALTER TABLE `saved_photos`
  ADD CONSTRAINT `saved_photos_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saved_photos_ibfk_2` FOREIGN KEY (`photo_id`) REFERENCES `photos` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `user_sessions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
