# 📝 Daily Journal Project

A modern, feature-rich journaling web application built with React, Vite, and Tailwind CSS. Capture your thoughts, track your moods, and organize your entries with ease.

---

## 🚀 Features

- **Create, Edit, and Delete Journal Entries**  
  Add new entries with title, content, date, mood, category, and tags. Edit or delete existing entries at any time.

- **Draft Auto-Save**  
  Your work is automatically saved as a draft while you type, so you never lose your progress.

- **Tagging & Filtering**  
  Add up to 3 tags per entry. Filter and search your entries by keyword, category, or mood.

- **Mood Tracking**  
  Select an emoji to represent your mood for each entry.

- **Trash & Restore**  
  Deleted entries are moved to Trash, where you can restore or permanently delete them.

- **Statistics & Calendar View**  
  Visualize your journaling habits and moods over time.

- **Dark/Light Theme**  
  Switch between dark and light modes. Your preference is saved automatically.

---

## 📦 Tech Stack

- **Frontend:** React 19, Vite, Tailwind CSS
- **State Management:** React Context + Reducer
- **Forms:** react-hook-form
- **Icons:** react-icons
- **Linting:** ESLint

---

## 🖥️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd DailyJournalProject
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will be available at [http://localhost:5173](http://localhost:5173) (or as indicated in your terminal).

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Preview the production build:**
   ```bash
   npm run preview
   ```

---

## 🗂️ Project Structure


## 📝 Usage Guide

### Add a New Entry

- Click the **"New Entry"** button.
- Fill in the title, date, category, mood, content, and up to 3 tags.
- Your entry is auto-saved as a draft.
- Click **"Save Entry"** to add it to your journal.

### Edit an Entry

- Click on an entry and select **"Edit"**.
- Update the fields and click **"Update Entry"**.

### Delete & Restore

- Click the **"Delete"** button on an entry to move it to Trash.
- Go to the **Trash** page to restore or permanently delete entries.

### Filter & Search

- Use the search bar and filters on the main page to find entries by keyword, category, or mood.

### Theme

- Toggle between dark and light mode from the navigation bar.

---

## ⚙️ Configuration

- **Theme and journal data** are stored in your browser's localStorage for persistence.
- **No backend required**—all data is local to your device.

---

## 🧑‍💻 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

---

## 🛡️ License

This project is licensed under the MIT License.

---

## 📋 Roadmap / To-Do

- [ ] Improve form validation and error messages
- [ ] Add unit and integration tests
- [ ] Export/import journal data
- [ ] Add user authentication (optional)
- [ ] Mobile app version

---

## 🙏 Acknowledgements

- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [react-hook-form](https://react-hook-form.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

---

> _Happy journaling!_