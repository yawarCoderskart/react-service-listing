
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiList } from '@/utils/apiListUtils';
import { getLocalStorageUtils, truncateText } from '@/utils/appUtils';
import { useDebounce } from '@/utils/appHooksUtils';
import useApiService from '@/hooks/useApiService';
import { ORDER_STATUS, ORDER_STATUS_ARRAY, USER_TYPE } from '@/utils/constantUtils';
import { useNavigate } from 'react-router-dom';


const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isPaid, setIsPaid] = useState(null);
  const [status, setStatus] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const PageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.toLocaleLowerCase(), 1000);
  const [OrderList, setOrderList] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    loading: getUserByIdLoading,
    error: getUserByIdError,
    fetchData: getUserByIdApi,
  } = useApiService("POST");

  const {
    loading: getOrdersLoading,
    error: getOrdersError,
    fetchData: getOrdersApi,
  } = useApiService("POST");

  const {
    loading: updateOrderLoading,
    error: updateOrderError,
    fetchData: updateOrderApi,
  } = useApiService("POST");


  const updateOrder = async (order, status = null, isPaid = null) => {
    const isOrderUpdated = await updateOrderApi(
      apiList.updateOrder,
      {
        "id": order.id,
        "status": (status != null ? status : undefined),
        "isPaid": (isPaid != null ? isPaid : undefined),
      }
    );
    if (isOrderUpdated) {
      toast({
        title: "Order Updated Successfully!",
        duration: 3000
      });
    }
  };

  const callgetOrdersApi = async (searchQuery, pageNumber, status = null, isPaid = null, loggedInUserInfo = loggedInUser) => {
    let reqObj: any = {
      "searchQuery": searchQuery,
      "pageNumber": pageNumber,
      "pageSize": PageSize,
      "sortingColumn": "id",
      "sortingOrder": "DESC"
    };

    if (loggedInUserInfo.userType != USER_TYPE.ADMIN) {
      reqObj.userId = loggedInUserInfo.id;
    }
    if (status != null) {
      reqObj.status = status;
    }
    if (isPaid != null) {
      reqObj.isPaid = isPaid;
    }
    const orderlistData = await getOrdersApi(
      apiList.getOrders,
      reqObj
    );
    setCurrentPage(pageNumber);
    setTotalPages(Math.ceil(orderlistData.totalCount / PageSize));
    setTotalRecords(Math.ceil(orderlistData.totalCount));
    setOrderList(orderlistData.orderList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  const goToProfile = async (userId) => {
    const userObj = await getUserByIdApi(
      apiList.getUserById,
      {
        "userId": userId
      }
    );
    if (userObj) {
      navigate("/admin/userProfile", { state: { userObj: userObj } });
    }
    else {
      toast({
        title: "User not found!",
        duration: 3000
      });
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    if (loggedInUserObj) {
      setLoggedInUser(loggedInUserObj.user);
    }
    setTimeout(() => {
      callgetOrdersApi(debouncedSearchTerm, 1, status, isPaid, loggedInUserObj.user); // 1 = reset to first page
    }, 1000);
  }, [debouncedSearchTerm]);

  if (getOrdersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (getOrdersError) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading Orders. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600 mt-2">Manage your platform Orders</p>
        </div>

      </div>

      <Card>
        <CardHeader>
          <div className="mb-2 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Orders..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            {/* <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div> */}
          </div>
          <div className=" flex flex-col md:flex-row gap-4 items-center justify-between">

            <div className="relative w-full">
              <label
                htmlFor="order-status-select"
                className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500 z-10"
              >
                Order Status
              </label>
              <Select
                onValueChange={(selectedValue) => {
                  setStatus(selectedValue);
                  callgetOrdersApi(debouncedSearchTerm, 1, selectedValue, isPaid);
                }}
                defaultValue={status}
              >
                <SelectTrigger
                  id="order-status-select"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem key={ORDER_STATUS_ARRAY.length} value={null}>
                    {"All"}
                  </SelectItem>
                  {ORDER_STATUS_ARRAY.map((orderStatus, index) => (
                    <SelectItem key={index} value={orderStatus}>
                      {orderStatus}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="relative w-full">
              <label
                htmlFor="paid-flag-select"
                className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500 z-10"
              >
                Paid Flag
              </label>
              <Select
                onValueChange={(selectedValue) => {
                  if(selectedValue != null){
                    setIsPaid(selectedValue === 'true' ? 1 : 0);
                  }
                  else{
                    setIsPaid(null);
                  }
                  callgetOrdersApi(debouncedSearchTerm, 1, status, (selectedValue == null ? null : ( selectedValue === 'true' ? 1 : 0)))
                }}
                defaultValue={ ( isPaid == null ? null :  ( isPaid ? 'true' : 'false') ) }
              >
                <SelectTrigger id="paid-flag-select"
                  className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <SelectValue placeholder="paid or unpaid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>
                    {"All"}
                  </SelectItem>
                  <SelectItem value="true">Paid</SelectItem>
                  <SelectItem value="false">Unpaid</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {getOrdersLoading}
            <span>  <b> Total Records:</b> {totalRecords}  </span>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>status</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Order on</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {OrderList?.map((Order: any, index) => (
                  // <TableRow key={Order.id} className="hover:bg-gray-50">
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium cursor-pointer" onClick={() => goToProfile(Order.userId)}>{Order.userName}</TableCell>
                    <TableCell>{Order.serviceTitle}</TableCell>
                    <TableCell>{Order.price}</TableCell>
                    <TableCell>
                      {loggedInUser.userType == USER_TYPE.ADMIN ?
                        (<Select
                          onValueChange={(selectedValue) => updateOrder(Order, selectedValue)}
                          defaultValue={Order.status}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a description" />
                          </SelectTrigger>
                          <SelectContent>
                            {ORDER_STATUS_ARRAY.map((orderStatus, index) => (
                              <SelectItem key={index} value={orderStatus}>
                                {orderStatus}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>)
                        :
                        (
                          <span>
                            {Order.status}
                          </span>
                        )}
                      {updateOrderLoading ?
                        (
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        )
                        : ""
                      }



                    </TableCell>
                    <TableCell>
                      {loggedInUser.userType == USER_TYPE.ADMIN ?
                        (
                          <Select
                            onValueChange={(selectedValue) => updateOrder(Order, null, selectedValue === 'true')}
                            defaultValue={Order.isPaid ? 'true' : 'false'}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Mark as paid or unpaid" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="true">Paid</SelectItem>
                              <SelectItem value="false">Unpaid</SelectItem>
                            </SelectContent>
                          </Select>
                        )
                        :
                        (
                          <span className={` ${Order.isPaid
                            ? ' text-green-800'
                            : ' text-yellow-800'}`}>
                            {(Order.isPaid ? " Paid" : "UnPaid")}
                          </span>
                        )
                      }
                    </TableCell>
                    <TableCell >
                      {new Date(Order.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell title={Order.msg}>
                      {truncateText(Order.msg, 15)}
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 ml-6">
              Page {currentPage} of {totalPages}
              <Pagination>
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => callgetOrdersApi(searchTerm, Math.max(1, currentPage - 1), status, isPaid)}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {/* Leading Ellipsis */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => callgetOrdersApi(searchTerm, 1, status, isPaid)}
                          className="cursor-pointer"
                        >
                          1
                        </PaginationLink>
                      </PaginationItem>
                      <PaginationItem>
                        <span className="px-2 text-gray-500">...</span>
                      </PaginationItem>
                    </>
                  )}

                  {/* Page Numbers Around Current Page */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page =>
                      totalPages <= 5 ||
                      (page >= currentPage - 2 && page <= currentPage + 2)
                    )
                    .map(page => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => callgetOrdersApi(searchTerm, page, status, isPaid)}
                          isActive={currentPage === page}
                          className="cursor-pointer"
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                  {/* Trailing Ellipsis */}
                  {currentPage < totalPages - 2 && (
                    <>
                      <PaginationItem>
                        <span className="px-2 text-gray-500">...</span>
                      </PaginationItem>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => callgetOrdersApi(searchTerm, totalPages, status, isPaid)}
                          className="cursor-pointer"
                        >
                          {totalPages}
                        </PaginationLink>
                      </PaginationItem>
                    </>
                  )}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => callgetOrdersApi(searchTerm, Math.min(totalPages, currentPage + 1, status, isPaid))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          {/* {totalPages == 0 && !getOrdersLoading && (
            <div className='mt-6 text-center'>
              No data found
            </div>
          )} */}

          {getOrdersLoading &&
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          }
  
        </CardContent>
      </Card>
    </div >
  );
};

export default Orders;


