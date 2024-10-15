import React from 'react';
import { URLs } from "../../__data__/urls";

import styled from "styled-components";

const Card = (props) => {
    const interlocutorId = props.id

    const hexToRgb = (hex) => {
        hex = hex.replace(/^#/, '');

        let r = parseInt(hex.slice(0, 2), 16);
        let g = parseInt(hex.slice(2, 4), 16);
        let b = parseInt(hex.slice(4, 6), 16);

        return `${r}, ${g}, ${b}`;
    }

    const handleClick = (event, id) => {
        localStorage.setItem('interlocutorId', id);
    };

    const StyledCard = styled.div`
        box-shadow: 0 10px 40px rgba(176, 175, 189, 0.85);

        padding: 2vw;

        display: flex;
        flex-direction: column;

        border-radius: 2vw;

        align-items: flex-start;
        justify-content: space-between;

        background-color: ${props => props.color 
                ? `rgba(${hexToRgb(props.color)}, 0.63)` 
                : 'rgba(255, 255, 255, 0.63)'};

        transition: box-shadow 0.3s ease-in;
        
        div, h2 {
            transition: color 0.3s ease-in;
        }

        h2 {
            margin-top: 0;
        }

        &:hover {
            box-shadow: 0 10px 40px rgb(${hexToRgb(props.color)});
            cursor: pointer;
            
            div, h2 {
                color: white;
            }
        }

        @media only screen and (max-width: 800px) {
            flex-direction: column;
            
            border-radius: 2vh;
            padding: 5vw;
        }
    `

  return (
      <a
          href={URLs.chat.url}
          className="ChatCard"
          onClick={(event) => handleClick(event, interlocutorId)}
      >
          <StyledCard color={props.color}>
              <h2>{props.name}</h2>
              <div className="lastMessageStyle">{props.lastMessage}</div>
          </StyledCard>
      </a>
  );
};

export default Card;
