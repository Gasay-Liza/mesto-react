import React from 'react';
import PopupWithForm from "./PopupWithForm";



function EditProfilePopup({isOpen, onClose, onUpdateAvatar}) {
    const linkRef = React.useRef('https://gamemag.ru/images/cache/News/News167895/cbf161a6f0-1_350x250.jpg');

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: linkRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name={'update-avatar'}
            title={'Обновить аватар'}
            buttonText={'Сохранить'}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label htmlFor="avatar" className="popup__label">
                <input
                    ref={linkRef}
                    placeholder="Ссылка на новый аватар"
                    className="popup__input popup__input_update-avatar"
                    type="url"
                    name="avatar"
                    id="avatar"
                    required=""
                />
                <span className="popup__error" id="avatar-error"/>
            </label>
        </PopupWithForm>
    );
}

export default EditProfilePopup;