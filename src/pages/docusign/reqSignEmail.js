

async function createEnvelope({ name, email, fileb64 }) {
    const signer = {
        name: { SIGNER_NAME },
        email: { SIGNER_EMAIL },
    };
    const envelopeId = await createEnvelope(signer);
    // const docB64 = await data.callApi.getDocB64(docUrl); // fetch a document
    const req = {
        emailSubject: "Please sign the attached document",
        status: "sent",
        documents: [
            {
                name: "Example document",
                documentBase64: fileb64,
                fileExtension: "pdf",
                documentId: envelopeId,
            }
        ],
        recipients: {
            signers: [
                {
                    email: email,
                    name: name,
                    customFields: ["field1: value 1", "field2: value 2"],
                    recipientId: "1",
                    tabs: {
                        signHereTabs: [
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "20",
                                anchorUnits: "pixels"
                            }
                        ],
                        checkboxTabs: [
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "180",
                                anchorUnits: "pixels",
                                tabLabel: "checkbox 1",
                                tabGroupLabels: ["checkbox group"]
                            },
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "180",
                                anchorYOffset: "20",
                                anchorUnits: "pixels",
                                tabLabel: "checkbox 2",
                                tabGroupLabels: ["checkbox group"]
                            }
                        ],
                        tabGroups: [
                            {
                                groupLabel: "checkbox group",
                                groupRule: "SelectExactly",
                                minimumRequired: "1",
                                maximumAllowed: "1",
                                validationMessage: "Please check one option",
                                tabScope: "document",
                                pageNumber: "1",
                                documentId: "1"
                            }
                        ],
                        textTabs: [
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "195",
                                anchorUnits: "pixels",
                                value: "I agree with license 1",
                                locked: "true",
                                font: "Helvetica",
                                fontSize: "Size12",
                                bold: "true"
                            },
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "195",
                                anchorYOffset: "20",
                                anchorUnits: "pixels",
                                value: "I agree with license 2",
                                locked: "true",
                                font: "Helvetica",
                                fontSize: "Size12",
                                bold: "true"
                            },
                            {
                                anchorString: "/sig1/",
                                anchorXOffset: "20",
                                anchorYOffset: "50",
                                anchorUnits: "pixels",
                                bold: "true",
                                font: "Helvetica",
                                fontSize: "Size14",
                                fontColor: "NavyBlue",
                                value:
                                    "Addendum\n‣ Item 1\n‣ Item 2\nThis is a multi-line read-only text field"
                            }
                        ]
                    }
                }
            ]
        }
    };
}

export { createEnvelope };