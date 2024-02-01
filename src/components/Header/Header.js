'use client'
import Navigation from "@/components/Header/Navigate";
import Image from "next/image";
import Logo from "../../../public/logoStar.png";
import s from "./Header.module.scss"
import Burger from "@/components/burger/Burger";
import Link from "next/link";
import RunningStrip from "@/components/running_strip/Running_strip";

const Header = () => {
    const mainNavItems = [
        {label: 'SHOP', href: "/shop"},
        {label: 'BRAND', href: "/brand"},
        {label: 'SUPPORT', href: "/support"}
    ]
    const navItems = [
        {label: 'MY ACCOUNT', href: "/my-account"},
        {label: 'MY BAG', href: "/my-bag"}
    ]

    return <header className={s.header}>
        <div className={s.header_menu}>
            <Link href="/">
                <Image
                    className={s.logo_img}
                    src={Logo}
                    alt="logo"
                    width={30}
                    height={30}
                    // placeholder="blur"
                />
            </Link>

            <nav className={s.menu_link}>
                <Navigation navLinks={mainNavItems}/>
            </nav>
            <nav className={s.menu_link}>
                <Navigation navLinks={navItems}/>
            </nav>
            <Burger mainNavItems={mainNavItems} navItems={navItems}/>
        </div>
        <RunningStrip/>
    </header>
}

export default Header;
