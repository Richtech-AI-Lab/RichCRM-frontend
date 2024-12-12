import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { TextInput, XButton } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { updateUserRequest } from "../../redux/actions/authActions";
import { OneDrivePathModal } from "./oneDrivePathModal";

export const DefaultPathSetting = ({ title }) => {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showOneDriveModal, setShowOneDriveModal] = useState(false);
  const [uploadFolderUrlInput, setUploadFolderUrlInput] = useState(null);
  const { data } = useSelector((state) => state.auth.user);

  useEffect(() => {
    setUploadFolderUrlInput(data[0]?.uploadFolderName);
  }, [data]);

  const onFolderSave = async () => {
    if (
      uploadFolderUrlInput &&
      uploadFolderUrlInput.length > 0 &&
      uploadFolderUrlInput.trim().length > 0
    ) {
      const payload = {
        role: data[0]?.role,
        userName: data[0]?.userName,
        password: data[0]?.password,
        emailAddress: data[0]?.emailAddress,
        uploadFolderName: uploadFolderUrlInput,
      };
      dispatch(updateUserRequest(payload));
      // console.log('Folder Key set:', uploadFolderUrlInput);
    } else {
      console.error("Folder Key is empty");
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-2xl mb-5 shadow-card">
        {title && (
          <div className="flex justify-between items-center mb-2">
            <span className="text-base text-secondary-800 font-medium">
              Upload Folder URL
            </span>
          </div>
        )}
        <p className="mb-6">
          Please specify the folder name in which you want to save your data.
        </p>

        <div>
          <span className={`left-txt flex items-center`}>Default Path</span>
          <div className="flex items-center">
            <div className="mb-2 flex-1 mr-4">
              <TextInput
                disabled
                type="text"
                value={"https://graph.microsoft.com/v1.0/drive/root/"}
              />
            </div>
          </div>
        </div>
        <div>
          <span className={`left-txt flex items-center`}>Folder Name</span>
          <div className="flex items-center">
            <div className="mb-2 flex-1 mr-4">
              <TextInput
                name="Path"
                type="text"
                placeholder="Enter Name"
                value={uploadFolderUrlInput}
                onChange={(e) => {
                  setUploadFolderUrlInput(e.target.value);
                }}
              />
            </div>

            <XButton
              // type="submit"
              text="Browse"
              onClick={() => setShowOneDriveModal(true)}
              className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 mr-2 rounded-[100px]"
            />
            <XButton
              type="submit"
              text="Set"
              onClick={() => {
                onFolderSave();
              }}
              className="bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
            />
          </div>
        </div>
      </div>
      {showOneDriveModal && (
        <OneDrivePathModal
          onClose={() => setShowOneDriveModal(!showOneDriveModal)}
          setUploadFolderUrlInput={setUploadFolderUrlInput}
        />
      )}
    </>
  );
};
