import useSWR from "swr";
import fetcher from "@/data/fetcher";

const baseAddress = "http://localhost:8000"

export function useCustomers() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/customers`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useCategories() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/categories`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useProducts() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/products`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useOrders() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/orders`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useOrderDetails() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/order_details`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useShippers() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/shippers`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useSuppliers() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/suppliers`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
export function useEmployees() {
    const {
        data,
        error,
        isLoading,
    } = useSWR(`${baseAddress}/employees`, fetcher)

    return {
        data,
        isLoading,
        error,
    }
}
