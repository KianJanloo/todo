# 📝 Enhanced Todo App

A modern, feature-rich todo application built with Next.js 15, React 19, and TypeScript. This productivity manager helps you organize tasks with advanced filtering, categorization, and tracking capabilities.

## 🌐 Live Demo

**[View Live Application](https://todo-kian.netlify.app/)**

## ✨ Features

### 🎯 Core Functionality
- **Task Management**: Create, edit, delete, and complete tasks
- **Smart Categorization**: Organize tasks across 6 categories (Work, Study, Personal, Health, Finance, Hobby)
- **Priority Levels**: Set task priorities (Low, Medium, High, Urgent)
- **Due Dates**: Track deadlines and overdue tasks
- **Tags System**: Add custom tags for better organization
- **Task Descriptions**: Add detailed descriptions to tasks

### 🔍 Advanced Features
- **Smart Search**: Search across task titles, descriptions, and tags
- **Multiple Filters**: Filter by status (All, Active, Completed, Archived, Overdue)
- **Flexible Sorting**: Sort by creation date, due date, priority, category, or alphabetically
- **Quick Add**: One-click task creation with predefined templates
- **Task Statistics**: Comprehensive progress tracking and analytics
- **Export/Import**: Backup and restore your tasks via JSON files
- **Bulk Operations**: Clear completed tasks with one click

### 🎨 User Experience
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Toast Notifications**: Real-time feedback for all actions
- **Local Storage**: Data persists across browser sessions
- **Intuitive UI**: Clean, modern interface with smooth animations

### 📊 Analytics & Insights
- **Progress Tracking**: Visual progress indicators and completion rates
- **Category Breakdown**: Detailed statistics for each task category
- **Task Counts**: Total, completed, and remaining task counts
- **Overdue Detection**: Automatic identification of overdue tasks

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)
- **Deployment**: [Netlify](https://netlify.com/)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/KianJanloo/todo-app.git
   cd todo-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── EnhancedTodoApp.tsx    # Main application component
│   ├── EnhancedTodoForm.tsx   # Task creation/editing form
│   ├── EnhancedTodoItem.tsx   # Individual task component
│   ├── Header.tsx             # Application header
│   ├── Sidebar.tsx            # Navigation sidebar
│   ├── SearchBar.tsx          # Search functionality
│   ├── TodoStats.tsx          # Statistics display
│   ├── ThemeToggle.tsx        # Theme switcher
│   ├── ToastProvider.tsx      # Notification provider
│   └── UserMenu.tsx           # User menu component
├── contexts/              # React contexts
│   └── ThemeContext.tsx   # Theme management
└── types/                 # TypeScript type definitions
    └── todo.ts            # Todo-related types
```

## 🎯 Usage

### Creating Tasks
1. **Quick Add**: Use the main input field for fast task creation
2. **Detailed Add**: Click "More options" to add descriptions, due dates, and tags
3. **Quick Templates**: Use predefined quick-add buttons for common tasks

### Organizing Tasks
- **Categories**: Assign tasks to Work, Study, Personal, Health, Finance, or Hobby
- **Priorities**: Set urgency levels from Low to Urgent
- **Tags**: Add custom tags for cross-category organization
- **Due Dates**: Set deadlines to track time-sensitive tasks

### Managing Tasks
- **Search**: Use the search bar to find specific tasks
- **Filter**: Use sidebar filters to view tasks by status or category
- **Sort**: Choose from multiple sorting options
- **Archive**: Archive completed tasks to keep your active list clean
- **Export**: Download your tasks as JSON for backup

## 🔧 Configuration

### Environment Variables
No environment variables are required for basic functionality. The app uses local storage for data persistence.

### Customization
- **Categories**: Modify the `CATEGORIES` array in `EnhancedTodoForm.tsx`
- **Priorities**: Update the `PRIORITIES` array in `EnhancedTodoForm.tsx`
- **Quick Tasks**: Customize quick-add suggestions in `EnhancedTodoForm.tsx`
- **Styling**: Modify Tailwind classes throughout components

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Kian Janloo**
- GitHub: [@KianJanloo](https://github.com/KianJanloo)
- Live Demo: [https://todo-kian.netlify.app/](https://todo-kian.netlify.app/)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React Icons](https://react-icons.github.io/react-icons/) for the beautiful icon set
- [React Hot Toast](https://react-hot-toast.com/) for the elegant notifications

---

⭐ **Star this repository if you found it helpful!**