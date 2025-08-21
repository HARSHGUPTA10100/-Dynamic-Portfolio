import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import { PortfolioData } from '../types/index';
import { Mail, Phone, MapPin, Star, ArrowLeft, Edit, ExternalLink } from 'lucide-react';

const PortfolioView = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, setCurrentPortfolio } = usePortfolio();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);

  useEffect(() => {
    if (id) {
      const foundPortfolio = state.portfolios.find(p => p.id === id);
      if (foundPortfolio) {
        setPortfolio(foundPortfolio);
        setCurrentPortfolio(foundPortfolio);
      } else {
        // If not found in portfolios, check if it's a professional
        const professional = state.professionals.find(p => p.id === id);
        if (professional) {
          // Create a portfolio from professional data
          const professionalPortfolio: PortfolioData = {
            id: professional.id,
            template: 'template1',
            hero: {
              name: professional.name,
              title: professional.role,
              tagline: `Professional ${professional.role} with ${professional.experience} years of experience`,
              profileImage: professional.image
            },
            about: {
              bio: professional.bio,
              email: 'contact@example.com',
              phone: '+1 (555) 123-4567',
              location: professional.location,
              socials: {}
            },
            skills: professional.skills.map((skill, index) => ({
              id: index.toString(),
              name: skill,
              percentage: Math.floor(Math.random() * 30) + 70
            })),
            services: [
              {
                id: '1',
                title: 'Professional Services',
                description: 'Comprehensive professional services tailored to your needs',
                icon: '🎯'
              }
            ],
            portfolio: [],
            testimonials: [],
            blog: {
              title: 'Professional Insights',
              summary: 'Sharing knowledge and insights from years of experience in the field.'
            },
            contact: {
              message: 'Get in touch to discuss your project requirements',
              email: 'contact@example.com',
              phone: '+1 (555) 123-4567'
            }
          };
          setPortfolio(professionalPortfolio);
          setCurrentPortfolio(professionalPortfolio);
        }
      }
    }
  }, [id, state.portfolios, state.professionals, setCurrentPortfolio]);

  if (!portfolio) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Portfolio not found.</p>
      </div>
    );
  }


  const renderTemplate1 = () => (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-b from-primary-100 to-primary-200 rounded-2xl p-8 mb-8">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <ArrowLeft size={20} />
              <span>Back</span>
            </button>
            <h1 className="text-3xl font-bold text-gray-900">DroneTV</h1>
          </div>
          <button
            onClick={() => navigate('/form')}
            className="flex items-center space-x-2 bg-secondary-500 text-white px-4 py-2 rounded-lg hover:bg-secondary-600"
          >
            <Edit size={16} />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              src={portfolio.hero.profileImage || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face'}
              alt={portfolio.hero.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-primary-200"
            />
            <div className="mt-4 bg-primary-500 text-black px-4 py-2 rounded-lg text-center">
              <span className="font-bold">
                {portfolio.skills.length > 0 ? `${portfolio.skills.length}+ Skills` : '11+ Years Experience'}
              </span>
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-center md:justify-start space-x-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <Mail size={16} />
                  <span>{portfolio.about.email}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Phone size={16} />
                  <span>{portfolio.about.phone}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin size={16} />
                  <span>{portfolio.about.location}</span>
                </div>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-primary-500 mb-2">{portfolio.hero.name}</h2>
            <p className="text-xl text-gray-600">{portfolio.hero.title}</p>
            {portfolio.hero.tagline && (
              <p className="text-lg text-gray-500 mt-2">{portfolio.hero.tagline}</p>
            )}
          </div>
        </div>
      </div>

      {/* Skills Section */}
      {portfolio.skills.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-secondary-500 text-center mb-8">My Skills</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.skills.slice(0, 3).map((skill, index) => (
              <div key={skill.id} className="bg-white border border-gray-200 rounded-xl p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-secondary-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{skill.name}</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{skill.name}</span>
                    <span className="font-medium">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-secondary-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${skill.percentage}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Skills */}
          {portfolio.skills.length > 3 && (
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-gray-800 mb-4 text-center">Additional Skills</h4>
              <div className="grid md:grid-cols-4 gap-4">
                {portfolio.skills.slice(3).map((skill) => (
                  <div key={skill.id} className="bg-gray-50 rounded-lg p-4 text-center">
                    <h5 className="font-medium text-gray-800 mb-2">{skill.name}</h5>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div
                        className="bg-primary-500 h-1.5 rounded-full"
                        style={{ width: `${skill.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-600 mt-1">{skill.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Services Section */}
      {portfolio.services.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Services</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.services.map((service) => (
              <div key={service.id} className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h4>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Portfolio Section */}
      {portfolio.portfolio.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Portfolio</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.portfolio.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <img
                  src={project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop'}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{project.title}</h4>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-500 hover:text-primary-600"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="bg-primary-100 text-gray-700 px-2 py-1 rounded-full text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testimonials Section */}
      {portfolio.testimonials.length > 0 && (
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Testimonials</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {portfolio.testimonials.map((testimonial) => (
              <div key={testimonial.id} className="text-center p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <img
                  src={testimonial.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face'}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Blog Section */}
      {portfolio.blog.title && (
        <div className="bg-white rounded-2xl p-8 mb-8">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Blog</h3>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-900 mb-4">{portfolio.blog.title}</h4>
            <p className="text-gray-600 max-w-2xl mx-auto">{portfolio.blog.summary}</p>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <div className="bg-white rounded-2xl p-8 mb-8">
        <h3 className="text-3xl font-bold text-gray-900 text-center mb-8">Contact</h3>
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-gray-600 mb-6">{portfolio.contact.message}</p>
          <div className="flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex items-center justify-center space-x-2">
              <Mail size={20} className="text-secondary-500" />
              <span className="text-gray-700">{portfolio.contact.email}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone size={20} className="text-secondary-500" />
              <span className="text-gray-700">{portfolio.contact.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white rounded-2xl p-8 text-center">
        <p>&copy; 2024 {portfolio.hero.name}. All rights reserved.</p>
      </div>
    </div>
  );

  const renderTemplate2 = () => (
    <div className="max-w-6xl mx-auto">
      {/* Template 2 would have a different layout */}
      <div className="bg-white rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Template 2 Layout</h2>
        <p className="text-gray-600">This template would have a split-screen layout with timeline skills and masonry portfolio grid.</p>
      </div>
      {/* Add Template 2 specific layout here */}
    </div>
  );

  return (
    <div>
      {portfolio.template === 'template1' ? renderTemplate1() : renderTemplate2()}
    </div>
  );
};

export default PortfolioView;
