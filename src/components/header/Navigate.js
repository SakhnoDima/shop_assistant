'use client';
import {usePathname} from "next/navigation";
import Link from "next/link";
import s from "./Navigate.module.scss"
import BagQuantity from "@/components/bag/BagQuantity";

const Navigation = ({navLinks, closeBurger}) => {
    const pathname = usePathname();
    return <div className={s.menu_link_container}>
        {navLinks.map(link => {
            const isActive = pathname === link.href;

            return <Link
                key={link.label}
                href={link.href}
                onClick={closeBurger}
                className={` ${isActive ? 'active_menu_link' : ''}`}
            >
                {link.label === 'MY BAG'
                ? <>{link.label} <BagQuantity/></>
                    : link.label
                }
            </Link>
        })}
    </div>
}

export default Navigation;


