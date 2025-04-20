import Head from "next/head";

export default function Home() {
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
     <button className=" bg-blue-600  text-white  px-6 py-3  rounded-lg  shadow-md  hover:shadow-lg  transition-shadow  duration-300 ">
          Start Session
        </button>
      </main>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-8">
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-blue-50 rounded-full">
              {/* Icon placeholder */}
            </div>
            <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
            <p className="text-gray-600 text-center">
              Your virtual therapist is always here when you need to talk.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="mb-4 p-4 bg-blue-50 rounded-full">
              {/* Icon placeholder */}
            </div>
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
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-100 transition">
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
