import React, { useState } from "react";
import axios from "axios";
import { Button, Card, CardContent, CircularProgress } from "@mui/material";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const ReportViewer = () => {
  const [reportURL, setReportURL] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleViewReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/report",
        { responseType: "blob" }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      setReportURL(fileURL);
    } catch (error) {
      console.error("Failed to fetch the report:", error);
      alert("Error fetching the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:3000/api/admin/report",
        { responseType: "blob" }
      );

      const file = new Blob([response.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);

      const a = document.createElement("a");
      a.href = fileURL;
      a.download = "report.pdf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(fileURL);
    } catch (error) {
      console.error("Failed to download the report:", error);
      alert("Error downloading the report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "40px" }}>
      <Sidebar />
      <div style={{ flex: 10, marginTop: "100px" }}>
        <Navbar />
        <Card>
          <CardContent>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px",
              }}
            >
              <Button
                variant="contained"
                onClick={handleViewReport}
                disabled={loading}
                style={{ marginRight: "10px" }}
              >
                {loading ? <CircularProgress size={24} /> : "View Report"}
              </Button>
              <Button
                variant="contained"
                onClick={handleDownloadReport}
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : "Download Report"}
              </Button>
            </div>
            {reportURL && (
              <iframe
                src={reportURL}
                title="PDF Report"
                style={{ width: "100%", height: "80vh" }}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReportViewer;
