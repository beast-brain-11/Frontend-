import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search, SlidersHorizontal, Download, Edit, Copy, Trash2, ExternalLink } from 'lucide-react';

interface Project {
  id: string;
  title: string;
  status: 'completed' | 'generating' | 'draft';
  thumbnail: string;
  lastModified: Date;
  scenes: number;
  duration: string;
}

const MyProjects: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'drafts'>('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'name'>('date');

  // Mock data - in a real app this would come from an API
  const projects: Project[] = [
    {
      id: '1',
      title: 'Spring Coffee Launch',
      status: 'completed',
      thumbnail: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg',
      lastModified: new Date('2024-03-10'),
      scenes: 3,
      duration: '30s'
    },
    {
      id: '2',
      title: 'Summer Collection Preview',
      status: 'generating',
      thumbnail: 'https://images.pexels.com/photos/5709661/pexels-photo-5709661.jpeg',
      lastModified: new Date('2024-03-09'),
      scenes: 4,
      duration: '45s'
    }
  ];

  const drafts: Project[] = [];

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'completed':
        return 'text-emerald-400';
      case 'generating':
        return 'text-amber-400';
      case 'draft':
        return 'text-slate-400';
      default:
        return 'text-slate-400';
    }
  };

  const handleDelete = (projectId: string) => {
    // Implement delete functionality
    console.log('Delete project:', projectId);
  };

  const renderEmptyState = () => (
    <div className="text-center py-16">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/20 flex items-center justify-center">
        <Plus className="h-8 w-8 text-violet-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">
        {activeTab === 'projects' 
          ? "You haven't created any projects yet"
          : "No drafts here. Ready to start something new?"}
      </h3>
      <p className="text-slate-400 mb-6">
        Start creating your first video advertisement with our AI assistant
      </p>
      <Link
        to="/new-project"
        className="inline-flex items-center px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors"
      >
        <Plus className="h-5 w-5 mr-2" />
        Create Your First Project
      </Link>
    </div>
  );

  const renderProjects = (items: Project[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map(project => (
        <div
          key={project.id}
          className="bg-[#242842] rounded-lg overflow-hidden border border-transparent hover:border-violet-500/30 transition-all duration-300 group flex flex-col" // Added flex flex-col
        >
          <div className="aspect-video relative">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            {/* Desktop Hover Actions */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity hidden md:flex items-center justify-center gap-2">
              <button
                className="p-2 bg-slate-800/80 rounded-full hover:bg-violet-600 transition-colors text-white"
                title="Edit"
              >
                <Edit className="h-5 w-5" />
              </button>
              {project.status === 'completed' && (
                <button
                  className="p-2 bg-slate-800/80 rounded-full hover:bg-violet-600 transition-colors text-white"
                  title="Download"
                >
                  <Download className="h-5 w-5" />
                </button>
              )}
              <button
                className="p-2 bg-slate-800/80 rounded-full hover:bg-violet-600 transition-colors text-white"
                title="Duplicate"
              >
                <Copy className="h-5 w-5" />
              </button>
              <button
                className="p-2 bg-slate-800/80 rounded-full hover:bg-violet-600 transition-colors text-white"
                title="Delete"
                onClick={() => handleDelete(project.id)}
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="p-4 flex flex-col flex-grow"> {/* Added flex-grow */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-white truncate" title={project.title}>{project.title}</h3> {/* Added truncate and title */}
              <span className={`text-sm ${getStatusColor(project.status)} flex-shrink-0 ml-2`}> {/* Added flex-shrink-0 and ml-2 */}
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </span>
            </div>
            <div className="text-sm text-slate-400 mb-4 flex-grow"> {/* Added mb-4 and flex-grow */}
              <div className="flex items-center justify-between">
                <span>Last modified: {project.lastModified.toLocaleDateString()}</span>
                <span>{project.duration}</span>
              </div>
              <div className="mt-1">
                {project.scenes} scenes
              </div>
            </div>
            {/* Mobile Visible Actions */}
            <div className="md:hidden flex justify-around items-center pt-3 mt-auto border-t border-slate-700/50"> {/* Added mt-auto */}
              <button className="p-2 text-slate-300 hover:text-violet-400" title="Edit"><Edit className="h-5 w-5" /></button>
              {project.status === 'completed' && (
                <button className="p-2 text-slate-300 hover:text-violet-400" title="Download"><Download className="h-5 w-5" /></button>
              )}
              <button className="p-2 text-slate-300 hover:text-violet-400" title="Duplicate"><Copy className="h-5 w-5" /></button>
              <button className="p-2 text-red-400 hover:text-red-300" title="Delete" onClick={() => handleDelete(project.id)}><Trash2 className="h-5 w-5" /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1A1C2E] text-slate-200 p-4 md:p-8"> {/* Added default text color and responsive padding */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-white">My Projects</h1>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"> {/* Changed to flex-col sm:flex-row, items-stretch */}
          <div className="relative flex-grow sm:flex-grow-0"> {/* Added flex-grow sm:flex-grow-0 */}
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none" /> {/* Added pointer-events-none */}
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#242842] rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-violet-500" // Adjusted padding
            />
          </div>
          <button className="p-2.5 bg-[#242842] rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-white"> {/* Adjusted padding and text color */}
            <SlidersHorizontal className="h-5 w-5" />
          </button>
          <Link
            to="/new-project"
            className="inline-flex items-center justify-center px-4 py-2.5 bg-violet-600 hover:bg-violet-700 rounded-lg text-white font-medium transition-colors" // Added justify-center, adjusted padding
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>New Project</span> {/* Wrapped text in span for better control if needed */}
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-4 border-b border-slate-700/50">
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'projects'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Your Projects
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === 'drafts'
                ? 'text-violet-400 border-b-2 border-violet-400'
                : 'text-slate-400 hover:text-slate-300'
            }`}
            onClick={() => setActiveTab('drafts')}
          >
            Drafts
          </button>
        </div>
      </div>

      {activeTab === 'projects' && (
        projects.length === 0 ? renderEmptyState() : renderProjects(projects)
      )}
      
      {activeTab === 'drafts' && (
        drafts.length === 0 ? renderEmptyState() : renderProjects(drafts)
      )}
    </div>
  );
};

export default MyProjects;
