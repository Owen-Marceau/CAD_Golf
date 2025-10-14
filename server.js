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

app.use(express.static('docs')); 


////////////////////////// REUSABLE FUNCTIONS LOGIC ///////////////////////////
async function sendEmail(userEmail, text) {
    const dataToSend = { reciever: userEmail, text: text, service: 'nextdesign' };
    try {
        const response = await fetch('https://email-sender-lkex.vercel.app/api/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
            },
            body: JSON.stringify(dataToSend), 
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', errorData.error);
            return;
        }
    } catch (error) {
        console.error('Error posting data:', error);
    }
}
function sendClientNotification(event, name, players, email){
    sendEmail("jackbaileywoods@gmail.com", `<p>Hi, a new booking was made from your website by ${name}.<br><br>Event: ${event}<br><br>Players: ${players.replace(/,,/g, ", ")}<br><br> Email: ${email}`)
}
function isValidEmail(email){
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}


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



app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});