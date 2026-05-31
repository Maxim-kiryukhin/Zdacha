import "./Halfs.css";

function Halfs(props) {
    if (props.order === "0") {
        return (
            <>
                <div className="main_half">
                    <div className="first_half">
                        <div className="first_half_desc_text">
                            <h1 className="montserrat">{props.adress_metro}</h1>
                            <p className="montserrat">{props.adress_street}</p>
                        </div>
                        <button
                            className="first_half_desc_button"
                            onClick={() =>
                                props.OnClick(props.Link, props.adress_street)
                            }
                        >
                            <p className="montserrat">{props.button_text}</p>
                        </button>
                    </div>
                    <img className="halfs_second_half" src={props.url} alt="" />
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="main_half">
                    <img className="halfs_second_half" src={props.url} alt="" />
                    <div className="first_half">
                        <div className="first_half_desc_text">
                            <h1 className="montserrat">{props.adress_metro}</h1>
                            <p className="montserrat">{props.adress_street}</p>
                        </div>
                        <button
                            className="first_half_desc_button"
                            onClick={() =>
                                props.OnClick(props.Link, props.adress_street)
                            }
                        >
                            <p className="montserrat">{props.button_text}</p>
                        </button>
                    </div>
                </div>
            </>
        );
    }
}
export default Halfs;
