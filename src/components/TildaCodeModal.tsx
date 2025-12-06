import { useState } from 'react';
import Icon from '@/components/ui/icon';

interface TildaCodeModalProps {
  onClose: () => void;
}

export default function TildaCodeModal({ onClose }: TildaCodeModalProps) {
  const [copied, setCopied] = useState(false);

  const iframeCode = `<iframe src="${window.location.origin}" width="100%" height="800px" frameborder="0" style="border: none; border-radius: 16px; box-shadow: 0 10px 40px rgba(0,0,0,0.1);"></iframe>`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(iframeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white p-6 rounded-2xl shadow-2xl max-w-md border-2 border-primary/20 animate-fade-in z-50">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg text-gray-900">Код для Tilda</h3>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Закрыть"
        >
          <Icon name="X" size={20} />
        </button>
      </div>
      <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs font-mono overflow-x-auto mb-4">
        <code>{iframeCode}</code>
      </div>
      <button
        onClick={handleCopy}
        className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
      >
        <Icon name={copied ? "Check" : "Copy"} size={18} />
        {copied ? 'Скопировано!' : 'Копировать код'}
      </button>
      <p className="text-xs text-gray-500 mt-3 text-center">
        Вставьте этот код в блок HTML на Tilda
      </p>
    </div>
  );
}
