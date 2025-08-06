// data/requestTypes.js

export const REQUEST_TYPE_CONFIGS = {
    maintenance: {
        fields: [
            {
                name: "equipment_type",
                label: "Equipment Type",
                type: "select",
                options: [
                    "HVAC",
                    "Plumbing",
                    "Electrical",
                    "Furniture",
                    "Other",
                ],
            },
            {
                name: "issue_description",
                label: "Issue Description",
                type: "textarea",
                required: true,
            },
            {
                name: "urgency_reason",
                label: "Urgency Reason",
                type: "textarea",
            },
        ],
    },
    cleaning: {
        fields: [
            {
                name: "area_size",
                label: "Area Size",
                type: "select",
                options: [
                    "Small (< 100 sq ft)",
                    "Medium (100-500 sq ft)",
                    "Large (> 500 sq ft)",
                ],
            },
            {
                name: "cleaning_type",
                label: "Cleaning Type",
                type: "select",
                options: [
                    "Regular",
                    "Deep Clean",
                    "Carpet",
                    "Window",
                    "Post-Event",
                ],
            },
            {
                name: "special_requirements",
                label: "Special Requirements",
                type: "textarea",
            },
        ],
    },
    equipment: {
        fields: [
            {
                name: "equipment_category",
                label: "Equipment Category",
                type: "select",
                options: [
                    "IT Equipment",
                    "Office Furniture",
                    "Kitchen/Break Room",
                    "Safety Equipment",
                    "Other",
                ],
            },
            {
                name: "quantity",
                label: "Quantity",
                type: "number",
                required: true,
            },
            {
                name: "justification",
                label: "Business Justification",
                type: "textarea",
                required: true,
            },
        ],
    },
    room_setup: {
        fields: [
            {
                name: "event_type",
                label: "Event Type",
                type: "select",
                options: [
                    "Meeting",
                    "Training",
                    "Conference",
                    "Social Event",
                    "Other",
                ],
            },
            {
                name: "attendee_count",
                label: "Expected Attendees",
                type: "number",
                required: true,
            },
            {
                name: "setup_style",
                label: "Setup Style",
                type: "select",
                options: [
                    "Theater",
                    "Classroom",
                    "U-Shape",
                    "Boardroom",
                    "Reception",
                    "Custom",
                ],
            },
            {
                name: "av_requirements",
                label: "A/V Requirements",
                type: "textarea",
            },
        ],
    },
};
