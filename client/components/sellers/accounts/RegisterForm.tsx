import { SELLER_FORM_INPUT_LIST } from "@/data/register-seller-form";
import { useRegisterSellerActions } from "@/hooks/sellers/accounts/actions";
// import { getIconByString } from "@/features";
import useRegisterSellerHelpers from "@/hooks/sellers/accounts/helpers/useRegisterSellerHelpers";
import { RegisterSellerAuth, RegisterSellerInfo } from "@/interfaces";
import { CreateStoreInfoRequest } from "@/interfaces/store.interface";
import { AppDispatch } from "@/redux";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useDispatch } from "react-redux";

export default function RegisterForm() {
  const formList = SELLER_FORM_INPUT_LIST;
  const dispatch = useDispatch<AppDispatch>();
  const {
    setShowHiddenInput,
    showHiddenInput,
    registerData,
    onchangFormInfo,
    onchangFormStore,
    onchangFormAuth,
  } = useRegisterSellerHelpers();

  const { submitForm } = useRegisterSellerActions({ dispatch });

  return (
    <div className="min-h-screen bg-zinc-50 flex items-start justify-center py-12 px-4">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await submitForm(registerData);
        }}
        className="w-full max-w-[90%] bg-white border border-zinc-200 rounded-2xl p-8 shadow-sm"
      >
        {/* Personal Info */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 pb-3 mb-5 border-b border-zinc-100">
            Thông tin cá nhân
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formList.info.map((form) => (
              <div key={form.id} className="flex flex-col gap-1.5">
                <label
                  htmlFor={form.id}
                  className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {form.label}
                </label>
                <input
                  type={form.type}
                  maxLength={form.maxLenght}
                  minLength={form.minLength}
                  placeholder={form.message}
                  id={form.id}
                  required={form.required}
                  name={form.name}
                  value={
                    registerData.info[form.name as keyof RegisterSellerInfo]
                  }
                  onChange={(e) => {
                    onchangFormInfo(e);
                  }}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-400 outline-none transition-colors duration-150"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Store Info + Auth */}
        <div className="mb-10">
          <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 pb-3 mb-5 border-b border-zinc-100">
            Thông tin cửa hàng
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formList.store.info.map((form) => (
              <div key={form.id} className="flex flex-col gap-1.5">
                <label
                  htmlFor={form.id}
                  className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
                >
                  {form.label}
                </label>
                <input
                  type={form.type}
                  maxLength={form.maxLenght}
                  minLength={form.minLength}
                  placeholder={form.message}
                  required={form.required}
                  id={form.id}
                  name={form.name}
                  value={
                    registerData.store.info[
                      form.name as keyof CreateStoreInfoRequest
                    ]
                  }
                  onChange={(e) => {
                    onchangFormStore(e);
                  }}
                  className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-400 outline-none transition-colors duration-150"
                />
              </div>
            ))}
            {(() => {
              const storeCodeForm = formList.store.storeCode;
              return (
                <div className="sm:col-span-2 flex flex-col gap-1.5">
                  <label
                    htmlFor={storeCodeForm.id}
                    className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
                  >
                    {storeCodeForm.label}
                  </label>
                  <div className="flex gap-2 items-center">
                    <input
                      type={
                        storeCodeForm.id === showHiddenInput.id
                          ? showHiddenInput.type
                          : storeCodeForm.type
                      }
                      maxLength={storeCodeForm.maxLenght}
                      minLength={storeCodeForm.minLength}
                      placeholder={storeCodeForm.message}
                      id={storeCodeForm.id}
                      name={storeCodeForm.name}
                      required={storeCodeForm.required}
                      value={registerData.store.storeCode}
                      onChange={(e) => {
                        onchangFormStore(e);
                      }}
                      className="w-48 px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 font-mono tracking-widest placeholder:text-zinc-300 focus:bg-white focus:border-zinc-400 outline-none transition-colors duration-150"
                    />
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setShowHiddenInput((prev) =>
                            prev.id !== ""
                              ? { id: "", type: "" }
                              : { id: storeCodeForm.id, type: "text" }
                          );
                        }}
                      >
                        {showHiddenInput.id === storeCodeForm.id ? (
                          <FontAwesomeIcon icon={faEyeSlash} />
                        ) : (
                          <FontAwesomeIcon icon={faEye} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Auth */}
            <div className="sm:col-span-2 mt-6">
              <h2 className="text-xs font-semibold tracking-widest uppercase text-zinc-400 pb-3 mb-5 border-b border-zinc-100">
                Tài khoản &amp; Bảo mật
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {formList.auth.map((form) => (
                  <div key={form.id} className="flex flex-col gap-1.5">
                    <label
                      htmlFor={form.id}
                      className="text-xs font-medium text-zinc-500 uppercase tracking-wider"
                    >
                      {form.label}
                    </label>
                    <div className="flex gap-2 items-center">
                      <input
                        type={
                          form.id === showHiddenInput.id
                            ? showHiddenInput.type
                            : form.type
                        }
                        maxLength={form.maxLenght}
                        minLength={form.minLength}
                        placeholder={form.message}
                        id={form.id}
                        name={form.name}
                        required={form.required}
                        onChange={(e) => {
                          onchangFormAuth(e);
                        }}
                        value={
                          registerData[form.name as keyof RegisterSellerAuth]
                        }
                        className="w-full px-3.5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-800 placeholder:text-zinc-300 focus:bg-white focus:border-zinc-400 outline-none transition-colors duration-150"
                      />
                      {form.type === "password" && (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              setShowHiddenInput((prev) =>
                                prev.id !== ""
                                  ? { id: "", type: "" }
                                  : { id: form.id, type: "text" }
                              );
                            }}
                          >
                            {showHiddenInput.id === form.id ? (
                              <FontAwesomeIcon icon={faEyeSlash} />
                            ) : (
                              <FontAwesomeIcon icon={faEye} />
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* button actions */}
        <div className="flex items-center justify-between pt-6 border-t border-zinc-100">
          <div className="flex gap-2">
            <Link
              href="/"
              className="px-4 py-2.5 text-sm text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:text-zinc-700 transition-colors duration-150"
            >
              ← Trang chủ
            </Link>
            <a
              href="/login"
              className="px-4 py-2.5 text-sm text-zinc-500 bg-zinc-50 border border-zinc-200 rounded-lg hover:bg-zinc-100 hover:text-zinc-700 transition-colors duration-150"
            >
              Đã có tài khoản
            </a>
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 text-sm font-medium text-white bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-150"
          >
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
}
