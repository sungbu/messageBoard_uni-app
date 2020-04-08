-- phpMyAdmin SQL Dump
-- version 4.4.15.10
-- https://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 2020-04-08 23:48:30
-- 服务器版本： 5.7.19-log
-- PHP Version: 5.4.45

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `messageBoard`
--

-- --------------------------------------------------------

--
-- 表的结构 `replay`
--

CREATE TABLE IF NOT EXISTS `replay` (
  `id` int(11) NOT NULL,
  `tabId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `messId` int(11) NOT NULL,
  `myName` varchar(255) DEFAULT NULL,
  `messName` varchar(255) DEFAULT NULL,
  `isPick` int(11) NOT NULL DEFAULT '0',
  `message` text,
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `utime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=190 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `replay`
--

INSERT INTO `replay` (`id`, `tabId`, `userId`, `messId`, `myName`, `messName`, `isPick`, `message`, `ctime`, `utime`) VALUES
(182, 53, 5, 5, NULL, NULL, 0, '我是ddd', '2020-04-03 12:36:38', '2020-04-03 12:36:38'),
(184, 53, 5, 5, NULL, NULL, 1, NULL, '2020-04-03 12:36:53', '2020-04-03 12:36:53'),
(185, 55, 6, 6, NULL, NULL, 0, '我是李建成', '2020-04-03 12:38:44', '2020-04-03 12:38:44'),
(187, 53, 5, 6, NULL, NULL, 0, '我是李建成', '2020-04-03 12:38:56', '2020-04-03 12:38:56'),
(188, 53, 5, 1, NULL, NULL, 0, '我是搞笑', '2020-04-03 12:39:52', '2020-04-03 12:39:52'),
(189, 55, 6, 1, NULL, NULL, 0, '我是搞笑', '2020-04-03 12:39:59', '2020-04-03 12:39:59');

-- --------------------------------------------------------

--
-- 表的结构 `user`
--

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `psd` varchar(255) NOT NULL,
  `username` text,
  `pic` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `pickNum` int(11) DEFAULT '0',
  `messageNum` int(64) DEFAULT '0',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `utime` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `user`
--

INSERT INTO `user` (`id`, `phone`, `psd`, `username`, `pic`, `img`, `pickNum`, `messageNum`, `ctime`, `utime`) VALUES
(1, '17680159093', '1234', '搞笑', '/img', '/img', 84, 28, '2020-03-28 15:39:37', '2020-03-28 15:39:37'),
(5, '13875874378', '123', 'ddd', NULL, NULL, 23, 26, '2020-03-29 11:32:25', '2020-03-29 11:32:25'),
(6, '15116411678', '1234', '李建成', NULL, NULL, 3, 8, '2020-04-02 12:34:44', '2020-04-02 12:34:44'),
(7, '13888888888', '1234', '里哈哈', NULL, NULL, 2, 2, '2020-04-02 12:37:11', '2020-04-02 12:37:11');

-- --------------------------------------------------------

--
-- 表的结构 `write`
--

CREATE TABLE IF NOT EXISTS `write` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `myPick` int(11) NOT NULL DEFAULT '0',
  `pickNum` int(64) NOT NULL DEFAULT '0',
  `messageNum` int(64) NOT NULL DEFAULT '0',
  `ctime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `utime` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

--
-- 转存表中的数据 `write`
--

INSERT INTO `write` (`id`, `userId`, `username`, `content`, `myPick`, `pickNum`, `messageNum`, `ctime`, `utime`) VALUES
(53, 5, NULL, '我是ddd', 0, 1, 3, '2020-04-03 12:36:28', '2020-04-03 12:36:28'),
(55, 6, NULL, '我是李建成', 0, 0, 2, '2020-04-03 12:38:10', '2020-04-03 12:38:10'),
(60, 1, NULL, '我是搞笑', 0, 0, 0, '2020-04-03 13:05:00', '2020-04-03 13:05:00'),
(61, 6, NULL, '姜哈哈哈哈好多好多个好的好哥哥咕咚咕咚个个哥哥个哥哥个大哥哥咕咚咕咚个个打个电话患得患失和黑色好多好多共商国是孤独感孤独感计算机据介绍珐 v还是', 0, 0, 0, '2020-04-03 13:13:47', '2020-04-03 13:13:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `replay`
--
ALTER TABLE `replay`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `write`
--
ALTER TABLE `write`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `replay`
--
ALTER TABLE `replay`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=190;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `write`
--
ALTER TABLE `write`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=62;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
