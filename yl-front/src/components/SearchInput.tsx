import {
    FormControl,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    styled,
} from "@mui/material";
import { ChangeEventHandler, memo } from "react";
import { Filter } from "../types/Filter";

const StyledFormControl = styled(FormControl)({
    maxWidth: "400px",
    backgroundColor: "#fff",
});

interface SearchInputProps {
    filter?: Filter;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const SearchInput = memo(({ filter, onChange }: SearchInputProps) => {
    console.log({ ...filter });
    return (
        <StyledFormControl>
            <InputLabel htmlFor="expense-search-filter-input">Search item</InputLabel>
            <OutlinedInput
                id="expense-search-filter-input "
                label="Search item"
                aria-label="Search item input"
                defaultValue={""}
                onChange={onChange}
                startAdornment={
                    <InputAdornment position="start">
                    </InputAdornment>
                }
            />
        </StyledFormControl>
    );
});
