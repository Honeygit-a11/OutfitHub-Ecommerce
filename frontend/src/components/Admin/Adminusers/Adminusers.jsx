import React, { useEffect, useState } from "react";
import axios from "axios";
import API_BASE from '../../../config/api';
import '../../../components/Admin/Adminusers/Adminusers.css'

const Adminusers = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/users`);
         console.log("API Response:", res.data);
        setUsers(res.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstPage = indexOfLastUser - usersPerPage;
  const currentPageUsers = users.slice(indexOfFirstPage, indexOfLastUser);
  const totalPages = Math.ceil(users.length / usersPerPage);
  return (
    <>
       <div className="admin-users">
      <h2>Registered Users</h2>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Sr.No</th>
            {/* <th>name</th> */}
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {currentPageUsers.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              {/* <td>{user.name}</td> */}
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => setCurrentPage((prev) => prev - 1)}>prev</button>

        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button disabled={currentPage === totalPages} onClick={() => setCurrentPage((prev) => prev + 1)}>next</button>
      </div>
    </div>
    </>
  )
}

export default Adminusers
