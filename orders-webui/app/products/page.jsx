'use client';

import React from "react";
import {columns} from "@/data/data";
import DisplayTable from "@/app/displayTable";
import {useOrders, useProducts} from "@/data/getters";
export default function App() {
    return (
        <DisplayTable getter={useProducts} columns={columns["products"]}/>
    );
}