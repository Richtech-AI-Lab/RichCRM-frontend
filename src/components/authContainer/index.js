import React from 'react';

const AuthFormContainer = ({ title, subtitle, stepIndicator, children }) => {
    return (
        <div className="container mx-auto">
            <div className="flex justify-center items-center h-screen">
                <div className="w-[456px] pt-3 px-4 pb-6 rounded-3xl bg-white shadow-card">
                    {stepIndicator && <div className="mb-6">{stepIndicator}</div>}
                    <div className="mb-7">
                        <h2 className="mb-2 text-[28px] leading-9 font-medium text-secondary-800">{title}</h2>
                        <p className="text-sm leading-5 text-secondary-700">{subtitle}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    )
}


export default AuthFormContainer