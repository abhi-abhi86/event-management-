# Event Volunteer Management System

A polished, single-page client-side simulation dashboard for managing event volunteers and registrations. Built with Node.js, Express, Tailwind CSS, Lucide Icons, and Chart.js.

## Key Features

1. **Dual Dashboard Interface**:
   * **Admin View**: Access to system-wide metrics, live visual analytics (doughnut and bar charts), active volunteer status controls, CSV exporting, and new volunteer registration forms.
   * **Volunteer View**: View-only personal dashboard highlighting "My Registrations" with status alerts.
2. **Global Dark Mode**: Smooth transitioning Sun/Moon toggles on all panels with preferences saved to local storage.
3. **Interactive Charts (Admin)**: Interactive status distribution doughnut and volunteer role bar chart rendering via Chart.js.
4. **Impact Tracker & Gamification (Volunteer)**: Circular progress ring representing community impact score points and earned level badges.
5. **Event Registrations HUD (Admin)**: View registrations list, update status (Approve/Reject), search/filter by event/email, and add or delete registrations.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (Node.js v14+ recommended).

### Running the Application

There are two ways to start the server:

#### Option 1: Running the bash script
You can execute the automated script directly from the project directory. It installs dependencies if missing and starts the Express server:
```bash
./run_app.sh
```

#### Option 2: Running manually
Alternatively, install dependencies and start the Node application:
```bash
# Install Express package dependencies
npm install

# Run the local server
node server.js
```

Once started, open your browser and navigate to:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## Logins & Testing Credentials

The dashboard uses client-side simulated auth state stored in `localStorage`. Enter any email address to login:

1. **Admin Login**:
   * Switch the login tab to **Admin Login**.
   * Enter an email (e.g. `admin@example.com`) and any password, then click **Sign In**.
2. **Volunteer Login**:
   * Keep login tab on **Volunteer Login**.
   * Enter any email (e.g. `volunteer1@example.com` or custom) and any password, then click **Sign In**.
