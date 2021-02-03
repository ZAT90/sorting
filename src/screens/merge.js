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

const styles = {
  container: { display: 'flex', flexDirection: 'row' },
  swapDiv: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh', width: '80vh' },
  swapBtn: { backgroundColor: 'blue', width: 150 },
  startBtn: { backgroundColor: 'black', width: 300 },
  completeMsg: { color: 'black', marginLeft: 100, marginTop: 50 },
  newGameBtn: { backgroundColor: 'black', width: 150, marginLeft: 200 },
  consoleDiv: { display: 'flex', flex: 0.4, backgroundColor: 'grey', flexDirection: 'column' },
  consoleDiv2: { display: 'flex', flexDirection: 'column' },
  consoleHeader: { fontWeight: 'bold', fontSize: 20, textDecorationLine: 'underline' },
  nestedForDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 20 },
  nestedForConsole: { display: 'flex', flex: 0.5, backgroundColor: 'black', justifyContent: 'center', color: 'white',  },
  nestedForText: { display: 'flex', flex: 0.5, marginLeft: 10, alignItems: 'center', },
  ifDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 30 },
  ifConsole: { display: 'flex', flex: 0.5, backgroundColor: 'red', justifyContent: 'center', color: 'white' },
  ifText: { display: 'flex', flex: 0.5, marginLeft: 10 },
}
export function Merge (){
  const [isLevel, setIsLevel] = useState(false);
  const [levelName, setLevelName] = useState('');
  const [isFirstListSet, setIsFirstListSet] = useState(false);
  const [initList, setInitList] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [score, setScore] = useState(0);
  const [numToCompare, setNumToCompare] = useState(0);
  const [highlightFirst, setHighlightFirst] = useState(0);
  const [highlightSecond, setHighlightSecond] = useState(1);
  const [show, setShow] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [chooseNums, setChooseNums] = useState([]);

  function firstListGenerator(number) {
    console.log('level name: ' + levelName);
    if (firstList.includes(number)) {
      const removeList = firstList.filter(item => item !== number);
      setFirstList(removeList);
    } else {
      if (levelName === 'easy') {
        if (firstList.length < 6) {

          setFirstList(prevArray => [...prevArray, number])
          //}

        } else {
          alert("beginner level can only select 6 numbers");

        }
      } else if (levelName === 'medium') {
        if (firstList.length < 8) {
          setFirstList(prevArray => [...prevArray, number])
        } else {
          alert("medium level can only select 8 numbers");
        }
      } else if (levelName === 'hard') {
        if (firstList.length < 10) {
          setFirstList(prevArray => [...prevArray, number])
        } else {
          alert("hard level can only select 10 numbers");
        }
      }
    }
  }


  function chooseItems() {
    return (
      chooseNums.map((number, i) =>
        <Button
          onClick={() => firstListGenerator(number)}
          style={{ backgroundColor: firstList.includes(number) ? 'yellowgreen' : 'green' }} key={i} >{number}</Button>
      )
    )
  }
  function listItems() {
    return (
      firstList.map((number, i) =>
        <Button
          style={{ backgroundColor:  'green' }} key={i} >{number}</Button>
      )
    )
  }
  function generateChooseList(level) {
    //console.log('gamelevel: ' + gameLevel);
    setLevelName(level);
    setIsLevel(true);
    const randomArray = Array.from({ length: 42 }, () => Math.floor(Math.random() * 80));
    let s = new Set(randomArray);
    let it = s.values();
    const randomArrayRedo = Array.from(it);
    setChooseNums(randomArrayRedo);
    setInitList(randomArrayRedo);
  }

  function startSorting() {
    if (levelName === 'easy') {
      if (firstList.length < 6) {
        alert("easy level has to select 6 numbers");
      } else {
        setIsFirstListSet(true);
        setNumToCompare(firstList.length);
      }
    } else if (levelName === 'medium') {
      if (firstList.length < 8) {
        alert("medium level has to select 8 numbers");
      } else {
        setIsFirstListSet(true);
        setNumToCompare(firstList.length);
      }
    } else if (levelName === 'hard') {
      if (firstList.length < 10) {
        alert("hard level has to select 10 numbers");
      } else {
        setIsFirstListSet(true);
        setNumToCompare(firstList.length);
      }
    }

  }
  return (
    <div>
      <NavigationBar showConsole={(show) => setShowConsole(show)} />
      <div style={styles.container}>

        <div style={{ flex: 0.6 }}>
          <h2 style={{ color: 'black', marginLeft: 100 }}>score: {score}</h2>
          <GridWrapper>
            {!isLevel && <Button onClick={() => generateChooseList('easy')} variant="primary">Easy</Button>}{' '}
            {!isLevel && <Button onClick={() => generateChooseList('medium')} variant="secondary">Medium</Button>}{' '}
            {!isLevel && <Button onClick={() => generateChooseList('hard')} variant="success">Hard</Button>}{' '}

          </GridWrapper>

          {isLevel && <div>
            {!isFirstListSet && <GridWrapper>

              {chooseItems()}

            </GridWrapper>}
            <GridWrapper>
              {isFirstListSet && listItems()}
            </GridWrapper>
            {!isFirstListSet && <div style={styles.swapDiv}>
              <Button onClick={() => startSorting()} style={styles.startBtn} >Start Sorting</Button>
            </div>}
            

          </div>}
          
          
        </div>
      </div>
    </div>
  )
}
  
