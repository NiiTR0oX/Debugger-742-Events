
import { Fragment, useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    if (byDateDesc) { // rajout du IF 
      setTimeout(
        () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
        5000
      );
    }
    
  };
  useEffect(() => {
    nextCard();
  }); // Assurez-vous que l'effet dépend de l'index
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => ( // Rajout du ?
        
        <Fragment key={event.title}>
          <div // j'ai rajouté le fragment et la clé 
             // key={event.title}
            className={`SlideCard SlideCard--${
              index === idx ? "display" : "hide"
            }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div> 
        </Fragment>
      ))}
      <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc?.map((_, radioIdx) => (
                <input
                  key={`${_.id + _.title}`}   // key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  value={radioIdx}
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default Slider;
