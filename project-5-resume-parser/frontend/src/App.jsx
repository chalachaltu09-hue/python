import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

// Layout
import Layout from './components/Layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import JobsPage from './pages/JobsPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Styles
import './App.css';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ThemeProvider>
            <LanguageProvider>
              <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                <Toaster 
                  position="top-right"
                  toastOptions={{
                    duration: 4000,
                    style: {
                      background: '#363636',
                      color: '#fff',
                    },
                  }}
                />
                
                <Routes>
                  <Route path="/" element={<Layout />}>
                    <Route index element={<HomePage />} />
                    <Route path="results/:id" element={<ResultsPage />} />
                    <Route path="jobs" element={<JobsPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="about" element={<AboutPage />} />
                    <Route path="contact" element={<ContactPage />} />
                  </Route>
                  
                  {/* Auth routes without layout */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                </Routes>
              </div>
            </LanguageProvider>
          </ThemeProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;