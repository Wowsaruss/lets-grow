import BackArrow from '../BackArrow.png'

interface Props {
    title: string
    backButton?: boolean
    actionTitle?: string
    onActionPress?: () => void
}

const PageHeader = (props: Props) => {
    return (
        <div
            style={{
                zIndex: 1,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                height: 70,
                width: '100%',
                boxShadow: '-5px 4px 10px #f2f2f2',
                backgroundColor: 'white',
            }}
        >
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: props.backButton ? 0 : 25,
                }}
            >
                {props.backButton ? (
                    <div
                        onClick={() => window.history.back()}
                        style={{
                            cursor: 'pointer',
                            marginRight: 5,
                            marginLeft: 25,
                        }}
                    >
                        <img
                            src={BackArrow}
                            alt="back arrow"
                            height={40}
                            width={40}
                        />
                    </div>
                ) : null}
                <h1>{props.title}</h1>
            </div>
            <div style={{ marginRight: 25 }}>
                {!!props.onActionPress ? (
                    <button
                        style={{
                            padding: 10,
                            color: 'black',
                            backgroundColor: 'white',
                            border: 'none',
                            borderRadius: 3,
                            boxShadow: ' 2px 2px 9px -2px gray',
                        }}
                        onClick={props.onActionPress}
                    >
                        {props.actionTitle?.toUpperCase()}
                    </button>
                ) : null}
            </div>
        </div>
    )
}

export default PageHeader
