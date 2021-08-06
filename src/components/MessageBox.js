import React from 'react'

const MessageBox = props => {
    return (
        <div className={` alert alert-${props.variant || 'danger'} p-4 mx-auto`} role="alert" style={{fontSize: '1.7rem'}}>
            {props.children}
            <button type="button" className="close" data-dismiss="alert" aria-label="Close" style={{fontSize: '2.4rem'}}>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

export default MessageBox
