const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname)));

// Helper function to save data to JSON file
function saveData(filename, data) {
  const filePath = path.join(__dirname, filename);
  let existingData = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    if (fileContent) {
      existingData = JSON.parse(fileContent);
    }
  }
  existingData.push(data);
  fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
}

// POST /api/contact route
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }
  const contactEntry = { name, email, message, receivedAt: new Date().toISOString() };
  try {
    saveData('contactData.json', contactEntry);
    res.json({ success: true, message: 'Contact form submitted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save contact data.' });
  }
});

// POST /api/appointment route
app.post('/api/appointment', (req, res) => {
  const { name, phone, email, service, date, time, message } = req.body;
  if (!name || !phone || !service || !date || !time) {
    return res.status(400).json({ success: false, message: 'Required fields are missing.' });
  }
  const appointmentEntry = { name, phone, email, service, date, time, message, receivedAt: new Date().toISOString() };
  try {
    saveData('appointmentData.json', appointmentEntry);
    res.json({ success: true, message: 'Appointment request submitted successfully.' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to save appointment data.' });
  }
});

// Route to serve index.html at /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
