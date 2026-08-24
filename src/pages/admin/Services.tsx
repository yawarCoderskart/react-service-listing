
import React, { useState, useEffect } from 'react';
import { FieldValues, useFieldArray } from "react-hook-form";
import { Search, Filter, Plus, Edit, Trash } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import useApiService from '@/hooks/useApiService';
import { apiList } from '@/utils/apiListUtils';
import { truncateText } from '@/utils/appUtils';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_SERVICE_TYPE } from '@/utils/constantUtils';
import { useDebounce } from '@/utils/appHooksUtils';


export const ModuleSchema = z.object({
  id: z.number().nullable(),
  title: z.string().min(2, "Title must be at least 2 characters"),
  imageUrl: z.string(),
  description: z.string(),
  serviceTypeId: z.number(),
  serviceTypeTitle: z.string(),
  price: z.number(),
  flgDelete: z.boolean(),
  // features: z.array(z.string().min(1, "Feature cannot be empty")).max(5, "You can add up to 5 features only").nullable()
  features: z.array(z.string()).max(5, "You can add up to 5 features only")
});

export type ModuleType = z.infer<typeof ModuleSchema>;

const moduleDefaultValues: ModuleType = {
  id: null,
  title: "",
  imageUrl: "",
  description: "",
  serviceTypeId: DEFAULT_SERVICE_TYPE.ID,
  serviceTypeTitle: DEFAULT_SERVICE_TYPE.TITLE,
  price: 0,
  flgDelete: false,
  features: []
};


const Services = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const PageSize = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm.toLocaleLowerCase(), 1000);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [ServiceList, setServiceList] = useState<any[]>([]);
  const { toast } = useToast();
  const ModuleName = "Service";
 
  const form = useForm<ModuleType & FieldValues>({
    resolver: zodResolver(ModuleSchema),
    defaultValues: moduleDefaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const {
    loading: isGetServiceListLoading,
    error: errorGetServiceList,
    fetchData: getServicesApi,
  } = useApiService("POST");
  const {
    loading: isAddEditServiceLoading,
    error: errorAddEditService,
    fetchData: addEditServiceApi,
  } = useApiService("POST", true);

  const callgetServicesApi = async (searchQuery, pageNumber) => {
    const servicelistData = await getServicesApi(
      apiList.getServices,
      {
        "searchQuery": searchQuery,
        "pageNumber": pageNumber,
        "pageSize": PageSize,
        "sortingColumn": "id",
        "sortingOrder": "DESC"
      }
    );
    // if(servicelistData.ServiceList){
    setCurrentPage(pageNumber);
    setTotalPages(Math.ceil(servicelistData.totalCount / PageSize));
    setTotalRecords(Math.ceil(servicelistData.totalCount));
    setServiceList(servicelistData.serviceList);
    // }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Call API first time and when user stops typing
  useEffect(() => {
    // Don't call API on first render or when search is empty
    // if (debouncedSearchTerm.trim() !== '') {
    setCurrentPage(1);
    callgetServicesApi(debouncedSearchTerm, 1); // 1 = reset to first page
    // }
  }, [debouncedSearchTerm]);


  const handleAddEdit = async (ServiceObj, flgDelete = false) => {
    if (ServiceObj) {
      ServiceObj.flgDelete = flgDelete;
    }
    const editedServiceObj = await addEditServiceApi(
      apiList.addEditService,
      ServiceObj
    );
    callgetServicesApi(searchTerm, (ServiceObj.id ? currentPage : 1));

    // setServiceList(prevList => {
    //   const index = prevList.findIndex(service => service.id === editedServiceObj.id);

    //   if (index !== -1) {
    //     // Replace existing item
    //     const updatedList = [...prevList];
    //     updatedList[index] = editedServiceObj;
    //     return updatedList;
    //   } else {
    //     // Add new item
    //     return [...prevList, editedServiceObj];
    //   }
    // });
    toast({
      title: "Service Updated Successfully!",
      description: `${ServiceObj.title} has been added to the system.`,
      duration: 3000
    });

    form.reset(moduleDefaultValues);
    setIsSheetOpen(false);
  };

  const onSubmit = (data: ModuleType) => {
    handleAddEdit(data);
  };
  const onError = (errors: any) => {
  console.log("Validation errors:", errors);
};

// useEffect(() => {
//   console.log("Form errors:", form.formState.errors);
//   console.log("Is valid?", form.formState.isValid);
// }, [form.formState.errors, form.formState.isValid]);

  if (isGetServiceListLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (errorGetServiceList) {
    return (
      <div className="text-center text-red-600 p-4">
        Error loading Services. Please try again.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Services Management</h1>
          <p className="text-gray-600 mt-2">Manage your platform Services</p>
        </div>
        <Sheet open={isSheetOpen} onOpenChange={(open) => {
          form.reset(moduleDefaultValues);
          setIsSheetOpen(open);
        }} >
          <SheetTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90">
              <Plus className="h-4 w-4 mr-2" />
              Add {ModuleName}
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px] flex flex-col">
            <SheetHeader>
              <SheetTitle>  {!form.watch('id') ? 'Add' : 'Edit'} New {ModuleName}</SheetTitle>
              <SheetDescription>
                Enter the {ModuleName} details below to add them to the system.
              </SheetDescription>
            </SheetHeader>

            <Form {...form} >
              <form onSubmit={form.handleSubmit(onSubmit, onError)} className="flex flex-col flex-1 overflow-hidden">
                {/* Scrollable content */}
                <div className="flex-1 overflow-y-auto px-2 space-y-4 mt-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title *</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter Title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Price"
                            type="number"
                            {...field}
                            onChange={e => field.onChange(e.target.value === "" ? undefined : Number(e.target.value))}
                            value={field.value ?? ""}
                          />
                          {/* <Input placeholder="Enter Price" type="number" {...field} /> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          {/* <Input placeholder="Enter Description"  {...field} /> */}
                          <Textarea placeholder="Enter Description" {...field} />
                          {/* <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a description" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="option1">Option 1</SelectItem>
                            <SelectItem value="option2">Option 2</SelectItem>
                            <SelectItem value="option3">Option 3</SelectItem>
                          </SelectContent>
                        </Select> */}
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />


                  <div className="space-y-2">
                    <FormLabel>Features (max 5)</FormLabel>
                    {fields.map((field, index) => (
                      <FormField
                        key={field.id}
                        control={form.control}
                        name={`features.${index}`}
                        render={({ field }) => (
                          <FormItem className="flex gap-2 items-center">
                            <FormControl>
                              <Input placeholder={`Feature ${index + 1}`} {...field} />
                            </FormControl>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => remove(index)}
                              // disabled={fields.length === 1}
                            >
                              Remove
                            </Button>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>

                  {fields.length < 5 && (
                    <div className='text-center'>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className=""
                        onClick={() => append("")}
                      >
                        + Add Feature
                      </Button>
                    </div>
                  )}
                </div>
                {/* Fixed footer buttons */}
                <div className="border-t pt-4 mt-4 flex gap-3">
                  {form.formState.isSubmitting}
                  <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                    {!form.formState.isSubmitting && !form.watch('id') ? 'Add' : 'Edit'} {ModuleName}
                    {form.formState.isSubmitting ? 'Updating...' : ''}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsSheetOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </SheetContent>
        </Sheet>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search Services..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {ServiceList?.map((Service: ModuleType, index) => (
                  // <TableRow key={Service.id} className="hover:bg-gray-50">
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{Service.title}</TableCell>
                    <TableCell>{Service.price}</TableCell>
                    <TableCell>{truncateText(Service.description, 20)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={() => {
                          // form.reset(Service);
                          const parsedFeatures = Array.isArray(Service.features)
                            ? (Service.features.length > 0 ? Service.features : [])
                            : typeof Service.features === 'string'
                              ? (JSON.parse(Service.features).length > 0 ? JSON.parse(Service.features) : [])
                              : [""];

                          Service.flgDelete = false;
                          form.reset({
                            ...Service,
                            features: parsedFeatures,
                          });
                          setIsSheetOpen(true);
                        }}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleAddEdit(Service, true)} className="text-red-600 hover:text-red-700">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-6 ml-6">
              Page {currentPage} of {totalPages}
              {/* {totalPages > 1 && (
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => callgetServicesApi(searchTerm, Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => callgetServicesApi(searchTerm, page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => callgetServicesApi(searchTerm, Math.min(totalPages, currentPage + 1))}
                      className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )} */}

              <Pagination>
                <PaginationContent>
                  {/* Previous */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => callgetServicesApi(searchTerm, Math.max(1, currentPage - 1))}
                      className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                    />
                  </PaginationItem>

                  {/* Leading Ellipsis */}
                  {currentPage > 3 && (
                    <>
                      <PaginationItem>
                        <PaginationLink
                          onClick={() => callgetServicesApi(searchTerm, 1)}
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
                          onClick={() => callgetServicesApi(searchTerm, page)}
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
                          onClick={() => callgetServicesApi(searchTerm, totalPages)}
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
                      onClick={() => callgetServicesApi(searchTerm, Math.min(totalPages, currentPage + 1))}
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

export default Services;


