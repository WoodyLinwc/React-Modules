// components/RequestForm/DynamicFields.jsx
import { REQUEST_TYPE_CONFIGS } from "../../data/requestTypes.js";

const DynamicFields = ({ requestType, formData, onFieldChange, errors }) => {
    const config = REQUEST_TYPE_CONFIGS[requestType];
    if (!config) return null;

    return config.fields.map((field) => (
        <div key={field.name} className="form-group">
            <label>
                {field.label} {field.required && "*"}
            </label>
            {field.type === "select" ? (
                <select
                    value={formData[field.name] || ""}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    className="form-select"
                >
                    <option value="">Select...</option>
                    {field.options.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            ) : field.type === "textarea" ? (
                <textarea
                    value={formData[field.name] || ""}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    className="form-textarea"
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                />
            ) : field.type === "number" ? (
                <input
                    type="number"
                    value={formData[field.name] || ""}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    className="form-input"
                />
            ) : (
                <input
                    type="text"
                    value={formData[field.name] || ""}
                    onChange={(e) => onFieldChange(field.name, e.target.value)}
                    className="form-input"
                />
            )}
            {errors[field.name] && (
                <span className="error-text">{field.label} is required</span>
            )}
        </div>
    ));
};

export default DynamicFields;
