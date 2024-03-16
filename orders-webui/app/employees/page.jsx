'use client';

import React from "react";
import {columns} from "@/data/data";
import DisplayTable from "@/app/displayTable";
import {useEmployees, useOrders} from "@/data/getters";
export default function App() {
    return (
        <DisplayTable getter={useEmployees} columns={columns["employees"]}/>
    );
}