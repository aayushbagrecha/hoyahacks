import React, { useState } from "react";
import UploadAudio from "../../../components/uploadAudio";
import AppointmentHistory from "../../../components/AppointmentHistory";
import Chatbot1 from "../../../../src/components/chatbot";
import RecordAudio from "../../../components/recordAudio";

const PatientDashboard = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [isRecordDialogOpen, setIsRecordDialogOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const handleUploadDialogOpen = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
  };

  const handleRecordDialogOpen = () => {
    setIsRecordDialogOpen(true); // Correct state
  };
  
  const handleRecordDialogClose = () => {
    setIsRecordDialogOpen(false); // Correct state
  };  

  const handleHistoryDialogOpen = () => {
    setIsHistoryOpen(true);
  };

  const handleHistoryDialogClose = () => {
    setIsHistoryOpen(false);
  };


  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold ml-7">Patient Dashboard</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => {
              // Clear any saved tokens or session data if necessary
              localStorage.removeItem("token");

              // Redirect to the base URL
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-8 px-6 md:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Patient Info Section */}
        <section className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, John Doe
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Here's your personalized dashboard where you can access medical
            records, manage appointments, and upload or record audio for
            consultations. Stay connected with your healthcare team.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
              <h3 className="font-bold text-gray-700 text-lg mb-4">
                Personal Details
              </h3>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Name:</span> John Doe
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Age:</span> 34
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Contact:</span>{" "}
                john.doe@example.com
              </p>
            </div>

            {/* Health Details */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
              <h3 className="font-bold text-gray-700 text-lg mb-4">
                Health Details
              </h3>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Health ID:</span> 12345-67890
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Last Visit:</span> Jan 15, 2025
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Primary Doctor:</span> Dr. Smith
              </p>
            </div>

            {/* Upcoming Appointments */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
              <h3 className="font-bold text-gray-700 text-lg mb-4">
                Upcoming Appointments
              </h3>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Next Appointment:</span> Jan
                30, 2025
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Specialist:</span> Dr. Brown
              </p>
            </div>

            {/* Medications */}
            <div className="bg-blue-50 p-6 rounded-lg shadow-inner">
              <h3 className="font-bold text-gray-700 text-lg mb-4">
                Medications
              </h3>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Current Medications:</span>{" "}
                Paracetamol, Ibuprofen
              </p>
              <p className="text-gray-600 text-md">
                <span className="font-semibold">Allergies:</span> None
              </p>
            </div>
          </div>
        </section>

        {/* Quick Actions Section */}
        <aside className="space-y-6">
          {/* Record Button */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Record an Audio
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Use this feature to record a voice message for your doctor.
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 shadow-md w-full"
              onClick={handleRecordDialogOpen}
            >
              Record
            </button>
          </div>

          {/* Upload Button */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Upload an Audio File
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Upload pre-recorded audio files for your doctor's review.
            </p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 shadow-md w-full"
              onClick={handleUploadDialogOpen}
            >
              Upload
            </button>
          </div>

          {/* Appointment History */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Appointment History
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              View your past and upcoming appointments.
            </p>
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 shadow-md w-full"
              onClick={handleHistoryDialogOpen}
            >
              View History
            </button>
          </div>
        </aside>
      </main>

      {isHistoryOpen && (
        <AppointmentHistory
          isOpen={isHistoryOpen}
          handleClose={handleHistoryDialogClose}
        />
      )}

      {/* Upload Dialog */}
      {isUploadDialogOpen && (
        <UploadAudio handleClose={handleUploadDialogClose} isOpen={isUploadDialogOpen} />
      )}

      {/* Record Dialog */}
      {isRecordDialogOpen && (
        <RecordAudio handleClose={handleRecordDialogClose} isOpen={isRecordDialogOpen} />
      )}

      {/* Chatbot */}
      <Chatbot1 />
    </div>
  );
};

export default PatientDashboard;
