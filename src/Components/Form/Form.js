import { useEffect, useRef, useState } from "react";
import { BANK_UPI_HANDLES, isMobileDevice } from "../../Utils";
import "./Form.css";

export const Form = () => {

    const [userId, setUserId] = useState("");
    const [suggestion, setSuggestion] = useState("");
    const isMobile = useRef(false);
    const inputCords = useRef({});
    const inputElemRef = useRef();
    const refDiv = useRef();

    const clearSuggestion = () => {
        setSuggestion("");
    }

    useEffect(()=>{
        isMobile.current = isMobileDevice();
        inputCords.current = inputElemRef.current.getBoundingClientRect();
    },[])

    useEffect(() => {

        const [vpa, bankName] = userId.split("@");
        if (!vpa) {
            clearSuggestion();
            return;
        }

        if (bankName && bankName.length > 1) {
            const matchingBanksList = BANK_UPI_HANDLES.filter((name) => name.indexOf(bankName) === 0);
            if (matchingBanksList && matchingBanksList.length) {
                setSuggestion(`${vpa}@${matchingBanksList[0]}`);
            } else {
                clearSuggestion();
            }
        } else {
            clearSuggestion();
        }

    }, [userId]);

    const handleKeydown = (e) => {
        const { which = -1, keyCode = -1, code = "" } = e;

        if (which === 39 || keyCode === 39 || code === "arrowright") {
            setUserId(suggestion);
        }
    }

    const handleInputClick = (e) => {
        const buffer = (e.clientX - inputCords.current.left - 4) - (refDiv.current.clientWidth);
        if(buffer > 20 && suggestion){
            setUserId(suggestion);
        }
    }

    return (
        <form className="form-wrapper">
            <div className="input-wrapper">
                <input
                    className="form-input"
                    placeholder="Please enter your UPI ID"
                    type={"text"}
                    autoCapitalize="off"
                    autoComplete="off"
                    spellCheck="off"
                    value={userId}
                    onChange={(e) => { setUserId(e.target.value) }}
                    onKeyDown={handleKeydown}
                    onClick={handleInputClick}
                    ref={inputElemRef}
                />
                <input
                    className="form-suggestion"
                    value={suggestion}
                    onChange={() => { }}
                />
                <div className="hidden-div" ref={refDiv}>{userId}</div>
            </div>
            <button type="submit">Submit</button>
        </form>
    );

}
