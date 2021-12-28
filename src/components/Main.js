import React from 'react';
import api from './../utils/api';
import Card from './Card';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick}){

    React.useEffect(() => {
        api.getUserInfo()
          .then((data) => {
            setUserAvatar(data.avatar)
            setUserName(data.name);
            setUserDescription(data.about);
          })
          .catch((err) =>
            console.log(`Ошибка: ${err}`))
    }, []);

    React.useEffect(() => {
        api.getInitialCards()
          .then((cardList) => {
            setCards(cardList)
          })
          .catch((err) =>
            console.log(`Ошибка: ${err}`))
    }, []);


    const[userAvatar, setUserAvatar] = React.useState('');
    const[userName, setUserName] = React.useState('Загруска...');
    const[userDescription, setUserDescription] = React.useState('Загруска...');

    const [cards, setCards] = React.useState([]);

    return(
    <main className="content">
      <section className="profile">
          <img src={`${userAvatar}`} className="profile__avatar" alt="Аватар"/>
          <button className="profile__avatar-button" onClick={onEditAvatar}></button>
          <div className="profile__info">
              <div className="profile__info-block">
                  <h1 className="profile__name">{userName}</h1>
                  <button type="button" className="profile__edit-button" onClick={onEditProfile}></button>
              </div>
              <p className="profile__job">{userDescription}</p>
          </div>
          <button type="button" className="profile__add-button" onClick={onAddPlace}></button>
      </section>

      <section className="elements">
          <ul className="elements__table">
            {cards.map((card) => {
                return (
                  <Card
                      key={card._id}
                      name={card.name}
                      link={card.link}
                      card={card}
                      likes={card.likes.length}
                      onCardClick={onCardClick}
                  />
                )
            })}
          </ul>
      </section>
  </main>
    )
}

export default Main;