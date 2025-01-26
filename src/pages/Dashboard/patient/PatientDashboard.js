import React, { useState } from "react";
import UploadAudio from "../../../components/uploadAudio";

const PatientDashboard = () => {

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const handleUploadDialogOpen = () => {
    setIsUploadDialogOpen(true);
  };

  const handleUploadDialogClose = () => {
    setIsUploadDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-6">Patient Dashboard</h1>
      <div className="flex space-x-4">
        {/* Record Button */}
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none shadow-md"
          onClick={() => alert("Record functionality coming soon!")}
        >
          Record
        </button>

        {/* Upload Button */}
        <button
          className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 focus:outline-none shadow-md"
          onClick={handleUploadDialogOpen}
        >
          Upload
        </button>
      </div>

      {/* Upload Dialog */}
      {isUploadDialogOpen && (
        <UploadAudio handleClose={handleUploadDialogClose}/>
      )}
    </div>
  );
};

export default PatientDashboard;
