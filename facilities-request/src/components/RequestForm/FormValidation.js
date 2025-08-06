// components/RequestForm/FormValidation.js
import { REQUEST_TYPE_CONFIGS } from "../../data/requestTypes.js";

export const validateRequestForm = (formData) => {
    const errors = {};

    // Required base fields
    if (!formData.request_type) {
        errors.request_type = "Request type is required";
    }

    if (!formData.priority) {
        errors.priority = "Priority is required";
    }

    if (!formData.location) {
        errors.location = "Location is required";
    }

    if (!formData.requested_by) {
        errors.requested_by = "Name is required";
    }

    if (!formData.title) {
        errors.title = "Title is required";
    }

    // Validate dynamic fields based on request type
    if (formData.request_type) {
        const config = REQUEST_TYPE_CONFIGS[formData.request_type];
        if (config) {
            config.fields.forEach((field) => {
                if (field.required && !formData[field.name]) {
                    errors[field.name] = `${field.label} is required`;
                }
            });
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const clearFieldError = (errors, fieldName) => {
    const newErrors = { ...errors };
    delete newErrors[fieldName];
    return newErrors;
};
