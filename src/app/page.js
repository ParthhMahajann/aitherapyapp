'use client';

import { askOpenAI } from '@/lib/openai'; 
import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';

export default function Home() {
  const [userText, setUserText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);


  // Setup Speech Recognition on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = async (event) => {
        const transcript = event.results[0][0].transcript;
        setUserText(transcript);
      
        setLoading(true);
        const response = await askOpenAI(transcript);
        setAiResponse(response);
        setLoading(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      alert('Speech Recognition not supported. Use Chrome.');
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Head>
        <title>AI Therapist Voice Bot</title>
        <meta name="description" content="An AI-powered voice bot therapist" />
      </Head>

      {/* Header */}
      <header className="px-8 py-6 bg-white shadow-md flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-blue-600">AI Therapist</h1>
        <nav className="space-x-6">
          <a href="#features" className="hover:text-blue-500">Features</a>
          <a href="#about" className="hover:text-blue-500">About</a>
          <a href="#contact" className="hover:text-blue-500">Contact</a>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Your Personal AI Therapist
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl">
          Talk it out. Feel better. Anytime, anywhere—powered by state‑of‑the‑art AI voice technology.
        </p>

        {/* Voice Input Button */}
        <button
          onClick={startListening}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          {isListening ? 'Listening...' : 'Start Session'}
        </button>

        {/* Display Captured Text */}
        {userText && (
          <p className="mt-6 text-xl text-center max-w-xl">
            <strong>You said:</strong> {userText}
          </p>
        )}
        {loading && ( <p className="mt-4 text-blue-500 text-lg animate-pulse">Thinking...</p>
          )}

        {aiResponse && ( <div className="mt-6 p-4 bg-white rounded-lg shadow-md max-w-xl text-gray-800 text-left">
            <strong>Therapist:</strong> {aiResponse}
          </div>
    )}

      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-blue-50 rounded-full" />
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-center">
              Your virtual therapist is always here when you need to talk.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-blue-50 rounded-full" />
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-600 text-center">
              End-to-end encryption keeps your conversations confidential.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <h3 className="text-2xl font-bold mb-4">Ready to Start?</h3>
        <button
          onClick={startListening}
          className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
        >
          Launch AI Therapist
        </button>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-gray-400 text-center">
        &copy; 2025 AI Therapist Voice Bot. All rights reserved.
      </footer>
    </div>
  );
}
