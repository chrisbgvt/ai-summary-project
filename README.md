# AI News Summaries Platform

A full-stack application that automatically generates concise AI-powered news summaries twice a day and serves them through a REST API and a modern frontend interface.

---

## Demo

Below is a quick demo of the application in action:

![App Demo](./docs/demo.gif)

---

## AI Model

The system uses:

```
sshleifer/distilbart-cnn-12-6
```

A lightweight transformer model optimized for abstractive summarization.

---

## Backend (Laravel API)

The backend is responsible for:

* Storing generated summaries
* Serving API endpoints
* Running scheduled jobs
* Executing the Python summarization script - backend/scripts/

## Frontend (Next.js)

Features:

* News summaries list with pagination and filter by date
* Individual summary detail page
* Sidebar with summaries grouped by last 7 days
* Fast and responsive UI

---

## License

This project is open-source and available under the MIT License.
