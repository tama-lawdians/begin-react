import React, {useState, useRef} from 'react';

function InputSample(){
    const [inputs, setInputs] = useState({
        name: '',
        nickname: ''
    });
    const nameInput = useRef(); // ref 객체 생성 > 원하는 DOM에 ref값 설정

    const {name, nickname} = inputs; // 비구조화 할당으로 값 추출

    const onChange = (e) => {
        const {name, value} = e.target; // e.target 에서 name, value 추출
        setInputs({
            ...inputs, // 기존 input 객체 복사 후 // ...은 spread 문법 : 객체 내용을 모두 펼쳐서 기존 객체를 복사
            [name]: value // name키의 값을 value로 설정
        });
    };
    
    const onReset = () => {
        setInputs({
            name: '',
            nickname: '',
        })
        nameInput.current.focus();   // ref 객체의 .current값이 원하는 DOM으로. // focus() : 함수의 input에 포커스하는 API 
    };

    return(
        <div>
            <input name="name" placeholder="이름" onChange={onChange} value={name} ref={nameInput}/>
            <input name="nickname" placeholder="닉네임" onChange={onChange} value={nickname}/>
            <button onClick={onReset}>초기화</button>
            <div>
                <b>이름: {name}</b><br/>
                <b>닉네임: {nickname}</b> 
            </div>
        </div>
    );
}

export default InputSample;