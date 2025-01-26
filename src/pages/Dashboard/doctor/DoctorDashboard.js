import React, { useState, useEffect } from "react";

const DoctorDashboard = () => {
  const [patients, setPatients] = useState([]);
  const [currentDoctorConsultations, setCurrentDoctorConsultations] = useState([]);
  const [otherDoctorConsultations, setOtherDoctorConsultations] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [expandedConsultationId, setExpandedConsultationId] = useState(null);
  const [loadingPatients, setLoadingPatients] = useState(true);
  const [loadingConsultations, setLoadingConsultations] = useState(false);

  const baseUrl = process.env.REACT_APP_API_URL;
  const currentDoctorId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${baseUrl}/users/patients`);
        if (response.ok) {
          const data = await response.json();
          setPatients(data);
        } else {
          console.error("Failed to fetch patients");
        }
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoadingPatients(false);
      }
    };

    fetchPatients();
  }, [baseUrl]);

  const fetchConsultations = async (patientId) => {
    setLoadingConsultations(true);
    try {
      const response = await fetch(
        `${baseUrl}/consultations/filtered-consultations?patientId=${patientId}`
      );
      if (response.ok) {
        const data = await response.json();

        const updatedConsultations = await Promise.all(
          data.map(async (consultation) => {
            const doctorResponse = await fetch(
              `${baseUrl}/users/doctor?doctorId=${consultation.doctorId}`
            );
            if (doctorResponse.ok) {
              const doctorData = await doctorResponse.json();
              return {
                ...consultation,
                doctorName: doctorData.username,
              };
            }
            return consultation;
          })
        );

        const currentDoctorConsults = updatedConsultations.filter(
          (consultation) => consultation.doctorId === currentDoctorId
        );
        const otherDoctorConsults = updatedConsultations.filter(
          (consultation) => consultation.doctorId !== currentDoctorId
        );

        setCurrentDoctorConsultations(currentDoctorConsults);
        setOtherDoctorConsultations(otherDoctorConsults);
      } else {
        console.error("Failed to fetch consultations");
      }
    } catch (error) {
      console.error("Error fetching consultations:", error);
    } finally {
      setLoadingConsultations(false);
    }
  };

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    fetchConsultations(patient._id);
  };

  const toggleConsultationDetails = (consultationId) => {
    setExpandedConsultationId(
      expandedConsultationId === consultationId ? null : consultationId
    );
  };

  const parseSummary = (summary) => {
    // If summary is null or undefined, return empty sections
    if (!summary) {
      return {
        Symptoms: [],
        Prescriptions: [],
        LabTests: [],
        HealthAdvice: [],
      };
    }
  
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
      else if (line.includes("General Health Advice"))
        currentSection = "HealthAdvice";
      else if (currentSection) sections[currentSection].push(line.trim());
    });
  
    return sections;
  };

  const renderConsultationSection = (consultations, title, colorClass) => (
    <div className="mt-8">
      <h3 className={`text-2xl font-bold mb-4 ${colorClass}`}>
        {title}
      </h3>
      {consultations.length === 0 ? (
        <p className="text-gray-600 italic">No consultations available.</p>
      ) : (
        consultations.map((consultation) => (
          <div
            key={consultation._id}
            className="border rounded-lg shadow-md mb-4 p-4 bg-white"
          >
            <div className="flex justify-between items-center">
              <h4 className="text-lg font-bold">
                Doctor: {consultation.doctorName}
              </h4>
              <button
                className="text-blue-500 hover:underline"
                onClick={() =>
                  toggleConsultationDetails(consultation._id)
                }
              >
                {expandedConsultationId === consultation._id
                  ? "Hide Details"
                  : "View Details"}
              </button>
            </div>
            {expandedConsultationId === consultation._id && (
              <div className="mt-4 bg-gray-100 p-4 rounded-lg">
                {(() => {
                  const sections = parseSummary(consultation.summary);
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
                          {sections.Prescriptions.map(
                            (prescription, index) => {
                              const [title, description] =
                                prescription
                                  .split(":")
                                  .map((part) => part.trim()); 
                              return (
                                <div
                                  key={index}
                                  className="p-3 border rounded-lg shadow-sm bg-white"
                                >
                                  <p className="text-sm">
                                    <strong>{title}:</strong>{" "}
                                    {description}
                                  </p>
                                </div>
                              );
                            }
                          )}
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
                          {sections.HealthAdvice.map(
                            (advice, index) => (
                              <li key={index}>{advice}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </>
                  );
                })()}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center px-6">
          <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto mt-8 px-8 md:px-12 lg:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <section className="col-span-1 lg:col-span-2 bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            Welcome, Dr. John Doe
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            Select a patient to view their consultations.
          </p>

          {loadingPatients ? (
            <p>Loading patients...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 bg-white rounded-lg shadow-md">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient, index) => (
                    <tr
                      key={patient._id}
                      className={`hover:bg-blue-50 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        }`}
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {patient.username}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {patient.email}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          className="bg-blue-500 text-white text-sm font-semibold py-1 px-3 rounded-lg hover:bg-blue-600"
                          onClick={() => handlePatientClick(patient)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedPatient && (
            <div>
              {loadingConsultations ? (
                <p>Loading consultations...</p>
              ) : (
                <>
                  {renderConsultationSection(
                    currentDoctorConsultations, 
                    `My Consultations for ${selectedPatient.username}`, 
                    "text-green-700"
                  )}
                  {renderConsultationSection(
                    otherDoctorConsultations, 
                    `Other Doctors' Consultations for ${selectedPatient.username}`, 
                    "text-blue-700"
                  )}
                </>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default DoctorDashboard;