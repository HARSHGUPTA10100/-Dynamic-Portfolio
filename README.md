# 🚀 Dynamic Portfolio Generator

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.5-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3.3-green.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**Created by: [HARSHGUPTA10100](https://github.com/HARSHGUPTA10100)**

> A modern, responsive portfolio generator built with React + TypeScript that allows users to create stunning professional portfolios with multiple templates, comprehensive editing capabilities, and a powerful dashboard management system.

![Dynamic Portfolio Generator](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop&crop=center)

## ✨ Features

### 🎨 **Template Selection**
- **2 Professional Templates**: Choose between modern portfolio layouts
- **Live Preview**: See your portfolio before customization
- **Template Switching**: Change templates anytime

### 📝 **Multi-Section Portfolio Creation**
- **Hero Section**: Name, title, tagline, and profile photo
- **About Section**: Bio, contact information, and location
- **Skills Management**: Add/edit skills with proficiency percentages
- **Services Showcase**: Up to 3 professional services
- **Portfolio Projects**: Showcase your work with images and tech stacks
- **Testimonials**: Client reviews and feedback
- **Blog Section**: Professional insights and articles
- **Contact Information**: Multiple contact methods

### 🖼️ **Advanced Photo Management**
- **File Upload**: Direct image upload from device
- **URL Input**: Add images via web URLs
- **Image Preview**: See photos before saving
- **Easy Removal**: Delete photos with one click

### 💼 **Experience & Skills Tracking**
- **Years of Experience**: Track professional experience
- **Skill Percentages**: Visual progress bars for skills
- **Dynamic Skill Addition**: Add unlimited skills
- **Real-time Updates**: Live preview of changes

### 📊 **Dashboard Management**
- **Portfolio Overview**: View all created portfolios
- **Search & Filter**: Find portfolios by name, title, or template
- **Quick Actions**: View, Edit, or Delete portfolios
- **Statistics Dashboard**: Track portfolio metrics

### 🔧 **Enhanced Editing**
- **Pre-filled Forms**: Edit existing portfolios seamlessly
- **Auto-save**: Changes saved automatically
- **Validation**: Form validation for better user experience
- **Responsive Design**: Works on all devices

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 16.0 or higher)
- **npm** (version 7.0 or higher)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/HARSHGUPTA10100/-Dynamic-Portfolio.git
   cd -Dynamic-Portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 📂 Project Structure

```
dynamic-portfolio-generator/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   └── Navigation.tsx          # Main navigation component
│   ├── context/
│   │   └── PortfolioContext.tsx    # Global state management
│   ├── pages/
│   │   ├── Dashboard.tsx           # Portfolio management dashboard
│   │   ├── PortfolioForm.tsx       # Multi-section form
│   │   ├── PortfolioView.tsx       # Dynamic portfolio display
│   │   ├── ProfessionalsList.tsx   # Browse professionals
│   │   └── TemplateSelection.tsx   # Template chooser
│   ├── types/
│   │   └── index.ts               # TypeScript interfaces
│   ├── App.tsx                    # Main app component
│   ├── main.tsx                   # App entry point
│   └── index.css                  # Global styles & Tailwind
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🎯 Usage Guide

### Creating Your First Portfolio

1. **Choose a Template**
   - Navigate to the home page
   - Select from available templates
   - Click "Customize" to start

2. **Fill Portfolio Sections**
   - **Basic Details**: Company name and personal info
   - **Hero Section**: Professional title and photo
   - **About**: Bio and location details
   - **Skills**: Add skills with proficiency levels
   - **Services**: List your professional services
   - **Projects**: Showcase your work
   - **Testimonials**: Add client feedback
   - **Contact**: Set up contact information

3. **Save and View**
   - Click "Save Portfolio" when ready
   - View your live portfolio
   - Share the URL with others

### Managing Portfolios

1. **Access Dashboard**
   - Click "Dashboard" in navigation
   - View all your portfolios

2. **Portfolio Actions**
   - **View**: See the live portfolio
   - **Edit**: Modify portfolio content
   - **Delete**: Remove unwanted portfolios

3. **Search and Filter**
   - Search by name or title
   - Filter by template type
   - Sort portfolios as needed

## 🎨 Design System

### Color Palette
- **Primary**: Yellow (#eab308) - Bright, professional accents
- **Secondary**: Red (#ef4444) - Action buttons and highlights
- **Gray Scale**: Modern gray tones for text and backgrounds

### Typography
- **Font Family**: Inter - Clean, modern sans-serif
- **Font Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components
- **Cards**: Clean white background with subtle shadows
- **Buttons**: Primary (red) and Secondary (yellow) variants
- **Form Fields**: Consistent styling with focus states
- **Navigation**: Clean, responsive navigation bar

## 🛠️ Technologies Used

### Frontend
- **[React 18.2.0](https://reactjs.org/)** - UI library
- **[TypeScript 5.0.2](https://www.typescriptlang.org/)** - Type safety
- **[React Router 6.8.1](https://reactrouter.com/)** - Client-side routing
- **[TailwindCSS 3.3.3](https://tailwindcss.com/)** - Utility-first CSS
- **[Lucide React](https://lucide.dev/)** - Modern icon library

### Development Tools
- **[Vite 4.4.5](https://vitejs.dev/)** - Fast build tool
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io/)** - CSS vendor prefixes

### State Management
- **React Context API** - Global state management
- **useReducer Hook** - Complex state logic
- **Local Storage** - Persistent data storage

## 🌟 Key Features Breakdown

### 📸 Photo Management
```typescript
// Upload from device
const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
  const file = event.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setProfileImage(result);
    };
    reader.readAsDataURL(file);
  }
};
```

### 🎯 Skills Management
```typescript
// Add skills with percentages
const addSkill = () => {
  if (newSkill.name.trim()) {
    addArrayItem('skills', {
      id: Date.now().toString(),
      name: newSkill.name,
      percentage: newSkill.percentage
    });
    setNewSkill({ name: '', percentage: 70 });
  }
};
```

### 📊 Dashboard Analytics
- Portfolio count tracking
- Template usage statistics
- Project metrics overview
- Search and filtering capabilities

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use meaningful component and variable names
- Add proper TypeScript interfaces
- Maintain responsive design principles
- Test on multiple devices and browsers

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**HARSHGUPTA10100**
- GitHub: [@HARSHGUPTA10100](https://github.com/HARSHGUPTA10100)
- Repository: [Dynamic Portfolio Generator](https://github.com/HARSHGUPTA10100/-Dynamic-Portfolio)

## 🙏 Acknowledgments

- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **Lucide** for the beautiful icon set
- **Vite** for the lightning-fast build tool
- **TypeScript** for making JavaScript better
- **Unsplash** for providing beautiful stock images

## 📞 Support

If you have any questions or run into issues, please:

1. Check the [Issues](https://github.com/HARSHGUPTA10100/-Dynamic-Portfolio/issues) page
2. Create a new issue if your problem isn't listed
3. Provide detailed information about your environment and the issue

## 🔮 Future Enhancements

- [ ] More portfolio templates
- [ ] Dark mode support
- [ ] PDF export functionality
- [ ] Social media integration
- [ ] Analytics dashboard
- [ ] SEO optimization
- [ ] Multi-language support
- [ ] Advanced theming options

---

**⭐ If you found this project helpful, please give it a star on GitHub!**

**🚀 Built with ❤️ by [HARSHGUPTA10100](https://github.com/HARSHGUPTA10100)**