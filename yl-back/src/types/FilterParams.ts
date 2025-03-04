export interface FilterParams {
    sortBy?: 'createdAt' | 'updatedAt';
    sortDirection?: 'asc' | 'desc';
    startDate?: string; // ISO format (e.g., '2024-01-01T00:00:00.000Z')
    endDate?: string;   // ISO format
    pageIndex?: string,
    pageSize?: string
}
