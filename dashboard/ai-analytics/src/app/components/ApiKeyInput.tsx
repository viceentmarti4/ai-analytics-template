'use client';

import { useState } from 'react';
import { useApiKeyStore } from '@/stores/apiKeyStore';
import { X } from 'lucide-react';

export default function ApiKeyInput() {
  const { openaiKey, setOpenaiKey, clearOpenaiKey } = useApiKeyStore();
  const [inputKey, setInputKey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const handleSave = () => {
    if (inputKey.trim()) {
      setOpenaiKey(inputKey.trim());
      setInputKey('');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" />
      
      <div className="bg-[#262626] w-full max-w-md flex flex-col relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between p-4 pb-0">
          <h2 className="title-font">Settings</h2>
          <button className="settings-button">
            <X className="h-4 w-4 text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {openaiKey ? (
            <div>
              <div className="flex items-center mb-2">
                <span className="text-sm text-[#C6C6C6]">
                  {isVisible ? openaiKey : '••••••••••••••••••••••' + openaiKey.slice(-5)}
                </span>
                <button 
                  onClick={() => setIsVisible(!isVisible)} 
                  className="ml-2 text-xs text-[var(--accent)] hover:text-[var(--accent)] transition-colors"
                >
                  {isVisible ? 'Hide' : 'Show'}
                </button>
              </div>
              <button
                onClick={clearOpenaiKey}
                className="text-sm text-red-500 hover:text-red-400 transition-colors"
              >
                Remove Key
              </button>
            </div>
          ) : (
            <div>
              <div className="relative w-full">
                <input
                  type="password"
                  value={inputKey}
                  onChange={(e) => setInputKey(e.target.value)}
                  placeholder="Introduce your Api Key"
                  className="w-full h-[48px] px-4 pr-12 py-2 bg-tremor-background-subtle dark:bg-dark-tremor-background-subtle focus:outline-none focus:ring-1 focus:ring-white placeholder:text-tremor-content dark:placeholder:text-[#C6C6C6] placeholder:text-sm font-['Roboto']"
                />
              </div>
              <p className="mt-2 text-xs text-[#C6C6C6] font-['Roboto']">
                Your API key is stored locally in your browser and never sent to our servers.
              </p>
            </div>
          )}

          {/* Save Button */}
          {!openaiKey && (
            <div className="-mx-4 mt-4">
              <button
                onClick={handleSave}
                disabled={!inputKey.trim()}
                className={`w-full py-4 transition-colors button-font ${
                  !inputKey.trim()
                    ? 'bg-[var(--accent)] opacity-50 cursor-not-allowed'
                    : 'bg-[var(--accent)] hover:bg-[var(--accent)]'
                }`}
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 