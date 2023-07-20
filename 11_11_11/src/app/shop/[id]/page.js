'use client'
import {usePathname, useSearchParams} from "next/navigation";

const Omg = () => {
    const pathname = usePathname().split("/").pop();
    console.log(pathname)
    return <div>
        OOMMGG {pathname}
    </div>
}

export default Omg;