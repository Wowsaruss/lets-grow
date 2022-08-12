import React from 'react'

const PageWrapper = (props: any) => {
    return (
        <div>
            {props.header ? props.header : null}
            <div style={{margin: 50}}>{props.children}</div>
        </div>
    )
}

export default PageWrapper
