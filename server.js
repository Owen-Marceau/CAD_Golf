const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const app = express();
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();
const nodemailer = require('nodemailer');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT // 24642 or 3306
});
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

const cors = require('cors');
const e = require('express');

app.use(cors({
  origin: 'https://owen-marceau.github.io', // exact GitHub Pages URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

/*
const store = new MySQLStore({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.PORT // 24642 or 3306
});
app.use(session({
    store,
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false
}));
*/

app.use(express.static('public')); 


////////////////////////// REUSABLE FUNCTIONS LOGIC ///////////////////////////
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS
    }
});
function sendClientNotification(event, name, players, email){
    const mailOptions = {
        from: process.env.EMAIL_USER,  // Sender address
        to: "jackbaileywoods@gmail.com",                 // Receiver's email
        subject: 'New Booking', // Subject line
        html: `<p>Hi, a new booking was made from your website by ${name}.<br><br>Event: ${event}<br><br>Players: ${players.replace(/,,/g, ", ")}<br><br> Email: ${email}`,
        text: `Hi, a new booking was made from your website by ${name}.\n\nEvent: ${event}\n\nPlayers: ${players.replace(/,,/g, ", ")}\n\n Email: ${email}`,
    };
  
    // Send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Verification email sent:', info.response);
        }
    });
}
function isValidEmail(email){
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
///////////////////////////////////////////////////////////////////////////////


////////////////////////// APIS ROUTES //////////////////////////
app.post("/api/submit", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const team = req.body.player1 + ",," + req.body.player2 + ",," + req.body.player3;
    const event = JSON.parse(req.body.event);
    const getEventQuery = "select * from all_events where id = ?";
    db.query(getEventQuery, [event.id], (err, result) => {
        if(err){
            console.error("Error getting event: " + err);
        }

        if(result.length > 0){
            if(event.current_slots + Number(event.team_size) > event.max_slots){
                return res.json({ message: 'Limit Exceeded' });
            }
            const insertQuery = "insert into bookings (event_id, booking_name, email, phone, team) values (?, ?, ?, ?, ?);";
            db.query(insertQuery, [event.id, name, email, phone, team], (err, result) => {
                if(err){
                    console.error("Error inserting booking: " + err);
                    return res.json({ message: 'Failure in DB' });
                }

                const updateSlotsQuery = "update all_events set current_slots = ? where id = ?";
                db.query(updateSlotsQuery, [event.current_slots + Number(event.team_size), event.id], (err, result) => {
                    if(err){
                        console.error("Error updating slots: " + err);
                        return res.json({ message: 'Failure in DB (slots)' });
                    }


                    sendClientNotification(event.title, name, team, email);
                    return res.json({ message: "Success" });
                });
            });
        } else {
            return res.json({ message: 'Failure' });
        }
    });
});

app.post("/api/get-events", (req, res) => {
    let likeStr;
    if(req.body.month < 10){
        likeStr = "%" + req.body.year + "-0" + String(req.body.month) + "%";
    } else {
        likeStr = "%" + req.body.year + "-" + String(req.body.month) + "%";
    }

    const getBookingsQuery = "select * from all_events where event_date like ?";
    db.query(getBookingsQuery, [likeStr], (err, result) => {
        if(err){
            console.error("Error getting bookings: " + err);
            return res.json({ bookings: [] });
        }

        return res.json({ bookings: result });
    });
});
/////////////////////////////////////////////////////////////////



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});