export default function RegisterSubmitButton() {
  return (
    <div className="pt-6 space-y-4">
      <button
        type="submit"
        className="w-full bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transition shadow-md hover:shadow-lg"
      >
        Tạo Tài Khoản
      </button>
    </div>
  );
}
