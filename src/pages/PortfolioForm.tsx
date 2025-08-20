import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData } from '../types/index';
import { Plus, X, Save, Upload, Edit, Trash2 } from 'lucide-react';

const PortfolioForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addPortfolio, updatePortfolio } = usePortfolio();
  
  const selectedTemplate = location.state?.selectedTemplate || 'template1';
  const editPortfolio = location.state?.editPortfolio;
  const [activeSection, setActiveSection] = useState('basic');
  const [formData, setFormData] = useState<PortfolioData>({
    id: '',
    template: selectedTemplate as 'template1' | 'template2',
    hero: {
      name: '',
      title: '',
      tagline: '',
      profileImage: ''
    },
    about: {
      bio: '',
      email: '',
      phone: '',
      location: '',
      socials: {}
    },
    skills: [],
    services: [],
    portfolio: [],
    testimonials: [],
    blog: {
      title: '',
      summary: ''
    },
    contact: {
      message: '',
      email: '',
      phone: ''
    }
  });

  const [experience, setExperience] = useState(0);
  const [newSkill, setNewSkill] = useState({ name: '', percentage: 70 });

  // Load existing portfolio data if editing
  useEffect(() => {
    if (editPortfolio) {
      setFormData(editPortfolio);
      setActiveSection('basic');
    }
  }, [editPortfolio]);

  const sections = [
    { id: 'basic', label: 'Basic Details' },
    { id: 'hero', label: 'Header & Hero' },
    { id: 'about', label: 'About Section' },
    { id: 'skills', label: 'Skills & Experience' },
    { id: 'services', label: 'Services' },
    { id: 'products', label: 'Products' },
    { id: 'testimonials', label: 'Clients & Testimonials' },
    { id: 'contact', label: 'Contact' },
    { id: 'footer', label: 'Footer' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev[section as keyof PortfolioData] as any),
        [field]: value
      }
    }));
  };

  const handleArrayChange = (section: string, items: any[]) => {
    setFormData(prev => ({
      ...prev,
      [section]: items
    }));
  };

  const addArrayItem = (section: string, newItem: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: [...(prev[section as keyof PortfolioData] as any[]), newItem]
    }));
  };

  const removeArrayItem = (section: string, index: number) => {
    setFormData(prev => ({
      ...prev,
      [section]: (prev[section as keyof PortfolioData] as any[]).filter((_, i) => i !== index)
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        handleInputChange('hero', 'profileImage', result);
      };
      reader.readAsDataURL(file);
    }
  };

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

  const updateSkill = (index: number, field: string, value: any) => {
    const newSkills = [...formData.skills];
    newSkills[index] = { ...newSkills[index], [field]: value };
    handleArrayChange('skills', newSkills);
  };

  const handleSave = () => {
    if (editPortfolio) {
      // Update existing portfolio
      updatePortfolio(formData);
      navigate(`/portfolio/${formData.id}`);
    } else {
      // Create new portfolio
      const portfolioWithId = {
        ...formData,
        id: Date.now().toString()
      };
      addPortfolio(portfolioWithId);
      navigate(`/portfolio/${portfolioWithId.id}`);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'basic':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Basic Company Details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your company name (used in URL)
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your company name (used in URL)"
                  value={formData.hero.name}
                  onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="John Doe"
                  value={formData.hero.name}
                  onChange={(e) => handleInputChange('hero', 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={formData.about.email}
                  onChange={(e) => handleInputChange('about', 'email', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="input-field"
                  placeholder="+91 9876543210"
                  value={formData.about.phone}
                  onChange={(e) => handleInputChange('about', 'phone', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'hero':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Hero Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Professional Title"
                  value={formData.hero.title}
                  onChange={(e) => handleInputChange('hero', 'title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tagline</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="Your professional tagline"
                  value={formData.hero.tagline}
                  onChange={(e) => handleInputChange('hero', 'tagline', e.target.value)}
                />
              </div>
              
              {/* Profile Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo</label>
                <div className="space-y-4">
                  {formData.hero.profileImage && (
                    <div className="flex items-center space-x-4">
                      <img
                        src={formData.hero.profileImage}
                        alt="Profile"
                        className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                      />
                      <button
                        onClick={() => handleInputChange('hero', 'profileImage', '')}
                        className="text-red-500 hover:text-red-700 flex items-center space-x-1"
                      >
                        <Trash2 size={16} />
                        <span>Remove</span>
                      </button>
                    </div>
                  )}
                  <div className="flex items-center space-x-4">
                    <label className="cursor-pointer bg-primary-100 hover:bg-primary-200 text-gray-700 px-4 py-2 rounded-lg border border-primary-300 flex items-center space-x-2 transition-colors duration-200">
                      <Upload size={16} />
                      <span>Upload Photo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-sm text-gray-500">or</span>
                    <input
                      type="url"
                      className="input-field flex-1"
                      placeholder="Enter image URL"
                      value={formData.hero.profileImage}
                      onChange={(e) => handleInputChange('hero', 'profileImage', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">About Section</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Tell us about yourself..."
                  value={formData.about.bio}
                  onChange={(e) => handleInputChange('about', 'bio', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="City, State"
                  value={formData.about.location}
                  onChange={(e) => handleInputChange('about', 'location', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      case 'skills':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Skills & Experience</h2>
            
            {/* Experience Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Experience</h3>
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Years of Experience:</label>
                <input
                  type="number"
                  min="0"
                  max="50"
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={experience}
                  onChange={(e) => setExperience(parseInt(e.target.value) || 0)}
                />
                <span className="text-sm text-gray-600">years</span>
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
              
              {/* Add New Skill */}
              <div className="card">
                <h4 className="text-md font-medium text-gray-800 mb-3">Add New Skill</h4>
                <div className="flex space-x-3">
                  <input
                    type="text"
                    className="input-field flex-1"
                    placeholder="Skill name (e.g., React, JavaScript)"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <input
                    type="number"
                    min="0"
                    max="100"
                    className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="%"
                    value={newSkill.percentage}
                    onChange={(e) => setNewSkill(prev => ({ ...prev, percentage: parseInt(e.target.value) || 0 }))}
                  />
                  <button
                    onClick={addSkill}
                    className="btn-secondary flex items-center space-x-2"
                  >
                    <Plus size={16} />
                    <span>Add</span>
                  </button>
                </div>
              </div>

              {/* Existing Skills */}
              <div className="space-y-3">
                {formData.skills.map((skill, index) => (
                  <div key={skill.id} className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-md font-medium text-gray-800">Skill {index + 1}</h4>
                      <button
                        onClick={() => removeArrayItem('skills', index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Skill Name</label>
                        <input
                          type="text"
                          className="input-field"
                          value={skill.name}
                          onChange={(e) => updateSkill(index, 'name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Percentage</label>
                        <input
                          type="number"
                          min="0"
                          max="100"
                          className="input-field"
                          value={skill.percentage}
                          onChange={(e) => updateSkill(index, 'percentage', parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{skill.name}</span>
                        <span>{skill.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'services':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Services</h2>
            <div className="space-y-4">
              {formData.services.map((service, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Service {index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem('services', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Service Title"
                      value={service.title}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].title = e.target.value;
                        handleArrayChange('services', newServices);
                      }}
                    />
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Service Description"
                      value={service.description}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].description = e.target.value;
                        handleArrayChange('services', newServices);
                      }}
                    />
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Service Icon (emoji or icon name)"
                      value={service.icon}
                      onChange={(e) => {
                        const newServices = [...formData.services];
                        newServices[index].icon = e.target.value;
                        handleArrayChange('services', newServices);
                      }}
                    />
                  </div>
                </div>
              ))}
              {formData.services.length < 3 && (
                <button
                  onClick={() => addArrayItem('services', { id: Date.now().toString(), title: '', description: '', icon: '' })}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Service</span>
                </button>
              )}
            </div>
          </div>
        );

      case 'products':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Portfolio Projects</h2>
            <div className="space-y-4">
              {formData.portfolio.map((project, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Project {index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem('portfolio', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Project Title"
                      value={project.title}
                      onChange={(e) => {
                        const newProjects = [...formData.portfolio];
                        newProjects[index].title = e.target.value;
                        handleArrayChange('portfolio', newProjects);
                      }}
                    />
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Project Description"
                      value={project.description}
                      onChange={(e) => {
                        const newProjects = [...formData.portfolio];
                        newProjects[index].description = e.target.value;
                        handleArrayChange('portfolio', newProjects);
                      }}
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="url"
                        className="input-field"
                        placeholder="Project Image URL"
                        value={project.image}
                        onChange={(e) => {
                          const newProjects = [...formData.portfolio];
                          newProjects[index].image = e.target.value;
                          handleArrayChange('portfolio', newProjects);
                        }}
                      />
                      <input
                        type="url"
                        className="input-field"
                        placeholder="Project Link (optional)"
                        value={project.link || ''}
                        onChange={(e) => {
                          const newProjects = [...formData.portfolio];
                          newProjects[index].link = e.target.value;
                          handleArrayChange('portfolio', newProjects);
                        }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Technologies Used</label>
                      <input
                        type="text"
                        className="input-field"
                        placeholder="React, TypeScript, TailwindCSS (comma separated)"
                        value={project.technologies.join(', ')}
                        onChange={(e) => {
                          const newProjects = [...formData.portfolio];
                          newProjects[index].technologies = e.target.value.split(',').map(tech => tech.trim()).filter(tech => tech);
                          handleArrayChange('portfolio', newProjects);
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {formData.portfolio.length < 3 && (
                <button
                  onClick={() => addArrayItem('portfolio', { id: Date.now().toString(), title: '', description: '', image: '', technologies: [], link: '' })}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Project</span>
                </button>
              )}
            </div>
          </div>
        );

      case 'testimonials':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
            <div className="space-y-4">
              {formData.testimonials.map((testimonial, index) => (
                <div key={index} className="card">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">Testimonial {index + 1}</h3>
                    <button
                      onClick={() => removeArrayItem('testimonials', index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Client Name"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials];
                          newTestimonials[index].name = e.target.value;
                          handleArrayChange('testimonials', newTestimonials);
                        }}
                      />
                      <input
                        type="text"
                        className="input-field"
                        placeholder="Client Role"
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...formData.testimonials];
                          newTestimonials[index].role = e.target.value;
                          handleArrayChange('testimonials', newTestimonials);
                        }}
                      />
                    </div>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Company"
                      value={testimonial.company}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].company = e.target.value;
                        handleArrayChange('testimonials', newTestimonials);
                      }}
                    />
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Testimonial Content"
                      value={testimonial.content}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].content = e.target.value;
                        handleArrayChange('testimonials', newTestimonials);
                      }}
                    />
                    <input
                      type="url"
                      className="input-field"
                      placeholder="Client Avatar URL (optional)"
                      value={testimonial.avatar}
                      onChange={(e) => {
                        const newTestimonials = [...formData.testimonials];
                        newTestimonials[index].avatar = e.target.value;
                        handleArrayChange('testimonials', newTestimonials);
                      }}
                    />
                  </div>
                </div>
              ))}
              {formData.testimonials.length < 3 && (
                <button
                  onClick={() => addArrayItem('testimonials', { id: Date.now().toString(), name: '', role: '', company: '', content: '', avatar: '' })}
                  className="btn-secondary flex items-center space-x-2"
                >
                  <Plus size={18} />
                  <span>Add Testimonial</span>
                </button>
              )}
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Message</label>
                <textarea
                  className="input-field"
                  rows={4}
                  placeholder="Your contact message"
                  value={formData.contact.message}
                  onChange={(e) => handleInputChange('contact', 'message', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return <div>Section not found</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {editPortfolio ? 'Edit Portfolio' : 'Create New Portfolio'}
        </h1>
        <p className="text-gray-600">
          {editPortfolio ? 'Update your portfolio information' : 'Fill in the details to create your portfolio'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeSection === section.id
                  ? 'bg-secondary-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <div className="card">
        {renderSection()}
        
        {/* Save Button */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleSave}
            className="btn-primary flex items-center space-x-2"
          >
            <Save size={18} />
            <span>{editPortfolio ? 'Update Portfolio' : 'Save Portfolio'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioForm;
