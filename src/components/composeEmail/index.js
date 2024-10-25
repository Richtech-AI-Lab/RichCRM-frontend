import React, { useEffect, useState } from 'react';
import XButton from "../../components/button/XButton"
import { IoIosClose } from 'react-icons/io';
import logo from '../../assets/images/logo-dark.png'
import avatar from '../../assets/images/contact_avtar.png'
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from 'formik';
import { sendEmailRequest } from '../../redux/actions/utilsActions';
import { API_ENDPOINTS } from '../../constants/api';
import { postRequest } from '../../axios/interceptor';
import { toast } from 'react-toastify';
import { Spinner } from 'flowbite-react';

const ComposeEmail = ({ onClose, templates, onSendEmail }) => {
  const dispatch = useDispatch();
  const { client } = useSelector((state) => state.client);
  const clientObj = client?.data?.length > 0 ? client?.data : null;
  const { organization } = useSelector((state) => state.organization);
  const organizationObj = organization?.data?.length > 0 ? organization?.data : null;
  const { casesData } = useSelector((state) => state.case);
  const caseObj = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
  const [inputValue, setInputValue] = useState('');
  const [toEmail, setToEmail] = useState([]);
  const [template, setTemplate] = useState('');
  const [loader, setLoader] = useState();

  useEffect(() => {
    const isClientTypeIndividual = caseObj?.clientType === 0;
    const targetObj = isClientTypeIndividual ? clientObj : organizationObj;
    
    if (targetObj?.length > 0) {
      const email = targetObj[0]?.email;
      
      if (email) {
        setToEmail([email]);
      } else {
        toast.error("Please update client email, No email exists!");
      }
    }
    
    const fetchData = async () => {
      setLoader(true)
      try {
        const response = await postRequest(API_ENDPOINTS.READ_TEMPLATE_BY_NAME, {
          templateTitle: templates[0],
        });
        const results = response?.data?.data[0];
        await updateTemplate()
      } catch (error) {
        setLoader(false)
        console.error("Error fetching client data:", error);
      }
    };

    fetchData();

  }, []);

  const initialValues = {
    toAddresses: [""],
    ccAddresses: [""],
    templateTitle: template?.templateTitle,
    templateContent: template?.templateContent
  };
  const updateTemplate = async () => {
    try {
      const response = await postRequest(API_ENDPOINTS.UPDATE_TEMPLATE_BY_NAME, {
        templateTitle: templates[0],
        data: {
          clientObj: clientObj[0],
          caseObj,
        }
      });
      const results = response?.data?.data[0];
      setTemplate(results);
      setLoader(false)
      return results;
    } catch (error) {
      setLoader(false)
      console.error("Error fetching client data:", error);
    }

  };

  const handleSubmit = async (values) => {
    if (!toEmail.length > 0) {
      toast.error("Please Enter to Address")
      return false
    }
    try {
      const payload = {
        toAddresses: toEmail,
        ccAddresses: toEmail,
        templateTitle: values.templateTitle,
        templateContent: values.templateContent,
      };

      dispatch(sendEmailRequest(payload));
      onSendEmail(1)
      onClose();
    } catch (error) {
      toast.error(error)
      console.error("Error updating template or sending email:", error);
    }
  };

  // For To Email 
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  // For To Email 
  const handleInputBlur = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(inputValue)) {
      setToEmail((prevEmails) => [...prevEmails, inputValue]);
      setInputValue('');
    }
  };
  // For To Email 
  const removeToEmail = (index) => {
    const updatedEmails = toEmail.filter((_, i) => i !== index);
    setToEmail(updatedEmails);
  }
  // alert(initialValues.templateTitle)
  return (
    <>
      <div className="bg-white rounded-2xl shadow-card fixed bottom-3 right-3 w-[552px]">
        <div className="flex justify-between items-center p-4">
          <h3 className="text-base text-secondary-800 font-medium">Compose Message</h3>
          <IoIosClose size={28} onClick={onClose} className="text-text-gray-100 cursor-pointer" />
        </div>
        <Formik
          enableReinitialize
          initialValues={initialValues}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (

            <form onSubmit={handleSubmit} className="">
              <div className="mx-4">
                <div className="border-b border-b-border py-[6px] flex items-center">
                  <label className="inline text-sm font-medium text-text-gray-100 mr-2">To</label>
                  <ul>
                    {toEmail?.map((item, index) =>
                      <li className="flex items-center p-2 bg-bg-gray-300 rounded-full">
                        <img src={avatar} alt="" className="mr-2" />
                        <span>{item}</span>
                        <IoIosClose size={28} className="text-text-gray-100 cursor-pointer" onClick={() => removeToEmail(index)} />
                      </li>
                    )}

                  </ul>
                  <input
                    type="text"
                    className="inline border-0 focus:ring-transparent"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur} // or use onKeyDown to detect 'Enter' key
                    placeholder="Enter email"
                  />
                </div>
                <div className="border-b border-b-border py-[6px]">
                  <label className="inline text-sm font-medium text-text-gray-100 mr-2">Subject</label>
                  <input
                    name='templateTitle'
                    type="text"
                    // placeholder="Subject"
                    value={values.templateTitle}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "templateTitle" }}
                    className="inline border-0 focus:ring-transparent"
                  />
                </div>
              </div>

              {loader ? <div className='flex justify-center items-center min-h-[calc(100vh-440px)]'>
                <Spinner
                  size="xl"
                  animation="border"
                  role="status"
                  variant="primary"
                // className={`spinner-5`}
                >
                  <span className="visually-hidden">Loading...</span>

                </Spinner></div> :

                <div className="mx-4 py-3">
                  <textarea
                    name='templateContent'
                    // placeholder="templateContent"
                    value={values.templateContent}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    field={{ name: "templateContent" }}
                    rows={15}
                    className="inline border-0 p-0 resize-none w-full focus:ring-transparent"
                  />
                </div>
              }
              <div className="mx-4 pb-3 flex">
                <img src={logo} alt="" className="mr-4" />
                <div>
                  <h3 className="text-base text-secondary-800 font-semibold">Gary Tang</h3>
                  <p className="text-sm text-text-gray-100 font-medium">Paralegal ; Office Manager </p>
                </div>
              </div>

              <div className="text-end px-4 py-3 shadow-full rounded-bl-2xl rounded-br-2xl">
              <XButton
                  text="Attach"
                  type="text"
                  className="bg-active-blue text-active-blue-text text-base py-[10px] px-6 rounded-[100px]"
                />
                <XButton
                  text="Send"
                  type="text"
                  className="bg-active-blue text-active-blue-text text-base py-[10px] px-6 rounded-[100px]"
                />
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ComposeEmail;
