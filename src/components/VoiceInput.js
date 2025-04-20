'use client';
import { useEffect, useState, useRef } from 'react';

export default function VoiceInput({ onTextCapture }) {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        onTextCapture(transcript); // pass transcript to parent
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      alert('Speech Recognition not supported in this browser. Use Chrome.');
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="text-center mt-8">
      <button
        onClick={startListening}
        className="bg-purple-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
      >
        {isListening ? 'Listening...' : 'Start Talking'}
      </button>
    </div>
  );
}
