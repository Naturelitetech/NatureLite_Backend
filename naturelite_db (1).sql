-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 17, 2023 at 02:18 PM
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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cust_id`, `name`, `number`, `address`, `created_at`, `updated_at`) VALUES
(2, 'ashi', '1236598745', 'tld', NULL, NULL),
(3, 'ashi', '2147483647', 'tld', NULL, NULL),
(4, 'ashi', '2147483647', 'tld', NULL, NULL),
(5, 'ashi', '2147483647', 'tld', NULL, NULL),
(6, 'ashi', '3216549777', 'tld', NULL, NULL),
(7, 'aayushi', '55555555', 'bhilai', NULL, NULL),
(8, 'meena', '8888888', 'bsp', NULL, NULL),
(9, 'meena', '789789789', 'bsp', NULL, NULL),
(10, 'annu', '9879876787', 'up', NULL, NULL),
(11, 'manish', '9767812347', 'up', NULL, NULL),
(12, 'soniya', '7887878787', 'up', NULL, NULL),
(13, 'soniya', '7887878787', 'up', NULL, NULL),
(14, 'soniya', '7887878787', 'up', NULL, NULL),
(15, 'soniya', '7887878787', 'up', NULL, NULL),
(16, 'soniya', '7887878787', 'up', NULL, NULL),
(17, 'soniya', '7887878787', 'up', NULL, NULL),
(18, 'soniya', '7887878787', 'up', NULL, NULL),
(19, 'soniya', '7887878787', 'up', NULL, NULL),
(20, 'soniya', '7887878787', 'up', NULL, NULL),
(21, 'soniya', '7887878787', 'up', NULL, NULL),
(22, 'soni', '9898767898', 'up', NULL, NULL),
(23, 'soniya', '7887878787', 'up', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order_detail`
--

CREATE TABLE `order_detail` (
  `order_id` int(20) NOT NULL,
  `cust_id` int(20) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `date` int(11) NOT NULL,
  `invoice` int(11) NOT NULL,
  `shipping_charge` int(11) NOT NULL,
  `location` varchar(20) NOT NULL,
  `delivery_preference` varchar(30) DEFAULT NULL,
  `payment_mode` varchar(30) NOT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL,
  `amount` int(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `grand_total` int(11) NOT NULL,
  `formatted_order_id` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_detail`
--

INSERT INTO `order_detail` (`order_id`, `cust_id`, `prod_id`, `date`, `invoice`, `shipping_charge`, `location`, `delivery_preference`, `payment_mode`, `created_at`, `updated_at`, `amount`, `total_amount`, `grand_total`, `formatted_order_id`) VALUES
(1, 1, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', '2023-11-11 07:16:46', '2023-11-11 07:16:46', 150, 150, 150, ''),
(15, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(24, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(25, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(26, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_4'),
(27, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(28, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(29, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(30, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, ''),
(31, 11, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_2'),
(33, 12, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_3'),
(47, 13, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_1'),
(48, 14, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_22'),
(49, 15, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_15'),
(51, 17, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'IMM_51'),
(52, 18, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'Imm_52'),
(54, 20, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_54'),
(55, 21, 1, 7, 1, 0, 'bhilai', 'assa', 'upi', NULL, NULL, 150, 150, 150, 'FUT_55'),
(56, 22, 1, 7, 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'IMM_56'),
(57, 22, 1, 7, 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'FUT_57'),
(59, 23, 1, 7, 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'FUT_59'),
(60, 22, 1, 7, 1, 0, 'bhilai', NULL, 'upi', NULL, NULL, 150, 150, 150, 'IMM_60');

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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `paid` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_summary`
--

INSERT INTO `order_summary` (`order_detail_id`, `order_id`, `prod_id`, `quantity`, `discount`, `created_at`, `updated_at`, `paid`) VALUES
(1, 1, 1, 1, 0, '2023-11-11 07:16:46', NULL, 0),
(3, 59, 1, 1, 0, NULL, NULL, 0),
(4, 60, 1, 1, 0, NULL, NULL, 0),
(5, 56, 1, 1, 0, NULL, NULL, 0),
(6, 51, 1, 1, 0, NULL, NULL, 0),
(7, 52, 1, 1, 0, NULL, NULL, 0),
(8, 26, 1, 1, 0, '2023-11-17 07:55:56', '2023-11-17 07:55:56', 0),
(9, 31, 1, 1, 0, '2023-11-17 07:55:56', '2023-11-17 07:55:56', 1);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `prod_id` int(20) NOT NULL,
  `prod_name` varchar(50) NOT NULL,
  `rate` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
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
  `updated_at` timestamp NULL DEFAULT NULL
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
(58, 'aaaaaaa', '1434343444', '11111', 'production', 2, 'ashi133@gmail.com', 'e23e21ed-f923-4277-b327-52aab8521797', 0, '2023-11-11 11:14:16', NULL),
(64, 'aaaaaaaa', '2222222222', '11111', 'production', 2, 'ashi133@gmail.com', 'af70e421-6511-40e7-b7dc-b15417d2b0dd', 0, '2023-11-11 11:15:58', NULL),
(69, 'yadu', '7767676767', '11111', 'production', 2, 'ashi133@gmail.com', '5f840b7c-8f94-41b0-b027-7e50c4f6a5c2', 1, '2023-11-14 13:31:11', NULL),
(76, '555555', '7777778888', '11111', 'production', 2, 'ashi133@gmail.com', '8f9e5424-42ea-435c-b0f9-4442bbb45b2e', 1, '2023-11-16 14:16:52', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cust_id`);

--
-- Indexes for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `cust_id` (`cust_id`),
  ADD KEY `order_detail_ibfk_1` (`prod_id`);

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
  MODIFY `cust_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `order_detail`
--
ALTER TABLE `order_detail`
  MODIFY `order_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=61;

--
-- AUTO_INCREMENT for table `order_summary`
--
ALTER TABLE `order_summary`
  MODIFY `order_detail_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

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
  MODIFY `user_id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=83;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_detail`
--
ALTER TABLE `order_detail`
  ADD CONSTRAINT `order_detail_ibfk_1` FOREIGN KEY (`prod_id`) REFERENCES `product` (`prod_id`) ON DELETE CASCADE;

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
