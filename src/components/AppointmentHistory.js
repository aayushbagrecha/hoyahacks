import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";

const AppointmentHistory = ({ handleClose, isOpen }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
    const [loading, setLoading] = useState(false);

    const baseUrl = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchAppointments = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${baseUrl}/consultations`);
                if (response.ok) {
                    const data = await response.json();
                    setAppointments(data);
                } else {
                    console.error("Failed to fetch appointment history");
                }
            } catch (error) {
                console.error("Error fetching appointment history:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, []);

    const toggleAppointmentDetails = (appointmentId) => {
        if (selectedAppointmentId === appointmentId) {
            setSelectedAppointmentId(null); // Collapse the details if already selected
        } else {
            setSelectedAppointmentId(appointmentId); // Show the details for the clicked appointment
        }
    };

    const parseSummary = (summary) => {
        const lines = summary.split("\n").filter((line) => line.trim() !== "");
        const sections = {
            Symptoms: [],
            Prescriptions: [],
            LabTests: [],
            HealthAdvice: [],
        };

        let currentSection = "";

        lines.forEach((line) => {
            if (line.includes("Symptoms")) currentSection = "Symptoms";
            else if (line.includes("Prescriptions")) currentSection = "Prescriptions";
            else if (line.includes("Lab Tests")) currentSection = "LabTests";
            else if (line.includes("General Health Advice")) currentSection = "HealthAdvice";
            else if (currentSection) sections[currentSection].push(line.trim());
        });

        return sections;
    };

    return (
        <Dialog open={isOpen} onClose={handleClose} className="relative z-10">
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
            />

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                        transition
                        className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-5xl data-closed:sm:translate-y-0 data-closed:sm:scale-95"
                    >
                        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <h2 className="text-2xl font-bold mb-4">Appointment History</h2>
                            {loading ? (
                                <p className="text-center">Loading...</p>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    {appointments.map((appointment) => (
                                        <div
                                            key={appointment._id}
                                            className="p-4 border rounded-lg shadow"
                                        >
                                            <div
                                                className="cursor-pointer flex justify-between items-center"
                                                onClick={() => toggleAppointmentDetails(appointment._id)}
                                            >
                                                <h3 className="font-bold text-lg">
                                                    Patient Name: <span className="text-blue-500">John Doe</span>
                                                </h3>
                                                <h4 className="text-sm">
                                                    Doctor Name: <span className="text-blue-500">Dr. Smith</span>
                                                </h4>
                                                <button className="text-blue-500 hover:underline">
                                                    {selectedAppointmentId === appointment._id
                                                        ? "Hide Details"
                                                        : "View Details"}
                                                </button>
                                            </div>

                                            {/* Show details if the appointment is selected */}
                                            {selectedAppointmentId === appointment._id && (
                                                <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                                                    {(() => {
                                                        const sections = parseSummary(appointment.summary);
                                                        return (
                                                            <>
                                                                <div className="mb-4">
                                                                    <h4 className="text-lg font-bold text-red-500">
                                                                        Symptoms:
                                                                    </h4>
                                                                    <ul className="list-disc ml-5">
                                                                        {sections.Symptoms.map((symptom, index) => (
                                                                            <li key={index}>{symptom}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <h4 className="text-lg font-bold text-green-500">
                                                                        Prescriptions:
                                                                    </h4>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                                        {sections.Prescriptions.map((prescription, index) => {
                                                                            const [title, description] = prescription.split(":").map((part) => part.trim()); // Split by colon
                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    className="p-3 border rounded-lg shadow-sm bg-white"
                                                                                >
                                                                                    <p className="text-sm">
                                                                                        <strong>{title}:</strong> {description}
                                                                                    </p>
                                                                                </div>
                                                                            );
                                                                        })}
                                                                    </div>
                                                                </div>

                                                                <div className="mb-4">
                                                                    <h4 className="text-lg font-bold text-blue-500">
                                                                        Lab Tests:
                                                                    </h4>
                                                                    <ul className="list-disc ml-5">
                                                                        {sections.LabTests.map((test, index) => (
                                                                            <li key={index}>{test}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                                <div className="mb-4">
                                                                    <h4 className="text-lg font-bold text-yellow-500">
                                                                        General Health Advice:
                                                                    </h4>
                                                                    <ul className="list-disc ml-5">
                                                                        {sections.HealthAdvice.map((advice, index) => (
                                                                            <li key={index}>{advice}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            </>
                                                        );
                                                    })()}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                                type="button"
                                onClick={handleClose}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                disabled={loading} // Disable while loading
                            >
                                Close
                            </button>
                        </div>
                    </DialogPanel>
                </div>
            </div>
        </Dialog>
    );
};

export default AppointmentHistory;