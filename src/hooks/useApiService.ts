import { useState, useEffect } from 'react';
import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from '../utils/apiListUtils';
import { getLocalStorageUtils, sleepForSecondsUtils } from '@/utils/appUtils';
import { useNavigate } from 'react-router-dom';


const useApiService = (
    method: 'GET' | 'POST',
    isToken: boolean = false,
    baseUrl: string = apiBaseUrl,
) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = (url: string, body?: any, isSendLoggedInUserId: boolean = false, selectedListIndex: number | null = null): Promise<any> => {
        return new Promise(async (resolve, reject) => {
            if (isSendLoggedInUserId) {
                const loggedInUser = getLocalStorageUtils("loggedInUser");
                if (!loggedInUser) {
                    navigate("login");
                }
                if (loggedInUser?.user?.id) {
                    body.userId = loggedInUser?.user?.id;
                }
            }
            if (selectedListIndex != null) {
                setLoadingIndex(selectedListIndex);
            }
            setLoading(true);
            setError(null);

            const headers: AxiosRequestConfig['headers'] = {};
             headers['Content-Type'] = "application/json";
            if (isToken) {
                const loggedInUser = getLocalStorageUtils("loggedInUser");
                if (loggedInUser && loggedInUser.access_token) {
                    headers['Authorization'] = `Bearer ${loggedInUser.access_token}`;
                }
                else {
                    navigate("/login");
                }
            }

            try {
                // const url2 = new URL(url);
                // if(method == "GET" && body ){
                //     Object.keys(body).forEach(key => url2.searchParams.append(key, body[key]));
                // }

                const response = await axios({
                    method,
                    url: `${baseUrl}${url}`,
                    data: body,
                    headers,
                });
                // console.log("uhuhu")
                // await sleepForSecondsUtils(10);

                if (response.data.isError) {
                    setError(response.data.message);
                }
                const responseData = response.data.data;
                setLoading(false);
                if (selectedListIndex != null) {
                    setLoadingIndex(null);
                }
                resolve(responseData);

                // if (response.data.isError) {
                //     setError(response.data.message);
                //     reject(response.data.message);
                // } else {
                //     resolve(responseData);
                // }
            } catch (err: any) {

                const errorMessage = 'Error with API call';
                setError(errorMessage);
                setLoading(false);
                if (selectedListIndex != null) {
                    setLoadingIndex(null);
                }
                if (err.status == 401) {
                    alert("Your last token is expired , Kindly Login again")
                    navigate("/login");
                }
                reject(errorMessage);
            } finally {
                // setLoading(false);
            }
        });
    };

    // return { data, loading, error, fetchData };
    return { loading, error, loadingIndex, fetchData };
};


export default useApiService;
