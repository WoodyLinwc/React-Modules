// hooks/useRequests.js
import { useState, useEffect } from "react";
import {
    loadRequests,
    saveRequest,
    deleteRequest,
    updateRequestStatus,
    getRequestsByStatus,
    getRequestsByUser,
} from "../data/storage.js";

export const useRequests = (initialFilters = {}) => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Load requests on mount
    useEffect(() => {
        refreshRequests();
    }, []);

    const refreshRequests = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = loadRequests();
            setRequests(data);
        } catch (err) {
            setError("Failed to load requests");
            console.error("Error loading requests:", err);
        } finally {
            setLoading(false);
        }
    };

    const addRequest = async (requestData) => {
        try {
            const newRequest = {
                ...requestData,
                id: Date.now().toString(),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            };

            const success = saveRequest(newRequest);
            if (success) {
                setRequests((prev) => [...prev, newRequest]);
                return { success: true, request: newRequest };
            } else {
                throw new Error("Failed to save request");
            }
        } catch (err) {
            setError("Failed to create request");
            console.error("Error creating request:", err);
            return { success: false, error: err.message };
        }
    };

    const updateRequest = async (requestId, updates) => {
        try {
            const existingRequest = requests.find((r) => r.id === requestId);
            if (!existingRequest) {
                throw new Error("Request not found");
            }

            const updatedRequest = {
                ...existingRequest,
                ...updates,
                updated_at: new Date().toISOString(),
            };

            const success = saveRequest(updatedRequest);
            if (success) {
                setRequests((prev) =>
                    prev.map((r) => (r.id === requestId ? updatedRequest : r))
                );
                return { success: true, request: updatedRequest };
            } else {
                throw new Error("Failed to update request");
            }
        } catch (err) {
            setError("Failed to update request");
            console.error("Error updating request:", err);
            return { success: false, error: err.message };
        }
    };

    const removeRequest = async (requestId) => {
        try {
            const success = deleteRequest(requestId);
            if (success) {
                setRequests((prev) => prev.filter((r) => r.id !== requestId));
                return { success: true };
            } else {
                throw new Error("Failed to delete request");
            }
        } catch (err) {
            setError("Failed to delete request");
            console.error("Error deleting request:", err);
            return { success: false, error: err.message };
        }
    };

    const changeStatus = async (requestId, newStatus, updatedBy) => {
        try {
            const success = updateRequestStatus(
                requestId,
                newStatus,
                updatedBy
            );
            if (success) {
                setRequests((prev) =>
                    prev.map((r) =>
                        r.id === requestId
                            ? {
                                  ...r,
                                  status: newStatus,
                                  updated_at: new Date().toISOString(),
                                  updated_by: updatedBy,
                              }
                            : r
                    )
                );
                return { success: true };
            } else {
                throw new Error("Failed to update status");
            }
        } catch (err) {
            setError("Failed to update status");
            console.error("Error updating status:", err);
            return { success: false, error: err.message };
        }
    };

    const getRequestById = (requestId) => {
        return requests.find((r) => r.id === requestId) || null;
    };

    const getFilteredRequests = (filters = {}) => {
        return requests.filter((request) => {
            // Status filter
            if (filters.status && request.status !== filters.status) {
                return false;
            }

            // Priority filter
            if (filters.priority && request.priority !== filters.priority) {
                return false;
            }

            // Request type filter
            if (
                filters.request_type &&
                request.request_type !== filters.request_type
            ) {
                return false;
            }

            // User filter
            if (
                filters.user &&
                request.created_by !== filters.user &&
                request.requested_by !== filters.user
            ) {
                return false;
            }

            // Date range filter
            if (filters.startDate || filters.endDate) {
                const requestDate = new Date(request.created_at);
                if (
                    filters.startDate &&
                    requestDate < new Date(filters.startDate)
                ) {
                    return false;
                }
                if (
                    filters.endDate &&
                    requestDate > new Date(filters.endDate)
                ) {
                    return false;
                }
            }

            // Search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                const searchableFields = [
                    request.title,
                    request.location,
                    request.requested_by,
                    request.issue_description,
                    request.justification,
                    request.special_requirements,
                ].filter(Boolean);

                const matchesSearch = searchableFields.some((field) =>
                    field.toLowerCase().includes(searchLower)
                );

                if (!matchesSearch) {
                    return false;
                }
            }

            return true;
        });
    };

    const getRequestStats = () => {
        const stats = {
            total: requests.length,
            new: 0,
            in_progress: 0,
            on_hold: 0,
            completed: 0,
            closed: 0,
            by_priority: {
                low: 0,
                medium: 0,
                high: 0,
                urgent: 0,
            },
            by_type: {
                maintenance: 0,
                cleaning: 0,
                equipment: 0,
                room_setup: 0,
            },
        };

        requests.forEach((request) => {
            // Count by status
            stats[request.status] = (stats[request.status] || 0) + 1;

            // Count by priority
            if (stats.by_priority[request.priority] !== undefined) {
                stats.by_priority[request.priority]++;
            }

            // Count by type
            if (stats.by_type[request.request_type] !== undefined) {
                stats.by_type[request.request_type]++;
            }
        });

        return stats;
    };

    return {
        // Data
        requests,
        loading,
        error,

        // Actions
        refreshRequests,
        addRequest,
        updateRequest,
        removeRequest,
        changeStatus,

        // Getters
        getRequestById,
        getFilteredRequests,
        getRequestStats,

        // Convenience getters
        newRequests: requests.filter((r) => r.status === "new"),
        inProgressRequests: requests.filter((r) => r.status === "in_progress"),
        completedRequests: requests.filter((r) => r.status === "completed"),
    };
};
