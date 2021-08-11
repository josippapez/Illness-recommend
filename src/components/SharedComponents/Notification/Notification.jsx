import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

const Notification = () => {
  const user = useSelector(state => state.user);
  const userInfo = useSelector(state => state.user.userInfo);
  const currentPatientInfo = useSelector(state => state.patient);
  const medicationInfo = useSelector(
    state => state.medicationList.medicationInfo
  );

  const statusArray = [user, userInfo, medicationInfo, currentPatientInfo];
  useEffect(() => {
    statusArray.map(statusInfo => {
      if (
        statusInfo &&
        (statusInfo.status === 200 || statusInfo.status === 201)
      ) {
        toast.info(statusInfo.message, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      if (
        statusInfo &&
        statusInfo.status &&
        statusInfo.status !== 200 &&
        statusInfo.status !== 201
      ) {
        toast.error(
          statusInfo.message ? statusInfo.message : 'Nešto je pošlo po krivu!',
          {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    });
  }, [statusArray]);

  return <ToastContainer />;
};

export default Notification;
