import React from 'react';


function Card({card, onCardClick}) {

    function handleCardClick() {
        onCardClick(card);
    }

    return (
        <li className="photo-card">
            <img className="photo-card__image"
                 src={card.link}
                 alt={card.name}
                 onClick={handleCardClick}
            />
            <button aria-label="Мусорка" type="button" className="photo-card__trash"/>
            <div className="photo-card__description">
                <h2 className="photo-card__name">{card.name}</h2>
                <div className="photo-card__like-container">
                    <button aria-label="Лайк" type="button" className="photo-card__like"/>
                    <p className="photo-card__likes-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
        )
}

export default Card;