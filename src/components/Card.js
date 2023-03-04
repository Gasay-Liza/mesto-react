import React from 'react';


function Card(props) {

    function handleCardClick() {
        props.onCardClick(props.card);
    }

    return (
        <li className="photo-card">
            <img className="photo-card__image"
                 src={props.card.link}
                 alt="#"
                 onClick={handleCardClick}
            />
            <button aria-label="Мусорка" type="button" className="photo-card__trash"/>
            <div className="photo-card__description">
                <h2 className="photo-card__name">{props.card.name}</h2>
                <div className="photo-card__like-container">
                    <button aria-label="Лайк" type="button" className="photo-card__like"/>
                    <p className="photo-card__likes-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
        )
}

export default Card;