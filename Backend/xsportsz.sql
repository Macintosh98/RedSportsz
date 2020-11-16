-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 24, 2020 at 08:09 AM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `xsportsz`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact_details`
--

CREATE TABLE `contact_details` (
  `id` int(10) NOT NULL,
  `name` varchar(200) NOT NULL,
  `email` text NOT NULL,
  `message` text NOT NULL,
  `added_on` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `specialization_master`
--

CREATE TABLE `specialization_master` (
  `id` int(10) NOT NULL,
  `sport_id` int(10) NOT NULL,
  `name` varchar(500) NOT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `specialization_master`
--

INSERT INTO `specialization_master` (`id`, `sport_id`, `name`, `is_active`) VALUES
(1, 1, 'Batsman', 1),
(2, 1, 'Bowler', 1),
(3, 1, 'Wicket Keeper', 1),
(4, 2, 'Goal Keeper - Football', 1),
(5, 2, 'Defender - Football', 1),
(6, 2, 'Striker - Football', 1),
(7, 2, 'Mid Fielder - Football', 1),
(8, 4, 'Goal Keeper - Hockey', 1);

-- --------------------------------------------------------

--
-- Table structure for table `sports_master`
--

CREATE TABLE `sports_master` (
  `id` int(10) NOT NULL,
  `name` varchar(500) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `sports_master`
--

INSERT INTO `sports_master` (`id`, `name`, `is_active`) VALUES
(1, 'Cricket', 1),
(2, 'Football', 1),
(3, 'Tennis', 1),
(4, 'Hockey', 1);

-- --------------------------------------------------------

--
-- Table structure for table `state_master`
--

CREATE TABLE `state_master` (
  `id` int(10) NOT NULL,
  `state` varchar(150) NOT NULL,
  `is_active` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `transaction_details`
--

CREATE TABLE `transaction_details` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `transaction_id` varchar(500) NOT NULL,
  `bank_txn_id` varchar(500) NOT NULL,
  `order_id` varchar(500) NOT NULL,
  `amount` varchar(100) NOT NULL,
  `status` varchar(100) NOT NULL,
  `txn_type` varchar(100) DEFAULT NULL,
  `gateway_name` varchar(100) NOT NULL,
  `response_code` varchar(100) NOT NULL,
  `response_msg` text NOT NULL,
  `bank_name` varchar(500) NOT NULL,
  `mid` text NOT NULL,
  `payment_mode` varchar(500) NOT NULL,
  `refund_amount` varchar(500) DEFAULT NULL,
  `transaction_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_details`
--

CREATE TABLE `user_details` (
  `id` int(10) NOT NULL,
  `profile` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  `mobile` varchar(20) NOT NULL,
  `alternate_mobile` varchar(20) NOT NULL,
  `first_name` varchar(50) NOT NULL,
  `middle_name` varchar(50) NOT NULL,
  `last_name` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `city` text NOT NULL,
  `state` int(11) NOT NULL,
  `zip_code` varchar(100) NOT NULL,
  `date_of_birth` int(10) NOT NULL,
  `month_of_birth` int(10) NOT NULL,
  `year_of_birth` int(10) NOT NULL,
  `role` varchar(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_blocked` tinyint(1) NOT NULL DEFAULT 0,
  `last_login` datetime NOT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_details`
--

INSERT INTO `user_details` (`id`, `profile`, `email`, `password`, `mobile`, `alternate_mobile`, `first_name`, `middle_name`, `last_name`, `address`, `city`, `state`, `zip_code`, `date_of_birth`, `month_of_birth`, `year_of_birth`, `role`, `is_active`, `is_blocked`, `last_login`, `created_at`, `modified_at`) VALUES
(2, 'c6ed106b-e39a-4597-b37b-73aa5b24b8f6', 'a@gmail.com', 'a', '8', '8', '8', '8', '8', '8', '8', 1, '8', 2, 9, 2020, 'super_user', 1, 0, '2020-10-15 14:15:36', '2020-08-15 14:15:36', '2020-10-15 14:15:36');

-- --------------------------------------------------------

--
-- Table structure for table `user_sport_mapping`
--

CREATE TABLE `user_sport_mapping` (
  `id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `sport_id` int(10) NOT NULL,
  `years_age` int(10) NOT NULL,
  `months_age` int(10) NOT NULL,
  `specialization_id` int(10) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact_details`
--
ALTER TABLE `contact_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `specialization_master`
--
ALTER TABLE `specialization_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sports_master`
--
ALTER TABLE `sports_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `state_master`
--
ALTER TABLE `state_master`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaction_details`
--
ALTER TABLE `transaction_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_details`
--
ALTER TABLE `user_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_sport_mapping`
--
ALTER TABLE `user_sport_mapping`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact_details`
--
ALTER TABLE `contact_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `specialization_master`
--
ALTER TABLE `specialization_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `sports_master`
--
ALTER TABLE `sports_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `state_master`
--
ALTER TABLE `state_master`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transaction_details`
--
ALTER TABLE `transaction_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user_details`
--
ALTER TABLE `user_details`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_sport_mapping`
--
ALTER TABLE `user_sport_mapping`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
