interface InputParams {
  name: string;
  label: string;
  message?: string;
  type: "password" | "text" | "number" | "email" | "tel" | "date";
  required: boolean;
  id: string;
  maxLenght?: number;
  minLength?: number;
  icons?: string;
}

interface FormListType {
  info: InputParams[];
  store: {
    info: InputParams[];
    storeCode: InputParams;
  };
  auth: InputParams[];
}

export const SELLER_FORM_INPUT_LIST: FormListType = {
  info: [
    {
      name: "firstName",
      type: "text",
      maxLenght: 255,
      required: true,
      message: "Nhập họ của bạn",
      label: "Họ của bạn",
      id: "firstName",
    },
    {
      name: "lastName",
      type: "text",
      maxLenght: 255,
      required: true,
      message: "Nhập tên của bạn",
      label: "Tên của bạn",
      id: "lastName",
    },
    {
      id: "fullName",
      name: "fullName",
      required: true,
      message: "Nhập tên đầy đủ của bạn!",
      label: "Tên đầy đủ của bạn",
      type: "text",
      maxLenght: 255,
    },
    {
      id: "dateOfBirth",
      name: "dateOfBirth",
      required: true,
      label: "Ngày tháng năm sinh (DD/MM/YYYY)",
      type: "date",
    },
  ],
  store: {
    info: [
      {
        name: "name",
        id: "name",
        label: "Tên cửa hàng",
        message: "Nhập tên cửa hàng của bạn!",
        required: true,
        type: "text",
        maxLenght: 255,
        minLength: 6,
      },
      {
        name: "description",
        type: "text",
        message: "Nhập mô tả cửa hàng!",
        label: "Mô tả cửa hàng",
        id: "description",
        required: true,
      },
      {
        name: "phoneNumber",
        type: "tel",
        message: "Số điện thoại liên hệ!",
        label: "Số điện thoại liên hệ",
        id: "phoneNumber",
        required: true,
        maxLenght: 10,
        minLength: 10,
      },
      {
        name: "emailAddress",
        type: "email",
        message: "Nhập địa chỉ email của cửa hàng cửa hàng!",
        label: "Địa chỉ email của cửa hàng",
        id: "emailAddress",
        required: true,
        maxLenght: 255,
      },
    ],
    storeCode: {
      id: "storeCode",
      required: true,
      label: "Nhập mã code của của hàng (6 chữ)",
      message: "**-**-**",
      name: "storeCode",
      type: "password",
      maxLenght: 6,
      minLength: 6,
    },
  },
  auth: [
    {
      name: "currentPassword",
      label: "Mật khẩu",
      message: "Nhập mật khẩu",
      required: true,
      id: "currentPassword",
      type: "password",
      minLength: 6,
      maxLenght: 255,
    },
    {
      name: "rePassword",
      label: "Nhập lại mật khẩu",
      message: "Nhập lại mật khẩu",
      required: true,
      id: "rePassword",
      type: "password",
      minLength: 6,
      maxLenght: 255,
    },
    {
      id: "emailAddress",
      type: "email",
      label: "Địa chỉ email",
      message: "Nhập địa chỉ email của bạn!",
      name: "emailAddress",
      required: true,
      maxLenght: 255,
    },
  ],
};
