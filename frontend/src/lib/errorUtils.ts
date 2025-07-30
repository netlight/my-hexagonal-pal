import type { ModelError } from '../generated/api/src';

export interface ApiErrorResponse {
  message: string;
  details?: string[];
}

/**
 * Extracts user-friendly error messages from API error responses
 */
export async function extractErrorMessage(error: unknown): Promise<ApiErrorResponse> {
  // Handle fetch errors (network issues, etc.)
  if (error instanceof Error) {
    // Check if it's a ResponseError from the generated API client
    if ('response' in error && error.response instanceof Response) {
      // Try to extract JSON error from the response
      return await handleResponseError(error.response);
    }
    
    // Handle network errors
    if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
      return {
        message: 'Unable to connect to the server. Please check if the backend is running on port 3000.',
      };
    }
    
    // Check if the error message contains JSON error data
    if (error.message.includes('{') && error.message.includes('message')) {
      try {
        const jsonMatch = error.message.match(/\{.*\}/);
        if (jsonMatch) {
          const errorData = JSON.parse(jsonMatch[0]);
          if (errorData.message) {
            return await extractErrorMessage(errorData);
          }
        }
      } catch {
        // JSON parsing failed, continue with generic error handling
      }
    }
    
    // Generic error fallback
    return {
      message: error.message || 'An unexpected error occurred. Please try again.',
    };
  }
  
  // Handle direct API error objects
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const apiError = error as ModelError;
    const details: string[] = [];
    
    // Extract additional error details if present
    if (apiError.errors) {
      Object.entries(apiError.errors).forEach(([field, fieldErrors]) => {
        if (Array.isArray(fieldErrors)) {
          details.push(...fieldErrors.map(err => `${field}: ${err}`));
        } else if (typeof fieldErrors === 'string') {
          details.push(`${field}: ${fieldErrors}`);
        }
      });
    }
    
    return {
      message: apiError.message,
      details: details.length > 0 ? details : undefined,
    };
  }
  
  // Ultimate fallback
  return {
    message: 'An unexpected error occurred. Please try again.',
  };
}

/**
 * Handles Response objects to extract error messages (synchronous version)
 */
function handleResponseErrorSync(response: Response, originalMessage: string): ApiErrorResponse {
  // First try to extract error from the original message
  if (originalMessage.includes('{') && originalMessage.includes('message')) {
    try {
      const jsonMatch = originalMessage.match(/\{.*\}/);
      if (jsonMatch) {
        const errorData = JSON.parse(jsonMatch[0]);
        if (errorData.message) {
          return extractErrorMessage(errorData);
        }
      }
    } catch {
      // JSON parsing failed, fall back to status code mapping
    }
  }
  
  // Map common HTTP status codes to user-friendly messages
  switch (response.status) {
    case 400:
      return { message: 'Invalid request. Please check your input and try again.' };
    case 404:
      return { message: 'The requested resource was not found.' };
    case 409:
      return { message: 'This operation conflicts with existing data. Please check your input.' };
    case 500:
      return { message: 'A server error occurred. Please try again later.' };
    default:
      return { message: `Request failed with status ${response.status}. Please try again.` };
  }
}

/**
 * Handles Response objects to extract error messages (async version)
 */
async function handleResponseError(response: Response): Promise<ApiErrorResponse> {
  try {
    // Clone the response to avoid consuming the body multiple times
    const clonedResponse = response.clone();
    const errorData = await clonedResponse.json();
    
    if (errorData && typeof errorData === 'object' && 'message' in errorData) {
      const apiError = errorData as ModelError;
      const details: string[] = [];
      
      // Extract additional error details if present
      if (apiError.errors) {
        Object.entries(apiError.errors).forEach(([field, fieldErrors]) => {
          if (Array.isArray(fieldErrors)) {
            details.push(...fieldErrors.map(err => `${field}: ${err}`));
          } else if (typeof fieldErrors === 'string') {
            details.push(`${field}: ${fieldErrors}`);
          }
        });
      }
      
      return {
        message: apiError.message,
        details: details.length > 0 ? details : undefined,
      };
    }
  } catch (jsonError) {
    console.error('Failed to parse error response JSON:', jsonError);
    // JSON parsing failed, fall back to status text
  }
  
  return handleResponseErrorSync(response, '');
}