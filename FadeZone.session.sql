ALTER TABLE bookings
    ADD INDEX idx_booking_schedule (booking_date, booking_time, barber_id),
    ADD INDEX idx_booking_status (status),
    ADD INDEX idx_booking_barber_date (barber_id, booking_date);

-- @block
SHOW INDEX FROM bookings;