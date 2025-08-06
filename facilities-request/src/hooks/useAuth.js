// hooks/useAuth.js
import { useState, useEffect, createContext, useContext } from "react";
import { loadUsers, saveUsers } from "../data/storage.js";
import {
    hasPermission,
    canViewRequest,
    canEditRequest,
    getUserPermissions,
} from "../utils/permissions.js";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [currentRole, setCurrentRole] = useState("employee");
    const [users, setUsers] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Initialize with mock authentication
        // In a real app, this would check for stored auth tokens
        initializeAuth();
        loadUserData();
    }, []);

    const initializeAuth = () => {
        // For demo purposes, create a mock current user
        const mockUser = {
            id: "current_user",
            name: "Demo User",
            email: "demo@company.com",
            role: currentRole,
            department: "Demo Department",
        };

        setCurrentUser(mockUser);
        setIsAuthenticated(true);
    };

    const loadUserData = () => {
        try {
            const userData = loadUsers();
            setUsers(userData);
        } catch (error) {
            console.error("Failed to load user data:", error);
        }
    };

    const switchRole = (newRole) => {
        setCurrentRole(newRole);
        if (currentUser) {
            const updatedUser = { ...currentUser, role: newRole };
            setCurrentUser(updatedUser);
        }
    };

    const login = async (email, password) => {
        // Mock login - in real app would validate credentials
        try {
            const user = users.find((u) => u.email === email);
            if (user) {
                setCurrentUser(user);
                setCurrentRole(user.role);
                setIsAuthenticated(true);
                return { success: true, user };
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error("Login failed:", error);
            return { success: false, error: error.message };
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setCurrentRole("employee");
        setIsAuthenticated(false);
    };

    const updateProfile = async (updates) => {
        try {
            if (!currentUser) {
                throw new Error("No user logged in");
            }

            const updatedUser = { ...currentUser, ...updates };
            const updatedUsers = users.map((u) =>
                u.id === currentUser.id ? updatedUser : u
            );

            const success = saveUsers(updatedUsers);
            if (success) {
                setCurrentUser(updatedUser);
                setUsers(updatedUsers);
                return { success: true, user: updatedUser };
            } else {
                throw new Error("Failed to save profile");
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            return { success: false, error: error.message };
        }
    };

    // Permission helpers that use current user context
    const checkPermission = (permission) => {
        return hasPermission(currentRole, permission);
    };

    const checkRequestAccess = (request, accessType = "view") => {
        if (!currentUser || !request) return false;

        switch (accessType) {
            case "view":
                return canViewRequest(currentRole, request, currentUser.id);
            case "edit":
                return canEditRequest(currentRole, request, currentUser.id);
            default:
                return false;
        }
    };

    const getUserByRole = (role) => {
        return users.filter((u) => u.role === role);
    };

    const getAllPermissions = () => {
        return getUserPermissions(currentRole);
    };

    const isManager = () => currentRole === "manager";
    const isFacilitiesStaff = () => currentRole === "facilities_staff";
    const isEmployee = () => currentRole === "employee";

    const value = {
        // User state
        currentUser,
        currentRole,
        users,
        isAuthenticated,

        // Auth actions
        login,
        logout,
        switchRole,
        updateProfile,

        // User management
        loadUserData,
        getUserByRole,

        // Permission helpers
        checkPermission,
        checkRequestAccess,
        getAllPermissions,

        // Role helpers
        isManager,
        isFacilitiesStaff,
        isEmployee,

        // User info
        userId: currentUser?.id,
        userName: currentUser?.name,
        userEmail: currentUser?.email,
        userDepartment: currentUser?.department,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
