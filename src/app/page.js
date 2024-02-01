import s from './page.module.scss'
import Image from "next/image";
import Link from "next/link";
import HomeListBrands from "@/components/home_list_brands/HomeListBrands";
const list_brands_onHome = [
    {
        id: 0,
        title: 'HERESY',
        text: 'HERESY is a brand that produces seasonal clothing collections influenced by the research and exploration of Folklore.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc9yYAYmXqUUj6IU5L2M0_bGVLhn1FeioykmMe79VqU_pT9AZaRrhpinXe6ezonObcdD2cU3EAgA6SiDGZzuGEaPu9jhxXwAM7U18Yz9j2G1xGdIRPZFLsymVWZnqubTuZqMix-VKnK9JADXOyzMVdwT9eJm5RawGuWjU8BtaZsKed9Wvzw6DxwCdpQ0AaLmN4IsH2wt0xtfv7WvLQCo-ylc_anme0UvDCHnUqua-GJSj_qHC6oFJ81bGu0ts0935ohJs98fin74LiNF7usrur0POoizcjdHuDY4WfJh9ClHPn5XpuUIYcV7TtJ5ugsoObsTmsastIqtWQhJoWVactYGt1dXt6ij3f5jBDBWf02KmEn_kNMNm2YwviiFEAH4cGW271KFUCA2wLuATq-AAr5aHVIhC3vC1A6QQ9fFQLLrkq3bv443nY5wAL0GgaqANsRJZq11jdJFTkjT5z327LWhcv_VaMBxtwaPWGU9gRVi7l8fYQB1AxZNPyjFjxhkj7KVqlGDADal4QvEgE0hP8iDElKnCMzD9_NJefD-8YTps7Y_ve0yMpUb-AWIR1BrqHaY6HuRYCekKL7bl9Rdpwm6czdduVZ2Xq6q-CFmE9kvUhBL_nBrHGGcki-zXwdLZPuqNhap3EXFFwhoL4JBVuk5Q3hvqFiA1yLchosH9X2RZsCP4B1wzcYMT-pTGIr3I0FFnOQKHM-1alpOlJ46LxnRruNWwsyA9PgqRM8t4ZL2sarqzUeUpkDGqlFwTY3xK7gfruIZslwrwFulOxmjSSJTGqc4ZuGlyKQHXYJ-zU5A7tqb1CP1HZn04WhEbvNBkPM1KnaTqZGHVvffkwN9C0kgB1BmALgrIEoNg9MnFAx5C995JCqvGNSKEKxELMysMkvXsX4jFkECNo4Bp2x_zQ=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
    {
        id: 1,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc-FuOrjq4ZFU1zYN1Ax8QK5aFe8sTza150teqJNapL8nwtfqvdZtOENmQB-wsB21v4G60IuxneTVu8s3LlfJRq_Jt4L6GUGYah8pDB4ehk6KhaZ7x-a4mnMpO7PbR8pxvWeMM0bIv7PubuOTRgrfPhva06G-m5kZ771_9kkvx8m334V-8HWK5MOXNejFu67POPSKvsJyA5xedUcxWBZdjaCti9fF8X3C6DmvDvOgxqZLYhA9UJ76-1SvSCAesspYrnnOWlOzpml8MQoXo9I0M9SvOj8ySIveoj8ts2KC9zlplo95PEm_CiNTpwSbTZ2C1AtEuis7niCgMYM5B0KKdmROBEuEJwyNFkSkZrO-kS90U16E_oVmkuF-nDfgk6M-28uAwmKsPPb9KaMBoqxVRqDELq8yBJwghqNca5Flu2cN8AHoZXpOmG0qr1x0nVM8UwFqHclFkNlSOHUpjwfdU4rMsuNum_MRUW-v71RrehXaGse1OUTtZitr8quTwmrFZQiwJ6R5iwfpzEbGeDZAmLe3UCQOxxElGjw7_c--tpVbOiM6Uza5U62TJLaFETBzjtg9P-mygbVEZ55OiYZrIxskzwVAY5jBw9D7QIaisc6vWpFBt82q726NbKDzhjrt_QHlRJG1vM3ZCQwnbFoTXlxn-xwsoqZ57AhPd86WpiGLKTPVxqFi9ECCMTelAsEKU3qVmRLf37b0blvAwlQ0IP8_uQevP_0VThJ5Oea6c8lmtxH8h9efW7vISZ4vX8OUnAdhYzceueFTFSh-bNjHBo1wZNI6bcZKuyzsAaParwKsuVxypn9PPVy2aVCgzbW0Iqs9ikwcF_P1O7DwU0H6OBnM6TbBFnjrkKVFFcAZ7HB9hJjurgwAVO4jHcAW8Dkpx54I-V_1yGDP4APAQlkmQ=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
    {
        id: 2,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc8hdjeeZml9mNXaMp5fwTWugjWcIPNP9orBfNqsD7WEuO6Gfp8_lsd6fwzhQzHsNVS00wsISWNR2NqCioGmjsfM8LyuhiDqmtinyd0fDEKQ5pqxWsrIwFBxdKjn1Ejsf8efdRsRW0_LVp3K6O2qN_1wPvpQYQ2QEmKGqbBRthEjZMZV8Nt_P16M7KddfnnRHZE2uWkbDTcBhwYwQJUziIBdbG8-AEeoNls7FSECzfgaZQh0dR62iVCJQ6TWmnHQ5xVHZC6vR88eA8l9-_vhhz4e7lt8OyR-wx3_YiC_hbe43IcgHklkKX-LuQ0J5uWt9q5OU2UjvsftXyiWGRrluJhvLkHgwhQ9aqkeyFtN7xadYGKehnM-5h2OwtqBRRxtjPMlHbGdXdVePgRrp8R5VOK1PiRLjiX7c5iICRQpeOwrzzNW3AUrWOsLaxn1KYZDN_BwU-TknGpuLsFjCipzM0sqWtfhJQ9Pb4KzU6vN2n12EJ4Yu29zXsY8MmA0sp7g8u00zSiPoI--GCR36rqW8q4ZL7jGDv1gyQobh9t6AqoVRG5tqQNWj6PnSuun9T_SLwqBarbL0A0hHQ8wngmHBHZoswt-3__r4rKP3eP0PhMOTbduzvqj3jgVolo1c3jqdlVhkGrarvGaKyMz6fkEUKI2cByXRLgLzB3mldRS2YaeWC2BK-3rliLahtfsSo8qEUV80hLK2QwmBYslqh_WklUHSIXg3WYuUVA7CcDnmna6u8XmDn2i8Hp6sD7pMBtafgxj4-whjtjeXlT5o3_Tg6fUoM6t_ejctVW4tUBUHaOYkESCBzx6WMdb7fTgbVSRBa-dfB22nNYuhiO7FTijX-QC7GvrKqRauwHdLADTW0kKML5iAZo2edb1-MHDF2_P0wIBqjIFRmoRH7zIQ6oJ9Q=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
    {
        id: 3,
        title: 'HERESY',
        text: 'HERESY is a brand that produces seasonal clothing collections influenced by the research and exploration of Folklore.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc9yYAYmXqUUj6IU5L2M0_bGVLhn1FeioykmMe79VqU_pT9AZaRrhpinXe6ezonObcdD2cU3EAgA6SiDGZzuGEaPu9jhxXwAM7U18Yz9j2G1xGdIRPZFLsymVWZnqubTuZqMix-VKnK9JADXOyzMVdwT9eJm5RawGuWjU8BtaZsKed9Wvzw6DxwCdpQ0AaLmN4IsH2wt0xtfv7WvLQCo-ylc_anme0UvDCHnUqua-GJSj_qHC6oFJ81bGu0ts0935ohJs98fin74LiNF7usrur0POoizcjdHuDY4WfJh9ClHPn5XpuUIYcV7TtJ5ugsoObsTmsastIqtWQhJoWVactYGt1dXt6ij3f5jBDBWf02KmEn_kNMNm2YwviiFEAH4cGW271KFUCA2wLuATq-AAr5aHVIhC3vC1A6QQ9fFQLLrkq3bv443nY5wAL0GgaqANsRJZq11jdJFTkjT5z327LWhcv_VaMBxtwaPWGU9gRVi7l8fYQB1AxZNPyjFjxhkj7KVqlGDADal4QvEgE0hP8iDElKnCMzD9_NJefD-8YTps7Y_ve0yMpUb-AWIR1BrqHaY6HuRYCekKL7bl9Rdpwm6czdduVZ2Xq6q-CFmE9kvUhBL_nBrHGGcki-zXwdLZPuqNhap3EXFFwhoL4JBVuk5Q3hvqFiA1yLchosH9X2RZsCP4B1wzcYMT-pTGIr3I0FFnOQKHM-1alpOlJ46LxnRruNWwsyA9PgqRM8t4ZL2sarqzUeUpkDGqlFwTY3xK7gfruIZslwrwFulOxmjSSJTGqc4ZuGlyKQHXYJ-zU5A7tqb1CP1HZn04WhEbvNBkPM1KnaTqZGHVvffkwN9C0kgB1BmALgrIEoNg9MnFAx5C995JCqvGNSKEKxELMysMkvXsX4jFkECNo4Bp2x_zQ=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
    {
        id: 4,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc-FuOrjq4ZFU1zYN1Ax8QK5aFe8sTza150teqJNapL8nwtfqvdZtOENmQB-wsB21v4G60IuxneTVu8s3LlfJRq_Jt4L6GUGYah8pDB4ehk6KhaZ7x-a4mnMpO7PbR8pxvWeMM0bIv7PubuOTRgrfPhva06G-m5kZ771_9kkvx8m334V-8HWK5MOXNejFu67POPSKvsJyA5xedUcxWBZdjaCti9fF8X3C6DmvDvOgxqZLYhA9UJ76-1SvSCAesspYrnnOWlOzpml8MQoXo9I0M9SvOj8ySIveoj8ts2KC9zlplo95PEm_CiNTpwSbTZ2C1AtEuis7niCgMYM5B0KKdmROBEuEJwyNFkSkZrO-kS90U16E_oVmkuF-nDfgk6M-28uAwmKsPPb9KaMBoqxVRqDELq8yBJwghqNca5Flu2cN8AHoZXpOmG0qr1x0nVM8UwFqHclFkNlSOHUpjwfdU4rMsuNum_MRUW-v71RrehXaGse1OUTtZitr8quTwmrFZQiwJ6R5iwfpzEbGeDZAmLe3UCQOxxElGjw7_c--tpVbOiM6Uza5U62TJLaFETBzjtg9P-mygbVEZ55OiYZrIxskzwVAY5jBw9D7QIaisc6vWpFBt82q726NbKDzhjrt_QHlRJG1vM3ZCQwnbFoTXlxn-xwsoqZ57AhPd86WpiGLKTPVxqFi9ECCMTelAsEKU3qVmRLf37b0blvAwlQ0IP8_uQevP_0VThJ5Oea6c8lmtxH8h9efW7vISZ4vX8OUnAdhYzceueFTFSh-bNjHBo1wZNI6bcZKuyzsAaParwKsuVxypn9PPVy2aVCgzbW0Iqs9ikwcF_P1O7DwU0H6OBnM6TbBFnjrkKVFFcAZ7HB9hJjurgwAVO4jHcAW8Dkpx54I-V_1yGDP4APAQlkmQ=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
    {
        id: 5,
        title: 'NOICE',
        text: 'Korean brand Noice promotes a feeling of peace and serenity, inspired by human sensations, environmental sounds and the awakening of nature.',
        img: 'https://lh3.googleusercontent.com/pw/AIL4fc8hdjeeZml9mNXaMp5fwTWugjWcIPNP9orBfNqsD7WEuO6Gfp8_lsd6fwzhQzHsNVS00wsISWNR2NqCioGmjsfM8LyuhiDqmtinyd0fDEKQ5pqxWsrIwFBxdKjn1Ejsf8efdRsRW0_LVp3K6O2qN_1wPvpQYQ2QEmKGqbBRthEjZMZV8Nt_P16M7KddfnnRHZE2uWkbDTcBhwYwQJUziIBdbG8-AEeoNls7FSECzfgaZQh0dR62iVCJQ6TWmnHQ5xVHZC6vR88eA8l9-_vhhz4e7lt8OyR-wx3_YiC_hbe43IcgHklkKX-LuQ0J5uWt9q5OU2UjvsftXyiWGRrluJhvLkHgwhQ9aqkeyFtN7xadYGKehnM-5h2OwtqBRRxtjPMlHbGdXdVePgRrp8R5VOK1PiRLjiX7c5iICRQpeOwrzzNW3AUrWOsLaxn1KYZDN_BwU-TknGpuLsFjCipzM0sqWtfhJQ9Pb4KzU6vN2n12EJ4Yu29zXsY8MmA0sp7g8u00zSiPoI--GCR36rqW8q4ZL7jGDv1gyQobh9t6AqoVRG5tqQNWj6PnSuun9T_SLwqBarbL0A0hHQ8wngmHBHZoswt-3__r4rKP3eP0PhMOTbduzvqj3jgVolo1c3jqdlVhkGrarvGaKyMz6fkEUKI2cByXRLgLzB3mldRS2YaeWC2BK-3rliLahtfsSo8qEUV80hLK2QwmBYslqh_WklUHSIXg3WYuUVA7CcDnmna6u8XmDn2i8Hp6sD7pMBtafgxj4-whjtjeXlT5o3_Tg6fUoM6t_ejctVW4tUBUHaOYkESCBzx6WMdb7fTgbVSRBa-dfB22nNYuhiO7FTijX-QC7GvrKqRauwHdLADTW0kKML5iAZo2edb1-MHDF2_P0wIBqjIFRmoRH7zIQ6oJ9Q=w1280-h993-s-no?authuser=0',
        href: '/brand'
    },
]

const Home = () => {
    return <>
        <div>
            <div className={s.img_container}>
                <Image
                    src={'https://lh3.googleusercontent.com/pw/AIL4fc8U4yAjt6DSJ6-Yjgt4zLqI4Ib1fgddlcYDe1-M0tO1PUfST6yKFahx1Wxr9IqCP7WxJqB-OIYsFrwPnBrZHh03ZIm1jRwqQI-cz37Z7VPPgQ3JaXKQTdOiiXn5mzH2M-D-ijKAAim3E9Dcmmguv8FAoLrvGZPvNN_5oRfevRujnJrKokdex3lrx-eZ7LVIw-3F7qDRYfzOd3o9Fi19Mb-2o6TZsBAPVu5Xoh-FC3dMVxggks9URndYoai6G4neim-2LgyAgJbWa84XMwKwoP6MAbuS1mb8d3GuV8l3-8ELEG6L9YBP-XERW2wp0q_YpLiNB5Hodrs2_lzBgg005q4jOsyLm4eX4OuHMV4wT4Gr7CGHsvRETNTUHQ1_f5KrMUAozN80qvOVK0Q9gk0BcJa0ci0IhgmS1YL4ti33dRad5Kq5B6pD7MpVEkA4-VK0CkgoaQwny43MegEc6Yem1l2Ioc8kVWspEdKCTYxxa4pmMPr7VF3_E9wEL4E3xM9IZnEoTUY34cXsvSZq4Nc6jDd0nOjxcQBlIK7yoclocwY2Jke2e6Qt-OYprGUroCfe6-xVwvWbjhYgLjSMtQy1CbqToZbvw8dlVDcFZLTD33mdoUwIbz0FmHseQMFaEUEO5TcOR8eGZrGSW17vRp3faikTjMxf_WkPyFfVdGa_avqOPw05yHKE6vohvbTjBiu5Uhh7dmPcwnBJ7JvP9hKBJ90PTu7mo8nLlGTaXWvY7UVmMZQOBn35SypuRQWRCKlcYxDQFw4IfVxjUkqmNpnTd4hkcYXUBOw9FSBTJQ-sn-P7rfxH_w6ajnRjWjcLJAFiU95moznpehNi3qR6s9SVV_BAFHJM8pOxolCzVkE6okID_8va0H5GiQd1Gi8rSSO6WEIshcztwP_rCaEOa5TYew=w2378-h1321-s-no?authuser=0'}
                    alt='image'
                    className={s.home_top_png}
                    // placeholder={"blur"}
                    layout={'fill'}
                    objectFit={'cover'}
                />
            </div>


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

