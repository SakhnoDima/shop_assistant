'use client'
import s from "./Burger.module.scss"
import {useState} from "react";
import Navigation from "@/components/header/Navigate";

const Burger = ({mainNavItems, navItems}) => {
    const [toggleMenu, setToggleMenu] = useState(false)

    const showBurger = () => {
        setToggleMenu(!toggleMenu)
    }

    return <>
        <div className={s.burger_btn} onClick={showBurger}>
            MENU
        </div>
        {toggleMenu
            ? <div className={s.burger_menu}>
                <nav>
                    <Navigation navLinks={mainNavItems} closeBurger={showBurger} />
                </nav>
                <nav>
                    <Navigation navLinks={navItems} closeBurger={showBurger}/>
                </nav>
            </div>
            : ''
        }
    </>

}

export default Burger;