import React from 'react';
import PopupWithForm from "./PopupWithForm";


function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const linkRef = React.useRef('');
    const nameRef = React.useRef('');

    function handleAddPlaceSubmit(e) {
        e.preventDefault();

        onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
    }

    return (
        <PopupWithForm
            name={'add-card'}
            title={'Новое место'}
            buttonText={'Создать'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleAddPlaceSubmit}
        >
            <label htmlFor="name" className="popup__label">
                <input
                    placeholder="Название"
                    className="popup__input popup__input_field_card-name"
                    type="text"
                    name="name"
                    id="name"
                    minLength={2}
                    maxLength={30}
                    required
                    ref={nameRef}
                />
                <span className="popup__error" id="name-error"/>
            </label>
            <label htmlFor="link" className="popup__label">
                <input
                    placeholder="Ссылка на картинку"
                    className="popup__input popup__input_field_card-image"
                    type="url"
                    name="link"
                    id="link"
                    required
                    ref={linkRef}
                />
                <span className="popup__error" id="link-error"/>
            </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;