import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import ListHeader from '../../../SharedComponents/ListHeader/ListHeader';
import '../../../../styles/ListTable.scss';
import { medicationInfoFetched } from '../../../../store/actions/medicationActions';

const PatientsList = props => {
  const dispatch = useDispatch();
  const [headers, setHeaders] = useState([
    {
      header: 'Ime i prezime',
      headerKey: 'name',
    },
    {
      header: 'OIB',
      headerKey: 'oib',
    },
    {
      header: 'Godine',
      headerKey: 'age',
    },
    {
      header: 'Akcije',
    },
  ]);
  return (
    <table style={{ width: '100%' }} className="list-table">
      <ListHeader setHeaders={setHeaders} headers={headers} />
      <tbody className="list-table__item-row">
        {props.patientsList.map(patient => {
          return (
            <tr className="spacer  item-row" key={patient.id}>
              <td>{patient.name}</td>
              <td>{patient.oib}</td>
              <td>{patient.age}</td>
              <td
                style={{ width: '10%', minWidth: '50px', padding: '10px 40px' }}
              >
                <button
                  id="link-to-medication-page"
                  onClick={() => {
                    props.setSelectedPatient(patient);
                    props.setShowPatientViewModal(true);
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

PatientsList.propTypes = {
  patientsList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setSelectedPatient: PropTypes.func,
  setShowPatientViewModal: PropTypes.func,
  setPatientsList: PropTypes.func,
  selectedPatientsList: PropTypes.array,
};

export default PatientsList;
