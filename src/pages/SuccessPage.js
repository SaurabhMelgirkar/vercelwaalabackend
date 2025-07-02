import { useSearchParams } from "react-router-dom";
import { useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SuccessPage = () => {
  const [params] = useSearchParams();
  const ticketRef = useRef();

  const name = params.get("name") || "N/A";
  const email = params.get("email") || "N/A";
  const phone = params.get("phone") || "N/A";
  const amount = params.get("amount") || "N/A";
  const ticketId = params.get("ticketId") || "Not Generated";

  const downloadPDF = async () => {
    if (!ticketRef.current) return;

    const canvas = await html2canvas(ticketRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`TEDx_Ticket_${ticketId}.pdf`);
  };

  useEffect(() => {
    downloadPDF();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
      <h1 className="text-3xl font-bold mb-2 text-tedx-red">Thank You for Registering!</h1>
      <p className="mb-6 text-gray-700 text-center">Your ticket has been generated and downloaded as a PDF.</p>

      {/* Ticket Layout */}
      <div
        ref={ticketRef}
        className="relative flex flex-col md:flex-row bg-gradient-to-r from-red-600 to-black text-white rounded-xl p-6 items-center justify-between shadow-xl w-[90vw] max-w-3xl"
        style={{ height: "auto" }}
      >
        {/* Left Side */}
        <div className="space-y-2 text-left mb-4 md:mb-0">
          <h2 className="text-3xl font-bold">TED<span className="text-tedx-red">x</span> DYP Akurdi</h2>
          <p className="text-sm mb-2">= Independently organized TED event</p>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Ticket ID:</strong> {ticketId}</p>
        </div>

        {/* Right Side */}
        <div className="flex flex-col items-center justify-center">
          <img
            src="/ticket-icon.png" 
            alt="Ticket"
            className="w-20 h-20 mb-2"
          />
          <p className="text-2xl font-bold">₹{amount}</p>
        </div>
      </div>

      {/* Manual Download Button */}
      <button
        onClick={downloadPDF}
        className="mt-6 bg-tedx-red text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
      >
        Download Ticket Again
      </button>
    </div>
  );
};

export default SuccessPage;
