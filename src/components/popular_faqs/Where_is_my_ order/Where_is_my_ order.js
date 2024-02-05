import s from "./Where_is_my_ order.module.scss"
import Image from "next/image";
import LogoNovaPoshta from "@/../public/unnamed.jpg"

const Where_is_my_Order = () => {

    return <div className={s.question_content}>
        <p>
            You can track your order via the link included in your dispatch email
            (make sure you double-check this hasn’t ended up in your junk folder)
            all you need is your tracking number and postcode. Your dispatch email
            will inform you which courier will be delivering your parcel.
        </p>
        <p>
            <b>Standard Delivery</b> can take up to 5 working days.
        </p>
        <p>
            If your estimated delivery timescale has passed and you still haven't
            received your order, please contact our<b> Customer Services</b> team and they
            will do their best to investigate this for you.
        </p>
        <a href={'https://novaposhta.ua/'} target="_blank" className={s.track}>
            <h3 className={s.track_name}>Track my NOVA POSHTA Order</h3>
            <Image src={LogoNovaPoshta} alt={'NOVA POSHTA'} width={50}/>
        </a>
    </div>
}

export default Where_is_my_Order;