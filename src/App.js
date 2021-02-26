// 1.2
// import React, {useState, useRef, useMemo, useCallback} from 'react';
// //import Hello from './Hello';
// import Wrapper from './Wrapper';
// //import Counter from './Counter';
// //import InputSample from './InputSample';
// import UserList from './UserList';
// import CreateUser from './CreateUser';

// function countActiveUsers(users){
//   console.log('활성 사용자 수를 세는중...');
//   return users.filter(user => user.active).length;
// }

// function App() {
//   const [inputs, setInputs] = useState({
//     username: '',
//     email: ''
//   });
//   const {username, email} = inputs;
//   const onChange = useCallback(
//     e => {
//       const {name, value} = e.target;
//       setInputs({
//         ...inputs,
//         [name]: value
//       });
//     }, [inputs]
//   );
//   const [users, setUsers] = useState([
//     {
//       id: 1,
//       username: 'velopert',
//       email: 'velo@gmail.com',
//       active: true
//   },
//   {
//       id: 2,
//       username: 'tester',
//       email: 'tester@example.com',
//       active: false
//   },
//   {
//       id:3,
//       username: 'liz',
//       email: 'liz@example.com',
//       active: false
//   }
//   ]);

//   const nextId = useRef(4); // 4가 .current 의 기본값
//   const onCreate = useCallback(() => {
//     const user = {
//       id: nextId.current,
//       username,
//       email
//     };
//     // setUsers([...users, user]); // spread 이용
//     setUsers(users => users.concat(user)); // .concat 이용 : 배열 추가

//     setInputs({
//       username: '',
//       email: ''
//     });
//     nextId.current += 1;
//   }, [username, email]);

//   const onRemove = useCallback(
//     id => {
//       // user.id 가 파라미터로 일치하지 않는 원소만 추출해 새로운 배열 만듦
//       // = user.id가 id인 것을 제거함
//       setUsers(users => users.filter(user => user.id !== id));
//     },
//     []
//   );

//   const onToggle = useCallback(
//     id => {
//       setUsers(users =>
//         users.map(user => user.id === id ? {...user, active : !user.active} : user)
//       );
//     }, []);

//   const count = useMemo( () => countActiveUsers(users), [users]); 
//   // 첫 파라미터 : 어떻게 연산할지 함수, 두 번째 : deps 배열(배열 내용이 바뀌면, 첫 파라미터 함수를 실행, 아니면 이전값 재사용)

//   return (
//     <Wrapper>
//       {/* <Hello name="react" color="red" isSpecial/>
//       <Hello color="pink"/>
//       <Counter/>
//       <br/>
//       <InputSample/>
//       <br/> */}
//       <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
//       <UserList users={users} onRemove={onRemove} onToggle={onToggle}/>
//       <div>활성 사용자 수 : {count}</div>
//     </Wrapper>
//   );
// }

// export default App;

// 1.20 App 컴포넌트를 useReducer로 구현하기
import React, {useState, useRef, useMemo, useCallback, useReducer} from 'react';
import UserList from './UserList';
import CreateUser from './CreateUser';
import useInputs from './hooks/useInputs';
import produce from 'immer';

function countActiveUsers(users){
  console.log('활성 사용자 수를 세는중...');
  return users.filter(user => user.active).length;
}

const initialState = {
  inputs: {
    username: '',
    email: ''
  },
  users: [
    {
      id: 1,
      username: 'velopert',
      email: 'velo@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id:3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]
};

function reducer(state, action){
  switch (action.type){
    // case 'CHANGE_INPUT':
    //   return{
    //     ...state,
    //     inputs:{
    //       ...state.inputs,
    //       [action.name]: action.value
    //     }
    //   };
    // case 'CREATE_USER':
    //   return{
    //     // inputs: initialState.inputs,
    //     users: state.users.concat(action.user)
    //   };
    case 'CREATE_USER':
      return produce(state, draft => {
        draft.users.push(action.user);
      });
    // case 'TOGGLE_USER':
    //   return{
    //     ...state,
    //     users: state.users.map(user =>
    //       user.id === action.id ? {...user, active: !user.active} : user
    //     )
    //   };
    case 'TOGGLE_USER':
      return produce(state, draft => {
        const user = draft.users.find(user => user.id === action.id); // action.id와 같은 걸 찾아서 action 변경
        user.active = !user.active;
      });
    // case 'REMOVE_USER':
    //   return{
    //     ...state,
    //     users: state.users.filter(user => user.id !== action.id)
    //   };
    case 'REMOVE_USER':
      return produce(state, draft => {
        const index = draft.users.findIndex(user => user.id === action.id); // action.id와 같은 애의 index를 찾아서 삭제
        draft.users.splice(index, 1);
      });
    default:
      return state;
  }
}

// UserDispatch 라는 이름으로 내보내기
export const UserDispatch = React.createContext(null);

function App() {
  const [{username, email}, onChange, reset] = useInputs({
    username: '',
    email:''
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const nextId = useRef(4);

  const {users} = state;

  // const onChange = useCallback(e => {
  //   const {name, value} = e.target;
  //   dispatch({
  //     type: 'CHANGE_INPUT',
  //     name,
  //     value
  //   });
  // }, []);

  const onCreate = useCallback(() => {
    dispatch({
      type: 'CREATE_USER',
      user: {
        id:nextId.current,
        username,
        email
      }
    });
    reset();
    nextId.current +=1;
    }, [username, email, reset]);
  
  // const onToggle = useCallback(id => {
  //   dispatch({
  //     type: 'TOGGLE_USER',
  //     id
  //   });
  // }, []);

  // const onRemove = useCallback(id => {
  //   dispatch({
  //     type: 'REMOVE_USER',
  //     id
  //   });
  // }, []);

  const count = useMemo( () => countActiveUsers(users), [users]);
  return (
    <UserDispatch.Provider value={dispatch}>
      <CreateUser 
        username={username} 
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      />
      {/* <UserList users={users} onToggle={onToggle} onRemove={onRemove}/> */}
      <UserList users={users} />
      <div>활성 사용자 수 : {count}</div>
    </UserDispatch.Provider>
  );
}

export default App;