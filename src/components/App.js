import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null)
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  return (
      <div className="page">
        <div className="page__container">
          <Header/>
          <Main
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
          />
          <Footer/>

          {/*Форма редактирования профиля*/}
          <PopupWithForm
              name={'edit-profile'}
              title={'Редактировать профиль'}
              buttonText={'Сохранить'}
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
          >
            <label htmlFor="username" className="popup__label">
              <input
                  placeholder="Введите ваше имя"
                  className="popup__input popup__input_field_name"
                  type="text"
                  name="username"
                  id="username"
                  minLength={2}
                  maxLength={40}
                  required=""
                  defaultValue="Жак-Ив Кусто"
              />
              <span className="popup__error" id="username-error"/>
            </label>
            <label htmlFor="info" className="popup__label">
              <input
                  placeholder="Чем Вы занимаетесь?"
                  className="popup__input popup__input_field_info"
                  type="text"
                  name="info"
                  id="info"
                  minLength={2}
                  maxLength={200}
                  required=""
                  defaultValue="Исследователь океана"
              />
              <span className="popup__error" id="info-error"/>
            </label>
          </PopupWithForm>

          {/*Форма добавления новой карточки*/}
          <PopupWithForm
              name={'add-card'}
              title={'Новое место'}
              buttonText={'Создать'}
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
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
              />
              <span className="popup__error" id="link-error"/>
            </label>
          </PopupWithForm>

          {/*Форма обновления аватара*/}
          <PopupWithForm
              name={'update-avatar'}
              title={'Обновить аватар'}
              buttonText={'Сохранить'}
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
          >
            <label htmlFor="avatar" className="popup__label">
              <input
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

          {/*Форма согласия*/}
          <PopupWithForm
              name={'confirm'}
              title={'Вы уверены?'}
              buttonText={'Да'}
              // isOpen={isConfirmPopupOpen}
          >
          </PopupWithForm>

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
      </div>
  );
}


export default App;
