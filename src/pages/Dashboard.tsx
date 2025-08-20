import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Edit, Trash2, Eye, Plus, Search, Filter } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { state, deletePortfolio } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTemplate, setFilterTemplate] = useState('all');

  const filteredPortfolios = state.portfolios.filter(portfolio => {
    const matchesSearch = portfolio.hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         portfolio.hero.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTemplate = filterTemplate === 'all' || portfolio.template === filterTemplate;
    return matchesSearch && matchesTemplate;
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this portfolio?')) {
      deletePortfolio(id);
    }
  };

  const handleEdit = (portfolio: any) => {
    navigate('/form', { state: { editPortfolio: portfolio } });
  };

  const handleView = (id: string) => {
    navigate(`/portfolio/${id}`);
  };

  const handleCreateNew = () => {
    navigate('/');
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Portfolios</h1>
            <p className="text-gray-600">Manage and view all your created portfolios</p>
          </div>
          <button
            onClick={handleCreateNew}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus size={18} />
            <span>Create New Portfolio</span>
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search portfolios by name or title..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="text-gray-400" size={20} />
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              value={filterTemplate}
              onChange={(e) => setFilterTemplate(e.target.value)}
            >
              <option value="all">All Templates</option>
              <option value="template1">Template 1</option>
              <option value="template2">Template 2</option>
            </select>
          </div>
        </div>
      </div>

      {/* Portfolios Grid */}
      {filteredPortfolios.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Plus className="text-gray-400" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No portfolios found</h3>
            <p className="text-gray-600 mb-6">
              {state.portfolios.length === 0 
                ? "You haven't created any portfolios yet. Start by creating your first portfolio!"
                : "No portfolios match your search criteria. Try adjusting your search or filters."
              }
            </p>
            {state.portfolios.length === 0 && (
              <button
                onClick={handleCreateNew}
                className="btn-primary flex items-center space-x-2 mx-auto"
              >
                <Plus size={18} />
                <span>Create Your First Portfolio</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPortfolios.map((portfolio) => (
            <div key={portfolio.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
              {/* Portfolio Image */}
              <div className="h-48 bg-gradient-to-br from-primary-100 to-secondary-100 relative">
                {portfolio.hero.profileImage && (
                  <img
                    src={portfolio.hero.profileImage}
                    alt={portfolio.hero.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    portfolio.template === 'template1' 
                      ? 'bg-primary-500 text-black' 
                      : 'bg-secondary-500 text-white'
                  }`}>
                    {portfolio.template === 'template1' ? 'Template 1' : 'Template 2'}
                  </span>
                </div>
              </div>

              {/* Portfolio Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{portfolio.hero.name}</h3>
                <p className="text-gray-600 mb-3">{portfolio.hero.title}</p>
                
                {portfolio.hero.tagline && (
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{portfolio.hero.tagline}</p>
                )}

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>{portfolio.skills.length} Skills</span>
                  <span>{portfolio.portfolio.length} Projects</span>
                  <span>{portfolio.services.length} Services</span>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleView(portfolio.id)}
                    className="flex-1 btn-secondary flex items-center justify-center space-x-2"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>
                  <button
                    onClick={() => handleEdit(portfolio)}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(portfolio.id)}
                    className="px-3 py-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                    title="Delete Portfolio"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Stats Summary */}
      {state.portfolios.length > 0 && (
        <div className="mt-8 bg-white rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Portfolio Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">{state.portfolios.length}</div>
              <div className="text-sm text-gray-600">Total Portfolios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-500">
                {state.portfolios.filter(p => p.template === 'template1').length}
              </div>
              <div className="text-sm text-gray-600">Template 1</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary-500">
                {state.portfolios.filter(p => p.template === 'template2').length}
              </div>
              <div className="text-sm text-gray-600">Template 2</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-500">
                {state.portfolios.reduce((total, p) => total + p.portfolio.length, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Projects</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
