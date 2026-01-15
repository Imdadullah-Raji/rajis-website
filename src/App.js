import React, { useState, useEffect } from 'react';
import { Github, Linkedin, Mail, ExternalLink, BookOpen, Gamepad2 } from 'lucide-react';

const ConstellationNav = ({ currentPage, onNavigate }) => {
  // Summer Triangle - actual astronomical positions (scaled for display)
  const stars = {
    vega: { x: 90, y: 30, name: 'Home', constellation: 'Lyra', page: 'home' },
    deneb: { x: 140, y: 25, name: 'Projects', constellation: 'Cygnus', page: 'projects' },
    altair: { x: 90, y: 140, name: 'Technical', constellation: 'Aquila', page: 'technical' },
    sadr: { x: 120, y: 70, name: 'Writings', constellation: 'Cygnus', page: 'writings' }
  };

  // Constellation lines
  const constellationLines = [
    // Summer Triangle
    { from: stars.vega, to: stars.deneb, color: '#4a9eff', opacity: 0.4, width: 1.5 },
    { from: stars.deneb, to: stars.altair, color: '#4a9eff', opacity: 0.4, width: 1.5 },
    { from: stars.altair, to: stars.vega, color: '#4a9eff', opacity: 0.4, width: 1.5 },
    
    // Cygnus (Northern Cross) - Deneb and Sadr
    { from: stars.deneb, to: stars.sadr, color: '#888', opacity: 0.3, width: 1 },
    { from: stars.sadr, to: { x: 120, y: 110 }, color: '#666', opacity: 0.2, width: 0.8 }, // Tail
    { from: stars.sadr, to: { x: 95, y: 65 }, color: '#666', opacity: 0.2, width: 0.8 }, // Left wing
    { from: stars.sadr, to: { x: 145, y: 65 }, color: '#666', opacity: 0.2, width: 0.8 }, // Right wing
    
    // Lyra - Vega
    { from: stars.vega, to: { x: 75, y: 45 }, color: '#666', opacity: 0.2, width: 0.8 },
    { from: stars.vega, to: { x: 105, y: 45 }, color: '#666', opacity: 0.2, width: 0.8 },
    
    // Aquila - Altair
    { from: stars.altair, to: { x: 75, y: 125 }, color: '#666', opacity: 0.2, width: 0.8 },
    { from: stars.altair, to: { x: 105, y: 125 }, color: '#666', opacity: 0.2, width: 0.8 },
    { from: stars.altair, to: { x: 90, y: 160 }, color: '#666', opacity: 0.2, width: 0.8 }
  ];

  const [hoveredNode, setHoveredNode] = useState(null);
  const activePages = Object.values(stars);

  return (
    <div className="fixed top-8 right-8 z-50">
      <svg width="200" height="200" className="opacity-90">
        {/* Constellation lines */}
        {constellationLines.map((line, i) => (
          <line
            key={i}
            x1={line.from.x}
            y1={line.from.y}
            x2={line.to.x}
            y2={line.to.y}
            stroke={line.color}
            strokeWidth={line.width}
            opacity={line.opacity}
          />
        ))}
        
        {/* Background stars (fainter) */}
        {[
          { x: 75, y: 45 }, { x: 105, y: 45 }, { x: 95, y: 65 }, { x: 145, y: 65 },
          { x: 120, y: 110 }, { x: 75, y: 125 }, { x: 105, y: 125 }, { x: 90, y: 160 }
        ].map((pos, i) => (
          <circle
            key={`bg-${i}`}
            cx={pos.x}
            cy={pos.y}
            r={1.5}
            fill="#555"
            opacity="0.5"
          />
        ))}
        
        {/* Main navigation stars */}
        {activePages.map(star => (
          <g key={star.page}>
            <circle
              cx={star.x}
              cy={star.y}
              r={currentPage === star.page ? 7 : 5}
              fill={currentPage === star.page ? '#60a5fa' : '#d4d4d8'}
              className="cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredNode(star.page)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => onNavigate(star.page)}
              style={{
                filter: currentPage === star.page 
                  ? 'drop-shadow(0 0 10px #60a5fa)' 
                  : 'drop-shadow(0 0 2px #fff)'
              }}
            />
            {(hoveredNode === star.page || currentPage === star.page) && (
              <>
                <text
                  x={star.x}
                  y={star.y - 15}
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {star.name}
                </text>
                <text
                  x={star.x}
                  y={star.y - 5}
                  textAnchor="middle"
                  fill="#888"
                  fontSize="8"
                  fontFamily="monospace"
                  className="pointer-events-none"
                >
                  {star.constellation}
                </text>
              </>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};

const HomePage = () => {
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbitAngle(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Subtle orbital background */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 border border-blue-400 rounded-full"
            style={{
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
        <div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-blue-400 rounded-full"
          style={{
            transform: `translate(-50%, -50%) rotate(${orbitAngle}deg) translateX(300px)`,
          }}
        />
      </div>

      <div className="max-w-3xl px-8 relative z-10">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Imdadullah Raji
        </h1>
        <p className="text-xl text-gray-400 mb-6 font-mono">
          mechanical engineering student / control systems / dynamics
        </p>
        
        <div className="text-gray-300 space-y-4 leading-relaxed mb-8">
          <p>
            I explore the world through the lens of dynamical systems—where chaos meets order, 
            and emergent behaviors arise from simple rules. My work sits at the intersection of 
            data-driven modeling, learning-based control, and the philosophical questions that 
            drive our understanding of complex systems.
          </p>
          <p>
            From fluid flows to robotic swarms, I combine first-principles modeling with modern 
            machine learning to understand and control systems that refuse to be tamed by linear 
            thinking. I'm particularly drawn to the beautiful connections that emerge across 
            disciplines: eigenvalues in buckling and Fourier, cognition and computation, 
            order and entropy.
          </p>
          <p className="text-sm text-gray-400 italic border-l-2 border-gray-600 pl-4">
            "The essence of chaos is not randomness—it's sensitivity to initial conditions, 
            deterministic yet unpredictable, like the three bodies dancing in gravitational embrace."
          </p>
        </div>

        <div className="flex gap-6">
          <a
            href="https://github.com/Imdadullah-Raji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Github size={20} />
            <span className="font-mono text-sm">github</span>
          </a>
          <a
            href="https://linkedin.com/in/imdadullah-raji"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Linkedin size={20} />
            <span className="font-mono text-sm">linkedin</span>
          </a>
          <a
            href="mailto:2110099@buet.me.ac.bd"
            className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors"
          >
            <Mail size={20} />
            <span className="font-mono text-sm">email</span>
          </a>
        </div>
      </div>
    </div>
  );
};

const ProjectsPage = () => {
  const projects = [
    {
      title: "Autonomous Drone-Ground Swarm Coordination",
      description: "Hierarchical swarm system with aerial supervision guiding local interactions. Implemented computer vision with YOLOv8, ROS communication protocols, and collective behavior algorithms for emergent coordination.",
      tags: ["ROS", "Computer Vision", "Swarm Intelligence", "Raspberry Pi"],
      github: "#",
      status: "Published - ICME 2025"
    },
    {
      title: "Hybrid UAV-UGV Environment Mapping",
      description: "SLAM implementation using stereo vision and 2D LiDAR for autonomous navigation and mapping. Deployed on Jetson Orin Nano for real-time processing of sensor fusion and path planning.",
      tags: ["SLAM", "LiDAR", "Stereo Vision", "Jetson"],
      github: "#",
      status: "Ongoing"
    },
    {
      title: "Data-Driven Dynamics Explorer",
      description: "Interactive tools for system identification and control of nonlinear systems. Implementations of DMD, SINDy, and Koopman operator methods for discovering governing equations from data.",
      tags: ["Machine Learning", "Control Theory", "Python", "Dynamical Systems"],
      github: "#",
      status: "In Development"
    }
  ];

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-400 font-mono">projects</h1>
        <p className="text-gray-400 mb-12">
          Systems I've built, problems I've explored, chaos I've tamed.
        </p>

        <div className="space-y-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="border border-gray-700 bg-gray-900/50 p-6 rounded hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-semibold text-gray-100">{project.title}</h3>
                <a
                  href={project.github}
                  className="text-gray-500 hover:text-blue-400 transition-colors"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
              
              <p className="text-gray-300 mb-4 leading-relaxed">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-xs font-mono px-3 py-1 bg-gray-800 text-blue-300 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-gray-500 font-mono">{project.status}</p>
            </div>
          ))}
        </div>

        {/* Placeholder space for future fractals/patterns */}
        <div className="mt-16 h-48 border border-dashed border-gray-700 rounded flex items-center justify-center">
          <p className="text-gray-600 font-mono text-sm">
            [ space reserved for fractal visualizations ]
          </p>
        </div>
      </div>
    </div>
  );
};

const TechnicalPage = () => {
  const topics = [
    {
      title: "Eigenvalues Everywhere",
      subtitle: "From principal stresses to Fourier modes",
      coming: true
    },
    {
      title: "The Koopman Operator",
      subtitle: "Linearizing nonlinear dynamics",
      coming: true
    },
    {
      title: "Data-Driven System Identification",
      subtitle: "SINDy, DMD, and discovering equations from measurements",
      coming: true
    },
    {
      title: "Chaos and Predictability",
      subtitle: "Three bodies, Poincaré sections, and computational irreducibility",
      coming: true
    }
  ];

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-400 font-mono">technical writings</h1>
        <p className="text-gray-400 mb-12">
          Explorations of underappreciated ideas and beautiful connections across dynamics, 
          control, and mathematical physics.
        </p>

        <div className="space-y-6">
          {topics.map((topic, idx) => (
            <div
              key={idx}
              className="border border-gray-700 bg-gray-900/30 p-6 rounded hover:border-gray-600 transition-colors cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold text-gray-100 mb-2">{topic.title}</h3>
                  <p className="text-gray-400 text-sm">{topic.subtitle}</p>
                </div>
                {topic.coming && (
                  <span className="text-xs font-mono px-3 py-1 bg-gray-800 text-gray-500 rounded">
                    coming soon
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border-l-2 border-blue-500/30 bg-gray-900/20">
          <p className="text-gray-400 text-sm leading-relaxed">
            <span className="font-mono text-blue-400">note:</span> These writings aim to illuminate 
            the deep connections between seemingly disparate topics—how the same mathematical structures 
            emerge in vibration analysis, image compression, and quantum mechanics. Each piece connects 
            theory to intuition, equations to insight.
          </p>
        </div>
      </div>
    </div>
  );
};

const WritingsPage = () => {
  const [activeTab, setActiveTab] = useState('books');

  const bookTopics = [
    "Epistemology and the limits of knowledge",
    "Nietzsche and the will to power",
    "Taleb's antifragility and randomness",
    "Cognitive science and emergence",
    "Sufism, contemplation, and knowing"
  ];

  const gameTopics = [
    "Historical narratives in Assassin's Creed",
    "Emergent gameplay and systemic design",
    "Virtual worlds as dynamical systems",
    "Games as cognitive tools"
  ];

  return (
    <div className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-400 font-mono">writings & thoughts</h1>
        <p className="text-gray-400 mb-12">
          Reflections on books, games, philosophy, and the patterns that connect them.
        </p>

        <div className="flex gap-4 mb-8 border-b border-gray-700">
          <button
            onClick={() => setActiveTab('books')}
            className={`pb-3 px-4 font-mono flex items-center gap-2 transition-colors ${
              activeTab === 'books'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <BookOpen size={18} />
            books & philosophy
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`pb-3 px-4 font-mono flex items-center gap-2 transition-colors ${
              activeTab === 'games'
                ? 'text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            <Gamepad2 size={18} />
            games & narratives
          </button>
        </div>

        {activeTab === 'books' && (
          <div className="space-y-4">
            <p className="text-gray-300 mb-6 leading-relaxed">
              I'm fascinated by epistemology—how we know what we know—and how cognition emerges 
              from substrate. Nietzsche's perspectivism, Taleb's skepticism of grand theories, 
              and Sufi approaches to direct knowing all point to something profound about the 
              nature of understanding.
            </p>
            {bookTopics.map((topic, idx) => (
              <div
                key={idx}
                className="border border-gray-700 bg-gray-900/30 p-4 rounded hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-300">{topic}</p>
                <span className="text-xs font-mono text-gray-600 mt-2 block">coming soon</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'games' && (
          <div className="space-y-4">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Games are dynamical systems where player agency meets designed rules. I love how 
              historical games like Assassin's Creed weave narrative through exploration, and how 
              emergent gameplay reveals the beauty of complex systems responding to simple inputs.
            </p>
            {gameTopics.map((topic, idx) => (
              <div
                key={idx}
                className="border border-gray-700 bg-gray-900/30 p-4 rounded hover:border-gray-600 transition-colors"
              >
                <p className="text-gray-300">{topic}</p>
                <span className="text-xs font-mono text-gray-600 mt-2 block">coming soon</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function PersonalWebsite() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'projects':
        return <ProjectsPage />;
      case 'technical':
        return <TechnicalPage />;
      case 'writings':
        return <WritingsPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-gray-950 text-gray-100 min-h-screen relative">
      <ConstellationNav currentPage={currentPage} onNavigate={setCurrentPage} />
      <div className="transition-opacity duration-500">
        {renderPage()}
      </div>
    </div>
  );
}