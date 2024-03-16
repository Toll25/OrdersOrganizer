'use client'

import {
    Button,
    Dropdown,
    DropdownItem, DropdownMenu,
    DropdownTrigger,
    Link,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/react";
import {usePathname} from "next/navigation";
import {BiChevronDown} from "react-icons/bi";

export default function MainNavbar(){
    const navbarItems = [
        { title: 'Products', href: '/products' },
        { title: 'Orders', href: '/orders' },
        { title: 'Order Details', href: '/order_details'},
        { title: 'Categories', href: '/categories' },
        { title: 'Customers', href: '/customers' },
        { title: 'Employees', href: '/employees' },
        { title: 'Shippers', href: '/shippers' },
        { title: 'Suppliers', href: '/suppliers' }
    ];

    const pathName= usePathname()

    const renderNavbarItems = () => {
        return navbarItems.map((item, index) => (
            <DropdownItem key={index}>
                <Link href={item.href} className={`block w-full ${isActive(item.href) ? "font-bold text-blue-500" : ""}`}>
                    {item.title}
                </Link>
            </DropdownItem>

        ));
    };

    const isActive = (href) => pathName === href;

    return (
        <Navbar>
            <NavbarBrand>
                <p className="font-bold text-inherit">ORDER ORGANIZER</p>
            </NavbarBrand>
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <Dropdown>
                    <NavbarItem>
                        <DropdownTrigger>
                            <Button
                                disableRipple
                                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                                radius="sm"
                                variant="light"
                                endContent={<BiChevronDown/>}
                            >
                                Pages
                            </Button>
                        </DropdownTrigger>
                    </NavbarItem>
                    <DropdownMenu
                        aria-label="ACME features"
                        className="w-[340px]"
                        itemClasses={{
                            base: "gap-4",
                        }}
                    >
                        {renderNavbarItems()}
                    </DropdownMenu>
                </Dropdown>
            </NavbarContent>
        </Navbar>
    )
}