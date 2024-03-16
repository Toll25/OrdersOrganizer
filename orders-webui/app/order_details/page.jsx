'use client';

import React from "react";
import {columns} from "@/data/data";
import DisplayTable from "@/app/displayTable";
import {useOrderDetails, useOrders} from "@/data/getters";
export default function App() {
    return (
        <DisplayTable getter={useOrderDetails} columns={columns["order_details"]}/>
    );
}