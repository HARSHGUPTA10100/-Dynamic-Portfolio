import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';
import { Template } from '../types/index';

const TemplateSelection = () => {
  const navigate = useNavigate();

  const templates: Template[] = [
    {
      id: 'template1',
      name: 'Template 1',
      description: 'Modern and clean design with yellow hero section and professional layout',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
      features: ['Yellow Hero Section', 'Testimonials Carousel', 'Grid Portfolio', 'Contact Form']
    },
    {
      id: 'template2',
      name: 'Template 2',
      description: 'Split-screen layout with timeline skills and masonry portfolio grid',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
      features: ['Split Hero Layout', 'Masonry Portfolio', 'Timeline Skills', 'Blog Section']
    }
  ];

  const handleTemplateSelect = (templateId: string) => {
    navigate('/form', { state: { selectedTemplate: templateId } });
  };

  const handlePreview = (templateId: string) => {
    // In a real app, this would show a preview modal or navigate to a preview page
    console.log('Preview template:', templateId);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your <span className="text-primary-500">Template</span>
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Select a professional template that best represents your style and customize it to your needs
        </p>
      </div>

      {/* Template Cards */}
      <div className="grid md:grid-cols-2 gap-8">
        {templates.map((template) => (
          <div key={template.id} className="card hover:shadow-lg transition-shadow duration-300">
            {/* Template Image */}
            <div className="relative mb-6">
              <img
                src={template.image}
                alt={template.name}
                className="w-full h-48 object-cover rounded-lg"
              />
              <button
                onClick={() => handlePreview(template.id)}
                className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-lg hover:bg-white transition-colors duration-200"
              >
                <Eye size={20} className="text-gray-600" />
              </button>
            </div>

            {/* Template Info */}
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-gray-600 mb-4">{template.description}</p>
              
              {/* Features */}
              <div className="grid grid-cols-2 gap-2">
                {template.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button
                onClick={() => handleTemplateSelect(template.id)}
                className="btn-primary flex-1 flex items-center justify-center space-x-2"
              >
                <span>Customize This Template</span>
                <ArrowRight size={18} />
              </button>
              <button
                onClick={() => handlePreview(template.id)}
                className="btn-secondary flex items-center justify-center space-x-2 px-6"
              >
                <Eye size={18} />
                <span>Preview</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelection;
