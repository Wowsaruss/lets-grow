import React, { useCallback, useState } from 'react';
import { StyleSheet, ImageBackground, View } from 'react-native';
import { Button, useTheme, Surface } from 'react-native-paper';
import * as AuthSession from 'expo-auth-session';
import { ThemedText } from '@/components/ThemedText';
import Constants from 'expo-constants';
import { useAuth } from '../context/AuthContext';

const AUTH0_DOMAIN = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH0_DOMAIN || 'YOUR_AUTH0_DOMAIN';
const AUTH0_CLIENT_ID = Constants.expoConfig?.extra?.EXPO_PUBLIC_AUTH0_CLIENT_ID || 'YOUR_AUTH0_CLIENT_ID';
const REDIRECT_URI = AuthSession.makeRedirectUri();

const discovery = {
    authorizationEndpoint: `https://${AUTH0_DOMAIN}/authorize`,
    tokenEndpoint: `https://${AUTH0_DOMAIN}/oauth/token`,
    revocationEndpoint: `https://${AUTH0_DOMAIN}/v2/logout`,
};

export default function LoginScreen() {
    const theme = useTheme();
    const { accessToken, setAccessToken } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleLogin = useCallback(async () => {
        setLoading(true);
        const authRequest = new AuthSession.AuthRequest({
            clientId: AUTH0_CLIENT_ID,
            redirectUri: REDIRECT_URI,
            responseType: AuthSession.ResponseType.Token,
            scopes: ['openid', 'profile', 'email'],
            extraParams: {
                audience: `https://${AUTH0_DOMAIN}/api/v2/`,
            },
        });
        await authRequest.promptAsync(discovery)
            .then(result => {
                if (result.type === 'success' && result.authentication?.accessToken) {
                    setAccessToken(result.authentication.accessToken);
                }
            })
            .finally(() => setLoading(false));
    }, [setAccessToken]);

    return (
        <ImageBackground
            source={require('@/assets/images/gardening-bg-1.jpg')}
            style={styles.bg}
            resizeMode="cover"
        >
            <View style={styles.overlay}>
                <Surface style={styles.surface} elevation={4}>
                    <ThemedText type="title" style={styles.header}>🌱 Grow Your Green Thumb Together</ThemedText>
                    <ThemedText style={styles.intro}>
                        <ThemedText style={styles.introBold}>Gardening doesn't have to be overwhelming.</ThemedText>
                    </ThemedText>
                    <ThemedText style={styles.paragraph}>
                        LetsGrow is built for simple-minded humans (like us!) who want to gain local knowledge about gardening by learning from other gardeners' successes and failures. Getting into gardening can be super overwhelming, and many people give up before they ever reach the exciting stuff.
                    </ThemedText>
                    <ThemedText style={styles.paragraph}>
                        <ThemedText style={styles.introBold}>That's where we come in.</ThemedText> We believe that every gardener, whether you're a complete beginner or a seasoned pro, has valuable experiences to share. By connecting gardeners in your area, you can learn what actually works in your specific climate, soil, and growing conditions.
                    </ThemedText>

                    <View style={styles.missionBox}>
                        <ThemedText type="subtitle" style={styles.missionTitle}>🎯 Our Mission</ThemedText>
                        <ThemedText style={styles.paragraph}>
                            To help people grow a greener thumb by making gardening knowledge accessible, local, and community-driven. No more trial and error alone – learn from your neighbors' experiences and share your own!
                        </ThemedText>
                    </View>

                    <View style={styles.featuresRow}>
                        <View style={styles.featureBox}>
                            <ThemedText style={styles.featureTitle}>🌿 Local Knowledge</ThemedText>
                            <ThemedText style={styles.featureDesc}>Learn what works in your specific area and climate</ThemedText>
                        </View>
                        <View style={styles.featureBox}>
                            <ThemedText style={styles.featureTitle}>🤝 Community</ThemedText>
                            <ThemedText style={styles.featureDesc}>Connect with fellow gardeners and share experiences</ThemedText>
                        </View>
                        <View style={styles.featureBox}>
                            <ThemedText style={styles.featureTitle}>📚 Learn & Grow</ThemedText>
                            <ThemedText style={styles.featureDesc}>Build your garden knowledge step by step</ThemedText>
                        </View>
                    </View>

                    <View style={styles.ctaBox}>
                        <ThemedText style={styles.ctaTitle}>Ready to start your gardening journey?</ThemedText>
                        <ThemedText style={styles.ctaDesc}>Join our community and discover the joy of growing together! 🌱</ThemedText>
                    </View>

                    <Button mode="contained" onPress={handleLogin} style={styles.button} loading={loading} disabled={loading}>
                        Log In with Auth0
                    </Button>
                    {accessToken && (
                        <ThemedText style={{ marginTop: 24, color: theme.colors.primary }}>Logged in!</ThemedText>
                    )}
                </Surface>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.95)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 0,
    },
    surface: {
        padding: 24,
        borderRadius: 15,
        margin: 20,
        maxWidth: 800,
        width: '95%',
        alignSelf: 'center',
        elevation: 4,
    },
    header: {
        color: '#2d5a27',
        textAlign: 'center',
        marginBottom: 24,
        fontWeight: 'bold',
        fontSize: 28,
    },
    intro: {
        marginBottom: 12,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '500',
    },
    introBold: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 12,
        color: '#333',
        textAlign: 'center',
    },
    missionBox: {
        backgroundColor: 'rgba(45, 90, 39, 0.1)',
        padding: 18,
        borderRadius: 10,
        marginVertical: 18,
        borderLeftWidth: 4,
        borderLeftColor: '#2d5a27',
    },
    missionTitle: {
        color: '#2d5a27',
        marginBottom: 8,
        fontWeight: 'bold',
        fontSize: 20,
    },
    featuresRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        marginTop: 18,
        marginBottom: 18,
    },
    featureBox: {
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        padding: 14,
        borderRadius: 8,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    featureTitle: {
        color: '#2d5a27',
        marginBottom: 6,
        fontWeight: 'bold',
        fontSize: 16,
    },
    featureDesc: {
        fontSize: 14,
        textAlign: 'center',
    },
    ctaBox: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 16,
        padding: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 10,
    },
    ctaTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 6,
        textAlign: 'center',
    },
    ctaDesc: {
        color: '#666',
        textAlign: 'center',
        fontSize: 15,
    },
    button: {
        width: 220,
        alignSelf: 'center',
        marginTop: 18,
    },
}); 