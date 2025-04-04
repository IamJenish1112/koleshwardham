// api call functions
import APIs from "@/lib/utils/constants/apis";
import { BasicResponse } from "@/lib/utils/common/types";
import { HTTP_METHODS } from "@/lib/utils/constants/http-methods";
import { apiCall } from "@/lib/utils/common-services/api-call";

const tokenRequired = false;

// Interface for the API response related tofaqs
interface FaqsApiResponse extends BasicResponse {
  items: any[]; // Object of items returned by the API
  totalCount: number;
}

const createContactUs = async (obj: object): Promise<FaqsApiResponse> => {
  try {
    // Making an API call to fetch faqs
    const response = await apiCall(
      APIs.CONTACT_US,
      HTTP_METHODS.POST,
      obj ? obj : {},
      tokenRequired
    );

    return response as FaqsApiResponse;
  } catch (error) {
    console.error("Error fetching faqs:", error);
    throw error;
  }
};

export { createContactUs };
