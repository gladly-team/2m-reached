import React from 'react';
import { CelebrationModal } from './components/CelebrationModal';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <CelebrationModal 
        isOpen={true} 
        onClose={() => {}} 
      />
    </div>
  );
};

export default App;