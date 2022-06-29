use hotel;

db.dropDatabase();

db.bookings.insertMany(
    [
        {
            guest_name: "Micheal",
            guest_email_address: "micheal@gmail.com",
            check_in_status: false
        },
        {
            guest_name: "Cammy",
            guest_email_address: "cammy@gmail.com",
            check_in_status: true
        },
        {
            guest_name: "Josh",
            guest_email_address: "josh@gmail.com",
            check_in_status: true
        }
    ]
)