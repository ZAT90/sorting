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
  const [breakNum, setBreakNum] = useState(0);
  const [firstList, setFirstList] = useState([]);
  const [mainLeft, setMainLeft] = useState([]);
  const [mainRight, setMainRight] = useState([]);
  const [nestedLeft, setNestedLeft] = useState({ left: {}, right: {} });
  const [nestedRight, setNestedRight] = useState({ left: {}, right: {} });
  const [isLeft, setIsLeft] = useState(false);
  const [isRight, setIsRight] = useState(false);
  const [nestedStep, setNestedStep] = useState(0);
  const [score, setScore] = useState(0);
  const [show, setShow] = useState(false);
  const [nestBreakDialog, setNestBreakDialog] = useState(false);
  const [showConsole, setShowConsole] = useState(false);
  const [chooseNums, setChooseNums] = useState([]);
  const [startMerge, setStartMerge] = useState(false);
  const [dragArray, setDragArray] = useState([]);
  const [highlightDrag, setHighlightDrag] = useState(0);
  const [highlightLeft, setHighlightLeft] = useState(0);
  const [highlightRight, setHighlightRight] = useState(0);
  const [draggedNum, setDraggedNum] = useState({ side: '', number: null });
  const [isFurtherLeft, setIsFurtherLeft] = useState(false);
  const [isFurtherRight, setIsFurtherRight] = useState(false);
  const [isLeftRight,setIsLeftRight] = useState(false);
  // const [isFurtherLeftSorted, setIsFurtherLeftSorted] = useState(false);
  // const [isFurtherRightSorted, setIsFurtherRightSorted] = useState(false);



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
  function listItemsDivided(list, showGreen, hlit, key, text) {
    // console.log('key: ' + typeof parseInt(key));
    // console.log('nestedStep type: ' + typeof nestedStep);
    // console.log('nestedStep: ' + nestedStep);
    // console.log('parse key: ' + parseInt(key));
    // console.log('text: ' + text);
    if (Object.keys(list).length <= 0) return;
    return (
      list.map((number, i) =>
        <div style={{ marginLeft: 20, marginTop: 20 }}><Button
          draggable={hlit === i && parseInt(key) === nestedStep && startMerge ? true : false}
          onDragStart={(e) => setDraggedNum({ side: text, number: number })}
          style={{ backgroundColor: !showGreen ? 'grey' : hlit === i && parseInt(key) === nestedStep && startMerge ? 'red' : 'green' }} key={i} >{number}</Button></div>
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
    // setInitList(randomArrayRedo);
  }

  function startSorting() {
    if (levelName === 'easy') {
      if (firstList.length < 6) {
        alert("easy level has to select 6 numbers");
      } else {
        setIsFirstListSet(true);
        setBreakDialog(true);
        // setNumToCompare(firstList.length);
      }
    } else if (levelName === 'medium') {
      if (firstList.length < 8) {
        alert("medium level has to select 8 numbers");
      } else {
        setIsFirstListSet(true);
        setBreakDialog(true);
        //  setNumToCompare(firstList.length);
      }
    } else if (levelName === 'hard') {
      if (firstList.length < 10) {
        alert("hard level has to select 10 numbers");
      } else {
        setIsFirstListSet(true);
        setBreakDialog(true);
        //  setNumToCompare(firstList.length);
      }
    }

  }

  function dragCreate(count) {
    // console.log('nestedStep: ' + nestedStep);
    // console.log('isLeft: ' + isLeft);
    // console.log(nestedLeft);
    // console.log(nestedLeft.right[nestedStep]);
    // let count = leftArr.length + rightArr.length;
    // console.log('count: ' + count);
    let dragBoxes = Array.from(Array(count).keys());
    //console.log('dragBoxes: ' + dragBoxes);
    let dragArr = dragBoxes.map(newId => { return { index: newId, number: 0 } });
    console.log('dragArr: ' + dragArr);
    setDragArray(dragArr);
  }


  //nestedLeft.map((item, i) => console.log('item: ' + item));
  console.log('nestedstep out: ' + nestedStep)
  console.log(nestedLeft);
  console.log(nestedRight);
  console.log('draggedNum: ' + draggedNum);
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
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>{listItemsDivided(nestedLeft.left[keyleft], true, highlightLeft, keyleft, 'left')}</span></div>
                  )


                }
                {isRight &&
                  Object.keys(nestedRight.left).map(keyleft =>
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>{listItemsDivided(nestedRight.left[keyleft], true, highlightLeft, keyleft, 'left')}</span></div>
                  )


                }


              </div>

              <div >
                {isLeft &&
                  Object.keys(nestedLeft.right).map(keyright =>
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>
                      {nestedLeft.right[keyright].length > 0 && <img src={pipe} width='50' />}
                      {listItemsDivided(nestedLeft.right[keyright], true, highlightRight, keyright, 'right')}</span></div>
                  )


                }
                {isRight &&
                  Object.keys(nestedRight.right).map(keyright =>
                    <div><span style={{ color: 'black', display: 'flex', flexDirection: 'row' }}>
                      {nestedRight.right[keyright].length > 0 && <img src={pipe} width='50' />}
                      {listItemsDivided(nestedRight.right[keyright], true, highlightRight, keyright, 'right')}</span></div>
                  )


                }
                
              </div>
            </div>
            <GridWrapper>
              <GridWrapper>
                {startMerge &&
                  dragArray.map((item, i, arr) => <div style={{ alignItems: 'center', justifyContent: 'center', marginRight: 10 }}>
                    <div
                      onDrop={e => handleDrop(e)}
                      onDragOver={e => handleDragOver(e)}
                      onDragEnter={e => handleDragEnter(e)}
                      onDragLeave={e => handleDragLeave(e)}
                      style={
                        {
                          display: 'flex',
                          backgroundColor: highlightDrag === i ? 'red' : '#cdcdcd',
                          color: 'black',
                          width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center'
                        }
                      }>
                      {item.number}
                    </div>
                    <br />
                    <span style={{ marginLeft: 20, fontWeight: 'bold' }}>{item.index}</span>

                  </div>)}

              </GridWrapper>

            </GridWrapper>

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
              <Modal.Title>Corrct..!!</Modal.Title>
            </Modal.Header>
            <Modal.Body>Well Done! Let's start with left side first</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => {
                setShow(false);
                setBreakDialog(false);
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
    if (isFurtherLeft) {
      if (Object.keys(nestedLeft.left).length > 0) {
        event.preventDefault();
        let test = Object.keys(nestedLeft.left).map(key => { return nestedLeft.left[key] });
        console.log( test);
        let listToBreak = test[nestedStep - 1];
        console.log('listToBreak: ' + listToBreak);
        //console.log('test0 length' + listToBreak.length);
        if (listToBreak.length > 1) {
          let mid = Math.floor(test[0].length / 2);
          //console.log('mid: ' + mid);
          let leftArr = test[0].slice(0, mid)
          let rightArr = test[0].slice(mid);
          //console.log('left: ' + leftArr);
          //console.log('right: ' + rightArr);
          if (leftArr.length === 1 && rightArr.length === 1) {
            console.log('set break dialog false here');
            setNestBreakDialog(false);
            setStartMerge(true);
            dragCreate(leftArr.length+rightArr.length)
          } else {
            setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
            setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
            setNestedStep(nestedStep + 1);
          }

          // //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
          //console.log('nestedstep befor set:' + nestedStep)

          //console.log('nestedstep after set:' + nestedStep)
          //console.log('leftarray length: ' + leftArr.length);
          //console.log('rightArr length: ' + rightArr.length);

        } else {
          setIsLeftRight(true);
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

            if (leftArr.length == 1 && rightArr.length == 1) {
              console.log('set break dialog false here');
              setNestBreakDialog(false);
              setStartMerge(true);
              dragCreate(leftArr.length+rightArr.length)
            } else if (leftArr.length == 1 && rightArr.length > 1) {
              console.log('divide right array further');
            } else {
              setNestedStep(nestedStep + 1);
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
      //FURTHER RIGHT SIDE WORKS ARE HERE
    } else {
      console.log(Object.keys(nestedRight.left).length);
      if(Object.keys(nestedRight.left).length > 0){
        event.preventDefault();
        let test = Object.keys(nestedRight.left).map(key => { return nestedRight.left[key] });
        console.log( test);
        let listToBreak = test[nestedStep - 1];
        console.log('listToBreak: ' + listToBreak);
        //console.log('test0 length' + listToBreak.length);
        console.log('nestedStep: '+nestedStep)
        //return;
        if (listToBreak.length > 1) {
          let mid = Math.floor(test[0].length / 2);
          //console.log('mid: ' + mid);
          let leftArr = test[0].slice(0, mid)
          let rightArr = test[0].slice(mid);
          //console.log('left: ' + leftArr);
          //console.log('right: ' + rightArr);
          if (leftArr.length === 1 && rightArr.length === 1) {
            console.log('set break dialog false here');
            setNestBreakDialog(false);
            setStartMerge(true);
            dragCreate(leftArr.length+rightArr.length)
          } else {
            setNestedRight((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
            setNestedRight((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
            setNestedStep(nestedStep + 1);
          }

          // //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
          //console.log('nestedstep befor set:' + nestedStep)

          //console.log('nestedstep after set:' + nestedStep)
          //console.log('leftarray length: ' + leftArr.length);
          //console.log('rightArr length: ' + rightArr.length);

        } else {
          setIsLeftRight(true);
          let test = Object.keys(nestedRight.right).map(key => { return nestedRight.right[key] });
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
            setNestedRight((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
            setNestedRight((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
            // //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});

            if (leftArr.length == 1 && rightArr.length == 1) {
              console.log('set break dialog false here');
              setNestBreakDialog(false);
              setStartMerge(true);
              dragCreate(leftArr.length+rightArr.length)
            } else if (leftArr.length == 1 && rightArr.length > 1) {
              console.log('divide right array further');
            } else {
              setNestedStep(nestedStep + 1);
            }
          }
        }
      }else{
        event.preventDefault();
        console.log('no objects');
        console.log('nested step first time right: '+nestedStep)
        let mid = Math.floor(mainRight.length / 2);
        let leftArr = mainRight.slice(0, mid)
        let rightArr = mainRight.slice(mid);
        console.log('left: ' + leftArr);
        console.log('right: ' + rightArr);
        console.log('nestedStep: '+nestedStep);
        setNestedRight((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: leftArr } }));
        setNestedRight((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
        //setNestedLeft({ ...nestedLeft, left: {[nestedStep]: leftArr}});
        setNestedStep(nestedStep + 1)
      }
    }

    event.preventDefault();
  }

  function formSubmit(event) {
    let mid = Math.floor(firstList.length / 2);
    console.log('mic: ' + firstList[mid]);
    console.log('mic: ' + breakNum);
    if (firstList[mid] === breakNum) {
      console.log('this is correct');
      setScore(score + 1)
      let left = firstList.slice(0, mid)
      let right = firstList.slice(mid);
      console.log(mainLeft.length)
      if (mainLeft.length === 0) {
        setMainLeft(left);
        setMainRight(right);
        setBreakDialog(false);
        setShow(true);
        setIsLeft(true);
        setIsFurtherLeft(true)
        //setNestedStep(nestedStep + 1);

      }

    } else {
      alert('wrong answer! please input correct answer');
      setScore(score - 1);
    }

    event.preventDefault();
  }

  function handleDrop(e, index) {
    let myArray = [];
    e.preventDefault();
    e.stopPropagation();
    // console.log(draggedNum)
    // console.log(nestedLeft.left[nestedStep][0]);
    if(isFurtherLeft){
      nestedLeft.left[nestedStep].map(item => myArray.push(item))
      nestedLeft.right[nestedStep].map(item => myArray.push(item))
    }else{
      nestedRight.left[nestedStep].map(item => myArray.push(item))
      nestedRight.right[nestedStep].map(item => myArray.push(item))
    }
   
    let mySorted = myArray.sort(function (a, b) { return a - b });
    console.log('mysorted: ' + mySorted);
    console.log('dragged number:' + draggedNum.number);
    //console.log(draggedNum.side);
    console.log('highlight left: ' + highlightLeft);
    console.log('highlight right: ' + highlightRight);
    console.log('highlight drag: ' + highlightDrag);
    console.log('mysorted highlight: ' + mySorted[highlightDrag]);
    if (draggedNum.number === mySorted[highlightDrag]) {
      dragArray[highlightDrag].number = draggedNum.number;
      setDragArray(dragArray)

      setDragArray(dragArray.map(item => {
        if (item.index !== highlightDrag) return item
        return { ...item, number: draggedNum.number }
      }));
      setHighlightDrag(highlightDrag + 1)
      if (draggedNum.side === 'left') {
        setHighlightLeft(highlightLeft + 1);
      } else {
        setHighlightRight(highlightRight + 1)
      }
      console.log('highlightDrag: ' + highlightDrag);
      if (highlightDrag + 1 === mySorted.length ) {
        console.log(dragArray)
        let newSorted = dragArray.map(drg => drg.number);
        console.log('newSorted: ' + newSorted);
        console.log('draggedNum.side: ' + draggedNum.side);
        //if(draggedNum.side === 'left'){
          if(isFurtherLeft){
            setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: {} } }));
            setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: {} } }));
          }else{
            setNestedRight((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep]: {} } }));
            setNestedRight((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: {} } }));
          }
        
        if (isFurtherLeft) {
          if(levelName==='easy'){
            if(nestedStep === 0){
             setMainLeft([]);
             setMainLeft(newSorted);
             setIsFurtherRight(true);
            setIsFurtherLeft(false)
            setNestBreakDialog(true);
            setDragArray([]);
            setHighlightDrag(0);
            setHighlightLeft(0);
            setHighlightRight(0);
            setStartMerge(false);
            if(!nestedStep-1 === -1){
              setNestedStep(nestedStep-1);
            }
             setDraggedNum({side: '',number : null})
             setIsRight(true);
             setIsLeft(false)
            }else{
              setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep - 1]: newSorted } }));
            }
            
          }else{
            setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep - 1]: newSorted } }));
          }
          
        }else if(isFurtherRight){
          if(levelName==='easy'){
            if(nestedStep === 0){
             setMainRight([]);
             setMainRight(newSorted);
             setIsFurtherRight(false);
            setIsFurtherLeft(false)
            setDragArray([]);
            dragCreate(6);
            setHighlightDrag(0);
            setHighlightLeft(0);
            setHighlightRight(0);
            //setStartMerge(false);
            if(!nestedStep-1 === -1){
              setNestedStep(nestedStep-1);
            }
             setDraggedNum({side: '',number : null})
             setIsRight(false);
             setIsLeft(false)
            }else{

              setNestedRight((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep - 1]: newSorted } }));
            }
            
          }else{
            setNestedLeft((prevState) => ({ ...prevState, left: { ...prevState.left, [nestedStep - 1]: newSorted } }));
          }
        } else {
          setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep - 1]: newSorted } }));
        }

        console.log('nestedstep after sort: ' + nestedStep);
        if (nestedStep === 1) {
          if(levelName==='easy'){
            if(!nestedStep-1 === -1){
              setNestedStep(nestedStep-1);
            }
            
             setHighlightDrag(0);
            setHighlightLeft(0);
            setHighlightRight(0);
            setDragArray([]);
            dragCreate(3)
          }else{
            setIsFurtherRight(true);
            setIsFurtherLeft(false)
            setNestBreakDialog(true);
            setDragArray([]);
            setHighlightDrag(0);
            setHighlightLeft(0);
            setNestedStep(nestedStep-1)
            setHighlightRight(0);
            setStartMerge(false);
             setDraggedNum({side: '',number : null})
          }
         
        } else {
          console.log('do this logic')
        }
        // setNestedStep(nestedStep-1)
        // setHighlightDrag(0);
        // setHighlightLeft(0);
        // setHighlightRight(0);
        //}

        // setNestedLeft((prevState) => ({ ...prevState, right: { ...prevState.right, [nestedStep]: rightArr } }));
        console.log(nestedLeft)
        console.log('remove nestedstep items and replace previous nestedstep');
      }
      // dragArray[highlightDrag].number = draggedNum.number;
      // setDragArray(prevArray=>[...prevArray,dragArray])
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
  }
}

