// api call functions
import APIs from "@/lib/utils/constants/apis";
import { BasicResponse } from "@/lib/utils/common/types";
import { HTTP_METHODS } from "@/lib/utils/constants/http-methods";
import { apiCall } from "@/lib/utils/common-services/api-call";

const tokenRequired = false;

// Interface for the API response related to login
interface LoginApiResponse extends BasicResponse {
  items: items; // Array of items returned by the API
  totalCount: number;
}

// Interface for the items returned by the API
interface items {
  accessToken: string; // Token returned by
  user: any; // User details
}

// Interface for the API response related to sign up
interface AuthApiResponse extends BasicResponse {
  items: any; // Array of items returned by the API
  totalCount: number;
}
// login api call
const Login = async (obj: object): Promise<LoginApiResponse> => {
  try {
    // Making an API call to login
    const response = await apiCall(
      APIs.LOGIN,
      HTTP_METHODS.POST,
      obj ? obj : {},
      tokenRequired
    );

    return response as LoginApiResponse;
  } catch (error) {
    console.error("Error while login:", error);
    throw error;
  }
};

// sign up or create user
const SignUp = async (obj: object): Promise<AuthApiResponse> => {
  try {
    // Making an API call to sign up
    const response = await apiCall(
      APIs.CREATE_USER,
      HTTP_METHODS.POST,
      obj ? obj : {},
      tokenRequired
    );

    return response as AuthApiResponse;
  } catch (error) {
    console.error("Error while sign up:", error);
    throw error;
  }
};

export { Login, SignUp };
