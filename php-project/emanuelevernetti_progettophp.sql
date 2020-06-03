-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Giu 03, 2020 alle 15:33
-- Versione del server: 10.4.11-MariaDB
-- Versione PHP: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emanuelevernetti_progettophp`
--
CREATE DATABASE IF NOT EXISTS `emanuelevernetti_progettophp` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `emanuelevernetti_progettophp`;

-- --------------------------------------------------------

--
-- Struttura della tabella `alimentatori`
--

CREATE TABLE `alimentatori` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Tensione di ingresso` varchar(255) NOT NULL,
  `Frequenza di ingresso` varchar(255) NOT NULL,
  `Corrente di ingresso` varchar(255) NOT NULL,
  `Potenza` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `alimentatori`
--

INSERT INTO `alimentatori` (`Id`, `Marca`, `Modello`, `Tensione di ingresso`, `Frequenza di ingresso`, `Corrente di ingresso`, `Potenza`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'Cooler Master', 'Cooler Master V1200+ Platinum', '100 - 240 V', '50 - 60 Hz', '7.5 - 15 A', '1200 W', 299, 'img/alimentatori/coolermasterV1200.jpg', 97),
(2, 'Cooler Master', 'CoolerMaster MWE V2', '100 - 240 V', '50 - 60 Hz', '6 - 10 A', '750 W', 80, 'img/alimentatori/coolermaster750W.jpg', 100),
(3, 'Cooler Master', 'Cooler Master Elite V3', '200 - 240 V', '47 - 63 Hz', '4 A', '500 W', 44, 'img/alimentatori/coolermasterEliteV3.jpg', 99),
(4, 'Cooler Master', 'Cooler Master MasterWatt Lite 600', '200 - 240 V', '47 - 63 Hz', '3.5 - 5 A', '600 W', 59, 'img/alimentatori/coolermasterMasterwattLite600.jpg', 100);

-- --------------------------------------------------------

--
-- Struttura della tabella `cpu`
--

CREATE TABLE `cpu` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Generazione` varchar(255) NOT NULL,
  `Stato` varchar(255) NOT NULL,
  `Litografia` varchar(255) NOT NULL,
  `NumCore` int(11) NOT NULL,
  `NumThread` int(11) NOT NULL,
  `FreqBase` varchar(255) NOT NULL,
  `FreqTurbo` varchar(255) NOT NULL,
  `Cache` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `cpu`
--

INSERT INTO `cpu` (`Id`, `Marca`, `Modello`, `Generazione`, `Stato`, `Litografia`, `NumCore`, `NumThread`, `FreqBase`, `FreqTurbo`, `Cache`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'Intel', 'Intel i3-9350KF', 'nona', 'Launched', '14 nm', 4, 4, '4,00 GHz', '4,00 GHz', '8 MB', 225, 'img/cpu/i3.jpg', 77),
(2, 'Intel', 'Intel i3-9350K', 'nona', 'Launched', '14 nm', 4, 4, '4,00 GHz', '4,00 GHz', '8 MB', 175, 'img/cpu/i3.jpg', 0),
(3, 'Intel', 'Intel i3-9320', 'nona', 'Launched', '14 nm', 4, 4, '3,70 GHz', '4,40 GHz', '8 MB', 150, 'img/cpu/i3.jpg', 93),
(4, 'Intel', 'Intel i3-9300T', 'nona', 'Launched', '14 nm', 4, 4, '3,20 GHz', '3,80 GHz', '8 MB', 170, 'img/cpu/i3.jpg', 96),
(5, 'Intel', 'Intel i3-9100', 'nona', 'Launched', '14 nm', 4, 4, '3,70 GHz', '4,30 GHz', '8 MB', 146, 'img/cpu/i3.jpg', 80),
(6, 'Intel', 'Intel i5-9600T', 'nona', 'Launched', '14 nm', 6, 6, '2,30 GHz', '3,90 GHz', '9 MB', 209, 'img/cpu/i5.jpg', 99),
(7, 'Intel', 'Intel i5-9600K', 'nona', 'Launched', '14 nm', 6, 6, '3,70 GHz', '4,60 GHz', '9 MB', 225, 'img/cpu/i5.jpg', 96),
(8, 'Intel', 'Intel i5-9600KF', 'nona', 'Launched', '14 nm', 6, 6, '3,70 GHz', '4,60 GHz', '9 MB', 209, 'img/cpu/i5.jpg', 98),
(9, 'Intel', 'Intel i5-9600', 'nona', 'Launched', '14 nm', 6, 6, '3,10 GHz', '4,60 GHz', '9 MB', 239, 'img/cpu/i5.jpg', 100),
(10, 'Intel', 'Intel i5-9500', 'nona', 'Launched', '14 nm', 6, 6, '3,00 GHz', '4,40 GHz', '9 MB', 200, 'img/cpu/i5.jpg', 100),
(11, 'Intel', 'Intel i5-9400', 'nona', 'Launched', '14 nm', 6, 6, '2,90 GHz', '4,10 GHz', '9 MB', 190, 'img/cpu/i5.jpg', 100),
(12, 'Intel', 'Intel i7-9700KF', 'nona', 'Launched', '14 nm', 8, 8, '3,60 GHz', '4,90 GHz', '12 MB', 380, 'img/cpu/i7.jpg', 100),
(13, 'Intel', 'Intel i7-9700K', 'nona', 'Launched', '14 nm', 8, 8, '3,60 GHz', '4,90 GHz', '12 MB', 380, 'img/cpu/i7.jpg', 100),
(14, 'Intel', 'Intel i7-9700F', 'nona', 'Launched', '14 nm', 8, 8, '3,00 GHz', '4,70 GHz', '12 MB', 355, 'img/cpu/i7.jpg', 100),
(15, 'Intel', 'Intel i7-9700', 'nona', 'Launched', '14 nm', 8, 8, '3,00 GHz', '4,70 GHz', '12 MB', 370, 'img/cpu/i7.jpg', 100),
(16, 'Intel', 'Intel i7-9700E', 'nona', 'Launched', '14 nm', 8, 8, '2,60 GHz', '4,40 GHz', '12 MB', 350, 'img/cpu/i7.jpg', 100);

-- --------------------------------------------------------

--
-- Struttura della tabella `dissipatori`
--

CREATE TABLE `dissipatori` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Socket supportati` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `dissipatori`
--

INSERT INTO `dissipatori` (`Id`, `Marca`, `Modello`, `Socket supportati`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'Cooler Master', 'Cooler Master MASTERAIR MA410P', 'Intel LGA 2066-2011-1151-1150-1155', 36, 'img/dissipatori/CoolerMasterMA410P.jpg', 99),
(2, 'Cooler Master', 'Cooler Master MasterAir MA410M', 'Intel LGA 2066-2011-1151-1150-1155', 57, 'img/dissipatori/CoolerMasterMA410M.jpg', 99),
(3, 'Cooler Master', 'Cooler Master Master Air Maker 8', 'Presa elettrica AM2+, Presa elettrica AM3, Socket AM3+, Socket FM1, Socket FM2, Socket FM2+, LGA 1151 (Presa H4), LGA 2011-v3 (Socket R)', 127, 'img/dissipatori/CoolerMasterMasterAirMaker8.jpg', 99);

-- --------------------------------------------------------

--
-- Struttura della tabella `gpu`
--

CREATE TABLE `gpu` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Memoria grafica` varchar(255) NOT NULL,
  `Tipo memoria grafica` varchar(255) NOT NULL,
  `Ampiezza dati` varchar(255) NOT NULL,
  `Versione DirectX` varchar(255) NOT NULL,
  `Risoluzione massima` varchar(255) NOT NULL,
  `Tipo interfaccia` varchar(255) NOT NULL,
  `Numero di ventole` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `gpu`
--

INSERT INTO `gpu` (`Id`, `Marca`, `Modello`, `Memoria grafica`, `Tipo memoria grafica`, `Ampiezza dati`, `Versione DirectX`, `Risoluzione massima`, `Tipo interfaccia`, `Numero di ventole`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'Zotac', 'VGA ZOTAC GeForce RTX 2060 6G', '6 GB', 'GDDR6', '192 bit', '12.0', '4096 x 2160', 'PCI Express x16 3.0', '2 ventole', 450, 'img/gpu/zotacRTX20606G.jpg', 99),
(2, 'Asus', 'VGA ASUS GeForce GTX 1060 6G', '6 GB', 'GDDR5', '192 bit', '12.0', '7680 x 4320', 'PCI Express 3.0', '2 ventole', 409, 'img/gpu/asusGTX10606G.jpg', 100),
(3, 'MSI', 'VGA MSI GeForce GTX 1660 SUPER', '6 GB', 'GDDR6', '192 bit', '12.0', '7680 x 4320', 'PCI Express x16 3.0', '2 ventole', 329, 'img/gpu/msi1660S6G.jpg', 96),
(4, 'MSI', 'VGA MSI GeForce GTX 1660 Ti SUPER', '6 GB', 'GDDR6', '192 bit', '12.0', '7680 x 4320', 'PCI Express x16 3.0', '2 ventole', 399, 'img/gpu/msi1660Ti6G.jpg', 100),
(5, 'MSI', 'VGA MSI GeForce RTX 2080Ti', '11 GB', 'GDDR6', '352 bit', '12.0', '7680 x 4320', 'PCI Express x16 3.0', '3 ventole', 1459, 'img/gpu/msi2080Ti11G.jpg', 99);

-- --------------------------------------------------------

--
-- Struttura della tabella `ram`
--

CREATE TABLE `ram` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Capacita` varchar(255) NOT NULL,
  `Tipo di RAM` varchar(255) NOT NULL,
  `Velocita` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `ram`
--

INSERT INTO `ram` (`Id`, `Marca`, `Modello`, `Capacita`, `Tipo di RAM`, `Velocita`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'HyperX', 'HyperX FURY RGB 8GB', '8 GB', 'DDR4', '3466 MHz', 70, 'img/ram/hyperxFuryRGB.jpg', 100),
(2, 'HyperX', 'HyperX FURY 8GB', '8 GB', 'DDR4', '2400 MHz', 62, 'img/ram/hyperxFury.jpg', 100),
(3, 'Corsair', 'Vengeance LPX 16GB', '16 GB', 'DDR4', '2400 MHz', 86, 'img/ram/corsairVengeance.jpg', 100),
(4, 'Adata', 'Adata XPG SPECTRIX D41 8GB', '8 GB', 'DDR4', '3200 MHz', 86, 'img/ram/adataXPGSpectrix8GB.jpg', 100),
(5, 'Adata', 'Adata XPG SPECTRIX D80 16GB', '16 GB', 'DDR4', '3000 MHz', 128, 'img/ram/adataXPGSpectrixD8016GB.jpg', 100),
(6, 'HyperX', 'HyperX Impact 16GB', '16 GB', 'DDR4', '2400 MHz', 77, 'img/ram/hyperxImpact.jpg', 100);

-- --------------------------------------------------------

--
-- Struttura della tabella `schedemadri`
--

CREATE TABLE `schedemadri` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Marca processori supportati` varchar(255) NOT NULL,
  `Socket` varchar(255) NOT NULL,
  `Tipo di memoria supportata` varchar(255) NOT NULL,
  `Numero di slot di memoria` int(255) NOT NULL,
  `Quantita massima di memoria supportata` varchar(255) NOT NULL,
  `Velocita massima di memoria supportata` varchar(255) NOT NULL,
  `Forma` varchar(255) NOT NULL,
  `Numero di connettori USB` int(11) NOT NULL,
  `Numero di connettori PCIe` int(11) NOT NULL,
  `Numero di slot M2` int(11) NOT NULL,
  `Numero di porte VGA` int(11) NOT NULL,
  `Numero di porte DVI` int(11) NOT NULL,
  `Numero di porte HDMI` int(11) NOT NULL,
  `Numero di porte DP` int(11) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `schedemadri`
--

INSERT INTO `schedemadri` (`Id`, `Marca`, `Modello`, `Marca processori supportati`, `Socket`, `Tipo di memoria supportata`, `Numero di slot di memoria`, `Quantita massima di memoria supportata`, `Velocita massima di memoria supportata`, `Forma`, `Numero di connettori USB`, `Numero di connettori PCIe`, `Numero di slot M2`, `Numero di porte VGA`, `Numero di porte DVI`, `Numero di porte HDMI`, `Numero di porte DP`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'MSI', 'MSI Z390-A PRO', 'Intel', 'LGA 1151', 'DDR4-SDRAM', 4, '64 GB', '4400 MHz', 'ATX', 9, 6, 1, 1, 1, 0, 1, 131, 'img/schedeMadri/MSIZ390-APRO.jpg', 85);

-- --------------------------------------------------------

--
-- Struttura della tabella `ssd`
--

CREATE TABLE `ssd` (
  `Id` int(11) NOT NULL,
  `Marca` varchar(255) NOT NULL,
  `Modello` varchar(255) NOT NULL,
  `Capacita` varchar(255) NOT NULL,
  `Connettore` varchar(255) NOT NULL,
  `Velocita lettura sequenziale` varchar(255) NOT NULL,
  `Velocita scrittura sequenziale` varchar(255) NOT NULL,
  `Prezzo` int(11) NOT NULL,
  `Img` varchar(255) NOT NULL,
  `Giacenza` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `ssd`
--

INSERT INTO `ssd` (`Id`, `Marca`, `Modello`, `Capacita`, `Connettore`, `Velocita lettura sequenziale`, `Velocita scrittura sequenziale`, `Prezzo`, `Img`, `Giacenza`) VALUES
(1, 'SanDisk', 'SanDisk Ultra 3D SSD 1TB', '1 TB (1024 GB)', 'SATA', '550 MB/s', '525 MB/s', 150, 'img/ssd/sandiskUltra.jpg', 100),
(2, 'SanDisk', 'SanDisk Ultra 3D SSD 250GB', '250 GB', 'SATA', '550 MB/s', '525 MB/s', 55, 'img/ssd/sandiskUltra.jpg', 100),
(3, 'SanDisk', 'SanDisk Ultra 3D SSD 500GB', '500 GB', 'SATA', '550 MB/s', '525 MB/s', 73, 'img/ssd/sandiskUltra.jpg', 100),
(4, 'SanDisk', 'SanDisk Ultra 3D SSD 2TB', '2 TB (2048 GB)', 'SATA', '550 MB/s', '525 MB/s', 280, 'img/ssd/sandiskUltra.jpg', 100),
(5, 'SanDisk', 'SanDisk Ultra 3D SSD 4TB', '4 TB (8192 GB)', 'SATA', '550 MB/s', '525 MB/s', 400, 'img/ssd/sandiskUltra.jpg', 100),
(6, 'SanDisk', 'SanDisk EXTREME PRO M.2 500GB', '500 GB', 'M.2', '3400 MB/s', '2500 MB/s', 130, 'img/ssd/sandiskExtremeProM2500GB.jpg', 100),
(7, 'SanDisk', 'SanDisk EXTREME PRO M.2 1TB', '1 TB (1024 GB)', 'M.2', '3400 MB/s', '2500 MB/s', 160, 'img/ssd/sandiskExtremeProM21TB.jpg', 100),
(8, 'SanDisk', 'SanDisk EXTREME PRO M.2 2TB', '2 TB (2048 GB)', 'M.2', '3400 MB/s', '2500 MB/s', 475, 'img/ssd/sandiskExtremeProM22TB.jpg', 96),
(9, 'Kingston', 'Kingston A400 240GB', '240 GB', 'SATA', '500 MB/s', '450 MB/s', 40, 'img/ssd/kingstonA400.png', 100),
(10, 'Kingston', 'Kingston A400 960GB', '960 GB', 'SATA', '500 MB/s', '450 MB/s', 110, 'img/ssd/kingstonA400.png', 100),
(11, 'Kingston', 'Kingston A400 960GB M.2', '960 GB', 'M.2', '500 MB/s', '320 MB/s', 189, 'img/ssd/kingstonA400M.2.jpg', 100);

-- --------------------------------------------------------

--
-- Struttura della tabella `utenti`
--

CREATE TABLE `utenti` (
  `Id` int(11) NOT NULL,
  `Nome` varchar(255) NOT NULL,
  `Cognome` varchar(255) NOT NULL,
  `Mail` varchar(255) NOT NULL,
  `Telefono` varchar(255) NOT NULL,
  `Username` varchar(255) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `utenti`
--

INSERT INTO `utenti` (`Id`, `Nome`, `Cognome`, `Mail`, `Telefono`, `Username`, `Password`) VALUES
(1, 'Emanuele', 'Vernetti', 'vernetti.emanuele@gmail.com', '3407153802', 'emanuele_vernetti', '5f4dcc3b5aa765d61d8327deb882cf99'),
(2, 'Mario', 'Rossi', 'mario.rossi@gmail.com', '3159856802', 'mario_rossi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(3, 'Guido', 'Bianchi', 'guido.bianchi@gmail.com', '3251458930', 'guido_bianchi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(4, 'Marco', 'Verdi', 'marco.verdi@gmail.com', '3215874580', 'marco_verdi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(5, 'Filippo', 'Albrigi', 'filippo.albrigi@gmail.com', '3569874502', 'filippo_albrigi', '5f4dcc3b5aa765d61d8327deb882cf99'),
(6, 'Marco', 'Bosso', 'marco.bosso@gmail.com', '3562587452', 'marco_bosso', '5f4dcc3b5aa765d61d8327deb882cf99'),
(7, 'Francesco', 'Gialli', 'francesco.gialli@gmail.com', '3252698541', 'francesco_gialli', '5f4dcc3b5aa765d61d8327deb882cf99');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `alimentatori`
--
ALTER TABLE `alimentatori`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `cpu`
--
ALTER TABLE `cpu`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `dissipatori`
--
ALTER TABLE `dissipatori`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `gpu`
--
ALTER TABLE `gpu`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `ram`
--
ALTER TABLE `ram`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `schedemadri`
--
ALTER TABLE `schedemadri`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `ssd`
--
ALTER TABLE `ssd`
  ADD PRIMARY KEY (`Id`);

--
-- Indici per le tabelle `utenti`
--
ALTER TABLE `utenti`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `alimentatori`
--
ALTER TABLE `alimentatori`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT per la tabella `cpu`
--
ALTER TABLE `cpu`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT per la tabella `dissipatori`
--
ALTER TABLE `dissipatori`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `gpu`
--
ALTER TABLE `gpu`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT per la tabella `ram`
--
ALTER TABLE `ram`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT per la tabella `schedemadri`
--
ALTER TABLE `schedemadri`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `ssd`
--
ALTER TABLE `ssd`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT per la tabella `utenti`
--
ALTER TABLE `utenti`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
