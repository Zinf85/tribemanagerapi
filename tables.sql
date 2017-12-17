--
-- Table structure for table `Guilds`
--

CREATE TABLE IF NOT EXISTS `Guilds` (
  `guildId` varchar(255) NOT NULL,
  `guildName` varchar(255) DEFAULT NULL,
`id` int(11) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=4925 DEFAULT CHARSET=latin1;
---------------------------------------------------------------

--
-- Table structure for table `Log`
--

CREATE TABLE IF NOT EXISTS `Log` (
`id` int(11) NOT NULL,
  `errorId` int(255) NOT NULL,
  `errorMessage` varchar(2000) NOT NULL,
  `payload` varchar(2000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
---------------------------

--
-- Table structure for table `Species`
--

CREATE TABLE IF NOT EXISTS `Species` (
`id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `type` varchar(256) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=228 DEFAULT CHARSET=latin1;
---------------------------------------------------------

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
  `datemodified` datetime NOT NULL,
  `tribeId` varchar(255) DEFAULT NULL,
  `status` enum('Alive','Missing','Dead','') DEFAULT NULL,
  `updatedby` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
----------------------------------------------------

--
-- Table structure for table `Tribes`
--

CREATE TABLE IF NOT EXISTS `Tribes` (
  `tribeId` varchar(255) NOT NULL,
  `tribeName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
----------------------------------------------

--
-- Table structure for table `UserGuilds`
--

CREATE TABLE IF NOT EXISTS `UserGuilds` (
`id` int(11) NOT NULL,
  `guildId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB AUTO_INCREMENT=463 DEFAULT CHARSET=latin1;
-----------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
`id` int(11) NOT NULL,
  `userId` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `accessToken` varchar(255) DEFAULT NULL,
  `refreshToken` varchar(255) DEFAULT NULL,
  `addedTime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `isSuperUser` tinyint(1) NOT NULL DEFAULT '0',
  `tribeId` varchar(255) DEFAULT NULL
) ENGINE=InnoDB AUTO_INCREMENT=120 DEFAULT CHARSET=latin1;
------------------------------------------------------------

--
-- Table structure for table `UserTribes`
--

CREATE TABLE IF NOT EXISTS `UserTribes` (
  `tribeId` varchar(255) NOT NULL,
  `userId` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
--------------------------------------------
