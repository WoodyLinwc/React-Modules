// data/mockData.js
export const MOCK_REQUESTS = [
    {
        id: "1",
        title: "Fix broken air conditioning in Conference Room A",
        request_type: "maintenance",
        priority: "high",
        status: "in_progress",
        location: "Building 1, Floor 2, Conference Room A",
        requested_by: "John Smith",
        created_at: "2025-01-15T10:30:00Z",
        updated_at: "2025-01-16T14:20:00Z",
        created_by: "employee",
        equipment_type: "HVAC",
        issue_description:
            "Air conditioning unit is not cooling properly. Room temperature is consistently 78°F.",
        urgency_reason: "Important client meeting scheduled for tomorrow",
    },
    {
        id: "2",
        title: "Deep cleaning for main lobby",
        request_type: "cleaning",
        priority: "medium",
        status: "new",
        location: "Building 1, Ground Floor, Main Lobby",
        requested_by: "Sarah Johnson",
        created_at: "2025-01-16T09:15:00Z",
        updated_at: "2025-01-16T09:15:00Z",
        created_by: "manager",
        area_size: "Large (> 500 sq ft)",
        cleaning_type: "Deep Clean",
        special_requirements: "Please schedule after business hours",
    },
    {
        id: "3",
        title: "Request new standing desks for development team",
        request_type: "equipment",
        priority: "low",
        status: "completed",
        location: "Building 2, Floor 3, Development Wing",
        requested_by: "Mike Chen",
        created_at: "2025-01-10T08:00:00Z",
        updated_at: "2025-01-14T16:30:00Z",
        created_by: "facilities_staff",
        equipment_category: "Office Furniture",
        quantity: "6",
        justification:
            "Ergonomic improvement to reduce back strain complaints from team members",
    },
];

export const MOCK_USERS = [
    {
        id: "1",
        name: "John Smith",
        role: "employee",
        department: "Sales",
    },
    {
        id: "2",
        name: "Sarah Johnson",
        role: "manager",
        department: "Operations",
    },
    {
        id: "3",
        name: "Mike Chen",
        role: "facilities_staff",
        department: "Facilities",
    },
];
