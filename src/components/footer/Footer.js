import s from "./Footer.module.scss"
import Link from "next/link";

const Footer = () => {

    return <div className={s.footer}>
        <div className={s.left}>
            <div>© 2023 LIMITED</div>
        </div>
        <div className={s.right}>
            <Link href={'/'}>TERMS AND CONDITIONS</Link>
            <span className={s.partition}></span>
            <Link href={'/'}>PRIVACY</Link>
        </div>
    </div>
}

export default Footer;