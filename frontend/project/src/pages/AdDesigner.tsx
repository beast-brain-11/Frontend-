import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Play, Plus, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react'; // Added Chevron icons and Eye/EyeOff

interface Message {
  id: string;
  sender: 'user' | 'agent';
  content: string;
  timestamp: Date;
  type?: 'text' | 'asset';
  assetUrl?: string;
}

interface AdBlueprint {
  title: string;
  product: string;
  targetAudience: string;
  adTone: string;
  assets: string[];
  scenes: {
    visual: string;
    voiceOver: string;
  }[];
}

interface CommunityExample {
  id: string;
  title: string;
  thumbnail: string;
  industry: string;
  createdAt: Date;
}

const LoadingState: React.FC<{ title: string }> = ({ title }) => {
  const [currentText, setCurrentText] = useState(0);
  const loadingTexts = [
    "Just a few moments more...",
    "We're generating something amazing for you!",
    "Crafting your unique visuals...",
    "Assembling the perfect scenes...",
    "Our AI is working its magic!",
    "Polishing the final details..."
  ];

  // Example community content
  const communityExamples: CommunityExample[] = [
    {
      id: '1',
      title: 'Tech Startup Launch',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg',
      industry: 'Technology',
      createdAt: new Date('2024-03-15')
    },
    {
      id: '2',
      title: 'Fitness App Promo',
      thumbnail: 'https://images.pexels.com/photos/4498606/pexels-photo-4498606.jpeg',
      industry: 'Health & Fitness',
      createdAt: new Date('2024-03-14')
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % loadingTexts.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-8">
        {/* Loading Animation Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="relative h-40 mb-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#1A1C2E] to-transparent pointer-events-none z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1C2E] to-transparent pointer-events-none z-10" />
            <div 
              className="transform transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateY(-${currentText * 100}%)` }}
            >
              {loadingTexts.map((text, index) => (
                <div 
                  key={index}
                  className="h-40 flex items-center justify-center text-2xl font-medium text-white"
                >
                  {text}
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 h-1 mx-auto bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 animate-pulse-slow" />
          </div>
          
          <p className="text-slate-400 mt-4">
            Generating "{title}"
          </p>
        </div>

        {/* Community Content */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-6">
            Discover What Others Are Creating
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {communityExamples.map(example => (
              <div
                key={example.id}
                className="bg-[#242842] rounded-lg overflow-hidden hover:border-violet-500/30 transition-all duration-300 group cursor-pointer"
              >
                <div className="aspect-video relative">
                  <img
                    src={example.thumbnail}
                    alt={example.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-white mb-2">{example.title}</h3>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-violet-400">{example.industry}</span>
                    <span className="text-slate-400">
                      {example.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const AdDesigner: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'agent',
      content: "Hi! Let's create your video ad. What's the product or service we're promoting today? Just the name is enough to get started, and I can help suggest the rest!",
      timestamp: new Date(),
    },
  ]);
  
  const [inputMessage, setInputMessage] = useState('');
  const [canGenerate, setCanGenerate] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [isBlueprintPanelVisibleMobile, setIsBlueprintPanelVisibleMobile] = useState(false); // State for mobile blueprint visibility
  const [blueprint, setBlueprint] = useState<AdBlueprint>({
    title: 'Untitled Ad',
    product: '',
    targetAudience: '',
    adTone: '',
    assets: [],
    scenes: []
  });

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // const [sidebarOpen, setSidebarOpen] = useState(false); // Removed: Main sidebar is handled by App.tsx

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Enable generation if we at least have a product name
    if (!blueprint.product) {
      setBlueprint(prev => ({
        ...prev,
        product: inputMessage,
        title: `${inputMessage} Ad Campaign`
      }));
      setCanGenerate(true);

      // Simulate AI response offering to generate defaults
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          sender: 'agent',
          content: `Great! I have the product name "${inputMessage}". I can generate a complete draft video using AI to create suitable advertising scenes and scripts, or we can define more specific details together. Would you like me to generate a draft now, or shall we customize the details?`,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const file = files[0];
    const fileUrl = URL.createObjectURL(file);

    const newMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      content: file.name,
      type: 'asset',
      assetUrl: fileUrl,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setBlueprint(prev => ({
      ...prev,
      assets: [...prev.assets, file.name]
    }));

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        content: `Perfect! I've received your ${file.name}. We can use this in the video. Would you like to upload more assets, or shall we proceed with generating the video?`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleGenerateClick = () => {
    setIsAIGenerating(true);
    
    // If we only have minimal info, generate AI defaults
    if (!blueprint.targetAudience || !blueprint.adTone || blueprint.scenes.length === 0) {
      const aiResponse: Message = {
        id: Date.now().toString(),
        sender: 'agent',
        content: "I'll generate a complete draft using AI-suggested content based on your product. This will include target audience, tone, and scene descriptions. You can always modify these later.",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
      
      // Simulate AI generating content
      setTimeout(() => {
        setBlueprint(prev => ({
          ...prev,
          targetAudience: 'Young professionals, 25-40 years old',
          adTone: 'Modern and professional',
          scenes: [
            {
              visual: 'Opening shot showcasing the product in a minimalist setting',
              voiceOver: 'Introducing a revolutionary way to experience your daily routine.'
            },
            {
              visual: 'Lifestyle shots of people using the product in various settings',
              voiceOver: 'See how our product seamlessly integrates into your life.'
            }
          ]
        }));
        
        // Transition to generation state would happen here
      }, 2000);
    }
  };

  if (isAIGenerating) {
    return <LoadingState title={blueprint.title} />;
  }

  return (
    <div className="h-screen flex flex-col bg-[#20243B]">
      {/* Header */}
      {/* The main app sidebar's hamburger button is now in App.tsx's ProtectedRoute */}
      {/* This header is now only for AdDesigner specific controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 p-2 sm:p-4 bg-[#242842] border-b border-slate-700/50 sticky top-0 z-30 md:static md:z-10"> {/* Adjusted gap and padding */}
        {/* Project Title Section */}
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0"> 
          <span className="text-slate-300 text-sm sm:text-base md:text-lg flex-shrink-0">Project Title:</span> {/* Responsive text size for label */}
          <input
            type="text"
            value={blueprint.title}
            onChange={(e) => setBlueprint({...blueprint, title: e.target.value})}
            className="bg-transparent text-white text-lg font-semibold focus:outline-none focus:border-b-2 focus:border-violet-400 min-w-0 flex-1"
            placeholder="Untitled Ad"
            style={{ fontSize: '16px' }}
          />
        </div>
        {/* Generate and New Product buttons Section */}
        <div className="flex flex-col xs:flex-row space-y-2 xs:space-y-0 xs:space-x-2 w-full sm:w-auto items-end xs:items-center sm:justify-normal"> {/* Stack buttons vertically on tiniest screens, align right. Row from xs up. */}
          <button
            onClick={handleGenerateClick}
            disabled={!canGenerate}
            className="p-2.5 xs:px-6 xs:py-3 rounded-lg flex items-center space-x-2 transition-colors text-base min-w-[44px] min-h-[44px] md:text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500
              bg-violet-600 hover:bg-violet-700 text-white disabled:bg-slate-700/50 disabled:text-slate-400 disabled:cursor-not-allowed"
            title={canGenerate && !blueprint.targetAudience ? "Generate draft using AI-suggested content" : undefined}
          >
            <Play className="h-5 w-5" />
            <span className="hidden xs:inline">Generate Video</span>
          </button>
          <button
            className="p-2.5 xs:px-6 xs:py-3 rounded-lg flex items-center space-x-2 transition-colors text-base min-w-[44px] min-h-[44px] md:text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-violet-500
              bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            onClick={() => setBlueprint({ ...blueprint, product: '', title: 'Untitled Ad', targetAudience: '', adTone: '', assets: [], scenes: [] })}
          >
            <Plus className="h-5 w-5" />
            <span className="hidden xs:inline">New Product</span>
          </button>
        </div>
      </div>

      {/* Removed Sidebar Drawer for Mobile - Handled by App.tsx */}

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 w-full max-w-full" style={{paddingTop: 0}}> {/* Removed px-4 md:px-0 to allow full-width children */}
        {/* Chat and Video Generation (Single column on mobile) */}
        <div className="w-full md:w-[65%] flex flex-col bg-[#20243B] h-full min-h-0 max-w-full px-4 md:px-0" id="chat-panel"> {/* Added px-4 md:px-0 here */}
          {/* Chat History (scrollable) */}
          <div 
            ref={chatContainerRef}
            className="flex-1 min-h-0 overflow-y-auto p-4 space-y-6 md:p-6"
            style={{ fontSize: '16px' }}
          >
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[70%] rounded-xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-violet-600 text-white'
                      : 'bg-[#2C3254] text-slate-200'
                  }`}
                  style={{ fontSize: '16px' }}
                >
                  {message.type === 'asset' ? (
                    <div className="flex items-center space-x-2">
                      <Paperclip className="h-5 w-5" />
                      <span>{message.content}</span>
                    </div>
                  ) : (
                    message.content
                  )}
                  <div className="text-xs opacity-50 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Chat Input */}
          <form onSubmit={handleSendMessage} className="p-2 sm:p-4 bg-[#2C3254] border-t border-slate-700/50 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2" style={{ fontSize: '16px' }}> {/* Adjusted padding */}
            <div className="flex w-full space-x-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
                accept="image/*,video/*"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="p-2 text-slate-400 hover:text-violet-400 transition-colors min-w-[44px] min-h-[44px] rounded-lg"
              >
                <Paperclip className="h-5 w-5" />
              </button>
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message to the AI Agent..."
                className="flex-1 bg-[#3A3F64] text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 min-w-0"
                style={{ fontSize: '16px' }}
              />
              <button
                type="submit"
                className="bg-violet-600 text-white rounded-lg px-4 py-2 hover:bg-violet-700 transition-colors min-w-[44px] min-h-[44px]"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Mobile Toggle for Blueprint Panel */}
        <div className="p-4 border-t border-slate-700/50 md:hidden bg-[#20243B]">
          <button
            onClick={() => setIsBlueprintPanelVisibleMobile(prev => !prev)}
            className="w-full flex items-center justify-between p-3 rounded-lg text-slate-200 hover:bg-slate-700/30 transition-colors"
          >
            <span className="font-medium">Ad Blueprint</span>
            {isBlueprintPanelVisibleMobile ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>

        {/* Blueprint Panel */}
        <div className={` 
          w-full md:w-[35%] bg-[#242842] p-6 overflow-y-auto 
          border-slate-700/50 min-h-0
          ${isBlueprintPanelVisibleMobile ? 'block' : 'hidden'} md:block 
          md:border-l md:h-full 
        `}>
          {/* Added h-full for desktop consistency, though overflow-y-auto should handle height */}
          <h2 className="text-xl font-semibold text-white mb-6">Ad Blueprint</h2>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Product</label>
                <div className="bg-[#3A3F64] text-white rounded-lg px-4 py-2">
                  {blueprint.product || 'Not yet specified'}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Target Audience</label>
                <div className="bg-[#3A3F64] text-white rounded-lg px-4 py-2">
                  {blueprint.targetAudience || 'Not yet specified'}
                  {!blueprint.targetAudience && canGenerate && (
                    <span className="text-slate-400 text-sm block mt-1">
                      Will be AI-generated based on product type
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Ad Tone</label>
                <div className="bg-[#3A3F64] text-white rounded-lg px-4 py-2">
                  {blueprint.adTone || 'Not yet specified'}
                  {!blueprint.adTone && canGenerate && (
                    <span className="text-slate-400 text-sm block mt-1">
                      Will be AI-generated based on product type
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Brand Assets</label>
              {blueprint.assets.length > 0 ? (
                <div className="space-y-2">
                  {blueprint.assets.map((asset, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-[#3A3F64] rounded-lg p-2">
                      <Paperclip className="h-4 w-4 text-slate-400" />
                      <span className="text-white">{asset}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-[#3A3F64] text-slate-400 rounded-lg px-4 py-2">
                  No assets uploaded
                </div>
              )}
            </div>

            <div className="space-y-4">
              <label className="block text-sm font-medium text-slate-300">Scenes</label>
              {blueprint.scenes.length > 0 ? (
                blueprint.scenes.map((scene, index) => (
                  <div key={index} className="bg-[#3A3F64] rounded-lg p-4">
                    <div className="text-sm text-slate-400 mb-2">Scene {index + 1}</div>
                    <div className="space-y-2">
                      <div>
                        <div className="text-xs text-slate-400">Visual Description</div>
                        <div className="text-white">{scene.visual}</div>
                      </div>
                      <div>
                        <div className="text-xs text-slate-400">Voice Over</div>
                        <div className="text-white">{scene.voiceOver}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-[#3A3F64] text-slate-400 rounded-lg px-4 py-2">
                  {canGenerate ? 'Scenes will be AI-generated based on product type' : 'No scenes defined'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdDesigner;
