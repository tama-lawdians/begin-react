// import React from 'react'; // 컴포넌트 불러오기

// // function Hello() {
// //     return <div style={{ color: props.color }}>안녕하세요 {Props.name}</div>
// // }

// // 위와 같음(cf. props. 를 쓰고 안쓰고)
// function Hello({color, name, isSpecial}){
//     return (
//         <div style={{color}}>
//             {/* 삼항연산자는 조건부 */}
//             {/* {isSpecial ? <b>*</b> : null} */}

//             {/* 단순히 true, false 일 경우 */}
//             {isSpecial && <b>*</b>}
//             안녕하세요 {name}
//         </div>
//     );
// }

// // default값 설정하기
// Hello.defaultProps = {
//     name: '이름없음'
// }

// export default Hello; // 컴포넌트 내보내기

// 클래스형 컴포넌트로 작성하기
import React, {Component} from 'react';

class Hello extends Component{
    static defaultProps = {
        name: '이름없음'
    };
    render(){ // class 에는 render()가 꼭 필요
        const {color, name, isSpecial} = this.props; // props 조회할 때는 꼭 this.
        return(
            <div style={{color}}>
                {isSpecial && <b>*</b>}
                안녕하세요 {name}
            </div>
        );
    }
}

// Hello.defaultProps = {
//     name: '이름없음'
// };

export default Hello;