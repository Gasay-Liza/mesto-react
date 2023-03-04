import React from 'react';
function PopupWithForm({
    name,
    title,
    children,
    buttonText,
    isOpen,
    onClose
}) {
    return (
        <div className={`popup popup_type_${name}`+(isOpen && " popup_is-opened")}>
            <div className="popup__container">
                <button
                  className="popup__close-icon"
                  type="button"
                  onClick = {onClose}
                />
                <h2 className="popup__title">{title}</h2>
                <form
                    className={`popup__form popup__${name}-form`}
                    name={`popup__${name}-form`}
                    noValidate
                >
                    <>
                        {children}
                        <button type="submit" className="popup__submit-btn">
                            {buttonText}
                        </button>
                    </>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
