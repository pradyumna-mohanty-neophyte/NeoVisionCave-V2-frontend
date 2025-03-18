import React, { useState, useEffect, useRef } from "react";
import { FiRefreshCw } from "react-icons/fi";
import * as XLSX from "xlsx";
import { io } from "socket.io-client";
import { RefreshCw } from 'lucide-react';
// import { Button } from "@mui/material";
// import { FiRefreshCw } from "react-icons/fi";
import { MdBlurLinear } from "react-icons/md";
import { FaWindowClose } from "react-icons/fa";
import ToggleButton from 'react-toggle-button'
// import { saveAs } from 'file-saver';
// import * as XLSX from 'xlsx';
import introJs from "intro.js";
import QrCodeIcon from "@mui/icons-material/QrCode";


import "intro.js/minified/introjs.min.css"; // Import Intro.js styles
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
  Card, CardContent, Divider, Dialog, DialogTitle, DialogContent, DialogActions, CircularProgress
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
  updateMetadata,
  generateQRImage
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
  const [loading, setLoading] = useState(false);
  const [temperature, setTemperature] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [qrData,setqrData]=useState({
    ean_code: "",  // Required
    batch: "",  // Required
    mrp:"",  // Optional
    exp_date: "",  // Optional
    mfg_date: "",  // Optional
    to_print: false  // Ensure the QR code is printed
  })

  const [openQRmodal, setOpenQRmodal] = useState(false);


  // ✅ **Intro.js Walkthrough Function**
  const startTour = () => {
    const intro = introJs();
    intro.setOptions({
      steps: [
        {
          element: "#video-container",
          intro: "This is the live video feed section where you can monitor activity.",
        },
        {
          element: "#restart-button",
          intro: "Click here to restart the video stream if needed.",
        },
        {
          element: "#temp-button",
          intro: "Shows the current temperature of the system.",
        },
        {
          element: "#data-table",
          intro: "Here you can see the scanned product data.",
        },
        {
          element: "#workflow-status",
          intro: "This section displays real-time workflow status updates.",
        },
        {
          element: "#health-check-button",
          intro: "You can always run a system health check by pressing this button.",
        },
        {
          element: "#start-walkthrough",
          intro: "You can always restart the walkthrough by clicking here.",
        }
      ],
      showProgress: true,
      showBullets: false,
      exitOnOverlayClick: false,
      nextLabel: "Next →",
      prevLabel: "← Back",
      doneLabel: "Finish",
    });
    intro.start();
  };

// const handleGenerateQR = (result)=>{
//   console.log("QR Code Generation Data:", result);

//   // Ensure result has the necessary fields before calling API
//   if (!result.barcode || !result.batchNo || !result.mrp || !result.expDate || !result.mfgDate) {
//     console.error("Error: Missing required QR code data fields!", result);
//     return;
//   }
// // Prepare data in the format expected by the Python backend



// const qrData = {
//   ean_code: result.barcode,  // Required
//   batch: result.batchNo,  // Required
//   mrp: result.mrp ? String(result.mrp) : null,  // Optional
//   exp_date: result.expDate || null,  // Optional
//   mfg_date: result.mfgDate || null,  // Optional
//   to_print: true  // Ensure the QR code is printed
// };

// console.log("Formatted QR Data (With MRP as String):", qrData);

// // Make API request to generate & print QR code
// generateQRImage(qrData.ean_code, qrData.batch, qrData.mrp, qrData.exp_date, qrData.mfg_date, qrData.to_print)
// .then((response) => {
//   console.log("QR Code Successfully Generated and Sent to Printer:", response.data);
// })
// .catch((error) => {
//   console.error("QR Code Generation Failed:", error);
// });

// };



const handleGenerateQR = (result) => {
  console.log("QR Code Generation Data:", result);

  // Ensure result has the necessary fields before calling API
  if (!result.barcode || !result.batchNo) {
    console.error("Error: Missing required QR code data fields!", result);
    return;
  }

  // Prepare data in the format expected by the Python backend
  const updatedQRData = {
    ean_code: result.barcode, // Required
    batch: result.batchNo, // Required
    mrp: result.mrp ? String(result.mrp) : null, // Optional
    exp_date: result.expDate || null, // Optional
    mfg_date: result.mfgDate || null, // Optional
    to_print: true, // Ensure the QR code is printed
  };

  // Update state correctly
  setqrData(updatedQRData);

  console.log("Formatted QR Data (With MRP as String):", updatedQRData);

  // Make API request to generate & print QR code
  generateQRImage(
    updatedQRData.ean_code,
    updatedQRData.batch,
    updatedQRData.mrp,
    updatedQRData.exp_date,
    updatedQRData.mfg_date,
    updatedQRData.to_print
  )
    .then((response) => {
      console.log("QR Code Successfully Generated and Sent to Printer:", response.data);
    })
    .catch((error) => {
      console.error("QR Code Generation Failed:", error);
    });
};

  // const sock = io("http://localhost:5000"); // Update with your backend URL


  // useEffect(() => {
  //   // Listen for temperature updates
  //   sock.on("updateTemperature", (data) => {
  //     setTemperature(data.cpu_temperature);
  //     if (data.cpu_temperature > 65) {
  //       setShowPopup(true);
  //     }
  //   });

  //   // Cleanup function to avoid memory leaks
  //   return () => {
  //     sock.off("updateTemperature");
  //   };
  // }, []);
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

  const handleRunHealthCheck = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/run_health_check");
      console.log("Health check response: ", response.data.message);
      
    } catch (error) {
      console.error("Error running health check:", error);
      
    }
  };
  const handleRestart = async () => {
    setSrc("")
    try {
      console.log("Restarting...");
      // Perform any necessary actions here
      console.log("Function called! Page will reload in 8 seconds...");

      // Set a timer to reload the page after 10 seconds
      setTimeout(function () {
        window.location.reload();
      }, 10000); // 10 seconds 

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

      newSocket.on("health_check_status", (data) => {
        console.log("Health status:", data.status);
        setSnackbarConfig({
          open: true,
          message: data.status,
          severity: "success",
        });
      });

      newSocket.on("updateTemperature", (data) => {
        setTemperature(data.cpu_temperature);
        if (data.cpu_temperature > 65) {
          setShowPopup(true);
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

  return (
    <>
      <div
        className={`w-full flex flex-col justify-center items-center p-0 font-sans ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
          }`}
      >
       <div>
  {/* <h1>CPU Temperature: {temperature !== null ? `${temperature}°C` : "Loading..."}</h1> */}
  {showPopup && (
    <div style={{
      position: "fixed",
      top: "10px", // Adjusted to top
      left: "50%",
      transform: "translateX(-50%)",
      backgroundColor: "red",
      color: "white",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
      zIndex: 1000
    }}>
      <h2>Warning!</h2>
      <p>CPU temperature has exceeded 65°C!</p>
      <button onClick={() => setShowPopup(false)}>Close</button>
    </div>
  )}
</div>


        {/* ✅ Walkthrough Button */}
        <div className="w-full flex justify-end p-4 space-x-4">
    <Button
        id="start-walkthrough"
        variant="contained"
        color="primary"
        onClick={startTour}
    >
        Start Walkthrough
    </Button>

    <Button
        id="health-check-button"
        variant="contained"
        color="secondary"
        onClick={handleRunHealthCheck}
    >
        Run Health Check
    </Button>
</div>;

        {/* <div className="w-full flex justify-between">
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
        </div> */}
        <div className="flex w-[100vw] h-[100vh] m-4 rounded-lg gap-3 justify-center flex-wrap">
          <Grid
            container
            spacing={2}
            className="-z-[20px] w-[100vw] h-[80vh]"
          >
            <Grid
              item
              xs={12}
              md={6}
              className=""
            >
              <div id="video-container" className="relative w-full">
                {!src ? (
                  <Paper elevation={4} className="w-[100%] h-[700px] relative p-5 flex items-center justify-center">
                    <CircularProgress
                      size={60}
                      thickness={4}
                      style={{
                        color: '#1976d2', // Theme color
                      }}
                    />
                  </Paper>
                ) : (
                  <>
                    <Paper elevation={4} className="w-[100%] h-[700px] relative p-5">
                      {/* Video Stream */}
                      <img
                        ref={videoRef}
                        src={src}
                        alt="Video Stream"
                        controls
                        className="w-full h-[600px] rounded-lg"
                        onError={() => console.error("Video stream failed to load")}
                      />

                      {/* Bottom Control Bar */}
                      <div className="absolute bottom-4 left-0 w-full flex justify-center">
                        {/* Restart Button (Centered) */}
                        <Button
                          id="restart-button"
                          onClick={handleRestart}
                          disabled={loading}
                          className="flex items-center gap-2 h-10 px-6 py-2 text-base font-bold bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-300 shadow-lg active:scale-95"
                        >
                          {loading ? (
                            <span className="animate-spin font-bold">
                              <FiRefreshCw className="h-5 w-5 font-bold" />
                            </span>
                          ) : (
                            <FiRefreshCw className="h-5 w-5 font-bold" />
                          )}
                          {/* <span className="font-bold">{loading ? "Restarting..." : "Restart"}</span> */}
                        </Button>
                      </div>

                      {/* Temperature Sensor (Bottom Right) */}
                      <div
  id="temp-button"
  className={`absolute bottom-4 right-4 flex items-center justify-center h-10 px-4 py-2 text-xl font-bold bg-white rounded-lg shadow-lg ${
    temperature !== null
      ? temperature <= 30
        ? "text-green-500"
        : temperature <= 60
        ? "text-yellow-500"
        : "text-red-500"
      : "text-gray-500"
  }`}
>
  <span>
    🌡️ {temperature !== null ? `${temperature}°C` : "Loading..."}
  </span>
</div>

                    </Paper>
                  </>
                )}
              </div>




            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            // className=" "
            >
              <div
                className={`flex justify-center md:mt-0 mt-6 ${anchorEl ? `backdrop-blur-xl opacity-20 bg-gray-300` : ``
                  }`}

              >
                <TableContainer
                  id="data-table"
                  className="w-auto max-w-[98%] shadow-lg rounded-lg overflow-hidden"
                  component={Paper}
                  sx={{
                    maxHeight: 700, // Set the fixed height (e.g., 400px)
                    overflowY: 'auto', // Enable vertical scrolling
                  }}
                >
                  <Table aria-label="product table">
  <TableHead>
    <TableRow sx={{ bgcolor: "#06B6D4" }}>
      {/* <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}> */}
        {/* QR
      </TableCell> */}
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
        EAN
      </TableCell>
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
        Batch No
      </TableCell>
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
        MRP
      </TableCell>
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
        MFG
      </TableCell>
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
        EXP
      </TableCell>
      <TableCell align="center" sx={{ color: "white", fontWeight: "bold", fontSize: "1.5rem" }}>
      </TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {tableData &&
      tableData.map((result, index) => (
        <>
        <TableRow
          key={index}
          onMouseEnter={() => setSelectedRow(index)}
          onMouseLeave={() => setSelectedRow(null)}
          sx={{
            "&:last-child td, &:last-child th": { border: 0 },
            "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
            "&:hover": { backgroundColor: "#e3f2fd" },
          }}
        >
          {/* <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            <IconButton disabled={!result.batchNo} onClick={() => 
              setOpenQRmodal(true)
            }>
              <QrCodeIcon  />
            </IconButton>
          </TableCell> */}
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {result?.barcode}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {result?.batchNo}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {result?.mrp}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {result?.mfgDate}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {result?.expDate}
          </TableCell>
          <TableCell align="center" sx={{ fontSize: "1.5rem" }}>
            {selectedRow === index && (
              <>
                <IconButton onClick={() => handleRowClick(result)} aria-label="edit">
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleOpenDeleteDialog(index)} aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </TableCell>
        </TableRow>
            <Dialog open={openQRmodal} onClose={() => setOpenQRmodal(false)}>
            <DialogTitle>Generate QR Code</DialogTitle>
            <DialogContent>Do you want to generate and print the QR code?</DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenQRmodal(false)} color="secondary">
                No
              </Button>
              <Button
                onClick={() => {
                  handleGenerateQR(result);
                  setOpenQRmodal(false);
                }}
                color="primary"
                variant="contained"
              >
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          </>
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
              </div>
            </Grid>
            <div id="workflow-status">
              <WorkflowStatus statusUpdates={statusUpdates} />
            </div>
          </Grid>
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
