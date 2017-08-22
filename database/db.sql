-- phpMyAdmin SQL Dump
-- version 4.7.1
-- https://www.phpmyadmin.net/
--
-- Host: sql12.freemysqlhosting.net
-- Generation Time: Aug 22, 2017 at 04:25 PM
-- Server version: 5.5.54-0ubuntu0.14.04.1
-- PHP Version: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sql12191143`
--

-- --------------------------------------------------------

--
-- Table structure for table `activity`
--

CREATE TABLE `activity` (
  `ip` varchar(300) NOT NULL,
  `siteid` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `created` int(30) NOT NULL,
  `host` varchar(500) NOT NULL,
  `city` varchar(500) NOT NULL,
  `state` varchar(500) NOT NULL,
  `country` varchar(500) NOT NULL,
  `location` varchar(300) NOT NULL,
  `org` varchar(500) NOT NULL,
  `pin` varchar(300) NOT NULL,
  `url` varchar(500) NOT NULL,
  `hit` text NOT NULL,
  `id` int(150) NOT NULL,
  `status` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `activity`
--

INSERT INTO `activity` (`ip`, `siteid`, `date`, `created`, `host`, `city`, `state`, `country`, `location`, `org`, `pin`, `url`, `hit`, `id`, `status`) VALUES
('103.83.28.84', 26, '2017-08-22 15:44:42', 1503416682, '', 'Mumbai', 'Maharashtra', 'IN', '18.9750,72.8258', 'AS135781 Ashish And Ashwin Internet Service', '0', 'https://demoseotools.herokuapp.com/test/index.html', '{\"type\":\"view\"}', 22852, 'view'),
('103.83.28.84', 26, '2017-08-22 15:45:06', 1503416706, '', 'Mumbai', 'Maharashtra', 'IN', '18.9750,72.8258', 'AS135781 Ashish And Ashwin Internet Service', '0', 'https://demoseotools.herokuapp.com/test/index.html', '{\"type\":\"click\",\"width\":441,\"height\":15}', 22853, 'click'),
('103.83.28.84', 26, '2017-08-22 15:46:44', 1503416804, '', 'Mumbai', 'Maharashtra', 'IN', '18.9750,72.8258', 'AS135781 Ashish And Ashwin Internet Service', '0', 'https://demoseotools.herokuapp.com/test/index.html', '{\"type\":\"view\"}', 22854, 'view'),
('103.83.28.84', 26, '2017-08-22 16:21:51', 1503418911, '', 'Mumbai', 'Maharashtra', 'IN', '18.9750,72.8258', 'AS135781 Ashish And Ashwin Internet Service', '0', 'https://demoseotools.herokuapp.com/test/index.html', '{\"type\":\"view\"}', 22855, 'view');

-- --------------------------------------------------------

--
-- Table structure for table `url_details`
--

CREATE TABLE `url_details` (
  `id` int(11) NOT NULL,
  `url` varchar(300) NOT NULL,
  `keywords` varchar(300) NOT NULL,
  `description` text NOT NULL,
  `views` int(11) NOT NULL,
  `click` int(11) NOT NULL,
  `siteid` int(11) NOT NULL,
  `ip` varchar(300) NOT NULL,
  `date` datetime NOT NULL,
  `title` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `url_details`
--

INSERT INTO `url_details` (`id`, `url`, `keywords`, `description`, `views`, `click`, `siteid`, `ip`, `date`, `title`) VALUES
(189, 'https://demoseotools.herokuapp.com/test/index.html', '[\"This demo page\"]', '[\"This is seo tool demo\"]', 2, 1, 26, '', '2017-08-22 15:44:45', 'Demo Page');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `first_name` varchar(300) NOT NULL,
  `last_name` varchar(300) NOT NULL,
  `email` varchar(300) NOT NULL,
  `password` varchar(300) NOT NULL,
  `logo` text NOT NULL,
  `locks` tinyint(1) NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`first_name`, `last_name`, `email`, `password`, `logo`, `locks`, `id`) VALUES
('Dev', 'verma', 'devrajdhaja82@gmail.com', 'dev', 'icon.png', 0, 2);

-- --------------------------------------------------------

--
-- Table structure for table `website`
--

CREATE TABLE `website` (
  `url` varchar(300) NOT NULL,
  `ip` varchar(300) NOT NULL,
  `date_and_time` datetime NOT NULL,
  `_key` int(11) NOT NULL,
  `pages` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `created` int(30) NOT NULL,
  `online` tinyint(1) NOT NULL,
  `views` int(11) NOT NULL,
  `click` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `website`
--

INSERT INTO `website` (`url`, `ip`, `date_and_time`, `_key`, `pages`, `id`, `status`, `created`, `online`, `views`, `click`) VALUES
('https://demoseotools.herokuapp.com/test/index.html', '172.17.252.126', '2017-08-22 15:42:58', 0, 0, 26, 1, 1503416578, 1, 3, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `activity`
--
ALTER TABLE `activity`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `url_details`
--
ALTER TABLE `url_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `website`
--
ALTER TABLE `website`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `activity`
--
ALTER TABLE `activity`
  MODIFY `id` int(150) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22856;
--
-- AUTO_INCREMENT for table `url_details`
--
ALTER TABLE `url_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=190;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `website`
--
ALTER TABLE `website`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
