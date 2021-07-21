import React from 'react';
import PropTypes from 'prop-types';
import './DataDisplay.scss';
import classNames from 'classnames';

const DataDisplay = props => {
  return (
    <div
      style={{
        marginTop: props.removeTopSeparator ? '0px' : `${props.TopSpacing}px`,
        marginBottom: `${props.BottomSpacing}px`,
      }}
    >
      <div
        className={classNames({
          'row-display': !props.displayInColumn,
        })}
      >
        <div
          className={classNames({
            'col label': !props.displayInColumn,
            row: props.displayInColumn,
            bolded: props.headerBolded,
          })}
          hidden={!props.dataHeader}
          style={{
            fontWeight: props.headerBolded && 'bold',
            color: props.headerTextColor,
            width:
              !props.displayInColumn &&
              (props.dynamicHeaderWidth ? 'fit-content' : '25%'),
            minWidth: !props.displayInColumn && '150px',
            marginRight: !props.displayInColumn && '16px',
            fontSize: props.headerFontSize && `${props.headerFontSize}px`,
            background: props.headerBackground,
            textTransform: props.uppercaseHeader && 'uppercase',
            alignSelf: props.centerHeader && 'center',
          }}
        >
          {props.dataHeader}
          {props.displayInColumn && !props.separateDataFromHeader && ' '}
        </div>
        {props.displayInColumn && (
          <div
            style={{
              borderTop: props.separateDataFromHeader && '1px solid #000000',
              marginTop:
                props.dataSeparatorTopSpacing &&
                `${props.dataSeparatorTopSpacing}px`,
              marginBottom:
                props.dataSeparatorBottomSpacing &&
                `${props.dataSeparatorBottomSpacing}px`,
            }}
          />
        )}
        {(props.data || props.url) && (
          <div
            className={classNames(props.dataClass, {
              col: !props.displayInColumn,
              row: props.displayInColumn && props.removeTopSeparator,
            })}
            style={{
              paddingLeft:
                !props.displayInColumn && props.dynamicHeaderWidth && '16px',
              color: props.dataDisplayColor && `${props.dataDisplayColor}`,
              width: props.dataFullWidth && '100%',
            }}
          >
            {props.url ? (
              <a
                href={`//${props.url}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                {props.urlName}
              </a>
            ) : (
              props.data
            )}
          </div>
        )}
      </div>
    </div>
  );
};

DataDisplay.defaultProps = {
  headerFontSize: 16,
  dataSeparatorTopSpacing: 0,
  dataSeparatorBottomSpacing: 0,
  TopSpacing: 20,
  BottomSpacing: 0,
  headerTextColor: 'black',
};

DataDisplay.propTypes = {
  dataHeader: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  data: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.node,
  ]),
  url: PropTypes.string,
  urlName: PropTypes.string,
  headerBolded: PropTypes.bool,
  dynamicHeaderWidth: PropTypes.bool,
  displayInColumn: PropTypes.bool,
  separateDataFromHeader: PropTypes.bool,
  headerFontSize: PropTypes.number,
  dataSeparatorBottomSpacing: PropTypes.number,
  headerBackground: PropTypes.string,
  headerTextColor: PropTypes.string,
  removeTopSeparator: PropTypes.bool,
  uppercaseHeader: PropTypes.bool,
  removeTopSeparatorForData: PropTypes.bool,
  dataSeparatorTopSpacing: PropTypes.number,
  dataDisplayColor: PropTypes.string,
  dataClass: PropTypes.string,
  dataFullWidth: PropTypes.bool,
  TopSpacing: PropTypes.number,
  BottomSpacing: PropTypes.number,
  centerHeader: PropTypes.bool,
};

export default DataDisplay;
