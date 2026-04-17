import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getUserAppointments, saveAppointment, cancelAppointment as cancelInStorage } from '../utils/storage';
import { useAuth } from './AuthContext';

const AppointmentContext = createContext(null);

export function AppointmentProvider({ children }) {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const list = await getUserAppointments(user.id);
    // Sort: newest first
    list.sort((a, b) => new Date(b.bookedAt) - new Date(a.bookedAt));
    setAppointments(list);
    setLoading(false);
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  async function book({ provider, date, slot }) {
    const appt = {
      id: `appt_${Date.now()}`,
      userId: user.id,
      userName: user.name,
      providerId: provider.id,
      providerName: provider.name,
      providerCategory: provider.category,
      providerSpecialisation: provider.specialisation,
      providerImage: provider.image,
      date,        // 'yyyy-MM-dd'
      slot,        // 'HH:mm'
      status: 'UPCOMING',
      bookedAt: new Date().toISOString(),
    };
    await saveAppointment(appt);
    await refresh();
    return appt;
  }

  async function cancel(id) {
    await cancelInStorage(id);
    await refresh();
  }

  /** Check if a slot is already booked for a given provider+date+slot */
  function isSlotBooked(providerId, date, slot) {
    return appointments.some(
      (a) =>
        a.providerId === providerId &&
        a.date === date &&
        a.slot === slot &&
        a.status === 'UPCOMING'
    );
  }

  const upcoming = appointments.filter((a) => a.status === 'UPCOMING');
  const past = appointments.filter((a) => a.status !== 'UPCOMING');

  return (
    <AppointmentContext.Provider value={{ appointments, upcoming, past, loading, book, cancel, refresh, isSlotBooked }}>
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
