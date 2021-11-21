/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `user_team08`
--

-- --------------------------------------------------------

--
-- Table structure for table `body`
--

CREATE TABLE `body` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `body`
--

INSERT INTO `body` (`id`, `name`) VALUES
(1, 'Nohy'),
(2, 'Zadek'),
(3, 'Záda'),
(4, 'Lýtka'),
(5, 'Ramena'),
(6, 'Prsa'),
(7, 'Biceps'),
(8, 'Triceps'),
(9, 'Trapézy'),
(10, 'Břicho');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `name`) VALUES
(1, 'Jednoručky'),
(2, 'Kettlebely'),
(3, 'Osa'),
(4, 'Kotouč'),
(5, 'Gym ball'),
(6, 'Expandér'),
(7, 'Bedna'),
(8, 'TRX'),
(9, 'Hrazda'),
(10, 'Lavice'),
(11, 'Kolečko'),
(12, 'Sandbag'),
(13, 'Roller'),
(14, 'Fit slide');

-- --------------------------------------------------------

--
-- Table structure for table `exercise`
--

CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exercise`
--

INSERT INTO `exercise` (`id`, `name`, `description`) VALUES
(1, 'Zadní dřepy', NULL),
(2, 'Bulharské dřepy', NULL),
(3, 'Výpony na lýtka', NULL),
(4, 'Výtahy', NULL),
(5, 'Rotace v ramenou', NULL),
(6, 'Upažování', NULL),
(7, 'Deadbug', NULL),
(8, 'Zkracovačky', NULL),
(9, 'Tučňák', NULL),
(10, 'Přítahy kolen ve visu', NULL),
(11, 'Sedy-lehy', NULL),
(12, 'Kliky', NULL),
(13, 'Tlaky na ramena', NULL),
(14, 'Bench press', NULL),
(15, 'Floor press', NULL),
(16, 'Přítahy v předklonu', NULL),
(17, 'Mrtvé tahy', NULL),
(18, 'Přední dřepy', NULL),
(19, 'Hip-trusty', NULL),
(20, 'Přemístění', NULL),
(21, 'Trhy', NULL),
(22, 'Shyby nadhmatem', NULL),
(23, 'Plank', NULL),
(24, 'Sklapovačky', NULL),
(25, 'Horolezec', NULL),
(26, 'Výdrž ve dřepu', NULL),
(27, 'Výdrž  v kliku', NULL),
(28, 'Nůžky', NULL),
(29, 'Francouzské tlaky', NULL),
(30, 'Stahování expanderu na triceps (horní kladka)', NULL),
(31, 'Stahování expanderu na záda (horní kladka)', NULL),
(32, 'Bicepsový zdvih', NULL),
(33, 'Shyby podhmatem', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `exerciseBody`
--

CREATE TABLE `exerciseBody` (
  `id` int(11) NOT NULL,
  `exerciseId` int(11) NOT NULL,
  `bodyId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exerciseBody`
--

INSERT INTO `exerciseBody` (`id`, `exerciseId`, `bodyId`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 10),
(4, 2, 1),
(5, 2, 2),
(6, 2, 10),
(7, 3, 4),
(8, 4, 9),
(9, 5, 5),
(10, 5, 9),
(11, 6, 5),
(12, 6, 9),
(13, 7, 10),
(14, 8, 10),
(15, 9, 10),
(16, 10, 10),
(17, 11, 10),
(18, 12, 6),
(19, 12, 8),
(20, 12, 10),
(21, 13, 5),
(22, 14, 6),
(23, 14, 8),
(24, 15, 6),
(25, 15, 8),
(26, 16, 3),
(27, 18, 1),
(28, 18, 2),
(29, 18, 10),
(30, 19, 2),
(31, 20, 1),
(32, 21, 1),
(33, 22, 3),
(34, 22, 7),
(35, 23, 10),
(36, 23, 5),
(37, 24, 10),
(38, 25, 10),
(39, 25, 5),
(40, 26, 1),
(41, 27, 6),
(42, 27, 8),
(43, 28, 10),
(44, 29, 8),
(45, 29, 5),
(46, 30, 8),
(47, 31, 3),
(48, 32, 7),
(49, 33, 3),
(50, 33, 7);

-- --------------------------------------------------------

--
-- Table structure for table `exerciseEquipment`
--

CREATE TABLE `exerciseEquipment` (
  `id` int(11) NOT NULL,
  `exerciseId` int(11) NOT NULL,
  `equipmentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `exerciseEquipment`
--

INSERT INTO `exerciseEquipment` (`id`, `exerciseId`, `equipmentId`) VALUES
(1, 1, 3),
(2, 1, 1),
(3, 1, 2),
(4, 2, 1),
(5, 2, 3),
(6, 2, 2),
(7, 3, 3),
(8, 3, 12),
(9, 3, 1),
(10, 3, 2),
(11, 3, 4),
(12, 4, 3),
(13, 5, 1),
(14, 6, 4),
(15, 7, 5),
(16, 10, 9),
(17, 12, 6),
(18, 13, 3),
(19, 13, 12),
(20, 13, 2),
(21, 14, 3),
(22, 14, 1),
(23, 14, 2),
(24, 15, 1),
(25, 15, 3),
(26, 15, 2),
(27, 16, 3),
(28, 16, 12),
(29, 16, 6),
(30, 17, 3),
(31, 17, 2),
(62, 18, 1),
(63, 18, 2),
(64, 18, 3),
(65, 18, 12),
(66, 19, 3),
(67, 19, 12),
(68, 19, 4),
(69, 19, 1),
(70, 20, 3),
(71, 21, 3),
(72, 21, 1),
(73, 21, 2),
(74, 22, 9),
(75, 22, 6),
(76, 26, 3),
(77, 26, 12),
(78, 29, 1),
(79, 29, 3),
(80, 30, 9),
(81, 30, 6),
(82, 31, 6),
(83, 31, 9),
(84, 32, 1),
(85, 32, 2),
(86, 32, 6),
(87, 33, 6),
(88, 33, 9);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `active` tinyint(4) DEFAULT '0',
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `sex` enum('male','female') NOT NULL,
  `birthdate` date NOT NULL,
  `lostPasswordHash` text,
  `lastLogin` int(11) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `surname`, `email`, `password`, `role`, `active`, `height`, `weight`, `sex`, `birthdate`, `lostPasswordHash`, `lastLogin`, `createdAt`) VALUES
(1, 'Ronald', 'Rebernigg', 'papj02@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$kCd977lLMv9WZfpjCk3TTA$H0LLGQvVbx0kHijQFOaa6Cc40JDV44xyZl3ZGwoGatA', 'user', 1, 180, 70, 'male', '2021-10-12', 'ipgpeczfno', NULL, '2021-11-01 14:09:24'),
(2, 'Ronald', 'Rebernigg', 'mico00@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$w46SrCzyhjI205XF12kMcQ$U0U5Ozi80QkccYGzMpUXkMBHBGOG0o9/V8eXa6KVvjk', 'user', 1, 180, 70, 'male', '2021-10-12', 'VcF4jM/0xs', NULL, '2021-11-01 14:09:24'),
(3, 'Ronald', 'Rebernigg', 'nemd03@vse.cz', '$argon2i$v=19$m=4096,t=3,p=1$w46SrCzyhjI205XF12kMcQ$U0U5Ozi80QkccYGzMpUXkMBHBGOG0o9/V8eXa6KVvjk', 'user', 1, 180, 70, 'male', '2021-10-12', 'V4OLmoLkeY', NULL, '2021-11-01 14:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `userWorkoutPlan`
--

CREATE TABLE `userWorkoutPlan` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `workoutPlanId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `workoutHistory`
--

CREATE TABLE `workoutHistory` (
  `id` int(11) NOT NULL,
  `calories` int(11) NOT NULL,
  `status` enum('active','finished') NOT NULL,
  `startAt` datetime NOT NULL,
  `endAt` datetime NOT NULL,
  `workoutPlanId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `workoutPlan`
--

CREATE TABLE `workoutPlan` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rounds` int(11) NOT NULL,
  `intervalLength` int(11) NOT NULL,
  `intervalPauseLength` int(11) NOT NULL,
  `roundsPauseLength` int(11) NOT NULL,
  `workoutLenght` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `workoutPlanExercise`
--

CREATE TABLE `workoutPlanExercise` (
  `id` int(11) NOT NULL,
  `workoutPlanId` int(11) NOT NULL,
  `exerciseId` int(11) NOT NULL,
  `sequence` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `body`
--
ALTER TABLE `body`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercise`
--
ALTER TABLE `exercise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exerciseBody`
--
ALTER TABLE `exerciseBody`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bodyId` (`bodyId`),
  ADD KEY `exerciseId` (`exerciseId`);

--
-- Indexes for table `exerciseEquipment`
--
ALTER TABLE `exerciseEquipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipmentId` (`equipmentId`),
  ADD KEY `exerciseId` (`exerciseId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userWorkoutPlan`
--
ALTER TABLE `userWorkoutPlan`
  ADD KEY `userId` (`userId`),
  ADD KEY `workout-plan-id` (`workoutPlanId`);

--
-- Indexes for table `workoutHistory`
--
ALTER TABLE `workoutHistory`
  ADD KEY `workoutPlanId` (`workoutPlanId`);

--
-- Indexes for table `workoutPlan`
--
ALTER TABLE `workoutPlan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workoutPlanExercise`
--
ALTER TABLE `workoutPlanExercise`
  ADD PRIMARY KEY (`id`),
  ADD KEY `workout_planID` (`workoutPlanId`),
  ADD KEY `exercise_foreign` (`exerciseId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `body`
--
ALTER TABLE `body`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `exercise`
--
ALTER TABLE `exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;
--
-- AUTO_INCREMENT for table `exerciseBody`
--
ALTER TABLE `exerciseBody`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `exerciseEquipment`
--
ALTER TABLE `exerciseEquipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `workoutPlan`
--
ALTER TABLE `workoutPlan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workoutPlanExercise`
--
ALTER TABLE `workoutPlanExercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `exerciseBody`
--
ALTER TABLE `exerciseBody`
  ADD CONSTRAINT `bodyId` FOREIGN KEY (`bodyId`) REFERENCES `body` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `exerciseId` FOREIGN KEY (`exerciseId`) REFERENCES `exercise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `exerciseEquipment`
--
ALTER TABLE `exerciseEquipment`
  ADD CONSTRAINT `equipmentId` FOREIGN KEY (`equipmentId`) REFERENCES `equipment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `exercise` FOREIGN KEY (`exerciseId`) REFERENCES `exercise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `userWorkoutPlan`
--
ALTER TABLE `userWorkoutPlan`
  ADD CONSTRAINT `userId` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `workout-plan-id` FOREIGN KEY (`workoutPlanId`) REFERENCES `workoutPlan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `workoutHistory`
--
ALTER TABLE `workoutHistory`
  ADD CONSTRAINT `workoutPlanId` FOREIGN KEY (`workoutPlanId`) REFERENCES `workoutPlan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `workoutPlanExercise`
--
ALTER TABLE `workoutPlanExercise`
  ADD CONSTRAINT `exercise_foreign` FOREIGN KEY (`exerciseId`) REFERENCES `exercise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `workout_planID` FOREIGN KEY (`workoutPlanId`) REFERENCES `workoutPlan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
