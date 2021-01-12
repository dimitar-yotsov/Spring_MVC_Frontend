import React from 'react';

/*

Basic style handling for the components

*/

const Container = (props) => (
        <div style={{width: '1000px', margin: 'auto', textAlign: 'center'}}>
            {props.children}
        </div>
);

export default Container;
