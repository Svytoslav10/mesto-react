import React from "react";
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({isOpen, onClose, onAddPlace}){
    
    /**
    const name = React.useRef();
    const link = React.useRef();
    

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace({
            name: name.current.value,
            link: link.current.value
        });
    }

    React.useEffect(() => {
            name.current.value = '';
            link.current.value = '';
    }, [isOpen]);
    **/

    const [cardName, setCardName] = React.useState('');
    const [cardLink, setCardLink] = React.useState('');

    function handleChangeCardName(evt) {
        setCardName(evt.target.value);
    }

    function handleChangeCardLink(evt) {
        setCardLink(evt.target.value);
    }

    React.useEffect(() => {
        setCardName();
        setCardLink();
    }, [isOpen]);

    function handleSubmit(evt) {
        evt.preventDefault();

        onAddPlace ({
            name: cardName,
            link: cardLink
        });
    }

    return(
        <PopupWithForm title="Новое место" isOpen={isOpen} onClose={onClose}  text="Создать" name="addPicture" onSubmit={handleSubmit}>
            <input
            type="text"
            //ref={name}
            onChange={handleChangeCardName}
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
            //ref={link}
            onChange={handleChangeCardLink}
            required
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link"
            autoComplete="off"
            id="link"
            name="url" />
            <span className="error" id="link-error"></span>
      </PopupWithForm>
    )
}

export default AddPlacePopup;