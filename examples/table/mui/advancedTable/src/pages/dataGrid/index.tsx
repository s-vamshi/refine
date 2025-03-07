import React from "react";
import { Option, useSelect } from "@pankod/refine-core";
import {
    useDataGrid,
    DataGrid,
    GridColumns,
    GridToolbar,
    GridActionsCellItem,
    List,
    GridValueFormatterParams,
} from "@pankod/refine-mui";

import { ICategory, IPost } from "interfaces";

export const BasicDataGrid: React.FC = () => {
    const { dataGridProps } = useDataGrid<IPost>();

    const {
        options,
        queryResult: { isLoading },
    } = useSelect<ICategory>({
        resource: "categories",
        hasPagination: false,
    });

    const columns = React.useMemo<GridColumns<IPost>>(
        () => [
            {
                field: "id",
                headerName: "ID",
                type: "number",
                maxWidth: 70,
            },
            { field: "title", headerName: "Title", flex: 1, minWidth: 350 },
            {
                field: "category.id",
                headerName: "Category",
                flex: 1,
                type: "singleSelect",
                valueOptions: options,
                valueFormatter: (params: GridValueFormatterParams<Option>) => {
                    return params.value;
                },
                renderCell: function render({ row }) {
                    if (isLoading) {
                        return "Loading...";
                    }

                    const category = options.find(
                        (item) =>
                            item.value.toString() ===
                            row.category.id.toString(),
                    );
                    return category?.label;
                },
            },
            {
                field: "status",
                headerName: "Status",
                flex: 1,
                type: "singleSelect",
                valueOptions: ["draft", "published", "rejected"],
            },
            {
                field: "actions",
                type: "actions",
                headerName: "Actions",
                getActions: () => [
                    <GridActionsCellItem key={1} label="Delete" showInMenu />,
                    <GridActionsCellItem key={2} label="Print" showInMenu />,
                ],
            },
        ],
        [options, isLoading],
    );

    return (
        <List title="DataGrid Usage" headerProps={{ sx: { py: 0 } }}>
            <DataGrid
                {...dataGridProps}
                columns={columns}
                components={{
                    Toolbar: GridToolbar,
                }}
                autoHeight
            />
        </List>
    );
};
