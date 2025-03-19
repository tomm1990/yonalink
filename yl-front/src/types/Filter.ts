export interface Filter {
    sortBy?: 'createdAt' | 'updatedAt';
    sortDirection?: 'asc' | 'desc';
    description?: string,
    startDate?: string; // ISO format (e.g., '2024-01-01T00:00:00.000Z')
    endDate?: string;   // ISO format
    pageIndex?: string,
    pageSize?: string
}
