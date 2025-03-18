
import { Clear, Search } from "@mui/icons-material";
import {
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    styled,
} from "@mui/material";
import { ChangeEvent, useCallback, useState } from "react";
import { Filter } from "../types/Filter";
import { debounce } from "../utils/debounce";

const StyledFormControl = styled(FormControl)({
    maxWidth: "400px",
    backgroundColor: "#fff",
});

interface SearchInputProps {
    filter?: Filter;
    onChange: (value: string) => void;
}

export const SearchInput = ({ onChange }: SearchInputProps) => {
    const [value, setValue] = useState<string>('');

    const debouncedOnChange = useCallback(debounce(onChange, 1000), []);

    const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        debouncedOnChange(newValue);
    }

    const handleClearClick = () => {
        setValue('');
        onChange('');
    };

    return (
        <StyledFormControl>
            <InputLabel htmlFor="expense-search-filter-input">Search item</InputLabel>
            <OutlinedInput
                id="expense-search-filter-input"
                label="Search item"
                value={value}
                onChange={changeInputHandler}
                startAdornment={
                    <InputAdornment position="start">
                        <Search aria-label="search icon" />
                    </InputAdornment>
                }
                endAdornment={
                    value && <InputAdornment position="end">
                        <IconButton onClick={handleClearClick} aria-label="clear search">
                            <Clear />
                        </IconButton>
                    </InputAdornment>
                }
                aria-label="search input"
            />
        </StyledFormControl>
    );
};
