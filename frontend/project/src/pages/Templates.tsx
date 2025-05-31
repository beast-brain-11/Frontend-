import React, { useState } from 'react';
import { Search, SlidersHorizontal, Play, Copy, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

interface Template {
  id: string;
  title: string;
  description: string;
  type: 'full-ad' | 'scene' | 'prompt-set';
  industry: string;
  style: string;
  thumbnail: string;
  scenes?: {
    visual: string;
    voiceOver: string;
  }[];
}

const Templates: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [activeFilters, setActiveFilters] = useState({
    industry: '',
    style: '',
    type: ''
  });

  // Mock data - in a real app this would come from an API
  const templates: Template[] = [
    {
      id: '1',
      title: 'Modern Tech Product Launch',
      description: 'A sleek, minimalist approach to showcasing innovative technology products with emphasis on features and benefits.',
      type: 'full-ad',
      industry: 'Technology',
      style: 'Minimalist',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      scenes: [
        {
          visual: 'Close-up shot of the product emerging from darkness, soft lighting reveals its sleek design',
          voiceOver: 'Introducing the future of technology, designed for the way you live.'
        },
        {
          visual: 'Split screen showing multiple use cases, clean transitions between each scenario',
          voiceOver: 'Seamlessly integrate with your daily routine, whether at work or play.'
        }
      ]
    },
    {
      id: '2',
      title: 'Energetic Fitness Campaign',
      description: 'Dynamic and motivational fitness ad template perfect for gym promotions and wellness products.',
      type: 'full-ad',
      industry: 'Fitness',
      style: 'Dynamic',
      thumbnail: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg',
      scenes: [
        {
          visual: 'Fast-paced montage of diverse people working out, high-energy movements',
          voiceOver: 'Transform your life, one workout at a time.'
        },
        {
          visual: 'Inspiring before/after transitions, focus on genuine achievement',
          voiceOver: 'Real people, real results. Your journey begins here.'
        }
      ]
    }
  ];

  const industries = ['Technology', 'Fitness', 'Food & Beverage', 'Fashion', 'Real Estate'];
  const styles = ['Minimalist', 'Dynamic', 'Cinematic', 'Casual', 'Professional'];
  const types = ['Full Ad', 'Scene Template', 'Prompt Set'];

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  const renderDetailView = (template: Template) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-[#242842] rounded-xl max-w-4xl mx-auto">
          <div className="p-6">
            <button 
              onClick={() => setSelectedTemplate(null)}
              className="flex items-center text-slate-400 hover:text-white transition-colors mb-4"
            >
              <ChevronLeft className="h-5 w-5 mr-1" />
              Back to Templates
            </button>
            
            <div className="aspect-video rounded-lg overflow-hidden mb-6">
              <img 
                src={template.thumbnail} 
                alt={template.title}
                className="w-full h-full object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
            <p className="text-slate-400 mb-6">{template.description}</p>

            <div className="flex flex-wrap gap-2 mb-6">
              <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm">
                {template.industry}
              </span>
              <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm">
                {template.style}
              </span>
              <span className="px-3 py-1 bg-violet-500/20 text-violet-400 rounded-full text-sm">
                {template.type === 'full-ad' ? 'Full Ad' : template.type}
              </span>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-white">Scenes & Prompts</h3>
              {template.scenes?.map((scene, index) => (
                <div key={index} className="bg-[#1A1C2E] rounded-lg p-4">
                  <h4 className="text-white font-medium mb-3">Scene {index + 1}</h4>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Visual Description</span>
                      <button
                        onClick={() => handleCopyPrompt(scene.visual)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                      >
                        <Copy className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                    <div className="bg-[#2C3254] rounded p-3 text-slate-300">
                      {scene.visual}
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-slate-400">Voice Over</span>
                      <button
                        onClick={() => handleCopyPrompt(scene.voiceOver)}
                        className="p-1 hover:bg-slate-700 rounded transition-colors"
                      >
                        <Copy className="h-4 w-4 text-slate-400" />
                      </button>
                    </div>
                    <div className="bg-[#2C3254] rounded p-3 text-slate-300">
                      {scene.voiceOver}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => handleCopyPrompt(JSON.stringify(template.scenes, null, 2))}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors flex items-center"
              >
                <Copy className="h-5 w-5 mr-2" />
                Copy All Prompts
              </button>
              <button className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg text-white font-medium transition-colors flex items-center">
                <Play className="h-5 w-5 mr-2" />
                Use This Template
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1C2E] p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Examples & Templates</h1>
        <p className="text-slate-400">Discover what's possible and get a head start on your next amazing video ad.</p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8">
        <div className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#242842] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500"
            />
          </div>
        </div>

        <select
          value={activeFilters.industry}
          onChange={(e) => setActiveFilters({ ...activeFilters, industry: e.target.value })}
          className="px-4 py-2 bg-[#242842] rounded-lg text-white border-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Industries</option>
          {industries.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>

        <select
          value={activeFilters.style}
          onChange={(e) => setActiveFilters({ ...activeFilters, style: e.target.value })}
          className="px-4 py-2 bg-[#242842] rounded-lg text-white border-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Styles</option>
          {styles.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>

        <select
          value={activeFilters.type}
          onChange={(e) => setActiveFilters({ ...activeFilters, type: e.target.value })}
          className="px-4 py-2 bg-[#242842] rounded-lg text-white border-none focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <div
            key={template.id}
            className="bg-[#242842] rounded-lg overflow-hidden hover:border-violet-500/30 transition-all duration-300 group cursor-pointer"
            onClick={() => setSelectedTemplate(template)}
          >
            <div className="aspect-video relative">
              <img
                src={template.thumbnail}
                alt={template.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-white mb-2">{template.title}</h3>
              <p className="text-sm text-slate-400 mb-3 line-clamp-2">{template.description}</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-violet-500/20 text-violet-400 rounded-full text-xs">
                  {template.industry}
                </span>
                <span className="px-2 py-1 bg-violet-500/20 text-violet-400 rounded-full text-xs">
                  {template.style}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedTemplate && renderDetailView(selectedTemplate)}
    </div>
  );
};

export default Templates;