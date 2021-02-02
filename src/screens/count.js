import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Modal } from 'react-bootstrap';
import { NavigationBar } from "../components/NavigationBar";
import Popup from 'reactjs-popup';

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
  nestedForDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 10 },
  nestedForConsole: { display: 'flex', flex: 0.5, backgroundColor: '#cdcdcd', justifyContent: 'center', color: 'black', flexDirection: 'column', paddingLeft: 10 },
  nestedForText: { display: 'flex', flex: 0.5, marginLeft: 10, alignItems: 'center', },
  functionDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginTop: 30 },
  functionText: { display: 'flex', flex: 0.5, alignItems: 'center', },
  functionConsole: { display: 'flex', flex: 0.5, backgroundColor: 'black', justifyContent: 'center', color: 'white', flexDirection: 'column', paddingLeft: 10 },
  ifDiv: { display: 'flex', flexDirection: 'row', marginLeft: 10, marginBottom: 30 },
  ifConsole: { display: 'flex', flex: 0.3, backgroundColor: 'red', justifyContent: 'center', color: 'white' },
  ifText: { display: 'flex', flex: 0.7, marginLeft: 10 },
}

const GridWrapper = styled.div`
  display: grid;
  grid-gap: 10px;
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: minmax(25px, auto);
`;
export function Count() {

  const [isLevel, setIsLevel] = useState(false);
  const [levelName, setLevelName] = useState('');
  const [isFirstListSet, setIsFirstListSet] = useState(false);
  const [initList, setInitList] = useState([]);
  const [firstList, setFirstList] = useState([]);
  const [score, setScore] = useState(0);
  const [numToCompare, setNumToCompare] = useState(0);
  const [showConsole, setShowConsole] = useState(false);
  const [chooseNums, setChooseNums] = useState([]);
  const [objList, setObjList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [highest, setHighest] = useState(null);
  const [isHighest, setIsHighest] = useState(false);
  const [isCount, setIsCount] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const [ctHighlight, setCtHighlight] = useState(0);
  const [countArray, setCountArray] = useState([]);
  const [finalArray, setFinalArray] = useState([]);
  const [countDone, setCountDone] = useState(false);

  function generateChooseList(level) {
    //console.log('gamelevel: ' + gameLevel);
    setLevelName(level);
    setIsLevel(true);
    const randomArray = Array.from({ length: 42 }, () => Math.floor(Math.random() * 8));
    // let s = new Set(randomArray);
    // let it = s.values();
    // const randomArrayRedo = Array.from(it);
    setChooseNums(randomArray);
    setInitList(randomArray);
  }
  function chooseItems() {
    return (
      chooseNums.map((number, i) =>
        <Button
          onClick={() => firstListGenerator(i, number)}
          style={{ backgroundColor: objList.some(item => item.index === i) ? 'yellowgreen' : 'green' }} key={i} >{number}</Button>
      )
    )
  }

  function listItems() {
    return (
      firstList.map((number, i) =>
        <Button
          draggable={isCount && i === highlight ? true : false}
          onDragStart={(e) => console.log('drag is started: ' + number)}
          style={{ backgroundColor: isCount && i === highlight && !countDone ? 'red' : 'green', cursor: 'move' }} key={i} >{number}</Button>
      )
    )
  }

  function finalItems() {
    return (
      finalArray.map((number, i) =>
        <Button
          style={{ backgroundColor: 'turquoise', color: 'black' }} key={i} >{number}</Button>
      )
    )
  }

  function firstListGenerator(index, number) {
    console.log('level name: ' + levelName);
    if (objList.some(item => item.index === index)) {
      const removeList = objList.filter(item => item.index !== index);
      setObjList(removeList);
    } else {
      if (levelName === 'easy') {
        if (firstList.length < 6) {
          setObjList(prevArray => [...prevArray, { index, number }])

        } else {
          alert("beginner level can only select 6 numbers");

        }
      } else if (levelName === 'medium') {
        if (firstList.length < 8) {
          setObjList(prevArray => [...prevArray, { index, number }])
        } else {
          alert("medium level can only select 8 numbers");
        }
      } else if (levelName === 'hard') {
        if (firstList.length < 10) {
          setObjList(prevArray => [...prevArray, { index, number }])
        } else {
          alert("hard level can only select 10 numbers");
        }
      }
    }
  }

  function startSorting() {
    if (levelName === 'easy') {
      if (objList.length < 6) {
        alert("easy level has to select 6 numbers");
      } else {
        let newArray = objList.map(item => item.number);
        setFirstList(newArray);
        setIsFirstListSet(true);
        setNumToCompare(objList.length);
        setOpenDialog(true);
      }
    } else if (levelName === 'medium') {
      if (objList.length < 8) {
        alert("medium level has to select 8 numbers");
      } else {
        setIsFirstListSet(true);
        setNumToCompare(objList.length);
      }
    } else if (levelName === 'hard') {
      if (objList.length < 10) {
        alert("hard level has to select 10 numbers");
      } else {
        setIsFirstListSet(true);
        setNumToCompare(objList.length);
      }
    }

  }
  function handleDrop(e, index) {
    e.preventDefault();
    e.stopPropagation();
    console.log('index: ' + index);
    console.log('highlight: ' + firstList[highlight]);
    console.log('e on drop: ' + e);
    if (index === firstList[highlight]) {
      setCountArray(countArray.map(item => {
        if (item.index !== index) return item
        return { ...item, count: item.count + 1 }
      }));
      if(highlight+1 < firstList.length){
        setHighlight(highlight + 1);
        setScore(score + 1);
      }else{
        setCountDone(true);
      }
      

    } else {
      alert('dragged to wrong box! score deducted')
      setScore(score - 1);
    }
  };
  function handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log('e on dragEnter: ' + e);
  };
  function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log('e on dragLeave: ' + e);
  };
  function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    // console.log('e on dragOver: ' + e);
  };
  // objList.map((item, i) => console.log('item: ' + item.number));
  console.log('finalArray: ' + finalArray);
  //console.log('object list: '+objList.index);
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
            {!isFirstListSet &&
              <GridWrapper>

                {chooseItems()}

              </GridWrapper>

            }
            {isFirstListSet && <GridWrapper>
              {listItems()}
            </GridWrapper>}
            {isCount &&
              <div style={{ marginTop: 100 }}>
                <GridWrapper>
                  {countArray.map((item, i, arr) =>
                    <div style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                      <div
                        onDrop={e => handleDrop(e, item.index)}
                        onDragOver={e => handleDragOver(e)}
                        onDragEnter={e => handleDragEnter(e)}
                        onDragLeave={e => handleDragLeave(e)}
                        style={
                          {
                            display: 'flex',
                            backgroundColor: highlight === firstList.length && i === ctHighlight ? 'red' : '#cdcdcd',
                            color: highlight === firstList.length && i === ctHighlight ? 'white' : 'black',
                            width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center'
                          }
                        }>
                        {item.count}
                      </div>
                      <br />
                      <span style={{ marginLeft: 20, fontWeight: 'bold' }}>{item.index}</span>

                    </div>)}


                </GridWrapper>
                {finalArray.length > 0 && countDone ?
                  <div /> :
                  countDone && <div style={styles.swapDiv}>
                    <Button onClick={() => { ignore() }} style={styles.swapBtn} >Ignore</Button>
                  &nbsp;&nbsp;&nbsp;
                  <Button onClick={() => { addCount() }} style={styles.swapBtn} >Add</Button>
                  </div>}
              </div>}
            {!isFirstListSet && <div style={styles.swapDiv}>
              <Button onClick={() => startSorting()} style={styles.startBtn} >Start Sorting</Button>
            </div>}
          </div>}
          {finalArray.length > 0 && <GridWrapper>

            {finalItems()}

          </GridWrapper>}
          {finalArray.length > 0 && ctHighlight === countArray.length &&
            <div><h2 style={styles.completeMsg}>Well done! You have completed the game</h2>
              <Button onClick={() => window.location.reload()} style={styles.newGameBtn} >Start new Game</Button>
            </div>
          }
          <Popup open={openDialog} closeOnDocumentClick={false} modal>
            <div style={{ backgroundColor: 'grey', color: 'white', padding: 20 }}>
              What is the highest number in the list
              <form onSubmit={(event) => formSubmit(event)}>

                <input type="number" value={highest} onChange={(e) => highestNum(e)} />

                <input type="submit" value="Submit" />
              </form>
            </div>
          </Popup>
        </div>
        <div style={{ flex: 0.4 }}>{showConsole && consoleView()}</div>
      </div>

    </div>

  );
  function ignore() {
    console.log(countArray[ctHighlight]);
    if (countArray[ctHighlight].count == 0) {
      setCtHighlight(ctHighlight + 1);
      setScore(score + 1);
    } else {
      setScore(score - 1);
      alert('wrong answer! score deducted');
    }
  }
  function addCount() {
    let i = 0;
    console.log(countArray[ctHighlight]);
    if (countArray[ctHighlight].count > 0) {
      for (i === 0; i < countArray[ctHighlight].count; i++) {
        console.log('check the loop: ' + countArray[ctHighlight].count);
        setFinalArray(prevArray => [...prevArray, countArray[ctHighlight].index]);
      }
      setCtHighlight(ctHighlight + 1);
      setScore(score + 1);
    } else {
      setScore(score - 1);
      alert('wrong answer! score deducted');
    }
  }
  function createCount(high) {
    console.log('this is high: ' + high);
    let newArray = Array.from(Array(high + 1).keys());
    let counting = newArray.map(newId => { return { index: newId, count: 0 } });
    console.log('newArray: ' + newArray);
    console.log('counting: ' + counting);
    setCountArray(counting);
  }

  function formSubmit(event) {

    let arrayMax = Math.max.apply(null, firstList);
    if (highest === arrayMax) {
      setOpenDialog(false);
      setScore(score + 1);
      setIsCount(true);
      createCount(highest);
      setIsHighest(true);

    } else {
      setScore(score - 1);
      alert('wrong answer! score deducted');
    }
    event.preventDefault();
  }

  function highestNum(event) {
    console.log(event.target.value);
    setHighest(parseInt(event.target.value));
  }

  function toggleModal() {
    setOpenDialog(!openDialog);
  }

  function consoleView() {
    let ctIndex = firstList[highlight];
    console.log('ctIndex: '+ctIndex);
    //console.log('countArray: '+countArray[ctIndex].count);
    return (
      <div style={styles.consoleDiv}>
        <div style={styles.consoleDiv2}>
          <span style={styles.consoleHeader}>Console</span>
          <span style={{ marginLeft: 10 }}>data = [ {firstList.map((item, i, arr) => <span>{item} {i != (arr.length - 1) ? ',' : ''}</span>)}]</span>
          <span style={{ marginLeft: 10 }}>def countingSort(listToSort, max):</span>
          {isHighest && <span style={{ marginLeft: 10 }}> &nbsp;&nbsp;&nbsp;size = len(listToSort)</span>}
          {isHighest && <div style={styles.nestedForDiv}>

          <div style={styles.nestedForText}>count = [0] * (max + 1)
          
        </div>
        <div style={styles.nestedForConsole}>
            count = [0] * {countArray.length}
          </div>
        </div>}
        {isHighest && highlight > 0 && <div style={styles.nestedForDiv}>
        <div style={styles.nestedForText}>for i in range of (0, size) :
        </div>
          <div style={styles.nestedForConsole}>

            i -&gt; 0....{firstList.length}
          <br />
            <span style={{ marginLeft: 10 }}>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{returnNestedRange(firstList.length).map((item, i, arr) => <span style={{ color: highlight === i ? '#228B22' : 'black' }}>{item} {i != (arr.length - 1) ? ',' : ''}</span>)}
            </span>
          </div>

          
        </div>}
        {isHighest && <div style={styles.nestedForDiv}>

          <div style={styles.nestedForText}>count[ listToSort [i] ] = count[listToSort [i] ] + 1

          </div>
          <div style={styles.nestedForConsole}>
             i = {highlight}<br/>
             listToSort [{highlight}] = {firstList[highlight]}<br/>
             count[{firstList[highlight]}] = {countArray[ctIndex].count}  {countDone?'':'+ 1'}
             </div>
           </div>}
          {isFirstListSet && <div style={styles.functionDiv}>
          

          <div style={styles.functionText}>countingSort(data, max(data))
        </div>
        <div style={styles.functionConsole}>
            max = {isHighest && highest > 0?highest:'?'}
          </div>
        </div>}
          
          {isFirstListSet && firstList.length - numToCompare > 0 && <span style={{ marginLeft: 10 }}>size = len(array)</span>}
        </div>

      </div>
    )
  }

  function returnNestedRange(nums) {
    console.log('nums: '+nums)
    let arr = [...Array(nums).keys()];
    console.log('arr: '+arr);
    return arr;
  }
}