import { ArrowLeft, Lightbulb, PlayCircle, Settings } from 'lucide-react';

const Welcome = () => {
  return (
    <div className="space-y-8 text-center">
      <h2 className="text-2xl font-bold text-cyan-400">
        Welcome to Algorithm Visualizer
      </h2>
      
      <p className="text-slate-300 max-w-2xl mx-auto">
        Explore and understand algorithms through interactive visualizations. 
        Watch how different algorithms work step by step and learn about their behavior.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
          <ArrowLeft className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
          <h3 className="text-cyan-400 font-medium mb-2">Select Algorithm</h3>
          <p className="text-sm text-slate-400">
            Choose an algorithm from the sidebar to get started
          </p>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
          <Settings className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
          <h3 className="text-cyan-400 font-medium mb-2">Customize Input</h3>
          <p className="text-sm text-slate-400">
            Enter your own numbers or generate random ones 
            <br></br>(up to 15 numbers max)
          </p>
        </div>
        
        <div className="bg-slate-800/50 p-4 rounded-lg border border-cyan-500/20">
          <PlayCircle className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
          <h3 className="text-cyan-400 font-medium mb-2">Visualize</h3>
          <p className="text-sm text-slate-400">
            Watch the algorithm in action with step-by-step visualization
          </p>
        </div>
      </div>
      
      <div className="bg-cyan-500/10 p-4 rounded-lg border border-cyan-500/20 inline-flex items-center space-x-2">
        <Lightbulb className="h-5 w-5 text-cyan-400" />
        <span className="text-sm text-slate-300">
          Tip: Use the speed control to adjust the visualization pace
        </span>
      </div>
    </div>
  );
};

export default Welcome;