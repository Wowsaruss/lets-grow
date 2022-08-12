interface Props {
    header?: any
    children: any
}

const PageWrapper = (props: Props) => {
    return (
        <div>
            {props.header ? props.header : null}
            <div style={{ margin: 50 }}>{props.children}</div>
        </div>
    )
}

export default PageWrapper
