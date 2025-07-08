import '../css/button.css'

interface Props {
    title: string
    onPress?: () => void
    type?: "button" | "submit" | "reset" | undefined
    variant?: 'primary' | 'delete' | 'edit'
}

const Button = (props: Props) => {
    const variant = props.variant || (props.title?.toLowerCase() === 'delete' ? 'delete' : 'primary')
    let className = 'btn'
    if (variant === 'delete') className += ' btn--delete'
    else if (variant === 'edit') className += ' btn--edit'
    else className += ' btn--primary'
    return (
        <button
            className={className}
            onClick={props.onPress}
            type={props.type}
        >
            {props.title}
        </button>
    )
}

export default Button
