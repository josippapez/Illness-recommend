import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ListHeader from '../../../SharedComponents/ListHeader/ListHeader';
import '../../../../styles/ListTable.scss';
import { medicationInfoFetched } from '../../../../store/actions/medicationActions';
import { Table } from 'reactstrap';

const MedicationList = props => {
  const dispatch = useDispatch();
  const [headers, setHeaders] = useState([
    {
      header: 'Naziv',
      headerKey: 'name',
    },
    {
      header: 'Opis',
      headerKey: 'description',
    },
    {
      header: 'Akcije',
    },
  ]);
  return (
    <table style={{ width: '100%' }} className="list-table">
      <ListHeader setHeaders={setHeaders} headers={headers} />
      <tbody className="list-table__item-row">
        {props.medicationList.map(medication => {
          return (
            <tr className="spacer  item-row" key={medication.id}>
              <td style={{ width: '10%', minWidth: '50px' }}>
                {medication.name}
              </td>
              <td
                style={{
                  maxWidth: 0,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {medication.description}
              </td>
              <td style={{ width: '10%', minWidth: '50px' }}>
                <button
                  id="link-to-medication-page"
                  onClick={() => {
                    dispatch(medicationInfoFetched({ data: null }));
                    props.setSelectedMedication(medication);
                    props.setShowMedicationInfoModal(true);
                  }}
                >
                  Odaberi
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

MedicationList.propTypes = {
  medicationList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedMedication: PropTypes.func,
  setShowMedicationInfoModal: PropTypes.func,
};

export default MedicationList;
