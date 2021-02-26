// import React, {useState} from 'react';

// function Counter() {
//     // const numberState = useState(0);
//     // const number = numberState[0];
//     // const setNumber = numberState[1];

//     // 위 세 줄을 배열 비구조화 할당으로 각 원소 추출
//     const [number, setNumber] = useState(0);

//     // const onIncrease = () => {
//     //     setNumber(number + 1);
//     // }
//     // const onDecrease = () => {
//     //     setNumber(number - 1);
//     // }

//     // 함수형 업데이트 : 최적화 시 사용
//     const onIncrease = () => {
//         setNumber(prevNumber => prevNumber + 1);
//     }
//     const onDecrease = () => {
//         setNumber(prevNumber => prevNumber - 1);
//     }

//     const [count, setCount] = useState(0);

//     // const onClick = () => {
//     //     setCount(count+1);
//     //     setCount(count+1);
//     //     console.dir(count);
//     // }

//     const onClick = () => {
//         setCount(count=>count+1);
//         setCount(count=>count+1);
//         console.dir(count);
//     }

//     return(
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>

//             <h1>{count}</h1>
//             <button onClick={onClick}>+1</button>
//             <button onClick={onClick}>-1</button>
//         </div>
//     );
// }

// export default Counter;

// useReducer를 이용한 상태 업데이트
// import React, {useReducer} from 'react';

// function reducer(state, action){
//     switch(action.type){
//         case 'INCREMENT':
//             return state + 1;
//         case 'DECREMENT':
//             return state - 1;
//         default:
//             return state;
//     }
// }

// function Counter(){
//     const [number, dispatch] = useReducer(reducer, 0);

//     const onIncrease = () => {
//         dispatch({type: 'INCREMENT'});
//     };

//     const onDecrease = () => {
//         dispatch({type: 'DECREMENT'});
//     };

//     return(
//         <div>
//             <h1>{number}</h1>
//             <button onClick={onIncrease}>+1</button>
//             <button onClick={onDecrease}>-1</button>
//         </div>
//     );
// }

// export default Counter;

import React, {Component} from 'react';

class Counter extends Component{
    // 생성자 함수 : 최초 제일 먼저 실행
    constructor(props){
        super(props);
        this.state = {
            counter: 0,
            fixed: 1,
            updateMe: {
                toggleMe: false,
                dontChangeMe: 1
            }
        }; // 클래스에서 state 는 무조건 객체 형태
        this.handleIncrease = this.handleIncrease.bind(this); // bind 작업
    };

    // 내부 종속 함수를 '메서드' 라고 한다. 이름은 보통 handle로 시작한다.
    handleIncrease(){
        console.log('Iecrease');
        this.setState({
            counter: this.state.counter + 1
        });
        //console.log(this); // undefined. << 이벤트 발생 시 관계가 끊어지기 때문. bind 필요
    };

    handleDecrease = () => {
        console.log('Decrease');
        this.setState({
            counter: this.state.counter - 1
        });
        //console.log(this);
    };

    handleToggle = () => {
        this.setState(state => ({
            updateMe: {
                ...this.state.updateMe,
                toggleMe: !this.state.updateMe.toggleMe
            }
        }));
    };

    render(){
        return(
            <div>
                <h1>{this.state.counter}</h1>
                <button onClick={this.handleIncrease}>+1</button>
                <button onClick={this.handleDecrease}>-1</button>
                <p>고정값: {this.state.fixed}</p>
                <button onClick={this.handleToggle}>현재활동상태 {this.state.updateMe.toggleMe}</button>
                <p>돈타치: {this.state.updateMe.dontChangeMe}</p>
            </div>
        );
    };
}

export default Counter;