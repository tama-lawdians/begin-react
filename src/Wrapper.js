import React from 'react';

function Wrapper({children}) {
    const style = {
        border: '2px solid black', // 테두리
        padding: '16px', // 여백
    };
    return(
        <div style={style}>
            {children}
        </div>
    )
}

export default Wrapper;