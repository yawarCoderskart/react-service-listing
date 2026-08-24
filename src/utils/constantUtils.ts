
// export const DEFAULT_DEV_MODE = "local";
export const DEFAULT_DEV_MODE = "live";

export const DEV_MODES = {
    "local": {
        // webBaseUrl: "http://localhost:5173",
        apiBaseUrl: "http://ci4:8088/api/",
        imagesFolderPath: "/public/",
    },
    "live": {
        // webBaseUrl: "https://service-pro.infinityfreeapp.com/",
        apiBaseUrl: "https://service-docs.great-site.net/api/",
        // apiBaseUrl: "solutiondocument.unaux.com/api/",
        // apiBaseUrl: "http://ec2-52-55-41-11.compute-1.amazonaws.com:8088/api/",
        // apiBaseUrl: "http://ci4:8088/api/",
        imagesFolderPath: "./",
    },
};



export const fileTypes: any = {
    textFileTypes: ".pdf,.txt,.docx,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    allFiles: "*/*"
};

export const STRIPE_ENV: any = {
    // testing
    // STRIPE_PUBLISHABLE_KEY: "xxx",
    // STRIPE_PRICING_TABLE_ID:"cc"
};

export const DEFAULT_SERVICE_TYPE: any = {
    ID: 1,
    TITLE: "Default"
};

export const USER_TYPE: any = {
    ADMIN: "admin",
    CUSTOMER: "customer"
};

export const ORDER_STATUS: any = {
    REQUESTED: "Requested",
    IN_PROGRESS: "In Progress",
    COMPLETED: "Completed"
};

export const ORDER_STATUS_ARRAY: any = [
    ORDER_STATUS.REQUESTED,
    ORDER_STATUS.IN_PROGRESS,
    ORDER_STATUS.COMPLETED
];
