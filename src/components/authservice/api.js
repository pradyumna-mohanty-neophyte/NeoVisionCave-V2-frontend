import axios from "axios";
// import token from './authToken';

const localUrl = "http://localhost:8080";
// const infer_localUrl= 'http://localhost:9990'; 8249!
const infer_localUrl = "http://192.168.1.25:9990";
const url = "http://localhost:8080";
// API INTEGRATION OFR LOGIN

export const RESET_TO_DEFAULT_ENV_CONFS = async (path) => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(
      `${infer_localUrl}/settings/reset_to_default_env_confs`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const GET_CURRENT_ENV_CONFS = async (path) => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(
      `${infer_localUrl}/settings/get_current_env_confs`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const SET_CURRENT_ENV_CONFS = async (path) => {
  try {
    // console.log("path is found", path)
    const res = await axios.post(
      `${infer_localUrl}/settings/set_current_env_confs`,
      path,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const GET_CURRENT_DEPTH = async () => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(
      `${infer_localUrl}/settings/get_current_depth`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const AUTO_CALIBRATE_DEPTH = async () => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(
      `${infer_localUrl}/settings/auto_calibrate_depth`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const SAVE_CALIBRATED_DEPTH = async (values) => {
  try {
    // console.log("path is found", path)
    const res = await axios.post(
      `${infer_localUrl}/settings/save_calibrated_depth`,
      values,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const GET_CURRENT_ROI = async (path) => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(`${infer_localUrl}/settings/get_current_roi`, {
      headers: {
        Accept: "application/json",
        //   Authorization: await token(),
      },
    });
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const capture_1 = async () => {
  try {
    // Record the start time
    const startTime = performance.now();
    const res = await axios.post(
      'http://localhost:8000/capture-1/',
      // {}, // Include an empty object for data, as required by axios when no data is sent.
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log("API Response:", res);  // Log the full response object to understand its structure

    // Record the end time
    const endTime = performance.now();

    // Calculate the elapsed time
    const elapsedTime = endTime - startTime;

    console.log(`Time taken for POST request and response: ${elapsedTime.toFixed(2)} milliseconds`);

    // Do not try to access metadata here, as the metadata will come via the socket event
    return res;  // Simply return the response object without accessing metadata
  } catch (error) {
    console.log("Error in capturing frames", error.response || error.message);
  }
};

export const capture_3 = async () => {
  try {
    // Record the start time
    const startTime = performance.now();
    const res = await axios.post(
      'http://localhost:8000/capture-3/',
      // {}, // Include an empty object for data, as required by axios when no data is sent.
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
    // console.log("API Response:", res);  // Log the full response object to understand its structure

    // Record the end time
    const endTime = performance.now();

    // Calculate the elapsed time
    const elapsedTime = endTime - startTime;

    console.log(`Time taken for POST request and response: ${elapsedTime.toFixed(2)} milliseconds`);

    // Do not try to access metadata here, as the metadata will come via the socket event
    return res;  // Simply return the response object without accessing metadata
  } catch (error) {
    console.log("Error in capturing frames", error.response || error.message);
  }
};



export const enable_autocapture = async (enable) => {
  try {
      const startTime = performance.now();
      const res = await axios.post(
          'http://localhost:8000/toggle-autocapture',  // Remove trailing slash
          { enable: enable },  // Make sure the key matches what FastAPI expects
          {
              headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
              }
          }
      );
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(`Time taken for POST request and response: ${elapsedTime.toFixed(2)} milliseconds`);
      return res;
  } catch (error) {
      console.log("Error in toggling autocapture:", error.response || error.message);
      throw error;
  }
};

export const updateMetadata = async (metadata_id, updatedData) => {
  try {
    const response = await axios.post('http://192.168.29.129:4040/update_data', {
      metadata_id: metadata_id,
      key_value: updatedData
    });
    return response;
  } catch (error) {
    console.error("Error updating metadata:", error);
    throw error;
  }
};


export const downloadExcel = async (startdate, enddate) => {
  try {
    const res = await axios.get(
      `http://192.168.1.25:9990/data/download_excel?startdate=${startdate}&enddate=${enddate}`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
        responseType: "blob",
      },
    );
    // Create a URL for the blob
    const url = window.URL.createObjectURL(new Blob([res.data]));

    // Create a link element and trigger a download
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `Products_${startdate}_to_${enddate}.xlsx`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
    // console.log("response download excel",res);
    // return res;
  } catch (error) {
    console.log("Error in calling download excel: ", error);
  }
};

export const getSAPurl = async () => {
  try {
    const res = await axios.get(
      "http://192.168.1.25:9990/settings/get_sap_api_conf",
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    return res;
  } catch (error) {
    console.log("error in getting SAP url ", error);
  }
};

export const setSAPurl = async (body) => {
  try {
    const res = await axios.post(
      "http://192.168.1.25:9990/settings/set_sap_api_conf",
      body,
      {
        headers: {
          Accept: "application/json",
        },
      },
    );
    console.log("wow", res);
    return res;
  } catch (error) {
    console.log("error in setting SAP url ", error);
  }
};

export const SET_CURRENT_ROI = async (path) => {
  try {
    // console.log("path is found", path)
    const res = await axios.post(
      `${infer_localUrl}/settings/set_current_roi`,
      path,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const RESET_TO_DEFAULT_ROI = async () => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(
      `${infer_localUrl}/settings/reset_to_default_roi`,
      {
        headers: {
          Accept: "application/json",
          //   Authorization: await token(),
        },
      },
    );
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};

export const RESET_AI_ENGINE = async () => {
  try {
    // console.log("path is found", path)
    const res = await axios.get(`${infer_localUrl}/manage/tare_weight`, {
      headers: {
        Accept: "application/json",
        //   Authorization: await token(),
      },
    });
    // console.log(res.data);
    return res;
  } catch (error) {
    console.log("Error Calling all Store API: ", error);
  }
};
