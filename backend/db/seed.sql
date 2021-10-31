CREATE TABLE `body` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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


CREATE TABLE `equipment` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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


CREATE TABLE `exercise` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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

CREATE TABLE `exercise_body` (
  `id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `body_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `exercise_body` (`id`, `exercise_id`, `body_id`) VALUES
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

CREATE TABLE `exercise_equipment` (
  `id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL,
  `equipment_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO `exercise_equipment` (`id`, `exercise_id`, `equipment_id`) VALUES
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


CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `surname` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` text NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `active` tinyint(4) DEFAULT '0',
  `height` int(11) NOT NULL,
  `weight` int(11) NOT NULL,
  `sex` enum('M','F') NOT NULL,
  `birthdate` date NOT NULL,
  `lost_password_hash` text,
  `last_login` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `workout_history` (
  `id` int(11) NOT NULL,
  `calories` int(11) NOT NULL,
  `status` enum('active','finished') NOT NULL,
  `start_at` datetime NOT NULL,
  `end_at` datetime NOT NULL,
  `workout_plan_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `workout_plan` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `rounds` int(11) NOT NULL,
  `interval_length` int(11) NOT NULL,
  `interval_pause_length` int(11) NOT NULL,
  `rounds_pause_length` int(11) NOT NULL,
  `workout_lenght` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


CREATE TABLE `workout_plan_exercise` (
  `id` int(11) NOT NULL,
  `workout_plan_id` int(11) NOT NULL,
  `exercise_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


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
-- Indexes for table `exercise_body`
--
ALTER TABLE `exercise_body`
  ADD PRIMARY KEY (`id`),
  ADD KEY `body_id` (`body_id`),
  ADD KEY `exercise_id` (`exercise_id`);

--
-- Indexes for table `exercise_equipment`
--
ALTER TABLE `exercise_equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_id` (`equipment_id`),
  ADD KEY `exercise` (`exercise_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workout_history`
--
ALTER TABLE `workout_history`
  ADD KEY `workout_plan_id` (`workout_plan_id`);

--
-- Indexes for table `workout_plan`
--
ALTER TABLE `workout_plan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `workout_plan_exercise`
--
ALTER TABLE `workout_plan_exercise`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `exercise_body`
--
ALTER TABLE `exercise_body`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;
--
-- AUTO_INCREMENT for table `exercise_equipment`
--
ALTER TABLE `exercise_equipment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=89;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workout_plan`
--
ALTER TABLE `workout_plan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `workout_plan_exercise`
--
ALTER TABLE `workout_plan_exercise`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for table `exercise_body`
--
ALTER TABLE `exercise_body`
  ADD CONSTRAINT `body_id` FOREIGN KEY (`body_id`) REFERENCES `body` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `exercise_id` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `exercise_equipment`
--
ALTER TABLE `exercise_equipment`
  ADD CONSTRAINT `equipment_id` FOREIGN KEY (`equipment_id`) REFERENCES `equipment` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `exercise` FOREIGN KEY (`exercise_id`) REFERENCES `exercise` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `workout_history`
--
ALTER TABLE `workout_history`
  ADD CONSTRAINT `workout_plan_id` FOREIGN KEY (`workout_plan_id`) REFERENCES `workout_plan` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;