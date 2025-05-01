-- Active: 1746107259420@@h0ckt.h.filess.io@61002@furevercare_porchabout

-- USERS
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(20),
    password_hash VARCHAR(255),
    role ENUM('Owner', 'Veterinarian', 'Groomer', 'Hotel', 'Caregiver'),
    address TEXT,
    location VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- VETERINARIANS
DROP TABLE IF EXISTS veterinarians;
CREATE TABLE veterinarians (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    clinic_name VARCHAR(255),
    district VARCHAR(100),
    neighborhood VARCHAR(100),
    tax_document VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- GROOMERS
DROP TABLE IF EXISTS groomers;
CREATE TABLE groomers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    district VARCHAR(100),
    neighborhood VARCHAR(100),
    license_document VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- HOTELS
DROP TABLE IF EXISTS hotels;
CREATE TABLE hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255),
    district VARCHAR(100),
    neighborhood VARCHAR(100),
    license_document VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Caregivers
DROP TABLE IF EXISTS caregivers;
CREATE TABLE caregivers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    district VARCHAR(100),
    neighborhood VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PETS
DROP TABLE IF EXISTS pets;
CREATE TABLE pets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(100),
    type VARCHAR(50),
    breed VARCHAR(100),
    age INT,
    vaccination_status TEXT,
    chip_id VARCHAR(100),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- SERVICES
DROP TABLE IF EXISTS services;
CREATE TABLE services (
    id INT AUTO_INCREMENT PRIMARY KEY,
    provider_id INT,
    service_type ENUM('VetClinic', 'HomeVet', 'Grooming', 'HomeGrooming', 'Hotel', 'Sitter'),
    title VARCHAR(255),
    description TEXT,
    price DECIMAL(10,2),
    location VARCHAR(255),
    working_hours VARCHAR(255),
    accepted_pet_types TEXT,
    capacity INT,
    available_from DATETIME,
    available_to DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- APPOINTMENTS
DROP TABLE IF EXISTS appointments;
CREATE TABLE appointments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pet_id INT,
    owner_id INT,
    service_id INT,
    appointment_datetime DATETIME,
    status ENUM('Pending', 'Confirmed', 'Cancelled', 'Completed'),
    request_note TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- REVIEWS
DROP TABLE IF EXISTS reviews;
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    appointment_id INT,
    rating INT CHECK (Rating >= 1 AND Rating <= 5),
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- AVAILABILITY
DROP TABLE IF EXISTS availability;
CREATE TABLE availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    service_type VARCHAR(100),
    date DATE,
    start_time TIME,
    end_time TIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- NOTIFICATIONS
DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    message TEXT,
    type ENUM('Reminder', 'Info', 'System'),
    is_read BOOLEAN DEFAULT FALSE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- DOCUMENTS
DROP TABLE IF EXISTS documents;
CREATE TABLE documents (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    document_type ENUM('License', 'Certificate'),
    file_path VARCHAR(255),
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PAYMENT INFO (Opsiyonel)
DROP TABLE IF EXISTS payment_info;
CREATE TABLE payment_info (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    card_last_4_digits VARCHAR(4),
    card_type VARCHAR(20),
    saved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);