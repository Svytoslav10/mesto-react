import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});

  function closeAllPopups(){
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false); 
    setAddPlacePopupOpen(false);
    setSelectedCard({name:'', link:''});
  }

  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen)
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(!isEditProfilePopupOpen) 
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(!isAddPlacePopupOpen)  
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }


  return (
    <div>
      <div className="page">
          <Header />
          <Main onEditAvatar={handleEditAvatarClick} onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onCardClick={handleCardClick} />
          <Footer />
      </div>

      <PopupWithForm isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} title="Обновить аватар" text="Сохранить" name="avatar">
            <input
            className="popup__input popup__input_type_url"
            type="url"
            id="avatar"
            name="avatar"
            placeholder="Ссылка на картинку" required />
            <span className="error" id="avatar-error"></span>
      </PopupWithForm>

      <PopupWithForm isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} title="Редактировать профиль" text="Сохранить" name="editProfile">
            <input
            type="text"
            required
            name="name"
            placeholder="ФИО"
            className="popup__input popup__input_user_name"
            minLength="2" maxLength="40"
            autoComplete="off"
            id="user-name" />
            <span className="error" id="user-name-error"></span>

            <input
            type="text"
            required
            name="about"
            placeholder="Профессия"
            className="popup__input popup__input_user_job"
            minLength="2" maxLength="200"
            autoComplete="off"
            id="user-job" />
            <span className="error" id="user-job-error"></span>

      </PopupWithForm>

      <PopupWithForm title="Новое место" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} text="Создать" name="addPicture">
            <input
            type="text"
            required
            placeholder="Название"
            className="popup__input popup__input_type_name"
            minLength="2"
            maxLength="30"
            autoComplete="off"
            id="title"
            name="title" />
            <span className="error" id="title-error"></span>

            <input
            type="url"
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            autoComplete="off"
            id="link"
            name="url" />
            <span className="error" id="link-error"></span>
      </PopupWithForm>

      <PopupWithForm className="popup popup_type_delete-card" text="Да" title="Вы уверены?" onClose={closeAllPopups} name="card" />

      <ImagePopup card = {selectedCard} onClose={closeAllPopups}/>

    </div>
  );
}

export default App;
