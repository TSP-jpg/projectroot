import { READ_API, WRITE_API } from './config.js';

export async function fetchAllData() {
  const res = await fetch(READ_API, { method: 'GET' });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`โหลดข้อมูลไม่สำเร็จ (Status: ${res.status}, Message: ${errorText.substring(0, 100)}...)`);
  }
  return res.json();
}

export async function postData(payload) {
  const res = await fetch(WRITE_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`ไม่สามารถส่งข้อมูลได้ (Status: ${res.status}, Message: ${errorText.substring(0, 100)}...)`);
  }
  return res.json();
}
