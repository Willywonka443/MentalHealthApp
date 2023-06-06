import { useParams, useNavigate } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import { TextField, Button, Box, Grid, Switch, FormLabel } from "@mui/material";
import React, { useState, useEffect } from "react";
import client from "../apolloClient";


const GET_JOURNAL_ENTRY = gql`
  query GetJournalEntry($journalId: ID!) {
    journal(where: { id: $journalId }) {
      id
      accomplishment
      gratitude
      learning
      struggle
      lookingForward
      access
      entryDate
    }
  }
`;

const UPDATE_JOURNAL_ENTRY = gql`
  mutation UpdateJournalEntry($journalId: ID!, $input: JournalUpdateInput!) {
    updateJournal(where: { id: $journalId }, data: $input) {
      id
      stage
    }
  }
`;

const PUBLISH_JOURNAL_ENTRY = gql`
  mutation publishJournal($journalId: ID!) {
    publishJournal(where: { id: $journalId }, to: PUBLISHED) {
      id
    }
  }
`;

export default function EditEntry() {
    const { journalId } = useParams();
    const navigate = useNavigate();
    const [entryData, setEntryData] = useState({
        accomplishment: "",
        gratitude: "",
        learning: "",
        struggle: "",
        lookingForward: "",
        access: false, // Initialize as a boolean
        entryDate: "",
    });

    const { loading, error, data } = useQuery(GET_JOURNAL_ENTRY, {
        client,
        variables: { journalId },
    });

    useEffect(() => {
        if (data && data.journal) {
            const { accomplishment, gratitude, learning, struggle, lookingForward, access, entryDate } = data.journal;
            setEntryData({ accomplishment, gratitude, learning, struggle, lookingForward, access, entryDate });
        }
    }, [data]);

    const [updateJournalEntry] = useMutation(UPDATE_JOURNAL_ENTRY, {
        client,
    });

    const [publishJournalEntry] = useMutation(PUBLISH_JOURNAL_ENTRY, {
        client,
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEntryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAccessChange = (event) => {
        setEntryData((prevData) => ({
            ...prevData,
            access: event.target.checked,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const { data } = await updateJournalEntry({
            variables: {
              journalId,
              input: entryData,
            },
            refetchQueries: [{ query: GET_JOURNAL_ENTRY, variables: { journalId } }],
          });
      
          const entryId = data.updateJournal.id;
          const published = data.updateJournal.stage;
      
          await publishJournalEntry({
            variables: { journalId: entryId, data: { stage: published } },
          });
      
          navigate("/past"); // Navigate back to the past journals page after successful update and publish
        } catch (error) {
          console.error("Error updating and publishing journal entry:", error);
        }
      };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#b0c4de", // App background color
            }}
        >
            <Box
                sx={{
                    width: 400,
                    p: 4,
                    border: "1px solid",
                    borderColor: "#6495ed", // Border color
                    borderRadius: 4,
                    backgroundColor: "#87ceeb", // Card background color
                }}
            >
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Accomplished"
                                name="accomplishment"
                                value={entryData.accomplishment}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Grateful"
                                name="gratitude"
                                value={entryData.gratitude}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Learned"
                                name="learning"
                                value={entryData.learning}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Struggled"
                                name="struggle"
                                value={entryData.struggle}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Looking Forward"
                                name="lookingForward"
                                value={entryData.lookingForward}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Entry Date"
                                name="entryDate"
                                value={entryData.entryDate}
                                onChange={handleInputChange}
                                fullWidth
                                margin="normal"
                                variant="outlined"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormLabel>Access</FormLabel>
                            <Switch
                                label="Access"
                                name="access"
                                checked={entryData.access}
                                onChange={handleAccessChange}
                                color="primary" // Switch color
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" fullWidth sx={{
                                backgroundColor: '#0047ab'
                            }}>
                                Update and Publish
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </Box>
    );
}