import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import TemplateSelection from './pages/TemplateSelection';
import PortfolioForm from './pages/PortfolioForm';
import ProfessionalsList from './pages/ProfessionalsList';
import PortfolioView from './pages/PortfolioView';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';

function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<TemplateSelection />} />
              <Route path="/form" element={<PortfolioForm />} />
              <Route path="/professionals" element={<ProfessionalsList />} />
              <Route path="/portfolio/:id" element={<PortfolioView />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </main>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
