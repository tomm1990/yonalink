
import { Download } from "@mui/icons-material";
import { Button, Card, CardActions, CardContent, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import ExpenseApi from "../services/expense.api";
import { Filter } from "../types/Filter";

interface MonthlyExpenseSummaryProps {
    total: number;
    filter: Filter;
};

export const MonthlyExpenseSummary = ({ total, filter }: MonthlyExpenseSummaryProps) => {
    const [loading, setLoading] = useState(false);

    const handleDownload = async () => {
        setLoading(true);

        const abortController = new AbortController();
        const signal = abortController.signal;
        try {
            const blob = await ExpenseApi.download({
                signal,
                filter
            })

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'expenses.csv';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading CSV:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ p: 2, textAlign: "center", mx: "auto" }}>
            <CardContent>
                <Typography variant="h6" color="text.secondary">
                    Total Expenses for this Month
                </Typography>
                <Typography variant="h4" color="primary" >
                    ${total.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={loading ? <CircularProgress size={20} /> : <Download />}
                    onClick={handleDownload}
                    disabled={loading}
                >
                    {loading ? 'Downloading...' : 'Download CSV'}
                </Button>
            </CardActions>
        </Card>
    );
};
