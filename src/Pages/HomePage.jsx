import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { allUsers } from "../Redux/auth/authSlice";
import { meData, userDetails } from "../Redux/data/dataSlice";
import Loading from "../Components/Loading";
import dataServices from "../Redux/data/dataService";
import { useQuery } from "@apollo/client";

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery(dataServices.USER_DATA, {
    errorPolicy: "all",
  });

  const { users } = useSelector((state) => state.auth);
  const { UserDetails, me } = useSelector((state) => state.data);

  const token = localStorage.getItem("token");

  const [pageNo, setPageNo] = useState("1");
  const [pageSize, setPageSize] = useState("10");
  const page = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const size = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  const [isOpenViewUser, setIsOpenViewUser] = useState(false);

  const handleUserDetails = (id) => {
    setIsOpenViewUser(true);
    const userID = { userId: id };
    dispatch(userDetails(userID));
  };

  const closeUserDetails = () => {
    setIsOpenViewUser(false);
  };

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    const value = { page: pageNo, size: pageSize };
    dispatch(allUsers(value));
    dispatch(meData());
  }, [pageNo, pageSize]);

  return (
    <div className="container-fluied custom-container">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <div>
          <h6 className="me-name">{me.name}</h6>
          <p className="me-email">{me.email}</p>
        </div>
        <h2 className="title">GraphQL</h2>
        <Link to="/location" className="link">
          <h6>Location</h6>
        </Link>
      </div>

      <div className="custom-card">
        <div className="custom-card-header text-center">All Users</div>
        <div className="table-container">
          <div className="table-scroll">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col" className="text-center">
                    Sr. No.
                  </th>
                  <th scope="col" className="text-center">
                    Id
                  </th>
                  <th scope="col" className="text-center">
                    Name
                  </th>
                  <th scope="col" className="text-center">
                    Email
                  </th>
                  <th scope="col" className="text-center">
                    Details
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={item.id} className="table-row">
                    <th className="text-center" scope="row">
                      {index + 1}
                    </th>
                    <td className="text-center">{item.id}</td>
                    <td className="text-center">{item.name}</td>
                    <td className="text-center">{item.email}</td>
                    <td className="text-center">
                      <button
                        className="btn-view"
                        onClick={() => handleUserDetails(item.id)}
                      >
                        View User
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="pagination d-flex justify-content-between">
          <select
            className="select"
            onChange={(e) => setPageNo(e.target.value)}
          >
            <option value="">Select Page</option>
            {page.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            className="select"
            onChange={(e) => setPageSize(e.target.value)}
          >
            <option value="">Select Page Size</option>
            {size.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isOpenViewUser && (
        <div className="modal-overlay">
          <div className="modal-content p-4 w-25">
            <button className="btn-close" onClick={closeUserDetails}>
              &times;
            </button>
            <h4>User Details</h4>
            <p>
              <strong>ID:</strong> {UserDetails?.id}
            </p>
            <p>
              <strong>Name:</strong> {UserDetails?.name}
            </p>
            <p>
              <strong>Email:</strong> {UserDetails?.email}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
