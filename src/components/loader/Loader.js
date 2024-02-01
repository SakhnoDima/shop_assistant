import {LineWobble} from '@uiball/loaders';
import s from "./Loader.module.scss"

export const Loader = () => {
    return <div className={s.loader}>
        <LineWobble
            size={80}
            lineWeight={2.5}
            speed={0.8}
            color="#4db935"
        />
    </div>

}