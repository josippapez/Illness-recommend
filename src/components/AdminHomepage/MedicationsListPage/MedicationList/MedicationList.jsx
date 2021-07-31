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
              <td>{medication.name}</td>
              <td style={{ width: '600px', minWidth: '250px' }}>
                {medication.description}
              </td>
              <td>
                <button
                  id="link-to-student-page"
                  onClick={() => {
                    dispatch(medicationInfoFetched({ data: null }));
                    props.setMedicationId(medication.id);
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
  setMedicationId: PropTypes.func,
  setShowMedicationInfoModal: PropTypes.func,
};

export default MedicationList;
