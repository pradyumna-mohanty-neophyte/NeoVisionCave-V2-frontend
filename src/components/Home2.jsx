// import React, { useState, useEffect, useRef } from "react";
// import { FiRefreshCw } from "react-icons/fi";
// import * as XLSX from "xlsx";
// import { io } from "socket.io-client";
// import { MdBlurLinear } from "react-icons/md";
// import { FaWindowClose } from "react-icons/fa";
// import ToggleButton from 'react-toggle-button'
// // import { saveAs } from 'file-saver';
// // import * as XLSX from 'xlsx';
// import {
//   Grid,
//   Typography,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Popover,
//   TextField,
//   Modal,
//   Box,
//   Snackbar,
//   Alert,
//   Card, CardContent, Divider, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress
// } from "@mui/material";
// import DownloadIcon from "@mui/icons-material/Download";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import IconButton from "@mui/material/IconButton";
// import axios from "axios";
// // import DatePickerComp from "./Calendar";
// import DateRangePickerComp from "./Calendar2dates";
// import {
//   downloadExcel, getSAPurl, setSAPurl,
//   capture_1,
//   capture_3,
//   enable_autocapture,
//   updateMetadata
// } from "./authservice/api";
// // import Video from "./volumetric/video";
// // import VideoComponent from "./updatedVideoPage";
// import logo from "./image/logo.jpeg";
// import WorkflowStatus from "./WorkflowStatus";
// export default function Home2() {
//   const [src, setSrc] = useState("http://localhost:8000/video")
//   // const src = "http://localhost:8000/video";
//   const [socket, setSocket] = useState(null);
//   const [product, setproduct] = useState(null);
//   const [allproduct, setallproduct] = useState([]);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [sapData, setSapData] = useState(null);
//   const videoRef = useRef();
//   const [ocrResult, setOcrResult] = useState(null);
//   const [allOcrResults, setAllOcrResults] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isAutocaptureEnabled, setIsAutocaptureEnabled] = useState(true); // initial state of toggle
//   const [currentRow, setCurrentRow] = useState(null);
//   const [tableData, setTableData] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedRow, setSelectedRow] = useState(null);
//   const [editedData, setEditedData] = useState({});
//   const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
//   const [statusUpdates, setStatusUpdates] = useState([]); // Add this state
//   const [telnetStatus, setTelnetStatus] = useState(null);
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [rowToDelete, setRowToDelete] = useState(null);

//   // Function to open the delete dialog
//   const handleOpenDeleteDialog = (index) => {
//     setRowToDelete(index);
//     setDeleteDialogOpen(true);
//   };

//   // Function to handle deletion
//   const handleDeleteRow = () => {
//     if (rowToDelete !== null) {
//       setTableData((prevData) => prevData.filter((_, i) => i !== rowToDelete));
//       setDeleteDialogOpen(false);
//       setRowToDelete(null);
//     }
//   };


//   const handleRestart = async () => {
//     setSrc("")
//     try {
//       console.log("Restarting...");
//       // Perform any necessary actions here
//       console.log("Function called! Page will reload in 10 seconds...");

//       // Set a timer to reload the page after 10 seconds
//       setTimeout(function () {
//         window.location.reload();
//       }, 8000); // 8000 milliseconds 

//       // Make the API request to the Node.js backend
//       const response = await axios.get(
//         'http://localhost:5000/api/restart',
//         {
//           headers: {
//             Accept: "application/json",
//           },
//         }
//       );
//     } catch (error) {
//       console.error("Error restarting:", error);
//     }
//   };


//   const handleStartClick = async () => {
//     setIsLoading(true);
//     try {
//       // Make a POST request to send the frame to the server and initiate processing
//       const res = await capture_1();
//       console.log(res);

//       if (res && res.data) {
//         // Simply setup the socket to listen for updates
//         // setupSocket();
//         console.log(res.data);

//       } else {
//         console.warn("Failed to capture frame.");
//       }
//     } catch (error) {
//       console.error("Error capturing frames:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   const handleStopClick = async () => {
//     setIsLoading(true);
//     try {
//       // Make a POST request to send the frame to the server and initiate processing
//       const res = await capture_3();
//       console.log(res);

//       if (res && res.data) {
//         // Simply setup the socket to listen for updates
//         // setupSocket();
//         console.log(res.data);

//       } else {
//         console.warn("Failed to capture frame.");
//       }
//     } catch (error) {
//       console.error("Error capturing frames:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   const handleRowClick = (row) => {
//     setSelectedRow(row);
//     setEditedData(row);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setSelectedRow(null);
//   };

//   const handleOpenConfirmDialog = () => {
//     setOpenConfirmDialog(true);
//   };

//   const handleCloseConfirmDialog = () => {
//     setOpenConfirmDialog(false);
//   };

//   const handleSaveChanges = async () => {
//     try {
//       setIsLoading(true);

//       // Prepare the data to be sent to the backend
//       const updateData = {
//         batch_no: editedData.batchNo,
//         mrp: editedData.mrp,
//         mfg_date: editedData.mfgDate,
//         expiry_date: editedData.expDate
//       };

//       console.log("Sending update with:", {
//         metadata_id: editedData.metadata_id,
//         updateData: updateData
//       });

//       // Make API call to update the database
//       const response = await updateMetadata(editedData.metadata_id, updateData);

//       if (response.data) {  // Check response from your backend
//         // Update local state
//         setTableData(tableData.map((item) =>
//           item.metadata_id === editedData.metadata_id ? {
//             ...item,
//             batchNo: editedData.batchNo,
//             mrp: editedData.mrp,
//             mfgDate: editedData.mfgDate,
//             expDate: editedData.expDate
//           } : item
//         ));

//         // setSnackbarConfig({
//         //   open: true,
//         //   message: "Row updated successfully",
//         //   severity: "success",
//         // });
//       } else {
//         throw new Error("Update failed");
//       }
//     } catch (error) {
//       console.error("Error updating row:", error);
//       // setSnackbarConfig({
//       //   open: true,
//       //   message: "Failed to update row",
//       //   severity: "error",
//       // });
//     } finally {
//       setIsLoading(false);
//       handleCloseConfirmDialog();
//       handleCloseDialog();
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setEditedData({ ...editedData, [name]: value });
//   };
//   const handleToggle = async () => {
//     setIsLoading(true);
//     const newToggleValue = !isAutocaptureEnabled;
//     try {
//       const res = await enable_autocapture(newToggleValue);
//       if (res?.data?.status === 'success') {
//         setIsAutocaptureEnabled(newToggleValue);
//         console.log("Autocapture state updated:", res.data.message);
//       } else {
//         console.warn("Failed to toggle autocapture:", res?.data?.message);
//       }
//     } catch (error) {
//       console.error("Error in toggling autocapture:", error);
//       setIsAutocaptureEnabled(!newToggleValue); // Revert the toggle if there's an error
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     console.log("OCR Result on render:", ocrResult);
//   }, [ocrResult]);
//   const [snackbarConfig, setSnackbarConfig] = useState({
//     open: false,
//     message: "",
//     severity: "success",
//   });
//   // const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedDateRange, setSelectedDateRange] = useState({
//     startDate: null,
//     endDate: null,
//   });
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 800,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 4,
//   };

//   const renderSection = (label, value) => {
//     const isValuePresent = value !== null && value !== undefined && value !== '';
//     return (
//       <div className="flex items-center p-2">
//         <div className={`w-20 h-14 mr-4 rounded-lg flex items-center justify-center ${isValuePresent ? 'bg-green-500' : 'bg-red-500'}`}>
//           {/* <span className="text-white font-bold text-xl">{isValuePresent ? '✓' : '✗'}</span> */}
//         </div>
//         <div className="flex-grow">
//           <Typography variant="h4" className={`mt-1 ${isValuePresent ? 'text-gray-700' : 'text-red-500 italic'}`}>
//             {isValuePresent ? value : 'No data'}
//           </Typography>
//           <Typography variant="body1" component="div" className="font-bold text-gray-800">
//             {label}
//           </Typography>
//         </div>
//       </div>
//     );
//   };

//   const getLatestRowData = (tableData, field) => {
//     if (tableData && tableData.length > 0) {
//       return tableData[0][field] || null;
//     }
//     return null;
//   };


//   const setupSocket = () => {
//     if (!socket) {
//       // Establish socket connection to the backend
//       const newSocket = io('http://localhost:5000', {  // Change this to your Node.js server URL
//         transports: ['websocket'],  // Use WebSocket transport
//         withCredentials: true,      // Allow credentials
//       });


//       newSocket.on("disconnect", () => {
//         setSocket(null);
//         console.log("Socket disconnected. Attempting to reconnect...");
//         setTimeout(setupSocket, 3000);
//       });

//       newSocket.on("connect", () => {
//         console.log("Socket Connected!");  // Add this log to confirm the connection
//       });

//       // Handle telnet events
//       newSocket.on("telnet_status", (data) => {
//         console.log("Received telnet status from socket:", data);

//         // Show snackbar if status is "error"
//         if (data.status === "error") {
//           setSnackbarConfig({
//             open: true,
//             message: data.message || "Telnet connection failed",
//             severity: "error",
//           });
//         }
//       });


//       // Handle product count events
//       newSocket.on("product_count", (data) => {
//         console.log("Received product_count status from socket:", data);

//         // Show snackbar if status is "error"
//         // if (data.status === "error") {
//         const message = data + " products detected. Keep a Single Product"
//           setSnackbarConfig({
//             open: true,
//             message: message,
//             severity: "error",
//           });
//         // }
//       });

//       // Handle barcode events
//       newSocket.on("barcode", (data) => {
//         console.log("Received barcode from socket:", data);
//         // Create a new row with the barcode
//         const newRow = {
//           barcode: data,
//           batchNo: null,
//           mrp: null,
//           mfgDate: null,
//           expDate: null,
//           timestamp: new Date().toISOString()
//         };
//         setCurrentRow(newRow);
//         setTableData(prevData => [newRow, ...prevData]);
//       });

//       // Handle metadata events
//       newSocket.on("metadata", (data) => {
//         console.log("Received metadata from socket:", data);
//         setOcrResult(data);

//         // Update the current row with the new metadata
//         setTableData(prevData => {
//           if (prevData.length === 0) return prevData;

//           const updatedData = [...prevData];
//           const firstRow = { ...updatedData[0] };

//           // Update the first row with new metadata
//           firstRow.metadata_id = data.metadata_id;
//           firstRow.batchNo = data['batch_no'] || firstRow.batchNo;
//           firstRow.mrp = data['mrp'] || firstRow.mrp;
//           firstRow.mfgDate = data['mfg_date'] || firstRow.mfgDate;
//           firstRow.expDate = data['expiry_date'] || firstRow.expDate;

//           updatedData[0] = firstRow;
//           return updatedData;
//         });
//       });


//       newSocket.on("status-updates", (data) => {
//         // console.log("Received status updates from socket:", data);
//         setStatusUpdates(data); // Store the status updates in state
//       })



//       setSocket(newSocket);
//     }
//   };



//   // Call setupSocket once when the component mounts
//   useEffect(() => {
//     setupSocket();
//   }, []);

//   // const dummyData = Array.from({ length: 20 }, (_, index) => ({
//   //   ean_number: generateRandomEAN(),
//   //   length: getRandomInt(1, 100),
//   //   breadth: getRandomInt(1, 100),
//   //   height: getRandomInt(1, 100),
//   //   weight: getRandomInt(1, 100)
//   // }));

//   // console.log(dummyData);

//   function exportToExcel(data, filename) {
//     // Create a new workbook
//     const workbook = XLSX.utils.book_new();

//     // Convert JSON data to worksheet
//     const worksheet = XLSX.utils.json_to_sheet(data);

//     // Append the worksheet to the workbook
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

//     // Write the workbook and trigger download
//     XLSX.writeFile(workbook, filename);
//   }


//   const handleDownloadClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const isValidURL = (url) => {
//     const regex = /^(ftp|http|https):\/\/[^ "]+$/;
//     return regex.test(url);
//   };
//   const [modalOpen, setModalOpen] = useState(false);
//   const [url, setUrl] = useState("");
//   const [defaultUrl, setDefaultUrl] = useState("");
//   const [error, setError] = useState(false);

//   const handleOpen = () => {
//     setModalOpen(true);
//     handlegetSAPurl();
//   };
//   const handleClose = () => setModalOpen(false);

//   const handleUrlChange = (event) => {
//     const newUrl = event.target.value;
//     setUrl(newUrl);
//     setError(!isValidURL(event.target.value));
//   };

//   const handleSave = () => {
//     if (isValidURL(url)) {
//       // Handle the valid URL here
//       console.log("Valid URL:", url);
//       handlesetSAPurl();
//       setUrl(url);
//       handleClose();
//     } else {
//       setError(true);
//     }
//   };
//   const [fileExcel, setFileExcel] = useState(null);
//   const handleDownload = async () => {
//     const { startDate, endDate } = selectedDateRange;
//     if (startDate && endDate) {
//       try {
//         const res = await downloadExcel(startDate, endDate);
//         console.log("Download response:", res);
//         setFileExcel(res);
//         if (res) {
//           exportToExcel(
//             res,
//             `Products_${selectedDateRange.toString().slice(0, 10)}.xlsx`
//           );
//           setSnackbarConfig({
//             open: true,
//             message: "File downloaded successfully",
//             severity: "success",
//           });
//         } else {
//           setSnackbarConfig({
//             open: true,
//             message: "No data to download",
//             severity: "warning",
//           });
//         }
//       } catch (error) {
//         console.error("Download error:", error);
//         setSnackbarConfig({
//           open: true,
//           message: "Failed to download file",
//           severity: "error",
//         });
//       }
//     } else {
//       console.log("Please select a valid date range");
//       setSnackbarConfig({
//         open: true,
//         message: "Please select a valid date range",
//         severity: "warning",
//       });
//     }
//     setAnchorEl(null);
//   };

//   const handlegetSAPurl = async () => {
//     try {
//       const res = await getSAPurl();
//       if (res && res.data && res.data[0] && res.data[0].data) {
//         setUrl(res.data[0].data.api_url);
//         setDefaultUrl(res.data[0].data.api_url);
//         setSapData(res.data[0].data);
//         console.log("SAP URL fetched:", url);
//         setSnackbarConfig({
//           open: true,
//           message: "SAP config fetched successfully",
//           severity: "success",
//         });
//       } else {
//         console.log("Error in fetching SAP config");
//         setSnackbarConfig({
//           open: true,
//           message: "Failed to fetch SAP config",
//           severity: "error",
//         });
//       }
//     } catch (error) {
//       console.error("SAP config fetch error:", error);
//       setSnackbarConfig({
//         open: true,
//         message: "Error fetching SAP config",
//         severity: "error",
//       });
//     }
//   };
//   // handlegetSAPurl();
//   console.log("this data i get", sapData);

//   useEffect(() => {
//     // Update the body object whenever the URL changes
//     const updatedBody = {
//       ...sapData,
//       api_url: url,
//     };
//     setBody(updatedBody);
//   }, [url, sapData]);

//   const [body, setBody] = useState({});

//   const handlesetSAPurl = async () => {
//     const res = await setSAPurl(body);
//     console.log("the body is", body);
//   };

//   const handlePopoverClose = () => {
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   const [extend, setExtend] = useState();
//   const [startCamera, setStartCamera] = useState(null);
//   const handleExtendsValue = (newValue) => {
//     setExtend(newValue);
//   };

//   return (
//     <>
//       <div
//         className={`w-full flex flex-col justify-center items-center p-0 font-sans ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
//           }`}
//       >
//         <div className="w-full flex justify-between">
//           <div className="flex">
//           </div>
//           <Popover
//             id={id}
//             open={open}
//             anchorEl={anchorEl}
//             onClose={handlePopoverClose}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//           >
//             <div className="p-4 z-20">
//               <DateRangePickerComp
//                 setSelectedDateRange={setSelectedDateRange}
//               />
//               <Button
//                 variant="contained"
//                 startIcon={<DownloadIcon />}
//                 sx={{ mt: 2 }}
//                 onClick={handleDownload}
//               >
//                 Download
//               </Button>
//             </div>
//           </Popover>
//         </div>
//         <div className="flex w-[100vw] h-[100vh] m-4 rounded-lg gap-3 justify-center flex-wrap">
//           <Grid
//             container
//             spacing={2}
//             className="-z-[20px] w-[100vw] h-[80vh]"
//           >
//             <Grid
//               item
//               xs={12}
//               md={6}
//               className=""
//             >
//               <div id="container" className="">
//                 {!src ? (
//                   <Paper elevation={4} className="w-[100%] h-[700px] relative p-5 flex items-center justify-center">
//                   <CircularProgress 
//                     size={60}
//                     thickness={4}
//                     style={{
//                       color: '#1976d2', // You can change this to match your theme color
//                     }}
//                   />
//                 </Paper>
//                 ) : (
//                   <>
//                     <Paper elevation={4} className="w-[100%] h-[700px] relative p-5 ">
//                       <img ref={videoRef} src={src} alt="Video Stream" controls
//                         className="w-full h-[600px] rounded-lg"
//                         onError={() => console.error("Video stream failed to load")}
//                       />
//                       <div className="space-x-3" style={{ marginTop: '10px', display: 'flex', alignItems: 'end', justifyContent: 'center' }}>
//                         <Button
//                           variant="contained"
//                           // color="success"
//                           onClick={handleRestart}
//                           startIcon={<FiRefreshCw />} // Add the icon here
//                           style={{
//                             padding: "10px 20px",
//                             fontSize: "16px",
//                             fontWeight: "bold",
//                             borderRadius: "8px",
//                             textTransform: "none",
//                             boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//                           }}
//                         >
//                           Restart
//                         </Button>
//                       </div>
//                     </Paper>
//                   </>
//                 )}
//               </div>
//             </Grid>
//             <Grid
//               item
//               xs={12}
//               md={6}
//             // className=" "
//             >
//               <div
//                 className={`flex justify-center md:mt-0 mt-6 ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
//                   }`}

//               >
//                 <TableContainer
//                   className="w-auto max-w-[98%] shadow-lg rounded-lg overflow-hidden"
//                   component={Paper}
//                   sx={{
//                     maxHeight: 700, // Set the fixed height (e.g., 400px)
//                     overflowY: 'auto', // Enable vertical scrolling
//                   }}
//                 >
//                   <Table aria-label="product table">
//                     <TableHead>
//                       <TableRow sx={{ bgcolor: "#06B6D4" }}>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           EAN
//                         </TableCell>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           Batch No
//                         </TableCell>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           {/* Length&nbsp;(mm) */}
//                           MRP
//                         </TableCell>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           {/* Breadth&nbsp;(mm) */}
//                           MFG
//                         </TableCell>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           EXP
//                         </TableCell>
//                         <TableCell
//                           align="center"
//                           sx={{
//                             color: "white",
//                             fontWeight: "bold",
//                             fontSize: "1.5rem",
//                           }}
//                         >
//                           {/* EXP */}
//                         </TableCell>

//                       </TableRow>
//                     </TableHead>
//                     <TableBody>
//                       {tableData &&
//                         tableData.map((result, index) => (
//                           <TableRow
//                             key={index}
//                             // onClick={() => handleRowClick(result)}
//                             onMouseEnter={() => setSelectedRow(index)}
//                             onMouseLeave={() => setSelectedRow(null)}
//                             sx={{
//                               "&:last-child td, &:last-child th": {
//                                 border: 0,
//                               },
//                               "&:nth-of-type(odd)": {
//                                 backgroundColor: "#f5f5f5",
//                               },
//                               "&:hover": { backgroundColor: "#e3f2fd" },
//                             }}
//                           >
//                             <TableCell
//                               component="th"
//                               scope="row"
//                               align="center"
//                               sx={{ fontSize: "1.5rem" }}
//                             >
//                               {result?.barcode}
//                             </TableCell>
//                             <TableCell
//                               component="th"
//                               scope="row"
//                               align="center"
//                               sx={{ fontSize: "1.5rem" }}
//                             >
//                               {result?.batchNo}
//                             </TableCell>
//                             <TableCell
//                               align="center"
//                               sx={{ fontSize: "1.5rem" }}
//                             >
//                               {result?.mrp}
//                             </TableCell>
//                             <TableCell
//                               align="center"
//                               sx={{ fontSize: "1.5rem" }}
//                             >
//                               {result?.mfgDate}
//                             </TableCell>
//                             <TableCell
//                               align="center"
//                               sx={{ fontSize: "1.5rem" }}
//                             >
//                               {result?.expDate}
//                             </TableCell>
//                             <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
//                               {selectedRow === index && (
//                                 <>
//                                   <IconButton
//                                     onClick={() => handleRowClick(result)}
//                                     aria-label="edit"
//                                   >
//                                     <EditIcon />
//                                   </IconButton>
//                                   <IconButton
//                                     onClick={() => {
//                                       // handleDeleteRow(index);
//                                       handleOpenDeleteDialog(index)
//                                     }}
//                                     aria-label="delete"
//                                   >
//                                     <DeleteIcon />
//                                   </IconButton>
//                                 </>
//                               )}
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                     </TableBody>
//                   </Table>
//                 </TableContainer>

//                 {/* Dialog for editing */}
//                 <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
//                   <DialogTitle>Do you want to edit the metadata?</DialogTitle>
//                   <DialogContent>
//                     <TextField
//                       margin="dense"
//                       label="EAN"
//                       name="barcode"
//                       value={editedData.barcode || ""}
//                       onChange={handleChange}
//                       fullWidth
//                       disabled
//                     />
//                     <TextField
//                       margin="dense"
//                       label="Batch No"
//                       name="batchNo"
//                       value={editedData.batchNo || ""}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                     <TextField
//                       margin="dense"
//                       label="MRP"
//                       name="mrp"
//                       value={editedData.mrp || ""}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                     <TextField
//                       margin="dense"
//                       label="MFG Date"
//                       name="mfgDate"
//                       value={editedData.mfgDate || ""}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                     <TextField
//                       margin="dense"
//                       label="EXP Date"
//                       name="expDate"
//                       value={editedData.expDate || ""}
//                       onChange={handleChange}
//                       fullWidth
//                     />
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleCloseDialog} color="secondary">
//                       Cancel
//                     </Button>
//                     <Button onClick={handleOpenConfirmDialog} color="primary">
//                       Save
//                     </Button>
//                   </DialogActions>
//                 </Dialog>

//                 {/* Delete Confirmation Dialog */}
//                 <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//                   <DialogTitle>Confirm Deletion</DialogTitle>
//                   <DialogContent>
//                     Are you sure you want to delete this row?
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
//                     <Button onClick={handleDeleteRow} color="error">Delete</Button>
//                   </DialogActions>
//                 </Dialog>

//                 {/* Confirmation Dialog */}
//                 <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
//                   <DialogTitle>Confirm Changes</DialogTitle>
//                   <DialogContent>Are you sure you want to save these changes?</DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleCloseConfirmDialog} color="secondary">
//                       No
//                     </Button>
//                     <Button onClick={handleSaveChanges} color="primary">
//                       Yes
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </div>
//             </Grid>
//             <WorkflowStatus statusUpdates={statusUpdates} />
//           </Grid>
//           {/* </div> */}
//         </div>
//       </div>


//       <Snackbar
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         open={snackbarConfig.open}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
//       >
//         <Alert
//           onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
//           severity={snackbarConfig.severity}
//           sx={{ width: "100%" }}
//         >
//           {snackbarConfig.message}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { FiMaximize, FiMinimize, FiRefreshCw } from "react-icons/fi";
import * as XLSX from "xlsx";
import { io } from "socket.io-client";
import { MdBlurLinear } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import ToggleButton from 'react-toggle-button'
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Popover,
  TextField,
  Modal,
  Box,
  Snackbar,
  Alert,
  Card, CardContent, Divider, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress,
  TableSortLabel,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import axios from "axios";
// import DatePickerComp from "./Calendar";
import DateRangePickerComp from "./Calendar2dates";
import {
  downloadExcel, getSAPurl, setSAPurl,
  capture_1,
  capture_3,
  enable_autocapture,
  updateMetadata
} from "./authservice/api";
// import Video from "./volumetric/video";
// import VideoComponent from "./updatedVideoPage";
import logo from "./image/logo.jpeg";
import WorkflowStatus from "./WorkflowStatus";
export default function Home2() {
  const [src, setSrc] = useState("http://localhost:8000/video")
  // const src = "http://localhost:8000/video";
  const [socket, setSocket] = useState(null);
  const [product, setproduct] = useState(null);
  const [allproduct, setallproduct] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [sapData, setSapData] = useState(null);
  const videoRef = useRef();
  const [ocrResult, setOcrResult] = useState(null);
  const [allOcrResults, setAllOcrResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAutocaptureEnabled, setIsAutocaptureEnabled] = useState(true); // initial state of toggle
  const [currentRow, setCurrentRow] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [statusUpdates, setStatusUpdates] = useState([]); // Add this state
  const [telnetStatus, setTelnetStatus] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [searchField, setSearchField] = useState("barcode"); // Default search field
  const [searchQuery, setSearchQuery] = useState("");

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };   

  // Function to open the delete dialog
  const handleOpenDeleteDialog = (index) => {
    setRowToDelete(index);
    setDeleteDialogOpen(true);
  };

  // Function to handle deletion
  const handleDeleteRow = () => {
    if (rowToDelete !== null) {
      setTableData((prevData) => prevData.filter((_, i) => i !== rowToDelete));
      setDeleteDialogOpen(false);
      setRowToDelete(null);
    }
  };


  const handleRestart = async () => {
    setSrc("")
    try {
      console.log("Restarting...");
      // Perform any necessary actions here
      console.log("Function called! Page will reload in 10 seconds...");

      // Set a timer to reload the page after 10 seconds
      setTimeout(function () {
        window.location.reload();
      }, 8000); // 8000 milliseconds 

      // Make the API request to the Node.js backend
      const response = await axios.get(
        'http://localhost:5000/api/restart',
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error restarting:", error);
    }
  };


  const handleStartClick = async () => {
    setIsLoading(true);
    try {
      // Make a POST request to send the frame to the server and initiate processing
      const res = await capture_1();
      console.log(res);

      if (res && res.data) {
        // Simply setup the socket to listen for updates
        // setupSocket();
        console.log(res.data);

      } else {
        console.warn("Failed to capture frame.");
      }
    } catch (error) {
      console.error("Error capturing frames:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleStopClick = async () => {
    setIsLoading(true);
    try {
      // Make a POST request to send the frame to the server and initiate processing
      const res = await capture_3();
      console.log(res);

      if (res && res.data) {
        // Simply setup the socket to listen for updates
        // setupSocket();
        console.log(res.data);

      } else {
        console.warn("Failed to capture frame.");
      }
    } catch (error) {
      console.error("Error capturing frames:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleRowClick = (row) => {
    setSelectedRow(row);
    setEditedData(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleOpenConfirmDialog = () => {
    setOpenConfirmDialog(true);
  };

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
  };

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);

      // Prepare the data to be sent to the backend
      const updateData = {
        batch_no: editedData.batchNo,
        mrp: editedData.mrp,
        mfg_date: editedData.mfgDate,
        expiry_date: editedData.expDate
      };

      console.log("Sending update with:", {
        metadata_id: editedData.metadata_id,
        updateData: updateData
      });

      // Make API call to update the database
      const response = await updateMetadata(editedData.metadata_id, updateData);

      if (response.data) {  // Check response from your backend
        // Update local state
        setTableData(tableData.map((item) =>
          item.metadata_id === editedData.metadata_id ? {
            ...item,
            batchNo: editedData.batchNo,
            mrp: editedData.mrp,
            mfgDate: editedData.mfgDate,
            expDate: editedData.expDate
          } : item
        ));

        // setSnackbarConfig({
        //   open: true,
        //   message: "Row updated successfully",
        //   severity: "success",
        // });
      } else {
        throw new Error("Update failed");
      }
    } catch (error) {
      console.error("Error updating row:", error);
      // setSnackbarConfig({
      //   open: true,
      //   message: "Failed to update row",
      //   severity: "error",
      // });
    } finally {
      setIsLoading(false);
      handleCloseConfirmDialog();
      handleCloseDialog();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({ ...editedData, [name]: value });
  };
  const handleToggle = async () => {
    setIsLoading(true);
    const newToggleValue = !isAutocaptureEnabled;
    try {
      const res = await enable_autocapture(newToggleValue);
      if (res?.data?.status === 'success') {
        setIsAutocaptureEnabled(newToggleValue);
        console.log("Autocapture state updated:", res.data.message);
      } else {
        console.warn("Failed to toggle autocapture:", res?.data?.message);
      }
    } catch (error) {
      console.error("Error in toggling autocapture:", error);
      setIsAutocaptureEnabled(!newToggleValue); // Revert the toggle if there's an error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("OCR Result on render:", ocrResult);
  }, [ocrResult]);
  const [snackbarConfig, setSnackbarConfig] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const renderSection = (label, value) => {
    const isValuePresent = value !== null && value !== undefined && value !== '';
    return (
      <div className="flex items-center p-2">
        <div className={`w-20 h-14 mr-4 rounded-lg flex items-center justify-center ${isValuePresent ? 'bg-green-500' : 'bg-red-500'}`}>
          {/* <span className="text-white font-bold text-xl">{isValuePresent ? '✓' : '✗'}</span> */}
        </div>
        <div className="flex-grow">
          <Typography variant="h4" className={`mt-1 ${isValuePresent ? 'text-gray-700' : 'text-red-500 italic'}`}>
            {isValuePresent ? value : 'No data'}
          </Typography>
          <Typography variant="body1" component="div" className="font-bold text-gray-800">
            {label}
          </Typography>
        </div>
      </div>
    );
  };

  const getLatestRowData = (tableData, field) => {
    if (tableData && tableData.length > 0) {
      return tableData[0][field] || null;
    }
    return null;
  };


  const setupSocket = () => {
    if (!socket) {
      // Establish socket connection to the backend
      const newSocket = io('http://localhost:5000', {  // Change this to your Node.js server URL
        transports: ['websocket'],  // Use WebSocket transport
        withCredentials: true,      // Allow credentials
      });


      newSocket.on("disconnect", () => {
        setSocket(null);
        console.log("Socket disconnected. Attempting to reconnect...");
        setTimeout(setupSocket, 3000);
      });

      newSocket.on("connect", () => {
        console.log("Socket Connected!");  // Add this log to confirm the connection
      });

      // Handle telnet events
      newSocket.on("telnet_status", (data) => {
        console.log("Received telnet status from socket:", data);

        // Show snackbar if status is "error"
        if (data.status === "error") {
          setSnackbarConfig({
            open: true,
            message: data.message || "Telnet connection failed",
            severity: "error",
          });
        }
      });


      // Handle product count events
      newSocket.on("product_count", (data) => {
        console.log("Received product_count status from socket:", data);

        // Show snackbar if status is "error"
        // if (data.status === "error") {
        const message = data + " products detected. Keep a Single Product"
          setSnackbarConfig({
            open: true,
            message: message,
            severity: "error",
          });
        // }
      });

      // Handle barcode events
      newSocket.on("barcode", (data) => {
        console.log("Received barcode from socket:", data);
        // Create a new row with the barcode
        const newRow = {
          barcode: data,
          batchNo: null,
          mrp: null,
          mfgDate: null,
          expDate: null,
          timestamp: new Date().toISOString()
        };
        setCurrentRow(newRow);
        setTableData(prevData => [newRow, ...prevData]);
      });

      // Handle metadata events
      newSocket.on("metadata", (data) => {
        console.log("Received metadata from socket:", data);
        setOcrResult(data);

        // Update the current row with the new metadata
        setTableData(prevData => {
          if (prevData.length === 0) return prevData;

          const updatedData = [...prevData];
          const firstRow = { ...updatedData[0] };

          // Update the first row with new metadata
          firstRow.metadata_id = data.metadata_id;
          firstRow.batchNo = data['batch_no'] || firstRow.batchNo;
          firstRow.mrp = data['mrp'] || firstRow.mrp;
          firstRow.mfgDate = data['mfg_date'] || firstRow.mfgDate;
          firstRow.expDate = data['expiry_date'] || firstRow.expDate;

          updatedData[0] = firstRow;
          return updatedData;
        });
      });


      newSocket.on("status-updates", (data) => {
        // console.log("Received status updates from socket:", data);
        setStatusUpdates(data); // Store the status updates in state
      })



      setSocket(newSocket);
    }
  };

  // Call setupSocket once when the component mounts
  useEffect(() => {
    setupSocket();
  }, []);

  // const dummyData = Array.from({ length: 20 }, (_, index) => ({
  //   ean_number: generateRandomEAN(),
  //   length: getRandomInt(1, 100),
  //   breadth: getRandomInt(1, 100),
  //   height: getRandomInt(1, 100),
  //   weight: getRandomInt(1, 100)
  // }));

  // console.log(dummyData);

  function exportToExcel(data, filename) {
    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Write the workbook and trigger download
    XLSX.writeFile(workbook, filename);
  }


  const handleDownloadClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const isValidURL = (url) => {
    const regex = /^(ftp|http|https):\/\/[^ "]+$/;
    return regex.test(url);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [defaultUrl, setDefaultUrl] = useState("");
  const [error, setError] = useState(false);

  const handleOpen = () => {
    setModalOpen(true);
    handlegetSAPurl();
  };
  const handleClose = () => setModalOpen(false);

  const handleUrlChange = (event) => {
    const newUrl = event.target.value;
    setUrl(newUrl);
    setError(!isValidURL(event.target.value));
  };

  const handleSave = () => {
    if (isValidURL(url)) {
      // Handle the valid URL here
      console.log("Valid URL:", url);
      handlesetSAPurl();
      setUrl(url);
      handleClose();
    } else {
      setError(true);
    }
  };
  const [fileExcel, setFileExcel] = useState(null);
  const handleDownload = async () => {
    const { startDate, endDate } = selectedDateRange;
    if (startDate && endDate) {
      try {
        const res = await downloadExcel(startDate, endDate);
        console.log("Download response:", res);
        setFileExcel(res);
        if (res) {
          exportToExcel(
            res,
            `Products_${selectedDateRange.toString().slice(0, 10)}.xlsx`
          );
          setSnackbarConfig({
            open: true,
            message: "File downloaded successfully",
            severity: "success",
          });
        } else {
          setSnackbarConfig({
            open: true,
            message: "No data to download",
            severity: "warning",
          });
        }
      } catch (error) {
        console.error("Download error:", error);
        setSnackbarConfig({
          open: true,
          message: "Failed to download file",
          severity: "error",
        });
      }
    } else {
      console.log("Please select a valid date range");
      setSnackbarConfig({
        open: true,
        message: "Please select a valid date range",
        severity: "warning",
      });
    }
    setAnchorEl(null);
  };

  const handlegetSAPurl = async () => {
    try {
      const res = await getSAPurl();
      if (res && res.data && res.data[0] && res.data[0].data) {
        setUrl(res.data[0].data.api_url);
        setDefaultUrl(res.data[0].data.api_url);
        setSapData(res.data[0].data);
        console.log("SAP URL fetched:", url);
        setSnackbarConfig({
          open: true,
          message: "SAP config fetched successfully",
          severity: "success",
        });
      } else {
        console.log("Error in fetching SAP config");
        setSnackbarConfig({
          open: true,
          message: "Failed to fetch SAP config",
          severity: "error",
        });
      }
    } catch (error) {
      console.error("SAP config fetch error:", error);
      setSnackbarConfig({
        open: true,
        message: "Error fetching SAP config",
        severity: "error",
      });
    }
  };
  // handlegetSAPurl();
  console.log("this data i get", sapData);

  useEffect(() => {
    // Update the body object whenever the URL changes
    const updatedBody = {
      ...sapData,
      api_url: url,
    };
    setBody(updatedBody);
  }, [url, sapData]);

  const [body, setBody] = useState({});

  const handlesetSAPurl = async () => {
    const res = await setSAPurl(body);
    console.log("the body is", body);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [extend, setExtend] = useState();
  const [startCamera, setStartCamera] = useState(null);
  const handleExtendsValue = (newValue) => {
    setExtend(newValue);
  };

  const [orderBy, setOrderBy] = useState('');
  const [order, setOrder] = useState('asc');

  const headCells = [
    { id: 'barcode', label: 'EAN' },
    { id: 'batchNo', label: 'Batch No' },
    { id: 'mrp', label: 'MRP', numeric: true },
    { id: 'mfgDate', label: 'MFG' },
    { id: 'expDate', label: 'EXP' },
    { id: 'actions', label: 'ACTIONS', sortable: false }
  ];

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortData = (data) => {
    if (!orderBy) return data;

    return [...data].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (order === 'asc') {
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return aValue - bValue;
        }
        return aValue?.toString().localeCompare(bValue?.toString());
      } else {
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return bValue - aValue;
        }
        return bValue?.toString().localeCompare(aValue?.toString());
      }
    });
  };

  const handleSearchFieldChange = (event) => {
    setSearchField(event.target.value);
  };
  
  // Filter table data based on selected field
  const filteredResults = tabledata.filter((result) =>
    result[searchField]?.toString().toLowerCase().includes(searchQuery.toLowerCase())
  ); 

  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-center p-0 font-sans ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
          }`}
      >
        <div className="w-full flex justify-between">
          <div className="flex">
          </div>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="p-4 z-20">
              <DateRangePickerComp
                setSelectedDateRange={setSelectedDateRange}
              />
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                sx={{ mt: 2 }}
                onClick={handleDownload}
              >
                Download
              </Button>
            </div>
          </Popover>
        </div>
        <div className="flex w-[100vw] h-[40vh] m-4 rounded-lg gap-3 justify-center flex-wrap">
        <Grid
            container
            spacing={2}
            className="w-full h-[100vh] relative px-2"
            sx={{
              zIndex: 0,
            }}
          >
            <Grid item xs={12} md={5}>
              <Paper
                elevation={3}
                sx={{
                  height: '83vh',
                  width: '100%',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  transition: 'all 0.6s ease',
                  '&:hover': {
                    boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
                  },
                }}
              >
                {!src ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50">
                    <CircularProgress 
                      size={70}
                      thickness={4}
                      sx={{
                        color: '#06B6D4',
                        marginBottom: '20px',
                      }}
                    />
                    <div className="text-gray-500 text-lg font-medium mt-4">
                      Loading video stream...
                    </div>
                  </div>
                ) : (
                  <div className="p-2 h-full flex flex-col">
                    <div className="relative flex-grow mb-4 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        ref={videoRef}
                        src={src}
                        alt="Video Stream"
                        className="w-full h-full object-cover rounded-xl"
                        onError={() => console.error("Video stream failed to load")}
                        style={{
                          objectFit: 'contain',
                          backgroundColor: '#f8fafc'
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <div className={`px-3 py-1 text-white text-sm font-medium rounded-full shadow-lg opacity-75 ${
                          src ? "bg-green-500" : "bg-red-500"
                        }`}>
                          {src ? "Live" : "Offline"}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center items-center pt-4">
                      <Button
                        variant="contained"
                        onClick={handleRestart}
                        startIcon={<FiRefreshCw className="w-5 h-5" />}
                        sx={{
                          backgroundColor: '#06B6D4',
                          padding: '12px 24px',
                          borderRadius: '12px',
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 600,
                          boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                          '&:hover': {
                            backgroundColor: '#0891B2',
                            boxShadow: '0 6px 8px -1px rgb(0 0 0 / 0.1)',
                            transform: 'translateY(-1px)',
                          },
                          transition: 'all 0.2s ease',
                        }}
                      >
                        Restart Stream
                      </Button>
                    </div>
                  </div>
                )}
              </Paper>
            </Grid>
            <Grid
              item
              xs={12}
              md={7}
            >
              <Paper
                elevation={3}
                sx={{
                  height: isFullScreen ? '100vh' : '83vh',
                  width: isFullScreen ? '100vw' : '100%',
                  position: isFullScreen ? 'fixed' : 'relative',
                  top: isFullScreen ? 0 : 'auto',
                  left: isFullScreen ? 0 : 'auto',
                  zIndex: isFullScreen ? 1000 : 0,
                  borderRadius: '16px',
                  overflow: 'hidden',
                  background: '#ffffff',
                  padding: "8px",
                  transition: 'all 0.6s ease',
                  '&:hover': {
                    boxShadow: '0 4px 6px rgba(0,0,0,0.4)',
                  },
                }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-gray-100 rounded-lg shadow-md">
                  {/* Search Section */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <FormControl sx={{ minWidth: 320, width: "30%" }}>
                      {/* <InputLabel>Search In</InputLabel> */}
                      <Select
                        label="Search In"
                        value={searchField}
                        variant="outlined"
                        onChange={handleSearchFieldChange}
                        size="small"
                        displayEmpty
                        sx={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                            "& fieldset": { borderColor: "#ddd" }, // Soft border
                            "&:hover fieldset": { borderColor: "#06B6D4" }, // Highlight on hover
                            "&.Mui-focused fieldset": { borderColor: "#06B6D4" }, // Highlight on focus
                          },
                        }}
                      >
                        <MenuItem value="barcode">EAN</MenuItem>
                        <MenuItem value="batchNo">Batch No</MenuItem>
                        <MenuItem value="mrp">MRP</MenuItem>
                        <MenuItem value="mfgDate">MFG</MenuItem>
                        <MenuItem value="expDate">EXP</MenuItem>
                      </Select>
                    </FormControl>

                    {/* Search Input */}
                    <TextField
                      label="Search"
                      variant="outlined"
                      size="small"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      sx={{
                        minWidth: 320,
                        width: "30%",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          "& fieldset": { borderColor: "#ddd" }, // Soft border
                          "&:hover fieldset": { borderColor: "#06B6D4" }, // Highlight on hover
                          "&.Mui-focused fieldset": { borderColor: "#06B6D4" }, // Highlight on focus
                        },
                      }}
                    />
                  </div>

                  {/* Full-Screen Button */}
                  <Button
                    variant="contained"
                    onClick={toggleFullScreen}
                    startIcon={isFullScreen ? <FiMinimize /> : <FiMaximize />}
                    sx={{
                      backgroundColor: "#06B6D4",
                      textTransform: "none",
                      fontWeight: 600,
                      borderRadius: "8px",
                      px: 2,
                      "&:hover": { backgroundColor: "#0891B2" },
                    }}
                  >
                    {isFullScreen ? "Exit Full Screen" : "Full Screen"}
                  </Button>
                </div>

              {/* <div
                className={`flex justify-center md:mt-0 mt-6 ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
                  }`}

              > */}
                <TableContainer
                  component={Paper}
                  sx={{
                    maxHeight: isFullScreen ? '90vh' : 'calc(83vh - 60px)',
                    overflowY: 'auto',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                    borderRadius: '0.75rem',
                    '&::-webkit-scrollbar': {
                      width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                      background: '#f1f1f1',
                      borderRadius: '8px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#888',
                      borderRadius: '8px',
                    },
                  }}
                >
                  <Table stickyHeader aria-label="product table">
                    <TableHead>
                      <TableRow>
                        {headCells.map((headCell) => (
                          <TableCell
                            key={headCell.id}
                            align="center"
                            sx={{
                              backgroundColor: '#06B6D4',
                              color: 'white',
                              fontWeight: 'bold',
                              fontSize: '1.25rem',
                              padding: '16px',
                              '&:hover': {
                                backgroundColor: headCell.sortable !== false ? '#0891B2' : '#06B6D4',
                              },
                            }}
                          >
                            {headCell.sortable !== false ? (
                              <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={() => handleRequestSort(headCell.id)}
                                sx={{
                                  '&.MuiTableSortLabel-root': {
                                    color: 'white',
                                  },
                                  '&.MuiTableSortLabel-root:hover': {
                                    color: 'white',
                                  },
                                  '&.Mui-active': {
                                    color: 'white',
                                  },
                                  '& .MuiTableSortLabel-icon': {
                                    color: 'white !important',
                                  },
                                }}
                              >
                                {headCell.label}
                              </TableSortLabel>
                            ) : (
                              headCell.label
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {sortData(filteredResults).map((result, index) => ( //results = tabledata
                        <TableRow
                          key={index}
                          onMouseEnter={() => setSelectedRow(index)}
                          onMouseLeave={() => setSelectedRow(null)}
                          sx={{
                            '&:nth-of-type(odd)': {
                              backgroundColor: 'rgba(0, 0, 0, 0.02)',
                            },
                            '&:hover': {
                              backgroundColor: 'rgba(6, 182, 212, 0.08)',
                              transition: 'background-color 0.6s ease-in-out',
                            },
                            transition: 'background-color 0.6s ease-in-out',
                          }}
                        >
                          <TableCell align="center" sx={{ fontSize: '1.125rem' }}>
                            {result?.barcode}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '1.125rem' }}>
                            {result?.batchNo}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '1.125rem' }}>
                            {result?.mrp}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '1.125rem' }}>
                            {result?.mfgDate}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: '1.125rem' }}>
                            {result?.expDate}
                          </TableCell>
                          <TableCell align="center">
                            {selectedRow === index && (
                              <div className="flex justify-center space-x-2">
                                {[
                                  { title: "Edit", onClick: () => handleRowClick(result), color: "cyan" },
                                  { title: "Delete", onClick: () => handleOpenDeleteDialog(index), color: "red" },
                                ].map(({ title, onClick, color }) => (
                                  <Tooltip key={title} title={title}>
                                    <IconButton
                                      onClick={onClick}
                                      size="small"
                                      sx={{
                                        transition: 'background-color 0.5s ease-in-out, color 0.6s ease-in-out',
                                        color: color === 'cyan' ? '#06B6D4' : '#EF4444', // Default icon color
                                        '&:hover': {
                                          backgroundColor: color === 'cyan' ? 'rgba(6, 182, 212, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                                          color: color === 'cyan' ? '#0891B2' : '#DC2626', // Darker cyan/red on hover
                                        },
                                      }}
                                    >
                                      {title === "Edit" ? <EditIcon /> : <DeleteIcon />}
                                    </IconButton>
                                  </Tooltip>
                                ))}
                              </div>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                {/* Dialog for editing */}
                <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
                  <DialogTitle>Do you want to edit the metadata?</DialogTitle>
                  <DialogContent>
                    <TextField
                      margin="dense"
                      label="EAN"
                      name="barcode"
                      value={editedData.barcode || ""}
                      onChange={handleChange}
                      fullWidth
                      disabled
                    />
                    <TextField
                      margin="dense"
                      label="Batch No"
                      name="batchNo"
                      value={editedData.batchNo || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="MRP"
                      name="mrp"
                      value={editedData.mrp || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="MFG Date"
                      name="mfgDate"
                      value={editedData.mfgDate || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                    <TextField
                      margin="dense"
                      label="EXP Date"
                      name="expDate"
                      value={editedData.expDate || ""}
                      onChange={handleChange}
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDialog} color="secondary">
                      Cancel
                    </Button>
                    <Button onClick={handleOpenConfirmDialog} color="primary">
                      Save
                    </Button>
                  </DialogActions>
                </Dialog>

                {/* Delete Confirmation Dialog */}
                <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                  <DialogTitle>Confirm Deletion</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete this row?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)} color="primary">Cancel</Button>
                    <Button onClick={handleDeleteRow} color="error">Delete</Button>
                  </DialogActions>
                </Dialog>

                {/* Confirmation Dialog */}
                <Dialog open={openConfirmDialog} onClose={handleCloseConfirmDialog}>
                  <DialogTitle>Confirm Changes</DialogTitle>
                  <DialogContent>Are you sure you want to save these changes?</DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseConfirmDialog} color="secondary">
                      No
                    </Button>
                    <Button onClick={handleSaveChanges} color="primary">
                      Yes
                    </Button>
                  </DialogActions>
                </Dialog>
              {/* </div> */}
              </Paper>
            </Grid>
          </Grid>
            <div className="mt-6">
            </div>
            {!isFullScreen && <WorkflowStatus statusUpdates={statusUpdates} />}
          {/* </div> */}
        </div>
      </div>


      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={snackbarConfig.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
      >
        <Alert
          onClose={() => setSnackbarConfig({ ...snackbarConfig, open: false })}
          severity={snackbarConfig.severity}
          sx={{ width: "100%" }}
        >
          {snackbarConfig.message}
        </Alert>
      </Snackbar>
    </>
  );
}
