import { DEFAULT_DEV_MODE, DEV_MODES } from "./constantUtils";

export const apiBaseUrl = DEV_MODES[DEFAULT_DEV_MODE].apiBaseUrl;
// export const apiBaseUrl =  import.meta.env.API_BASE_URL;
export const apiList: any = {
    editUser: "user/editUser",
    login: "user/login",
    register: "user/register",
    isEmailExist: "user/isEmailExist",
    getUserById: "user/getUserById",
    getUsers: "user/getUsers",

    getServices: "services/getServices",
    addEditService: "services/addEditService",

    addOrder: "order/addOrder",
    getOrders: "order/getOrders",
    updateOrder: "order/updateOrder",
    
    getContactUsList: "contact_us/getContactUsList",
    addContactUsInfo: "contact_us/addContactUsInfo",
   
};
