import React from "react";
import { Modal } from "flowbite-react";

const CaseExportPdf = ({ onClose }) => {
  return (
    <Modal show={true} size="md" onClose={() => onClose()} className="new-case-modal">
      <style>
        {`
          #divToPrint {
            background-color: #f5f5f5;
            width: 210mm;
            min-height: 297mm;
            margin-left: auto;
            margin-right: auto;
          }
          #divToPrint h2, #divToPrint h3, #divToPrint h4 {
            font-weight: bold;
          }
          #divToPrint p {
            margin: 0;
          }
        `}
      </style>
      <Modal.Header className="border-b-0">
        <div>
          <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
            Export
          </h2>
        </div>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div className="mb5">
          </div>
          <div id="divToPrint">
            <div>
              <h2>Real Estate Transaction</h2>

              <div>
                <h3>SELLER:</h3>
                <p>SS#: ____________________</p>
                <p>SS#: ____________________</p>
                <p>ADDRESS: ____________________</p>
                <p>CELL #: ____________________</p>
                <p>WORK #: ____________________</p>
              </div>

              <div>
                <h3>BUYER:</h3>
                <p>SS#: ____________________</p>
                <p>SS#: ____________________</p>
                <p>ADDRESS: ____________________</p>
                <p>CELL #: ____________________</p>
                <p>WORK #: ____________________</p>
              </div>

              <div>
                <h3>PREMISES BEING SOLD/BOUGHT:</h3>
                <p>BLOCK: ________ LOT: ________</p>
                <p>New Construction <input type="checkbox" /></p>
                <p>1 Family <input type="checkbox" /> 2 Family <input type="checkbox" /></p>

                <h4>SECTION:</h4>
                <p>Condo <input type="checkbox" /> Co-op <input type="checkbox" /> Townhouse <input type="checkbox" /> Vacant Land <input type="checkbox" /></p>
                <p>Vacant at Closing <input type="checkbox" /> Subject to Tenancy <input type="checkbox" /> H.O.A. <input type="checkbox" /> Parking Space ______</p>
                <p>Maintenance Fee: $______ per ______</p>
                <p>Assessments: $______ Paid by: ______</p>
                <p>Managing Company: ____________________</p>

                <h4>If 2 Family:</h4>
                <p>1st Floor Tenant Name: ____________________ Rent: $______ Sec: $______ Lease <input type="checkbox" /></p>
                <p>2nd Floor Tenant Name: ____________________ Rent: $______ Sec: $______ Lease <input type="checkbox" /></p>
              </div>

              <div>
                <h3>Financial Information:</h3>
                <p>PURCHASE PRICE: $______</p>
                <p>DOWN PAYMENT: $______</p>
                <p>SELLER'S CONCESSION: $______</p>
                <p>MTG. AMOUNT: $______</p>
                <p>Annual Property Tax: $______</p>
                <p>CLOSING DATE: ______ <input type="checkbox" /> on/or about <input type="checkbox" /> before <input type="checkbox" /> T.O.E.</p>
              </div>

              <div>
                <h3>Additional Details:</h3>
                <p>ENGINEER INSPECTION: YES <input type="checkbox" /> NO <input type="checkbox" /></p>
                <p>SELLER ATTY: ____________________</p>
                <p>BUYER ATTY: ____________________</p>

                <h4>BROKERS:</h4>
                <p>Sale: ____________________</p>
                <p>Listing: ____________________</p>
                <p>Referred by: ____________________</p>

                <p>BANK (L/O): ____________________</p>
                <p>PERSONAL PROPERTY: ____________________</p>
                <p>EXCLUDED PROPERTY: ____________________</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={() => onClose()}
            className="bg-card-300 shadow-shadow-light text-sm text-primary2 py-[10px] px-6 rounded-[100px] font-medium"
          >
            Cancel
          </button>
          <button
            className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium"
          >
            Print Pdf
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CaseExportPdf;
