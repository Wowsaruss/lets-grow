import PageHeader from '../PageHeader'
import PageWrapper from '../PageWrapper'
import gardeningBg from '../../assets/gardening-bg-1.jpg'

const Home = () => {
    return (
        <div
            style={{
                backgroundImage: `url(${gardeningBg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                width: '100%',
                position: 'relative'
            }}
        >
            <PageWrapper header={<PageHeader title="Welcome to LetsGrow" />}>
                <div
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        padding: '40px',
                        borderRadius: '15px',
                        margin: '20px',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        maxWidth: '800px',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}
                >
                    <h1 style={{
                        color: '#2d5a27',
                        textAlign: 'center',
                        marginBottom: '30px',
                        fontSize: '2.5rem',
                        fontWeight: 'bold'
                    }}>
                        🌱 Grow Your Green Thumb Together
                    </h1>

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#333' }}>
                        <p style={{ marginBottom: '20px', textAlign: 'center', fontSize: '1.3rem', fontWeight: '500' }}>
                            <strong>Gardening doesn't have to be overwhelming.</strong>
                        </p>

                        <p style={{ marginBottom: '20px' }}>
                            LetsGrow is built for simple-minded humans (like us!) who want to gain local knowledge about gardening by learning from other gardeners' successes and failures. Getting into gardening can be super overwhelming, and many people give up before they ever reach the exciting stuff.
                        </p>

                        <p style={{ marginBottom: '20px' }}>
                            <strong>That's where we come in.</strong> We believe that every gardener, whether you're a complete beginner or a seasoned pro, has valuable experiences to share. By connecting gardeners in your area, you can learn what actually works in your specific climate, soil, and growing conditions.
                        </p>

                        <div style={{
                            backgroundColor: 'rgba(45, 90, 39, 0.1)',
                            padding: '25px',
                            borderRadius: '10px',
                            margin: '30px 0',
                            borderLeft: '4px solid #2d5a27'
                        }}>
                            <h3 style={{ color: '#2d5a27', marginBottom: '15px' }}>🎯 Our Mission</h3>
                            <p style={{ margin: 0 }}>
                                To help people grow a greener thumb by making gardening knowledge accessible, local, and community-driven. No more trial and error alone – learn from your neighbors' experiences and share your own!
                            </p>
                        </div>

                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                            gap: '20px',
                            marginTop: '30px'
                        }}>
                            <div style={{
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: '#2d5a27', marginBottom: '10px' }}>🌿 Local Knowledge</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    Learn what works in your specific area and climate
                                </p>
                            </div>

                            <div style={{
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: '#2d5a27', marginBottom: '10px' }}>🤝 Community</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    Connect with fellow gardeners and share experiences
                                </p>
                            </div>

                            <div style={{
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                padding: '20px',
                                borderRadius: '8px',
                                textAlign: 'center'
                            }}>
                                <h4 style={{ color: '#2d5a27', marginBottom: '10px' }}>📚 Learn & Grow</h4>
                                <p style={{ margin: 0, fontSize: '0.95rem' }}>
                                    Build your garden knowledge step by step
                                </p>
                            </div>
                        </div>

                        <div style={{
                            textAlign: 'center',
                            marginTop: '40px',
                            padding: '20px',
                            backgroundColor: 'rgba(255, 255, 255, 0.7)',
                            borderRadius: '10px'
                        }}>
                            <p style={{ margin: '0 0 15px 0', fontSize: '1.2rem', fontWeight: '500' }}>
                                Ready to start your gardening journey?
                            </p>
                            <p style={{ margin: 0, color: '#666' }}>
                                Join our community and discover the joy of growing together! 🌱
                            </p>
                        </div>
                    </div>
                </div>
            </PageWrapper>
        </div>
    )
}

export default Home
