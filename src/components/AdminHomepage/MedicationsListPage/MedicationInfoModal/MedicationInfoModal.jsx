import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import './MedicationInfoModal.scss';
import Modal from '../../../SharedComponents/Modal/Modal';
import DataDisplay from '../../../SharedComponents/DataDisplay/DataDisplay';
import { Dropdown } from '../../../SharedComponents/Dropdown/Dropdown';
import {
  createMedication,
  getAllAlergies,
  getAllSymptoms,
  removeMedicationById,
  updateMedication,
} from '../../../../store/actions';
import AlertModal from '../../../SharedComponents/AlertModal/AlertModal';
import DosageTable from '../../../SharedComponents/DosageTable/DosageTable';

const MedicationInfoModal = props => {
  const dispatch = useDispatch();
  const alergies = useSelector(state => state.alergies.alergies);
  const symptoms = useSelector(state => state.symptoms.symptoms);
  const medication = useSelector(state => state.medicationList);

  const { userRole } = props;

  const [newMedicationInfo, setNewMedicationInfo] = useState(
    props.selectedMedication
      ? props.selectedMedication
      : {
        name: null,
        description: null,
        canBeUsedWhilePregnantOrBreastFeed: true,
        interactions: [],
        contraindications: [],
        sideEffects: { regular: [], rare: [], veryRare: [] },
        dosage: { byWeight: [], byAge: [] },
        alergies: [],
        symptoms: [],
      }
  );
  const [interactionsDescription, setInteractionsDescription] = useState(null);
  const [contraIndicationDescription, setContraIndicationDescription] =
    useState(null);
  const [regularSideEffectDescription, setRegularSideEffectDescription] =
    useState(null);
  const [rareSideEffectDescription, setRareSideEffectDescription] =
    useState(null);
  const [veryRareSideEffectDescription, setVeryRareSideEffectDescription] =
    useState(null);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isTryingToDelete, setIsTryingToDelete] = useState(false);
  const [isTryingToCloseWhenEdited, setIsTryingToCloseWhenEdited] =
    useState(false);

  useEffect(() => {
    if (userRole === 'admin') {
      dispatch(getAllAlergies());
      dispatch(getAllSymptoms());
    }
    return () => {
      props.setSelectedMedication(null);
    };
  }, []);

  useEffect(() => {
    if (
      medication.medicationInfo &&
      (medication.medicationInfo.status === 201 ||
        medication.medicationInfo.status === 200)
    ) {
      props.setShowMedicationInfoModal(false);
    }
  }, [medication]);

  const sideEffectsArray = [
    {
      name: 'regular',
      description: regularSideEffectDescription,
      setDescription: setRegularSideEffectDescription,
    },
    {
      name: 'rare',
      description: rareSideEffectDescription,
      setDescription: setRareSideEffectDescription,
    },
    {
      name: 'veryRare',
      description: veryRareSideEffectDescription,
      setDescription: setVeryRareSideEffectDescription,
    },
  ];

  const checkForClosingModal = () => {
    if (
      props.selectedMedication &&
      props.selectedMedication !== newMedicationInfo
    ) {
      setIsTryingToCloseWhenEdited(true);
      setShowAlertModal(true);
    } else if (
      !props.selectedMedication &&
      (newMedicationInfo.name ||
        newMedicationInfo.description ||
        (newMedicationInfo.contraindication &&
          newMedicationInfo.contraindication.length) ||
        (newMedicationInfo.alergies && newMedicationInfo.alergies.length) ||
        (newMedicationInfo.symptoms && newMedicationInfo.symptoms.length) ||
        (newMedicationInfo.sideEffects &&
          (newMedicationInfo.sideEffects.rare.length ||
            newMedicationInfo.sideEffects.veryRare.length ||
            newMedicationInfo.sideEffects.regular.length)))
    ) {
      setIsTryingToCloseWhenEdited(true);
      setShowAlertModal(true);
    } else {
      props.setShowMedicationInfoModal(false);
    }
  };

  return (
    <Modal closeModal={() => checkForClosingModal()}>
      <div className="medication-info-modal">
        <div className="medication-info-modal__header">
          <div className="header-info-image"></div>
          <div className="medication-info-modal__header__header-text">
            <div className="header-main-text">
              {props.selectedMedication
                ? 'Pregled detalja lijeka'
                : 'Unos novog lijeka'}
            </div>
            <div className="header-small-text">
              {props.selectedMedication
                ? userRole === 'user'
                  ? 'Ovdje možete pregledati informacije o lijeku'
                  : 'Ovdje možete pregledati i urediti informacije o lijeku'
                : 'Unesite informacije o lijeku'}
            </div>
          </div>
          <div
            className="header-close-icon"
            onClick={() => checkForClosingModal()}
          ></div>
        </div>
        <div className="medication-info-modal__body">
          <div className="medication-info-modal__body__left-side">
            {userRole === 'admin' ? (
              <>
                <DataDisplay
                  dataHeader="Naziv"
                  displayInColumn
                  headerBolded
                  removeTopSeparator
                  dataSeparatorTopSpacing={4}
                  data={
                    <input
                      type="text"
                      name="medication-name"
                      value={
                        newMedicationInfo.name ? newMedicationInfo.name : ''
                      }
                      onChange={e => {
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          name: e.target.value,
                        });
                      }}
                    />
                  }
                />
                {medication.medicationInfo &&
                  medication.medicationInfo.error &&
                  medication.medicationInfo.error.length &&
                  medication.medicationInfo.error.find(
                    error => error.field === 'name'
                  ) && (
                  <div>
                    {medication.medicationInfo.error.map(
                      error =>
                        error.field === 'name' && (
                          <div className="error">{error.message}</div>
                        )
                    )}
                  </div>
                )}
              </>
            ) : (
              <DataDisplay
                dataHeader="Naziv"
                displayInColumn
                headerBolded
                removeTopSeparator
                dataSeparatorTopSpacing={4}
                data={newMedicationInfo.name}
              />
            )}
            {userRole === 'admin' ? (
              <>
                <DataDisplay
                  dataHeader="Opis"
                  displayInColumn
                  headerBolded
                  dataSeparatorTopSpacing={4}
                  data={
                    <textarea
                      value={
                        newMedicationInfo.description
                          ? newMedicationInfo.description
                          : ''
                      }
                      onChange={e => {
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          description: e.target.value,
                        });
                      }}
                    />
                  }
                />
                {medication.medicationInfo &&
                  medication.medicationInfo.error &&
                  medication.medicationInfo.error.length &&
                  medication.medicationInfo.error.find(
                    error => error.field === 'description'
                  ) && (
                  <div>
                    {medication.medicationInfo.error.map(
                      error =>
                        error.field === 'description' && (
                          <div className="error">{error.message}</div>
                        )
                    )}
                  </div>
                )}
              </>
            ) : (
              <DataDisplay
                dataHeader="Opis"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={newMedicationInfo.description}
              />
            )}
            {userRole === 'admin' ? (
              <DataDisplay
                dataHeader="Smije se koristiti tijekom trudnoće ili dojenja?"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  <div>
                    <input
                      className="checkbox"
                      type="checkbox"
                      min={0}
                      checked={
                        newMedicationInfo.canBeUsedWhilePregnantOrBreastFeed
                          ? newMedicationInfo.canBeUsedWhilePregnantOrBreastFeed
                          : false
                      }
                      onChange={e => {
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          canBeUsedWhilePregnantOrBreastFeed: e.target.checked,
                        });
                      }}
                    />
                  </div>
                }
              />
            ) : (
              <DataDisplay
                dataHeader="Smije se koristiti tijekom trudnoće ili dojenja?"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  newMedicationInfo.canBeUsedWhilePregnantOrBreastFeed ? (
                    <div className="success">Da</div>
                  ) : (
                    <div className="error">Ne</div>
                  )
                }
              />
            )}
            {(userRole === 'user'
              ? newMedicationInfo.dosage.byAge &&
                newMedicationInfo.dosage.byWeight &&
                (newMedicationInfo.dosage.byAge.length ||
                  newMedicationInfo.dosage.byWeight.length)
              : newMedicationInfo && newMedicationInfo.dosage) && (
              <DataDisplay
                dataHeader="Doziranje"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={10}
                data={
                  <div>
                    {(userRole === 'user'
                      ? newMedicationInfo.dosage.byAge &&
                        newMedicationInfo.dosage.byAge.length
                      : newMedicationInfo.dosage.byAge) && (
                      <DosageTable
                        dosageList={newMedicationInfo.dosage.byAge}
                        setDosage={newDosage => {
                          setNewMedicationInfo({
                            ...newMedicationInfo,
                            dosage: {
                              ...newMedicationInfo.dosage,
                              byAge: [...newDosage],
                            },
                          });
                        }}
                        checkByKey={'age'}
                        tableHeader="Doziranje po godinama"
                        readOnly={userRole === 'user'}
                      />
                    )}
                    {(userRole === 'user'
                      ? newMedicationInfo.dosage.byWeight &&
                        newMedicationInfo.dosage.byWeight.length
                      : newMedicationInfo.dosage.byWeight) && (
                      <DosageTable
                        dosageList={newMedicationInfo.dosage.byWeight}
                        setDosage={newDosage => {
                          setNewMedicationInfo({
                            ...newMedicationInfo,
                            dosage: {
                              ...newMedicationInfo.dosage,
                              byWeight: [...newDosage],
                            },
                          });
                        }}
                        checkByKey={'weight'}
                        tableHeader="Doziranje po kilaži"
                        readOnly={userRole === 'user'}
                      />
                    )}
                  </div>
                }
              />
            )}
            {userRole === 'admin' ? (
              <DataDisplay
                dataHeader="Alergije"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  <div>
                    <Dropdown
                      fullWidth
                      multiselect
                      customclass="alergies-dropdown"
                      inputNewData
                      inputNewDataPlaceholder="Odaberi postojeće alergije ili unesi novu"
                      saveNewInput={item =>
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          alergies: [...newMedicationInfo.alergies, item],
                        })
                      }
                      handleSelect={item => {
                        if (item.id) {
                          setNewMedicationInfo({
                            ...newMedicationInfo,
                            alergies: [...newMedicationInfo.alergies, item],
                          });
                        }
                      }}
                      fullList={alergies}
                      list={
                        alergies
                          ? [
                            ...alergies.filter(alergy =>
                              newMedicationInfo.alergies.length > 0
                                ? !newMedicationInfo.alergies.find(
                                  medicationAlergy =>
                                    medicationAlergy.id === alergy.id
                                )
                                : alergy
                            ),
                          ]
                          : []
                      }
                      headerTitle="Odaberi postojeće alergije"
                      defaultHeaderOption="Odaberi postojeće alergije"
                    />
                    {newMedicationInfo.alergies && (
                      <div>
                        <table
                          style={{ width: '100%', marginTop: '20px' }}
                          className="list-table"
                        >
                          <tbody className="list-table__item-row">
                            {newMedicationInfo.alergies.length > 0 &&
                              newMedicationInfo.alergies.map(
                                (alergy, index) => {
                                  return (
                                    <tr
                                      className="spacer item-row"
                                      style={{ textAlign: 'center' }}
                                      key={index}
                                    >
                                      <td>{alergy.name}</td>
                                      <td
                                        style={{
                                          paddingLeft: '20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              alergies: [
                                                ...newMedicationInfo.alergies,
                                              ].filter(
                                                savedAlergy =>
                                                  savedAlergy.name !==
                                                  alergy.name
                                              ),
                                            });
                                          }}
                                        >
                                          Obriši
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                }
              />
            ) : (
              <DataDisplay
                dataHeader="Alergije"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  newMedicationInfo.alergies && (
                    <div>
                      <table
                        style={{ width: '100%', marginTop: '20px' }}
                        className="list-table"
                      >
                        <tbody className="list-table__item-row">
                          {newMedicationInfo.alergies.length > 0 &&
                            newMedicationInfo.alergies.map((alergy, index) => {
                              return (
                                <tr
                                  className="spacer item-row"
                                  style={{ textAlign: 'center' }}
                                  key={index}
                                >
                                  <td
                                    style={{
                                      padding: '10px',
                                    }}
                                  >
                                    {alergy.name}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              />
            )}
            {userRole === 'admin' ? (
              <DataDisplay
                dataHeader="Simptomi"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  <div>
                    <Dropdown
                      fullWidth
                      multiselect
                      inputNewData
                      inputNewDataPlaceholder="Odaberi postojeće simptome ili unesi novi"
                      saveNewInput={item =>
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          symptoms: [...newMedicationInfo.symptoms, item],
                        })
                      }
                      customclass="symptoms-dropdown"
                      handleSelect={item => {
                        if (item.id) {
                          setNewMedicationInfo({
                            ...newMedicationInfo,
                            symptoms: [...newMedicationInfo.symptoms, item],
                          });
                        }
                      }}
                      fullList={symptoms}
                      list={
                        symptoms
                          ? [
                            ...symptoms.filter(symptom =>
                              newMedicationInfo.symptoms.length > 0
                                ? !newMedicationInfo.symptoms.find(
                                  medicationSymptom =>
                                    medicationSymptom.id === symptom.id
                                )
                                : symptom
                            ),
                          ]
                          : []
                      }
                      headerTitle="Odaberi postojeće simptome"
                      defaultHeaderOption="Odaberi postojeće simptome"
                    />
                    {newMedicationInfo.symptoms && (
                      <div>
                        <table
                          style={{ width: '100%', marginTop: '20px' }}
                          className="list-table"
                        >
                          <tbody className="list-table__item-row">
                            {newMedicationInfo.symptoms.length > 0 &&
                              newMedicationInfo.symptoms.map(
                                (symptom, index) => {
                                  return (
                                    <tr
                                      className="spacer item-row"
                                      style={{ textAlign: 'center' }}
                                      key={index}
                                    >
                                      <td>{symptom.name}</td>
                                      <td
                                        style={{
                                          paddingLeft: '20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              symptoms: [
                                                ...newMedicationInfo.symptoms,
                                              ].filter(
                                                saveSymptom =>
                                                  saveSymptom.name !==
                                                  symptom.name
                                              ),
                                            });
                                          }}
                                        >
                                          Obriši
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                }
              />
            ) : (
              <DataDisplay
                dataHeader="Simptomi"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  newMedicationInfo.symptoms && (
                    <div>
                      <table
                        style={{ width: '100%', marginTop: '20px' }}
                        className="list-table"
                      >
                        <tbody className="list-table__item-row">
                          {newMedicationInfo.symptoms.length > 0 &&
                            newMedicationInfo.symptoms.map((symptom, index) => {
                              return (
                                <tr
                                  className="spacer item-row"
                                  style={{ textAlign: 'center' }}
                                  key={index}
                                >
                                  <td
                                    style={{
                                      padding: '10px',
                                    }}
                                  >
                                    {symptom.name}
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              />
            )}
          </div>
          <div className="medication-info-modal__body__right-side">
            {userRole === 'admin' ? (
              <DataDisplay
                dataHeader="Lijekovi koji se ne smiju koristiti u isto vrijeme kao i ovaj lijek"
                displayInColumn
                headerBolded
                removeTopSeparator
                dataSeparatorTopSpacing={4}
                data={
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          interactions: [
                            ...newMedicationInfo.interactions,
                            interactionsDescription,
                          ],
                        });
                        setInteractionsDescription(null);
                      }}
                    >
                      <input
                        value={
                          interactionsDescription ? interactionsDescription : ''
                        }
                        onChange={e => {
                          setInteractionsDescription(e.target.value);
                        }}
                      />
                      <button
                        className="add-new-contraindication"
                        disabled={!interactionsDescription}
                        type="submit"
                        autoFocus
                      >
                        Dodaj novu interakciju
                      </button>
                    </form>
                    {newMedicationInfo.interactions && (
                      <div>
                        <table
                          style={{ width: '100%', marginTop: '20px' }}
                          className="list-table"
                        >
                          <tbody className="list-table__item-row">
                            {newMedicationInfo.interactions.length > 0 &&
                              newMedicationInfo.interactions.map(
                                (interaction, index) => {
                                  return (
                                    <tr
                                      className="spacer item-row"
                                      style={{ textAlign: 'center' }}
                                      key={index}
                                    >
                                      <td>{interaction}</td>
                                      <td
                                        style={{
                                          paddingLeft: '20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setInteractionsDescription(
                                              interaction
                                            );
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              interactions: [
                                                ...newMedicationInfo.interactions,
                                              ].filter(
                                                saveInteraction =>
                                                  saveInteraction !==
                                                  interaction
                                              ),
                                            });
                                          }}
                                        >
                                          Uredi
                                        </button>
                                      </td>
                                      <td
                                        style={{
                                          padding: '0 20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              interactions: [
                                                ...newMedicationInfo.interactions,
                                              ].filter(
                                                saveInteraction =>
                                                  saveInteraction !==
                                                  interaction
                                              ),
                                            });
                                          }}
                                        >
                                          Obriši
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                }
              />
            ) : (
              <DataDisplay
                dataHeader="Lijekovi koji se ne smiju koristiti u isto vrijeme kao i ovaj lijek"
                displayInColumn
                headerBolded
                removeTopSeparator
                dataSeparatorTopSpacing={4}
                data={
                  newMedicationInfo.interactions && (
                    <div>
                      <table
                        style={{ width: '100%', marginTop: '20px' }}
                        className="list-table"
                      >
                        <tbody className="list-table__item-row">
                          {newMedicationInfo.interactions.length > 0 &&
                            newMedicationInfo.interactions.map(
                              (interaction, index) => {
                                return (
                                  <tr
                                    className="spacer item-row"
                                    style={{ textAlign: 'center' }}
                                    key={index}
                                  >
                                    <td style={{ padding: '10px' }}>
                                      {interaction}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              />
            )}
            {userRole === 'admin' ? (
              <DataDisplay
                dataHeader="Kontraindikacije"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  <div>
                    <form
                      onSubmit={e => {
                        e.preventDefault();
                        setNewMedicationInfo({
                          ...newMedicationInfo,
                          contraindications: [
                            ...newMedicationInfo.contraindications,
                            contraIndicationDescription,
                          ],
                        });
                        setContraIndicationDescription(null);
                      }}
                    >
                      <input
                        value={
                          contraIndicationDescription
                            ? contraIndicationDescription
                            : ''
                        }
                        onChange={e => {
                          setContraIndicationDescription(e.target.value);
                        }}
                      />
                      <button
                        className="add-new-contraindication"
                        disabled={!contraIndicationDescription}
                        type="submit"
                        autoFocus
                      >
                        Dodaj novu kontraindikaciju
                      </button>
                    </form>
                    {newMedicationInfo.contraindications && (
                      <div>
                        <table
                          style={{ width: '100%', marginTop: '20px' }}
                          className="list-table"
                        >
                          <tbody className="list-table__item-row">
                            {newMedicationInfo.contraindications.length > 0 &&
                              newMedicationInfo.contraindications.map(
                                (contraindication, index) => {
                                  return (
                                    <tr
                                      className="spacer item-row"
                                      style={{ textAlign: 'center' }}
                                      key={index}
                                    >
                                      <td>{contraindication}</td>
                                      <td
                                        style={{
                                          paddingLeft: '20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setContraIndicationDescription(
                                              contraindication
                                            );
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              contraindications: [
                                                ...newMedicationInfo.contraindications,
                                              ].filter(
                                                indication =>
                                                  indication !==
                                                  contraindication
                                              ),
                                            });
                                          }}
                                        >
                                          Uredi
                                        </button>
                                      </td>
                                      <td
                                        style={{
                                          padding: '0 20px',
                                          width: '55px',
                                        }}
                                      >
                                        <button
                                          id="link-to-medication-page"
                                          onClick={() => {
                                            setNewMedicationInfo({
                                              ...newMedicationInfo,
                                              contraindications: [
                                                ...newMedicationInfo.contraindications,
                                              ].filter(
                                                indication =>
                                                  indication !==
                                                  contraindication
                                              ),
                                            });
                                          }}
                                        >
                                          Obriši
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                }
              />
            ) : (
              <DataDisplay
                dataHeader="Kontraindikacije"
                displayInColumn
                headerBolded
                dataSeparatorTopSpacing={4}
                data={
                  newMedicationInfo.contraindications && (
                    <div>
                      <table
                        style={{ width: '100%', marginTop: '20px' }}
                        className="list-table"
                      >
                        <tbody className="list-table__item-row">
                          {newMedicationInfo.contraindications.length > 0 &&
                            newMedicationInfo.contraindications.map(
                              (contraindication, index) => {
                                return (
                                  <tr
                                    className="spacer item-row"
                                    style={{ textAlign: 'center' }}
                                    key={index}
                                  >
                                    <td style={{ padding: '10px' }}>
                                      {contraindication}
                                    </td>
                                  </tr>
                                );
                              }
                            )}
                        </tbody>
                      </table>
                    </div>
                  )
                }
              />
            )}
            <DataDisplay
              dataHeader="Nuspojave"
              displayInColumn
              headerBolded
              dataSeparatorTopSpacing={4}
              data={
                sideEffectsArray &&
                sideEffectsArray.map((sideEffectItem, index) => (
                  <div key={index} style={{ marginTop: index > 0 && '20px' }}>
                    <div>
                      {userRole === 'admin' ? (
                        <form
                          onSubmit={e => {
                            e.preventDefault();
                            setNewMedicationInfo({
                              ...newMedicationInfo,
                              sideEffects: {
                                ...newMedicationInfo.sideEffects,
                                [`${sideEffectItem.name}`]: [
                                  ...newMedicationInfo.sideEffects[
                                    sideEffectItem.name
                                  ],
                                  sideEffectItem.description,
                                ],
                              },
                            });
                            sideEffectItem.setDescription(null);
                          }}
                        >
                          <input
                            placeholder={
                              sideEffectItem.name === 'regular'
                                ? 'Česta nuspojava'
                                : sideEffectItem.name === 'rare'
                                  ? 'Rijetka nuspojava'
                                  : 'Vrlo rijetka nuspojava'
                            }
                            value={
                              sideEffectItem.description
                                ? sideEffectItem.description
                                : ''
                            }
                            onChange={e => {
                              sideEffectItem.setDescription(e.target.value);
                            }}
                          />
                          <button
                            className="add-new-contraindication"
                            disabled={!sideEffectItem.description}
                            type="submit"
                            autoFocus
                          >
                            Dodaj novu nuspojavu
                          </button>
                        </form>
                      ) : sideEffectItem.name === 'regular' ? (
                        'Česta nuspojava'
                      ) : sideEffectItem.name === 'rare' ? (
                        'Rijetka nuspojava'
                      ) : (
                        'Vrlo rijetka nuspojava'
                      )}
                    </div>
                    {newMedicationInfo.sideEffects && (
                      <div>
                        <table
                          style={{ width: '100%', marginTop: '20px' }}
                          className="list-table"
                        >
                          <tbody className="list-table__item-row">
                            {newMedicationInfo.sideEffects[
                              sideEffectItem.name
                            ] &&
                              newMedicationInfo.sideEffects[sideEffectItem.name]
                                .length > 0 &&
                              newMedicationInfo.sideEffects[
                                sideEffectItem.name
                              ].map((sideEffect, index) => {
                                return (
                                  <tr
                                    className="spacer item-row"
                                    style={{ textAlign: 'center' }}
                                    key={index}
                                  >
                                    <td
                                      style={{
                                        padding: userRole !== 'admin' && '10px',
                                      }}
                                    >
                                      {sideEffect}
                                    </td>
                                    {userRole === 'admin' && (
                                      <>
                                        <td
                                          style={{
                                            paddingLeft: '20px',
                                            width: '55px',
                                          }}
                                        >
                                          <button
                                            id="link-to-medication-page"
                                            onClick={() => {
                                              sideEffectItem.setDescription(
                                                sideEffect.name
                                              );
                                              setNewMedicationInfo({
                                                ...newMedicationInfo,
                                                sideEffects: {
                                                  ...newMedicationInfo.sideEffects,
                                                  [`${sideEffectItem.name}`]: [
                                                    ...newMedicationInfo
                                                      .sideEffects[
                                                        sideEffectItem.name
                                                      ],
                                                  ].filter(
                                                    effect =>
                                                      effect !== sideEffect
                                                  ),
                                                },
                                              });
                                            }}
                                          >
                                            Uredi
                                          </button>
                                        </td>
                                        <td
                                          style={{
                                            padding: '0 20px',
                                            width: '55px',
                                          }}
                                        >
                                          <button
                                            id="link-to-medication-page"
                                            onClick={() => {
                                              setNewMedicationInfo({
                                                ...newMedicationInfo,
                                                sideEffects: {
                                                  ...newMedicationInfo.sideEffects,
                                                  [`${sideEffectItem.name}`]: [
                                                    ...newMedicationInfo
                                                      .sideEffects[
                                                        sideEffectItem.name
                                                      ],
                                                  ].filter(
                                                    effect =>
                                                      effect !== sideEffect
                                                  ),
                                                },
                                              });
                                            }}
                                          >
                                            Obriši
                                          </button>
                                        </td>
                                      </>
                                    )}
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                ))
              }
            />
          </div>
        </div>
        {userRole === 'admin' && (
          <div className="footer">
            {props.selectedMedication && (
              <button
                className="footer__remove-button"
                onClick={() => {
                  setIsTryingToDelete(true);
                  setShowAlertModal(true);
                }}
              >
                Obriši lijek
              </button>
            )}
            <button
              className="footer__send-button"
              onClick={() => {
                if (newMedicationInfo.id) {
                  dispatch(updateMedication(newMedicationInfo));
                } else {
                  dispatch(createMedication(newMedicationInfo));
                }
              }}
            >
              Spremi
            </button>
          </div>
        )}
        {showAlertModal && (
          <AlertModal
            alertInfotext={
              isTryingToDelete
                ? 'Želite li obrisati ovaj lijek?'
                : 'Jeste li sigurni da želite zatvoriti prozor? Imate ne spremljene promjene!'
            }
            confirmOptions={() => {
              setShowAlertModal(false);
              if (isTryingToDelete) {
                dispatch(removeMedicationById(newMedicationInfo.id));
              }
              if (isTryingToCloseWhenEdited) {
                props.setShowMedicationInfoModal(false);
              }
            }}
            declineOptions={() => {
              setShowAlertModal(false);
            }}
          />
        )}
      </div>
    </Modal>
  );
};

MedicationInfoModal.propTypes = {
  selectedMedication: PropTypes.object,
  setSelectedMedication: PropTypes.func,
  setShowMedicationInfoModal: PropTypes.func,
  userRole: PropTypes.string,
  userDetails: PropTypes.object,
};

export default MedicationInfoModal;
