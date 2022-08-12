interface Props {
    title: string
}

const PageHeader = (props: Props) => {
    return (
        <div
            style={{
                // position: 'fixed',
                height: 70,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
                boxShadow: '-5px 4px 10px #f2f2f2',
                paddingLeft: 25,
            }}
        >
            <h1>{props.title}</h1>
        </div>
    )
}

export default PageHeader
