import React from 'react';
import { IMAGES } from '../../constants/imagePath';

const AuthFormContainer = ({ title, subtitle, stepIndicator, children }) => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="w-[456px] pt-3 px-4 pb-6 flex justify-center items-center" >
                    {/* <img src={IMAGES.RichCRM_Logo_Sm} className='w-23'/> */}
                    <svg xmlns="http://www.w3.org/2000/svg" width="221" height="40" viewBox="0 0 221 40" fill="none">
                        <g opacity="0.4" clip-path="url(#clip0_2212_22915)">
                            <path d="M57.8698 35.0512V10.3292H77.5503C78.3803 10.3292 79.1381 10.5418 79.8217 10.9649C80.5052 11.3901 81.055 11.9499 81.4711 12.6506C81.885 13.3492 82.0931 14.1238 82.0931 14.9721V21.7801C82.0931 22.6045 81.885 23.3726 81.4711 24.0842C81.055 24.7958 80.5052 25.3555 79.8217 25.7699C79.1381 26.1821 78.3803 26.3882 77.5503 26.3882L61.9073 26.4229V35.0534H57.8698V35.0512ZM62.5123 22.2249H77.4165C77.5736 22.2249 77.7137 22.1685 77.8369 22.0535C77.96 21.9385 78.0215 21.791 78.0215 21.6065V15.074C78.0215 14.9135 77.96 14.7703 77.8369 14.6445C77.7137 14.5186 77.5736 14.4557 77.4165 14.4557H62.5123C62.3552 14.4557 62.2151 14.5186 62.092 14.6445C61.9689 14.7703 61.9073 14.9135 61.9073 15.074V21.6065C61.9073 21.791 61.9689 21.9385 62.092 22.0535C62.2151 22.1685 62.3552 22.2249 62.5123 22.2249ZM77.4505 35.0512L70.0143 25.9739H75.2959L81.9912 34.088V35.0512H77.4484H77.4505Z" fill="#1A1C1F" />
                            <path d="M85.4917 12.7006V8.5741H89.4953V12.7006H85.4917ZM85.4917 35.0513V15.1088H89.4953V35.0513H85.4917Z" fill="#1A1C1F" />
                            <path d="M95.0273 34.4156C94.3438 33.9903 93.794 33.4306 93.38 32.7298C92.964 32.0312 92.7581 31.2675 92.7581 30.4431V19.7147C92.7581 18.8903 92.9661 18.1288 93.38 17.428C93.7961 16.7294 94.3438 16.1675 95.0273 15.7422C95.7109 15.3192 96.4581 15.1066 97.2648 15.1066H112.538V19.1983H97.4006C97.2202 19.1983 97.0695 19.2613 96.9464 19.3871C96.8232 19.5129 96.7617 19.6691 96.7617 19.8514V30.3043C96.7617 30.4887 96.8232 30.6427 96.9464 30.7686C97.0695 30.8944 97.2202 30.9573 97.4006 30.9573H112.572V35.0491H97.2648C96.4581 35.0491 95.7109 34.8365 95.0273 34.4134V34.4156Z" fill="#1A1C1F" />
                            <path d="M115.5 35.0512V8.57617H119.503V15.1087H130.841C131.648 15.1087 132.393 15.3213 133.079 15.7444C133.762 16.1696 134.308 16.7315 134.711 17.4301C135.114 18.1287 135.316 18.8924 135.316 19.7168V35.0512H131.313V19.8535C131.313 19.6713 131.251 19.515 131.128 19.3892C131.005 19.2634 130.862 19.2005 130.708 19.2005H120.144C119.966 19.2005 119.813 19.2634 119.69 19.3892C119.567 19.515 119.505 19.6713 119.505 19.8535V35.0512H115.502H115.5Z" fill="#1A1C1F" />
                            <path d="M142.582 35.0513C141.752 35.0513 140.99 34.8452 140.296 34.4329C139.6 34.0207 139.05 33.4588 138.647 32.7472C138.243 32.0378 138.042 31.2567 138.042 30.4084V14.9352C138.042 14.0869 138.243 13.308 138.647 12.5964C139.05 11.887 139.6 11.3251 140.296 10.9107C140.99 10.4985 141.755 10.2924 142.582 10.2924H162.197V14.4536H143.289C142.931 14.4536 142.638 14.562 142.415 14.779C142.19 14.9981 142.077 15.2888 142.077 15.6555V29.6838C142.077 30.0505 142.19 30.3433 142.415 30.5603C142.638 30.7794 142.931 30.8879 143.289 30.8879H162.197V35.0491H142.582V35.0513Z" fill="#1A1C1F" />
                            <path d="M165.693 35.0512V10.3292H185.374C186.204 10.3292 186.96 10.5418 187.645 10.9649C188.329 11.3901 188.879 11.9499 189.293 12.6506C189.709 13.3492 189.915 14.1238 189.915 14.9721V21.7801C189.915 22.6045 189.707 23.3726 189.293 24.0842C188.879 24.7958 188.329 25.3555 187.645 25.7699C186.962 26.1821 186.204 26.3882 185.374 26.3882L169.729 26.4229V35.0534H165.691L165.693 35.0512ZM170.336 22.2249H185.24C185.397 22.2249 185.537 22.1685 185.661 22.0535C185.784 21.9385 185.845 21.791 185.845 21.6065V15.074C185.845 14.9135 185.784 14.7703 185.661 14.6445C185.537 14.5186 185.397 14.4557 185.24 14.4557H170.336C170.179 14.4557 170.039 14.5186 169.916 14.6445C169.793 14.7703 169.731 14.9135 169.731 15.074V21.6065C169.731 21.791 169.793 21.9385 169.916 22.0535C170.039 22.1685 170.179 22.2249 170.336 22.2249ZM185.274 35.0512L177.84 25.9739H183.122L189.817 34.088V35.0512H185.274Z" fill="#1A1C1F" />
                            <path d="M193.449 35.0513V10.2946H198.058L207.141 21.3658L216.191 10.2946H220.833V35.0513H216.762V16.0721L207.139 27.7963L197.485 16.1068V35.0513H193.447H193.449Z" fill="#1A1C1F" />
                            <path d="M41.0296 40C40.2484 35.3854 37.5333 31.2025 33.3747 28.7314C36.8774 25.7482 39.1127 21.2616 39.1127 16.2478C39.1127 7.28752 31.9822 0 23.2171 0H0V39.9978H9.70122H41.0296V40ZM2.8021 14.703C10.8263 18.3587 20.224 14.6727 23.7988 6.47828C20.224 14.6727 23.8264 24.2838 31.8463 27.9373C23.8285 24.2838 14.4287 27.959 10.8539 36.1556C14.4287 27.9612 10.8284 18.3609 2.80423 14.7052L2.8021 14.703Z" fill="#1A1C1F" />
                        </g>
                        <defs>
                            <clipPath id="clip0_2212_22915">
                                <rect width="220.833" height="40" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
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