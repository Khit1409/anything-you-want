import axios from "axios";

const PROVINCE_API_URL = "https://provinces.open-api.vn/api/v2/p";
const WARD_API_URL = "https://provinces.open-api.vn/api/v2/w";

interface Province {
  name: string;
  code: number;
  division_type: string;
  codename: string;
  phone_code: number;
  ward: [];
}

export type Provinces = Array<Province>;

interface Ward {
  name: string;
  division_type: string;
  codename: string;
  province_code: number;
  code: number;
}

export type Wards = Array<Ward>;
/**
 * Lấy danh sách tỉnh / thành phố
 * @returns
 */
export async function getProvinces(): Promise<Provinces> {
  try {
    const res = await axios.get(PROVINCE_API_URL);
    const api = res.data as Provinces;
    return api;
  } catch (error) {
    throw error;
  }
}
/**
 * Lấy danh sách các phường / quận theo mã tỉnh / thành phố
 * @param provinceCode
 * @returns
 */
export async function getWards(): Promise<Wards> {
  try {
    const res = await axios.get(`${WARD_API_URL}`);
    const { data } = res;
    return data as Wards;
  } catch (error) {
    throw error;
  }
}

export async function getAddressApi() {
  const [provinces, wards] = await Promise.all([getProvinces(), getWards()]);
  return { provinces, wards };
}
