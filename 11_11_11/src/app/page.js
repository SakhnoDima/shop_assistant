import s from './page.module.scss'
import Image from "next/image";
import HomeTop from "../../public/home_top.jpg";
import Link from "next/link";
import home_1 from "../../public/home_1.jpg"
import home_2 from "../../public/home_2.jpg"
import home_3 from "../../public/home_3.jpg"
import HomeListBrands from "@/components/home_list_brands/HomeListBrands";

const list_brands_onHome = [
    {
        id: 0,
        title: 'HERESY',
        text: 'HERESY is a brand that produces seasonal clothing collections influenced by the research and exploration of Folklore.',
        img: home_1,
        href: '/brand'
    },
    {
        id: 1,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: home_2,
        href: '/brand'
    },
    {
        id: 2,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: home_3,
        href: '/brand'
    },
    {
        id: 3,
        title: 'HERESY',
        text: 'HERESY is a brand that produces seasonal clothing collections influenced by the research and exploration of Folklore.',
        img: home_1,
        href: '/brand'
    },
    {
        id: 4,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: home_2,
        href: '/brand'
    },
    {
        id: 5,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: home_3,
        href: '/brand'
    },
]

const Home = () => {

    return <>
        <div>
            <Image
                src={HomeTop}
                alt='image'
                className={s.home_top_png}
                placeholder={"blur"}
            />
            <Link
                href={'/shop'}
                className={s.home_top_btn}>
                BEST BUY
            </Link>

            <div className={s.list_brand}>
                {list_brands_onHome.map(brand => (
                    <HomeListBrands brand={brand}/>
                ))}
            </div>
        </div>
    </>
}

export default Home;