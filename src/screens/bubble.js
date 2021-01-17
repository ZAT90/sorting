import React, { useState, Tou } from 'react';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export function Bubble(params) {
  const [isLevel, setIsLevel] = useState(false);
  const [firstList, setFirstList] = useState([]);
  const[highlightFirst,setHighlightFirst] = useState(0);
  const[highlightSecond,setHighlightSecond] = useState(1);
  const listItems = firstList.map((number, i) =>
  <Button style = {{backgroundColor: i == highlightFirst || i == highlightSecond?'red':'green'}} key={i} >{number}</Button>
  );
  return (
    <div>
      <GridWrapper>
        {!isLevel && <Button onClick={() => {
          setIsLevel(true);
          console.log('i have clicked this');
          const randomArray = Array.from({ length: 6 }, () => Math.floor(Math.random() * 40));
          setFirstList(randomArray);
        }

        } variant="primary">Easy</Button>}{' '}
        {!isLevel && <Button onClick={() => setIsLevel(true)} variant="secondary">Medium</Button>}{' '}
        {!isLevel && <Button onClick={() => setIsLevel(true)} variant="success">Hard</Button>}{' '}

      </GridWrapper>
      <div>
        <GridWrapper>
          {firstList.length > 0 && listItems}
        </GridWrapper>
      </div>
    </div>
  )
}

