# Faisal Fida - Portfolio Website

A modern, responsive portfolio website showcasing my work as a Python Developer, built with React, TypeScript, and Vite. Features dynamic content management, interactive project showcases, and integrated contact functionality.

🌐 **Live Demo**: [faisal.is-a.dev](https://faisal.is-a.dev)

![Portfolio Preview](https://github.com/user-attachments/assets/abb7a81e-d6ce-4274-9787-ab4054e6512f)

## ✨ Features

### 🏠 **Home Section**
- Personal introduction with animated elements
- Social media integration (GitHub, LinkedIn, Medium)
- Smooth scroll navigation

### 🎯 **Skills & About**
- Categorized skill showcase with interactive logos
- Resume view and download functionality
- Real-time skill proficiency display

### 💼 **Services**
- Backend Development
- Machine Learning Solutions
- Generative AI Applications

### 📊 **Portfolio**
- Interactive project filtering by categories:
  - Backend Development
  - Machine Learning
  - Generative AI
  - Web Scraping
- Modal-based project details with navigation
- Technology stack visualization
- Direct links to GitHub repositories and live demos

### 💬 **Contact System**
- EmailJS-powered contact form
- Multiple inquiry types:
  - Onsite Job Opportunities
  - Remote Project Work
  - Freelance Assignments
- Real-time form validation and submission feedback

### 📝 **Additional Sections**
- Professional experience timeline
- Client testimonials
- Blog integration
- Responsive design across all devices

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - UI library with hooks and modern patterns
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with responsive design

### **UI & Components**
- **React Icons** - Comprehensive icon library
- **React Slick** - Carousel/slider functionality
- **Swiper** - Touch-enabled sliders
- **React Tabs** - Interactive tab components

### **Data Management**
- **SWR** - Data fetching with caching, revalidation, and offline support
- **JSON-based content** - Easy content management through data files

### **Integrations**
- **EmailJS** - Contact form email delivery
- **Vercel Analytics** - Performance and user analytics
- **Vercel Speed Insights** - Core Web Vitals monitoring

### **Development Tools**
- **ESLint** - Code linting and formatting
- **TypeScript** - Static type checking

### **Deployment**
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static site hosting
- **Custom Domain** - Professional domain setup

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/faisal-fida/faisal-fida.github.io.git
   cd faisal-fida.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE=your_emailjs_service_id
   VITE_EMAILJS_TEMPLATE=your_emailjs_template_id  
   VITE_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   Navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/
│   ├── home/          # Landing section components
│   ├── about/         # Skills and about section
│   ├── services/      # Services offered
│   ├── resume/        # Experience timeline
│   ├── portfolio/     # Project showcase with filtering
│   ├── testimonials/  # Client testimonials
│   ├── blog/          # Blog posts display
│   └── contact/       # Contact form with EmailJS
├── styles/            # Global and component styles
├── utils/             # Utility functions and SWR config
├── App.tsx            # Main application component
└── main.tsx           # Application entry point

public/
├── data/              # JSON data files for content
│   ├── home.json      # Personal info and social links
│   ├── about.json     # Skills and resume information
│   ├── project.json   # Portfolio projects data
│   ├── service.json   # Services offered
│   ├── experience.json # Work experience
│   ├── testimonial.json # Client testimonials
│   └── blog.json      # Blog posts
└── assets/            # Images and static assets
```

## ⚙️ Configuration

### **Content Management**
All content is managed through JSON files in the `public/data/` directory:

- **home.json**: Personal information and social media links
- **about.json**: Skills categorization and resume links
- **project.json**: Portfolio projects with tech stacks and descriptions
- **service.json**: Professional services offered
- **experience.json**: Work experience and achievements
- **testimonial.json**: Client testimonials and feedback
- **blog.json**: Blog posts and articles

### **EmailJS Setup**
1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service and template
3. Add your credentials to environment variables
4. Configure the contact form template to match your needs

### **Analytics Configuration**
The site includes Vercel Analytics and Speed Insights for performance monitoring. These work automatically when deployed to Vercel or can be configured for other platforms.

## 🔧 Development Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## 🚀 Deployment

The project uses GitHub Actions for automatic deployment to GitHub Pages:

1. **Automatic Deployment**: Push to `master` branch triggers CI/CD pipeline
2. **Build Process**: Runs linting, builds the project, and deploys to GitHub Pages
3. **Environment Variables**: Set up secrets in GitHub repository settings:
   - `VITE_EMAILJS_SERVICE`
   - `VITE_EMAILJS_TEMPLATE`
   - `VITE_EMAILJS_PUBLIC_KEY`

### Manual Deployment
```bash
npm run build
# Upload dist/ folder to your hosting provider
```

## 🎨 Customization

### **Adding New Projects**
1. Add project data to `public/data/project.json`
2. Include project images in `public/assets/`
3. Update filtering categories if needed

### **Updating Skills**
1. Modify `public/data/about.json`
2. Add new skill logos to the image mapping
3. Update skill categories as needed

### **Styling**
- Global styles: `src/index.css`
- Component styles: Individual `.css` files in component directories
- Responsive breakpoints and color schemes defined in CSS custom properties

## 🔍 Key Features Implementation

### **Project Filtering**
Advanced filtering system with category-based project display and smooth transitions.

### **SWR Data Fetching**
Efficient data management with caching, automatic revalidation, and offline support.

### **Responsive Design**
Mobile-first approach with breakpoints for tablet and desktop viewing.

### **Performance Optimization**
- Lazy loading for images
- Code splitting
- Optimized bundle size
- Core Web Vitals monitoring

## 📧 Contact

For questions, suggestions, or collaboration opportunities:

- **Website**: [faisal.is-a.dev](https://faisal.is-a.dev)
- **GitHub**: [@faisal-fida](https://github.com/faisal-fida)
- **LinkedIn**: [faisal-fida](https://linkedin.com/in/faisal-fida)
- **Medium**: [@faisal-fida](https://medium.com/@faisal-fida)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

⭐ **Star this repository if you found it helpful!**
