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
      <div className="bg-white rounded-2xl mb-5 shadow-card">
        {true && (
          <div className="flex flex-col p-4 justify-center items-start gap-2 self-stretch">
            <span className="text-base font-bold">OneDrive</span>
            {/* <p className="text-sm font-normal">Mattis amet eu velit viverra aliquet porta at a. Auctor lectus tincidunt facilisis pellentesque maecenas enim sed dolor adipiscing.</p> */}
          </div>
        )}
        <div className="flex flex-col px-4 py-3 items-start gap-4 self-stretch">
          <div className="flex flex-col items-start gap-2 self-stretch">
            <span className="text-base font-medium">Default Storage Path</span>
            <p className="text-sm font-normal">
              Set a default OneDrive storage path to automatically save new
              files uploaded via the CRM platform.
            </p>
          </div>
          <div className="flex items-center gap-2 self-stretch">
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
              className="shadow-shadow-light bg-active-blue text-base text-active-blue-text py-[10px] px-6 mr-2 rounded-[100px]"
            />
            <XButton
              type="submit"
              text="Set"
              onClick={() => {
                onFolderSave();
              }}
              className="shadow-shadow-light bg-active-blue text-base text-active-blue-text py-[10px] px-6 rounded-[100px]"
            />
          </div>
        </div>

        {/* <div>
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
        </div> */}
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
