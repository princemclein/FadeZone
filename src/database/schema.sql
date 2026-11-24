
CREATE DATABASE IF NOT EXISTS fadezone_db;
USE fadezone_db;

CREATE TABLE barbers (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    chair_code VARCHAR(20) UNIQUE NOT NULL,
    chair_label VARCHAR(50) NOT NULL,
    display_name VARCHAR(150) NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE admin_credentials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    singleton_key TINYINT NOT NULL DEFAULT 1 UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    failed_login_attempts INT NOT NULL DEFAULT 0,
    locked_until TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE bookings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    booking_code VARCHAR(20) NOT NULL UNIQUE,

    customer_name VARCHAR(100) NOT NULL,
    customer_mobile VARCHAR(20) NOT NULL,

    barber_id INT UNSIGNED NULL,
    preferred_barber BOOLEAN NOT NULL DEFAULT TRUE,

    haircut_style VARCHAR(100) NOT NULL,
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    customer_notes TEXT NULL,

    haircut_price DECIMAL(10, 2) NOT NULL DEFAULT 150.00,
    downpayment_amount DECIMAL(10, 2) NOT NULL DEFAULT 60.00,
    remaining_balance DECIMAL(10, 2) NOT NULL DEFAULT 90.00,

    gcash_reference VARCHAR(100) NULL,
    receipt_path VARCHAR(255) NULL,

    status ENUM('pending', 'approved', 'rejected')
        NOT NULL DEFAULT 'pending',

    rejection_reason TEXT NULL,
    admin_notes TEXT NULL,
    reviewed_at TIMESTAMP NULL DEFAULT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_bookings_barber
        FOREIGN KEY (barber_id)
        REFERENCES barbers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE
);
