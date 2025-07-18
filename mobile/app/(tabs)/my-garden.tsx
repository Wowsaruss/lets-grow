import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { ActivityIndicator, Appbar, Button, Card } from 'react-native-paper';
import { ThemedText } from '@/components/ThemedText';

export default function MyGardenScreen() {
    const [loading, setLoading] = useState(true);
    const [userPlants, setUserPlants] = useState([]); // TODO: type this
    const [journalEntries, setJournalEntries] = useState([]); // TODO: type this

    useEffect(() => {
        // TODO: Fetch user plants and journal entries
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
                <ThemedText>Loading your garden...</ThemedText>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Appbar.Header>
                <Appbar.Content title="My Garden" />
            </Appbar.Header>

            <Card style={styles.section}>
                <Card.Title title="Your Plants" />
                <Card.Content>
                    {/* TODO: List user plants here */}
                    <ThemedText>No plants yet.</ThemedText>
                </Card.Content>
            </Card>

            <Card style={styles.section}>
                <Card.Title title="Journal Entries" />
                <Card.Content>
                    {/* TODO: List journal entries here */}
                    <ThemedText>No journal entries yet.</ThemedText>
                </Card.Content>
                <Card.Actions>
                    <Button mode="contained" onPress={() => { /* TODO: Show add form */ }}>
                        Add Entry
                    </Button>
                </Card.Actions>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        paddingBottom: 32,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        marginBottom: 24,
    },
}); 