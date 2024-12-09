import React, { useState, useEffect } from "react";
import { XButton } from "../../components";
import { oAuthServiceProvider, userInfoPath, ImplicitGrant } from "../../components/docusign/oauth";

class UserInfo {
  constructor() {
    this.accessToken = null;
    this.expiresIn = null;
    this.name = null;
    this.userId = null;
    this.email = null;
    this.accounts = null;
  }

  setAccessToken(accessToken) {
    this.accessToken = accessToken;
  }

  setExpiresIn(expiresIn) {
    this.expiresIn = expiresIn;
  }

  async fetchUserInfo() {
    try {
      const userInfoResponse = await fetch(`${oAuthServiceProvider}${userInfoPath}`, {
        mode: "cors",
        headers: new Headers({
            Authorization: `Bearer ${this.accessToken}`,
            Accept: `application/json`,
            "X-DocuSign-SDK": "CodePen"
        })
      });
      if (userInfoResponse && userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json();
        this.name = userInfo.name;
        this.userId = userInfo.sub;
        this.email = userInfo.email;
        this.accounts = userInfo.accounts.map(a => {
          return {
            accountId: a.account_id,
            accountName: a.account_name,
            accountIsDefault: a.is_default,
          }
        })
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
      throw error;
    }
  }
}

const Docusign = () => {
  const [userInfo, setUserInfo] = useState(new UserInfo());
  const docusign = new ImplicitGrant({
    workingUpdateF: (working) => {
      console.log("working", working);
    },
  });
  
  const messageListener = async (event) => {
    console.log(event);

    if (!event.data) return;

    console.log("event.data", event.data);
    const source = event.data.source;
    if (source === "oauthResponse") {
      implicitGrantMsg(event.data);
    }
  };

  const implicitGrantMsg = async (eventData) => {
    const oAuthResponse = docusign.handleMessage(eventData);
    if (oAuthResponse == "ok") {
      userInfo.setAccessToken(docusign.accessToken);
      userInfo.setExpiresIn(docusign.accessTokenExpires);
      await userInfo.fetchUserInfo();
      setUserInfo({ ...userInfo });
      console.log("oAuthResponse", oAuthResponse);
    } else if (oAuthResponse == "error") {
      console.log("oAuthResponse", oAuthResponse);
    }
  };

  useEffect(() => {
    window.addEventListener("message", messageListener);
    return () => {
      window.removeEventListener("message", messageListener);
    };
  }, []);

  const handleLogin = async () => {
    await docusign.login();
  };

  const [selectedFile, setSelectedFile] = useState(null);
  const [envelopeId, setEnvelopeId] = useState("");
  const [envelopeData, setEnvelopeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiAccountId = process.env.REACT_APP_DS_API_ACCOUNT_ID; // Replace with your account ID

  // Handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };


  const [signerEmail, setSignerEmail] = useState("");
  const [signerName, setSignerName] = useState("");

  // Send envelope with the selected file
  const sendSignatureRequest = async () => {
    if (!userInfo.accessToken) {
      docusign.login();
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
              email: signerEmail, // Replace with actual signer email
              name: signerName, // Replace with actual signer name
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
          Authorization: `Bearer ${userInfo.accessToken}`,
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
    if (!userInfo.accessToken) {
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
          Authorization: `Bearer ${userInfo.accessToken}`,
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
    if (!userInfo.accessToken) {
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
          Authorization: `Bearer ${userInfo.accessToken}`,
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
            Authorization: `Bearer ${userInfo.accessToken}`,
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
      <div className="flex justify-end">
        <XButton
          text="Connect to Docusign"
          onClick={handleLogin}
          className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
        />
      </div>
      {/* User Info Card */}
      {userInfo.name && (
        <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "10px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
          <h3>User Information</h3>
          <p>
        <strong>Name:</strong> {userInfo.name}
          </p>
          <p>
        <strong>Email:</strong> {userInfo.email}
          </p>
          <p>
        <strong>User ID:</strong> {userInfo.userId}
          </p>
          <h4>Accounts</h4>
          {userInfo.accounts && userInfo.accounts.map((account, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <p>
            <strong>Account Name:</strong> {account.accountName}
          </p>
          <p>
            <strong>Account ID:</strong> {account.accountId}
          </p>
          <p>
            <strong>Default:</strong> {account.accountIsDefault ? "Yes" : "No"}
          </p>
        </div>
          ))}
        </div>
      )}

      {/* Upload Card */}
      <div style={{ marginTop: "20px", border: "1px solid #ccc", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
        <h3>Send Envelope</h3>
        <div style={{ marginBottom: "10px" }}>
          <label>
        Signer Email:
        <input
          type="email"
          value={signerEmail}
          onChange={(e) => setSignerEmail(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginLeft: "10px", width: "300px" }}
        />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
        Signer Name:
        <input
          type="text"
          value={signerName}
          onChange={(e) => setSignerName(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginLeft: "10px", width: "300px" }}
        />
          </label>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>
        Upload File:
        <input type="file" accept=".pdf" onChange={handleFileChange} style={{ marginLeft: "10px" }} />
          </label>
        </div>
        <XButton
          text={loading ? "Sending..." : "Send for Signature"}
          onClick={sendSignatureRequest}
          disabled={loading}
          className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
        />
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
        <XButton
          text={loading ? "Fetching..." : "Fetch Envelope"}
          onClick={handleFetchEnvelope}
          disabled={loading}
          className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
        />
        <XButton
          text={loading ? "Loading Document..." : "View Document"}
          onClick={handleViewDocument}
          disabled={loading}
          className="bg-active-blue shadow-shadow-light text-sm text-active-blue-text py-[10px] px-6 rounded-[100px] font-medium"
          style={{ marginLeft: "10px" }}
        />
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
