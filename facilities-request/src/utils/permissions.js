// utils/permissions.js

export const PERMISSIONS = {
    // Request management
    CREATE_REQUEST: "create_request",
    VIEW_ALL_REQUESTS: "view_all_requests",
    VIEW_OWN_REQUESTS: "view_own_requests",
    EDIT_REQUEST: "edit_request",
    DELETE_REQUEST: "delete_request",
    CHANGE_STATUS: "change_status",
    ASSIGN_REQUEST: "assign_request",

    // Advanced features
    EXPORT_REPORTS: "export_reports",
    MANAGE_USERS: "manage_users",
    VIEW_ANALYTICS: "view_analytics",
    MANAGE_SETTINGS: "manage_settings",

    // Comments and feedback
    ADD_COMMENTS: "add_comments",
    VIEW_INTERNAL_COMMENTS: "view_internal_comments",
    DELETE_COMMENTS: "delete_comments",

    // File management
    UPLOAD_FILES: "upload_files",
    DELETE_FILES: "delete_files",
};

export const ROLE_PERMISSIONS = {
    employee: [
        PERMISSIONS.CREATE_REQUEST,
        PERMISSIONS.VIEW_OWN_REQUESTS,
        PERMISSIONS.ADD_COMMENTS,
        PERMISSIONS.UPLOAD_FILES,
    ],

    facilities_staff: [
        PERMISSIONS.CREATE_REQUEST,
        PERMISSIONS.VIEW_ALL_REQUESTS,
        PERMISSIONS.VIEW_OWN_REQUESTS,
        PERMISSIONS.EDIT_REQUEST,
        PERMISSIONS.CHANGE_STATUS,
        PERMISSIONS.ASSIGN_REQUEST,
        PERMISSIONS.ADD_COMMENTS,
        PERMISSIONS.VIEW_INTERNAL_COMMENTS,
        PERMISSIONS.EXPORT_REPORTS,
        PERMISSIONS.UPLOAD_FILES,
        PERMISSIONS.DELETE_FILES,
    ],

    manager: [
        PERMISSIONS.CREATE_REQUEST,
        PERMISSIONS.VIEW_ALL_REQUESTS,
        PERMISSIONS.VIEW_OWN_REQUESTS,
        PERMISSIONS.EDIT_REQUEST,
        PERMISSIONS.DELETE_REQUEST,
        PERMISSIONS.CHANGE_STATUS,
        PERMISSIONS.ASSIGN_REQUEST,
        PERMISSIONS.ADD_COMMENTS,
        PERMISSIONS.VIEW_INTERNAL_COMMENTS,
        PERMISSIONS.DELETE_COMMENTS,
        PERMISSIONS.EXPORT_REPORTS,
        PERMISSIONS.VIEW_ANALYTICS,
        PERMISSIONS.MANAGE_USERS,
        PERMISSIONS.MANAGE_SETTINGS,
        PERMISSIONS.UPLOAD_FILES,
        PERMISSIONS.DELETE_FILES,
    ],
};

export const hasPermission = (userRole, permission) => {
    const rolePermissions = ROLE_PERMISSIONS[userRole] || [];
    return rolePermissions.includes(permission);
};

export const getUserPermissions = (userRole) => {
    return ROLE_PERMISSIONS[userRole] || [];
};

export const canViewRequest = (userRole, request, currentUserId) => {
    if (hasPermission(userRole, PERMISSIONS.VIEW_ALL_REQUESTS)) {
        return true;
    }

    if (hasPermission(userRole, PERMISSIONS.VIEW_OWN_REQUESTS)) {
        return (
            request.created_by === currentUserId ||
            request.requested_by === currentUserId
        );
    }

    return false;
};

export const canEditRequest = (userRole, request, currentUserId) => {
    if (!hasPermission(userRole, PERMISSIONS.EDIT_REQUEST)) {
        return false;
    }

    // Managers and facilities staff can edit any request
    if (userRole === "manager" || userRole === "facilities_staff") {
        return true;
    }

    // Employees can only edit their own requests and only if status is 'new'
    return request.created_by === currentUserId && request.status === "new";
};

export const canDeleteRequest = (userRole, request, currentUserId) => {
    if (!hasPermission(userRole, PERMISSIONS.DELETE_REQUEST)) {
        return false;
    }

    // Only managers can delete requests
    if (userRole === "manager") {
        return true;
    }

    return false;
};

export const canChangeStatus = (userRole, fromStatus, toStatus) => {
    if (!hasPermission(userRole, PERMISSIONS.CHANGE_STATUS)) {
        return false;
    }

    // Define valid status transitions by role
    const statusTransitions = {
        facilities_staff: {
            new: ["in_progress", "on_hold"],
            in_progress: ["completed", "on_hold"],
            on_hold: ["in_progress", "completed"],
            completed: ["closed"],
        },
        manager: {
            new: ["in_progress", "on_hold", "closed"],
            in_progress: ["completed", "on_hold", "closed"],
            on_hold: ["in_progress", "completed", "closed"],
            completed: ["closed", "in_progress"], // Can reopen if needed
            closed: ["in_progress"], // Can reopen closed requests
        },
    };

    const allowedTransitions = statusTransitions[userRole];
    if (!allowedTransitions || !allowedTransitions[fromStatus]) {
        return false;
    }

    return allowedTransitions[fromStatus].includes(toStatus);
};

export const getAvailableStatusTransitions = (userRole, currentStatus) => {
    if (!hasPermission(userRole, PERMISSIONS.CHANGE_STATUS)) {
        return [];
    }

    const statusTransitions = {
        facilities_staff: {
            new: ["in_progress", "on_hold"],
            in_progress: ["completed", "on_hold"],
            on_hold: ["in_progress", "completed"],
            completed: ["closed"],
        },
        manager: {
            new: ["in_progress", "on_hold", "closed"],
            in_progress: ["completed", "on_hold", "closed"],
            on_hold: ["in_progress", "completed", "closed"],
            completed: ["closed", "in_progress"],
            closed: ["in_progress"],
        },
    };

    const allowedTransitions = statusTransitions[userRole];
    return allowedTransitions ? allowedTransitions[currentStatus] || [] : [];
};

export const canAddComment = (userRole, request, currentUserId) => {
    if (!hasPermission(userRole, PERMISSIONS.ADD_COMMENTS)) {
        return false;
    }

    // Can comment if user can view the request
    return canViewRequest(userRole, request, currentUserId);
};

export const canViewInternalComments = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.VIEW_INTERNAL_COMMENTS);
};

export const canDeleteComment = (userRole, comment, currentUserId) => {
    if (!hasPermission(userRole, PERMISSIONS.DELETE_COMMENTS)) {
        return false;
    }

    // Managers can delete any comment, others can only delete their own
    if (userRole === "manager") {
        return true;
    }

    return comment.user_id === currentUserId;
};

export const canAssignRequest = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.ASSIGN_REQUEST);
};

export const canExportReports = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.EXPORT_REPORTS);
};

export const canViewAnalytics = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.VIEW_ANALYTICS);
};

export const canManageUsers = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.MANAGE_USERS);
};

export const canManageSettings = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.MANAGE_SETTINGS);
};

export const canUploadFiles = (userRole) => {
    return hasPermission(userRole, PERMISSIONS.UPLOAD_FILES);
};

export const canDeleteFiles = (userRole, file, currentUserId) => {
    if (!hasPermission(userRole, PERMISSIONS.DELETE_FILES)) {
        return false;
    }

    // Managers and facilities staff can delete any file
    if (userRole === "manager" || userRole === "facilities_staff") {
        return true;
    }

    // Users can delete their own files
    return file.uploaded_by === currentUserId;
};

// Helper function to get permission description
export const getPermissionDescription = (permission) => {
    const descriptions = {
        [PERMISSIONS.CREATE_REQUEST]: "Create new facility requests",
        [PERMISSIONS.VIEW_ALL_REQUESTS]: "View all requests in the system",
        [PERMISSIONS.VIEW_OWN_REQUESTS]: "View own created requests",
        [PERMISSIONS.EDIT_REQUEST]: "Edit request details",
        [PERMISSIONS.DELETE_REQUEST]: "Delete requests",
        [PERMISSIONS.CHANGE_STATUS]: "Change request status",
        [PERMISSIONS.ASSIGN_REQUEST]: "Assign requests to staff members",
        [PERMISSIONS.EXPORT_REPORTS]: "Export reports and analytics",
        [PERMISSIONS.MANAGE_USERS]: "Manage user accounts and roles",
        [PERMISSIONS.VIEW_ANALYTICS]: "View system analytics and metrics",
        [PERMISSIONS.MANAGE_SETTINGS]: "Manage system settings",
        [PERMISSIONS.ADD_COMMENTS]: "Add comments to requests",
        [PERMISSIONS.VIEW_INTERNAL_COMMENTS]: "View internal staff comments",
        [PERMISSIONS.DELETE_COMMENTS]: "Delete comments",
        [PERMISSIONS.UPLOAD_FILES]: "Upload files and attachments",
        [PERMISSIONS.DELETE_FILES]: "Delete files and attachments",
    };

    return descriptions[permission] || "Unknown permission";
};
