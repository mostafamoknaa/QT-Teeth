/**
 * Formats validation error messages from the API
 * Converts validation keys like "validation.required" to user-friendly messages
 */

const errorMessageMap: Record<string, string> = {
    // Required field errors
    'validation.required': 'This field is required',
    'The name field is required': 'Name is required',
    'The email field is required': 'Email is required',
    'The phone field is required': 'Phone number is required',
    'The message field is required': 'Message is required',
    'The client name field is required': 'Client name is required',
    'The client title field is required': 'Client title is required',
    'The service name field is required': 'Service name is required',
    'The content field is required': 'Content is required',
    'The title field is required': 'Title is required',
    'The description field is required': 'Description is required',
    'The branch field is required': 'Branch is required',
    'The password field is required': 'Password is required',
    'The current password field is required': 'Current password is required',
    'The name field is required.': 'Name is required',
    'The email field is required.': 'Email is required',
    'The phone field is required.': 'Phone number is required',
    'The password field is required.': 'Password is required',
    'The current password is incorrect.': 'Current password is incorrect',
    'The provided password does not match our records.': 'The password is incorrect',

    // Email validation
    'validation.email': 'Please enter a valid email address',
    'The email must be a valid email address.': 'Please enter a valid email address',
    'The email field must be a valid email.': 'Please enter a valid email address',

    // String validation
    'validation.string': 'This field must be text',
    'The title must be a string.': 'Title must be text',

    // Numeric validation
    'validation.numeric': 'This field must be a number',
    'validation.integer': 'This field must be a whole number',

    // File/Image validation
    'validation.image': 'Please upload a valid image file',
    'validation.mimes': 'File type not allowed',
    'validation.max': 'File size is too large',
    'The image must be an image.': 'Please upload a valid image file',
    'The image field must be an image.': 'Please upload a valid image file',

    // Min/Max length
    'validation.min': 'This field is too short',
    'The title field must be at least': 'Title is too short',
    'The email field must be at most': 'Email is too long',

    // URL validation
    'validation.url': 'Please enter a valid URL',
    'The video url field must be a valid URL.': 'Please enter a valid video URL',
    'The video url must be a valid URL.': 'Please enter a valid video URL',

    // Rating validation
    'The rating field is required.': 'Rating is required',
    'The rating must be between 1 and 5.': 'Rating must be between 1 and 5',
    'The rating must be a number.': 'Rating must be a number',

    // Unique validation
    'validation.unique': 'This value already exists',
    'The email has already been taken.': 'This email is already registered',
    'The password confirmation does not match.': 'Password confirmation does not match',

    // Phone validation
    'The phone field must be a valid phone number.': 'Please enter a valid phone number (7-15 digits)',
    'The phone must be a valid phone number.': 'Please enter a valid phone number (7-15 digits)',
    'validation.regex': 'Please enter a valid phone number',
    'Please enter a valid phone number (7-15 digits, may include +, -, or spaces)': 'Please enter a valid phone number (7-15 digits)',

    // Service validation
    'The service id field is required.': 'Please select a service',
    'The service id must be a number.': 'Invalid service selection',
    
    // Specialty and University
    'The specialty field is required.': 'Specialty is required',
    'The university field is required.': 'University is required',
    
    // Author name
    'The author name field is required.': 'Author name is required',
    
    // Order
    'The order must be a number.': 'Display order must be a number',
};

/**
 * Format a single error message
 */
export function formatErrorMessage(error: string): string {
    // Check if the error message is in our map
    if (errorMessageMap[error]) {
        return errorMessageMap[error];
    }

    // Check for partial matches (contains validation keys)
    for (const [key, message] of Object.entries(errorMessageMap)) {
        if (error.includes(key) || key.includes(error)) {
            return message;
        }
    }

    // If no match found, clean up the error message
    // Remove "validation." prefix and convert snake_case to readable text
    if (error.startsWith('validation.')) {
        const cleaned = error.replace('validation.', '').replace(/_/g, ' ');
        return cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
    }

    // Return as-is if it's already a user-friendly message
    return error;
}

/**
 * Format error message for display (handles arrays or strings)
 */
export function getErrorMessage(error?: string | string[]): string {
    if (!error) return '';

    // If it's an array, get the first message
    if (Array.isArray(error)) {
        return error.length > 0 ? formatErrorMessage(error[0]) : '';
    }

    return formatErrorMessage(error);
}

export default {
    formatErrorMessage,
    getErrorMessage,
};
