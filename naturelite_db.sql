-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 01, 2023 at 03:10 PM
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
(2, 'ashi', '1236598745', 'tld', NULL, NULL),
(3, 'ashi', '2147483647', 'tld', NULL, NULL),
(7, 'aayushi', '5555555555', 'bhilai', NULL, NULL),
(8, 'meena', '8888888888', 'bsp', NULL, NULL),
(9, 'hemant', '7897897672', 'bsp', NULL, NULL),
(10, 'annu', '9879876787', 'up', NULL, NULL),
(11, 'manish', '7224853471', 'up', NULL, NULL),
(14, 'soniya', '7224853487', 'up', NULL, NULL),
(22, 'soni', '9898767898', 'up', NULL, NULL),
(24, 'manish', '7222555555', 'uuuuuuu', '2023-12-01 07:24:27', '2023-12-01 07:24:27'),
(25, 'vvv', '5454544444', '444', '2023-12-01 07:57:32', '2023-12-01 07:57:32'),
(26, 'aaaaaa', '5434533333', 'up', '2023-12-01 09:02:41', '2023-12-01 09:02:41');

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int(20) NOT NULL,
  `cust_id` int(20) NOT NULL,
  `prod_id` int(20) NOT NULL,
  `date` date NOT NULL,
  `invoice` int(11) NOT NULL,
  `shipping_charge` int(11) DEFAULT NULL,
  `location` varchar(20) NOT NULL,
  `delivery_preference` varchar(30) DEFAULT NULL,
  `payment_mode` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp(),
  `amount` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `grand_total` int(11) NOT NULL,
  `formatted_order_id` varchar(20) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_id`, `cust_id`, `prod_id`, `date`, `invoice`, `shipping_charge`, `location`, `delivery_preference`, `payment_mode`, `created_at`, `updated_at`, `amount`, `total_amount`, `grand_total`, `formatted_order_id`, `status`) VALUES
(1, 1, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', '2023-11-11 07:16:46', '2023-11-11 07:16:46', 150, 150, 150, '', ''),
(31, 11, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_2', ''),
(33, 12, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_3', ''),
(47, 13, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_1', ''),
(48, 14, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_22', ''),
(49, 15, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_15', ''),
(51, 17, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'IMM_51', ''),
(52, 18, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'Imm_52', ''),
(54, 20, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_54', ''),
(55, 21, 1, '0000-00-00', 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_55', ''),
(56, 22, 1, '0000-00-00', 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'IMM_56', ''),
(59, 23, 1, '0000-00-00', 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'FUT_59', ''),
(77, 11, 3, '2023-12-01', 2023, NULL, 'mmmmm', 'mmmm', 'Cash', '2023-12-01 08:56:58', '2023-12-01 08:56:58', 0, 0, 0, 'FUT_77', ''),
(78, 11, 3, '2023-12-01', 2023, NULL, 'mmmmm', 'mmmm', 'Cash', '2023-12-01 08:57:32', '2023-12-01 08:57:32', 0, 0, 0, 'FUT_78', ''),
(80, 26, 2, '2023-12-01', 11220231, NULL, 'aaaa', NULL, 'Cash', '2023-12-01 09:02:41', '2023-12-01 09:02:41', 0, 0, 0, 'IMM_80', ''),
(81, 26, 2, '2023-12-01', 2023, NULL, 'aaaa', 'aaaaaa', 'Cash', '2023-12-01 09:03:43', '2023-12-01 09:03:43', 0, 0, 0, 'FUT_81', ''),
(82, 26, 2, '2023-12-01', 2023, NULL, 'aaaa', 'aaaaaa', 'Cash', '2023-12-01 09:03:45', '2023-12-01 09:03:45', 0, 0, 0, 'FUT_82', ''),
(83, 3, 2, '2023-12-01', 2023, NULL, 'bhilai', 'qqqqqqqq', 'Cash', '2023-12-01 09:04:39', '2023-12-01 09:04:39', 0, 0, 0, 'FUT_83', ''),
(84, 24, 2, '2023-12-01', 2023, NULL, 'mmmmm', 'vvvvv', 'Cash', '2023-12-01 09:18:00', '2023-12-01 09:18:00', 0, 0, 0, 'FUT_84', ''),
(85, 11, 2, '2023-12-01', 2023, NULL, 'a', NULL, 'Cash', '2023-12-01 09:21:06', '2023-12-01 09:21:06', 0, 0, 0, 'FUT_85', ''),
(86, 11, 2, '2023-12-01', 2023, NULL, 'bhilai', NULL, 'Cash', '2023-12-01 09:25:41', '2023-12-01 09:25:41', 0, 0, 0, 'FUT_86', ''),
(87, 11, 2, '2023-12-01', 2023, NULL, 'aaaaa', NULL, 'Cash', '2023-12-01 09:30:27', '2023-12-01 09:30:27', 0, 0, 0, 'FUT_87', ''),
(88, 11, 3, '2023-12-01', 2023, NULL, 'yyyyyy', 'aaaa', 'Cash', '2023-12-01 09:31:04', '2023-12-01 09:31:04', 0, 0, 0, 'FUT_88', ''),
(89, 11, 1, '2023-12-01', 2023, NULL, 'aa', NULL, 'Cash', '2023-12-01 09:41:39', '2023-12-01 09:41:39', 0, 0, 0, 'FUT_89', ''),
(90, 11, 2, '2023-12-01', 2023, NULL, 'mmmmm', NULL, 'Cash', '2023-12-01 09:43:33', '2023-12-01 09:43:33', 0, 0, 0, 'FUT_90', ''),
(91, 11, 2, '2023-12-01', 1, NULL, 'bhilai', NULL, 'Cash', '2023-12-01 09:48:56', '2023-12-01 09:48:56', 0, 0, 0, 'IMM_91', ''),
(92, 11, 2, '2023-12-01', 1, NULL, 'aa', NULL, 'Cash', '2023-12-01 09:50:54', '2023-12-01 09:50:54', 0, 0, 0, 'IMM_92', ''),
(93, 11, 2, '2023-12-01', 2023, NULL, 'aaaaa', 'aa', 'Cash', '2023-12-01 09:51:56', '2023-12-01 09:51:56', 0, 0, 0, 'FUT_93', ''),
(94, 11, 2, '2023-12-01', 2023, NULL, 'aa', 'aa', 'Cash', '2023-12-01 10:05:28', '2023-12-01 10:05:28', 0, 0, 0, 'FUT_94', ''),
(95, 11, 2, '2023-12-01', 2023, NULL, 'aaaaa', 'mmmm', 'Cash', '2023-12-01 10:06:27', '2023-12-01 10:06:27', 0, 0, 0, 'FUT_95', ''),
(96, 11, 2, '2023-12-01', 2023, NULL, 'a', 'qqqqqqqq', 'Cash', '2023-12-01 10:14:00', '2023-12-01 10:14:00', 0, 0, 0, 'FUT_96', ''),
(97, 11, 2, '2023-12-01', 1, NULL, 'mmmmm', NULL, 'Cash', '2023-12-01 10:16:37', '2023-12-01 10:16:37', 0, 0, 0, 'IMM_97', ''),
(98, 11, 2, '2023-12-01', 1, NULL, 'bhilai', NULL, 'Cash', '2023-12-01 10:18:19', '2023-12-01 10:18:19', 0, 0, 0, 'IMM_98', '');

-- --------------------------------------------------------

--
-- Table structure for table `order_summary`
--

CREATE TABLE `order_summary` (
  `order_detail_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `discount` int(11) NOT NULL,
  `status` varchar(20) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_summary`
--

INSERT INTO `order_summary` (`order_detail_id`, `order_id`, `prod_id`, `quantity`, `discount`, `status`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 0, NULL, '2023-11-11 07:16:46', NULL),
(3, 59, 1, 1, 0, NULL, NULL, NULL),
(4, 60, 1, 1, 0, NULL, NULL, NULL),
(5, 56, 1, 1, 0, NULL, NULL, NULL),
(6, 51, 1, 1, 0, NULL, NULL, NULL),
(7, 52, 1, 1, 0, NULL, NULL, NULL),
(8, 26, 1, 1, 0, NULL, '2023-11-17 07:55:56', '2023-11-17 07:55:56'),
(9, 31, 1, 1, 0, NULL, '2023-11-17 07:55:56', '2023-11-17 07:55:56'),
(10, 96, 2, 1, 0, NULL, '2023-12-01 10:14:00', '2023-12-01 10:14:00'),
(11, 98, 2, 1, 0, NULL, '2023-12-01 10:18:19', '2023-12-01 10:18:19');

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
(2, 'Soyabean Oil(1kg)', 150, '2023-11-11 07:16:46', '2023-11-11 07:16:46'),
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
(2, 'dolly', '1234567890', '123456', 'production', 2, 'ashi133@gmail.com', 'c50badb1-2730-44fa-989d-55e4d70d8d0f', 1, '2023-11-11 10:13:26', NULL),
(3, 'rahul', '1111143434', '123456', 'production', 3, 'ashi133@gmail.com', 'e1278418-077d-41d7-91a9-8bd0d650153d', 1, '2023-11-11 10:14:27', NULL),
(4, 'anmol', '9870987890', '111111', 'production', 2, 'ashi133@gmail.com', 'dc05f1de-36f6-4aed-aaec-2e089cc1b20d', 1, '2023-11-11 10:14:30', NULL),
(5, 'ansu', '7676767676', '11111', 'production', 2, 'ashi133@gmail.com', '5cf07e19-79d9-4de2-8386-4facb755c09d', 1, '2023-11-11 10:14:33', NULL),
(58, 'aaaaaaa', '1434343444', '11111', 'production', 2, 'ashi133@gmail.com', 'e23e21ed-f923-4277-b327-52aab8521797', 1, '2023-11-30 04:02:26', NULL),
(64, 'aaaaaaaa', '2222222222', '11111', 'production', 2, 'ashi133@gmail.com', 'af70e421-6511-40e7-b7dc-b15417d2b0dd', 1, '2023-11-29 16:05:17', NULL),
(69, 'yadu', '7767676767', '11111', 'production', 2, 'ashi133@gmail.com', '5f840b7c-8f94-41b0-b027-7e50c4f6a5c2', 1, '2023-11-14 13:31:11', NULL),
(76, '555555', '7777778888', '11111', 'production', 2, 'ashi133@gmail.com', '8f9e5424-42ea-435c-b0f9-4442bbb45b2e', 1, '2023-11-16 14:16:52', NULL),
(83, 'Maddy', '8878799999', '123456', 'production', 2, 'ashi133@gmail.com', 'ac4fb1b5-8fff-40d1-bfe0-27dfc841712c', 1, '2023-12-01 05:37:46', NULL);

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
  ADD PRIMARY KEY (`order_id`),
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
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;

--
-- AUTO_INCREMENT for table `order_summary`
--
ALTER TABLE `order_summary`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `prod_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `role_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

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
