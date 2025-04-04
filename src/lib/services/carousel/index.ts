// api call functions
import APIs from "@/lib/utils/constants/apis";
import { BasicResponse } from "@/lib/utils/common/types";
import { HTTP_METHODS } from "@/lib/utils/constants/http-methods";
import { apiCall } from "@/lib/utils/common-services/api-call";

const tokenRequired = false;

// Interface defining the structure of an Item
interface Item {
  _id: string;
  brand_id: string;
  displayPriorityArr: displayPriorityArr[];
  createdAt: string;
  updatedAt: string;
}

// structure of a displayPriorityArr
interface displayPriorityArr {
  _id: string;
  timestamp: string;
  name: string;
  url: string;
  type: string;
  image: string;
  mobile_image: string;
}

// Interface for the API response related to the carousel
interface CarouselApiResponse extends BasicResponse {
  items: Item[]; // Array of items returned by the API
  totalCount: number;
}

const getCarousel = async (obj: object): Promise<CarouselApiResponse> => {
  try {
    // Making an API call to fetch carousel data
    const response = await apiCall(
      APIs.CAROUSEL,
      HTTP_METHODS.POST,
      obj ? obj : {},
      tokenRequired
    );

    return response as CarouselApiResponse;
  } catch (error) {
    console.error("Error fetching carousel data:", error);
    throw error;
  }
};

export { getCarousel };
