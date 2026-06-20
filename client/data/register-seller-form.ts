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
  path?: string;
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
      path: "data.info.firstName",
      type: "text",
      maxLenght: 255,
      required: true,
      message: "Nhập họ của bạn",
      label: "Họ của bạn",
      id: "firstName",
    },
    {
      name: "lastName",
      path: "data.info.lastName",
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
      path: "data.info.fullName",
      required: true,
      message: "Nhập tên đầy đủ của bạn!",
      label: "Tên đầy đủ của bạn",
      type: "text",
      maxLenght: 255,
    },
    {
      id: "dateOfBirth",
      name: "dateOfBirth",
      path: "data.info.dateOfBirth",
      required: true,
      label: "Ngày tháng năm sinh (DD/MM/YYYY)",
      type: "date",
    },
  ],
  store: {
    info: [
      {
        name: "name",
        path: "data.store.info.name",
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
        path: "data.store.info.description",
        type: "text",
        message: "Nhập mô tả cửa hàng!",
        label: "Mô tả cửa hàng",
        id: "description",
        required: true,
      },
      {
        name: "phoneNumber",
        path: "data.store.info.phoneNumber",
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
        path: "data.store.info.emailAddress",
        type: "email",
        message: "Nhập địa chỉ email của cửa hàng cửa hàng!",
        label: "Địa chỉ email của cửa hàng",
        id: "emailAddress",
        required: true,
        maxLenght: 255,
      },
      {
        name: "thumbnail",
        type: "text",
        path: "data.store.info.thumbnail",
        message: "Nhập địa chỉ email của cửa hàng cửa hàng!",
        label: "Địa chỉ email của cửa hàng",
        id: "thumbnail",
        required: true,
        maxLenght: 255,
      },
      {
        name: "avatar",
        type: "text",
        path: "data.store.info.avatar",
        message: "Nhập địa chỉ email của cửa hàng cửa hàng!",
        label: "Địa chỉ email của cửa hàng",
        id: "avatar",
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
      path: "data.store.storeCode",
      maxLenght: 6,
      minLength: 6,
    },
  },
  auth: [
    {
      name: "currentPassword",
      path: "data.currentPassword",
      label: "Mật khẩu",
      message: "Nhập mật khẩu",
      required: true,
      id: "currentPassword",
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
      path: "data.emailAddress",
      required: true,
      maxLenght: 255,
    },
  ],
};
