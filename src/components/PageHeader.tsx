import BackArrow from '../assets/BackArrow.png'
import '../css/button.css'
import Button from './Button'
import LoginButton from './LoginButton'
import LogoutButton from './LogoutButton'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
    title: string
    backButton?: boolean
    actionTitle?: string
    onActionPress?: () => void
}

const PageHeader = (props: Props) => {
    const { isAuthenticated } = useAuth0()
    // Remove the action button for the Plants page
    const hideActionButton = props.title === 'Plants';
    return (
        <div
            style={{
                zIndex: 9,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'sticky',
                top: 0,
                height: 70,
                width: '100%',
                boxShadow: '-5px 4px 10px rgba(151, 151, 151, 0.29)',
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
            <div style={{ marginRight: 25, display: 'flex', alignItems: 'center', gap: 10 }}>
                {!hideActionButton && !!props.onActionPress ? (
                    <Button
                        title={props.actionTitle ? props.actionTitle : ''}
                        onPress={props.onActionPress}
                    />
                ) : null}
                {isAuthenticated ? <LogoutButton /> : <LoginButton />}
            </div>
        </div>
    )
}

export default PageHeader
