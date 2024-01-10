import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LinkContainer({ link, text, icon, handleClick }) {
    return (
        <>
            <a className="link c-pointer" href={link} onClick={handleClick}>
                <div className="bt-cont-home bg-color-ipb text-center p-4">
                    <div className="icon color-white">
                        <FontAwesomeIcon icon={icon} />
                    </div>
                    <div className="text color-white fs-3 ">
                        <p>
                            <b>{text}</b>
                        </p>
                    </div>
                </div>
            </a>
        </>
    );
}