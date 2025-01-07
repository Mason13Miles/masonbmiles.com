const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/increment-like', (req, res) => {
    likeCount += 1;
    res.json({ likeCount });
});

app.post('/submit-feedback', async (req, res) => {
    const { feedbackType, feedback, email, 'g-recaptcha-response': recaptchaToken } = req.body;

    // Verify reCAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    try {
        const response = await fetch(verificationURL, { method: 'POST' });
        const data = await response.json();

        if (data.success) {
            // Handle the feedback submission (e.g., save to database, send email, etc.)
            console.log('Feedback received:', { feedbackType, feedback, email });
            res.status(200).send('Feedback submitted successfully.');
        } else {
            res.status(400).send('reCAPTCHA verification failed.');
        }
    } catch (error) {
        console.error('Error verifying reCAPTCHA:', error);
        res.status(500).send('Internal server error.');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
