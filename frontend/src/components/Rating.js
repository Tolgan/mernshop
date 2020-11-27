import React, { useEffect } from "react";

const Rating = ({ rating, text, color, handleRating = false, userInfo }) => {
  useEffect(() => {
    if (userInfo && handleRating) {
      hover();
    } else if(handleRating){
      removeHover();
    }
  }, [userInfo, handleRating]);

  function hover() {
    const div = document.querySelector("div.ratinger");

    div.childNodes.forEach((spanon) => {
      const onStar = parseInt(spanon.dataset.value, 10);
      spanon.onmouseover = () => {
        div.childNodes.forEach((span) =>
          span.dataset.value <= onStar
            ? span.classList.add("hover")
            : span.classList.remove("hover")
        );
      };
      spanon.onmouseout = () => {
        div.childNodes.forEach((span) => {
          span.classList.remove("hover");
        });
      };
      spanon.onclick = () => {
        div.childNodes.forEach((span) =>
          span.dataset.value <= onStar
            ? span.classList.add("onclick")
            : span.classList.remove("onclick")
        );
        handleRating(parseInt(spanon.dataset.value, 10));
        window.location.href = "#toselect";
      };
    });
  }
  function removeHover() {
    const div = document.querySelector("div.ratinger");
    div.childNodes.forEach((spanon) => {
      spanon.onclick = null;
      spanon.onmouseover = null;
      spanon.classList.remove("onclick", "hover");
    });
  }

  return (
    <div className="rating ratinger">
      <span data-value="1">
        <i
          style={{ color }}
          className={
            rating >= 1
              ? "fas fa-star"
              : rating >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span data-value="2">
        <i
          style={{ color }}
          className={
            rating >= 2
              ? "fas fa-star"
              : rating >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span data-value="3">
        <i
          style={{ color }}
          className={
            rating >= 3
              ? "fas fa-star"
              : rating >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span data-value="4">
        <i
          style={{ color }}
          className={
            rating >= 4
              ? "fas fa-star"
              : rating >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span data-value="5">
        <i
          style={{ color }}
          className={
            rating >= 5
              ? "fas fa-star"
              : rating >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </span>
      <span className="texting">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = { color: "#f8e825" };

export default Rating;
