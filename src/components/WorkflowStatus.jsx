// import React, { useState, useEffect } from 'react';
// import { Camera, Barcode, CircuitBoard, CheckCircle2, XCircle } from 'lucide-react';

// const WorkflowStatus = ({ statusUpdates }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [completedStep, setCompletedStep] = useState(-1);
//   const [snackbarData, setSnackbarData] = useState({ message: '', success: true });
//   const [showSnackbar, setShowSnackbar] = useState(false);
//   const [workflowReset, setWorkflowReset] = useState(false);

//   const getStepColor = (stepIndex, currentStep, completedStep) => {
//     if (stepIndex <= completedStep) return '#4CAF50'; // Green for completed
//     if (stepIndex === currentStep) return '#FFC107'; // Yellow for processing
//     return '#E5E7EB'; // Gray for pending
//   };

//   // Log statusUpdates data whenever it changes
//   useEffect(() => {
//     if (statusUpdates && Object.keys(statusUpdates).length > 0) {
//       console.log('Received new status update:', statusUpdates);
//     }
//   }, [statusUpdates]);  // This will run every time statusUpdates changes

//   const steps = [
//     { id: 0, title: 'Scan Barcode', icon: Barcode, snackbar: { message: 'Barcode scanned successfully!', success: true } },
//     { id: 1, title: 'Product Scan', icon: Camera, snackbar: { message: 'Product Scan completed!', success: true } },
//     { id: 2, title: 'Processing', icon: CircuitBoard, snackbar: { message: 'Processing successful!', success: true } },
//     { id: 3, title: 'Results Ready', icon: CheckCircle2, snackbar: { message: 'Results are ready!', success: true } },
//   ];

//   useEffect(() => {
//     const timer = setInterval(() => {
//       if (workflowReset) return;

//       setCurrentStep((prev) => {
//         if (prev < steps.length - 1) {
//           setCompletedStep(prev);
//           triggerSnackbar(steps[prev].snackbar);
//           return prev + 1;
//         }
//         triggerSnackbar(steps[prev].snackbar);
//         setWorkflowReset(true);
//         setTimeout(() => {
//           setCurrentStep(0);
//           setCompletedStep(-1);
//           setWorkflowReset(false);
//         }, 3000);
//         return prev;
//       });
//     }, 3000);
//     return () => clearInterval(timer);
//   }, [workflowReset]);

//   const triggerSnackbar = (snackbar) => {
//     setSnackbarData(snackbar);
//     setShowSnackbar(true);
//     setTimeout(() => {
//       setShowSnackbar(false);
//     }, 2000);
//   };

//   return (
//     <div className="w-screen p-8 bg-gray-50">
//       <div className="flex justify-between items-center relative">
//         {steps.map((step, index) => (
//           <div key={step.id} className="flex flex-col items-center w-1/4 relative">
//             {index < steps.length - 1 && (
//               <div className="absolute h-0.5 w-full top-6 left-1/2">
//                 <div
//                   className={`h-full`}
//                   style={{
//                     backgroundColor: getStepColor(index, currentStep, completedStep),
//                     transition: 'all 0.5s ease',
//                   }}
//                 />
//               </div>
//             )}

//             <div
//               className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center 
//                 transition-all duration-500"
//               style={{
//                 backgroundColor: getStepColor(index, currentStep, completedStep),
//                 boxShadow: currentStep === index ? '0 0 15px currentColor' : 'none',
//                 color: getStepColor(index, currentStep, completedStep),
//               }}
//             >
//               <step.icon className="w-6 h-6 text-white" />
//             </div>

//             <span
//               className={`mt-2 text-sm font-medium
//               ${currentStep === index ? 'text-gray-800' : 'text-gray-500'}`}
//             >
//               {step.title}
//             </span>

//             {currentStep === index && (
//               <div
//                 className="absolute z-0 w-12 h-12 rounded-full animate-ping opacity-25"
//                 style={{ backgroundColor: getStepColor(index, currentStep, completedStep) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {showSnackbar && (
//         <div
//           className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-lg flex items-center"
//           style={{ zIndex: 50 }}
//         >
//           {snackbarData.success ? (
//             <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
//           ) : (
//             <XCircle className="w-5 h-5 text-red-400 mr-2" />
//           )}
//           <span>{snackbarData.message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkflowStatus;



























// import React, { useState, useEffect } from 'react';
// import { Camera, Barcode, CircuitBoard, CheckCircle2, XCircle } from 'lucide-react';

// const WorkflowStatus = ({ statusUpdates }) => {
//   const [currentStep, setCurrentStep] = useState(0);
//   const [completedStep, setCompletedStep] = useState(-1);
//   const [snackbarData, setSnackbarData] = useState({ message: '', success: true });
//   const [showSnackbar, setShowSnackbar] = useState(false);

//   const getStepColor = (stepIndex, currentStep, completedStep) => {
//     if (stepIndex <= completedStep) return '#4CAF50'; // Green for completed
//     if (stepIndex === currentStep) return '#FFC107'; // Yellow for processing
//     return '#E5E7EB'; // Gray for pending
//   };

//   const steps = [
//     { id: 0, type: 'barcode', title: 'Scan Barcode', icon: Barcode, snackbar: { message: 'Barcode scanned successfully!', success: true } },
//     { id: 1, type: 'camera_scan', title: 'Product Scan', icon: Camera, snackbar: { message: 'Product Scan completed!', success: true } },
//     { id: 2, type: 'processing', title: 'Processing', icon: CircuitBoard, snackbar: { message: 'Processing successful!', success: true } },
//     { id: 3, type: 'results', title: 'Results Ready', icon: CheckCircle2, snackbar: { message: 'Results are ready!', success: true } },
//   ];

//   const triggerSnackbar = (snackbar) => {
//     setSnackbarData(snackbar);
//     setShowSnackbar(true);
//     setTimeout(() => {
//       setShowSnackbar(false);
//     }, 2000);
//   };

//   // Handle status updates
//   useEffect(() => {
//     if (statusUpdates && Object.keys(statusUpdates).length > 0) {
//       console.log('Received new status update:', statusUpdates);
      
//       // Find the step index based on the type from status update
//       const stepIndex = steps.findIndex(step => step.type === statusUpdates.type);
      
//       if (stepIndex !== -1) {
//         // Update current step and completed step
//         setCurrentStep(stepIndex);
//         setCompletedStep(stepIndex - 1);
        
//         // Show snackbar with appropriate message
//         const snackbarMessage = {
//           message: steps[stepIndex].snackbar.message,
//           success: statusUpdates.status === 'success'
//         };
        
//         if (statusUpdates.status !== 'success') {
//           snackbarMessage.message = `Error in ${steps[stepIndex].title}`;
//         }
        
//         triggerSnackbar(snackbarMessage);

//         // If this is the results step (final step), reset after 2 seconds
//         if (statusUpdates.type === 'results' && statusUpdates.status === 'success') {
//           setTimeout(() => {
//             setCurrentStep(0);
//             setCompletedStep(-1);
//           }, 2000);
//         }
//       }
//     }
//   }, [statusUpdates]);

//   return (
//     <div className="w-screen p-4 bg-gray-50">
//       <div className="flex justify-between items-center relative">
//         {steps.map((step, index) => (
//           <div key={step.id} className="flex flex-col items-center w-1/4 relative">
//             {index < steps.length - 1 && (
//               <div className="absolute h-2 w-full top-10 left-1/2">
//                 <div
//                   className={`h-full`}
//                   style={{
//                     backgroundColor: getStepColor(index, currentStep, completedStep),
//                     transition: 'all 0.5s ease',
//                   }}
//                 />
//               </div>
//             )}

//             <div
//               className="relative z-10 w-20 h-20 rounded-full flex items-center justify-center 
//                 transition-all duration-500"
//               style={{
//                 backgroundColor: getStepColor(index, currentStep, completedStep),
//                 boxShadow: currentStep === index ? '0 0 15px currentColor' : 'none',
//                 color: getStepColor(index, currentStep, completedStep),
//               }}
//             >
//               <step.icon className="w-8 h-8 text-white" />
//             </div>

//             <span
//               className={`mt-2 text-sm font-medium
//               ${currentStep === index ? 'text-gray-800' : 'text-gray-500'}`}
//             >
//               {step.title}
//             </span>

//             {currentStep === index && (
//               <div
//                 className="absolute z-0 w-20 h-20 rounded-full animate-ping opacity-25"
//                 style={{ backgroundColor: getStepColor(index, currentStep, completedStep) }}
//               />
//             )}
//           </div>
//         ))}
//       </div>

//       {showSnackbar && (
//         <div
//           className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white py-2 px-4 rounded shadow-lg flex items-center"
//           style={{ zIndex: 50 }}
//         >
//           {snackbarData.success ? (
//             <CheckCircle2 className="w-5 h-5 text-green-400 mr-2" />
//           ) : (
//             <XCircle className="w-5 h-5 text-red-400 mr-2" />
//           )}
//           <span>{snackbarData.message}</span>
//         </div>
//       )}
//     </div>
//   );
// };

// export default WorkflowStatus;





import React, { useState, useEffect, useMemo } from 'react';
import { Camera, Barcode, CircuitBoard, CheckCircle2, XCircle } from 'lucide-react';

const WorkflowStatus = ({ statusUpdates }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedStep, setCompletedStep] = useState(-1);
  const [snackbarData, setSnackbarData] = useState({ message: '', success: true });
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarTimeout, setSnackbarTimeout] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  const steps = [
    { id: 0, type: 'barcode', title: 'Scan Barcode', icon: Barcode, snackbar: { message: 'Barcode scanned successfully!', success: true } },
    { id: 1, type: 'camera_scan', title: 'Product Scan', icon: Camera, snackbar: { message: 'Product Scan completed!', success: true } },
    { id: 2, type: 'processing', title: 'Processing', icon: CircuitBoard, snackbar: { message: 'Processing successful!', success: true } },
    { id: 3, type: 'results', title: 'Results Ready', icon: CheckCircle2, snackbar: { message: 'Results are ready!', success: true } },
  ];

  const getStepColor = useMemo(() => (stepIndex) => {
    if (stepIndex <= completedStep) return '#10B981'; // Green for completed
    if (stepIndex === currentStep) return '#06B6D4'; // Cyan for processing
    return '#E2E8F0'; // Light gray for pending
  }, [completedStep, currentStep]);

  const triggerSnackbar = (snackbar) => {
    if (snackbarTimeout) clearTimeout(snackbarTimeout);
    setSnackbarData(snackbar);
    setShowSnackbar(true);
    
    const timeout = setTimeout(() => setShowSnackbar(false), 2500);
    setSnackbarTimeout(timeout);
  };

  useEffect(() => {
    if (statusUpdates && Object.keys(statusUpdates).length > 0) {
      const stepIndex = steps.findIndex(step => step.type === statusUpdates.type);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
        setCompletedStep(prev => (stepIndex > prev ? stepIndex : prev)); // Ensure sequential completion

        triggerSnackbar({
          message: statusUpdates.status === 'success' ? steps[stepIndex].snackbar.message : `Error in ${steps[stepIndex].title}`,
          success: statusUpdates.status === 'success',
        });

        if (statusUpdates.type === 'results' && statusUpdates.status === 'success') {
          setTimeout(() => { setCurrentStep(0); setCompletedStep(-1); }, 2000);
        }
      }
    }
    
  }, [statusUpdates]);

  return (
    <div 
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-2
                  transition-all duration-700 ease-in-out overflow-hidden
                  w-[90%] sm:w-[30%] ${isHovered ? 'sm:w-[80%] sm:h-[100px]' : 'sm:h-[60px] sm:w-[30%]'}`}
                  style={{
                    boxShadow: '2px 4px 6px rgba(0,0,0,0.2)',
                  }}
      onMouseEnter={() => window.innerWidth > 640 && setIsHovered(true)}
      onMouseLeave={() => window.innerWidth > 640 && setIsHovered(false)}
    >
      <div className="relative flex justify-between items-center">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center w-1/4 relative">
            
            {/* Smooth Progress Bar (only in Desktop on hover) */}
            {index < steps.length - 1 && isHovered && (
              <div className="absolute top-6 left-1/2 w-full h-1 bg-gray-300 rounded overflow-hidden">
                <div
                  className="h-full transition-all duration-1000 ease-in-out shadow-md shadow-cyan-400"
                  style={{
                    width: currentStep > index ? '100%' : '0%',
                    backgroundColor: getStepColor(index),
                  }}
                />
              </div>
            )}

            {/* Icon with Adaptive Size */}
            <div className="relative">
              <div className={`rounded-full flex items-center justify-center transition-all duration-700 ease-in-out
                  shadow-lg shadow-cyan-300 m-1 ${isHovered ? 'w-12 h-12 sm:w-14 sm:h-14' : 'w-8 h-8 sm:w-10 sm:h-10'}`}
                style={{
                  backgroundColor: getStepColor(index),
                  boxShadow: currentStep === index ? '0 0 20px rgba(6, 182, 212, 0.7)' : 'none',
                }}
              >
                <step.icon className={`text-white transition-all duration-700 ease-in-out ${isHovered ? 'w-4 h-4 sm:w-7 sm:h-7' : 'w-4 h-4 sm:w-4 sm:h-4'}`} />
              </div>
            </div>

            {/* Step Titles (Only on Hover in Desktop) */}
            <div 
              className={`absolute top-[50px] w-max max-w-[120px] sm:max-w-[150px] text-center transition-all duration-700 ease-in-out m-2
                          ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-90 sm:opacity-100 sm:scale-100'}`}
            >
              <span className={`text-xs sm:text-sm md:text-base font-semibold ${currentStep === index ? 'text-gray-900' : 'text-gray-400'}`}>
                {step.title}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Snackbar Notification */}
      {showSnackbar && (
        <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 py-2 px-4 rounded-lg shadow-md flex items-center gap-2
          transition-all duration-300 ease-in-out text-xs sm:text-sm"
          style={{ backgroundColor: snackbarData.success ? '#059669' : '#DC2626', zIndex: 50 }}>
          {snackbarData.success ? <CheckCircle2 className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />}
          <span className="text-white">{snackbarData.message}</span>
        </div>
      )}
    </div>
  );
};

export default WorkflowStatus;
