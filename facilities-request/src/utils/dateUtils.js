// utils/dateUtils.js

export const formatDate = (dateString, options = {}) => {
    const defaultOptions = {
        year: "numeric",
        month: "short",
        day: "numeric",
        ...options,
    };

    try {
        return new Date(dateString).toLocaleDateString("en-US", defaultOptions);
    } catch (error) {
        console.error("Error formatting date:", error);
        return "Invalid Date";
    }
};

export const formatDateTime = (dateString) => {
    try {
        return new Date(dateString).toLocaleString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch (error) {
        console.error("Error formatting date time:", error);
        return "Invalid Date";
    }
};

export const formatTime = (dateString) => {
    try {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    } catch (error) {
        console.error("Error formatting time:", error);
        return "Invalid Time";
    }
};

export const getRelativeTime = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return "Just now";
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffHours < 24)
            return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
        if (diffDays < 7)
            return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;

        return formatDate(dateString);
    } catch (error) {
        console.error("Error calculating relative time:", error);
        return "Unknown time";
    }
};

export const isOverdue = (dateString, daysThreshold = 7) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffDays = (now - date) / (1000 * 60 * 60 * 24);
        return diffDays > daysThreshold;
    } catch (error) {
        console.error("Error checking overdue status:", error);
        return false;
    }
};

export const getDaysOld = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
        console.error("Error calculating days old:", error);
        return 0;
    }
};

export const isToday = (dateString) => {
    try {
        const date = new Date(dateString);
        const today = new Date();
        return date.toDateString() === today.toDateString();
    } catch (error) {
        console.error("Error checking if date is today:", error);
        return false;
    }
};

export const isThisWeek = (dateString) => {
    try {
        const date = new Date(dateString);
        const now = new Date();
        const weekStart = new Date(now.setDate(now.getDate() - now.getDay()));
        const weekEnd = new Date(now.setDate(now.getDate() - now.getDay() + 6));

        return date >= weekStart && date <= weekEnd;
    } catch (error) {
        console.error("Error checking if date is this week:", error);
        return false;
    }
};

export const addDays = (dateString, days) => {
    try {
        const date = new Date(dateString);
        date.setDate(date.getDate() + days);
        return date.toISOString();
    } catch (error) {
        console.error("Error adding days to date:", error);
        return dateString;
    }
};

export const getWeekRange = (date = new Date()) => {
    try {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        startOfWeek.setHours(0, 0, 0, 0);

        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        return {
            start: startOfWeek.toISOString(),
            end: endOfWeek.toISOString(),
        };
    } catch (error) {
        console.error("Error calculating week range:", error);
        return {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
        };
    }
};

export const getMonthRange = (date = new Date()) => {
    try {
        const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
        const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
        endOfMonth.setHours(23, 59, 59, 999);

        return {
            start: startOfMonth.toISOString(),
            end: endOfMonth.toISOString(),
        };
    } catch (error) {
        console.error("Error calculating month range:", error);
        return {
            start: new Date().toISOString(),
            end: new Date().toISOString(),
        };
    }
};
