import { useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MdDelete, MdEditSquare } from "../../assets/icons.js";
import { StoreContext } from "../../context/StoreContext.jsx";
import {
  editSaveAddress,
  getUserProfile,
  updateProfile,
  passwordChange,
  deleteSavedAddresses,
} from "../../api/userApi.js";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const {
    token,
    setToken,
    user: initialUser,
    setUser,
    setCartItems,
  } = useContext(StoreContext);
  const [user, setLocalUser] = useState(initialUser);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [addressForm, setAddressForm] = useState({
    id: null,
    name: "",
    phone: "",
    street: "",
    area: "",
    landmark: "",
    city: "",
    state: "",
    pincode: null,
  });

  const [showaddress, setShowAddress] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [addressModal, setAddressModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (initialUser) {
      setLocalUser(initialUser);
      setFormData({ name: initialUser.name, email: initialUser.email });
    }
  }, [initialUser]);

  const refreshUser = async () => {
    const updated = await getUserProfile(token);
    setLocalUser(updated);
    setUser(updated); // sync with global context if needed
  };

  const handleOnChange = (e) => {
    setAddressForm({ ...addressForm, [e.target.name]: e.target.value });
  };

  // Profile update handler
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(token, formData);
      await refreshUser();
      setShowEdit(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed.");
    }
  };

  // Password change handler
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await passwordChange(token, passwordForm);
      setPasswordForm({ oldPassword: "", newPassword: "" });
      setShowPassword(false);
      toast.success("Password changed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Password change failed.");
    }
  };

  // Open edit modal
  const handleEditAddressClick = (addr) => {
    setAddressForm({ ...addr }); // Pre-fill the form
    setAddressModal(true);
  };

  // Address update handler
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      await editSaveAddress(token, { ...addressForm });
      await refreshUser();
      toast.success("Address updated!");
      setAddressForm({
        id: null,
        name: "",
        phone: "",
        street: "",
        area: "",
        landmark: "",
        city: "",
        state: "",
        pincode: null,
      });
      setAddressModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save address");
    }
  };

  // Delete an address handler
  const handleDeleteAddress = async (addrId) => {
    console.log(addrId);
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;
    try {
      await deleteSavedAddresses(token, addrId);
      await refreshUser();
      setShowEdit(false);
      toast.success("Address deleted successfully.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete address.");
    }
  };

  // Logout handler
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken("");
    setUser({});
    setCartItems({});
    navigate("/");
  };

  return (
    <div className="profile md:max-w-10/12 mx-auto md:my-5 px-3">
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div className="main p-3 border border-gray-50 shadow rounded">
          <h3 className="text-lg mb-2">Hi, {user.name || "User"}</h3>
          <div className="actions p-4 w-full flex flex-col gap-3">
            <div className="details border border-gray-100 rounded-md">
              <button
                onClick={() => setShowEdit(!showEdit)}
                className="edit-btn p-3 w-full text-center bg-gray-50 hover:bg-gray-100/70 border border-gray-300 cursor-pointer rounded-md"
              >
                Updated Profile
              </button>
              {showEdit && (
                <form
                  onSubmit={handleUpdate}
                  className="flex flex-col gap-3 p-2"
                >
                  <div className="flex flex-row  gap-3">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="Full name"
                      required
                    />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="Email"
                      required
                    />
                  </div>
                  <div className="action-btn flex items-center gap-4 self-end">
                    <button
                      type="button"
                      onClick={() => setShowEdit(false)}
                      className="w-44 cursor-pointer font-medium p-2 rounded border border-rose-100 text-rose-500 bg-rose-100 hover:bg-rose-200/70"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-44 cursor-pointer font-medium p-2 rounded border border-gray-100 text-green-600 bg-green-100 hover:bg-green-200/70"
                    >
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
            <div className="address rounded-md">
              <button
                onClick={() => setShowAddress(!showaddress)}
                className="btn p-3 w-full text-center bg-gray-50 hover:bg-gray-100/70 border cursor-pointer border-gray-300 rounded-md"
              >
                Address
              </button>

              {addressModal && (
                <div className="edit-modal w-screen h-screen fixed top-0 left-0  bg-black/40 backdrop-blur-xs flex justify-center items-center">
                  <div className="modal-container w-lg p-3 bg-gray-50 rounded-md">
                    <form
                      onSubmit={handleUpdateAddress}
                      className="w-full flex flex-col gap-2"
                    >
                      <div className="name-phone w-full flex items-center gap-3">
                        <div className="name w-full">
                          <label className=" block text-sm mb-1">Name</label>
                          <input
                            type="text"
                            name="name"
                            value={addressForm.name}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="Full name"
                            required
                          />
                        </div>
                        <div className="phone w-full">
                          <label className="block text-sm mb-1">Phone</label>
                          <input
                            type="text"
                            name="phone"
                            value={addressForm.phone}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="Phone number"
                            required
                          />
                        </div>
                      </div>
                      <div className="flate-house-building ">
                        <label className="block text-sm mb-1">
                          Flate, House No., Building, Street
                        </label>
                        <input
                          type="text"
                          name="street"
                          value={addressForm.street}
                          onChange={handleOnChange}
                          className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          placeholder="flate, house no."
                          required
                        />
                      </div>
                      <div className="area-colony-street">
                        <label className="block text-sm mb-1">
                          Area, Colony, Street, Sector, Village
                        </label>
                        <input
                          type="text"
                          name="area"
                          value={addressForm.area}
                          onChange={handleOnChange}
                          className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                          required
                          placeholder="area"
                        />
                      </div>

                      <div className="city-landmark flex items-center gap-3 w-full">
                        <div className="landmark w-full">
                          <label className="block text-sm mb-1">
                            Landmark (Optional)
                          </label>
                          <input
                            type="text"
                            name="landmark"
                            value={addressForm.landmark}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="E.g. near apollo hospital"
                          />
                        </div>
                        <div className="city w-full">
                          <label className="block text-sm mb-1">City</label>
                          <input
                            type="text"
                            name="city"
                            value={addressForm.city}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="city"
                            required
                          />
                        </div>
                      </div>

                      <div className="state-pincode flex items-center gap-3 w-full">
                        <div className="state w-full">
                          <label className="block text-sm mb-1">State</label>
                          <input
                            type="text"
                            name="state"
                            value={addressForm.state}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="state"
                            required
                          />
                        </div>
                        <div className="pincode w-full">
                          <label className="block text-sm mb-1">Pincode</label>
                          <input
                            type="text"
                            name="pincode"
                            value={addressForm.pincode}
                            onChange={handleOnChange}
                            className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                            placeholder="6-digit pincode"
                            required
                          />
                        </div>
                      </div>
                      <div className="btns flex items-center gap-3 w-full">
                        <button
                          type="button"
                          onClick={() => setAddressModal(false)}
                          className="w-full p-2 rounded border border-rose-100 text-rose-500 bg-rose-100 hover:bg-rose-200/70"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="w-full p-2 rounded border border-green-300 bg-green-200 hover:bg-green-300/70 text-green-600"
                        >
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {showaddress && (
                <div className="savedAddresses flex items-center gap-4 p-2">
                  {user.savedAddress.map((addr) => (
                    <div
                      key={addr.id}
                      className="saved-address w-fit border border-gray-300 rounded p-4"
                    >
                      <div>
                        <p className="font-medium">{addr.name}</p>
                        <p className="text-sm text-gray-600">{addr.phone}</p>
                        <p className="text-sm text-gray-600">
                          {addr.street}, {addr.area}
                        </p>
                        <p className="text-sm text-gray-600">
                          {addr.city}, {addr.state} - {addr.pincode}
                        </p>
                      </div>
                      <div className="action-btn flex items-center gap-3 mt-2">
                        <button
                          onClick={() => handleEditAddressClick(addr)}
                          className="edit text-gray-500 cursor-pointer"
                        >
                          <MdEditSquare size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          className="delete text-rose-600 cursor-pointer"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="passwordChange border border-gray-100 rounded-md">
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="edit-btn p-3 w-full text-center bg-gray-50 hover:bg-gray-100/70 border border-gray-300 cursor-pointer rounded-md"
              >
                Change Password
              </button>
              {showPassword && (
                <form
                  onSubmit={handleChangePassword}
                  className="flex flex-col gap-3 p-2"
                >
                  <div className="flex flex-row  gap-3">
                    <input
                      type="password"
                      name="oldPassword"
                      value={passwordForm.oldPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="Old Password"
                      required
                    />
                    <input
                      type="password"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={(e) =>
                        setPasswordForm({
                          ...passwordForm,
                          [e.target.name]: e.target.value,
                        })
                      }
                      className="w-full text-sm border border-gray-300 p-2 rounded-md outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                      placeholder="New Password"
                      required
                    />
                  </div>
                  <div className="action-btn flex items-center gap-4 self-end">
                    <button
                      type="button"
                      onClick={() => setShowPassword(false)}
                      className="w-44 cursor-pointer font-medium p-2 rounded border border-rose-100 text-rose-500 bg-rose-100 hover:bg-rose-200/70"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-44 cursor-pointer font-medium p-2 rounded border border-gray-100 text-green-600 bg-green-100 hover:bg-green-200/70"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="logout p-3 w-full text-center text-red-500 bg-gray-50 hover:bg-gray-100/70 border border-gray-300 cursor-pointer rounded-md"
            >
              Log out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
