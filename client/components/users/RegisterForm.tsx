interface Props {
  phoneInput: number;
  addressInput: number;
}

export default function RegisterForm({ addressInput, phoneInput }: Props) {
  return (
    <div className="min-w-[800px] min-h-[400px]  p-6 bg-white rounded">
      <form id="register-user-form" className="grid grid-cols-4 gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="first_name">Họ</label>
          <input
            type="text"
            id="first_name"
            className="border border-gray-300 outline-0 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="last_name">Tên</label>
          <input
            type="text"
            id="last_name"
            className="border border-gray-300 outline-0 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="full_name">Họ & Tên Đầy Đủ</label>
          <input
            type="text"
            id="full_name"
            className="border border-gray-300 outline-0 rounded"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email_address">Địa Chỉ Email</label>
          <input
            type="email"
            required
            className="border border-gray-300 rounded outline-0"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="date_of_birth">Sinh Nhật</label>
          <input
            type="date"
            className="outline-0 border border-gray-300 rounded"
          />
        </div>
        {Array.from({ length: 1 }).map((_, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <label htmlFor={`phone_number_${index}`}>
              Số điện thoại {index > 0 && index}
            </label>
            <input
              type="tel"
              name={`phone_number_${index}`}
              id={`phone_number_${index}`}
              maxLength={10}
              minLength={10}
              className="border border-gray-300 rounded outline-0"
            />
          </div>
        ))}
        {Array.from({ length: 1 }).map((_, index) => (
          <div className="flex flex-col gap-1" key={index}>
            <label htmlFor={`address_${index}`}>
              Địa chỉ {index > 0 && index}
            </label>
            <input
              type="text"
              name={`address_${index}`}
              id={`address_${index}`}
              className="border border-gray-300 rounded outline-0"
            />
          </div>
        ))}
      </form>
    </div>
  );
}
