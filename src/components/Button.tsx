import '../css/button.css'

interface Props {
    title: string
    onPress?: () => void
    type?: "button" | "submit" | "reset" | undefined
}

const Button = (props: Props) => {
    return (
        <button
            className={
                props.title?.toLowerCase() === 'delete'
                    ? 'redbtn redbtn--action'
                    : 'grnbtn grnbtn--action'
            }
            onClick={props.onPress}
            type={props.type}
        >
            {props.title?.toUpperCase()}
        </button>
    )
}

export default Button
