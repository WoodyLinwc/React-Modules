// data/storage.js
import { MOCK_REQUESTS, MOCK_USERS, MOCK_FEEDBACK } from "./mockData.js";

const STORAGE_KEYS = {
    REQUESTS: "facilities_requests",
    USERS: "facilities_users",
    FEEDBACK: "facilities_feedback",
    SETTINGS: "facilities_settings",
};

// Request Management
export const loadRequests = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.REQUESTS);
        if (stored) {
            return JSON.parse(stored);
        }
        // Return mock data if no stored data exists
        return MOCK_REQUESTS;
    } catch (error) {
        console.error("Error loading requests:", error);
        return MOCK_REQUESTS;
    }
};

export const saveRequests = (requests) => {
    try {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
        return true;
    } catch (error) {
        console.error("Error saving requests:", error);
        return false;
    }
};

export const saveRequest = (request) => {
    const requests = loadRequests();
    const existingIndex = requests.findIndex((r) => r.id === request.id);

    if (existingIndex >= 0) {
        requests[existingIndex] = {
            ...request,
            updated_at: new Date().toISOString(),
        };
    } else {
        requests.push(request);
    }

    return saveRequests(requests);
};

export const deleteRequest = (requestId) => {
    const requests = loadRequests();
    const filtered = requests.filter((r) => r.id !== requestId);
    return saveRequests(filtered);
};

export const updateRequestStatus = (requestId, newStatus, updatedBy) => {
    const requests = loadRequests();
    const requestIndex = requests.findIndex((r) => r.id === requestId);

    if (requestIndex >= 0) {
        requests[requestIndex] = {
            ...requests[requestIndex],
            status: newStatus,
            updated_at: new Date().toISOString(),
            updated_by: updatedBy,
        };
        return saveRequests(requests);
    }

    return false;
};

// User Management
export const loadUsers = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.USERS);
        if (stored) {
            return JSON.parse(stored);
        }
        return MOCK_USERS;
    } catch (error) {
        console.error("Error loading users:", error);
        return MOCK_USERS;
    }
};

export const saveUsers = (users) => {
    try {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
        return true;
    } catch (error) {
        console.error("Error saving users:", error);
        return false;
    }
};

// Feedback Management
export const loadFeedback = (requestId = null) => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACK);
        const feedback = stored ? JSON.parse(stored) : MOCK_FEEDBACK;

        if (requestId) {
            return feedback.filter((f) => f.request_id === requestId);
        }

        return feedback;
    } catch (error) {
        console.error("Error loading feedback:", error);
        return requestId ? [] : MOCK_FEEDBACK;
    }
};

export const saveFeedback = (feedbackItem) => {
    try {
        const allFeedback = loadFeedback();
        allFeedback.push({
            ...feedbackItem,
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
        });

        localStorage.setItem(
            STORAGE_KEYS.FEEDBACK,
            JSON.stringify(allFeedback)
        );
        return true;
    } catch (error) {
        console.error("Error saving feedback:", error);
        return false;
    }
};

// Settings Management
export const loadSettings = () => {
    try {
        const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
        return stored
            ? JSON.parse(stored)
            : {
                  notifications: true,
                  autoAssign: false,
                  defaultPriority: "medium",
                  theme: "light",
              };
    } catch (error) {
        console.error("Error loading settings:", error);
        return {};
    }
};

export const saveSettings = (settings) => {
    try {
        localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
        return true;
    } catch (error) {
        console.error("Error saving settings:", error);
        return false;
    }
};

// Utility functions
export const getRequestsByStatus = (status) => {
    const requests = loadRequests();
    return requests.filter((r) => r.status === status);
};

export const getRequestsByUser = (userId) => {
    const requests = loadRequests();
    return requests.filter(
        (r) => r.created_by === userId || r.requested_by === userId
    );
};

export const getRequestsByDateRange = (startDate, endDate) => {
    const requests = loadRequests();
    return requests.filter((r) => {
        const createdDate = new Date(r.created_at);
        return createdDate >= startDate && createdDate <= endDate;
    });
};

export const clearAllData = () => {
    try {
        Object.values(STORAGE_KEYS).forEach((key) => {
            localStorage.removeItem(key);
        });
        return true;
    } catch (error) {
        console.error("Error clearing data:", error);
        return false;
    }
};

export const exportData = () => {
    return {
        requests: loadRequests(),
        users: loadUsers(),
        feedback: loadFeedback(),
        settings: loadSettings(),
        exportDate: new Date().toISOString(),
    };
};
