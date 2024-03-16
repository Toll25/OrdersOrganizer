'use client';

import React from "react";
import {columns} from "@/data/data";
import DisplayTable from "@/app/displayTable";
import {useOrders, useSuppliers} from "@/data/getters";
export default function App() {
    return (
        <DisplayTable getter={useSuppliers} columns={columns["suppliers"]}/>
    );
}