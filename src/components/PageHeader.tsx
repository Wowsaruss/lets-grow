import BackArrow from '../BackArrow.png'

interface Props {
    title: string
    backButton?: boolean
}

const PageHeader = (props: Props) => {
    return (
        <div
            style={{
                // To-do: This header needs to be changed so that it is fixed into place.
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
            {props.backButton ? (
                <div
                    onClick={() => window.history.back()}
                    style={{ cursor: 'pointer', marginRight: 5 }}
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
    )
}

export default PageHeader
