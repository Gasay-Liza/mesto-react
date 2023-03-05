import React from 'react';
import api from "../utils/api";
import Card from "./Card";

function Main({
    onEditProfile,
    onAddPlace,
    onEditAvatar,
    onCardClick
    }) {

    const [userName, setUserName] = React.useState(null);
    const [userDescription, setUserDescription] = React.useState(null);
    const [userAvatar, setUserAvatar] = React.useState(null);
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then(res => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })

        api.getCards()
            .then(res => {
                setCards(res);
        })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            })
        },[])


        return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <img
                        src={userAvatar}
                        className="profile__avatar"
                        alt="Фотография профиля"
                    />
                    <button
                        aria-label="Редактирование аватара"
                        type="button"
                        className="profile__avatar-btn"
                        onClick={onEditAvatar}
                    />
                </div>
                <div className="profile__text">
                    <h1 className="profile__name">{userName}</h1>
                    <p className="profile__info">{userDescription}</p>
                    <button
                        aria-label="Редактирование профиля"
                        type="button"
                        className="profile__edit-button"
                        onClick={onEditProfile}
                    />
                </div>
                <button
                    aria-label="Добавление карточки с фото"
                    type="button"
                    className="profile__add-button"
                    onClick={onAddPlace}
                />
            </section>
            <section className="photo-cards">
                <ul className="photo-cards__list">
                    {cards.map((card) =>(
                        <Card
                            key={card._id}
                            card={card}
                            onCardClick={onCardClick}
                        />)
                    )}
                </ul>
            </section>
        </main>
    )
}


export default Main;