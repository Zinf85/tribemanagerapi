-- phpMyAdmin SQL Dump
-- version 4.2.12deb2+deb8u2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Aug 03, 2017 at 03:59 AM
-- Server version: 5.5.54-0+deb8u1
-- PHP Version: 5.6.30-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ArkApp`
--

-- --------------------------------------------------------

--
-- Table structure for table `TamedDinos`
--

CREATE TABLE IF NOT EXISTS `TamedDinos` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `health` float DEFAULT NULL,
  `stamina` float DEFAULT NULL,
  `oxygen` float DEFAULT NULL,
  `food` float DEFAULT NULL,
  `weight` float DEFAULT NULL,
  `melee` float DEFAULT NULL,
  `speed` float DEFAULT NULL,
  `torpor` float DEFAULT NULL,
  `species` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `notes` varchar(255) DEFAULT NULL,
  `imprint` varchar(255) DEFAULT NULL,
  `father` varchar(255) DEFAULT NULL,
  `mother` varchar(255) DEFAULT NULL,
  `addedby` varchar(255) DEFAULT NULL,
  `datemodified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `tribe` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `TamedDinos`
--

INSERT INTO `TamedDinos` (`id`, `name`, `level`, `health`, `stamina`, `oxygen`, `food`, `weight`, `melee`, `speed`, `torpor`, `species`, `gender`, `notes`, `imprint`, `father`, `mother`, `addedby`, `datemodified`, `tribe`) VALUES
('7d145c98-e6c7-a5fd-6f42-01b30ef7bd31', 'fred', 224, 45000, 2000, 200, 500, 900, 300, 150, 20300, 'Ankylosaurus''', 'male', 'Test data, not a real dino', NULL, NULL, NULL, '123', '2017-07-30 19:59:39', '456'),
('ab0f30ee-17b0-8ad1-f997-375fe0029cc0', 'billy', 224, 10000, 2000, 200, 500, 900, 300, 150, 20300, 'Ankylosaurus''', 'male', 'Test data, not a real dino', NULL, NULL, NULL, '123', '2017-07-30 19:58:59', '456'),
('c037334b-c1fd-0cd0-9ec6-25ecc3b5f992', 'billy', 224, 10000, 2000, 200, 500, 900, 300, 150, 20300, 'Ankylosaurus''', 'male', 'Test data, not a real dino', NULL, NULL, NULL, '123', '2017-07-30 19:27:51', '456'),
('e7111666-ade7-ce61-8c79-faefaf59e91f', 'billy', 224, 10000, 2000, 200, 500, 900, 300, 150, 20300, 'Ankylosaurus''', 'male', 'Test data, not a real dino', NULL, NULL, NULL, '123', '2017-07-30 19:59:32', '456'),
('f83342f5-14cf-4476-7995-a326bc95ad30', 'billy', 224, 10000, 2000, 200, 500, 900, 300, 150, 20300, 'Ankylosaurus''', 'male', 'Test data, not a real dino', NULL, NULL, NULL, '123', '2017-07-30 19:27:52', '456');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `TamedDinos`
--
ALTER TABLE `TamedDinos`
 ADD PRIMARY KEY (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
