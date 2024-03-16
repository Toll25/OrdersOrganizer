'use client';

import React from "react";
import {columns} from "@/data/data";
import DisplayTable from "@/app/displayTable";
import {useCustomers, useOrders} from "@/data/getters";
export default function App() {
    return (
        <DisplayTable getter={useCustomers} columns={columns["customers"]}/>
    );
}