import React, {useContext} from 'react';
import {UserDispatch} from './App';

// function User({user, onRemove, onToggle}){
//     // useEffect(() => {
//     //     console.log('컴포넌트가 화면에 나타남');
//     //     return() => {
//     //         console.log('컴포넌트가 화면에서 사라짐');
//     //     };
//     // }, []); // useEffect()의 첫번째 파라미터는 함수(여기서는 애로우), 두번째 파라미터는 의존값이 들어있는 배열(deps)(비워두면 처음만 호출)

//     // useEffect(()=>{
//     //     console.log('user값이 설정됨');
//     //     console.log(user);
//     //     return () => {
//     //         console.log('user가 바뀌기 전');
//     //         console.log(user);
//     //     };
//     // }, [user]); // useEffect() 내부에 props가 있다면, deps에 넣어줘야한다!

//     useEffect(() => {
//         console.log(user);
//     });

//     return(
//         <div>
//             <b style={{cursor: 'pointer', color: user.active ? 'green' : 'black'}}
//             onClick={() => onToggle(user.id)}>{user.username}</b>
//             &nbsp;
//             <span>({user.email})</span>
//             <button onClick={() => onRemove(user.id)}>삭제</button>
//         </div>
//     )
// }

// React.memo를 통한 컴포넌트 최적화
// const User = React.memo(function User({user, onRemove, onToggle}){
const User = React.memo(function User({user}){
    const dispatch = useContext(UserDispatch);

    return(
        <div>
            <b style={{cursor: 'pointer', color: user.active ? 'green' : 'black'}}
            onClick={() => {
                dispatch({type: 'TOGGLE_USER', id: user.id});
            }}
            >
                {user.username}
            </b>
            &nbsp;
            <span>({user.email})</span>
            <button onClick={() => {
                dispatch({type: 'REMOVE_USER', id: user.id});
            }}>삭제</button>
        </div>
    )
})

// function UserList({users, onRemove, onToggle}){
function UserList({users}){
    // const users = [
    //     {
    //         id: 1,
    //         username: 'velopert',
    //         email: 'velo@gmail.com'
    //     },
    //     {
    //         id: 2,
    //         username: 'tester',
    //         email: 'tester@example.com'
    //     },
    //     {
    //         id:3,
    //         username: 'liz',
    //         email: 'liz@example.com'
    //     }
    // ];
    return(
        <div>
            {/* <User user={users[0]}/>
            <User user={users[1]}/>
            <User user={users[2]}/> */}

            {/* 동적 배열일 때는 map()을 이용해 렌더링 */}
            {/* {users.map(user=>(
                <User 
                    user={user} 
                    key={user.id} 
                    onRemove={onRemove} 
                    onToggle={onToggle}
                />
            ))} */}
            {users.map(user=>(
                <User 
                    user={user} 
                    key={user.id}/>
            ))}

            {/* 고유값이 없을 때는 map의 콜백함수 두번째 파라미터 index를 키로
            {users.map((user, index) => (
                <User user={user} key={index}/>
            ))} */}
        </div>
    );
}
export default React.memo(UserList);
//export default UserList;