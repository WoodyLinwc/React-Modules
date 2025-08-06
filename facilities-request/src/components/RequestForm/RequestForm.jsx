// components/RequestForm/RequestForm.jsx
import { useState } from "react";
import { REQUEST_TYPES, PRIORITIES } from "../../utils/constants.js";
import { validateRequestForm, clearFieldError } from "./FormValidation.js";
import DynamicFields from "./DynamicFields.jsx";

const RequestForm = ({ onSubmit, currentRole }) => {
    const [formData, setFormData] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFieldChange = (name, value) => {
        setFormData((prev) => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => clearFieldError(prev, name));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validation = validateRequestForm(formData);

        if (!validation.isValid) {
            setErrors(validation.errors);
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit({
                ...formData,
                id: Date.now().toString(),
                status: "new",
                created_at: new Date().toISOString(),
                created_by: currentRole,
                updated_at: new Date().toISOString(),
            });

            // Reset form on successful submission
            setFormData({});
            setErrors({});
        } catch (error) {
            console.error("Form submission error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mb-xl">
            <h2 className="mb-md">New Facilities Request</h2>

            <form onSubmit={handleSubmit}>
                <div className="form-grid">
                    {/* Basic Fields */}
                    <div className="form-group">
                        <label>Request Type *</label>
                        <select
                            value={formData.request_type || ""}
                            onChange={(e) =>
                                handleFieldChange(
                                    "request_type",
                                    e.target.value
                                )
                            }
                            className="form-select"
                        >
                            <option value="">Select request type...</option>
                            {Object.entries(REQUEST_TYPES).map(
                                ([key, label]) => (
                                    <option key={key} value={key}>
                                        {label}
                                    </option>
                                )
                            )}
                        </select>
                        {errors.request_type && (
                            <span className="error-text">
                                {errors.request_type}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Priority *</label>
                        <select
                            value={formData.priority || ""}
                            onChange={(e) =>
                                handleFieldChange("priority", e.target.value)
                            }
                            className="form-select"
                        >
                            <option value="">Select priority...</option>
                            {Object.entries(PRIORITIES).map(([key, label]) => (
                                <option key={key} value={key}>
                                    {label}
                                </option>
                            ))}
                        </select>
                        {errors.priority && (
                            <span className="error-text">
                                {errors.priority}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Location *</label>
                        <input
                            type="text"
                            value={formData.location || ""}
                            onChange={(e) =>
                                handleFieldChange("location", e.target.value)
                            }
                            className="form-input"
                            placeholder="Building, Floor, Room..."
                        />
                        {errors.location && (
                            <span className="error-text">
                                {errors.location}
                            </span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Requested By *</label>
                        <input
                            type="text"
                            value={formData.requested_by || ""}
                            onChange={(e) =>
                                handleFieldChange(
                                    "requested_by",
                                    e.target.value
                                )
                            }
                            className="form-input"
                            placeholder="Your name"
                        />
                        {errors.requested_by && (
                            <span className="error-text">
                                {errors.requested_by}
                            </span>
                        )}
                    </div>

                    <div className="form-group form-grid-full">
                        <label>Title/Summary *</label>
                        <input
                            type="text"
                            value={formData.title || ""}
                            onChange={(e) =>
                                handleFieldChange("title", e.target.value)
                            }
                            className="form-input"
                            placeholder="Brief description of request..."
                        />
                        {errors.title && (
                            <span className="error-text">{errors.title}</span>
                        )}
                    </div>
                </div>

                {/* Dynamic Fields based on request type */}
                {formData.request_type && (
                    <div className="mt-lg">
                        <h3 className="mb-md">Additional Information</h3>
                        <div className="form-grid">
                            <DynamicFields
                                requestType={formData.request_type}
                                formData={formData}
                                onFieldChange={handleFieldChange}
                                errors={errors}
                            />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary mt-lg"
                >
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                </button>
            </form>
        </div>
    );
};

export default RequestForm;
