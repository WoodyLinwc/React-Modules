// hooks/useStorage.js
import { useState, useEffect } from "react";
import {
    loadSettings,
    saveSettings,
    loadFeedback,
    saveFeedback,
    exportData,
    clearAllData,
} from "../data/storage.js";

export const useStorage = () => {
    const [settings, setSettings] = useState({});
    const [feedback, setFeedback] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadInitialData();
    }, []);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [settingsData, feedbackData] = await Promise.all([
                loadSettings(),
                loadFeedback(),
            ]);

            setSettings(settingsData);
            setFeedback(feedbackData);
        } catch (err) {
            setError("Failed to load data");
            console.error("Error loading initial data:", err);
        } finally {
            setLoading(false);
        }
    };

    // Settings management
    const updateSettings = async (newSettings) => {
        try {
            const updatedSettings = { ...settings, ...newSettings };
            const success = saveSettings(updatedSettings);

            if (success) {
                setSettings(updatedSettings);
                return { success: true, settings: updatedSettings };
            } else {
                throw new Error("Failed to save settings");
            }
        } catch (err) {
            setError("Failed to update settings");
            console.error("Error updating settings:", err);
            return { success: false, error: err.message };
        }
    };

    const resetSettings = async () => {
        try {
            const defaultSettings = {
                notifications: true,
                autoAssign: false,
                defaultPriority: "medium",
                theme: "light",
                emailNotifications: true,
                allowAnonymous: false,
                requireApproval: true,
            };

            const success = saveSettings(defaultSettings);
            if (success) {
                setSettings(defaultSettings);
                return { success: true, settings: defaultSettings };
            } else {
                throw new Error("Failed to reset settings");
            }
        } catch (err) {
            setError("Failed to reset settings");
            console.error("Error resetting settings:", err);
            return { success: false, error: err.message };
        }
    };

    const getSetting = (key, defaultValue = null) => {
        return settings[key] !== undefined ? settings[key] : defaultValue;
    };

    // Feedback management
    const addFeedback = async (
        requestId,
        comment,
        isInternal = false,
        userName,
        userRole
    ) => {
        try {
            const feedbackItem = {
                request_id: requestId,
                user_name: userName,
                user_role: userRole,
                comment,
                is_internal: isInternal,
            };

            const success = saveFeedback(feedbackItem);
            if (success) {
                // Reload feedback to get updated data with ID and timestamp
                const updatedFeedback = loadFeedback();
                setFeedback(updatedFeedback);
                return { success: true };
            } else {
                throw new Error("Failed to save feedback");
            }
        } catch (err) {
            setError("Failed to add feedback");
            console.error("Error adding feedback:", err);
            return { success: false, error: err.message };
        }
    };

    const getFeedbackForRequest = (requestId) => {
        return feedback.filter((f) => f.request_id === requestId);
    };

    const getPublicFeedback = (requestId) => {
        return feedback.filter(
            (f) => f.request_id === requestId && !f.is_internal
        );
    };

    const getInternalFeedback = (requestId) => {
        return feedback.filter(
            (f) => f.request_id === requestId && f.is_internal
        );
    };

    // Data export/import
    const exportAllData = () => {
        try {
            const data = exportData();
            const blob = new Blob([JSON.stringify(data, null, 2)], {
                type: "application/json",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `facilities-data-${
                new Date().toISOString().split("T")[0]
            }.json`;
            link.click();

            URL.revokeObjectURL(url);
            return { success: true };
        } catch (err) {
            setError("Failed to export data");
            console.error("Error exporting data:", err);
            return { success: false, error: err.message };
        }
    };

    const clearAllStorageData = async () => {
        try {
            const success = clearAllData();
            if (success) {
                // Reload initial data after clearing
                await loadInitialData();
                return { success: true };
            } else {
                throw new Error("Failed to clear data");
            }
        } catch (err) {
            setError("Failed to clear data");
            console.error("Error clearing data:", err);
            return { success: false, error: err.message };
        }
    };

    // Storage capacity and usage info
    const getStorageInfo = () => {
        try {
            const data = exportData();
            const dataString = JSON.stringify(data);
            const sizeInBytes = new Blob([dataString]).size;
            const sizeInKB = (sizeInBytes / 1024).toFixed(2);
            const sizeInMB = (sizeInKB / 1024).toFixed(2);

            // Rough estimate of localStorage usage
            let totalUsed = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalUsed += localStorage.getItem(key).length;
                }
            }
            const totalUsedKB = (totalUsed / 1024).toFixed(2);

            return {
                facilitiesDataSize: {
                    bytes: sizeInBytes,
                    kb: sizeInKB,
                    mb: sizeInMB,
                },
                totalStorageUsed: {
                    bytes: totalUsed,
                    kb: totalUsedKB,
                },
                itemCounts: {
                    requests: data.requests?.length || 0,
                    users: data.users?.length || 0,
                    feedback: data.feedback?.length || 0,
                },
            };
        } catch (err) {
            console.error("Error calculating storage info:", err);
            return null;
        }
    };

    // Backup and restore functionality
    const createBackup = () => {
        try {
            const data = exportData();
            const backupData = {
                ...data,
                backupVersion: "1.0",
                backupDate: new Date().toISOString(),
            };

            const blob = new Blob([JSON.stringify(backupData, null, 2)], {
                type: "application/json",
            });

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `facilities-backup-${new Date()
                .toISOString()
                .replace(/[:.]/g, "-")}.json`;
            link.click();

            URL.revokeObjectURL(url);
            return { success: true };
        } catch (err) {
            setError("Failed to create backup");
            console.error("Error creating backup:", err);
            return { success: false, error: err.message };
        }
    };

    const restoreFromBackup = async (file) => {
        try {
            setLoading(true);
            const text = await file.text();
            const backupData = JSON.parse(text);

            // Validate backup data structure
            if (!backupData.requests || !backupData.users) {
                throw new Error("Invalid backup file format");
            }

            // Save restored data
            const success = await Promise.all([
                saveSettings(backupData.settings || {}),
                // Additional restore operations would go here
            ]);

            if (success) {
                await loadInitialData();
                return { success: true };
            } else {
                throw new Error("Failed to restore some data");
            }
        } catch (err) {
            setError("Failed to restore backup");
            console.error("Error restoring backup:", err);
            return { success: false, error: err.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        // State
        settings,
        feedback,
        loading,
        error,

        // Settings
        updateSettings,
        resetSettings,
        getSetting,

        // Feedback
        addFeedback,
        getFeedbackForRequest,
        getPublicFeedback,
        getInternalFeedback,

        // Data management
        exportAllData,
        clearAllStorageData,
        getStorageInfo,
        createBackup,
        restoreFromBackup,

        // Actions
        refresh: loadInitialData,
        clearError: () => setError(null),
    };
};
