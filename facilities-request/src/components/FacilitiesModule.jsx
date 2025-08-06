// components/FacilitiesModule.jsx
import { useState } from "react";
import { REQUEST_TYPES, PRIORITIES, STATUSES } from "../utils/constants.js";
import RoleSelector from "./common/RoleSelector.jsx";
import RequestForm from "./RequestForm/RequestForm.jsx";

const FacilitiesModule = () => {
    const [currentRole, setCurrentRole] = useState("employee");
    const [requests, setRequests] = useState([]);

    const handleNewRequest = (requestData) => {
        setRequests((prev) => [...prev, requestData]);
        console.log("New request submitted:", requestData);
    };

    return (
        <div className="facilities-module">
            <h1 className="mb-lg">Facilities Request Management</h1>

            <RoleSelector
                currentRole={currentRole}
                onRoleChange={setCurrentRole}
            />

            <RequestForm
                onSubmit={handleNewRequest}
                currentRole={currentRole}
            />

            {/* Show submitted requests for testing */}
            {requests.length > 0 && (
                <div>
                    <h3 className="mb-md">Recent Requests:</h3>
                    {requests.map((req) => (
                        <div key={req.id} className="request-card">
                            <div className="flex-between">
                                <strong>{req.title}</strong>
                                <span
                                    className={`status-badge status-${req.status}`}
                                >
                                    {STATUSES[req.status]}
                                </span>
                            </div>
                            <div className="request-meta">
                                {REQUEST_TYPES[req.request_type]} •{" "}
                                {PRIORITIES[req.priority]} • {req.location}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default FacilitiesModule;
