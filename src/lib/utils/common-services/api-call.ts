import axios from "axios";
import { HTTP_METHODS } from "@/lib/utils/constants/http-methods";
import { ERROR_MESSAGES } from "@/lib/utils/constants/response-messages";
import {
  getLocalStorage,
  setLocalStorage,
  removeLocalStorage,
} from "@/lib/utils/common-services/localStorage.common";
import LOCALSTORAGE from "@/lib/utils/constants/localStorageName.constant";
import constants from "@/lib/utils/constants";
// Define the type for allowed HTTP methods based on the constants
type HttpMethod = (typeof HTTP_METHODS)[keyof typeof HTTP_METHODS];

interface FilterableObject {
  filter?: any;
  [key: string]: any;
}

// General API call function
export const apiCall = async (
  api: string,
  method: HttpMethod,
  data: FilterableObject,
  tokenRequired: boolean,
  downloadPdf: boolean = false,
  multipartUpload: boolean = false
) => {
  const loginDetails = getLocalStorage(LOCALSTORAGE.loginDetails);
  const user_id = getLocalStorage(LOCALSTORAGE.user_id);

  try {
    // Configuring the request parameters
    const config: {
      method: HttpMethod;
      url: string;
      data?: object;
      responseType?: "blob";
      headers: {
        "api-key": string;
        Authorization?: string;
      };
    } = {
      method, // HTTP method (GET, POST, etc.)
      url: api, // URL of the API endpoint
      data, // Data to be sent in the request body (for POST, PUT, etc.)
      responseType: downloadPdf ? "blob" : undefined, // Response type (for downloading PDFs)
      headers: {
        "api-key": constants.apiKey, // API key from constants
      },
    };
    if (tokenRequired) {
      config.headers["Authorization"] = `Bearer ${loginDetails.accessToken}`;
    }

    // Making the HTTP request using Axios and returning the response data
    const response = await axios(config);

    if (response && response.data?.status === 401) {
      window.location.href = "/admin/login";
      return;
    }

    return response.data;
  } catch (error) {
    console.log("error", error);

    // Handling errors and returning a default error message if something goes wrong
    return { error: error || ERROR_MESSAGES.api_error_message };
  }
};
