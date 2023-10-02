import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { format } from 'timeago.js';
import { Button } from '@mui/material';
import { AppealButton } from './AppealButton';

// Captures 0x + 4 characters, then the last 4 characters.
const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

/**
 * Truncates an ethereum address to the format 0x0000…0000
 * @param address Full address to truncate
 * @returns Truncated address
 */
const truncateEthAddress = (address) => {
  const match = address.match(truncateRegex);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
}

const columns = [
  {
    field: 'id', headerName: 'Status', width: 128, renderCell: (params) => {
      if (params.row.status === 1) {
        return <>Submitted</>
      } else if (params.row.status === 3) {
        return (
          <AppealButton id={params.row.id} />
        );
      } else {
        return <>Ended</>
      }
    }
  },
  { field: 'deal_id', headerName: 'Deal ID' },
  { field: 'client_actor_id', headerName: 'Client' },
  { field: 'provider_actor_id', headerName: 'Provider' },
  { field: 'size', headerName: 'Size', valueGetter: (params) => formatBytes(params.row.size.toString()) },
  { field: 'retrieval_value', headerName: 'Value', valueGetter: (params) => (params.row.retrieval_value.toString() + ' tFIL') },
  { field: 'retrieval_provider_collateral', headerName: 'Collateral', valueGetter: (params) => (params.row.retrieval_provider_collateral.toString() + ' tFIL') },
  { field: 'timestamp_request', headerName: 'Requested On', valueGetter: (params) => format(new Date(params.row.timestamp_request.toString())) },
  { field: 'owner', headerName: 'Owner', valueGetter: (params) => truncateEthAddress(params.row.owner) },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  // },
];

export default function DealsTable({ deals, ownerAddress }) {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={deals}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
      />
    </div>
  );
}