import React from "react";
import { useSelector } from "react-redux";
import { countCasesByStage } from "../../utils";

const CaseOverview = () => {
    const { cases } = useSelector((state) => state?.case?.casesData);
    const caseData = countCasesByStage(cases);

    return (
        <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-12">
                <div className="grid grid-cols-6 gap-6">
                    <div className="card flex flex-col justify-between h-full">
                        <p className="text-[22px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Total Open Cases</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{cases?.length > 0 ? cases?.length : 0}</span>
                        </p>
                    </div>
                    <div className="card flex flex-col justify-between h-full">
                        <span className="text-sm text-secondary-300">Cases</span>
                        <p className="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Setting Up</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{caseData?.settingUp}</span>
                        </p>


                    </div>
                    <div className="card flex flex-col justify-between h-full">
                        <span className="text-sm text-secondary-300">Cases</span>
                        <p className="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Contract Preparing</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{caseData?.contractPreparing}</span>
                        </p>


                    </div>
                    <div className="card flex flex-col justify-between h-full">
                        <span className="text-sm text-secondary-300">Cases</span>
                        <p className="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Contract Signing</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{caseData?.contractSigning}</span>
                        </p>


                    </div>
                    <div className="card flex flex-col justify-between h-full">
                        <span className="text-sm text-secondary-300">Cases</span>
                        <p className="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Mortgage & Title</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{caseData?.mortgageTitle}</span>
                        </p>


                    </div>
                    <div className="card flex flex-col justify-between h-full">
                        <span className="text-sm text-secondary-300">Cases</span>
                        <p className="text-[18px] text-secondary-800 font-medium leading-[30px] mb-[18px]">
                            <span>Closing</span>
                        </p>

                        <p className="text-[35px] text-secondary-800 font-medium leading-[30px] mt-auto ">
                            <span>{caseData?.closing}</span>
                        </p>

                    </div>

                </div>
            </div>
        </div>
    );
};

export default CaseOverview;
