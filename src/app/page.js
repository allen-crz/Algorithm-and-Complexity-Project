"use client";

import { Code, Github } from 'lucide-react';
import ArrayVisualizer from '../components/ArrayVisualizer';
import AlgorithmSidebar from '../components/AlgorithmSidebar';
import { AlgorithmProvider } from '../components/AlgorithmContext';

export default function Home() {
  return (
    <AlgorithmProvider>
      <main className="min-h-screen text-cyan-50">
        {/* Enhanced Navbar */}
        <header className="bg-slate-800/80 border-b border-cyan-500/20 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                <Code className="h-6 w-6 text-cyan-400" />
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Algorithm Visualizer
                </h1>
              </div>
              <a 
                href="https://github.com/yourusername/algorithm-visualizer" 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <Github className="h-5 w-5" />
                <span>View on GitHub</span>
              </a>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-12 gap-6">
            <div className="md:col-span-3">
              <AlgorithmSidebar />
            </div>
            <div className="md:col-span-9">
              <div className="bg-slate-800/50 rounded-lg border border-cyan-500/20 backdrop-blur-sm p-6">
                <ArrayVisualizer />
              </div>
            </div>
          </div>
        </div>
      </main>
    </AlgorithmProvider>
  );
}