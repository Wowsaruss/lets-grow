import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { ActivityIndicator, /* Appbar, */ Button, Card } from 'react-native-paper';
// import { ThemedText } from '@/components/ThemedText';

export default function MyGardenScreen() {
    const [loading, setLoading] = useState(false); // Set to false for debug
    const [userPlants, setUserPlants] = useState([]); // TODO: type this
    const [journalEntries, setJournalEntries] = useState([]); // TODO: type this

    useEffect(() => {
        // TODO: Fetch user plants and journal entries
        // setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" />
                <Text style={{ color: 'red', fontSize: 24 }}>DEBUG: Loading MyGarden</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={{ color: 'red', fontSize: 24 }}>DEBUG: MyGarden Rendered</Text>
            {/* <Appbar.Header>
                <Appbar.Content title="My Garden" />
            </Appbar.Header> */}

            <Card style={styles.section}>
                <Card.Title title="Your Plants" />
                <Card.Content>
                    {/* TODO: List user plants here */}
                    <Text>No plants yet.</Text>
                </Card.Content>
            </Card>

            <Card style={styles.section}>
                <Card.Title title="Journal Entries" />
                <Card.Content>
                    {/* TODO: List journal entries here */}
                    <Text>No journal entries yet.</Text>
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