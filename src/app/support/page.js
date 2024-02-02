'use client'
import {useState} from "react";
import s from "./Support.module.scss"
import Where_is_my_Order from "@/components/popular_faqs/Where_is_my_ order/Where_is_my_ order";
import How_can_I_return_an_item from "@/components/popular_faqs/How_can_I_return_an_item/How_can_I_return_an_item";
import How_can_I_exchange_an_item_for_another_size
    from "@/components/popular_faqs/How_can_I_exchange_an_item_for_another_size/How_can_I_exchange_an_item_for_another_size";
import Where_is_my_refund from "@/components/popular_faqs/Where_is_my_refund/Where_is_my_refund";
import InstagramLogo from '@/../public/icons8-instagram-64.png'
import TwitterLogo from '@/../public/icons8-твиттер-50.png'
import FacebookLogo from '@/../public/icons8-facebook-64.png'
import Image from "next/image";

const popularFaqs = [
    {title: 'Where is my Order?', info: Where_is_my_Order},
    {title: 'How can I return an item?', info: How_can_I_return_an_item},
    {title: 'How can I exchange an item for another size?', info: How_can_I_exchange_an_item_for_another_size},
    {title: 'Where is my refund?', info: Where_is_my_refund},
]

const contactUs = [
    {title: 'Instagram', image: InstagramLogo, href: 'https://www.instagram.com/'},
    {title: 'Twitter', image: TwitterLogo, href: 'https://twitter.com/home'},
    {title: 'Facebook', image: FacebookLogo, href: 'https://www.facebook.com/'},
]

const Questions = ({faq}) => {
    const Renderer = faq.info
    const [show, setShow] = useState(false)

    const changePointer = () => setShow(!show);

    return <div>
        <div className={s.title} onClick={changePointer}>
            <h3>{faq.title}</h3>
            <div>{show ? '-' : '+'}</div>
        </div>
        {show
            ? <Renderer/>
            : ''
        }
    </div>
}

const Links = ({link}) => {
    return <div className={s.link}>
        <Image src={link.image} alt={link.title} width={38}/>
        <a href={link.href}>{link.title}</a>
    </div>
}

const Support = () => {

    return <div className={s.support_page}>
        <h2 className={s.page_titel}>SUPPORT</h2>

        <div className={s.popular_faqs}>
            {popularFaqs.map((faq, index) => (
                    <Questions faq={faq} key={index}/>
                )
            )}
        </div>

        <div className={s.feedback}>
            You can get in touch via email on <span>Help@ZXC.com</span> or via ourLive <span>Chatweb</span> service.
        </div>

        <p className={s.query_important}>
            Every query is important to us and we aim to respond to all chats and emails as soon as possible.
        </p>

        <div className={s.contact_us}>
            <h2 className={s.contact_us_title}>CONTACT US</h2>
            <div className={s.contact_us_links}>
                {contactUs.map((link, index) => (
                        <Links link={link} key={index}/>
                    )
                )}
            </div>
        </div>
    </div>
}

export default Support;