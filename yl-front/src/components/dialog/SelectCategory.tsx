import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { Dispatch, SetStateAction, memo } from "react";
import useCategories from "../../hooks/useCategories";
import { Category } from "../../types/Category";
import { Expense } from "../../types/Expense";

interface SelectCategoryProps {
    categoryId: Category['id'];
    setSelectedItem: Dispatch<SetStateAction<Expense | undefined>>;
}

export const SelectCategory = memo(({ categoryId, setSelectedItem }: SelectCategoryProps) => {
    const { getCategories } = useCategories();
    const { data = [], isLoading, isFetching } = getCategories();

    const handleChange = (event: SelectChangeEvent<number>) => {
        const categoryId = event.target.value; 
        const selectedCategory = data.find((cat) => cat.id === categoryId) || null;

        setSelectedItem((prevState) =>
            prevState && ({ ...prevState, category: selectedCategory })
        );
    };

    return (
        <Select
            value={data.some(cat => cat.id === categoryId) ? categoryId : 0}
            onChange={handleChange}
            displayEmpty
            disabled={isLoading || isFetching}
        >
            <MenuItem value={0}>None</MenuItem>
            {data.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                    {cat.name}
                </MenuItem>
            ))}
        </Select>
    );
});
