import React from "react";

const HomePage = () => {
  const handleRedirect = () => {
    // Redirect to the Login/Sign Up page
    window.location.href = "/login";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage:
          "url('https://images.rawpixel.com/image_800/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvcm0zNzNiYXRjaDE1LWJnLTExLmpwZw.jpg')",
      }}
    >
      {/* Overlay to enhance text visibility */}
      <div className="bg-black bg-opacity-50 min-h-screen flex flex-col">
        {/* Header */}
        <header className="bg-blue-900 text-white py-4 shadow-md">
          <div className="container mx-auto flex justify-center lg:justify-between items-center px-6">
          <h1 className="text-2xl md:text-3xl font-bold text-center ml-20 flex-1 tracking-widest">
  HealthConnect
</h1>

            <button
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded lg:ml-6"
              onClick={handleRedirect}
            >
              Login
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center px-6 md:px-12">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Your Health, Our Priority.
            </h2>
            <p className="text-lg mb-8">
              Welcome to HealthConnect, your personalized health portal. Manage your health with ease.
            </p>
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg text-lg"
              onClick={handleRedirect}
            >
              Get Started
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
