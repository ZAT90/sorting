import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { NavigationBar } from "../components/NavigationBar";
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;

export function Bubble() {
  const [isLevel, setIsLevel] = useState(false);
  const [initList, setInitList] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [score, setScore] = useState(0);
  const [numToCompare, setNumToCompare] = useState(0);
  const [highlightFirst, setHighlightFirst] = useState(0);
  const [highlightSecond, setHighlightSecond] = useState(1);
  const [show, setShow] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  function listItems() {
    return (
      firstList.map((number, i) =>
        <Button
          style={{ backgroundColor: (i === highlightFirst || i === highlightSecond) && numToCompare > 1 ? 'red' : 'green' }} key={i} >{number}</Button>
      )
    )
  }
  function generateFirstList(gameLevel) {
    console.log('gamelevel: ' + gameLevel);
    setIsLevel(true);
    const randomArray = Array.from({ length: gameLevel }, () => Math.floor(Math.random() * 40));
    setFirstList(randomArray);
    setInitList(randomArray);
    setNumToCompare(randomArray.length);
  }
  function highlightOperation(increment) {
    console.log('highlightSecond: ' + highlightSecond);
    console.log('numToCompare: ' + numToCompare);
    if (highlightSecond + 1 === numToCompare) {
      if (increment) {
        setScore(score + 1);
        setHighlightFirst(0);
        setHighlightSecond(1);
        setNumToCompare(numToCompare - 1);
      } else {
        setScore(score - 1);
      }

    } else {
      if (increment) {
        setScore(score + 1);
        setHighlightFirst(highlightFirst + 1);
        setHighlightSecond(highlightSecond + 1);
      } else {
        setScore(score - 1);
      }
    }


  }
  function swapNumbers() {
    console.log(firstList[highlightFirst]);
    console.log(firstList[highlightSecond]);
    if (firstList[highlightFirst] > firstList[highlightSecond]) {
      [firstList[highlightFirst], firstList[highlightSecond]] = [firstList[highlightSecond], firstList[highlightFirst]];
      setFirstList(firstList);
      highlightOperation(true);
    } else {
      setShow(true);
      highlightOperation(false);
    }
  }
  function noSwapNumbers() {
    if (firstList[highlightFirst] === firstList[highlightSecond] || firstList[highlightFirst] < firstList[highlightSecond]) {
      highlightOperation(true);
    } else {
      setShow(true);
      highlightOperation(false);
    }
  }
  function reStart() {
    setIsLevel(false);
    setFirstList([]);
    setScore(0);
    setNumToCompare(0);
    setHighlightFirst(0);
    setHighlightSecond(0);
    setShow(false);
  }
  console.log('checking on state reuse: ' + firstList);
  console.log('num to compare: ' + numToCompare);
  console.log('showConsole: ' + showConsole);
  return (
    <div>
      <NavigationBar showConsole={(show) => setShowConsole(show)} />
      <div style={{ display: 'flex', flexDirection: 'row' }}>

        <div style={{ flex: 0.6 }}>
          <h2 style={{ color: 'black', marginLeft: 100 }}>score: {score}</h2>
          <GridWrapper>
            {!isLevel && <Button onClick={() => generateFirstList(6)} variant="primary">Easy</Button>}{' '}
            {!isLevel && <Button onClick={() => generateFirstList(8)} variant="secondary">Medium</Button>}{' '}
            {!isLevel && <Button onClick={() => generateFirstList(10)} variant="success">Hard</Button>}{' '}

          </GridWrapper>

          {isLevel && <div>
            <GridWrapper>
              {firstList.length > 0 && listItems()}
            </GridWrapper>
            {numToCompare > 1 && <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', width: '80vh' }}>
              <Button onClick={() => swapNumbers()} style={{ backgroundColor: 'blue', width: 150 }} >Swap</Button>
          &nbsp;&nbsp;&nbsp;
         <Button onClick={() => noSwapNumbers()} style={{ backgroundColor: 'blue', width: 150 }} >No Swap</Button>
            </div>}

          </div>}
          {numToCompare === 1 &&
            <div><h2 style={{ color: 'black', marginLeft: 100, marginTop: 50 }}>Well done! You have completed the game</h2>
              <Button onClick={() => reStart()} style={{ backgroundColor: 'black', width: 150, marginLeft: 200 }} >Start new Game</Button>
            </div>
          }
          <Modal show={show}>
            <Modal.Header closeButton>
              <Modal.Title>Wrong Move</Modal.Title>
            </Modal.Header>
            <Modal.Body>Scores deducted! Please choose the right answer</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(false)}>
                OK
          </Button>
            </Modal.Footer>
          </Modal>
        </div>
        {showConsole && <div style={{ display: 'flex', flex: 0.4, backgroundColor: 'grey', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 'bold', fontSize: 20, textDecorationLine: 'underline' }}>Console</span>
            <span style={{ marginLeft: 10 }}>array = [ {initList.map((item, i, arr) => <span>{item} {i != (arr.length - 1) ? ',' : ''}</span>)}]</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 50,  }}>
            <div style={{ display: 'flex', flex: 0.3, backgroundColor: 'red', justifyContent: 'center',color: 'white' }}>j ={highlightFirst}<br />{returnString()}</div>
            <div style={{ display: 'flex', flex: 0.7, marginLeft: 10 }}>if array[j] &gt; array [j+1] :<br />
            array[j],array[j+1] = array[j+1],array[j]
            </div>
          </div>
        </div>}
      </div>
    </div>
  )

  function returnString(){
    if(firstList[highlightFirst] > firstList[highlightSecond]){
      return `${firstList[highlightFirst]},${firstList[highlightSecond]} =${firstList[highlightSecond]},${firstList[highlightFirst]}`
    }
    return 'no changes';
  }
}

