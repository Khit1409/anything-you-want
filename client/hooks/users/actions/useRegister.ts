import { userRegister } from "@/api/user.api";
import {
  getProvinces,
  getWards,
  Provinces,
  Wards,
} from "@/features/address.feature";
import {
  RegisterUserAccountRequest,
  RegisterUserInfoRequest,
  UserAddress,
  UserAddresses,
  UserPhones,
} from "@/interfaces/user.interface";
import { openModal } from "@/redux/slice/app.slice";
import { ModalState } from "@/redux/state/app.state";
import { AppDispatch } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function useRegister() {
  const dispatch = useDispatch<AppDispatch>();
  /**
   * Thông báo lỗi / cảnh báo chung của form đăng ký.
   * Dùng để hiển thị thông điệp ngắn (ví dụ: trường bị bỏ trống, mật khẩu không khớp).
   */
  const [handleMess, setHandleMess] = useState<string | null>(null);
  /**
   * Mã tỉnh/thành đang được chọn (để fetch danh sách quận/huyện tương ứng).
   */
  const [provinceCode, setProvinceCode] = useState<number | null>(null);
  /**
   * Danh sách tỉnh/thành lấy từ API `getProvinces()`.
   */
  const [provinceList, setProvinceList] = useState<Provinces>([]);
  /**
   * Danh sách quận/huyện tương ứng với `provinceCode`, lấy từ `getWards()`.
   */
  const [wardList, setWardList] = useState<Wards>([]);

  /**
   * Goi api cho danh sach dia chi
   */
  useEffect(() => {
    (async () => {
      setProvinceList(await getProvinces());
    })();
  }, []);
  /**
   * Gọi api quận / huyện khi có province code được chọn
   */
  useEffect(() => {
    if (!provinceCode) return;
    (async () => {
      return setWardList(await getWards(provinceCode));
    })();
  }, [provinceCode]);
  /**
   * Số lượng input địa chỉ/điện thoại hiện có trên form.
   * Dùng để render nhiều input động cho người dùng thêm địa chỉ/số điện thoại.
   */
  const [countAddress, setCountAddress] = useState<number>(1);
  const [countPhone, setCountPhone] = useState<number>(1);
  /**
   * Dữ liệu thông tin cá nhân của user (tên, email, mật khẩu, v.v.).
   * Kiểu `RegisterUserInfoRequest` định nghĩa các field cần thiết cho đăng ký.
   */
  const [infoData, setInfoData] = useState<RegisterUserInfoRequest>({
    currentPassword: "",
    dateOfBirth: "",
    emailAddress: "",
    firstName: "",
    fullName: "",
    lastName: "",
  });

  const onchangeInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandleMess(null);
    const { name, value } = e.target;

    return setInfoData((prev) => ({
      ...prev,
      [name]: name !== "fullName" && name !== "lastName" ? value.trim() : value,
    }));
  };
  /**
   * Mật khẩu nhập lại (dùng để so khớp với `infoData.currentPassword`).
   */
  const [rePassword, setRePassword] = useState<string>("");
  /**
   * Mảng chứa các số điện thoại tạm thời người dùng nhập vào.
   * Kiểu `UserPhones` chứa các object { id, phoneNumber }.
   */
  const [phoneData, setPhoneData] = useState<UserPhones>([]);
  const onchangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHandleMess(null);
    const { value, dataset } = e.target;
    const id = String(dataset.index);

    if (!id) return;

    const existing = phoneData.find((p) => p.id === id);

    if (!existing) {
      return setPhoneData((prev) => [...prev, { id, phoneNumber: value }]);
    }

    return setPhoneData((prev) => {
      return prev.map((p) => (p.id === id ? { ...p, phoneNumber: value } : p));
    });
  };
  const removePhoneInput = (id: number) => {
    setCountPhone((prev) => prev - 1);
    return setPhoneData((prev) => prev.filter((p) => p.id !== String(id)));
  };
  /**
   * Danh sách địa chỉ người dùng nhập trên form. Mỗi phần tử có cấu trúc `UserAddress`.
   */
  const [addressData, setAddressData] = useState<UserAddresses>([]);
  const onchangeAddress = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setHandleMess(null);
    const { name, value, dataset } = e.target;
    const id = String(dataset.index);

    if (!id) return;

    const existing = addressData.find((add) => add.id === id);
    if (!existing) {
      const addressFormated: UserAddress = {
        id,
        addressDetail: "",
        province: "",
        ward: "",
      };

      if (name === "addressDetail") addressFormated.addressDetail = value;
      if (name === "province") addressFormated.province = value;
      if (name === "ward") addressFormated.ward = value;

      setAddressData((prev) => [...prev, addressFormated]);
    }

    return setAddressData((prev) =>
      prev.map((add) => (add.id === id ? { ...add, [name]: value } : add))
    );
  };

  const removeAddressInput = (id: number) => {
    setCountAddress((prev) => prev - 1);
    return setAddressData((prev) =>
      prev.filter((add) => add.id !== String(id))
    );
  };

  async function submitRegister(e: React.FormEvent) {
    e.preventDefault();

    const dataForm: RegisterUserAccountRequest = {
      ...infoData,
      address: addressData.map((add) => ({
        addressDetail: add.addressDetail,
        province: add.province,
        ward: add.ward,
      })),

      phones: phoneData.map((p) => ({ phoneNumber: p.phoneNumber })),
    };

    const infoKeys = Object.keys(infoData);

    const validateInfo = infoKeys.find(
      (key) => infoData[key as keyof RegisterUserInfoRequest] === ""
    );
    if (validateInfo) {
      setHandleMess("Có thông tin cá nhân bị bỏ trống!");
      return;
    }
    const validatePhone = phoneData.find((p) => p.phoneNumber === "");
    if (validatePhone) {
      setHandleMess("Có thông tin của 1 số điện thoại bị bỏ trống!");
      return;
    }
    const validateAddress = addressData.find((add) => {
      const keysObject = Object.keys(add);
      return keysObject.find((key) => add[key as keyof UserAddress] === "");
    });
    if (validateAddress) {
      setHandleMess("Có thông tin của 1 địa chỉ bị bỏ trống!");
      return;
    }

    if (dataForm.currentPassword !== rePassword) {
      setHandleMess("Mật khẩu không trùng nhau!");
      return;
    }

    if (dataForm.currentPassword.length < 6) {
      setHandleMess("Mật khẩu phải dài hơn hoặc bằng 6 kí tự!");
      return;
    }

    const result = await userRegister(dataForm);

    if (!result) {
      return dispatch(
        openModal({
          message:
            "Có lỗi gì đó xảy ra khi xử lý đăng ký, vui lòng thử lại sau!",
          state: ModalState.ERROR,
        })
      );
    }
    const { message, success } = result;
    return dispatch(
      openModal({
        message,
        state: success ? ModalState.SUCCESS : ModalState.ERROR,
      })
    );
  }
  /**
   * Trả về các hàm và state cần thiết để component đăng ký sử dụng:
   * - Các handler `onchange*` để bind input
   * - State form (`infoData`, `addressData`, `phoneData`, ...)
   * - Hàm `submitRegister` để xử lý validate + gọi API đăng ký
   * Lưu ý: hook chỉ thêm comment/logic xử lý form, không dispatch route hay redirect.
   */
  return {
    onchangePhone,
    setCountAddress,
    setCountPhone,
    onchangeInfo,
    countAddress,
    countPhone,
    infoData,
    onchangeAddress,
    addressData,
    setAddressData,
    removePhoneInput,
    removeAddressInput,
    setProvinceCode,
    provinceList,
    provinceCode,
    wardList,
    setRePassword,
    rePassword,
    submitRegister,
    handleMess,
  };
}
