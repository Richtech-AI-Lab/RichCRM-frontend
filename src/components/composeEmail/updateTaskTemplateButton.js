import React from "react";
import { toast } from 'react-toastify';
import { API_ENDPOINTS } from '../../constants/api';
import { postRequest } from '../../axios/interceptor';
import XButton from "../../components/button/XButton";
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

export const UpdateTaskTemplateButton = ({ templateTitle, editorState, taskItem, setLoader }) => {

  const updateTemplate = async () => {
    setLoader(true);
    try {
      const response = await postRequest(API_ENDPOINTS.CREATE_TASK_TEMPLATE_WITH_TEMPLATE_OBJECTS, {
        taskName: taskItem?.name,
        taskType: taskItem?.taskType,
        templateObjs: [{
          templateTitle: templateTitle,
          templateContent: draftToHtml(convertToRaw(editorState.getCurrentContent()))
        }]
      });
      const results = response?.data;
      if (results?.status === "success") {
        const updateTaskRes = await postRequest(API_ENDPOINTS.UPDATE_TASK, {
          taskId: taskItem?.taskId,
          taskType: taskItem?.taskType,
          name: taskItem?.name,
          status: taskItem?.status,
          templates: results?.data[0]?.templates,
        });

        if (updateTaskRes?.data?.status === "success") {
          console.log("Task template updated successfully");
          toast.success("Task template updated successfully");
        } else {
          console.error("Error updating task template: ", updateTaskRes?.data?.message);
          toast.error(`Error updating task template: ${updateTaskRes?.data?.message}`);
        }
      } else {
        console.error("Error updating template: ", results?.message);
        toast.error(`Error updating template: ${results?.message}`);
      }
      setLoader(false);
      return results;
    } catch (error) {
      setLoader(false);
      console.error("Error updating template: ", error);
    }
  }
  return (
    <XButton
      text="Update Template"
      onClick={updateTemplate}
      type="button"
      className="mr-1 bg-gray-100 text-active-blue-text text-base py-[10px] px-6 rounded-[100px] m"
    />
  );
}

export default UpdateTaskTemplateButton;