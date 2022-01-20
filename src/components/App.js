import React from 'react';
import Header from './Header';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import Main from './Main';
import Footer from './Footer';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import CurrentUserContext from '../contexts/CurrentUserContext';
import api from '../utils/api';


function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrentUser(data)
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

  React.useEffect(()=>{
    function heandleEsc(evt){
      if(evt.key === "Escape"){
        closeAllPopups()
      }
    }

    document.addEventListener('keydown', heandleEsc)
      return () => {
        document.removeEventListener('keydown', heandleEsc);
      }
  }, [])

  React.useEffect(()=>{
    function heandleOverlay(evt){
      if(evt.target.classList.contains('popup')){
        closeAllPopups()
      }
    }
    document.addEventListener('mousedown', heandleOverlay)
      return () => {
        document.removeEventListener('mousedown', heandleOverlay);
      }
  }, [])
  
  function handleUpdateAvatar({ avatar }) {
    
    api.changeAvatar({ avatar })
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) =>
    console.log(`Ошибка: ${err}`))
  }

  function handleUpdateUser({name, about}) {
    api.editUserInfo({name, about})
    .then((data) => {
      setCurrentUser(data);
      closeAllPopups();
    })
    .catch((err) =>
    console.log(`Ошибка: ${err}`))
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);
  
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    }).catch((err) =>
    console.log(`Ошибка: ${err}`));
  }

  function handleCardDelete(card) {       
    api.deleteCard(card._id).then(() => { 
      setCards((state) => state.filter((c) => c._id !== card._id));
    }).catch((err) => console.log(`Ошибка: ${err}`)); 

  } 

  function handleAddPlaceSubmit({name, link}) {
    api.addNewCard({name, link})
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) =>
        console.log(`Ошибка: ${err}`))
  }

  function closeAllPopups(){
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false); 
    setAddPlacePopupOpen(false);
    setSelectedCard({name:'', link:''});
  }

  function handleEditAvatarClick(){
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick(){
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen) 
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(!isAddPlacePopupOpen)  
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div>
      <div className="page">
          <Header />
          <Main 
          onEditAvatar={handleEditAvatarClick} 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick} 
          onCardDelete={handleCardDelete}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onUpdateUser={handleUpdateUser}
          cards={cards}/>
          <Footer />
      </div>
      
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>

      <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>

    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
