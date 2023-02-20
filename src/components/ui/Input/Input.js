import React, {useRef, useImperativeHandle} from "react";

const Input = React.forwardRef((props, ref) => {
    const inputRef = useRef();
    const activate = () => {

    }

    useImperativeHandle(ref, () => {
        return {
            focus: activate
        }
    })
    return (
        <div className="form-group">
            <input
                ref={inputRef}
                type={props.type}
                required=""
                placeholder={props.placeholder}
                class="form-control"
                style={{ width: "100%", "margin-top": "20px" }}
                value={props.value}
                onChange={onChangeEmailHandler}
                onBlur={validateEmailHandler} />
        </div>
    )
});

export default Input;