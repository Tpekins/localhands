import { useState } from 'react'
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
    GridSlotProps,
    GridAlignment,
    GridActionsCellItemProps,
} from '@mui/x-data-grid';
import {
    randomId
} from '@mui/x-data-grid-generator';

interface RowUpdateModel extends GridRowModel {
    id: string | GridRowId;
    action?: "edit" | "add"
}
export interface RowModel extends GridRowModel {
    id: string | GridRowId
    action?: "edit" | "add"
}



// export interface customActionsProps {
//     component: CustomGridActionComponentType
//     props: GridActionsCellItemProps, 
//     func: (id: GridRowId) => () => void
// }

interface TableProps {
    tableStyles?: BoxProps;
    rowHeight?: number;
    width?: string;
    height?: string;
    rows: RowModel[];
    columns: GridColDef[];
    setRows: React.Dispatch<any>;
    // deleting?: boolean;
    deleting?: boolean;
    // deletingProps?: actionProps;
    editing?: boolean;
    showToolbar?: boolean;
    showPagination?: boolean;
    showFooter?: boolean;
    showNoSelectedRows?: boolean;
    sortable?: boolean,
    filterable?: boolean,
    aggregable?: boolean,
    hideable?: boolean,
    disableColumnMenu?: boolean,
    editable?: boolean,
    groupable?: boolean,
    pinnable?: boolean,
    resizable?: boolean,
    hideSortIcons?: boolean,
    disableReorder?: boolean,
    disableExport?: boolean,
    align?: GridAlignment,
    headerAlign?: GridAlignment,
    loading?: boolean;
    // setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
    loadingVariant?: "linear-progress" | "skeleton"
    nowRowsOverlay?: boolean;
    nowResultsOverlay?: boolean;
    // loadingOverlay?: boolean; this provides a custom overlay that can be used. to be implemented later

    //function props to be used when action buttons are pressed on a table row
    deleteFunction?: (id: string | GridRowId) => void;
    editFunction?: (id: string | GridRowId, data?: GridRowModel) => Promise<boolean>;

    customActions?: {
        props: GridActionsCellItemProps,
        func: (id: GridRowId) => () => void,
        perRowDisplay?: (id: GridRowId) => boolean
    }[]
}


declare module '@mui/x-data-grid' {
    interface ToolbarPropsOverrides {
        setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
        setRowModesModel: (
            newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
        ) => void;
    }
}

function EditToolbar(props: GridSlotProps['toolbar']) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = randomId();
        setRows((oldRows) => [
            ...oldRows,
            { id, name: '', age: '', role: '', isNew: true },
        ]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add record
            </Button>
        </GridToolbarContainer>
    );
}


export default function Table({
    columns, rows, setRows,
    deleting, editing, 
    // deletingProps,
    width, height, rowHeight,
    loading, loadingVariant, nowResultsOverlay, nowRowsOverlay,
    deleteFunction, editFunction,
    showFooter, showNoSelectedRows, showPagination, showToolbar,
    customActions,
    tableStyles, ...columnProps
}: TableProps) {
    let cols: GridColDef[] = columns.map((column) => ({ ...columnProps, ...column }))
    const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRows(rows.map((row) => (row.id === id ? { ...row, action: "edit" } : row)))
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {

        // if (deletingProps?.showDialog) {
        //     handleActionDialogOpen(id)
        // } else
         if (deleteFunction) {
            deleteFunction(id)
        }
        // console.log(rows.find(row => row.id === id), "here is the row to delete")
        // setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = async (newRow: RowUpdateModel) => {
        const updatedRow = { ...newRow, isNew: false };
        const { action, isNew, id, ...restOfRow } = updatedRow
        if (action === 'edit' && editFunction) {
            // console.log("your are trying to edit the row with this id", id)
            const success = await editFunction(id, restOfRow)
            console.log(success, rows, restOfRow, "is the value of succes in the table component")
            if (!success) {
                setRows(rows.map(({ action, ...rest }) => ({ ...rest })))
            }
        }
        // setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };

    const actionsCol: GridColDef = {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
            const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

            if (isInEditMode) {
                return [
                    <GridActionsCellItem
                        icon={<SaveIcon />}
                        label="Save"
                        sx={{
                            color: 'primary.main',
                        }}
                        onClick={handleSaveClick(id)}
                    />,
                    <GridActionsCellItem
                        icon={<CancelIcon />}
                        label="Cancel"
                        className="textPrimary"
                        onClick={handleCancelClick(id)}
                        color="inherit"
                    />,
                ];
            }

            return [
                ...editing ? [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />
                ] : [],
                ...deleting ? [
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />
                ] : [],
                ...customActions ? customActions.map(({ props, func, perRowDisplay }) => {
                    if (perRowDisplay) {
                        return <GridActionsCellItem  {...props} onClick={func(id)} sx={{ ...!perRowDisplay(id) && { display: "none" } }} />
                    } else {
                        return <GridActionsCellItem  {...props} onClick={func(id)} />
                    }
                }) : []
            ];
        },
    }

    //checking if to add the actions column or not 
    deleting || editing || customActions ? cols = [...cols, actionsCol] : cols = cols;


    return (
        <Box
            sx={{
                height: height || 300,
                width: width || "100%",
                '& .actions': {
                    color: 'text.secondary',
                },
                '& .textPrimary': {
                    color: 'text.primary',
                },
                ...tableStyles
            }}
        >
            <DataGrid
                rows={rows}
                columns={cols}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                {...(loading) && { loading: true }}
                slots={{
                    ...(showToolbar) && { toolbar: EditToolbar },
                    //for now a standard component will be used for the custom no rows overlay
                    // ...(nowRowsOverlay) && { noRowsOverlay: CustomNoRowsOverlay },
                    // ...(nowResultsOverlay) && { noResultsOverlay: CustomNoResultsOverlay }
                }}
                slotProps={{
                    ...(showToolbar) && { toolbar: { setRows, setRowModesModel } },
                    ...(loadingVariant) && { loadingOverlay: { variant: loadingVariant, noRowsVariant: loadingVariant } },
                }}
                {...(!showPagination) && { hideFooterPagination: true }}
                {...(!showFooter) && { hideFooter: true }}
                {...(!showNoSelectedRows) && { hideFooterSelectedRowCount: true }}
                {...(rowHeight) && { rowHeight }}
            />
            {/* {deletingProps?.showDialog && 
            <ActionDialog
                message={deletingProps.showDialog.message}
                title={deletingProps.showDialog.title}
                // openFunc={handleActionDialogOpen}
                closeFunc={handleActionDialogClose}
                state={openDialog}
                actionFunc={deleteFunction}
                confirmColor={deletingProps.showDialog.confirmColor}
                cancelColor={deletingProps.showDialog.cancelColor}
            />} */}
        </Box>
    );
}




// const columns: GridColDef[] = [
//     { field: 'name', headerName: 'Name', width: 180, editable: true },
//     {
//       field: 'age',
//       headerName: 'Age',
//       type: 'number',
//       width: 80,
//       align: 'left',
//       headerAlign: 'left',
//       editable: true,
//     },
//     {
//       field: 'joinDate',
//       headerName: 'Join date',
//       type: 'date',
//       width: 180,
//       editable: true,
//     },
//     {
//       field: 'role',
//       headerName: 'Department',
//       width: 220,
//       editable: true,
//       type: 'singleSelect',
//       valueOptions: ['Market', 'Finance', 'Development'],
//     },
//     {
//       field: 'actions',
//       type: 'actions',
//       headerName: 'Actions',
//       width: 100,
//       cellClassName: 'actions',
//       getActions: ({ id }) => {
//         const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

//         if (isInEditMode) {
//           return [
//             <GridActionsCellItem
//               icon={<SaveIcon />}
//               label="Save"
//               sx={{
//                 color: 'primary.main',
//               }}
//               onClick={handleSaveClick(id)}
//             />,
//             <GridActionsCellItem
//               icon={<CancelIcon />}
//               label="Cancel"
//               className="textPrimary"
//               onClick={handleCancelClick(id)}
//               color="inherit"
//             />,
//           ];
//         }

//         return [
//           <GridActionsCellItem
//             icon={<EditIcon />}
//             label="Edit"
//             className="textPrimary"
//             onClick={handleEditClick(id)}
//             color="inherit"
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             label="Delete"
//             onClick={handleDeleteClick(id)}
//             color="inherit"
//           />,
//         ];
//       },
//     },
//   ];


// const initialRows: GridRowsProp = [
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 25,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//     number: "5999999999",
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 36,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 19,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 28,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
//   {
//     id: randomId(),
//     name: randomTraderName(),
//     age: 23,
//     joinDate: randomCreatedDate(),
//     role: randomRole(),
//   },
// ];

// const roles = ['Market', 'Finance', 'Development'];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };