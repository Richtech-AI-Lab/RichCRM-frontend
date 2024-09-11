import React, { useCallback, useEffect, useState } from "react";
import { MdFileCopy } from "react-icons/md";
import { TbFolderSearch } from "react-icons/tb";
import XButton from "../button/XButton";
import ChecklistItem from "../checklist";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { PiFolderLight } from "react-icons/pi";
import { FaCircle, FaClipboardList } from "react-icons/fa";
import { TiMessages } from "react-icons/ti";
import { CgFolder } from "react-icons/cg";
import { BiMessageAltCheck } from "react-icons/bi";
import { LuUpload } from "react-icons/lu";
import StepperProgress from "../stepperProgress";
import { Dropdown, Spinner } from "flowbite-react";
import MenuDropdown from "../menupopup";
import MenuPopup from "../menupopup";
import { useDispatch, useSelector } from "react-redux";
import { createStageRequest, getStageRequest } from "../../redux/actions/stagesActions";
import { getTaskRequest } from "../../redux/actions/taskActions";
import { STAGESNAMES } from "../../constants/constants";
import { isEmpty } from "lodash";
import XSpinnerLoader from "../spinnerLoader/XSpinnerLoader";
import { caseCreateSuccess, closeCaseRequest, getClientByIdRequest, updateCaseRequest } from "../../redux/actions/caseAction";

const StagesChecklist = () => {
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState(0);
  const [activeTab, setActiveTab] = useState('mortgage');
  const menuOption1 = ['Create a Task', 'Add a Task']
  const menuOption2 = ['Finish all', 'Edit task']
  const { loading, data, error } = useSelector((state) => state.stages);
  const taskData = useSelector((state) => state.task);
  const { casesData } = useSelector((state) => state.case);


  useEffect(() => {
    // if stage is not exist then create stage.
    if (isEmpty(data)) {
      let sagaPayload = {
        stageType: 0,
        caseId: localStorage.getItem('c_id'),
      }
      dispatch(getStageRequest(sagaPayload));
    }

  }, [data])

  useEffect(() => {
    // if cases have stage then set stage
    const foundCase = casesData?.cases?.find(item => item.caseId === localStorage.getItem('c_id'));
    if (foundCase) {
      setCurrentStep(foundCase?.stage);
    }
  }, [casesData.cases[0].stage])

  //   const foundCase = caseDataGet.find(item => item.caseId === caseId);

  //   if (foundCase) {
  //     setCurrentStep(foundCase.stage);
  //     dispatch(caseCreateSuccess(foundCase));
  //   } else {
  //     dispatch(caseCreateSuccess([])); // Dispatch empty array if not found
  //   }


  //   useEffect(() => {
  //     if (isEmpty(data)) {
  //       let sagaPayload = {
  //         stageType: 0,
  //         caseId: localStorage.getItem('c_id'),
  //       }
  //       dispatch(getStageRequest(sagaPayload));
  //     }
  //     let caseDataGet = localStorage.getItem('c_data');
  //     if (caseDataGet) {
  //       try {
  //         caseDataGet = JSON.parse(caseDataGet);
  //       } catch (error) {
  //         console.error("Error parsing case data from localStorage", error);
  //       }
  //     }
  //        let caseId = localStorage.getItem('c_id');
  //     const foundCase = caseDataGet?.find(item => item.caseId === caseId);
  // console.log(casesData, "casesData");


  //     if (casesData?.cases?.length === 0) {
  //       let caseId = localStorage.getItem('c_id');
  //       dispatch(getClientByIdRequest(caseId));

  //       // setCurrentStep(foundCase.stage);
  //     } else {
  //       if (foundCase) {
  //         // Set init step to stage
  //         setCurrentStep(foundCase.stage);
  //         dispatch(caseCreateSuccess(foundCase));
  //       } else {
  //         dispatch(caseCreateSuccess([])); // Dispatch empty array if not found
  //       }
  //     }
  //   }, [ data])


  // useEffect(() => {
  //   let caseDataGet = localStorage.getItem('c_data');
  //   if (caseDataGet) {
  //     try {
  //       caseDataGet = JSON.parse(caseDataGet);
  //       if (!Array.isArray(caseDataGet)) {
  //         console.error("caseDataGet is not an array");
  //         caseDataGet = [];
  //       }
  //     } catch (error) {
  //       console.error("Error parsing case data from localStorage", error);
  //       caseDataGet = [];
  //     }
  //   } else {
  //     caseDataGet = []; 
  //   }

  //   let caseId = localStorage.getItem('c_id');

  //   if (!caseId) {
  //     console.error("caseId is not found in localStorage");
  //     return;
  //   }

  //   const foundCase = caseDataGet.find(item => item.caseId === caseId);

  //   if (foundCase) {
  //     setCurrentStep(foundCase.stage);
  //     dispatch(caseCreateSuccess(foundCase));
  //   } else {
  //     dispatch(caseCreateSuccess([])); // Dispatch empty array if not found
  //   }

  // }, []); // Empty dependency array

  useEffect(() => {
    if (!isEmpty(data)) {
      getChecklistItems()
    }
  }, [data])


  const getChecklistItems = useCallback(() => {
    let currentstepstr = `${currentStep}`;
    const getTaskPayload = {
      currentStageData: data[STAGESNAMES[currentstepstr]]?.tasks,
      currentStep: currentstepstr
    }
    const response = dispatch(getTaskRequest(getTaskPayload));

  }, [dispatch, currentStep, data])

  const progressItems = [
    "Setting up",
    "Contract Reviewing",
    "Contract Signing",
    "Mortgage & Title",
    "Closing"
  ];

  // const stepperItems = [
  //   settingUpTasks,
  //   contractReviewingTasks,
  //   contractSigningTasks,
  //   // Include mortgageTasks and titleTasks as separate items for the Mortgage & Title step
  //   { mortgageTasks, titleTasks },
  //   closingTasks,
  // ];

  const getHeadLabel = (currentStep) => {
    switch (currentStep) {
      case 0:
        return "Setting up Tasks";
      case 1:
        return "Contract Reviewing Tasks";
      case 2:
        return "Contract Signing Tasks";
      case 3:
        return activeTab === 'mortgage' ? "Mortgage Tasks" : "Title Tasks"; // Update label based on active tab
      case 4:
        return "Closing Tasks";
      default:
        return <></>;
    }
  };


  const handlePreviousStage = async () => {
    if (currentStep > 0) {
      const createStagePayload = {
        stageType: currentStep - 1,
        caseId: localStorage.getItem('c_id'),
      };

      try {
        const stageExists = await checkStageExists(createStagePayload);
        if (stageExists === false) {
          const response = await dispatch(createStageRequest(createStagePayload));
          setCurrentStep(currentStep - 1);
          setActiveTab("mortgage");
        } else {
          setCurrentStep(currentStep - 1);
          setActiveTab("mortgage");
          console.log("Stage already exists. Skipping API call.");
        }
      } catch (error) {
        console.error("Error creating stage:", error.message);
      }
    }
  };

  const handleNextStage = async () => {
    if (currentStep < progressItems.length - 1) {
      const createStagePayload = {
        stageType: currentStep + 1,
        caseId: localStorage.getItem('c_id'),
      };

      try {
        const stageExists = false;
        // const stageExists = await checkStageExists(createStagePayload);
        if (stageExists === false) {
          await dispatch(createStageRequest(createStagePayload));

          // Update case to next stage
          await dispatch(updateCaseRequest({
            caseId: localStorage.getItem('c_id'),
            creatorId: localStorage.getItem("authEmail"),
            stage: currentStep + 1,
          }));

          setCurrentStep(currentStep + 1);
          setActiveTab("mortgage"); // Reset active tab to mortgage when changing step
        } else {
          setCurrentStep(currentStep + 1);
          setActiveTab("mortgage");
          console.log("Stage already exists. Skipping API call.");
        }
      } catch (error) {
        console.error("Error creating stage:", error.message);
      }
    } else if (currentStep === progressItems.length - 1) {
      try {
        const closeCasePayload = {
          caseId: localStorage.getItem('c_id'),
        };
        dispatch(closeCaseRequest(closeCasePayload))
      } catch (error) {
        console.error("Error closer stage:", error.message);
      }
    }
  };

  const getCompletedTasksCount = (tasks) => {
    return tasks?.filter((task) => {
      switch (task.taskType) {
        case 0:
          return task.status === 2; // 'Finished'
  
        case 1:
          return task.status === 2; // 'Uploaded'
  
        case 2:
          return task.status === 2; // 'Finished'
  
        default:
          return false; // For unknown task types
      }
    }).length;
  };

  const checkStageExists = async ({ stageType }) => {
    let stagekey = `${stageType}`
    return data.hasOwnProperty(STAGESNAMES[stagekey])
  };


  function getMortgageDueAlertInfo(casesData, currentStep) {
    if (!casesData || !casesData.cases) {
      return { showAlert: false, daysUntilDue: null };
    }

    const mortgageContingencyDateStr = casesData.cases.mortgageContingencyDate;
    if (!mortgageContingencyDateStr || currentStep !== 3) {
      return { showAlert: false, daysUntilDue: null };
    }

    const mortgageContingencyDate = new Date(mortgageContingencyDateStr);
    const currentDate = new Date();

    // Calculate days difference between the mortgage contingency date and current date
    const timeDiff = mortgageContingencyDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Determine if the alert should be shown
    const showAlert = daysDiff >= 0 && daysDiff <= 8;

    return { showAlert, daysUntilDue: daysDiff };
  }

  function getClosingDueAlertInfo(casesData, currentStep) {
    if (!casesData || !casesData.cases) {
      return { showAlert: false, daysUntilDue: null };
    }

    const closingDateStr = casesData.cases.closingDate;
    if (!closingDateStr || currentStep !== 3) {
      return { showAlert: false, daysUntilDue: null };
    }

    const closingDate = new Date(closingDateStr);
    const currentDate = new Date();

    // Calculate days difference between the closing date and current date
    const timeDiff = closingDate - currentDate;
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    // Determine if the alert should be shown
    const showAlert = daysDiff >= 0 && daysDiff <= 8;

    return { showAlert, daysUntilDue: daysDiff };
  }
  const mortgageAlertInfo = getMortgageDueAlertInfo(casesData, currentStep);
  const closingAlertInfo = getClosingDueAlertInfo(casesData, currentStep);
  // const getChecklistItems = () => {
  //   if (currentStep === 3) {
  //     // Return the active tab's items for the Mortgage & Title step
  //     return activeTab === 'mortgage' ? stepperItems[currentStep].mortgageTasks : stepperItems[currentStep].titleTasks;
  //   }
  //   return stepperItems[currentStep];
  // };
  return (
    <>

      <div className="md:col-span-12 lg:col-span-8">
        <div className="bg-white py-4 rounded-2xl mb-5">
          <div className="px-4">
            <div className="mb-6">
              <span className="text-base text-secondary-800 font-medium">Stage</span>
            </div>
            <div className="w-full">
              <div className="flex gap-2 progress-bars">
                <StepperProgress steps={progressItems} currentStep={currentStep} />
              </div>
            </div>
          </div>
        </div>
        {
          // (localStorage.getItem('c_id') && !taskData.data[STAGESNAMES[currentStep]]) || (!localStorage.getItem('c_id') && taskData.data[STAGESNAMES[currentStep]])
          //  ?  : 
          <>
            {mortgageAlertInfo.showAlert &&
              <div className="bg-danger-100 rounded-2xl px-4 py-2 mb-4">
                <p className="text-white text-base font-medium">The Mortgage is due in {mortgageAlertInfo.daysUntilDue} days.</p>
              </div>
            }
            {closingAlertInfo.showAlert &&
              <div className="bg-danger-100 rounded-2xl px-4 py-2 mb-4">
                <p className="text-white text-base font-medium">The Contract is due in {closingAlertInfo.daysUntilDue} days.</p>
              </div>
            }
            <div className="bg-white py-4 rounded-2xl mb-5">
              <div className={`flex justify-between items-center ${currentStep === 3 ? '' : 'pb-4'} px-4`}>
                {/* <span className="text-base text-secondary-800 font-medium">{getHeadLabel(currentStep)}</span> */}

                {currentStep === 3 ? (
                  <div className="flex justify-start gap-x-8">
                    <span
                      className={`pb-4 cursor-pointer ${activeTab === 'mortgage' ? 'text-base text-secondary-800 font-medium border-b-[3px] border-primary' : 'text-gray-400'}`} onClick={() => setActiveTab('mortgage')}
                    >
                      Mortgage Task ({getCompletedTasksCount(taskData.data[STAGESNAMES[currentStep]])}/{taskData.data[STAGESNAMES[currentStep]].length})
                    </span>
                    <span
                      className={`pb-4 cursor-pointer ${activeTab === 'title' ? 'text-base text-secondary-800 font-medium border-b-[3px] border-primary' : 'text-gray-400'}`}
                      onClick={() => setActiveTab('title')}
                    >
                      Title Task ({getCompletedTasksCount(taskData.data[STAGESNAMES[currentStep]])}/{taskData.data[STAGESNAMES[currentStep]].length})
                    </span>
                  </div>
                ) : (
                  <span className="text-base text-secondary-800 font-medium">{`${getHeadLabel(currentStep)} (${getCompletedTasksCount(taskData.data[STAGESNAMES[currentStep]])}/${taskData.data[STAGESNAMES[currentStep]]?.length})`}</span>
                )}
                <div className="flex items-center gap-2">

                  <MenuPopup dropdownItems={menuOption1} icon={<FiPlus className="text-lg opacity-40" />} />
                  <MenuPopup dropdownItems={menuOption2} icon={<BsThreeDotsVertical className="text-secondary-800 opacity-40" />} />
                </div>
              </div>
              {/* <ul className="mb-6 overflow-y-auto">
        <XSpinnerLoader loading={loading} size="lg" />
          {taskData.data[STAGESNAMES[currentStep]]?.map((item, index) => {
            return (
              <ChecklistItem
              key={index}
                action={item.taskType}
                actionInfo={item.name}
                options={item.options}
                checkboxId={item.checkboxId}
                />
              )
            })}
        </ul> */}
              <ul className="mb-6 overflow-y-auto min-h-[calc(100vh-440px)] flex justify-center items-center">
                {loading && <Spinner
                  size="xl"
                  animation="border"
                  role="status"
                  variant="primary"
                // className={`spinner-${size}`}
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>}

                {!loading && (
                  <div className="w-full">
                    {taskData.data[STAGESNAMES[currentStep]]
                      ?.slice(
                        currentStep === 3
                          ? activeTab === 'title'
                            ? 5
                            : 0
                          : 0, // Start index for slice when currentStep is 3, otherwise start at 0
                        currentStep === 3
                          ? activeTab === 'title'
                            ? 10
                            : 5
                          : taskData.data[STAGESNAMES[currentStep]].length // End index for slice when currentStep is 3, otherwise show all
                      )
                      .map((item, index) => (
                        <ChecklistItem
                          key={index}
                          status={item.status}
                          action={item.taskType}
                          actionInfo={item.name}
                          options={item.options}
                          checkboxId={item.checkboxId}
                        />
                      ))}
                  </div>
                )}
              </ul>
              <div className="flex justify-between items-center pt-5 px-4">
                <XButton
                  text="Back to previous stage"
                  className={`bg-card-300 rounded-full text-sm font-medium py-[10px] px-6 ${currentStep === 0 ? 'opacity-50 cursor-not-allowed text-secondary-300' : 'text-secondary-800'}`}
                  onClick={handlePreviousStage}
                  disabled={currentStep === 0}
                />
                <XButton
                  text={currentStep === progressItems?.length - 1 ? "Close Case" : "Move to next stage"}
                  className="bg-active-blue text-active-blue-text shadow-shadow-light rounded-full text-sm font-medium py-[10px] px-6" onClick={handleNextStage} />
              </div>
            </div></>}
      </div>
    </>
  );
};


export default StagesChecklist;
