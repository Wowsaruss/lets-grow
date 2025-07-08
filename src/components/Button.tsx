import '../css/button.css'

interface Props {
    title: string
    onPress?: () => void
    type?: "button" | "submit" | "reset" | undefined
    variant?: 'primary' | 'delete'
}

const Button = (props: Props) => {
    const variant = props.variant || (props.title?.toLowerCase() === 'delete' ? 'delete' : 'primary')
    return (
        <button
            className={
                variant === 'delete'
                    ? 'btn btn--delete'
                    : 'btn btn--primary'
            }
            onClick={props.onPress}
            type={props.type}
        >
            {props.title}
        </button>
    )
}

export default Button
