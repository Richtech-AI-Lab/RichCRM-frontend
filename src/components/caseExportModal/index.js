import React from "react";
import { Modal } from "flowbite-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import XButton from "../button/XButton";
import SelectInput from "../selectinput";

const validationSchema = Yup.object({
  template: Yup.number().required("Template is required"),
  format: Yup.number().required("Format is required"),
});

const CaseExportModal = ({ onClose, setPdfModal=()=>{} }) => {
  const dropdownOptions = [
    { value: 1, label: "Case Overview" },
    { value: 2, label: "Case Details" },
  ];
  const caseDocumentOptions = [
    { value: 1, label: "PDF" },
    { value: 2, label: "JPG" },
  ];

  const handleSubmit = (values)=> {
    setPdfModal(true)
    if (values) {
      onClose();
    }
  }
  return (
    <Modal show={true} size="md" onClose={onClose} className="new-case-modal">
      <Modal.Header className="border-b-0">
        <div>
          <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">
            Export
          </h2>
        </div>
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ template: "", format: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <h2>Template</h2>
                <div className="w-full">
                  <Field
                    as="select"
                    name="template"
                    className="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                  >
                    <option value="">Select Template</option>
                    {dropdownOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="template"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div>
                <h2>Format</h2>
                <div className="w-full">
                  <Field
                    as="select"
                    name="format"
                    className="bg-input-surface w-full rounded-[40px] border-0 py-3 px-4 text-sm leading-6 mt-3"
                  >
                    <option value="">Select Format</option>
                    {caseDocumentOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage
                    name="format"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <XButton
                  text="Cancel"
                  onClick={onClose}
                  className="bg-card-300 shadow-shadow-light text-sm text-primary2 py-[10px] px-6 rounded-[100px] font-medium"
                />
                <XButton
                  text="Next"
                  type="submit"
                  // onClick={()=>{}}
                  className="bg-primary2 text-sm text-white py-[10px] px-6 rounded-[100px] font-medium"
                />
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default CaseExportModal;
