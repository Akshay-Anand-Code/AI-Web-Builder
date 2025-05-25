import React, { useState, useCallback } from 'react';
import { Code } from 'lucide-react';
import UserInput from './UserInput';
import ModifyWebsiteInput from './ModifyWebsiteInput';
import StreamingLivePreview from './StreamingLivePreview';
import { generateWebsite, modifyWebsite } from '../services/openaiService';
import '../styles/LiveRenderer.css';

const LiveRenderer = ({ onNavigateHome }) => {
  const [userInput, setUserInput] = useState('');
  const [modifyInput, setModifyInput] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateWebsite = useCallback(async () => {
    if (!userInput.trim()) {
      setError('Please enter a website description');
      return;
    }
    setIsLoading(true);
    setError(null);
    setHtmlCode('');
    setCssCode('');
    setIsStreaming(true);

    try {
      await generateWebsite(userInput, ({ html, css }) => {
        setHtmlCode(html);
        setCssCode(css);
      });
    } catch (err) {
      setError('Failed to generate website: ' + err.message);
      console.error('Error generating website:', err);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [userInput]);

  const handleModifyWebsite = useCallback(async () => {
    if (!modifyInput.trim()) {
      setError('Please enter a modification description');
      return;
    }
    if (!htmlCode || !cssCode) {
      setError('Please generate a website first');
      return;
    }
    setIsLoading(true);
    setError(null);
    setIsStreaming(true);

    try {
      await modifyWebsite(modifyInput, htmlCode, cssCode, ({ html, css }) => {
        setHtmlCode(html);
        setCssCode(css);
      });
    } catch (err) {
      setError('Failed to modify website: ' + err.message);
      console.error('Error modifying website:', err);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, [modifyInput, htmlCode, cssCode]);

  return (
    <div className="flex flex-col h-screen">
      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={onNavigateHome}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">WebCraft AI</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="live-renderer pt-20">
        <div className="input-container">
          <h2>WEBSITE DESCRIPTION</h2>
          <div className="user-input-wrapper">
            <UserInput 
              value={userInput} 
              onChange={setUserInput} 
              isStreaming={isStreaming}
            />
            <button 
              onClick={handleGenerateWebsite} 
              disabled={isLoading || isStreaming}
            >
              {isLoading ? 'Generating...' : 'Generate Website'}
            </button>
          </div>
          
          <h2>MODIFY WEBSITE</h2>
          <div className="modify-input-wrapper">
            <ModifyWebsiteInput 
              value={modifyInput} 
              onChange={setModifyInput} 
              isStreaming={isStreaming}
            />
            <button 
              onClick={handleModifyWebsite} 
              disabled={isLoading || isStreaming || !htmlCode}
            >
              {isLoading ? 'Modifying...' : 'Modify Website'}
            </button>
          </div>
          
          {error && <p className="error">{error}</p>}
        </div>
        <div className="preview-container">
          <h2>LIVE PREVIEW</h2>
          <StreamingLivePreview htmlCode={htmlCode} cssCode={cssCode} />
        </div>
      </div>
    </div>
  );
};

export default LiveRenderer;