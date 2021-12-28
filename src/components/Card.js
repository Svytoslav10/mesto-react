function Card(props){

    function handleClick(){
        props.onCardClick(props.card);
    }

    return(
        <li className="element">
        <img className="element__img" src={props.link} alt={props.name} onClick={handleClick}/>
        <button type="button" className="button__delete"></button>
        <div className="element__caption">
          <h2 className="element__name">{props.name}</h2>
          <div className="element__like-container">
            <button type="button" className="element__like-button"></button>
            <span className="element__like">{props.likes}</span>
          </div>
        </div>
      </li>
    )
}

export default Card;