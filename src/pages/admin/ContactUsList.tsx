
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

import { useToast } from "@/hooks/use-toast";
import { apiList } from '@/utils/apiListUtils';
import { useDebounce } from '@/utils/appHooksUtils';
import useApiService from '@/hooks/useApiService';
import { useNavigate } from 'react-router-dom';

const ContactUsList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const PageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.toLocaleLowerCase(), 1000);
  const [ContactUsList, setContactUsList] = useState<any[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();

  const {
    loading: getContactUsListLoading,
    error: getContactUsListError,
    fetchData: getContactUsListApi,
  } = useApiService("POST");
  

  const callgetContactUsListApi = async (searchQuery, pageNumber) => {
    const apiRes = await getContactUsListApi(
      apiList.getContactUsList,
      {
        "searchQuery": searchQuery,
        "pageNumber": pageNumber,
        "pageSize": PageSize,
        "sortingColumn": "id",
        "sortingOrder": "DESC"
      }
    );
    setCurrentPage(pageNumber);
    setTotalPages(Math.ceil(apiRes.totalCount / PageSize));
    setTotalRecords(Math.ceil(apiRes.totalCount));
    setContactUsList(apiRes.contactUsList);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setCurrentPage(1);
    callgetContactUsListApi(debouncedSearchTerm, 1); // 1 = reset to first page
  }, [debouncedSearchTerm]);

  if (getContactUsListLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 bUser-b-2 bUser-blue-600"></div>
      </div>
    );
  }

  if (getContactUsListError) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading Contact Us. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Us List</h1>
          <p className="text-gray-600 mt-2">Manage your platform Contact Us Queries</p>
        </div>

      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Contact Us..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />

            </div>

          </div>

        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <span>  <b> Total Records:</b> {totalRecords}  </span>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>name</TableHead>
                  <TableHead>email</TableHead>
                  <TableHead>subject</TableHead>
                  <TableHead>message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ContactUsList?.map((item: any, index) => (
                  // <TableRow key={item.id} className="hover:bg-gray-50">
                  <TableRow  key={index} className="hover:bg-gray-50 cursor-pointer">
                    <TableCell className="font-medium" >{item.name}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.subject}</TableCell>
                    <TableCell >
                      {item.msg}
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
                      onClick={() => callgetContactUsListApi(searchTerm, Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {/* Leading Ellipsis */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => callgetContactUsListApi(searchTerm, 1)}
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
                          onClick={() => callgetContactUsListApi(searchTerm, page)}
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
                          onClick={() => callgetContactUsListApi(searchTerm, totalPages)}
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
                      onClick={() => callgetContactUsListApi(searchTerm, Math.min(totalPages, currentPage + 1))}
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


export default ContactUsList;
