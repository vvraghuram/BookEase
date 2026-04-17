import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER: 'bookease_user',
  APPOINTMENTS: 'bookease_appointments',
};

// ── AUTH ──────────────────────────────────────────────────────────────────────

export async function saveUser(user) {
  await AsyncStorage.setItem(KEYS.USER, JSON.stringify(user));
}

export async function getUser() {
  const raw = await AsyncStorage.getItem(KEYS.USER);
  return raw ? JSON.parse(raw) : null;
}

export async function removeUser() {
  await AsyncStorage.removeItem(KEYS.USER);
}

// ── REGISTERED ACCOUNTS (for login validation) ────────────────────────────────

export async function getAccounts() {
  const raw = await AsyncStorage.getItem('bookease_accounts');
  return raw ? JSON.parse(raw) : [];
}

export async function saveAccount(account) {
  const accounts = await getAccounts();
  accounts.push(account);
  await AsyncStorage.setItem('bookease_accounts', JSON.stringify(accounts));
}

export async function findAccount(email) {
  const accounts = await getAccounts();
  return accounts.find((a) => a.email.toLowerCase() === email.toLowerCase()) || null;
}

// ── APPOINTMENTS ─────────────────────────────────────────────────────────────

export async function getAppointments() {
  const raw = await AsyncStorage.getItem(KEYS.APPOINTMENTS);
  return raw ? JSON.parse(raw) : [];
}

export async function saveAppointment(appt) {
  const list = await getAppointments();
  list.push(appt);
  await AsyncStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(list));
}

export async function cancelAppointment(id) {
  const list = await getAppointments();
  const updated = list.map((a) =>
    a.id === id ? { ...a, status: 'CANCELLED' } : a
  );
  await AsyncStorage.setItem(KEYS.APPOINTMENTS, JSON.stringify(updated));
  return updated;
}

export async function getUserAppointments(userId) {
  const all = await getAppointments();
  return all.filter((a) => a.userId === userId);
}
