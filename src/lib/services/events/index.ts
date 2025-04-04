// API call functions
import APIs from "@/lib/utils/constants/apis";
import { BasicResponse } from "@/lib/utils/common/types";
import { HTTP_METHODS } from "@/lib/utils/constants/http-methods";
import { apiCall } from "@/lib/utils/common-services/api-call";

const tokenRequired = false;

// Interface defining the structure of an Event
export interface Event {
  _id?: string;
  title: string;
  shortDescription: string;
  images?: string[];
  date: string;
  location: string;
  description: string;
}

// Interface for the API response with multiple events
export interface AllEventsApiResponse extends BasicResponse {
  items: Event[]; // Array of events returned by the API
  total_Count: number;
}

// Interface for the API response with a single event
export interface EventApiResponse extends BasicResponse {
  item: Event; // Single event returned by the API
}

/**
 * Fetches all events from the API
 * @returns Promise with all events data
 */
export const getEvents = async (): Promise<AllEventsApiResponse> => {
  try {
    const response = await apiCall(
      APIs.GET_ALL_EVENTS,
      HTTP_METHODS.GET,
      {},
      tokenRequired
    );

    return response as AllEventsApiResponse;
  } catch (error) {
    console.error("Error fetching all events", error);
    throw error;
  }
};

/**
 * Fetches a single event by its ID
 * @param data Object containing the event ID
 * @returns Promise with the event data
 */
export const getEventById = async (data: {
  id: string;
}): Promise<EventApiResponse> => {
  try {
    const response = await apiCall(
      APIs.GET_EVENT_BY_ID,
      HTTP_METHODS.POST,
      data,
      tokenRequired
    );
    return response as EventApiResponse;
  } catch (error) {
    console.error("Error fetching event by ID", error);
    throw error;
  }
};

/**
 * Updates an existing event
 * @param data Object containing the event ID and updates
 * @returns Promise with the updated event data
 */
export const updateEvent = async (data: Event): Promise<EventApiResponse> => {
  try {
    const response = await apiCall(
      APIs.UPDATE_EVENT,
      HTTP_METHODS.POST,
      data,
      tokenRequired
    );
    return response as EventApiResponse;
  } catch (error) {
    console.error("Error updating event", error);
    throw error;
  }
};

/**
 * Deletes an event by its ID
 * @param id The ID of the event to delete
 * @returns Promise with the response from the API
 */

export const createEvent = async (data: Event): Promise<EventApiResponse> => {
  try {
    const response = await apiCall(
      APIs.CREATE_EVENT,
      HTTP_METHODS.POST,
      data,
      tokenRequired
    );
    return response as EventApiResponse;
  } catch (error) {
    console.error("Error creating event", error);
    throw error;
  }
};
export const deleteEvent = async (id: string): Promise<BasicResponse> => {
  try {
    const response = await apiCall(
      `${APIs.DELETE_EVENT}/${id}`,
      HTTP_METHODS.DELETE,
      {},
      tokenRequired
    );
    return response as BasicResponse;
  } catch (error) {
    console.error("Error deleting event", error);
    throw error;
  }
};
