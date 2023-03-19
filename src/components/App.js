import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

import ImagePopup from "./ImagePopup";
import React from "react";
import api from "../utils/api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";


function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getCards()
            .then(cards => {
                setCards(cards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }, [])

    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setCurrentUser(data);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }, []);

    function handleUpdateUser(data) {
        api.setUserInfo({
            username: data.name,
            info: data.about
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdateCards(data) {
        api.createCard({
            name: data.name,
            link: data.link
        })
            .then(newCard => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

    function handleUpdateAvatar(data) {
        api.setUserAvatar({
            avatar: data.avatar
        })
            .then(data => {
                setCurrentUser(data);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
    }

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

    function handleCardLike(card) {
        // Есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })

            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(card) {
        // Тот ли владелец
        const isOwn = card.owner._id === currentUser._id;
        if (isOwn) {
            // Отправляем запрос в API и получаем обновлённые данные карточек
            api.deleteCard(card._id, isOwn).then(() => {
                setCards(cards => cards.filter((c) => c._id !== card._id));
            })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="page__container">
                    <Header/>
                    <Main
                        cards={cards}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onEditAvatar={handleEditAvatarClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />
                    <Footer/>

                    {/*Форма редактирования профиля*/}
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser}
                    />

                    {/*Форма обновления аватара*/}
                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    {/*Форма обновления карточек*/}
                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleUpdateCards}
                    />

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
        </CurrentUserContext.Provider>
    );
}


export default App;
