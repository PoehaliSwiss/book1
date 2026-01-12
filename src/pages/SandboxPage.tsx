import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { MDXEditor } from '../components/editor/MDXEditor';
import { ToastProvider } from '../context/ToastContext';
import { ProgressProvider } from '../context/ProgressContext';
import { SettingsProvider } from '../context/SettingsContext';
import { AISettingsModal } from '../components/settings/AISettingsModal';
import { SettingsModal } from '../components/settings/SettingsModal';
import { Cpu, Globe } from 'lucide-react';

const DEMO_CONTENT = `# Welcome to Akkem Editor Demo! 🎉

Try out the interactive textbook editor. Click on the buttons above to add different components.

## Example Quiz

<Quiz answer='1'>
What is 2 + 2?"
<Option>4</Option>
<Option>3</Option>
<Option>5</Option>
</Quiz>

## Example Fill in the Blanks

<InlineBlanks>
The capital of France is [Paris].
</InlineBlanks>

---

**Try adding your own exercises using the toolbar above!**
`;

const SandboxContent: React.FC = () => {
    const [content, setContent] = useState(DEMO_CONTENT);
    const [isAISettingsOpen, setIsAISettingsOpen] = useState(false);
    const [isLanguageSettingsOpen, setIsLanguageSettingsOpen] = useState(false);

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-900">
            {/* Header */}
            <div className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <a href="/" className="flex items-center gap-2 text-white hover:text-blue-400 transition-colors">
                        <img src="/akkem.svg" alt="Akkem" className="h-8 w-8" />
                        <span className="text-xl font-bold">Akkem</span>
                    </a>
                    <span className="text-gray-500 text-sm">|</span>
                    <span className="text-gray-400 text-sm">Demo Sandbox</span>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setIsLanguageSettingsOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <Globe size={16} />
                        <span className="hidden sm:inline">Language</span>
                    </button>
                    <button
                        onClick={() => setIsAISettingsOpen(true)}
                        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-300 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                    >
                        <Cpu size={16} />
                        <span className="hidden sm:inline">AI Settings</span>
                    </button>
                    <span className="text-amber-400 text-sm bg-amber-900/30 px-3 py-1 rounded-full border border-amber-700 hidden md:inline-block">
                        🧪 Demo Mode — changes are not saved
                    </span>
                    <a
                        href="/Register"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                        Sign Up Free
                    </a>
                </div>
            </div>

            {/* Editor */}
            <div className="flex-1 overflow-hidden">
                <MDXEditor
                    value={content}
                    onChange={setContent}
                    demoMode={true}
                    className="h-full"
                />
            </div>

            {/* Language Settings Modal */}
            <SettingsModal
                isOpen={isLanguageSettingsOpen}
                onClose={() => setIsLanguageSettingsOpen(false)}
            />

            {/* AI Settings Modal in Demo Mode */}
            <AISettingsModal
                isOpen={isAISettingsOpen}
                onClose={() => setIsAISettingsOpen(false)}
                demoMode={true}
            />
        </div>
    );
};

const SandboxPage: React.FC = () => {
    return (
        <BrowserRouter>
            <SettingsProvider>
                <ProgressProvider>
                    <ToastProvider>
                        <SandboxContent />
                    </ToastProvider>
                </ProgressProvider>
            </SettingsProvider>
        </BrowserRouter>
    );
};

export default SandboxPage;
