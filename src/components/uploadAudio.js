import React, { useState } from "react";

const UploadAudio = ({ handleClose }) => {

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File selected:", file);
            // You can add your upload logic here
            alert(`File uploaded: ${file.name}`);
            handleClose();
        }
    };
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <h2 className="text-xl font-bold mb-4">Upload Audio File</h2>
                <input
                    type="file"
                    accept="audio/*"
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <div className="flex justify-end space-x-4 mt-6">
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 focus:outline-none shadow-md"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UploadAudio;