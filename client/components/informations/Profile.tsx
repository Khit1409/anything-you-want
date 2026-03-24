import {
  faBirthdayCake,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Profile() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="relative h-[400px] w-full overflow-hidden flex flex-col justify-center">
        {/* Gradient background chỉ cao 200px */}
        <div className="absolute top-0 left-0 w-full h-[200px] bg-linear-to-r from-pink-400 to-pink-700" />

        {/* Avatar */}
        <div className="absolute top-[120px] left-[50px]">
          <div className="h-[200px] w-[200px] bg-white border border-gray-300 rounded-full" />
        </div>

        {/* User Info */}
        <div className="absolute top-[220px] left-[280px] flex flex-col justify-start">
          <div className="mb-3">
            <h3 className="text-xl font-semibold">Kevin Smith</h3>
            <p className="text-gray-600">
              Some description about user or seller.
            </p>
          </div>
          <div className="flex text-gray-600 items-center gap-3">
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faLocationDot} />
              <small className="italic">Address of user or seller</small>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faBirthdayCake} />
              <small className="italic">01-01-2026</small>
            </div>
            <div className="flex gap-1">
              <FontAwesomeIcon icon={faPhone} />
              <small className="italic">0987654321</small>
            </div>
          </div>
        </div>

        {/* toggle */}
        <div className="absolute right-[200px] top-[220px]">
          <button className="border-gray-300 border w-[30px] p-2 flex justify-center items-center h-[30px] rounded-full">
            ...
          </button>
        </div>
      </div>
    </div>
  );
}
