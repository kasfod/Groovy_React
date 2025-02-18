import { Link } from "react-router-dom";
import style from "./ContactSlide.module.css";

const ContactSlide = () => {

    return (
        <div>
            <div className={style.mainbtn_container}>
                <Link to="/Groovy/contacts">
                    <button className={style.mainbtn}>
                        <strong className={style.strong_main}>회사 주소록</strong>
                    </button>
                </Link>
            </div>
            <div className={style.subbtn_container}>
                <div className={style.subbtn_wrapper}>
                    <Link to="/Groovy/contacts/favorite">
                        <button className={style.subbtn}>
                            즐겨찾기
                        </button>
                    </Link>
                </div>
                <div className={style.subbtn_wrapper}>
                    <Link to="/Groovy/contacts/groupcontact">
                        <button className={style.subbtn}>
                            소속 주소록
                    </button>
                    </Link>
                </div>
                <div className={style.subbtn_wrapper}>
                    <Link to="/Groovy/contacts/externalcontact">
                        <button className={style.subbtn}>
                            외부 주소록
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ContactSlide;