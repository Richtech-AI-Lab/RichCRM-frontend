import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";

const Docusign = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [envelopeId, setEnvelopeId] = useState("");
  const [envelopeData, setEnvelopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const hash = useLocation().hash;
  const { access_token, type, state } = queryString.parse(hash);
  const authToken = access_token;
  const apiAccountId = process.env.REACT_APP_DS_API_ACCOUNT_ID; // Replace with your account ID

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Send envelope with the selected file
  const sendSignatureRequest = async () => {
    if (!authToken) {
      alert("Please log in first.");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    try {
      // Read the file as Base64
      const fileContent = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result.split(",")[1]); // Extract Base64 content
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(selectedFile);
      });

      const envelopeDefinition = {
        emailSubject: "Please sign the attached document",
        documents: [
          {
            documentBase64: fileContent,
            name: selectedFile.name,
            fileExtension: selectedFile.name.split(".").pop(),
            documentId: "1",
          },
        ],
        recipients: {
          signers: [
            {
              email: "eden.wu@richtech-ai-lab.org", // Replace with actual signer email
              name: "RichtechAILab", // Replace with actual signer name
              recipientId: "1",
              tabs: {
                signHereTabs: [
                  {
                    anchorString: "/sign/",
                    anchorXOffset: "0",
                    anchorYOffset: "0",
                  },
                ],
              },
            },
          ],
        },
        status: "sent",
      };

      const apiUrl = `https://demo.docusign.net/restapi/v2.1/accounts/${apiAccountId}/envelopes`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(envelopeDefinition),
      });

      const result = await response.json();
      if (response.ok) {
        console.log("Envelope Sent:", result);
        alert("Envelope sent successfully!");
      } else {
        console.error("Error:", result);
        alert("Error sending envelope.");
      }
    } catch (error) {
      console.error("File Processing or API Error:", error);
      alert("An error occurred while sending the envelope.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch envelope details by ID
  const handleFetchEnvelope = async () => {
    if (!authToken) {
      alert("Please log in first.");
      return;
    }

    if (!envelopeId.trim()) {
      alert("Please enter an envelope ID.");
      return;
    }

    setLoading(true);
    setError(null);
    setEnvelopeData(null);

    try {
      const apiUrl = `https://demo.docusign.net/restapi/v2.1/accounts/${apiAccountId}/envelopes/${envelopeId}`;
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch envelope.");
      }

      const data = await response.json();
      setEnvelopeData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch and view document
  const handleViewDocument = async () => {
    if (!authToken) {
      alert("Please log in first.");
      return;
    }

    if (!envelopeId.trim()) {
      alert("Please enter an envelope ID.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Fetch document list
      const docListUrl = `https://demo.docusign.net/restapi/v2.1/accounts/${apiAccountId}/envelopes/${envelopeId}/documents`;
      const docListResponse = await fetch(docListUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!docListResponse.ok) {
        const errorData = await docListResponse.json();
        throw new Error(errorData.message || "Failed to fetch document list.");
      }

      const docList = await docListResponse.json();
      if (docList && docList.envelopeDocuments && docList.envelopeDocuments.length > 0) {
        const documentId = docList.envelopeDocuments[0].documentId;

        // Fetch specific document
        const documentUrl = `https://demo.docusign.net/restapi/v2.1/accounts/${apiAccountId}/envelopes/${envelopeId}/documents/${documentId}`;
        const documentResponse = await fetch(documentUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!documentResponse.ok) {
          const errorData = await documentResponse.json();
          throw new Error(errorData.message || "Failed to fetch document.");
        }

        const blob = await documentResponse.blob();

        // Open document in a new tab
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
      } else {
        alert("No documents found in the envelope.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Docusign</h1>
      <p>Access Token: {access_token}</p>
      <p>Type: {type}</p>
      <p>State: {state}</p>

      {/* File Upload */}
      <div>
        <h3>Send Envelope</h3>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button onClick={sendSignatureRequest} disabled={loading}>
          {loading ? "Sending..." : "Send for Signature"}
        </button>
      </div>

      {/* Fetch Envelope */}
      <div style={{ marginTop: "20px" }}>
        <h3>Retrieve Envelope</h3>
        <input
          type="text"
          placeholder="Enter Envelope ID"
          value={envelopeId}
          onChange={(e) => setEnvelopeId(e.target.value)}
          style={{
            padding: "10px",
            fontSize: "16px",
            marginRight: "10px",
            width: "300px",
          }}
        />
        <button onClick={handleFetchEnvelope} disabled={loading}>
          {loading ? "Fetching..." : "Fetch Envelope"}
        </button>
        <button onClick={handleViewDocument} disabled={loading} style={{ marginLeft: "10px" }}>
          {loading ? "Loading Document..." : "View Document"}
        </button>
      </div>

      {/* Display Envelope Data */}
      {error && (
        <div style={{ marginTop: "20px", color: "red" }}>
          <strong>Error:</strong> {error}
        </div>
      )}
      {envelopeData && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px" }}>
          <h3>Envelope Details</h3>
          <p>
            <strong>Envelope ID:</strong> {envelopeData.envelopeId}
          </p>
          <p>
            <strong>Status:</strong> {envelopeData.status}
          </p>
          <p>
            <strong>Sent Date:</strong> {envelopeData.statusDateTime}
          </p>
          <p>
            <strong>URI:</strong> {envelopeData.uri}
          </p>
        </div>
      )}
    </div>
  );
};

export default Docusign;
