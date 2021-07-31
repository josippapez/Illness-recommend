import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './MedicationListPage.scss';

import DataDisplay from '../../SharedComponents/DataDisplay/DataDisplay';
import MedicationInfoModal from './MedicationInfoModal/MedicationInfoModal';
import MedicationList from './MedicationList/MedicationList';

import { getAllMedications } from '../../../store/actions/medicationActions';

const MedicationListPage = props => {
  const dispatch = useDispatch();
  const medicationList = useSelector(state => state.medicationList);

  const [showUserInfoModal, setShowUserInfoModal] = useState(false);
  const [medicationId, setMedicationId] = useState(null);
  useEffect(() => {
    dispatch(getAllMedications());
  }, []);

  return (
    <div>
      <DataDisplay
        dataHeader="Popis korisnika"
        headerBolded
        headerFontSize={23}
        headerTextColor={'#005BA7'}
        dataFullWidth
        TopSpacing={30}
        /* data={
            <div className='student-list-page__list__search'>
              {selectedSubject !== 'Odaberi predmet' && (
                <Search
                  searchingByInfo='*Pretraživanje po Imenu, Emailu, JMBAG i Telefonu'
                  fetchData={() => {
                    return getStudentForSubjectbyQuery(
                      null,
                      selectedStatuses,
                      selectedStudyType,
                      startDate
                        ? moment(startDate)
                          .startOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : null,
                      endDate
                        ? moment(endDate)
                          .endOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : endDate
                    );
                  }}
                  fetchDataByName={name => {
                    return getStudentForSubjectbyQuery(
                      name,
                      selectedStatuses,
                      selectedStudyType,
                      startDate
                        ? moment(startDate)
                          .startOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : null,
                      endDate
                        ? moment(endDate)
                          .endOf('day')
                          .format('YYYY-MM-DD HH:mm:ss')
                        : endDate
                    );
                  }}
                  setSearchQuery={setSearchQuery}
                />
              )}
            </div>
          } */
      />
      <DataDisplay
        TopSpacing={40}
        dataFullWidth
        data={
          <div className="student-list-page__list__display-list">
            {medicationList &&
            medicationList.medications &&
            medicationList.medications.length > 0 ? (
                <MedicationList
                  medicationList={medicationList.medications}
                  setMedicationId={setMedicationId}
                  setShowUserInfoModal={setShowUserInfoModal}
                />
              ) : (
                'Nema unesenih lijekova.'
              )}
          </div>
        }
      />
      {showUserInfoModal && (
        <MedicationInfoModal
          medicationId={medicationId}
          setMedicationId={setMedicationId}
          setShowUserInfoModal={setShowUserInfoModal}
        />
      )}
    </div>
  );
};

MedicationListPage.propTypes = {};

export default MedicationListPage;
