import React from 'react';

const StepperProgress = ({ steps, currentStep }) => {
    return (
        <ol className="flex items-center w-full">
            {steps.map((step, index) => (
                <li key={index} className={`flex w-full items-center ${index < steps.length - 1 ? 'after:content-[\'\'] after:w-full after:h-1 after:border-b after:border-4 after:inline-block' : ''} ${index < currentStep ? 'text-blue-600 dark:text-blue-500 after:border-blue-100 dark:after:border-blue-800' : 'after:border-gray-100 dark:after:border-gray-700'}`}>
                    <span className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 ${index < currentStep ? 'bg-blue-100 dark:bg-blue-800' : 'bg-gray-100 dark:bg-gray-700'} shrink-0`}>
                        {index < currentStep ? (
                            <svg className="w-3.5 h-3.5 text-blue-600 lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5.917 5.724 10.5 15 1.5" />
                            </svg>
                        ) : (
                            <svg className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                                <circle cx="12" cy="12" r="5" />
                            </svg>
                        )}
                    </span>
                    <span className="ml-2">{step}</span>
                </li>
            ))}
        </ol>
    );
};

export default StepperProgress;
