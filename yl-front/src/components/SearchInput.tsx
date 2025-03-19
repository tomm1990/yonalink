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
import { useSearchParams } from "react-router-dom";
import { Filter } from "../types/Filter";
import { debounce } from "../utils/debounce";

const StyledFormControl = styled(FormControl)({
    maxWidth: "400px",
    backgroundColor: "#fff",
});

interface SearchInputProps {
    onInputChange: <T extends keyof Filter>(key: T, value: Filter[T]) => void
}

export const SearchInput = ({ onInputChange }: SearchInputProps) => {
    const [searchParams] = useSearchParams();
    const [value, setValue] = useState<string>(searchParams.get('description') ?? '');

    const debouncedOnChange = useCallback(debounce((value: string) => {
        onInputChange('description', value);
    }, 1000), [onInputChange]);

    const changeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setValue(newValue);
        debouncedOnChange(newValue);
    }

    const handleClearClick = () => {
        setValue('');
        onInputChange('description', '');
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
