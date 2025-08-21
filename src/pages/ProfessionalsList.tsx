import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { Search, MapPin, Star, Mail } from 'lucide-react';

const ProfessionalsList = () => {
  const navigate = useNavigate();
  const { state, setFilters } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const roles = ['All Professions', 'Flight Instructor', 'Software Engineer', 'AI Specialist'];
  const locations = ['All Locations', 'Miami, FL', 'Denver, CO', 'Seattle, WA', 'San Francisco, CA'];
  const sortOptions = ['Sort by Name', 'Sort by Experience', 'Sort by Rating'];

  useEffect(() => {
    // Apply filters when search or filters change
    const newFilters = {
      searchTerm,
      selectedRole: selectedRole === 'All Professions' ? '' : selectedRole,
      selectedLocation: selectedLocation === 'All Locations' ? '' : selectedLocation,
      sortBy
    };
    setFilters(newFilters);
  }, [searchTerm, selectedRole, selectedLocation, sortBy, setFilters]);

  const filteredProfessionals = state.professionals.filter(professional => {
    const matchesSearch = !searchTerm || 
      professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      professional.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesRole = !selectedRole || selectedRole === 'All Professions' || 
      professional.role === selectedRole;
    
    const matchesLocation = !selectedLocation || selectedLocation === 'All Locations' || 
      professional.location === selectedLocation;
    
    return matchesSearch && matchesRole && matchesLocation;
  });

  const sortedProfessionals = [...filteredProfessionals].sort((a, b) => {
    switch (sortBy) {
      case 'experience':
        return b.experience - a.experience;
      case 'rating':
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-primary-100 to-primary-200 rounded-2xl p-8 mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Professionals</h1>
        <p className="text-xl text-gray-700 mb-6">Meet the experts shaping the future of drone tech</p>
        <div className="w-24 h-1 bg-black mx-auto"></div>
        
        {/* List Profile Button */}
        <div className="absolute top-8 right-8">
          <button className="bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200">
            List your Profile
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-8">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search professionals..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-primary-100 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex gap-3">
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-4 py-3 bg-primary-100 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {roles.map((role) => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-3 bg-primary-100 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 bg-primary-100 border border-primary-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            {sortOptions.map((option) => (
              <option key={option} value={option.toLowerCase().replace('sort by ', '')}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Professionals Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sortedProfessionals.map((professional) => (
          <div key={professional.id} className="bg-primary-100 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <img
                src={professional.image}
                alt={professional.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
              />
            </div>

            {/* Name and Age */}
            <div className="text-center mb-3">
              <h3 className="text-lg font-bold text-gray-900">{professional.name}</h3>
              <p className="text-sm text-gray-600">26</p>
            </div>

            {/* Role Badge */}
            <div className="flex justify-center mb-3">
              <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                {professional.role}
              </span>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center text-sm text-gray-600 mb-3">
              <MapPin size={14} className="mr-1" />
              {professional.location}
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center mb-3">
              <div className="flex items-center space-x-1">
                {renderStars(professional.rating)}
                <span className="text-sm font-medium text-gray-700 ml-1">{professional.rating}</span>
              </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-gray-700 text-center mb-4 line-clamp-3">
              {professional.bio}
            </p>

            {/* Experience & Projects */}
            <div className="flex justify-between mb-4">
              <div className="bg-white rounded-lg px-3 py-2 text-center flex-1 mr-2">
                <p className="text-xs text-gray-600">Experience</p>
                <p className="text-sm font-bold text-gray-900">{professional.experience} years</p>
              </div>
              <div className="bg-white rounded-lg px-3 py-2 text-center flex-1 ml-2">
                <p className="text-xs text-gray-600">Projects</p>
                <p className="text-sm font-bold text-gray-900">{professional.projects}</p>
              </div>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1 mb-4">
              {professional.skills.slice(0, 2).map((skill, index) => (
                <span
                  key={index}
                  className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
              {professional.skills.length > 2 && (
                <span className="bg-white text-gray-700 px-2 py-1 rounded-full text-xs">
                  +{professional.skills.length - 2}
                </span>
              )}
            </div>

            {/* Contact Button */}
            <button
              onClick={() => navigate(`/portfolio/${professional.id}`)}
              className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Mail size={16} />
              <span>View Portfolio</span>
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {sortedProfessionals.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No professionals found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default ProfessionalsList;
