-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2023. Jún 13. 11:35
-- Kiszolgáló verziója: 10.4.27-MariaDB
-- PHP verzió: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `barber`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservation`
--

CREATE TABLE `reservation` (
  `id_reservation` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `id_worker_user` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservation_archived`
--

CREATE TABLE `reservation_archived` (
  `id_archived` int(11) NOT NULL,
  `id_reservation` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `id_worker_user` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `reservation_deleted`
--

CREATE TABLE `reservation_deleted` (
  `id_archived` int(11) NOT NULL,
  `id_reservation` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `id_worker_user` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `duration` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `salons`
--

CREATE TABLE `salons` (
  `id_salon` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `ban` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `services`
--

CREATE TABLE `services` (
  `id_service` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `service_name` varchar(255) NOT NULL,
  `price` int(11) NOT NULL,
  `duration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id_user`, `username`, `firstname`, `lastname`, `password`, `email`, `token`, `status`, `role`) VALUES
(54, 'lacikovacs33p', 'László', 'Kovács', '$2y$10$kMEnahqK3lU2IjaGIW4z4e6dm1FSWBxtRGs4A8JD9RDROqNfnXfFK', 'lacikovacs330@gmail.com', '8e8c852dd3e17c609956be6ec5ecaaf4', 1, 'admin'),
(55, 'Papapapa', 'Papapa', 'Papapa', '$2y$10$v2lHrUfU3rhBOhnB.XJcwOybBrUPilNcjvqhnySCI9QIQ9SSUknKK', 'lacikovacs333@gmail.com', 'f5e8754edba0690b15c095ce30e06fa2', 1, 'owner'),
(56, 'Asd', 'Asd', 'Asd', '$2y$10$h.5tlTNKgVo1hsDScCP/Uen/TNUfNhK6W8JGRsUAjqHSP4grD3Y9K', 'Asd@gmail.com', '3c974b67d28b5fa79affa474f0792620', 1, 'owner');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workers`
--

CREATE TABLE `workers` (
  `id_worker` int(11) NOT NULL,
  `id_salon` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `workers_hours`
--

CREATE TABLE `workers_hours` (
  `id_hour` int(11) NOT NULL,
  `id_user` int(11) NOT NULL,
  `day` date NOT NULL,
  `from_hour` time NOT NULL,
  `to_hour` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `reservation`
--
ALTER TABLE `reservation`
  ADD PRIMARY KEY (`id_reservation`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_worker_user` (`id_worker_user`),
  ADD KEY `id_user` (`id_user`);

--
-- A tábla indexei `reservation_archived`
--
ALTER TABLE `reservation_archived`
  ADD PRIMARY KEY (`id_archived`),
  ADD KEY `id_reservation` (`id_reservation`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_worker_user` (`id_worker_user`),
  ADD KEY `id_user` (`id_user`);

--
-- A tábla indexei `reservation_deleted`
--
ALTER TABLE `reservation_deleted`
  ADD PRIMARY KEY (`id_archived`),
  ADD KEY `id_reservation` (`id_reservation`),
  ADD KEY `id_user` (`id_user`),
  ADD KEY `id_worker_user` (`id_worker_user`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_reservation_2` (`id_reservation`);

--
-- A tábla indexei `salons`
--
ALTER TABLE `salons`
  ADD PRIMARY KEY (`id_salon`),
  ADD KEY `id_user` (`id_user`);

--
-- A tábla indexei `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id_service`),
  ADD KEY `id_user` (`id_user`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- A tábla indexei `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id_worker`),
  ADD KEY `id_salon` (`id_salon`),
  ADD KEY `id_user` (`id_user`);

--
-- A tábla indexei `workers_hours`
--
ALTER TABLE `workers_hours`
  ADD PRIMARY KEY (`id_hour`),
  ADD KEY `id_user` (`id_user`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `reservation`
--
ALTER TABLE `reservation`
  MODIFY `id_reservation` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=127;

--
-- AUTO_INCREMENT a táblához `reservation_archived`
--
ALTER TABLE `reservation_archived`
  MODIFY `id_archived` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT a táblához `reservation_deleted`
--
ALTER TABLE `reservation_deleted`
  MODIFY `id_archived` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT a táblához `salons`
--
ALTER TABLE `salons`
  MODIFY `id_salon` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT a táblához `services`
--
ALTER TABLE `services`
  MODIFY `id_service` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT a táblához `workers`
--
ALTER TABLE `workers`
  MODIFY `id_worker` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `workers_hours`
--
ALTER TABLE `workers_hours`
  MODIFY `id_hour` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `salons`
--
ALTER TABLE `salons`
  ADD CONSTRAINT `salons_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id_user`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
