import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './DosageTable.scss';
import MinusIcon from '../../../styles/assets/images/minus.svg';
import PlusIcon from '../../../styles/assets/images/add.svg';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

const DosageTable = props => {
  const userDetails = useSelector(state => state.user.userInfo);
  const [dosageRowCounter, setDosageRowCounter] = useState(
    props.dosageList ? props.dosageList.length : 0
  );
  const [dosageArray, setDosageArray] = useState(
    props.dosageList ? [...props.dosageList] : []
  );
  const elements = [];

  useEffect(() => {
    let timeout;
    if (
      dosageArray &&
      dosageArray.length &&
      JSON.stringify(dosageArray) !== JSON.stringify(props.dosageList)
    ) {
      timeout = setTimeout(() => {
        props.setDosage(dosageArray);
      }, 500);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [dosageArray]);

  for (let dosage = 0; dosage < dosageRowCounter; dosage++) {
    elements.push(
      <div
        className={classNames({
          'dosage-table__row': true,
          highlight:
            props.readOnly &&
            (dosageArray[dosage].comparison === '<='
              ? userDetails.data[props.checkByKey] <= dosageArray[dosage].name
              : dosageArray[dosage].comparison === '>='
                ? userDetails.data[props.checkByKey] >= dosageArray[dosage].name
                : dosageArray[dosage].comparison === '<'
                  ? userDetails.data[props.checkByKey] < dosageArray[dosage].name
                  : dosageArray[dosage].comparison === '>'
                    ? userDetails.data[props.checkByKey] > dosageArray[dosage].name
                    : false),
        })}
        key={dosage}
      >
        {props.readOnly ? (
          <>
            <div className="readonly__comparison">
              {dosageArray[dosage].comparison}
            </div>
            <div className="readonly__name">{dosageArray[dosage].name}</div>
            <div className="readonly__description">
              {dosageArray[dosage].description}
            </div>
          </>
        ) : (
          <>
            <select
              className="comparison-select"
              name="comparison"
              id="comparison"
              defaultValue={
                dosageArray[dosage] && dosageArray[dosage].comparison
              }
              onChange={e => {
                const newArray = [...dosageArray];
                newArray[dosage].comparison = e.target.value;
                setDosageArray(newArray);
              }}
            >
              <option value={null}> </option>
              <option value="<">{'<'}</option>
              <option value=">">{'>'}</option>
              <option value=">=">{'>='}</option>
              <option value="<=">{'<='}</option>
            </select>
            <input
              type="text"
              name="dosage-name"
              placeholder="Naziv"
              className="dosage-table__row__name-input"
              value={dosageArray.length ? dosageArray[dosage].name : ''}
              onChange={e => {
                const newArray = [...dosageArray];
                newArray[dosage].name = e.target.value;
                setDosageArray(newArray);
              }}
            />
            <input
              type="text"
              name="dosage-description"
              placeholder="Vrijednost"
              className="dosage-table__row__description-input"
              value={dosageArray.length ? dosageArray[dosage].description : ''}
              onChange={e => {
                const newArray = [...dosageArray];
                newArray[dosage].description = e.target.value;
                setDosageArray(newArray);
              }}
            />
            <img
              src={MinusIcon}
              className="remove-icon"
              alt="remove-icon"
              onClick={() => {
                const newArray = [...dosageArray];
                newArray.splice(dosage, 1);
                setDosageRowCounter(dosageRowCounter - 1);
                setDosageArray(newArray);
              }}
            />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="dosage-table">
      <div className="dosage-table__header">{props.tableHeader}</div>
      <div className="dosage-table__table">{elements}</div>
      {!props.readOnly && (
        <img
          src={PlusIcon}
          className="add-icon"
          alt="add-icon"
          onClick={() => {
            setDosageRowCounter(dosageRowCounter + 1);
            setDosageArray([
              ...dosageArray,
              { name: '', description: '', comparison: null },
            ]);
          }}
        />
      )}
    </div>
  );
};

DosageTable.propTypes = {
  tableHeader: PropTypes.string,
  setDosage: PropTypes.func,
  dosageList: PropTypes.array,
  readOnly: PropTypes.bool,
  checkByKey: PropTypes.string,
};

export default DosageTable;
