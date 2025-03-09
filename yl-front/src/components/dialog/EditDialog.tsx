import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import useExpenses from "../../hooks/useExpenses";
import { Expense } from "../../types/Expense";
import { SelectCategory } from "./SelectCategory/SelectCategory";

interface EditDialogProps {
    item: Expense | undefined;
    mode: 'add' | 'edit';
    onClose: () => void;
};

// TODO handle errors (banner and logs)
// TODO handle memoization

export const EditDialog = ({ item, mode, onClose, setSelectedItem }: EditDialogProps) => {
    const { deleteExpenseMutation, updateExpenseMutation, createExpenseMutation } = useExpenses();
    const { isIdle: isDeleteIdle, isPending: isDeletePending, mutate: deleteMutate } = deleteExpenseMutation;
    const { isIdle: isUpdateIdle, isPending: isUpdatePending, mutate: updateMutate } = updateExpenseMutation;
    const { isIdle: isCreateIdle, isPending: isCreatePending, mutate: createMutate } = createExpenseMutation;

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSelectedItem((prevState) => {
            if (!prevState || prevState.description === value) {
                return prevState;
            }
            return {
                ...prevState,
                description: value,
            };
        });
    }

    const handleAmountChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        const numValue = Number(value);

        setSelectedItem((prevState) => {
            if (!prevState || prevState.amount === numValue) {
                return prevState;
            }
            return {
                ...prevState,
                amount: numValue
            };
        });
    }

    const handleDeleteClick = () => {
        if (!item?.id) {
            return;
        }
        deleteMutate(item.id, {
            onSuccess: onClose,
            onError: () => {
                // TODO log error msg and banner msg
            }
        });
    }

    const handleUpdateClick = () => {
        if (!item) {
            return;
        }

        updateMutate(item, {
            onSuccess: onClose,
            onError: () => {
                // TODO log error msg and banner msg
            }
        });
    }

    const handleCreateClick = () => {
        if (!item) {
            return;
        }

        createMutate(item, {
            onSuccess: onClose,
            onError: () => {
                // TODO log error msg and banner msg
            }
        });
    }

    const buttons = {
        cancel: {
            enabled: true,
        },
        delete: {
            enabled: true,
            loading: !isDeleteIdle && isDeletePending,
        },
        update: {
            enabled: (item?.description || "").length > 0 && (item?.amount || 0) > 0,
            loading: !isUpdateIdle && isUpdatePending,
        },
        add: {
            enabled: (item?.description || "").length > 0 && (item?.amount || 0) > 0,
            loading: !isCreateIdle && isCreatePending,
        },
    }

    buttons.cancel.enabled = !buttons.delete.loading && !buttons.update.loading && !buttons.add.loading;

    return (
        <Dialog open={Boolean(item)} onClose={onClose}>
            {mode === 'edit' ? <DialogTitle>{`Edit Item ${item?.id}`}</DialogTitle> : <DialogTitle>Add new item</DialogTitle>}
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="description"
                    name="description"
                    label="Description"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={item?.description || ""}
                    inputProps={{ minLength: 1 }}
                    onChange={handleDescriptionChange}
                    error={Boolean(!item?.description.length)}
                    helperText={!item?.description || "".length ? "Description is required" : ""}
                />
                <TextField
                    required
                    margin="dense"
                    id="amount"
                    name="amount"
                    label="Amount"
                    type="number"
                    fullWidth
                    variant="standard"
                    value={item?.amount ?? 10}
                    onChange={handleAmountChange}
                    error={(item?.amount ?? 10) <= 0}
                    helperText={(item?.amount ?? 10) <= 0 ? "Amount must be greater than 0" : ""}
                />
                <SelectCategory categoryId={item?.category?.id || 0} setSelectedItem={setSelectedItem} />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={!buttons.cancel.enabled}>Cancel</Button>
                {mode === 'edit' ?
                    <>
                        <Button variant="contained" color="error" onClick={handleDeleteClick} loading={buttons.delete.loading}>
                            Delete
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleUpdateClick} disabled={!buttons.update.enabled} loading={buttons.update.loading}>
                            Update
                        </Button>
                    </>
                    :
                    <Button variant="contained" color="primary" onClick={handleCreateClick} disabled={!buttons.add.enabled} loading={buttons.add.loading}>
                        Add
                    </Button>
                }
            </DialogActions>
        </Dialog>
    );
};
