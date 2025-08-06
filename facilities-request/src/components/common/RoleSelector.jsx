// components/common/RoleSelector.jsx
import { USER_ROLES } from "../../utils/constants.js";

const RoleSelector = ({ currentRole, onRoleChange }) => {
    return (
        <div className="flex-center gap-sm mb-lg">
            <label>Current Role:</label>
            <select
                value={currentRole}
                onChange={(e) => onRoleChange(e.target.value)}
                className="form-select"
            >
                {Object.entries(USER_ROLES).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default RoleSelector;
