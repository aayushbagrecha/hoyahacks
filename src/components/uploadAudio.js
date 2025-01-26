import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { FileInput, Label } from "flowbite-react";

const UploadAudio = ({ handleClose, isOpen }) => {
    const [open, setOpen] = useState(isOpen);
    const [selectedFile, setSelectedFile] = useState(null);
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState("");
    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    const baseUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        // Fetch user_id from localStorage
        const storedUserId = localStorage.getItem("user_id");
        if (storedUserId) {
            setUserId(storedUserId);
        }

        const fetchDoctors = async () => {
            try {
                const response = await fetch(`${baseUrl}/users/doctors`);
                if (response.ok) {
                    const data = await response.json();
                    setDoctors(data);
                } else {
                    console.error("Failed to fetch doctors");
                }
            } catch (error) {
                console.error("Error fetching doctors:", error);
            }
        };

        fetchDoctors();
    }, []);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
            console.log("File selected:", file);
        }
    };

    const handleSave = async () => {
        if (!selectedFile || !userId || !selectedDoctor) {
            alert("Ensure all required fields are selected!");
            return;
        }

        setLoading(true); // Set loading to true when Save is clicked

        // Prepare the form data
        const formData = new FormData();
        formData.append("user_id", userId); // Add user_id
        formData.append("doc_id", selectedDoctor); // Add doc_id
        formData.append("file", selectedFile);

        try {
            const response = await fetch(`${baseUrl}/upload-audio/`, {
                method: "POST",
                body: formData,
            });

            console.log("user_id:", userId);
            console.log("doc_id:", selectedDoctor);

            if (response.ok) {
                const data = await response.json();
                console.log("File uploaded:", data.file_path);
                alert("File uploaded successfully!");
            } else {
                alert("Failed to upload file.");
            }
        } catch (error) {
            console.error("Error uploading file:", error);
            alert("Error uploading file.");
        } finally {
            setLoading(false); // Set loading to false once the response is received
        }

        // Close the dialog
        setOpen(false);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={setOpen} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div className="mb-4">
                                <Label htmlFor="doctor-select" value="Select Doctor" />
                                <select
                                    id="doctor-select"
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
                                    value={selectedDoctor}
                                    onChange={(e) => setSelectedDoctor(e.target.value)}
                                >
                                    <option value="" disabled>
                                        Select a doctor
                                    </option>
                                    {doctors.map((doctor) => (
                                        <option key={doctor._id} value={doctor._id}>
                                            {doctor.username}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <Label htmlFor="file-upload-helper-text" value="Upload file" />
                            </div>
                            <FileInput id="file-upload-helper-text" helperText="Mp3 or WAV" onChange={handleFileChange} />
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
                                disabled={!selectedFile || !selectedDoctor || !userId || loading} // Disable button when loading
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <svg
                                            className="animate-spin h-5 w-5 mr-2 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            ></path>
                                        </svg>
                                        Saving...
                                    </span>
                                ) : (
                                    "Save"
                                )}
                            </button>
                            <button
                                type="button"
                                data-autofocus
                                onClick={() => setOpen(false)}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                disabled={loading} // Disable Cancel button when loading
                            >
                                Cancel
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default UploadAudio;