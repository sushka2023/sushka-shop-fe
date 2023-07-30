export const COLUMNS = [
    {
        header: 'Номер',
        accessor: 'id',
    },
    {
        header: 'Назва товару',
        accessor: 'name',
    },
    {
        header: 'Опис',
        accessor: 'description',
    },
    {
        header: 'Змінити',
        accessor: 'actions',
        Cell: ({ cell }) => (
            <>
                <button></button>
                <button></button>
            </>
        )
    },
];