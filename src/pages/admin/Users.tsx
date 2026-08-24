
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
import { useNavigate } from 'react-router-dom';


const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const PageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.toLocaleLowerCase(), 1000);
  const [UserList, setUserList] = useState<any[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<any>({});
  const { toast } = useToast();
  const navigate = useNavigate();


  const {
    loading: getUsersLoading,
    error: getUsersError,
    fetchData: getUsersApi,
  } = useApiService("POST");

  useEffect(() => {
    const loggedInUserObj = getLocalStorageUtils("loggedInUser");
    if (loggedInUserObj) {
      setLoggedInUser(loggedInUserObj.user);
    }
  }, []);


  const callgetUsersApi = async (searchQuery, pageNumber) => {
    const userListData = await getUsersApi(
      apiList.getUsers,
      {
        "searchQuery": searchQuery,
        "pageNumber": pageNumber,
        "pageSize": PageSize,
        "sortingColumn": "id",
        "sortingUser": "DESC"
      }
    );
    setCurrentPage(pageNumber);
    setTotalPages(Math.ceil(userListData.totalCount / PageSize));
    setTotalRecords(Math.ceil(userListData.totalCount));
    setUserList(userListData.userList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const goToProfile = async (user) => {
    navigate("/admin/userProfile", { state: { userObj: user } });
  };

  useEffect(() => {
    setCurrentPage(1);
    callgetUsersApi(debouncedSearchTerm, 1); // 1 = reset to first page
  }, [debouncedSearchTerm]);

  if (getUsersLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 bUser-b-2 bUser-blue-600"></div>
      </div>
    );
  }

  if (getUsersError) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading Users. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-2">Manage your platform Users</p>
        </div>

      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Users..."
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
         
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
             <span>  <b> Total Records:</b> {totalRecords}  </span>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>name</TableHead>
                  <TableHead>phone</TableHead>
                  <TableHead>address</TableHead>
                  <TableHead>email</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {UserList?.map((User: any, index) => (
                  // <TableRow key={User.id} className="hover:bg-gray-50">
                  <TableRow onClick={() => goToProfile(User)} key={index} className="hover:bg-gray-50 cursor-pointer">
                    <TableCell className="font-medium" >{User.name}</TableCell>
                    <TableCell>{User.phone}</TableCell>
                    <TableCell title={User.address}>
                      {truncateText(User.address, 15)}
                    </TableCell>
                    <TableCell>{User.email}</TableCell>

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
                      onClick={() => callgetUsersApi(searchTerm, Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {/* Leading Ellipsis */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => callgetUsersApi(searchTerm, 1)}
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
                          onClick={() => callgetUsersApi(searchTerm, page)}
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
                          onClick={() => callgetUsersApi(searchTerm, totalPages)}
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
                      onClick={() => callgetUsersApi(searchTerm, Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
          {totalPages == 0 && (
            <div className='mt-6 text-center'>
              No data found
            </div>
          )}
        </CardContent>
      </Card>
    </div >
  );
};

export default Users;


