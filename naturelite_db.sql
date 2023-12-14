-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 14, 2023 at 08:17 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `naturelite_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cust_id` int(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `number` varchar(10) NOT NULL,
  `address` text NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `name`, `number`, `address`, `created_at`, `updated_at`) VALUES
(3, 'ashi', '2147483646', 'tld-neora', NULL, NULL),
(7, 'aayushi agrawal', '5555555555', 'bhilai nagar', NULL, NULL),
(8, 'meena', '8888888888', 'bsp', NULL, NULL),
(9, 'hemant', '7897897672', 'bsp', NULL, NULL),
(10, 'annu', '9879876787', 'up', NULL, NULL),
(11, 'dd', '1211111111', 'dd', NULL, NULL),
(14, 'soniya', '7224853487', 'up', NULL, NULL),
(22, 'soni', '9898767898', 'up', NULL, NULL),
(24, 'manish', '7222555555', 'bihar', '2023-12-01 07:24:27', '2023-12-01 07:24:27');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int(20) NOT NULL,
  `cust_id` int(20) NOT NULL,
  `prod_id` int(20) NOT NULL,
  `date` date NOT NULL,
  `delivered_date` date DEFAULT NULL,
  `invoice` varchar(100) NOT NULL,
  `shipping_charge` int(11) DEFAULT NULL,
  `location` varchar(20) NOT NULL,
  `delivery_preference` varchar(30) DEFAULT NULL,
  `payment_mode` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `amount` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `grand_total` int(11) NOT NULL,
  `formatted_order_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_id`, `cust_id`, `prod_id`, `date`, `delivered_date`, `invoice`, `shipping_charge`, `location`, `delivery_preference`, `payment_mode`, `created_at`, `updated_at`, `amount`, `total_amount`, `grand_total`, `formatted_order_id`) VALUES
(109, 11, 2, '2023-12-03', NULL, '202312044', NULL, 'b', 'bb', 'Cash', '2023-12-03 11:53:21', '2023-12-03 11:53:21', 0, 0, 0, 'IMM_109'),
(113, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'mmm', 'mm', 'Cash', '2023-12-03 12:15:33', '2023-12-03 12:15:33', 0, 0, 0, 'FUT_113'),
(114, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'hh', 'hh', 'Cash', '2023-12-03 12:27:18', '2023-12-03 12:27:18', 0, 0, 0, 'FUT_114'),
(115, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'ff', 'ff', 'Cash', '2023-12-03 12:29:23', '2023-12-03 12:29:23', 0, 0, 0, 'FUT_115'),
(117, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'cc', 'cc', 'Cash', '2023-12-03 13:11:29', '2023-12-03 13:11:29', 0, 0, 0, 'FUT_117'),
(118, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'vv', 'vv', 'Cash', '2023-12-03 13:12:01', '2023-12-03 13:12:01', 0, 0, 0, 'FUT_118'),
(119, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'xx', 'xx', 'Cash', '2023-12-03 13:12:41', '2023-12-03 13:12:41', 0, 0, 0, 'FUT_119'),
(120, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'oo', 'oo', 'Cash', '2023-12-03 14:05:50', '2023-12-03 14:05:50', 0, 0, 0, 'FUT_120'),
(122, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'j', 'j', 'Cash', '2023-12-03 14:14:46', '2023-12-03 14:14:46', 0, 0, 0, 'FUT_122'),
(123, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'a', 'z', 'Cash', '2023-12-03 14:39:30', '2023-12-03 14:39:30', 0, 0, 0, 'FUT_123'),
(124, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'mmm', 'aaa', 'Cash', '2023-12-03 14:48:42', '2023-12-03 14:48:42', 0, 0, 0, 'FUT_124'),
(125, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'zz', 'mm', 'Cash', '2023-12-03 14:49:50', '2023-12-03 14:49:50', 0, 0, 0, 'FUT_125'),
(126, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'k', 'k', 'Cash', '2023-12-03 14:52:14', '2023-12-03 14:52:14', 0, 0, 0, 'FUT_126'),
(127, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'b', 'b', 'Cash', '2023-12-03 15:14:19', '2023-12-03 15:14:19', 0, 0, 0, 'FUT_127'),
(128, 11, 3, '2023-12-03', NULL, '202312044', NULL, 'c', 'b', 'Cash', '2023-12-03 15:20:46', '2023-12-03 15:20:46', 0, 0, 0, 'FUT_128'),
(129, 11, 4, '2023-12-03', NULL, '202312044', NULL, 'n', 'n', 'Cash', '2023-12-03 15:22:20', '2023-12-03 15:22:20', 0, 0, 0, 'IMM_129'),
(131, 11, 2, '0000-00-00', NULL, '202312044', NULL, '', 'abc', '', '2023-12-04 12:03:59', '2023-12-04 12:03:59', 60, 0, 50000, 'IMM_DEL_'),
(132, 11, 3, '2023-12-04', NULL, '202312044', NULL, 'aa', 'aa', 'Cash', '2023-12-04 12:16:38', '2023-12-04 12:16:38', 0, 0, 0, 'IMM_132'),
(133, 11, 3, '2023-12-04', NULL, '202312044', NULL, 'v', 'v', 'Cash', '2023-12-04 14:55:34', '2023-12-04 14:55:34', 0, 0, 0, 'FUT_133'),
(134, 11, 4, '2023-12-04', NULL, '202312044', NULL, 'l', 'll', 'Cash', '2023-12-04 15:05:40', '2023-12-04 15:05:40', 0, 0, 0, 'IMM_134'),
(135, 11, 2, '2023-12-04', NULL, '202312044', NULL, 'd', 'd', 'Cash', '2023-12-04 15:32:15', '2023-12-04 15:32:15', 0, 0, 0, 'IMM_135'),
(136, 11, 2, '2023-12-04', NULL, '202312044', NULL, 'dd', 'dd', 'Cash', '2023-12-04 15:34:44', '2023-12-04 15:34:44', 0, 0, 0, 'IMM_136'),
(137, 11, 2, '2023-11-29', NULL, '202312044', NULL, 'aa', 'aa', 'Cash', '2023-12-04 15:39:40', '2023-12-04 15:39:40', 0, 0, 0, 'IMM_DEL_'),
(138, 11, 3, '2023-12-04', NULL, '202312044', NULL, 'ccc', 'cc', 'Cash', '2023-12-04 15:46:50', '2023-12-04 15:46:50', 0, 0, 0, 'FUT_138'),
(139, 11, 2, '2023-12-04', NULL, '202312044', NULL, 'aa', 'aa', 'Cash', '2023-12-04 15:58:26', '2023-12-04 15:58:26', 0, 0, 0, 'IMM_DEL_'),
(140, 11, 2, '2023-12-04', NULL, '202312044', NULL, 'x', 'ss', 'Cash', '2023-12-04 16:06:09', '2023-12-04 16:06:09', 0, 0, 0, 'IMM_DEL_140'),
(141, 11, 4, '2023-12-05', NULL, '202312044', NULL, 'h', 'hh', 'Cash', '2023-12-05 06:56:20', '2023-12-05 06:56:20', 0, 0, 0, 'FUT_141'),
(142, 11, 3, '2023-12-05', NULL, '0', NULL, 'y', 'y', 'Cash', '2023-12-05 07:03:36', '2023-12-05 07:03:36', 0, 0, 0, 'FUT_142'),
(143, 11, 3, '2023-12-05', NULL, '0', NULL, 't', 't', 'Cash', '2023-12-05 07:07:40', '2023-12-05 07:07:40', 0, 0, 0, 'FUT_143'),
(144, 11, 3, '2023-12-05', NULL, '0', NULL, 'tt', 'tt', 'Cash', '2023-12-05 07:08:46', '2023-12-05 07:08:46', 0, 0, 0, 'FUT_144'),
(145, 11, 3, '2023-12-05', NULL, '0', NULL, 'r', 'r', 'Cash', '2023-12-05 07:11:08', '2023-12-05 07:11:08', 0, 0, 0, 'FUT_145'),
(146, 11, 3, '2023-12-05', NULL, '20231205', NULL, 'r', 'rr', 'Cash', '2023-12-05 07:13:58', '2023-12-05 07:13:58', 0, 0, 0, 'FUT_146'),
(147, 11, 3, '2023-12-05', NULL, '20231205', NULL, 'qq', 'qq', 'Cash', '2023-12-05 07:16:27', '2023-12-05 07:16:27', 0, 0, 0, 'FUT_147'),
(149, 11, 2, '0000-00-00', NULL, '20231205', NULL, 'xx', 'xxxxxxx', 'Cas', '2023-12-05 09:04:40', '2023-12-05 09:04:40', 0, 0, 0, 'IMM_DEL_149'),
(150, 11, 3, '2023-12-05', NULL, '11', NULL, 'www', 'www', 'Cash', '2023-12-05 12:13:12', '2023-12-05 12:13:12', 0, 0, 0, 'FUT_150'),
(151, 11, 2, '2023-12-05', '0000-00-00', '112023', NULL, 'aaa', 'aaa', 'Cash', '2023-12-05 12:13:44', '2023-12-05 12:13:44', 0, 0, 0, 'IMM_DEL_151'),
(152, 11, 4, '2023-12-05', NULL, '11', NULL, 'gggg', 'gggg', 'Cash', '2023-12-05 12:17:10', '2023-12-05 12:17:10', 0, 0, 0, 'FUT_152'),
(153, 11, 3, '2023-12-05', NULL, '11', NULL, 'dd', 'dd', 'Cash', '2023-12-05 13:12:32', '2023-12-05 13:12:32', 0, 0, 0, 'FUT_153'),
(154, 11, 2, '2023-12-05', '2023-12-13', '11', NULL, 'zz', 'a', 'Cash', '2023-12-05 13:19:52', '2023-12-05 13:19:52', 0, 0, 0, 'IMM_DEL_154'),
(155, 11, 3, '2023-12-05', NULL, '11', NULL, 'a', 'aa', 'Cash', '2023-12-05 13:21:43', '2023-12-05 13:21:43', 0, 0, 0, 'FUT_155'),
(156, 11, 4, '2023-12-05', NULL, '11', NULL, 'rrr', 'rrr', 'Cash', '2023-12-05 13:48:30', '2023-12-05 13:48:30', 0, 0, 0, 'FUT_156'),
(157, 11, 2, '2023-12-05', NULL, '11', NULL, 'eeee', 'eee', 'Cash', '2023-12-05 13:49:56', '2023-12-05 13:49:56', 0, 0, 0, 'FUT_157'),
(158, 11, 3, '2023-12-05', NULL, '11', NULL, 'b', 'aaa', 'Cash', '2023-12-05 13:50:57', '2023-12-05 13:50:57', 0, 0, 0, 'FUT_158'),
(159, 11, 3, '2023-12-05', NULL, '11', NULL, 'aa', 'aaa', 'Cash', '2023-12-05 13:51:27', '2023-12-05 13:51:27', 0, 0, 0, 'FUT_159'),
(160, 11, 3, '2023-12-05', NULL, '11', NULL, 'lll', 'lll', 'Cash', '2023-12-05 13:52:16', '2023-12-05 13:52:16', 0, 0, 0, 'FUT_160'),
(161, 11, 2, '2023-12-05', '2023-12-13', '11', NULL, 'ee', 'ee', 'Cash', '2023-12-05 13:59:31', '2023-12-05 13:59:31', 0, 0, 0, 'IMM_DEL_161'),
(162, 11, 4, '2023-12-05', NULL, '11', NULL, 'jjj', 'kkk', 'Cash', '2023-12-05 14:03:43', '2023-12-05 14:03:43', 0, 0, 0, 'FUT_162'),
(163, 11, 3, '2023-12-05', NULL, '11', NULL, 'aa', 'aaa', 'Cash', '2023-12-05 14:20:37', '2023-12-05 14:20:37', 0, 0, 0, 'FUT_163'),
(164, 11, 4, '2023-12-05', NULL, '20231205', NULL, 'aa', 'aa', 'Cash', '2023-12-05 14:22:40', '2023-12-05 14:22:40', 0, 0, 0, 'FUT_164'),
(165, 11, 2, '2023-12-05', '2023-12-13', '20231205', NULL, 'aaaa', 'bb', 'Cash', '2023-12-05 14:32:43', '2023-12-05 14:32:43', 0, 0, 0, 'IMM_DEL_165'),
(166, 11, 3, '2023-12-05', NULL, '11', NULL, 'aa', 'aa', 'Cash', '2023-12-05 15:19:08', '2023-12-05 15:19:08', 0, 0, 0, 'FUT_166'),
(167, 11, 3, '2023-12-05', NULL, '11', NULL, 'aa', 'aa', 'Cash', '2023-12-05 15:34:12', '2023-12-05 15:34:12', 0, 0, 0, 'FUT_167'),
(168, 11, 3, '2023-12-05', NULL, '11_20231205', NULL, 'b', 'a', 'Cash', '2023-12-05 15:37:38', '2023-12-05 15:37:38', 0, 0, 0, 'FUT_168'),
(169, 7, 3, '2023-12-05', NULL, '7_20231205', NULL, 'a', 'a', 'Cash', '2023-12-05 15:39:09', '2023-12-05 15:39:09', 0, 0, 0, 'FUT_169'),
(170, 11, 2, '2023-12-06', '2023-12-13', '11_20231206', NULL, 'a', 'a', 'Cash', '2023-12-06 04:52:40', '2023-12-06 04:52:40', 0, 0, 0, 'IMM_DEL_170'),
(171, 11, 3, '2023-12-07', NULL, '11_20231207', NULL, 'aaaa', 'aaaaa', 'Cash', '2023-12-07 07:12:23', '2023-12-07 07:12:23', 990, 990, 990, 'FUT_171'),
(172, 11, 3, '2023-12-07', NULL, '11_20231207', NULL, 'jj', 'jj', 'Cash', '2023-12-07 07:27:30', '2023-12-07 07:27:30', 0, 0, 0, 'FUT_172');

-- --------------------------------------------------------

--
-- Table structure for table `order_summary`
--

CREATE TABLE `order_summary` (
  `order_detail_id` int(20) NOT NULL,
  `order_id` int(20) NOT NULL,
  `prod_id` int(20) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `status` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_summary`
--

INSERT INTO `order_summary` (`order_detail_id`, `order_id`, `prod_id`, `quantity`, `discount`, `status`, `created_at`, `updated_at`) VALUES
(20, 107, 3, 1, 0, '0', '2023-12-03 11:49:07', '2023-12-03 11:49:07'),
(21, 108, 3, 1, 0, '0', '2023-12-03 11:49:15', '2023-12-03 11:49:15'),
(22, 109, 2, 1, 0, '0', '2023-12-03 11:53:21', '2023-12-03 11:53:21'),
(23, 110, 2, 1, 0, '0', '2023-12-03 11:56:20', '2023-12-03 11:56:20'),
(24, 111, 2, 1, 0, '0', '2023-12-03 11:56:31', '2023-12-03 11:56:31'),
(25, 112, 2, 1, 0, '0', '2023-12-03 12:13:53', '2023-12-03 12:13:53'),
(26, 113, 3, 1, 0, '0', '2023-12-03 12:15:33', '2023-12-03 12:15:33'),
(27, 114, 4, 1, 0, '0', '2023-12-03 12:27:18', '2023-12-03 12:27:18'),
(28, 115, 3, 1, 0, '0', '2023-12-03 12:29:23', '2023-12-03 12:29:23'),
(30, 117, 4, 1, 0, '0', '2023-12-03 13:11:29', '2023-12-03 13:11:29'),
(31, 118, 3, 1, 0, '0', '2023-12-03 13:12:01', '2023-12-03 13:12:01'),
(32, 119, 4, 1, 0, '0', '2023-12-03 13:12:41', '2023-12-03 13:12:41'),
(33, 120, 4, 1, 0, '0', '2023-12-03 14:05:50', '2023-12-03 14:05:50'),
(35, 122, 4, 1, 0, '0', '2023-12-03 14:14:46', '2023-12-03 14:14:46'),
(36, 123, 3, 1, 0, '0', '2023-12-03 14:39:30', '2023-12-03 14:39:30'),
(37, 124, 4, 1, 0, '0', '2023-12-03 14:48:42', '2023-12-03 14:48:42'),
(38, 125, 4, 1, 0, '0', '2023-12-03 14:49:50', '2023-12-03 14:49:50'),
(39, 126, 3, 1, 0, '0', '2023-12-03 14:52:14', '2023-12-03 14:52:14'),
(40, 127, 4, 1, 0, '0', '2023-12-03 15:14:19', '2023-12-03 15:14:19'),
(41, 128, 3, 1, 0, '0', '2023-12-03 15:20:46', '2023-12-03 15:20:46'),
(42, 129, 4, 5, 0, 'paid', '2023-12-03 15:22:20', '2023-12-03 15:22:20'),
(44, 131, 2, 1, 0, 'delivered', '2023-12-04 12:03:59', '2023-12-04 12:03:59'),
(45, 132, 3, 1, 0, 'paid', '2023-12-04 12:16:38', '2023-12-04 12:16:38'),
(46, 133, 3, 1, 0, '0', '2023-12-04 14:55:34', '2023-12-04 14:55:34'),
(47, 134, 4, 1, 0, 'paid', '2023-12-04 15:05:40', '2023-12-04 15:05:40'),
(48, 135, 2, 1, 0, 'paid', '2023-12-04 15:32:15', '2023-12-04 15:32:15'),
(49, 136, 2, 1, 0, 'paid', '2023-12-04 15:34:44', '2023-12-04 15:34:44'),
(50, 137, 2, 1, 0, 'delivered', '2023-12-04 15:39:40', '2023-12-04 15:39:40'),
(51, 138, 3, 1, 0, '0', '2023-12-04 15:46:50', '2023-12-04 15:46:50'),
(52, 139, 2, 1, 0, 'delivered', '2023-12-04 15:58:26', '2023-12-04 15:58:26'),
(53, 140, 2, 1, 0, 'delivered', '2023-12-04 16:06:09', '2023-12-04 16:06:09'),
(54, 141, 4, 1, 0, '0', '2023-12-05 06:56:20', '2023-12-05 06:56:20'),
(55, 142, 3, 1, 0, '0', '2023-12-05 07:03:36', '2023-12-05 07:03:36'),
(56, 143, 3, 1, 0, '0', '2023-12-05 07:07:40', '2023-12-05 07:07:40'),
(57, 144, 3, 1, 0, '0', '2023-12-05 07:08:46', '2023-12-05 07:08:46'),
(58, 145, 3, 1, 0, '0', '2023-12-05 07:11:08', '2023-12-05 07:11:08'),
(59, 146, 3, 1, 0, '0', '2023-12-05 07:13:58', '2023-12-05 07:13:58'),
(60, 147, 3, 1, 0, '0', '2023-12-05 07:16:27', '2023-12-05 07:16:27'),
(62, 149, 2, 0, 0, 'delivered', '2023-12-05 09:04:40', '2023-12-05 09:04:40'),
(63, 150, 3, 1, 0, '0', '2023-12-05 12:13:12', '2023-12-05 12:13:12'),
(64, 151, 2, 1, 0, 'delivered', '2023-12-05 12:13:44', '2023-12-05 12:13:44'),
(65, 152, 4, 1, 0, '0', '2023-12-05 12:17:10', '2023-12-05 12:17:10'),
(66, 153, 3, 1, 0, '0', '2023-12-05 13:12:32', '2023-12-05 13:12:32'),
(67, 154, 2, 1, 0, 'delivered', '2023-12-05 13:19:52', '2023-12-05 13:19:52'),
(68, 155, 3, 1, 0, '0', '2023-12-05 13:21:44', '2023-12-05 13:21:44'),
(69, 158, 3, 1, 0, '0', '2023-12-05 13:50:57', '2023-12-05 13:50:57'),
(70, 159, 3, 1, 0, '0', '2023-12-05 13:51:27', '2023-12-05 13:51:27'),
(71, 160, 3, 1, 0, '0', '2023-12-05 13:52:16', '2023-12-05 13:52:16'),
(72, 161, 2, 1, 0, 'delivered', '2023-12-05 13:59:31', '2023-12-05 13:59:31'),
(73, 162, 4, 1, 0, '0', '2023-12-05 14:03:44', '2023-12-05 14:03:44'),
(74, 163, 3, 1, 0, '0', '2023-12-05 14:20:37', '2023-12-05 14:20:37'),
(75, 164, 4, 1, 0, '0', '2023-12-05 14:22:40', '2023-12-05 14:22:40'),
(76, 165, 2, 1, 0, 'delivered', '2023-12-05 14:32:43', '2023-12-05 14:32:43'),
(77, 166, 3, 1, 0, '0', '2023-12-05 15:19:08', '2023-12-05 15:19:08'),
(78, 167, 3, 1, 0, '0', '2023-12-05 15:34:12', '2023-12-05 15:34:12'),
(79, 168, 3, 1, 0, '0', '2023-12-05 15:37:38', '2023-12-05 15:37:38'),
(80, 169, 3, 1, 0, '0', '2023-12-05 15:39:09', '2023-12-05 15:39:09'),
(81, 170, 2, 1, 0, 'delivered', '2023-12-06 04:52:40', '2023-12-06 04:52:40'),
(82, 171, 3, 1, 0, '0', '2023-12-07 07:12:23', '2023-12-07 07:12:23'),
(83, 172, 3, 1, 0, '0', '2023-12-07 07:27:30', '2023-12-07 07:27:30');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `prod_id` int(20) NOT NULL,
  `prod_name` varchar(50) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`prod_id`, `prod_name`, `rate`, `created_at`, `updated_at`) VALUES
(1, 'Coconut Oil(250ml)', 100, '2023-11-11 07:16:46', '2023-11-11 07:16:46'),
(2, 'besan', 300, '2023-11-11 07:16:46', '2023-11-11 07:16:46'),
(3, 'AbisOil(5kg)', 500, '2023-11-11 07:19:02', '2023-11-11 07:19:02'),
(4, 'King Oil(2kg)', 250, '2023-11-11 07:19:02', '2023-11-11 07:19:02');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `role_id` int(20) NOT NULL,
  `role_name` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`role_id`, `role_name`) VALUES
(1, 'employee'),
(2, 'manager'),
(3, 'reseller'),
(4, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `number` varchar(10) NOT NULL,
  `password` varchar(10) NOT NULL,
  `department` varchar(20) NOT NULL,
  `role_id` int(20) NOT NULL,
  `email` varchar(20) NOT NULL,
  `verification_token` varchar(50) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `name`, `number`, `password`, `department`, `role_id`, `email`, `verification_token`, `verified`, `created_at`, `updated_at`) VALUES
(1, 'admin', '7224853471', '123456', 'marketing', 4, 'ashi133@gmail.com', '', 1, '2023-11-11 10:14:11', NULL),
(3, 'rahul sahu', '1111143434', '123456', 'production', 3, 'ashi133@gmail.com', 'e1278418-077d-41d7-91a9-8bd0d650153d', 1, '2023-12-05 10:11:46', NULL),
(4, 'anmol', '9870987890', '111111', 'production', 2, 'ashi133@gmail.com', 'dc05f1de-36f6-4aed-aaec-2e089cc1b20d', 1, '2023-11-11 10:14:30', NULL),
(5, 'ansu', '7676767676', '11111', 'production', 2, 'ashi133@gmail.com', '5cf07e19-79d9-4de2-8386-4facb755c09d', 1, '2023-11-11 10:14:33', NULL),
(58, 'aaaaaaa', '1434343444', '11111', 'production', 2, 'ashi133@gmail.com', 'e23e21ed-f923-4277-b327-52aab8521797', 1, '2023-11-30 04:02:26', NULL),
(69, 'yadu', '7767676767', '11111', 'production', 2, 'ashi133@gmail.com', '5f840b7c-8f94-41b0-b027-7e50c4f6a5c2', 1, '2023-11-14 13:31:11', NULL),
(76, 'ffff', '7777778888', '11111', 'production', 2, 'ashi133@gmail.com', '8f9e5424-42ea-435c-b0f9-4442bbb45b2e', 1, '2023-12-04 08:22:54', NULL),
(83, 'Maddy', '8878799999', '1234566', 'production', 2, 'ashi133@gmail.com', 'ac4fb1b5-8fff-40d1-bfe0-27dfc841712c', 1, '2023-12-05 11:40:59', NULL),
(84, 'yahu', '9888888888', '111111', 'production', 3, 'ashi133@gmail.com', '101720e3-6cca-4695-8373-8e40d72683fa', 0, '2023-12-08 05:59:47', '2023-12-08 05:59:47'),
(85, 'vipul', '1233333333', '111111', 'production', 3, 'ashi133@gmail.com', '2dd29721-1767-46a6-b943-f05182ed2133', 0, '2023-12-08 14:34:23', '2023-12-08 14:34:23'),
(86, 'isha', '3333344444', '111111', 'production', 2, 'ashi133@gmail.com', '5cb2e19c-4455-417d-8b1d-d049af985138', 1, '2023-12-08 17:19:42', '2023-12-08 17:18:55');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`),
  ADD UNIQUE KEY `number` (`number`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_id`,`formatted_order_id`),
  ADD KEY `order_detail_ibfk_1` (`prod_id`),
  ADD KEY `cust_id` (`cust_id`) USING BTREE;

--
-- Indexes for table `order_summary`
--
ALTER TABLE `order_summary`
  ADD PRIMARY KEY (`order_detail_id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `order_summary_ibfk_1` (`prod_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`prod_id`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `number` (`number`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cust_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=173;

--
-- AUTO_INCREMENT for table `order_summary`
--
ALTER TABLE `order_summary`
  MODIFY `order_detail_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `prod_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `order_summary`
--
ALTER TABLE `order_summary`
  ADD CONSTRAINT `order_summary_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product` (`prod_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `role` (`role_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
