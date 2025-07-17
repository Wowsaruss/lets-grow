import { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Text, View } from 'react-native';

export default function UnauthLayout() {
    const { accessToken } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (accessToken) {
            router.replace('/');
        }
    }, [accessToken, router]);

    return (
        <View>
            <Text>DEBUG: Unauth Layout Rendered</Text>
            <Slot />
        </View>
    );
} 