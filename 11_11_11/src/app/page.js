import s from './page.module.css'
import Image from "next/image";
import HomeTop from "../../public/home_top.jpg";


const Home = () => {

    return <div>
        <Image
            src={HomeTop}
            alt='image'
            className={s.home_top_png}
        />
        <div className={s.home_top_btn}>
            BEST BUY
        </div>
    </div>
}

export default Home;