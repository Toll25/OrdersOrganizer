'use client';

import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger, Input, Pagination, SelectSection,
    Table, TableBody, TableCell, TableColumn, TableHeader,
    TableRow,
} from "@nextui-org/react";
import React, {useState} from "react";
import {BiChevronDown, BiSearch} from "react-icons/bi";
import {capitalize} from "@/data/utils";

export default function DisplayTable(props) {
    const { getter, columns } = props;
    const nameSet = new Set(columns.map(obj => obj.name));
    const [filterValue, setFilterValue] = React.useState("");
    const [visibleColumns, setVisibleColumns] = React.useState(nameSet);
    const [searchColumn, setSearchColumn] = useState(new Set ([columns[0].uid]))
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: columns[0],
        direction: "ascending",
    });
    const [page, setPage] = React.useState(1);
    let {data} = getter();

    if(!data){
        data=[]
    }

    const hasSearchFilter = Boolean(filterValue);

    const headerColumns = React.useMemo(() => {
        if (!columns || columns.length === 0) {
            return [];
        }

        if (visibleColumns === "all") return columns;

        return columns.filter((column) => {
            return visibleColumns.has(column.uid)
        });
    }, [columns, visibleColumns]);

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...data];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>{
                const columnValue = user[searchColumn.values().next().value];
                return columnValue.toString().toLowerCase().includes(filterValue.toLowerCase());
            });
        }

        return filteredUsers;
    }, [data, filterValue, hasSearchFilter, searchColumn]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);

    const sortedItems = React.useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);

    const pageItems = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return sortedItems.slice(start, end);
    }, [page, sortedItems, rowsPerPage]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            // TODO add cases for special rendering
            default:
                return cellValue;
        }
    }, []);

    const onNextPage = React.useCallback(() => {
        if (page < pages) {
            setPage(page + 1);
        }
    }, [page, pages]);

    const onPreviousPage = React.useCallback(() => {
        if (page > 1) {
            setPage(page - 1);
        }
    }, [page]);

    const onRowsPerPageChange = React.useCallback((e) => {
        setRowsPerPage(Number(e.target.value));
        setPage(1);
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
            setPage(1);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(()=>{
        setFilterValue("")
        setPage(1)
    },[])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between gap-3 items-end">
                    <div className={"flex items-center"}>
                        <Input
                            isClearable
                            className="w-full min-w-[24rem] sm:max-w-[44%] mr-4"
                            placeholder={`Search by ${searchColumn.values().next().value}...`}
                            startContent={<BiSearch />}
                            value={filterValue}
                            onClear={() => onClear()}
                            onValueChange={onSearchChange}
                        />
                        <div className={"mr-2"}>
                            Search Column:
                        </div>
                        <Dropdown>
                            <Dropdown>
                                <DropdownTrigger className="hidden sm:flex">
                                    <Button endContent={<BiChevronDown className="text-small" />} variant="flat">
                                        {searchColumn}
                                    </Button>
                                </DropdownTrigger>
                                <DropdownMenu
                                    aria-label="Search Columns"
                                    disallowEmptySelection
                                    selectedKeys={searchColumn}
                                    selectionMode="single"
                                    onSelectionChange={setSearchColumn}
                                >
                                    {columns.map((column) => (
                                        <DropdownItem key={column.uid} className="capitalize">
                                            {capitalize(column.name)}
                                        </DropdownItem>
                                    ))}
                                </DropdownMenu>
                            </Dropdown>
                        </Dropdown>
                    </div>

                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<BiChevronDown className="text-small" />} variant="flat">
                                    Columns
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={visibleColumns}
                                selectionMode="multiple"
                                onSelectionChange={setVisibleColumns}
                            >
                                {columns.map((column) => (
                                    <DropdownItem key={column.uid} className="capitalize">
                                        {capitalize(column.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">Total {data.length} entries</span>
                </div>
            </div>
        );
    }, [filterValue, onSearchChange, searchColumn, columns, visibleColumns, data.length, onClear]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between items-center">
                <Pagination
                    isCompact
                    showControls
                    showShadow
                    color="primary"
                    page={page}
                    total={pages}
                    onChange={setPage}
                />
                <div className="hidden sm:flex w-[30%] justify-end gap-2">
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onPreviousPage}>
                        Previous
                    </Button>
                    <Button isDisabled={pages === 1} size="sm" variant="flat" onPress={onNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        );
    }, [pageItems.length, page, pages, hasSearchFilter]);

    return (
        <div className={"h-max m-8"}>
            <Table
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                bottomContent={bottomContent}
                bottomContentPlacement="outside"
                classNames={{
                    wrapper: "max-h-[32rem] min-h-[32rem]",
                }}
                selectionMode="none"
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="outside"
                onSortChange={setSortDescriptor}
            >
                <TableHeader columns={headerColumns}>
                    {(column) => (
                        <TableColumn
                            key={column.uid}
                            align={column.uid === "actions" ? "center" : "start"}
                            allowsSorting={column.sortable}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody emptyContent={"No entries found"} items={pageItems}>
                    {(item) => (
                        <TableRow key={self.crypto.randomUUID()}>
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
}