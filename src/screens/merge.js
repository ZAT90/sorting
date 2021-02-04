import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { NavigationBar } from "../components/NavigationBar";
import Popup from 'reactjs-popup';
import pipe from './pipe.jpeg';
const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
const GridWrapper2 = styled.div`
  display: grid;
  grid-gap: 15px;
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
  nestedForConsole: { display: 'flex', flex: 0.5, backgroundColor: 'black', justifyContent: 'center', color: 'white', },
  nestedForText: { display: 'flex', flex: 0.5, marginLeft: 10, alignItems: 'center', },
  ifDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 30 },
  ifConsole: { display: 'flex', flex: 0.5, backgroundColor: 'red', justifyContent: 'center', color: 'white' },
  ifText: { display: 'flex', flex: 0.5, marginLeft: 10 },
}
export function Merge() {
  const [isLevel, setIsLevel] = useState(false);
  const [levelName, setLevelName] = useState('');
  const [isFirstListSet, setIsFirstListSet] = useState(false);
  const [breakDialog, setBreakDialog] = useState(false);
  const [breakNum, setBreakNum] = useState(null);
  const [initList, setInitList] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [mainLeft, setMainLeft] = useState([]);
  const [mainRight, setMainRight] = useState([]);
  const [nestedLeft, setNestedLeft] = useState({ left: {}, right: {} });
  const [nestedRight, setNestedRight] = useState({});
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [nestedStep, setNestedStep] = useState(0);
  const [score, setScore] = useState(0);
  const [numToCompare, setNumToCompare] = useState(0);
  const [show, setShow] = useState(false);
  const [nestBreakDialog, setNestBreakDialog] = useState(false);
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
          style={{ backgroundColor: 'green' }} key={i} >{number}</Button>
      )
    )
  }

  function mainDivided(list, showGreen) {
    return (
      list.map((number, i) =>
        <Button
          style={{ backgroundColor: !showGreen ? 'grey' : 'green' }} key={i} >{number}</Button>
      )
    )
  }
  function listItemsDivided(list, showGreen) {
    return (
      list.map((number, i) =>
        <div style={{ marginLeft: 20, marginTop: 20 }}><Button
          style={{ backgroundColor: !showGreen ? 'grey' : 'green' }} key={i} >{number}</Button></div>
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
        setBreakDialog(true);
        setNumToCompare(firstList.length);
      }
    } else if (levelName === 'medium') {
      if (firstList.length < 8) {
        alert("medium level has to select 8 numbers");
      } else {
        setIsFirstListSet(true);
        setBreakDialog(true);
        setNumToCompare(firstList.length);
      }
    } else if (levelName === 'hard') {
      if (firstList.length < 10) {
        alert("hard level has to select 10 numbers");
      } else {
        setIsFirstListSet(true);
        setBreakDialog(true);
        setNumToCompare(firstList.length);
      }
    }

  }
  console.log(nestedLeft);
  //nestedLeft.map((item, i) => console.log('item: ' + item));
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
              {isFirstListSet && mainLeft.length === 0 && listItems()}
              {mainLeft.length > 0 && mainDivided(mainLeft, isLeft)}
              {mainLeft.length > 0 && <img src={pipe} width='50' />}
              {mainLeft.length > 0 && mainDivided(mainRight, isRight)}

            </GridWrapper>
            <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 100 }}>
              <div>
                {isLeft &&
                  Object.keys(nestedLeft.left).map(keyleft =>
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>{listItemsDivided(nestedLeft.left[keyleft], true)}</span></div>
                  )


                }

              </div>

              <div >
                {isLeft &&
                  Object.keys(nestedLeft.right).map(keyright =>
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>
                     <img src={pipe} width='50' />
                      {listItemsDivided(nestedLeft.right[keyright], true)}</span></div>
                  )


                }
              </div>
            </div>
            {/* <GridWrapper>
            {isLeft &&
              Object.keys(nestedLeft.left).map(keyleft =>
                <GridWrapper2><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>{listItemsDivided(nestedLeft.left[keyleft], true)}</span></GridWrapper2>
              )


            }
            </GridWrapper> */}

            {!isFirstListSet && <div style={styles.swapDiv}>
              <Button onClick={() => startSorting()} style={styles.startBtn} >Start Sorting</Button>
            </div>}


          </div>}
          <Popup open={breakDialog} closeOnDocumentClick={false} modal>
            <div style={{ backgroundColor: 'grey', color: 'white', padding: 20 }}>
              What is the break point among the numbers
              <form onSubmit={(event) => formSubmit(event)}>

                <input type="number" value={breakNum != null ? breakNum : 0} onChange={(e) => setBreakNumber(e)} />

                <input type="submit" value="Submit" />
              </form>
            </div>
          </Popup>
          <Popup open={nestBreakDialog} closeOnDocumentClick={false} modal>
            <div style={{ backgroundColor: 'grey', color: 'white', padding: 20 }}>
              What is the break point among the numbers
              <form onSubmit={(event) => innerDivision(event)}>

                <input type="number" value={breakNum != null ? breakNum : 0} onChange={(e) => setBreakNumber(e)} />

                <input type="submit" value="Submit" />
              </form>
            </div>
          </Popup>
          <Modal show={show}>
            <Modal.Header closeButton>
              <Modal.Title>Wrong Move</Modal.Title>
            </Modal.Header>
            <Modal.Body>Well Done! Let's start with left side first</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {
                setShow(false);
                setNestBreakDialog(true);
              }}>
                OK
          </Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    </div>
  )
  function setBreakNumber(event) {
    console.log(event.target.value);
    setBreakNum(parseInt(event.target.value));
  }

  function innerDivision(event) {
    //console.log(Object.keys(nestedLeft));
    // setNestedLeft({ ...nestedLeft, [nestedStep]: left });
    if (Object.keys(nestedLeft.left).length > 0) {
      event.preventDefault();
      let test = Object.keys(nestedLeft.left).map(key => { return nestedLeft.left[key] });
      console.log('test: ' + test.length);
      let listToBreak = test[nestedStep - 1];
      console.log('listToBreak: ' + listToBreak);
      console.log('test0 length' + listToBreak.length);
      if (listToBreak.length > 1) {
        let mid = Math.floor(test[0].length / 2);
        console.log('mid: ' + mid);
        let leftArr = test[0].slice(0, mid)
        let rightArr = test[0].slice(mid);
        console.log('left: ' + leftArr);
        console.log('right: ' + rightArr);
        setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
        setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
        // //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
        setNestedStep(nestedStep + 1);
        if(leftArr.length == 1 && rightArr.length == 1){
         setBreakDialog(false);
        }
      }else{
        let test = Object.keys(nestedLeft.right).map(key => { return nestedLeft.right[key] });
      console.log('test: ' + test.length);
      let listToBreak = test[nestedStep - 1];
      console.log('listToBreak: ' + listToBreak);
      console.log('test0 length' + listToBreak.length);
      if (listToBreak.length > 1) {
        let mid = Math.floor(test[0].length / 2);
        console.log('mid: ' + mid);
        let leftArr = test[0].slice(0, mid)
        let rightArr = test[0].slice(mid);
        console.log('left: ' + leftArr);
        console.log('right: ' + rightArr);
        setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
        setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
        // //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
        setNestedStep(nestedStep + 1);
        if(leftArr.length == 1 && rightArr.length == 1){
         setBreakDialog(false);
        }
      }
    }
      // let mid = Math.floor(listToBreak.length / 2);
      // console.log('mid: ' + listToBreak[mid])
    } else {
      console.log('no objects');
      let mid = Math.floor(mainLeft.length / 2);
      let leftArr = mainLeft.slice(0, mid)
      let rightArr = mainLeft.slice(mid);
      console.log('left: ' + leftArr);
      console.log('right: ' + rightArr);
      setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
      setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
      //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
      setNestedStep(nestedStep + 1)
    }

    event.preventDefault();
  }

  function formSubmit(event) {
    let mid = Math.floor(firstList.length / 2);
    console.log('mic: ' + mid);
    if (firstList[mid] === breakNum) {
      console.log('this is correct');
      setScore(score + 1)
      let left = firstList.slice(0, mid)
      let right = firstList.slice(mid);
      if (mainLeft.length === 0) {
        setMainLeft(left);
        setMainRight(right);
        setBreakDialog(false);
        setShow(true);
        setIsLeft(true);
        //setNestedStep(nestedStep + 1);

      }

    } else {
      alert('wrong answer! please input correct answer');
      setScore(score - 1);
    }

    event.preventDefault();
  }
}

