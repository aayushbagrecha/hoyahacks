import React, { useState } from "react";
import UploadAudio from "../../../components/uploadAudio";

const DoctorDashboard = () => {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  const patients = [
    { id: 1, name: "Alice Smith", age: 30, contact: "alice@example.com" },
    { id: 2, name: "Bob Johnson", age: 45, contact: "bob@example.com" },
    { id: 3, name: "Catherine Davis", age: 29, contact: "catherine@example.com" },
  ];

  const prescriptions = {
    1: {
      doctorPrescriptions: ["Paracetamol - 500mg", "Ibuprofen - 400mg"],
      otherDoctorsPrescriptions: ["Amoxicillin - 250mg"],
    },
    2: {
      doctorPrescriptions: ["Atorvastatin - 10mg", "Metformin - 500mg"],
      otherDoctorsPrescriptions: ["Losartan - 50mg"],
    },
    3: {
      doctorPrescriptions: ["Levothyroxine - 75mcg"],
      otherDoctorsPrescriptions: ["Omeprazole - 20mg"],
    },
  };

  const handleUploadDialogOpen = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
  };

  const handlePatientClick = (patientId) => {
    setSelectedPatient(patientId);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => alert("Logging out...")}
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
    Welcome, Dr. John Doe
  </h2>
  <p className="text-gray-600 text-lg mb-8">
    Here's the list of your patients. Select a patient to view their prescriptions.
  </p>
  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
      <thead className="bg-blue-600 text-white">
        <tr>
          <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider uppercase">
            Name
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider uppercase">
            Age
          </th>
          <th className="px-6 py-3 text-left text-sm font-semibold tracking-wider uppercase">
            Contact
          </th>
          <th className="px-6 py-3 text-center text-sm font-semibold tracking-wider uppercase">
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient, index) => (
          <tr
            key={patient.id}
            className={`hover:bg-blue-50 ${
              index % 2 === 0 ? "bg-gray-50" : "bg-white"
            }`}
          >
            <td className="px-6 py-4 text-sm text-gray-700 font-medium">
              {patient.name}
            </td>
            <td className="px-6 py-4 text-sm text-gray-700">{patient.age}</td>
            <td className="px-6 py-4 text-sm text-gray-700">
              {patient.contact}
            </td>
            <td className="px-6 py-4 text-center">
              <button
                className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={() => handlePatientClick(patient.id)}
              >
                View
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {selectedPatient && (
    <div className="mt-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">
        Prescriptions for {patients.find((p) => p.id === selectedPatient).name}
      </h3>
      {/* Prescriptions by this doctor */}
      <div className="mb-6">
        <h4 className="text-xl font-semibold text-gray-700 mb-2">
          Prescriptions by You
        </h4>
        <ul className="list-disc ml-6 text-gray-600">
          {prescriptions[selectedPatient].doctorPrescriptions.map(
            (prescription, index) => (
              <li key={index}>{prescription}</li>
            )
          )}
        </ul>
      </div>

      {/* Prescriptions by other doctors */}
      <div>
        <h4 className="text-xl font-semibold text-gray-700 mb-2">
          Prescriptions by Other Doctors
        </h4>
        <ul className="list-disc ml-6 text-gray-600">
          {prescriptions[selectedPatient].otherDoctorsPrescriptions.map(
            (prescription, index) => (
              <li key={index}>{prescription}</li>
            )
          )}
        </ul>
      </div>
    </div>
  )}
</section>


        {/* Quick Actions Section */}
        <aside className="space-y-6">
          {/* Record Button */}
          <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Record an Audio
            </h3>
            <p className="text-sm text-gray-600 mb-6">
              Use this feature to record a voice message for your patient.
            </p>
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 shadow-md w-full"
              onClick={() => alert("Record functionality coming soon!")}
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
              Upload pre-recorded audio files for your patient's review.
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
              onClick={() => alert("View Appointment History")}
            >
              View History
            </button>
          </div>
        </aside>
      </main>

      {/* Upload Dialog */}
      {isUploadDialogOpen && (
        <UploadAudio handleClose={handleUploadDialogClose} isOpen={isUploadDialogOpen} />
      )}
    </div>
  );
};

export default DoctorDashboard;
