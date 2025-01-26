import React, { useState, useEffect } from "react";
import { Mic, X } from "lucide-react";

const RecordAudio = ({ isOpen, handleClose }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioURL, setAudioURL] = useState(null);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setAudioChunks((prevChunks) => [...prevChunks, event.data]);
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const newAudioURL = URL.createObjectURL(audioBlob);
        setAudioURL(newAudioURL);

        // Automatically trigger download
        const a = document.createElement("a");
        a.style = "display: none";
        a.href = newAudioURL;
        a.download = "recording.wav";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(newAudioURL); // Clean up
      };

      setMediaRecorder(recorder);
      setAudioChunks([]); // Reset audioChunks for fresh recording
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      alert("Unable to access microphone. Please check your device settings.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && mediaRecorder.state !== "inactive") {
      mediaRecorder.stop();
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  const resetState = () => {
    setIsRecording(false);
    setAudioURL(null);
    setAudioChunks([]);
    if (mediaRecorder) {
      mediaRecorder.stream.getTracks().forEach((track) => track.stop());
      setMediaRecorder(null);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      resetState();
    }
    return () => {
      resetState();
    };
  }, [isOpen]);

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white w-96 rounded-lg shadow-lg p-6 relative">
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
            onClick={() => {
              handleClose();
              resetState();
            }}
          >
            <X size={20} />
          </button>

          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
            Record Audio
          </h2>

          <div className="flex flex-col items-center justify-center mb-4">
            {!isRecording && !audioURL && (
              <p className="text-gray-600 mb-4 text-center">
                Tap the microphone to start recording your audio.
              </p>
            )}
            {isRecording && <p className="text-red-500 mb-4">Recording...</p>}

            {audioURL && (
              <div className="flex flex-col items-center mt-4">
                <audio controls src={audioURL} className="w-full mt-2" />
              </div>
            )}

            {/* Microphone Button with Wave Animation */}
            <button
              className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg transition duration-300 ${
                isRecording ? "animate-pulse" : ""
              }`}
              onClick={isRecording ? stopRecording : startRecording}
            >
              <Mic size={28} className="text-white" />
              {isRecording && (
                <div className="absolute w-full h-full rounded-full bg-blue-400 opacity-50 animate-ping"></div>
              )}
            </button>
          </div>

          <div className="flex justify-center mt-6">
            <button
              className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 shadow-md"
              onClick={() => {
                handleClose();
                resetState();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default RecordAudio;
